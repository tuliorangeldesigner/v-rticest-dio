import { callSupabaseRpc, parseBody, sameOrigin, sendJson } from './_shared.js';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EVENTS=new Set(['pageview','page_exit','link_click','section_view','heartbeat']);
const clean=(value,max)=>typeof value==='string'?value.slice(0,max):null;
export default async function handler(request,response){
 if(request.method!=='POST')return sendJson(response,405,{error:'method_not_allowed'});
 if(!sameOrigin(request))return sendJson(response,403,{error:'forbidden'});
 if(/bot|crawler|spider|preview|facebookexternalhit|whatsapp/i.test(String(request.headers['user-agent']||'')))return sendJson(response,204,null);
 try{
  const b=parseBody(request); if(!UUID.test(b.visitorId)||!UUID.test(b.sessionId)||!EVENTS.has(b.event))return sendJson(response,400,{error:'invalid_event'});
  const h=request.headers;
  await callSupabaseRpc('record_site_event',{p_visitor_id:b.visitorId,p_session_id:b.sessionId,p_event_name:b.event,p_path:clean(b.path,300)||'/',p_title:clean(b.title,200),p_duration:Number.isFinite(b.duration)?Math.round(b.duration):0,p_label:clean(b.label,300),p_referrer:clean(b.referrer,500),p_device:clean(b.device,30),p_browser:clean(b.browser,60),p_os:clean(b.os,60),p_country:clean(h['x-vercel-ip-country'],10),p_region:clean(h['x-vercel-ip-country-region'],60),p_city:clean(h['x-vercel-ip-city']?decodeURIComponent(h['x-vercel-ip-city']):null,100),p_utm_source:clean(b.utmSource,100),p_utm_medium:clean(b.utmMedium,100),p_utm_campaign:clean(b.utmCampaign,150)});
  return sendJson(response,204,null);
 }catch{return sendJson(response,500,{error:'analytics_unavailable'});}
}
