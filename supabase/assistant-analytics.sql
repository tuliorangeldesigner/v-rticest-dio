-- Execute uma vez no SQL Editor do projeto Supabase.
-- As tabelas ficam inacessiveis para anon/authenticated; somente as APIs do servidor usam service_role.

create table if not exists public.assistant_visitors (
  visitor_id uuid primary key,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  online_until timestamptz,
  visit_count integer not null default 0 check (visit_count >= 0),
  conversation_count integer not null default 0 check (conversation_count >= 0),
  message_count integer not null default 0 check (message_count >= 0),
  last_path text,
  referrer text,
  device_type text,
  browser text
);

create table if not exists public.assistant_sessions (
  session_id uuid primary key,
  visitor_id uuid not null references public.assistant_visitors(visitor_id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  messages_sent integer not null default 0 check (messages_sent >= 0)
);

create table if not exists public.assistant_events (
  id bigint generated always as identity primary key,
  visitor_id uuid not null references public.assistant_visitors(visitor_id) on delete cascade,
  session_id uuid not null references public.assistant_sessions(session_id) on delete cascade,
  event_name text not null check (event_name in ('assistant_open', 'message_sent')),
  created_at timestamptz not null default now()
);

create table if not exists public.assistant_messages (
  id bigint generated always as identity primary key,
  visitor_id uuid not null references public.assistant_visitors(visitor_id) on delete cascade,
  session_id uuid not null references public.assistant_sessions(session_id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null check (char_length(content) between 1 and 4000),
  path text,
  referrer text,
  device_type text,
  browser text,
  created_at timestamptz not null default now()
);

create index if not exists assistant_visitors_last_seen_idx on public.assistant_visitors (last_seen desc);
create index if not exists assistant_events_created_at_idx on public.assistant_events (created_at desc);
create index if not exists assistant_events_visitor_idx on public.assistant_events (visitor_id);
create index if not exists assistant_messages_created_at_idx on public.assistant_messages (created_at desc);
create index if not exists assistant_messages_visitor_idx on public.assistant_messages (visitor_id);
create index if not exists assistant_messages_session_idx on public.assistant_messages (session_id);

alter table public.assistant_visitors enable row level security;
alter table public.assistant_sessions enable row level security;
alter table public.assistant_events enable row level security;
alter table public.assistant_messages enable row level security;

revoke all on public.assistant_visitors from public, anon, authenticated;
revoke all on public.assistant_sessions from public, anon, authenticated;
revoke all on public.assistant_events from public, anon, authenticated;
revoke all on public.assistant_messages from public, anon, authenticated;
grant select, insert, update on public.assistant_visitors to service_role;
grant select, insert, update on public.assistant_sessions to service_role;
grant select, insert on public.assistant_events to service_role;
grant select, insert on public.assistant_messages to service_role;
grant usage, select on sequence public.assistant_events_id_seq to service_role;
grant usage, select on sequence public.assistant_messages_id_seq to service_role;

create or replace function public.record_assistant_event(
  p_visitor_id uuid,
  p_session_id uuid,
  p_event_name text,
  p_path text default null,
  p_referrer text default null,
  p_device_type text default null,
  p_browser text default null
) returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_new_session integer := 0;
  v_messages integer := 0;
begin
  if p_event_name not in ('assistant_open', 'heartbeat', 'assistant_close', 'message_sent') then
    raise exception 'invalid_event';
  end if;

  insert into public.assistant_visitors (
    visitor_id, last_seen, online_until, last_path, referrer, device_type, browser
  ) values (
    p_visitor_id, now(),
    case when p_event_name = 'assistant_close' then now() else now() + interval '90 seconds' end,
    left(p_path, 300), left(p_referrer, 500), left(p_device_type, 40), left(p_browser, 80)
  )
  on conflict (visitor_id) do update set
    last_seen = now(),
    online_until = case when p_event_name = 'assistant_close' then now() else now() + interval '90 seconds' end,
    last_path = coalesce(excluded.last_path, assistant_visitors.last_path),
    referrer = coalesce(excluded.referrer, assistant_visitors.referrer),
    device_type = coalesce(excluded.device_type, assistant_visitors.device_type),
    browser = coalesce(excluded.browser, assistant_visitors.browser);

  insert into public.assistant_sessions (session_id, visitor_id)
  values (p_session_id, p_visitor_id)
  on conflict (session_id) do nothing;
  get diagnostics v_new_session = row_count;

  update public.assistant_sessions
  set last_seen = now()
  where session_id = p_session_id and visitor_id = p_visitor_id;

  if p_event_name = 'assistant_open' and v_new_session = 1 then
    update public.assistant_visitors set visit_count = visit_count + 1 where visitor_id = p_visitor_id;
    insert into public.assistant_events (visitor_id, session_id, event_name)
    values (p_visitor_id, p_session_id, 'assistant_open');
  elsif p_event_name = 'message_sent' then
    update public.assistant_sessions
    set messages_sent = messages_sent + 1, last_seen = now()
    where session_id = p_session_id and visitor_id = p_visitor_id
    returning messages_sent into v_messages;

    update public.assistant_visitors
    set message_count = message_count + 1,
        conversation_count = conversation_count + case when v_messages = 1 then 1 else 0 end
    where visitor_id = p_visitor_id;

    insert into public.assistant_events (visitor_id, session_id, event_name)
    values (p_visitor_id, p_session_id, 'message_sent');
  end if;
end;
$$;

create or replace function public.record_assistant_message(
  p_visitor_id uuid,
  p_session_id uuid,
  p_role text,
  p_content text,
  p_path text default null,
  p_referrer text default null,
  p_device_type text default null,
  p_browser text default null
) returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if p_role not in ('user', 'assistant') then
    raise exception 'invalid_role';
  end if;

  if p_content is null or char_length(trim(p_content)) = 0 then
    raise exception 'invalid_content';
  end if;

  insert into public.assistant_visitors (
    visitor_id, last_seen, online_until, last_path, referrer, device_type, browser
  ) values (
    p_visitor_id, now(), now() + interval '90 seconds',
    left(p_path, 300), left(p_referrer, 500), left(p_device_type, 40), left(p_browser, 80)
  )
  on conflict (visitor_id) do update set
    last_seen = now(),
    online_until = now() + interval '90 seconds',
    last_path = coalesce(excluded.last_path, assistant_visitors.last_path),
    referrer = coalesce(excluded.referrer, assistant_visitors.referrer),
    device_type = coalesce(excluded.device_type, assistant_visitors.device_type),
    browser = coalesce(excluded.browser, assistant_visitors.browser);

  insert into public.assistant_sessions (session_id, visitor_id)
  values (p_session_id, p_visitor_id)
  on conflict (session_id) do nothing;

  update public.assistant_sessions
  set last_seen = now()
  where session_id = p_session_id and visitor_id = p_visitor_id;

  insert into public.assistant_messages (
    visitor_id, session_id, role, content, path, referrer, device_type, browser
  ) values (
    p_visitor_id, p_session_id, p_role, left(trim(p_content), 4000),
    left(p_path, 300), left(p_referrer, 500), left(p_device_type, 40), left(p_browser, 80)
  );
end;
$$;

create or replace function public.get_assistant_dashboard()
returns jsonb
language sql
security invoker
set search_path = public
as $$
  select jsonb_build_object(
    'summary', jsonb_build_object(
      'uniqueVisitors', (select count(*) from public.assistant_visitors),
      'totalVisits', (select coalesce(sum(visit_count), 0) from public.assistant_visitors),
      'conversations', (select coalesce(sum(conversation_count), 0) from public.assistant_visitors),
      'messages', (select coalesce(sum(message_count), 0) from public.assistant_visitors),
      'online', (select count(*) from public.assistant_visitors where online_until > now())
    ),
    'daily', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'date', day::date,
        'visits', visits,
        'messages', messages
      ) order by day), '[]'::jsonb)
      from (
        select date_trunc('day', created_at) as day,
          count(*) filter (where event_name = 'assistant_open') as visits,
          count(*) filter (where event_name = 'message_sent') as messages
        from public.assistant_events
        where created_at >= current_date - interval '29 days'
        group by 1
      ) d
    ),
    'visitors', (
      select coalesce(jsonb_agg(to_jsonb(v) order by v.last_seen desc), '[]'::jsonb)
      from (
        select visitor_id, first_seen, last_seen,
          (online_until > now()) as online,
          visit_count, conversation_count, message_count,
          last_path, referrer, device_type, browser
        from public.assistant_visitors
        order by last_seen desc
        limit 250
      ) v
    )
  );
$$;

create or replace function public.get_assistant_messages(p_days integer default 30)
returns jsonb
language sql
security invoker
set search_path = public
as $$
  select coalesce(jsonb_agg(to_jsonb(m) order by m.created_at desc), '[]'::jsonb)
  from (
    select id, visitor_id, session_id, role, content, created_at, path, device_type, browser
    from public.assistant_messages
    where created_at >= current_date - make_interval(days => greatest(1, least(coalesce(p_days, 30), 90)))
    order by created_at desc
    limit 500
  ) m;
$$;

revoke all on function public.record_assistant_event(uuid, uuid, text, text, text, text, text) from public, anon, authenticated;
revoke all on function public.record_assistant_message(uuid, uuid, text, text, text, text, text, text) from public, anon, authenticated;
revoke all on function public.get_assistant_dashboard() from public, anon, authenticated;
revoke all on function public.get_assistant_messages(integer) from public, anon, authenticated;
grant execute on function public.record_assistant_event(uuid, uuid, text, text, text, text, text) to service_role;
grant execute on function public.record_assistant_message(uuid, uuid, text, text, text, text, text, text) to service_role;
grant execute on function public.get_assistant_dashboard() to service_role;
grant execute on function public.get_assistant_messages(integer) to service_role;
