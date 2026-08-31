import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { BriefcaseBusiness, Check, Clipboard, Download, Eraser, FileText, Save, Send, Upload } from "lucide-react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "briefing-michel-queiroz-assis-v1";
const STORAGE_TIMESTAMP_KEY = `${STORAGE_KEY}-timestamp`;
const CLIENT_NAME = "MICHEL QUEIROZ DE ASSIS ADVOGADOS ASSOCIADOS";
const TARGET_EMAIL = "tuliorangeldesigner@gmail.com";
const BRIEFING_SUBMIT_ENDPOINT = "/api/briefing/michel-queiroz-assis";
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/077155c39ad40c69289f867d6e161917";

type BriefingFormData = {
  objetivoSite: string;
  publicoAlvo: string;
  secoesSite: string;
  areasAtuacao: string;
  areaDestaque: string;
  estiloVisual: string;
  coresPreferidas: string;
  logotipoMateriais: string;
  textosSite: string;
  fraseDestaque: string;
  funcionalidades: string;
  redesSociais: string;
  referencias: string;
  imagensMateriais: string;
  tomComunicacao: string;
  informacoesObrigatorias: string;
  evitarNoSite: string;
  prazo: string;
};

type Question = {
  name: keyof BriefingFormData;
  label: string;
  helper?: string;
  placeholder: string;
  type?: "textarea" | "checkbox";
  options?: string[];
};

type Section = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  questions: Question[];
};

const defaultValues: BriefingFormData = {
  objetivoSite: "",
  publicoAlvo: "",
  secoesSite: "",
  areasAtuacao: "",
  areaDestaque: "",
  estiloVisual: "",
  coresPreferidas: "",
  logotipoMateriais: "",
  textosSite: "",
  fraseDestaque: "",
  funcionalidades: "",
  redesSociais: "",
  referencias: "",
  imagensMateriais: "",
  tomComunicacao: "",
  informacoesObrigatorias: "",
  evitarNoSite: "",
  prazo: "",
};

const sections: Section[] = [
  {
    id: "estrategia",
    index: "01",
    title: "Objetivo e público",
    subtitle: "O que o site precisa resolver e para quem ele fala.",
    questions: [
      {
        name: "objetivoSite",
        label: "Qual será o principal objetivo do site?",
        helper: "Ex.: apresentar o escritório, gerar contatos pelo WhatsApp, transmitir autoridade ou captar consultas.",
        placeholder: "Descreva o objetivo principal e, se houver, objetivos secundários.",
        type: "checkbox",
        options: [
          "Apresentar o escritório",
          "Gerar contatos pelo WhatsApp",
          "Transmitir autoridade e confiança",
          "Apresentar áreas de atuação",
          "Captar clientes para consultas",
          "Fortalecer imagem institucional",
          "Outro",
        ],
      },
      {
        name: "publicoAlvo",
        label: "Quem são os principais clientes do escritório?",
        placeholder: "Ex.: pessoas físicas, empresas, empreendedores, clientes de alto padrão ou causas específicas.",
        type: "checkbox",
        options: [
          "Pessoas físicas",
          "Empresas",
          "Empreendedores",
          "Clientes de alto padrão",
          "Clientes com causas específicas",
          "Outro",
        ],
      },
    ],
  },
  {
    id: "estrutura",
    index: "02",
    title: "Páginas e seções",
    subtitle: "Estrutura desejada para o site institucional.",
    questions: [
      {
        name: "secoesSite",
        label: "Quais páginas ou seções devem ter no site?",
        helper: "Marque tudo que fizer sentido para o escritório. Se houver algo específico, marque Outra e detalhe no campo.",
        placeholder: "Ex.: página de artigos, casos, equipe completa ou outra seção específica.",
        type: "checkbox",
        options: [
          "Home / Início",
          "Quem Somos / Sobre o Escritório",
          "Áreas de Atuação",
          "Serviços",
          "Equipe / Advogados",
          "Diferenciais",
          "Depoimentos",
          "Blog / Artigos",
          "Contato",
          "Mapa / Localização",
          "Política de Privacidade",
          "Outra",
        ],
      },
    ],
  },
  {
    id: "atuacao",
    index: "03",
    title: "Áreas de atuação",
    subtitle: "Serviços jurídicos que precisam aparecer no site.",
    questions: [
      {
        name: "areasAtuacao",
        label: "Quais áreas do Direito devem aparecer no site?",
        placeholder: "Ex.: Direito Civil, Empresarial, Trabalhista, Família, Imobiliário, Consumidor, Contratos.",
        type: "checkbox",
        options: [
          "Direito Civil",
          "Direito Empresarial",
          "Direito Trabalhista",
          "Direito Previdenciário",
          "Direito Criminal",
          "Direito Tributário",
          "Direito de Família",
          "Direito Imobiliário",
          "Direito do Consumidor",
          "Contratos",
          "Outra",
        ],
      },
      {
        name: "areaDestaque",
        label: "Existe alguma área principal que deve receber mais destaque?",
        placeholder: "Informe a área prioritária e o motivo do destaque.",
      },
    ],
  },
  {
    id: "visual",
    index: "04",
    title: "Identidade visual",
    subtitle: "Direção estética, fontes, cores e materiais já existentes.",
    questions: [
      {
        name: "estiloVisual",
        label: "Qual estilo visual o site deve seguir?",
        helper: "Referência já recebida: fontes geométricas, modernas, largas e corporativas, como Montserrat Extended/Bold, Michroma, Bank Gothic, Microgramma ou Eurostile.",
        placeholder: "Ex.: luxo discreto, corporativo moderno, jurídico tradicional, minimalista premium, tecnológico sofisticado.",
        type: "checkbox",
        options: [
          "Luxo discreto",
          "Corporativo moderno",
          "Jurídico tradicional",
          "Minimalista premium",
          "Tecnológico sofisticado",
          "Institucional sóbrio",
          "Outro",
        ],
      },
      {
        name: "coresPreferidas",
        label: "Quais cores devem ser usadas ou evitadas?",
        placeholder: "Ex.: preto, branco, cinza, dourado, azul escuro, verde escuro. Informe também cores proibidas.",
      },
      {
        name: "logotipoMateriais",
        label: "Há logotipo, cartão de visita ou identidade visual pronta?",
        placeholder: "Informe o que já existe e quais arquivos serão enviados.",
      },
    ],
  },
  {
    id: "conteudo",
    index: "05",
    title: "Conteúdo",
    subtitle: "Textos, frase principal e informações obrigatórias.",
    questions: [
      {
        name: "textosSite",
        label: "O escritório já possui textos prontos para o site?",
        placeholder: "Ex.: sim, não, parcialmente. Cole textos existentes ou diga quais precisam ser criados.",
      },
      {
        name: "fraseDestaque",
        label: "Existe uma frase ou posicionamento que deve aparecer em destaque?",
        placeholder: "Ex.: Atuação jurídica estratégica com seriedade, precisão e compromisso.",
      },
      {
        name: "informacoesObrigatorias",
        label: "Há alguma informação que deve aparecer obrigatoriamente no site?",
        placeholder: "Informe dados institucionais, endereço, contatos, registro, horário, avisos ou observações importantes.",
      },
    ],
  },
  {
    id: "experiencia",
    index: "06",
    title: "Funcionalidades e referências",
    subtitle: "Recursos esperados, redes sociais, imagens e sites de referência.",
    questions: [
      {
        name: "funcionalidades",
        label: "Quais recursos o site deve ter?",
        placeholder: "Ex.: botão de WhatsApp, formulário, mapa do Google, links sociais, animações suaves, política de privacidade.",
        type: "checkbox",
        options: [
          "Botão de WhatsApp",
          "Formulário de contato",
          "Mapa do Google",
          "Links para redes sociais",
          "Política de privacidade",
          "Animações suaves",
          "Versão mobile responsiva",
          "Outro",
        ],
      },
      {
        name: "redesSociais",
        label: "Quais redes sociais devem entrar no site?",
        placeholder: "Cole links de Instagram, LinkedIn, Facebook ou outros canais oficiais.",
      },
      {
        name: "referencias",
        label: "Existe algum site de escritório de advocacia que o cliente gosta?",
        placeholder: "Cole links e diga o que chamou atenção: cores, tipografia, organização, sofisticação, fotos ou animações.",
      },
      {
        name: "imagensMateriais",
        label: "O cliente possui fotos profissionais ou materiais visuais?",
        placeholder: "Ex.: fotos do escritório, fotos dos advogados, vídeos, logotipo, materiais institucionais.",
      },
    ],
  },
  {
    id: "fechamento",
    index: "07",
    title: "Tom e fechamento",
    subtitle: "Comunicação, restrições e prazo.",
    questions: [
      {
        name: "tomComunicacao",
        label: "Qual deve ser o tom da comunicação?",
        placeholder: "Ex.: formal, sofisticado, direto, humanizado, técnico, institucional.",
        type: "checkbox",
        options: ["Formal", "Sofisticado", "Direto", "Humanizado", "Técnico", "Institucional", "Outro"],
      },
      {
        name: "evitarNoSite",
        label: "Há algo que o cliente não quer no site?",
        placeholder: "Informe estilos, textos, cores, imagens, promessas ou abordagens que devem ser evitadas.",
      },
      {
        name: "prazo",
        label: "Qual o prazo desejado para apresentação do design?",
        placeholder: "Informe data ideal, urgência e etapas esperadas.",
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
    return raw ? { ...defaultValues, ...(JSON.parse(raw) as Partial<BriefingFormData>) } : defaultValues;
  } catch {
    return defaultValues;
  }
};

const readStoredTimestamp = (): Date | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_TIMESTAMP_KEY);
  if (!raw) {
    return null;
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const isBriefingFormData = (value: unknown): value is BriefingFormData => {
  if (!value || typeof value !== "object") {
    return false;
  }

  return Object.keys(defaultValues).every((key) => typeof (value as Record<string, unknown>)[key] === "string");
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

const getSelectedValues = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const toggleOption = (value: string, option: string) => {
  const selected = getSelectedValues(value);
  return selected.includes(option)
    ? selected.filter((item) => item !== option).join(", ")
    : [...selected, option].join(", ");
};

const buildSummary = (values: BriefingFormData) =>
  [
    "BRIEFING PARA CRIAÇÃO DE DESIGN DE SITE",
    `Cliente: ${CLIENT_NAME}`,
    "",
    "DADOS JÁ INFORMADOS",
    "Endereço: AV PAULISTA Nº 1636, CONJUNTO 03, PAVIMENTO 1 - SALAS 103 E 105, ANEXO 1828, BAIRRO BELA VISTA, CEP: 01310-200, SÃO PAULO - SP",
    "E-mail: MICHEL@MQAADV.COM.BR",
    "Telefones: 11 95076-6028 / 11 95970-8000",
    "Referência tipográfica: Montserrat Extended/Bold, Michroma, Bank Gothic, Microgramma ou Eurostile.",
    "",
    "1. OBJETIVO E PÚBLICO",
    `1.1. Principal objetivo do site: ${values.objetivoSite || "Pendente"}`,
    `1.2. Público-alvo: ${values.publicoAlvo || "Pendente"}`,
    "",
    "2. PÁGINAS E SEÇÕES",
    `2.1. Páginas ou seções desejadas: ${values.secoesSite || "Pendente"}`,
    "",
    "3. ÁREAS DE ATUAÇÃO",
    `3.1. Áreas do Direito: ${values.areasAtuacao || "Pendente"}`,
    `3.2. Área de destaque: ${values.areaDestaque || "Pendente"}`,
    "",
    "4. IDENTIDADE VISUAL",
    `4.1. Estilo visual: ${values.estiloVisual || "Pendente"}`,
    `4.2. Cores: ${values.coresPreferidas || "Pendente"}`,
    `4.3. Logotipo e materiais: ${values.logotipoMateriais || "Pendente"}`,
    "",
    "5. CONTEÚDO",
    `5.1. Textos existentes: ${values.textosSite || "Pendente"}`,
    `5.2. Frase de destaque: ${values.fraseDestaque || "Pendente"}`,
    `5.3. Informações obrigatórias: ${values.informacoesObrigatorias || "Pendente"}`,
    "",
    "6. FUNCIONALIDADES E REFERÊNCIAS",
    `6.1. Funcionalidades: ${values.funcionalidades || "Pendente"}`,
    `6.2. Redes sociais: ${values.redesSociais || "Pendente"}`,
    `6.3. Referências: ${values.referencias || "Pendente"}`,
    `6.4. Imagens e materiais: ${values.imagensMateriais || "Pendente"}`,
    "",
    "7. TOM E FECHAMENTO",
    `7.1. Tom de comunicação: ${values.tomComunicacao || "Pendente"}`,
    `7.2. O que evitar: ${values.evitarNoSite || "Pendente"}`,
    `7.3. Prazo: ${values.prazo || "Pendente"}`,
  ].join("\n");

const countAnswered = (values: BriefingFormData) =>
  Object.values(values).filter((value) => value.trim().length > 0).length;

const MichelQueirozAssisBriefing = () => {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(() => readStoredTimestamp());
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<BriefingFormData>({
    defaultValues: readStoredValues(),
  });

  const values = form.watch();
  const answeredCount = countAnswered(values);
  const totalFieldCount = Object.keys(defaultValues).length;
  const completion = Math.round((answeredCount / totalFieldCount) * 100);
  const summary = useMemo(() => buildSummary(values), [values]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const now = new Date();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
        window.localStorage.setItem(STORAGE_TIMESTAMP_KEY, now.toISOString());
        setLastSavedAt(now);
      } catch {
        toast({
          title: "Falha ao salvar",
          description: "O navegador bloqueou o salvamento local das respostas.",
          variant: "destructive",
        });
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [values]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
      toast({
        title: "Briefing copiado",
        description: "O resumo foi enviado para a área de transferência.",
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
    anchor.download = "briefing-michel-queiroz-assis.txt";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBackupDownload = () => {
    const file = new Blob([JSON.stringify({ version: 1, client: "michel-queiroz-assis", savedAt: new Date().toISOString(), values }, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = window.URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "briefing-michel-queiroz-assis-backup.json";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const submitFormSubmitFallback = () => {
    const iframeName = `briefing-email-${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";

    const form = document.createElement("form");
    form.method = "POST";
    form.action = FORMSUBMIT_ENDPOINT.replace("/ajax/", "/");
    form.target = iframeName;
    form.style.display = "none";

    const payload = {
      _subject: "[Michel Queiroz de Assis] Briefing do site",
      _captcha: "false",
      _template: "table",
      "Cliente do briefing": CLIENT_NAME,
      "E-mail de destino": TARGET_EMAIL,
      Respostas: summary,
      ...values,
    };

    Object.entries(payload).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = String(value ?? "");
      form.appendChild(input);
    });

    document.body.append(iframe, form);
    form.submit();

    window.setTimeout(() => {
      form.remove();
      iframe.remove();
    }, 60000);
  };

  const handleEmailSubmit = async () => {
    if (answeredCount === 0) {
      toast({
        title: "Briefing vazio",
        description: "Preencha pelo menos uma resposta antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(BRIEFING_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          version: 1,
          client: "michel-queiroz-assis",
          savedAt: new Date().toISOString(),
          summary,
          values,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar briefing.");
      }

      const result = (await response.json()) as { emailSent?: boolean; blobSaved?: boolean; supabaseSaved?: boolean };
      let emailSent = Boolean(result.emailSent);

      if (!emailSent) {
        submitFormSubmitFallback();
        emailSent = true;
      }

      toast({
        title: emailSent ? "Briefing enviado" : "Briefing recebido",
        description: emailSent
          ? `As respostas foram registradas e o envio para ${TARGET_EMAIL} foi disparado.`
          : "As respostas foram salvas com segurança. Se o e-mail demorar, o briefing já ficou registrado no sistema.",
      });
    } catch {
      toast({
        title: "Não foi possível enviar",
        description: "Copie ou baixe o briefing como alternativa e tente novamente depois.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImportBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const parsed = JSON.parse(await file.text()) as { values?: unknown };
      if (!isBriefingFormData(parsed.values)) {
        throw new Error("invalid");
      }

      form.reset(parsed.values);
      toast({
        title: "Backup importado",
        description: "As respostas foram restauradas neste navegador.",
      });
    } catch {
      toast({
        title: "Arquivo inválido",
        description: "Não foi possível restaurar o briefing a partir desse backup.",
        variant: "destructive",
      });
    } finally {
      event.target.value = "";
    }
  };

  const handleReset = () => {
    form.reset(defaultValues);
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
    setLastSavedAt(null);
    toast({
      title: "Briefing limpo",
      description: "As respostas foram removidas deste navegador.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Briefing de Site | Michel Queiroz de Assis Advogados Associados"
        description="Página interna de briefing para criação do design de site do escritório Michel Queiroz de Assis Advogados Associados."
        url="/briefing/michel-queiroz-assis"
        robots="noindex, nofollow"
      />

      <div className="noise-overlay" />
      <Navigation />

      <main className="pt-28 md:pt-40">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.16),transparent_28%),radial-gradient(circle_at_left,hsl(var(--foreground)/0.08),transparent_32%)]" />
          <div className="container-wide relative z-10 px-4 py-12 md:py-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="border border-border bg-card/30 p-5 md:p-10">
                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
                  <div className="min-w-0">
                    <div className="mb-6 flex flex-wrap items-center gap-4">
                      <span className="label text-accent">Portal do briefing</span>
                      <div className="h-px w-16 bg-accent/70" />
                      <span className="text-sm text-muted-foreground">Acesso apenas pelo link</span>
                    </div>

                    <h1 className="max-w-6xl [overflow-wrap:anywhere] font-epic text-[2.2rem] font-black uppercase leading-[0.92] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-[5rem] lg:tracking-[-0.055em]">
                      Briefing <span className="text-accent">Michel Queiroz de Assis</span>
                    </h1>

                    <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base md:mt-8 md:text-lg">
                      Página interna para reunir as respostas essenciais antes da criação do design do site institucional do escritório.
                      As respostas ficam salvas neste navegador e podem ser copiadas, baixadas ou exportadas em backup.
                    </p>
                  </div>

                  <div className="grid gap-3 text-sm text-muted-foreground">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 pb-3">
                      <span className="font-mono uppercase tracking-[0.18em]">Tempo médio</span>
                      <span className="font-mono text-foreground">5 a 8 min</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 pb-3">
                      <span className="font-mono uppercase tracking-[0.18em]">Progresso</span>
                      <span className="font-mono text-foreground">{completion}%</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 pb-3">
                      <span className="font-mono uppercase tracking-[0.18em]">Respostas</span>
                      <span className="font-mono text-foreground">
                        {answeredCount}/{totalFieldCount}
                      </span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                      <span className="font-mono uppercase tracking-[0.18em]">Salvo</span>
                      <span className="text-right font-mono text-foreground">{formatDateTime(lastSavedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
                <div className="bg-card/60 p-5">
                  <span className="label text-muted-foreground">Cliente</span>
                  <p className="mt-3 text-sm font-semibold uppercase leading-6 text-foreground">{CLIENT_NAME}</p>
                </div>
                <div className="bg-card/60 p-5">
                  <span className="label text-muted-foreground">Contato</span>
                  <p className="mt-3 text-sm leading-6 text-foreground">MICHEL@MQAADV.COM.BR<br />11 95076-6028 / 11 95970-8000</p>
                </div>
                <div className="bg-card/60 p-5">
                  <span className="label text-muted-foreground">Referência visual</span>
                  <p className="mt-3 text-sm leading-6 text-foreground">Geométrica, moderna, larga e corporativa.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container-wide px-4 py-12 md:py-16">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_420px]">
            <div className="space-y-6">
              <div className="border border-border bg-secondary/20 p-6 md:p-8">
                <p className="label text-accent">Antes de começar</p>
                <h2 className="heading-sm mt-3">Responda apenas o essencial para direcionar o design</h2>
                <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
                  O briefing não aparece em nenhuma área pública do site. Ele foi criado como página interna para quem receber o link direto.
                </p>
                <Button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={isSubmitting}
                  className="mt-6 h-12 touch-manipulation rounded-none bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Enviando..." : "Enviar briefing por e-mail"}
                </Button>
              </div>

              <form className="space-y-4">
                <Accordion type="multiple" defaultValue={sections.map((section) => section.id)} className="space-y-4">
                  {sections.map((section) => {
                    const answeredInSection = section.questions.filter(({ name }) => values[name].trim().length > 0).length;

                    return (
                      <AccordionItem key={section.id} value={section.id} className="overflow-hidden border border-border bg-card/40 backdrop-blur-sm">
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
                              const selectedValues = getSelectedValues(values[question.name]);

                              return (
                                <div key={question.name} className="border border-border bg-background/55 p-4 md:p-5">
                                  <div className="mb-3 flex items-start justify-between gap-4">
                                    <div>
                                      <label htmlFor={question.name} className="max-w-3xl text-base font-medium text-foreground">
                                        {question.label}
                                      </label>
                                      {question.helper ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{question.helper}</p> : null}
                                    </div>
                                    {hasValue ? <Check className="mt-1 h-4 w-4 shrink-0 text-accent" /> : null}
                                  </div>

                                  {question.type === "checkbox" ? (
                                    <>
                                      <div className="grid gap-3 sm:grid-cols-2">
                                        {question.options?.map((option) => {
                                          const checked = selectedValues.includes(option);

                                          return (
                                            <button
                                              key={option}
                                              type="button"
                                              onClick={() =>
                                                form.setValue(question.name, toggleOption(values[question.name], option), {
                                                  shouldDirty: true,
                                                })
                                              }
                                              className={`flex min-h-12 touch-manipulation items-center justify-between gap-3 border px-4 py-3 text-left text-sm transition-colors ${
                                                checked
                                                  ? "border-accent bg-accent text-accent-foreground"
                                                  : "border-border bg-secondary/20 text-muted-foreground hover:border-accent/60 hover:text-foreground"
                                              }`}
                                            >
                                              <span>{option}</span>
                                              {checked ? <Check className="h-4 w-4 shrink-0" /> : null}
                                            </button>
                                          );
                                        })}
                                      </div>

                                      <Textarea
                                        id={question.name}
                                        value={values[question.name]}
                                        onChange={(event) => form.setValue(question.name, event.target.value, { shouldDirty: true })}
                                        placeholder={question.placeholder}
                                        className="mt-4 min-h-[110px] rounded-none border-border bg-secondary/20 px-4 py-3 text-base placeholder:text-muted-foreground/70 focus-visible:ring-accent"
                                      />
                                    </>
                                  ) : (
                                    <Textarea
                                      id={question.name}
                                      {...form.register(question.name)}
                                      placeholder={question.placeholder}
                                      className="min-h-[130px] rounded-none border-border bg-secondary/20 px-4 py-3 text-base placeholder:text-muted-foreground/70 focus-visible:ring-accent"
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

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImportBackup} />
                  <Button type="button" onClick={handleEmailSubmit} disabled={isSubmitting} className="justify-start rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Enviando..." : "Enviar por e-mail"}
                  </Button>
                  <Button type="button" onClick={handleCopy} variant="outline" className="justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent">
                    {isCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    {isCopied ? "Copiado" : "Copiar"}
                  </Button>
                  <Button type="button" onClick={handleDownload} variant="outline" className="justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent">
                    <Download className="h-4 w-4" />
                    Baixar .txt
                  </Button>
                  <Button type="button" onClick={handleBackupDownload} variant="outline" className="justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent">
                    <Save className="h-4 w-4" />
                    Backup .json
                  </Button>
                  <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline" className="justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent">
                    <Upload className="h-4 w-4" />
                    Importar backup
                  </Button>
                  <Button type="button" onClick={handleReset} variant="outline" className="justify-start rounded-none border-destructive/40 bg-background/40 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Eraser className="h-4 w-4" />
                    Limpar
                  </Button>
                </div>
              </div>

              <div className="border border-border bg-secondary/20 p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="label text-muted-foreground">Conteúdo registrado</span>
                  <span className="text-xs text-muted-foreground">{answeredCount} respostas</span>
                </div>
                <pre className="max-h-[820px] overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-7 text-muted-foreground">{summary}</pre>
                <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <BriefcaseBusiness className="h-3.5 w-3.5 text-accent" />
                  Página interna, sem link no menu público.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MichelQueirozAssisBriefing;
