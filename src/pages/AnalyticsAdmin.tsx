import { FormEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart3, ChevronDown, Eye, LogOut, MessageSquare, RefreshCw, Users } from 'lucide-react';

const VISIBLE_ITEMS = 10;

type Dashboard = {
  summary: { uniqueVisitors: number; totalVisits: number; conversations: number; messages: number; online: number };
  daily: { date: string; visits: number; messages: number }[];
  assistantMessages?: { id: number; visitor_id: string; session_id: string; role: 'user' | 'assistant'; content: string; created_at: string; path?: string; device_type?: string; browser?: string }[];
  visitors: { visitor_id: string; first_seen: string; last_seen: string; online: boolean; visit_count: number; conversation_count: number; message_count: number; last_path?: string; referrer?: string; device_type?: string; browser?: string }[];
  site?: {
    summary: { visitors: number; sessions: number; pageviews: number; online: number; avgDuration: number; avgSession: number; bounceRate: number; returning: number };
    topPages: { path: string; views: number; visitors: number; avg_duration: number }[];
    topSections: { path: string; label: string; views: number; visitors: number }[];
    regions: { country: string; region: string; city: string; visitors: number }[];
    sources: { source: string; sessions: number }[];
    clicks: { label: string; clicks: number; visitors: number }[];
    entries: { path: string; sessions: number }[];
    exits: { path: string; sessions: number }[];
    funnel: { siteVisitors: number; serviceVisitors: number; assistantVisitors: number; conversations: number };
    recent: { path: string; title?: string; viewed_at: string; duration_seconds: number; device_type?: string; browser?: string; operating_system?: string; country?: string; region?: string; city?: string }[];
  } | null;
};

type ExpandKey = 'topPages' | 'topSections' | 'regions' | 'recent' | 'sources' | 'clicks' | 'assistantMessages' | 'visitors';

const formatDate = (value: string) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));

const sourceLabel = (value?: string) => {
  if (!value) return 'Direto';
  try {
    return new URL(value).hostname;
  } catch {
    return 'Outra origem';
  }
};

const emptyDash = (value?: string) => value || '—';

const AnalyticsAdmin = () => {
  const [data, setData] = useState<Dashboard | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [needsLogin, setNeedsLogin] = useState(false);
  const [period, setPeriod] = useState(30);
  const [expanded, setExpanded] = useState<Record<ExpandKey, boolean>>({
    topPages: false,
    topSections: false,
    regions: false,
    recent: false,
    sources: false,
    clicks: false,
    assistantMessages: false,
    visitors: false,
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/analytics/dashboard?days=${period}`, { credentials: 'same-origin', cache: 'no-store' });
      if (response.status === 401) {
        setNeedsLogin(true);
        setData(null);
        return;
      }
      if (!response.ok) throw new Error();
      setData(await response.json());
      setNeedsLogin(false);
    } catch {
      setError('Não foi possível carregar as métricas.');
    } finally {
      setLoading(false);
    }
  }, [period]);

  const exportCsv = () => {
    if (!data?.site) return;
    const rows = [
      ['Horário', 'Página', 'Dispositivo', 'Navegador', 'Sistema', 'Cidade', 'Estado', 'País', 'Tempo'],
      ...data.site.recent.map((v) => [v.viewed_at, v.path, v.device_type || '', v.browser || '', v.operating_system || '', v.city || '', v.region || '', v.country || '', String(v.duration_seconds)]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${period}-dias.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!data) return;
    const id = window.setInterval(() => void load(), 30_000);
    return () => window.clearInterval(id);
  }, [data, load]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/analytics/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (response.ok) {
      setPassword('');
      await load();
      return;
    }
    setError(response.status === 429 ? 'Muitas tentativas. Aguarde 15 minutos.' : 'Senha incorreta.');
    setLoading(false);
  };

  const logout = async () => {
    await fetch('/api/analytics/logout', { method: 'POST' });
    setData(null);
    setNeedsLogin(true);
  };

  const toggleExpanded = (key: ExpandKey) => setExpanded((current) => ({ ...current, [key]: !current[key] }));

  const visibleItems = <T,>(key: ExpandKey, items: T[]) => (expanded[key] ? items : items.slice(0, VISIBLE_ITEMS));

  const renderMoreButton = (key: ExpandKey, total: number) => {
    if (total <= VISIBLE_ITEMS) return null;
    const isExpanded = expanded[key];
    return (
      <button
        type="button"
        onClick={() => toggleExpanded(key)}
        className="flex w-full items-center justify-center gap-2 border-t border-border bg-background/35 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
      >
        {isExpanded ? 'Mostrar menos' : `Mostrar mais ${total - VISIBLE_ITEMS}`}
        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    );
  };

  const renderCompactList = (key: ExpandKey, total: number, children: ReactNode) => (
    <>
      <div className="mt-4 space-y-2">{children}</div>
      {renderMoreButton(key, total)}
    </>
  );

  if (needsLogin) return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <Helmet><title>Painel privado | TR Designer</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <form onSubmit={login} className="w-full max-w-sm border border-border bg-card p-7 shadow-2xl">
        <BarChart3 className="mb-5 h-8 w-8 text-accent" />
        <h1 className="font-syne text-2xl font-bold">Painel privado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Entre para visualizar as métricas do Assistente TR.</p>
        <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="admin-password">Senha</label>
        <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-3 outline-none focus:border-accent" autoComplete="current-password" required />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button disabled={loading} className="mt-5 w-full bg-accent px-4 py-3 font-semibold text-accent-foreground disabled:opacity-50">{loading ? 'Entrando…' : 'Entrar'}</button>
      </form>
    </main>
  );

  const cards = data ? [
    ['Online agora', data.summary.online, Users], ['Visitantes únicos', data.summary.uniqueVisitors, Eye],
    ['Visitas ao assistente', data.summary.totalVisits, BarChart3], ['Conversas', data.summary.conversations, MessageSquare],
    ['Mensagens enviadas', data.summary.messages, MessageSquare],
  ] as const : [];

  const assistantMessages = data?.assistantMessages || [];

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-8">
      <Helmet><title>Analytics TR Designer</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">TR Designer</p><h1 className="mt-1 font-syne text-2xl font-bold sm:text-3xl">Analytics TR Designer</h1></div>
          <div className="flex flex-wrap gap-2">
            {[1, 7, 30, 90].map((days) => <button key={days} onClick={() => setPeriod(days)} className={`border px-3 py-2 text-xs ${period === days ? 'border-accent text-accent' : 'border-border'}`}>{days === 1 ? 'Hoje' : `${days} dias`}</button>)}
            <button onClick={exportCsv} className="border border-border px-3 py-2 text-xs">Exportar CSV</button>
            <button onClick={() => void load()} className="border border-border p-3" aria-label="Atualizar"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /></button>
            <button onClick={() => void logout()} className="flex items-center gap-2 border border-border px-4 py-2 text-sm"><LogOut className="h-4 w-4" /> Sair</button>
          </div>
        </header>

        {error && <p className="mt-6 border border-destructive/40 bg-destructive/10 p-4 text-sm">{error}</p>}

        {data && <>
          {data.site && <section className="mt-6">
            <h2 className="font-syne text-xl font-bold">Visão geral do site</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{[
              ['Online', data.site.summary.online],
              ['Visitantes', data.site.summary.visitors],
              ['Sessões', data.site.summary.sessions],
              ['Páginas vistas', data.site.summary.pageviews],
              ['Tempo médio', `${data.site.summary.avgDuration}s`],
            ].map(([label, value]) => <article key={label} className="border border-border bg-card p-5"><p className="text-3xl font-bold">{value}</p><p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p></article>)}</div>

            <div className="mt-4 grid gap-4 xl:grid-cols-3">
              <article className="overflow-hidden border border-border bg-card">
                <div className="p-5">
                  <h3 className="font-syne font-bold">Páginas e projetos mais acessados</h3>
                  {renderCompactList('topPages', data.site.topPages.length, visibleItems('topPages', data.site.topPages).map((p) => <div key={p.path} className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border/60 py-2 text-sm"><span className="truncate">{p.path === '/' ? 'Página inicial' : p.path}</span><span>{p.views} acessos</span><span className="text-muted-foreground">{p.avg_duration}s</span></div>))}
                </div>
              </article>

              <article className="overflow-hidden border border-border bg-card">
                <div className="p-5">
                  <h3 className="font-syne font-bold">Seções visualizadas</h3>
                  {renderCompactList('topSections', data.site.topSections.length, visibleItems('topSections', data.site.topSections).map((s) => <div key={`${s.path}-${s.label}`} className="flex justify-between gap-4 border-b border-border/60 py-2 text-sm"><span className="truncate">{s.label}</span><span>{s.views}</span></div>))}
                </div>
              </article>

              <article className="overflow-hidden border border-border bg-card">
                <div className="p-5">
                  <h3 className="font-syne font-bold">Localização aproximada</h3>
                  {renderCompactList('regions', data.site.regions.length, visibleItems('regions', data.site.regions).map((r, i) => <div key={`${r.country}-${r.region}-${r.city}-${i}`} className="flex justify-between gap-4 border-b border-border/60 py-2 text-sm"><span>{emptyDash(r.city)} · {emptyDash(r.region)} · {emptyDash(r.country)}</span><span>{r.visitors}</span></div>))}
                </div>
              </article>
            </div>

            <article className="mt-4 overflow-hidden border border-border bg-card">
              <div className="p-5"><h3 className="font-syne font-bold">Acessos recentes</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-y border-border bg-secondary/40 text-xs uppercase text-muted-foreground"><tr><th className="p-3">Horário</th><th className="p-3">Página</th><th className="p-3">Dispositivo</th><th className="p-3">Local</th><th className="p-3">Tempo</th></tr></thead>
                  <tbody>{visibleItems('recent', data.site.recent).map((v, i) => <tr key={`${v.viewed_at}-${i}`} className="border-b border-border/60"><td className="p-3">{formatDate(v.viewed_at)}</td><td className="p-3">{v.path === '/' ? 'Página inicial' : v.path}</td><td className="p-3">{emptyDash(v.device_type)} · {emptyDash(v.operating_system)} · {emptyDash(v.browser)}</td><td className="p-3">{emptyDash(v.city)} · {emptyDash(v.region)}</td><td className="p-3">{v.duration_seconds}s</td></tr>)}</tbody>
                </table>
              </div>
              {renderMoreButton('recent', data.site.recent.length)}
            </article>
          </section>}

          {data.site && <section className="mt-6">
            <h2 className="font-syne text-xl font-bold">Comportamento e conversão</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[
              ['Recorrentes', data.site.summary.returning],
              ['Rejeição', `${data.site.summary.bounceRate}%`],
              ['Tempo por sessão', `${data.site.summary.avgSession}s`],
              ['Cliques', data.site.clicks.reduce((total, item) => total + Number(item.clicks), 0)],
            ].map(([label, value]) => <article key={label} className="border border-border bg-card p-5"><p className="text-3xl font-bold">{value}</p><p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p></article>)}</div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              <article className="overflow-hidden border border-border bg-card">
                <div className="p-5">
                  <h3 className="font-syne font-bold">Origem do tráfego</h3>
                  {renderCompactList('sources', data.site.sources.length, visibleItems('sources', data.site.sources).map((item) => <div key={item.source} className="flex justify-between gap-3 border-b border-border/60 py-2 text-sm"><span className="truncate">{sourceLabel(item.source)}</span><span>{item.sessions}</span></div>))}
                </div>
              </article>

              <article className="overflow-hidden border border-border bg-card">
                <div className="p-5">
                  <h3 className="font-syne font-bold">Cliques principais</h3>
                  {renderCompactList('clicks', data.site.clicks.length, visibleItems('clicks', data.site.clicks).map((item) => <div key={item.label} className="flex justify-between gap-3 border-b border-border/60 py-2 text-sm"><span className="truncate">{item.label}</span><span>{item.clicks}</span></div>))}
                </div>
              </article>

              <article className="border border-border bg-card p-5"><h3 className="font-syne font-bold">Entrada → saída</h3>{data.site.entries.slice(0, 6).map((item, index) => <div key={`${item.path}-${index}`} className="mt-2 grid grid-cols-[1fr_auto_1fr] gap-2 border-b border-border/60 py-2 text-xs"><span className="truncate">{item.path === '/' ? 'Início' : item.path}</span><span>→</span><span className="truncate text-right">{data.site?.exits[index]?.path === '/' ? 'Início' : data.site?.exits[index]?.path || '—'}</span></div>)}</article>
              <article className="border border-border bg-card p-5"><h3 className="font-syne font-bold">Funil comercial</h3>{[
                ['Visitantes', data.site.funnel.siteVisitors],
                ['Viram serviços', data.site.funnel.serviceVisitors],
                ['Abriram IA', data.site.funnel.assistantVisitors],
                ['Conversaram', data.site.funnel.conversations],
              ].map(([label, value]) => <div key={label} className="mt-2 flex justify-between border-b border-border/60 py-2 text-sm"><span>{label}</span><span>{value}</span></div>)}</article>
            </div>
          </section>}

          <section className="mt-8"><h2 className="font-syne text-xl font-bold">Analytics do Assistente de IA</h2><div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{cards.map(([label, value, Icon]) => <article key={label} className="border border-border bg-card p-5"><Icon className="h-5 w-5 text-accent" /><p className="mt-5 text-3xl font-bold">{value}</p><p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p></article>)}</div></section>

          <section className="mt-6 overflow-hidden border border-border bg-card">
            <div className="p-5"><h2 className="font-syne text-lg font-bold">Mensagens do assistente</h2><p className="mt-1 text-xs text-muted-foreground">Conteúdo registrado a partir da nova versão do tracking.</p></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="border-y border-border bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-3">Horário</th><th className="p-3">Quem digitou</th><th className="p-3">Visitante</th><th className="p-3">Sessão</th><th className="p-3">Página</th><th className="p-3">Mensagem</th><th className="p-3">Dispositivo</th></tr></thead>
                <tbody>{visibleItems('assistantMessages', assistantMessages).map((message) => <tr key={message.id} className="border-b border-border/60 align-top"><td className="whitespace-nowrap p-3">{formatDate(message.created_at)}</td><td className="p-3"><span className={`inline-flex border px-2 py-1 text-xs font-medium ${message.role === 'user' ? 'border-accent/60 text-accent' : 'border-border text-muted-foreground'}`}>{message.role === 'user' ? 'Visitante' : 'Assistente IA'}</span></td><td className="p-3 font-mono text-xs">{message.visitor_id.slice(0, 8)}</td><td className="p-3 font-mono text-xs">{message.session_id.slice(0, 8)}</td><td className="max-w-44 truncate p-3" title={message.path}>{message.path || '—'}</td><td className="max-w-xl whitespace-pre-wrap p-3 leading-relaxed">{message.content}</td><td className="p-3">{emptyDash(message.device_type)} · {emptyDash(message.browser)}</td></tr>)}</tbody>
              </table>
              {!assistantMessages.length && <p className="p-8 text-center text-sm text-muted-foreground">Nenhuma mensagem registrada nesse período.</p>}
            </div>
            {renderMoreButton('assistantMessages', assistantMessages.length)}
          </section>

          <section className="mt-6 border border-border bg-card p-5"><h2 className="font-syne text-lg font-bold">Últimos 30 dias</h2><div className="mt-5 flex h-48 items-end gap-1 overflow-x-auto">{data.daily.length ? data.daily.map((day) => { const max = Math.max(...data.daily.map((item) => Math.max(item.visits, item.messages)), 1); return <div key={day.date} className="flex min-w-8 flex-1 items-end gap-1" title={`${day.date}: ${day.visits} visitas, ${day.messages} mensagens`}><div className="w-1/2 bg-accent" style={{ height: `${Math.max(4, day.visits / max * 100)}%` }} /><div className="w-1/2 bg-foreground/30" style={{ height: `${Math.max(4, day.messages / max * 100)}%` }} /></div>; }) : <p className="m-auto text-sm text-muted-foreground">Os dados aparecerão após os primeiros acessos.</p>}</div><div className="mt-3 flex gap-5 text-xs text-muted-foreground"><span><i className="mr-2 inline-block h-2 w-2 bg-accent" />Visitas</span><span><i className="mr-2 inline-block h-2 w-2 bg-foreground/30" />Mensagens</span></div></section>

          <section className="mt-6 overflow-hidden border border-border bg-card">
            <div className="p-5"><h2 className="font-syne text-lg font-bold">Visitantes recentes</h2><p className="mt-1 text-xs text-muted-foreground">Identificadores anônimos; mensagens ficam separadas na tabela acima.</p></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-y border-border bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-3">Status</th><th className="p-3">Visitante</th><th className="p-3">Visitas</th><th className="p-3">Conversas</th><th className="p-3">Mensagens</th><th className="p-3">Dispositivo</th><th className="p-3">Origem</th><th className="p-3">Última atividade</th></tr></thead>
                <tbody>{visibleItems('visitors', data.visitors).map((visitor) => <tr key={visitor.visitor_id} className="border-b border-border/60"><td className="p-3"><span className={`inline-flex items-center gap-2 ${visitor.online ? 'text-emerald-400' : 'text-muted-foreground'}`}><i className={`h-2 w-2 rounded-full ${visitor.online ? 'bg-emerald-400' : 'bg-muted-foreground/40'}`} />{visitor.online ? 'Online' : 'Offline'}</span></td><td className="p-3 font-mono text-xs">{visitor.visitor_id.slice(0, 8)}</td><td className="p-3">{visitor.visit_count}</td><td className="p-3">{visitor.conversation_count}</td><td className="p-3">{visitor.message_count}</td><td className="p-3">{emptyDash(visitor.device_type)} · {emptyDash(visitor.browser)}</td><td className="max-w-52 truncate p-3" title={visitor.referrer}>{sourceLabel(visitor.referrer)}</td><td className="p-3">{formatDate(visitor.last_seen)}</td></tr>)}</tbody>
              </table>
              {!data.visitors.length && <p className="p-8 text-center text-sm text-muted-foreground">Nenhum visitante registrado ainda.</p>}
            </div>
            {renderMoreButton('visitors', data.visitors.length)}
          </section>
        </>}
      </div>
    </main>
  );
};

export default AnalyticsAdmin;
