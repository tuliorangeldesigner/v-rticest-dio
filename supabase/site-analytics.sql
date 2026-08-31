-- Execute uma vez no SQL Editor, no mesmo projeto do Analytics do Assistente.
create table if not exists public.site_visitors (
  visitor_id uuid primary key, first_seen timestamptz not null default now(), last_seen timestamptz not null default now(),
  online_until timestamptz, sessions_count integer not null default 0, pageviews_count integer not null default 0,
  device_type text, browser text, operating_system text, country text, region text, city text, referrer text, last_path text
);
create table if not exists public.site_sessions (
  session_id uuid primary key, visitor_id uuid not null references public.site_visitors(visitor_id) on delete cascade,
  started_at timestamptz not null default now(), last_seen timestamptz not null default now(), pageviews_count integer not null default 0,
  landing_path text, referrer text, utm_source text, utm_medium text, utm_campaign text
);
alter table public.site_sessions add column if not exists duration_seconds integer not null default 0;
alter table public.site_sessions add column if not exists exit_path text;
create table if not exists public.site_pageviews (
  id bigint generated always as identity primary key, visitor_id uuid not null references public.site_visitors(visitor_id) on delete cascade,
  session_id uuid not null references public.site_sessions(session_id) on delete cascade, path text not null, title text,
  viewed_at timestamptz not null default now(), duration_seconds integer not null default 0
);
create table if not exists public.site_events (
  id bigint generated always as identity primary key, visitor_id uuid not null references public.site_visitors(visitor_id) on delete cascade,
  session_id uuid not null references public.site_sessions(session_id) on delete cascade, event_name text not null,
  path text, label text, created_at timestamptz not null default now()
);
create index if not exists site_pageviews_date_idx on public.site_pageviews(viewed_at desc);
create index if not exists site_pageviews_path_idx on public.site_pageviews(path);
create index if not exists site_visitors_seen_idx on public.site_visitors(last_seen desc);
alter table public.site_visitors enable row level security;
alter table public.site_sessions enable row level security;
alter table public.site_pageviews enable row level security;
alter table public.site_events enable row level security;
revoke all on public.site_visitors, public.site_sessions, public.site_pageviews, public.site_events from public, anon, authenticated;
grant select, insert, update on public.site_visitors, public.site_sessions, public.site_pageviews, public.site_events to service_role;
grant usage, select on sequence public.site_pageviews_id_seq, public.site_events_id_seq to service_role;

create or replace function public.record_site_event(
  p_visitor_id uuid, p_session_id uuid, p_event_name text, p_path text, p_title text default null,
  p_duration integer default 0, p_label text default null, p_referrer text default null,
  p_device text default null, p_browser text default null, p_os text default null,
  p_country text default null, p_region text default null, p_city text default null,
  p_utm_source text default null, p_utm_medium text default null, p_utm_campaign text default null
) returns void language plpgsql security invoker set search_path=public as $$
declare v_new_session integer := 0;
begin
  if p_event_name not in ('pageview','page_exit','link_click','section_view','heartbeat') then raise exception 'invalid_event'; end if;
  insert into public.site_visitors(visitor_id,last_seen,online_until,device_type,browser,operating_system,country,region,city,referrer,last_path)
  values(p_visitor_id,now(),now()+interval '90 seconds',left(p_device,30),left(p_browser,60),left(p_os,60),left(p_country,10),left(p_region,60),left(p_city,100),left(p_referrer,500),left(p_path,300))
  on conflict(visitor_id) do update set last_seen=now(),online_until=now()+interval '90 seconds',device_type=coalesce(excluded.device_type,site_visitors.device_type),browser=coalesce(excluded.browser,site_visitors.browser),operating_system=coalesce(excluded.operating_system,site_visitors.operating_system),country=coalesce(excluded.country,site_visitors.country),region=coalesce(excluded.region,site_visitors.region),city=coalesce(excluded.city,site_visitors.city),referrer=coalesce(excluded.referrer,site_visitors.referrer),last_path=excluded.last_path;
  insert into public.site_sessions(session_id,visitor_id,landing_path,referrer,utm_source,utm_medium,utm_campaign)
  values(p_session_id,p_visitor_id,left(p_path,300),left(p_referrer,500),left(p_utm_source,100),left(p_utm_medium,100),left(p_utm_campaign,150))
  on conflict(session_id) do nothing; get diagnostics v_new_session=row_count;
  update public.site_sessions set last_seen=now() where session_id=p_session_id and visitor_id=p_visitor_id;
  if v_new_session=1 then update public.site_visitors set sessions_count=sessions_count+1 where visitor_id=p_visitor_id; end if;
  if p_event_name='pageview' then
    insert into public.site_pageviews(visitor_id,session_id,path,title) values(p_visitor_id,p_session_id,left(p_path,300),left(p_title,200));
    update public.site_visitors set pageviews_count=pageviews_count+1 where visitor_id=p_visitor_id;
    update public.site_sessions set pageviews_count=pageviews_count+1 where session_id=p_session_id;
  elsif p_event_name='page_exit' then
    update public.site_pageviews set duration_seconds=least(greatest(p_duration,0),3600)
    where id=(select id from public.site_pageviews where session_id=p_session_id and path=left(p_path,300) order by viewed_at desc limit 1);
    update public.site_sessions set duration_seconds=greatest(duration_seconds,least(greatest(p_duration,0),14400)),exit_path=left(p_path,300),last_seen=now() where session_id=p_session_id;
  elsif p_event_name in ('link_click','section_view') then
    insert into public.site_events(visitor_id,session_id,event_name,path,label) values(p_visitor_id,p_session_id,p_event_name,left(p_path,300),left(p_label,300));
  end if;
end $$;

create or replace function public.get_site_dashboard() returns jsonb language sql security invoker set search_path=public as $$
select jsonb_build_object(
 'summary',jsonb_build_object('visitors',(select count(*) from site_visitors),'sessions',(select coalesce(sum(sessions_count),0) from site_visitors),'pageviews',(select count(*) from site_pageviews),'online',(select count(*) from site_visitors where online_until>now()),'avgDuration',(select coalesce(round(avg(duration_seconds)),0) from site_pageviews where duration_seconds>0)),
 'topPages',(select coalesce(jsonb_agg(to_jsonb(x) order by x.views desc),'[]') from (select path,count(*) views,count(distinct visitor_id) visitors,coalesce(round(avg(nullif(duration_seconds,0))),0) avg_duration from site_pageviews group by path order by views desc limit 30)x),
 'topSections',(select coalesce(jsonb_agg(to_jsonb(x) order by x.views desc),'[]') from (select path,label,count(*) views,count(distinct visitor_id) visitors from site_events where event_name='section_view' group by path,label order by views desc limit 40)x),
 'regions',(select coalesce(jsonb_agg(to_jsonb(x) order by x.visitors desc),'[]') from (select coalesce(country,'—') country,coalesce(region,'—') region,coalesce(city,'—') city,count(*) visitors from site_visitors group by 1,2,3 order by visitors desc limit 30)x),
 'sources',(select coalesce(jsonb_agg(to_jsonb(x) order by x.sessions desc),'[]') from (select coalesce(nullif(utm_source,''),nullif(referrer,''),'Direto') source,count(*) sessions from site_sessions group by 1 order by sessions desc limit 20)x),
 'recent',(select coalesce(jsonb_agg(to_jsonb(x) order by x.viewed_at desc),'[]') from (select p.path,p.title,p.viewed_at,p.duration_seconds,v.device_type,v.browser,v.operating_system,v.country,v.region,v.city from site_pageviews p join site_visitors v using(visitor_id) order by p.viewed_at desc limit 100)x),
 'daily',(select coalesce(jsonb_agg(to_jsonb(x) order by x.view_date),'[]') from (select viewed_at::date as view_date,count(*) views,count(distinct visitor_id) visitors from site_pageviews where viewed_at>=current_date-29 group by 1)x)
); $$;

create or replace function public.get_site_dashboard(p_days integer) returns jsonb language sql security invoker set search_path=public as $$
select jsonb_build_object(
 'summary',jsonb_build_object('visitors',(select count(*) from site_visitors where last_seen>=current_date-greatest(1,p_days)),'sessions',(select count(*) from site_sessions where started_at>=current_date-greatest(1,p_days)),'pageviews',(select count(*) from site_pageviews where viewed_at>=current_date-greatest(1,p_days)),'online',(select count(*) from site_visitors where online_until>now()),'avgDuration',(select coalesce(round(avg(duration_seconds)),0) from site_pageviews where duration_seconds>0 and viewed_at>=current_date-greatest(1,p_days)),'avgSession',(select coalesce(round(avg(duration_seconds)),0) from site_sessions where duration_seconds>0 and started_at>=current_date-greatest(1,p_days)),'bounceRate',(select coalesce(round(100.0*count(*) filter(where pageviews_count=1)/nullif(count(*),0),1),0) from site_sessions where started_at>=current_date-greatest(1,p_days)),'returning',(select count(*) from site_visitors where sessions_count>1 and last_seen>=current_date-greatest(1,p_days))),
 'topPages',(select coalesce(jsonb_agg(to_jsonb(x) order by x.views desc),'[]') from (select path,count(*) views,count(distinct visitor_id) visitors,coalesce(round(avg(nullif(duration_seconds,0))),0) avg_duration from site_pageviews where viewed_at>=current_date-greatest(1,p_days) group by path order by views desc limit 30)x),
 'topSections',(select coalesce(jsonb_agg(to_jsonb(x) order by x.views desc),'[]') from (select path,label,count(*) views,count(distinct visitor_id) visitors from site_events where event_name='section_view' and created_at>=current_date-greatest(1,p_days) group by path,label order by views desc limit 40)x),
 'regions',(select coalesce(jsonb_agg(to_jsonb(x) order by x.visitors desc),'[]') from (select coalesce(country,'—') country,coalesce(region,'—') region,coalesce(city,'—') city,count(*) visitors from site_visitors where last_seen>=current_date-greatest(1,p_days) group by 1,2,3 order by visitors desc limit 30)x),
 'sources',(select coalesce(jsonb_agg(to_jsonb(x) order by x.sessions desc),'[]') from (select coalesce(nullif(utm_source,''),nullif(referrer,''),'Direto') source,count(*) sessions from site_sessions where started_at>=current_date-greatest(1,p_days) group by 1 order by sessions desc limit 20)x),
 'clicks',(select coalesce(jsonb_agg(to_jsonb(x) order by x.clicks desc),'[]') from (select label,count(*) clicks,count(distinct visitor_id) visitors from site_events where event_name='link_click' and created_at>=current_date-greatest(1,p_days) group by label order by clicks desc limit 30)x),
 'entries',(select coalesce(jsonb_agg(to_jsonb(x) order by x.sessions desc),'[]') from (select landing_path path,count(*) sessions from site_sessions where started_at>=current_date-greatest(1,p_days) group by landing_path order by sessions desc limit 20)x),
 'exits',(select coalesce(jsonb_agg(to_jsonb(x) order by x.sessions desc),'[]') from (select coalesce(exit_path,landing_path) path,count(*) sessions from site_sessions where started_at>=current_date-greatest(1,p_days) group by 1 order by sessions desc limit 20)x),
 'hourly',(select coalesce(jsonb_agg(to_jsonb(x) order by x.view_hour),'[]') from (select extract(hour from viewed_at)::integer as view_hour,count(*) views from site_pageviews where viewed_at>=current_date-greatest(1,p_days) group by 1)x),
 'funnel',jsonb_build_object('siteVisitors',(select count(distinct visitor_id) from site_pageviews where viewed_at>=current_date-greatest(1,p_days)),'serviceVisitors',(select count(distinct visitor_id) from site_pageviews where viewed_at>=current_date-greatest(1,p_days) and (path like '/service%' or path like '/servico%')),'assistantVisitors',(select count(*) from assistant_visitors where last_seen>=current_date-greatest(1,p_days)),'conversations',(select count(*) from assistant_visitors where conversation_count>0 and last_seen>=current_date-greatest(1,p_days))),
 'recent',(select coalesce(jsonb_agg(to_jsonb(x) order by x.viewed_at desc),'[]') from (select p.path,p.title,p.viewed_at,p.duration_seconds,v.device_type,v.browser,v.operating_system,v.country,v.region,v.city from site_pageviews p join site_visitors v using(visitor_id) where p.viewed_at>=current_date-greatest(1,p_days) order by p.viewed_at desc limit 250)x),
 'daily',(select coalesce(jsonb_agg(to_jsonb(x) order by x.view_date),'[]') from (select viewed_at::date as view_date,count(*) views,count(distinct visitor_id) visitors from site_pageviews where viewed_at>=current_date-greatest(1,p_days) group by 1)x)
); $$;
revoke all on function public.record_site_event(uuid,uuid,text,text,text,integer,text,text,text,text,text,text,text,text,text,text,text) from public,anon,authenticated;
revoke all on function public.get_site_dashboard() from public,anon,authenticated;
grant execute on function public.record_site_event(uuid,uuid,text,text,text,integer,text,text,text,text,text,text,text,text,text,text,text) to service_role;
grant execute on function public.get_site_dashboard() to service_role;
revoke all on function public.get_site_dashboard(integer) from public,anon,authenticated;
grant execute on function public.get_site_dashboard(integer) to service_role;
