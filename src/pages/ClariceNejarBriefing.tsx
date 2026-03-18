import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Check,
  Clipboard,
  Download,
  Eraser,
  FileText,
  Save,
  Sparkles,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import clariceCover from "@/assets/clarice.webp";

const STORAGE_KEY = "briefing-clarice-nejar-v1";

type BriefingFormData = {
  principalObjetivo: string;
  siteApresenta: string;
  mensagemSensacao: string;
  publico: string;
  areasTrabalho: string;
  secoesIndispensaveis: string;
  mentoriaDestaque: string;
  conteudosInicio: string;
  estiloVisual: string;
  coresElementos: string;
  referenciasVisuais: string;
  fotosMateriais: string;
  whatsappFormulario: string;
  agendaEventos: string;
  linksExternos: string;
  naoPodeFaltar: string;
};

type Question = {
  name: keyof BriefingFormData;
  label: string;
  placeholder: string;
  type?: "input" | "textarea";
};

type Section = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  questions: Question[];
};

const defaultValues: BriefingFormData = {
  principalObjetivo: "",
  siteApresenta: "",
  mensagemSensacao: "",
  publico: "",
  areasTrabalho: "",
  secoesIndispensaveis: "",
  mentoriaDestaque: "",
  conteudosInicio: "",
  estiloVisual: "",
  coresElementos: "",
  referenciasVisuais: "",
  fotosMateriais: "",
  whatsappFormulario: "",
  agendaEventos: "",
  linksExternos: "",
  naoPodeFaltar: "",
};

const sections: Section[] = [
  {
    id: "essencia",
    index: "01",
    title: "Essência e objetivo",
    subtitle: "Direcionamento estratégico do site",
    questions: [
      {
        name: "principalObjetivo",
        label: "Qual é o principal objetivo do site?",
        placeholder: "Ex.: fortalecer autoridade, captar mentoradas, apresentar portfólio artístico, vender ingressos.",
      },
      {
        name: "siteApresenta",
        label: "O site deve apresentar mais a artista, a mentora ou as duas?",
        placeholder: "Explique qual frente precisa receber mais peso e como elas devem conviver.",
      },
      {
        name: "mensagemSensacao",
        label: "Qual mensagem ou sensação o site deve transmitir?",
        placeholder: "Ex.: profundidade, sensibilidade, presença, sofisticação, espiritualidade, acolhimento.",
      },
      {
        name: "publico",
        label: "Quem é o público que você deseja alcançar?",
        placeholder: "Descreva perfil, momento de vida, interesses e o que essa pessoa busca.",
      },
    ],
  },
  {
    id: "estrutura",
    index: "02",
    title: "Estrutura e conteúdo",
    subtitle: "Arquitetura da informação e prioridades",
    questions: [
      {
        name: "areasTrabalho",
        label: "Quais áreas do seu trabalho devem aparecer no site?",
        placeholder: "Liste frentes, projetos, serviços, obras, palestras, mentoria e produtos.",
      },
      {
        name: "secoesIndispensaveis",
        label: "Quais seções são indispensáveis?",
        placeholder: "Ex.: sobre, agenda, obras, mentoria, depoimentos, contato, imprensa.",
      },
      {
        name: "mentoriaDestaque",
        label: "A mentoria A Voz da Alma terá destaque na página inicial ou em página própria?",
        placeholder: "Descreva como imagina essa presença e se haverá CTA principal para ela.",
      },
      {
        name: "conteudosInicio",
        label: "Quais conteúdos precisam aparecer logo no início do site?",
        placeholder: "O que precisa ser visto nos primeiros segundos para orientar a visita?",
      },
    ],
  },
  {
    id: "estetica",
    index: "03",
    title: "Estética e linguagem",
    subtitle: "Referências visuais, símbolos e material base",
    questions: [
      {
        name: "estiloVisual",
        label: "Qual estilo visual mais combina com sua marca?",
        placeholder: "Ex.: editorial, poético, minimalista, orgânico, contemporâneo, ritualístico.",
      },
      {
        name: "coresElementos",
        label: "Quais cores, elementos ou símbolos representam seu universo?",
        placeholder: "Descreva paleta, texturas, símbolos, formas ou atmosferas importantes.",
      },
      {
        name: "referenciasVisuais",
        label: "Você possui referências visuais de sites que gosta?",
        placeholder: "Liste links, nomes de artistas, marcas ou estilos que sirvam de referência.",
      },
      {
        name: "fotosMateriais",
        label: "Você já tem fotos profissionais e materiais para usar?",
        placeholder: "Detalhe o que já existe: retratos, vídeos, textos, identidade visual, press kit.",
      },
    ],
  },
  {
    id: "conversao",
    index: "04",
    title: "Contato e conversão",
    subtitle: "Canais, integração e fechamento da experiência",
    questions: [
      {
        name: "whatsappFormulario",
        label: "O site precisa ter botão de WhatsApp e formulário de contato?",
        placeholder: "Defina os canais desejados e como prefere receber contatos.",
      },
      {
        name: "agendaEventos",
        label: "Você quer incluir agenda, eventos, inscrições ou agendamentos?",
        placeholder: "Explique o que precisa ser integrado ou exibido.",
      },
      {
        name: "linksExternos",
        label: "Quais links externos devem entrar no site?",
        placeholder: "Ex.: Instagram, YouTube, Spotify, Sympla, WhatsApp, imprensa, loja.",
      },
      {
        name: "naoPodeFaltar",
        label: "Para você, o que não pode faltar para esse site ficar perfeito?",
        placeholder: "Registre critérios decisivos, exigências e detalhes que não podem ser perdidos.",
      },
    ],
  },
];

const readStoredValues = (): BriefingFormData => {
  if (typeof window === "undefined") {
    return defaultValues;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultValues;
    }

    const parsed = JSON.parse(raw) as Partial<BriefingFormData>;
    return { ...defaultValues, ...parsed };
  } catch {
    return defaultValues;
  }
};

const formatDateTime = (value: Date | null) => {
  if (!value) {
    return "Nenhum salvamento ainda";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
};

const buildSummary = (values: BriefingFormData) =>
  [
    "BRIEFING DE SITE",
    "Cliente: Clarice Nejar",
    "",
    "BLOCO 1 — Essência e objetivo",
    `1. Principal objetivo do site: ${values.principalObjetivo || "Pendente"}`,
    `2. Foco principal do site: ${values.siteApresenta || "Pendente"}`,
    `3. Mensagem ou sensação desejada: ${values.mensagemSensacao || "Pendente"}`,
    `4. Público desejado: ${values.publico || "Pendente"}`,
    "",
    "BLOCO 2 — Estrutura e conteúdo",
    `5. Áreas do trabalho no site: ${values.areasTrabalho || "Pendente"}`,
    `6. Seções indispensáveis: ${values.secoesIndispensaveis || "Pendente"}`,
    `7. Destaque da mentoria A Voz da Alma: ${values.mentoriaDestaque || "Pendente"}`,
    `8. Conteúdos prioritários no início: ${values.conteudosInicio || "Pendente"}`,
    "",
    "BLOCO 3 — Estética e linguagem",
    `9. Estilo visual da marca: ${values.estiloVisual || "Pendente"}`,
    `10. Cores, elementos e símbolos: ${values.coresElementos || "Pendente"}`,
    `11. Referências visuais: ${values.referenciasVisuais || "Pendente"}`,
    `12. Fotos e materiais disponíveis: ${values.fotosMateriais || "Pendente"}`,
    "",
    "BLOCO 4 — Contato e conversão",
    `13. WhatsApp e formulário: ${values.whatsappFormulario || "Pendente"}`,
    `14. Agenda, eventos ou agendamentos: ${values.agendaEventos || "Pendente"}`,
    `15. Links externos: ${values.linksExternos || "Pendente"}`,
    `16. O que não pode faltar: ${values.naoPodeFaltar || "Pendente"}`,
  ].join("\n");

const countAnswered = (values: BriefingFormData) =>
  Object.values(values).filter((value) => value.trim().length > 0).length;

const ClariceNejarBriefing = () => {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<BriefingFormData>({
    defaultValues: readStoredValues(),
  });

  const values = form.watch();
  const answeredCount = countAnswered(values);
  const completion = Math.round((answeredCount / 16) * 100);
  const summary = useMemo(() => buildSummary(values), [values]);

  useEffect(() => {
    setIsDirty(true);
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
        setLastSavedAt(new Date());
        setIsDirty(false);
      } catch {
        toast({
          title: "Falha ao salvar o briefing",
          description: "O navegador bloqueou o salvamento local das respostas.",
          variant: "destructive",
        });
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [values]);

  const handleReset = () => {
    form.reset(defaultValues);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setLastSavedAt(null);
    setIsDirty(false);
    toast({
      title: "Briefing limpo",
      description: "Todas as respostas locais foram removidas desta máquina.",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
      toast({
        title: "Briefing copiado",
        description: "O resumo completo foi enviado para a área de transferência.",
      });
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Seu navegador impediu o acesso à área de transferência.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const file = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "briefing-clarice-nejar.txt";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Briefing de Site | Clarice Nejar"
        description="Página interna de briefing para consolidar objetivos, estrutura, estética e conversão do site de Clarice Nejar."
        url="/briefing/clarice-nejar"
      />

      <div className="noise-overlay" />
      <Navigation />

      <main className="pt-32 md:pt-40">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.16),transparent_28%),radial-gradient(circle_at_left,hsl(var(--foreground)/0.08),transparent_32%)]" />
          <div className="container-wide relative z-10 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="border border-border bg-card/30"
            >
              <div className="grid gap-8 p-8 md:p-10">
                <div className="grid gap-8 xl:grid-cols-[1fr_auto] xl:items-end">
                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      <span className="label text-accent">Portal do briefing</span>
                      <div className="h-px w-16 bg-accent/70" />
                      <span className="text-sm text-muted-foreground">Sem link público no menu</span>
                    </div>

                    <motion.h1
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.8 }}
                      className="font-epic text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                    >
                      Briefing Clarice
                      <br />
                      <span className="text-accent">Nejar</span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.8 }}
                      className="body-lg mt-8 max-w-4xl text-muted-foreground"
                    >
                      Estruture o projeto em quatro blocos, com salvamento automático local e resumo consolidado dentro da
                      própria página. Tudo o que for preenchido permanece gravado neste briefing no mesmo navegador.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="grid gap-3 text-sm text-muted-foreground md:min-w-[320px]"
                  >
                    <div className="flex items-center justify-between gap-6 border-b border-border/60 pb-3">
                      <span className="font-mono uppercase tracking-[0.18em]">Status</span>
                      <span className="font-mono text-foreground">Em andamento</span>
                    </div>
                    <div className="flex items-center justify-between gap-6 border-b border-border/60 pb-3">
                      <span className="font-mono uppercase tracking-[0.18em]">Atualização</span>
                      <span className="font-mono text-foreground">18 de março de 2026</span>
                    </div>
                    <div className="flex items-center justify-between gap-6 border-b border-border/60 pb-3">
                      <span className="font-mono uppercase tracking-[0.18em]">Progresso</span>
                      <span className="font-mono text-foreground">{completion}%</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span className="font-mono uppercase tracking-[0.18em]">Salvamento</span>
                      <span className="font-mono text-foreground">{isDirty ? "Salvando..." : "Local"}</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="border-t border-border pt-8"
                >
                  <div className="group relative overflow-hidden border border-border bg-card/20 p-4 md:p-5">
                    <div className="absolute inset-4 md:inset-5 z-10 bg-gradient-to-t from-background via-background/10 to-transparent" />
                    <img
                      src={clariceCover}
                      alt="Clarice Nejar"
                      className="h-[360px] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] md:h-[560px] xl:h-[680px]"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-20 p-10 md:p-12">
                      <p className="label text-accent">Capa do briefing</p>
                      <p className="mt-3 max-w-xl font-syne text-2xl font-bold leading-tight text-foreground md:text-3xl">
                        Presença, sensibilidade e direção para o novo site.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.8 }}
                  className="grid gap-px border border-border bg-border sm:grid-cols-3"
                >
                  <div className="bg-card/60 p-5 backdrop-blur-sm">
                    <span className="label text-muted-foreground">Progresso</span>
                    <p className="mt-3 font-syne text-4xl font-bold text-foreground">{completion}%</p>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${completion}%` }} />
                    </div>
                  </div>

                  <div className="bg-card/60 p-5 backdrop-blur-sm">
                    <span className="label text-muted-foreground">Respondidas</span>
                    <p className="mt-3 font-syne text-4xl font-bold text-foreground">{answeredCount}/16</p>
                    <p className="mt-3 text-sm text-muted-foreground">Cada resposta aparece em tempo real no resumo final.</p>
                  </div>

                  <div className="bg-card/60 p-5 backdrop-blur-sm">
                    <span className="label text-muted-foreground">Status</span>
                    <p className="mt-3 flex items-center gap-2 text-sm text-foreground">
                      <Save className="h-4 w-4 text-accent" />
                      {isDirty ? "Salvando..." : "Salvo localmente"}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{formatDateTime(lastSavedAt)}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container-wide py-12 md:py-16">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_420px]">
            <div className="space-y-6">
              <div className="border border-border bg-secondary/20 p-6 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="label text-accent">Modo de uso</p>
                    <h2 className="heading-sm mt-3">Preenchimento contínuo, sem envio externo</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
                    <Sparkles className="h-4 w-4" />
                    Respostas salvas no próprio briefing
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="border border-border bg-background/60 p-4">
                    <p className="label text-muted-foreground">1. Preencha</p>
                    <p className="mt-2 text-sm text-muted-foreground">Responda por bloco, no ritmo que fizer sentido.</p>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <p className="label text-muted-foreground">2. Continue depois</p>
                    <p className="mt-2 text-sm text-muted-foreground">O navegador mantém as respostas desta página salvas.</p>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <p className="label text-muted-foreground">3. Exporte</p>
                    <p className="mt-2 text-sm text-muted-foreground">Copie ou baixe o resumo quando o briefing estiver pronto.</p>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <Accordion type="multiple" defaultValue={sections.map((section) => section.id)} className="space-y-4">
                  {sections.map((section) => {
                    const answeredInSection = section.questions.filter(
                      ({ name }) => values[name].trim().length > 0,
                    ).length;

                    return (
                      <AccordionItem
                        key={section.id}
                        value={section.id}
                        className="overflow-hidden border border-border bg-card/40 backdrop-blur-sm"
                      >
                        <AccordionTrigger className="px-6 py-5 text-left hover:no-underline md:px-8">
                          <div className="grid w-full gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-sm text-accent">
                              {section.index}
                            </div>
                            <div>
                              <p className="heading-sm text-foreground">{section.title}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{section.subtitle}</p>
                            </div>
                            <div className="justify-self-start border border-border px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground md:justify-self-end">
                              {answeredInSection}/{section.questions.length}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                          <div className="grid gap-5">
                            {section.questions.map((question) => {
                              const hasValue = values[question.name].trim().length > 0;

                              return (
                                <div key={question.name} className="border border-border bg-background/55 p-4 md:p-5">
                                  <div className="mb-3 flex items-start justify-between gap-4">
                                    <label htmlFor={question.name} className="max-w-3xl text-base font-medium text-foreground">
                                      {question.label}
                                    </label>
                                    {hasValue ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> : null}
                                  </div>

                                  {question.type === "input" ? (
                                    <Input
                                      id={question.name}
                                      {...form.register(question.name)}
                                      placeholder={question.placeholder}
                                      className="min-h-12 rounded-none border-border bg-secondary/20 px-4 py-3 text-base placeholder:text-muted-foreground/70 focus-visible:ring-accent"
                                    />
                                  ) : (
                                    <Textarea
                                      id={question.name}
                                      {...form.register(question.name)}
                                      placeholder={question.placeholder}
                                      className="min-h-[150px] rounded-none border-border bg-secondary/20 px-4 py-3 text-base placeholder:text-muted-foreground/70 focus-visible:ring-accent"
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </form>
            </div>

            <aside className="space-y-5 xl:sticky xl:top-28 xl:h-fit">
              <div className="border border-border bg-card/70 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="label text-accent">Resumo vivo</p>
                    <h2 className="mt-2 font-syne text-2xl font-bold">Briefing consolidado</h2>
                  </div>
                  <FileText className="h-5 w-5 text-accent" />
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  Este painel mostra exatamente o que já foi registrado no briefing e serve como base final para o projeto.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  <Button
                    type="button"
                    onClick={handleCopy}
                    variant="outline"
                    className="justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent"
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    {isCopied ? "Copiado" : "Copiar"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDownload}
                    variant="outline"
                    className="justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent"
                  >
                    <Download className="h-4 w-4" />
                    Baixar .txt
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="justify-start rounded-none border-destructive/40 bg-background/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Eraser className="h-4 w-4" />
                    Limpar
                  </Button>
                </div>
              </div>

              <div className="border border-border bg-secondary/20 p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="label text-muted-foreground">Conteúdo registrado</span>
                  <span className="text-xs text-muted-foreground">{answeredCount} respostas preenchidas</span>
                </div>
                <pre className="max-h-[820px] overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-7 text-muted-foreground">
                  {summary}
                </pre>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ClariceNejarBriefing;
