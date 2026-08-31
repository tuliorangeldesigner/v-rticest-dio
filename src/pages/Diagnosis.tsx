import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import { trackConversion } from '@/lib/conversion';
import { toast } from '@/hooks/use-toast';
import { formatDiagnosisSignals, getDiagnosisSignals } from '@/lib/diagnosis';

const diagnosisSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.'),
  company: z.string().trim().min(2, 'Informe sua empresa ou marca.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  whatsapp: z.string().trim().min(10, 'Informe seu WhatsApp com DDD.'),
  profile: z.string().trim().min(3, 'Informe seu Instagram ou site.'),
  presence: z.string().min(1, 'Escolha a situação mais próxima.'),
  service: z.string().min(1, 'Escolha um serviço.'),
  challenge: z.string().min(1, 'Escolha sua principal dificuldade.'),
  goal: z.string().min(1, 'Escolha seu principal objetivo.'),
  moment: z.string().min(1, 'Escolha o momento da empresa.'),
  budget: z.string().min(1, 'Escolha uma faixa de investimento.'),
  deadline: z.string().min(1, 'Escolha um prazo.'),
  decision: z.string().min(1, 'Informe como a decisão é tomada.'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Autorize o contato para enviar a solicitação.' }) }),
});

type DiagnosisFormData = z.infer<typeof diagnosisSchema>;
type FieldName = keyof DiagnosisFormData;

type Option = { value: string; label: string; detail?: string };
type Step = {
  eyebrow: string;
  title: string;
  description: string;
  fields: FieldName[];
};

const steps: Step[] = [
  { eyebrow: 'Começando pelo essencial', title: 'Como devemos chamar você e sua marca?', description: 'Essas informações aparecem somente na sua solicitação.', fields: ['name', 'company'] },
  { eyebrow: 'Canal de retorno', title: 'Onde encontramos você?', description: 'A análise inicial será enviada pelo WhatsApp em até 48 horas.', fields: ['whatsapp', 'email', 'profile'] },
  { eyebrow: 'Presença atual', title: 'Qual cenário mais se parece com o seu hoje?', description: 'Escolha a alternativa mais próxima, mesmo que não seja perfeita.', fields: ['presence'] },
  { eyebrow: 'Tipo de projeto', title: 'Onde você acredita que precisa de ajuda?', description: 'Isso não define o projeto final. Serve apenas para orientar a leitura.', fields: ['service'] },
  { eyebrow: 'Ponto de tensão', title: 'Qual é a principal dificuldade da sua marca?', description: 'Escolha apenas uma: a que mais limita seus resultados agora.', fields: ['challenge'] },
  { eyebrow: 'Direção desejada', title: 'O que você mais quer conquistar?', description: 'Vamos comparar esse objetivo com o que sua presença comunica hoje.', fields: ['goal'] },
  { eyebrow: 'Contexto do negócio', title: 'Em que momento sua empresa está?', description: 'Investimento não é cobrança: ajuda a sugerir uma direção realista.', fields: ['moment', 'budget'] },
  { eyebrow: 'Último alinhamento', title: 'Quando e como esse projeto pode acontecer?', description: 'Depois disso, você poderá revisar tudo antes de enviar.', fields: ['deadline', 'decision', 'consent'] },
];

const optionGroups: Partial<Record<FieldName, Option[]>> = {
  presence: [
    { value: 'visual-inconsistente', label: 'Minha comunicação visual não tem consistência', detail: 'Cada peça parece pertencer a uma marca diferente.' },
    { value: 'site-desatualizado', label: 'Meu site ou perfil está desatualizado', detail: 'A presença atual não representa mais o nível da empresa.' },
    { value: 'oferta-confusa', label: 'As pessoas não entendem bem o que ofereço', detail: 'Recebo dúvidas básicas ou atraio o público errado.' },
    { value: 'presenca-ok', label: 'A presença parece boa, mas não gera resultado', detail: 'Existe apresentação, porém faltam contatos qualificados.' },
  ],
  service: [
    { value: 'estrategia', label: 'Posicionamento e estratégia' },
    { value: 'identidade-visual', label: 'Identidade visual ou reposicionamento' },
    { value: 'site', label: 'Site ou landing page' },
    { value: 'social-media', label: 'Social media e conteúdo' },
    { value: 'criativos', label: 'Criativos, vídeos ou campanhas' },
    { value: 'nao-sei', label: 'Ainda não sei do que preciso' },
  ],
  challenge: [
    { value: 'posicionamento', label: 'Não consigo comunicar meu diferencial' },
    { value: 'site-nao-converte', label: 'Tenho presença, mas ela não gera contatos' },
    { value: 'visual-amador', label: 'Minha marca parece menos profissional do que é' },
    { value: 'comunicacao-confusa', label: 'Minha oferta e meus serviços estão confusos' },
    { value: 'presenca-desconectada', label: 'Site, redes e materiais não conversam entre si' },
  ],
  goal: [
    { value: 'mais-clientes', label: 'Atrair contatos mais qualificados' },
    { value: 'mais-autoridade', label: 'Construir autoridade e diferenciação' },
    { value: 'parecer-profissional', label: 'Elevar a percepção profissional' },
    { value: 'organizar-presenca', label: 'Organizar toda a presença digital' },
  ],
  moment: [
    { value: 'inicio', label: 'Estou começando ou validando a ideia' },
    { value: 'crescimento', label: 'A empresa está crescendo e precisa se estruturar' },
    { value: 'reposicionamento', label: 'Já tenho mercado e preciso me reposicionar' },
    { value: 'escala', label: 'Tenho operação madura e quero escalar' },
  ],
  budget: [
    { value: 'ate-3k', label: 'Até R$ 3 mil' },
    { value: '3k-7k', label: 'De R$ 3 mil a R$ 7 mil' },
    { value: '7k-15k', label: 'De R$ 7 mil a R$ 15 mil' },
    { value: '15k+', label: 'Acima de R$ 15 mil' },
    { value: 'avaliando', label: 'Ainda estou avaliando' },
  ],
  deadline: [
    { value: 'agora', label: 'Quero começar assim que possível' },
    { value: '30-60', label: 'Nos próximos 30 a 60 dias' },
    { value: 'sem-pressa', label: 'Estou pesquisando, sem prazo definido' },
  ],
  decision: [
    { value: 'decido', label: 'Eu tomo a decisão' },
    { value: 'socio', label: 'Decido com sócio(a) ou equipe' },
    { value: 'pesquisa', label: 'Estou pesquisando para outra pessoa' },
  ],
};

const optionLabel = (field: FieldName, value: string) => optionGroups[field]?.find((option) => option.value === value)?.label ?? value;
const inputClass = 'w-full border-0 border-b border-border bg-transparent px-0 py-4 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-accent';

const Diagnosis = () => {
  const [step, setStep] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: { consent: false as true },
    mode: 'onTouched',
  });

  const values = watch();
  const currentStep = steps[step];
  const progress = ((isReviewing ? steps.length + 1 : step + 1) / (steps.length + 1)) * 100;
  const signals = useMemo(() => getDiagnosisSignals({
    challenge: values.challenge ?? '', goal: values.goal ?? '', presence: values.presence ?? '', service: values.service ?? '',
  }), [values.challenge, values.goal, values.presence, values.service]);

  const continueFlow = async () => {
    const valid = await trigger(currentStep.fields, { shouldFocus: true });
    if (!valid) return;
    if (step === steps.length - 1) setIsReviewing(true);
    else setStep((current) => current + 1);
  };

  const goBack = () => {
    if (isReviewing) setIsReviewing(false);
    else setStep((current) => Math.max(0, current - 1));
  };

  const onSubmit = async (data: DiagnosisFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/tuliorangeldesigner@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[Diagnóstico gratuito] ${data.company} — ${data.name}`,
          _captcha: 'false', _template: 'table',
          Nome: data.name, Empresa: data.company, WhatsApp: data.whatsapp, Email: data.email,
          'Instagram ou site': data.profile,
          'Presença atual': optionLabel('presence', data.presence),
          'Serviço percebido': optionLabel('service', data.service),
          'Principal dificuldade': optionLabel('challenge', data.challenge),
          Objetivo: optionLabel('goal', data.goal),
          'Momento da empresa': optionLabel('moment', data.moment),
          'Faixa de investimento': optionLabel('budget', data.budget),
          Prazo: optionLabel('deadline', data.deadline),
          Decisão: optionLabel('decision', data.decision),
          'Sinais para revisão manual': formatDiagnosisSignals(data),
        }),
      });
      if (!response.ok) throw new Error('Falha no envio');
      setIsSubmitted(true);
      trackConversion('diagnosis_complete');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast({ title: 'Não foi possível enviar agora', description: 'Suas respostas foram mantidas. Tente novamente em instantes.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderOptions = (field: FieldName) => (
    <div className="grid gap-3">
      {optionGroups[field]?.map((option, index) => (
        <label key={option.value} className={`group flex cursor-pointer gap-4 border p-4 transition-all md:p-5 ${values[field] === option.value ? 'border-accent bg-accent/[0.07]' : 'border-border/70 bg-card/20 hover:border-foreground/40'}`}>
          <input type="radio" value={option.value} {...register(field)} className="sr-only" />
          <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-mono ${values[field] === option.value ? 'border-accent bg-accent text-accent-foreground' : 'border-border text-muted-foreground'}`}>{String(index + 1).padStart(2, '0')}</span>
          <span><strong className="block font-syne text-base font-medium text-foreground md:text-lg">{option.label}</strong>{option.detail && <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{option.detail}</span>}</span>
        </label>
      ))}
      {errors[field] && <p className="text-sm text-destructive">{errors[field]?.message as string}</p>}
    </div>
  );

  const renderFields = () => {
    switch (step) {
      case 0: return <div className="grid gap-8 md:grid-cols-2"><label className="space-y-2"><span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Seu nome</span><input {...register('name')} autoFocus placeholder="Marco Túlio" className={inputClass} />{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}</label><label className="space-y-2"><span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Empresa ou marca</span><input {...register('company')} placeholder="Nome da sua marca" className={inputClass} />{errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}</label></div>;
      case 1: return <div className="grid gap-8 md:grid-cols-2"><label className="space-y-2"><span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">WhatsApp com DDD</span><input {...register('whatsapp')} inputMode="tel" placeholder="(41) 99999-9999" className={inputClass} />{errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp.message}</p>}</label><label className="space-y-2"><span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">E-mail</span><input {...register('email')} type="email" placeholder="voce@empresa.com" className={inputClass} />{errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}</label><label className="space-y-2 md:col-span-2"><span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Instagram ou site</span><input {...register('profile')} placeholder="@suaempresa ou seusite.com.br" className={inputClass} />{errors.profile && <p className="text-sm text-destructive">{errors.profile.message}</p>}</label></div>;
      case 2: return renderOptions('presence');
      case 3: return renderOptions('service');
      case 4: return renderOptions('challenge');
      case 5: return renderOptions('goal');
      case 6: return <div className="grid gap-10"><div><p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">Momento atual</p>{renderOptions('moment')}</div><div><p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">Investimento possível</p>{renderOptions('budget')}</div></div>;
      case 7: return <div className="grid gap-10"><div><p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">Prazo</p>{renderOptions('deadline')}</div><div><p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">Decisão</p>{renderOptions('decision')}</div><label className="flex cursor-pointer items-start gap-3 border-t border-border pt-6"><input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 accent-[hsl(var(--accent))]" /><span className="text-sm leading-relaxed text-muted-foreground">Autorizo a TR Designer a usar estas informações para preparar o diagnóstico inicial e entrar em contato. Li a <Link to="/privacy-policy" className="text-foreground underline underline-offset-4">Política de Privacidade</Link>.</span></label>{errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}</div>;
      default: return null;
    }
  };

  if (isSubmitted) return <div className="min-h-screen bg-background"><Navigation /><SEO title="Diagnóstico recebido" description="Sua solicitação de diagnóstico inicial foi recebida pela TR Designer." url="/diagnostico" /><main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 pb-16 pt-32"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full"><div className="mb-16 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-accent"><span className="flex h-6 w-6 items-center justify-center border border-accent"><Check className="h-3.5 w-3.5" /></span> Solicitação registrada</div><h1 className="max-w-5xl font-syne text-5xl font-bold leading-[0.96] tracking-[-0.055em] md:text-7xl lg:text-8xl">Recebido, <span className="text-accent">{values.name?.split(' ')[0]}.</span><br /><span className="text-muted-foreground">Agora começa o olhar humano.</span></h1><div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-[1.2fr_1fr]"><p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">Sua solicitação entrou na fila. Vou observar a clareza da oferta, a percepção visual e o caminho até o contato. Você recebe uma análise inicial pelo WhatsApp em até 48 horas.</p><div className="space-y-4">{['Respostas registradas', 'Perfil revisado manualmente', 'Retorno direto no WhatsApp'].map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-border/60 pb-4"><span className="font-mono text-xs text-accent">0{index + 1}</span><span>{item}</span></div>)}</div></div></motion.div></main></div>;

  return <div className="min-h-screen bg-background"><Navigation /><SEO title="Diagnóstico de Presença Digital Gratuito" description="Descubra os principais pontos de atenção da presença digital da sua empresa com uma análise inicial gratuita da TR Designer." url="/diagnostico" /><main className="relative min-h-screen overflow-hidden px-6 pb-12 pt-28 md:px-10 md:pt-36"><div className="pointer-events-none absolute right-[-12rem] top-24 h-[32rem] w-[32rem] rounded-full bg-accent/[0.06] blur-[100px]" /><div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><aside className="hidden border-r border-border/60 pr-12 lg:flex lg:flex-col lg:justify-between"><div><p className="text-xs uppercase tracking-[0.28em] text-accent">Diagnóstico inicial gratuito</p><h2 className="mt-8 font-syne text-5xl font-bold leading-[0.95] tracking-[-0.045em]">Sua presença fala antes da sua proposta.</h2><p className="mt-7 max-w-sm leading-relaxed text-muted-foreground">Em poucos minutos, você me dá o contexto. Depois, eu observo onde sua marca perde clareza, percepção ou oportunidades.</p></div><div className="space-y-5 border-t border-border pt-6 text-sm text-muted-foreground"><div className="flex gap-3"><ShieldCheck className="h-5 w-5 text-accent" /> Seus dados são usados apenas para esta análise.</div><p>Leitura humana · Sem compromisso · Retorno em até 48h</p></div></aside><section className="flex min-w-0 flex-col"><header className="mb-10 flex items-center justify-between border-b border-border/60 pb-5"><span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">TR / Diagnóstico</span><div className="flex items-center gap-4"><span className="font-mono text-xs text-muted-foreground">{String(isReviewing ? steps.length + 1 : step + 1).padStart(2, '0')} / 09</span><span className="relative h-px w-24 overflow-hidden bg-border md:w-40"><motion.span className="absolute inset-y-0 left-0 bg-accent" animate={{ width: `${progress}%` }} /></span></div></header><form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col"><AnimatePresence mode="wait"><motion.div key={isReviewing ? 'review' : step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="flex-1">{isReviewing ? <div><p className="text-xs uppercase tracking-[0.28em] text-accent">Revisão final</p><h1 className="mt-5 font-syne text-4xl font-bold leading-[1] tracking-[-0.04em] md:text-6xl">Confira antes de enviar.</h1><p className="mt-4 text-muted-foreground">Sua análise será preparada manualmente. Estes sinais são apenas um roteiro interno para direcionar meu olhar.</p><div className="mt-10 grid gap-4 md:grid-cols-3">{signals.map((signal, index) => <div key={signal.key} className="border border-border bg-card/20 p-5"><span className="font-mono text-xs text-accent">SINAL 0{index + 1}</span><h3 className="mt-4 font-syne text-lg font-semibold">{signal.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{signal.description}</p></div>)}</div><div className="mt-8 grid gap-3 border-t border-border pt-6 text-sm md:grid-cols-2"><p><span className="text-muted-foreground">Contato:</span> {values.name} · {values.whatsapp}</p><p><span className="text-muted-foreground">Marca:</span> {values.company}</p><p><span className="text-muted-foreground">Principal desafio:</span> {optionLabel('challenge', values.challenge)}</p><p><span className="text-muted-foreground">Objetivo:</span> {optionLabel('goal', values.goal)}</p></div></div> : <div><p className="text-xs uppercase tracking-[0.28em] text-accent">{currentStep.eyebrow}</p><h1 className="mt-5 max-w-3xl font-syne text-4xl font-bold leading-[1] tracking-[-0.04em] md:text-6xl">{currentStep.title}</h1><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{currentStep.description}</p><div className="mt-10 max-w-3xl">{renderFields()}</div></div>}</motion.div></AnimatePresence><footer className="mt-12 flex items-center justify-between border-t border-border/60 pt-6"><button type="button" onClick={goBack} disabled={!isReviewing && step === 0} className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:invisible"><ArrowLeft className="h-4 w-4" /> Voltar</button>{isReviewing ? <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-60">{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{isSubmitting ? 'Enviando...' : 'Enviar para análise'}</button> : <button type="button" onClick={continueFlow} className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.02]">Continuar <ArrowRight className="h-4 w-4" /></button>}</footer></form></section></div></main></div>;
};

export default Diagnosis;
