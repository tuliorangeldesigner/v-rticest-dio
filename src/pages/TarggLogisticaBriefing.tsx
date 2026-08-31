import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDeferredValue } from "react";
import { useForm } from "react-hook-form";
import { Check, Clipboard, Download, Eraser, FileText, Mail, Save, Send, Upload } from "lucide-react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "briefing-targg-logistica-v1";
const STORAGE_TIMESTAMP_KEY = `${STORAGE_KEY}-timestamp`;
const REMOTE_BRIEFING_ENDPOINT = "/api/briefing/targg-logistica";
const TARGET_EMAIL = "tuliorangeldesigner@gmail.com";
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/077155c39ad40c69289f867d6e161917";

type BriefingFormData = {
  nomeEmpresa: string;
  contatosOficiais: string;
  secoesSite: string;
  secoesSiteOutro: string;
  ajustesSiteAtual: string;
  reaproveitarSiteAntigo: string;
  mensagemPrincipal: string;
  sobreEmpresa: string;
  textosSite: string;
  textosProntos: string;
  servicosSite: string;
  servicosSiteOutros: string;
  servicosDestaque: string;
  regioesAtendidas: string;
  veiculosFrota: string;
  destaquesFrota: string;
  diferenciais: string;
  diferenciaisOutro: string;
  fotosMateriais: string;
  depoimentos: string;
  objetivoSite: string;
  destinoBotaoPrincipal: string;
  observacaoFinal: string;
};

type Question = {
  name: keyof BriefingFormData;
  label: string;
  helper?: string;
  placeholder?: string;
  type?: "input" | "textarea" | "checkbox" | "radio";
  options?: string[];
};

type Section = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  questions: Question[];
};

type BriefingBackupPayload = {
  version: number;
  client: "targg-logistica";
  savedAt: string;
  values: BriefingFormData;
};

const defaultValues: BriefingFormData = {
  nomeEmpresa: "",
  contatosOficiais: "",
  secoesSite: "",
  secoesSiteOutro: "",
  ajustesSiteAtual: "",
  reaproveitarSiteAntigo: "",
  mensagemPrincipal: "",
  sobreEmpresa: "",
  textosSite: "",
  textosProntos: "",
  servicosSite: "",
  servicosSiteOutros: "",
  servicosDestaque: "",
  regioesAtendidas: "",
  veiculosFrota: "",
  destaquesFrota: "",
  diferenciais: "",
  diferenciaisOutro: "",
  fotosMateriais: "",
  depoimentos: "",
  objetivoSite: "",
  destinoBotaoPrincipal: "",
  observacaoFinal: "",
};

const fieldNames = Object.keys(defaultValues) as Array<keyof BriefingFormData>;
const totalFieldCount = fieldNames.length;
const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const sections: Section[] = [
  {
    id: "informacoes",
    index: "01",
    title: "Informações principais",
    subtitle: "Nome, contatos oficiais e dados que precisam aparecer no site.",
    questions: [
      {
        name: "nomeEmpresa",
        label: "Como o nome da empresa deve aparecer no site?",
        placeholder: "Ex.: TARGG Logística ou TARGG Transportes",
        type: "input",
      },
      {
        name: "contatosOficiais",
        label: "Quais contatos oficiais devem aparecer no site?",
        helper: "Informe WhatsApp, telefone, e-mail, endereço e horário de atendimento.",
        placeholder: "Ex.: WhatsApp..., e-mail..., endereço..., atendimento de segunda a sexta...",
      },
    ],
  },
  {
    id: "estrutura",
    index: "02",
    title: "Estrutura do site",
    subtitle: "Páginas, seções e ajustes em relação ao site atual.",
    questions: [
      {
        name: "secoesSite",
        label: "Quais páginas ou seções vocês querem no novo site?",
        type: "checkbox",
        options: [
          "Início",
          "Sobre a empresa",
          "Serviços / Modalidades",
          "Cargas atendidas",
          "Frota",
          "Diferenciais",
          "Área do cliente / Rastreamento",
          "Cotação",
          "Blog / Conteúdos",
          "Perguntas frequentes",
          "Depoimentos",
          "Contato",
          "Outra",
        ],
      },
      {
        name: "ajustesSiteAtual",
        label: "Existe alguma página ou seção do site atual que deve ser removida, corrigida ou adicionada?",
        placeholder: "Explique o que deve sair, entrar ou ser ajustado.",
      },
      {
        name: "reaproveitarSiteAntigo",
        label: "O novo site deve manter os mesmos textos e páginas do site antigo?",
        helper: "Se houver algo que deve ser mantido igual, explique aqui para evitarmos perder informações importantes.",
        placeholder: "Ex.: manter a página de serviços, atualizar textos antigos, remover páginas desatualizadas...",
      },
    ],
  },
  {
    id: "textos",
    index: "03",
    title: "Textos do site",
    subtitle: "Mensagem principal, história e forma de criação dos textos.",
    questions: [
      {
        name: "mensagemPrincipal",
        label: "Qual mensagem principal vocês querem passar logo no início do site?",
        placeholder: "Ex.: logística com rapidez, pontualidade, segurança e qualidade para cargas sensíveis em todo o Brasil.",
      },
      {
        name: "sobreEmpresa",
        label: "Sobre a empresa, o que vocês querem destacar?",
        placeholder: "História, experiência logística, atuação nacional, operação em Diadema/SP, atendimento a cargas farmacêuticas, farmoquímicas e perigosas.",
      },
      {
        name: "textosSite",
        label: "Vocês já têm textos prontos para o site ou preferem que os textos sejam criados com base neste briefing?",
        type: "radio",
        options: ["Temos textos prontos", "Podem criar os textos com base nas respostas", "Queremos revisar os textos depois"],
      },
      {
        name: "textosProntos",
        label: "Se vocês já têm textos prontos, colem aqui.",
        helper: "Pode colar por partes, com o nome da página ou seção antes de cada texto.",
        placeholder: "Ex.: Sobre a empresa: ...\nServiços: ...\nContato: ...",
      },
    ],
  },
  {
    id: "servicos",
    index: "04",
    title: "Serviços e cargas",
    subtitle: "Modalidades, cargas atendidas, prioridades e regiões.",
    questions: [
      {
        name: "servicosSite",
        label: "Quais serviços devem aparecer no site?",
        type: "checkbox",
        options: [
          "Despacho aduaneiro",
          "Transporte marítimo",
          "Transporte aéreo",
          "Transporte rodoviário",
          "Produtos farmacêuticos",
          "Produtos farmoquímicos",
          "Medicamentos e vacinas perecíveis",
          "Cargas perigosas",
          "Equipamentos",
          "Cargas em geral",
          "Área do cliente / Rastreamento",
          "Outros",
        ],
      },
      {
        name: "servicosDestaque",
        label: "Quais serviços são os mais importantes para destacar no início do site?",
        placeholder: "Liste os serviços prioritários e, se quiser, explique por quê.",
      },
      {
        name: "regioesAtendidas",
        label: "Quais regiões, cidades ou estados a Targg atende atualmente?",
        placeholder: "Ex.: todo o Brasil, principais estados, cidades estratégicas, rotas prioritárias e regiões com maior demanda.",
      },
    ],
  },
  {
    id: "frota",
    index: "05",
    title: "Frota e diferenciais",
    subtitle: "Veículos, rastreamento, operação e pontos fortes da Targg.",
    questions: [
      {
        name: "veiculosFrota",
        label: "Quais veículos fazem parte da frota atualmente?",
        placeholder: "Liste tipos de caminhões, quantidade se souber, capacidade, controle de temperatura ou observações importantes.",
      },
      {
        name: "destaquesFrota",
        label: "O que deve ser destacado sobre a frota?",
        placeholder: "Ex.: frota nova, rastreamento, manutenção preventiva, segurança, veículos adequados para cargas sensíveis ou perigosas.",
      },
      {
        name: "diferenciais",
        label: "Quais são os principais diferenciais da Targg?",
        type: "checkbox",
        options: [
          "Segurança e qualidade",
          "Rapidez e pontualidade",
          "Rastreamento de cargas",
          "Frota nova",
          "Atendimento nacional",
          "Especialização em cargas farmacêuticas",
          "Experiência com cargas perigosas",
          "Transporte de perecíveis",
          "Melhor custo-benefício",
          "Proposta em até 48 horas",
          "Outro",
        ],
      },
    ],
  },
  {
    id: "materiais",
    index: "06",
    title: "Imagens e materiais",
    subtitle: "Fotos, vídeos, logotipo e depoimentos que podem entrar no site.",
    questions: [
      {
        name: "fotosMateriais",
        label: "Vocês têm fotos novas da frota, equipe, empresa, entregas, armazém ou operação?",
        helper: `Caso tenham fotos, vídeos, logotipo ou materiais visuais, enviem para ${TARGET_EMAIL} com o assunto: Materiais TARGG Logística - Site.`,
        type: "radio",
        options: ["Sim, vamos enviar por e-mail", "Não temos no momento", "Vamos providenciar"],
      },
      {
        name: "depoimentos",
        label: "Vocês têm depoimentos reais de clientes para colocar no site?",
        type: "radio",
        options: ["Sim", "Não", "Vamos providenciar"],
      },
    ],
  },
  {
    id: "objetivo",
    index: "07",
    title: "Objetivo do site",
    subtitle: "Conversão, confiança e chamada principal.",
    questions: [
      {
        name: "objetivoSite",
        label: "Qual é o principal objetivo do novo site?",
        type: "checkbox",
        options: [
          "Receber pedidos de cotação",
          "Transmitir segurança e qualidade",
          "Modernizar a imagem da empresa",
          "Apresentar serviços e modalidades",
          "Facilitar contato pelo WhatsApp",
          "Destacar rastreamento / área do cliente",
          "Fortalecer autoridade em cargas sensíveis",
          "Todos os itens acima",
        ],
      },
      {
        name: "destinoBotaoPrincipal",
        label: "O botão principal do site deve levar para onde?",
        type: "radio",
        options: ["WhatsApp", "Formulário de orçamento", "Ligação", "E-mail"],
      },
      {
        name: "observacaoFinal",
        label: "Existe alguma informação importante que vocês gostariam de destacar no novo site?",
        placeholder: "Use este espaço para registrar qualquer detalhe final importante.",
      },
    ],
  },
];

const sectionIds = sections.map((section) => section.id);

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

  return fieldNames.every((key) => typeof (value as Record<string, unknown>)[key] === "string");
};

const buildBackupPayload = (values: BriefingFormData): BriefingBackupPayload => ({
  version: 1,
  client: "targg-logistica",
  savedAt: new Date().toISOString(),
  values,
});

const serializeValues = (values: BriefingFormData) => JSON.stringify(values);

const formatDateTime = (value: Date | null) => {
  if (!value) {
    return "Nenhum salvamento ainda";
  }

  return dateTimeFormatter.format(value);
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

const getOtherFieldForQuestion = (name: keyof BriefingFormData): keyof BriefingFormData | null => {
  if (name === "secoesSite") {
    return "secoesSiteOutro";
  }

  if (name === "servicosSite") {
    return "servicosSiteOutros";
  }

  if (name === "diferenciais") {
    return "diferenciaisOutro";
  }

  return null;
};

const buildSummary = (values: BriefingFormData) =>
  [
    "BRIEFING PARA NOVO SITE - TARGG Logística",
    "",
    "1. INFORMAÇÕES PRINCIPAIS",
    `1. Nome da empresa: ${values.nomeEmpresa || "Pendente"}`,
    `2. Contatos oficiais: ${values.contatosOficiais || "Pendente"}`,
    "",
    "2. ESTRUTURA DO SITE",
    `3. Páginas ou seções desejadas: ${values.secoesSite || "Pendente"}`,
    `3.1. Outra página/seção informada: ${values.secoesSiteOutro || "Pendente"}`,
    `4. Remover, corrigir ou adicionar no site atual: ${values.ajustesSiteAtual || "Pendente"}`,
    `4.1. Manter textos e páginas do site antigo: ${values.reaproveitarSiteAntigo || "Pendente"}`,
    "",
    "3. TEXTOS DO SITE",
    `5. Mensagem principal: ${values.mensagemPrincipal || "Pendente"}`,
    `6. Destaques sobre a empresa: ${values.sobreEmpresa || "Pendente"}`,
    `7. Textos prontos ou criação com base no briefing: ${values.textosSite || "Pendente"}`,
    `7.1. Textos prontos enviados no briefing: ${values.textosProntos || "Pendente"}`,
    "",
    "4. SERVIÇOS",
    `8. Serviços que devem aparecer: ${values.servicosSite || "Pendente"}`,
    `8.1. Outros serviços informados: ${values.servicosSiteOutros || "Pendente"}`,
    `9. Serviços mais importantes no início do site: ${values.servicosDestaque || "Pendente"}`,
    `10. Regiões, cidades ou estados atendidos: ${values.regioesAtendidas || "Pendente"}`,
    "",
    "5. FROTA E DIFERENCIAIS",
    `11. Veículos da frota: ${values.veiculosFrota || "Pendente"}`,
    `12. Destaques da frota: ${values.destaquesFrota || "Pendente"}`,
    `13. Principais diferenciais: ${values.diferenciais || "Pendente"}`,
    `13.1. Outro diferencial informado: ${values.diferenciaisOutro || "Pendente"}`,
    "",
    "6. IMAGENS, DEPOIMENTOS E MATERIAIS",
    `14. Fotos e materiais: ${values.fotosMateriais || "Pendente"}`,
    `15. Depoimentos reais de clientes: ${values.depoimentos || "Pendente"}`,
    "",
    "7. OBJETIVO DO SITE",
    `16. Principal objetivo do novo site: ${values.objetivoSite || "Pendente"}`,
    `17. Destino do botão principal: ${values.destinoBotaoPrincipal || "Pendente"}`,
    `18. Observação final: ${values.observacaoFinal || "Pendente"}`,
  ].join("\n");

const countAnswered = (values: BriefingFormData) =>
  fieldNames.reduce((total, fieldName) => total + (values[fieldName].trim().length > 0 ? 1 : 0), 0);

const TarggLogisticaBriefing = () => {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(() => readStoredTimestamp());
  const [lastRemoteSavedAt, setLastRemoteSavedAt] = useState<Date | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isRemoteSaving, setIsRemoteSaving] = useState(false);
  const [isRemoteReady, setIsRemoteReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const remoteSaveTimeoutRef = useRef<number | null>(null);
  const lastRemoteSignatureRef = useRef<string>("");
  const hasHydratedRef = useRef(false);

  const form = useForm<BriefingFormData>({
    defaultValues: readStoredValues(),
  });

  const values = form.watch();
  const deferredValues = useDeferredValue(values);
  const answeredCount = useMemo(() => countAnswered(values), [values]);
  const completion = Math.round((answeredCount / totalFieldCount) * 100);
  const summaryPreview = useMemo(() => buildSummary(deferredValues), [deferredValues]);
  const sectionProgress = useMemo(
    () =>
      sections.reduce<Record<string, number>>((progress, section) => {
        progress[section.id] = section.questions.filter(({ name }) => values[name].trim().length > 0).length;
        return progress;
      }, {}),
    [values]
  );

  const syncRemoteBriefing = async (nextValues: BriefingFormData, silent = true) => {
    if (countAnswered(nextValues) === 0) {
      return;
    }

    const signature = serializeValues(nextValues);
    if (signature === lastRemoteSignatureRef.current) {
      return;
    }

    setIsRemoteSaving(true);

    try {
      const payload = buildBackupPayload(nextValues);
      const response = await fetch(REMOTE_BRIEFING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar briefing no site.");
      }

      const savedPayload = (await response.json()) as BriefingBackupPayload;
      const savedAt = new Date(savedPayload.savedAt);

      lastRemoteSignatureRef.current = signature;
      setLastRemoteSavedAt(savedAt);
      setIsRemoteReady(true);

      if (!silent) {
        toast({
          title: "Briefing salvo no site",
          description: "O rascunho remoto foi atualizado.",
        });
      }
    } catch {
      if (!silent) {
        toast({
          title: "Falha ao salvar no site",
          description: "O briefing continua salvo localmente neste navegador.",
          variant: "destructive",
        });
      }
    } finally {
      setIsRemoteSaving(false);
    }
  };

  useEffect(() => {
    const loadRemoteBriefing = async () => {
      try {
        const response = await fetch(REMOTE_BRIEFING_ENDPOINT, { cache: "no-store" });

        if (response.status === 404) {
          setIsRemoteReady(true);
          return;
        }

        if (!response.ok) {
          throw new Error("Falha ao carregar briefing remoto.");
        }

        const payload = (await response.json()) as BriefingBackupPayload;
        const remoteSavedAt = new Date(payload.savedAt);
        const localSavedAt = readStoredTimestamp();
        const localValues = readStoredValues();
        const shouldApplyRemote = countAnswered(localValues) === 0 || !localSavedAt || remoteSavedAt > localSavedAt;

        setLastRemoteSavedAt(remoteSavedAt);
        lastRemoteSignatureRef.current = serializeValues(payload.values);
        setIsRemoteReady(true);

        if (shouldApplyRemote) {
          form.reset(payload.values);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.values));
          window.localStorage.setItem(STORAGE_TIMESTAMP_KEY, remoteSavedAt.toISOString());
          setLastSavedAt(remoteSavedAt);
          setIsDirty(false);
          toast({
            title: "Briefing restaurado",
            description: "A versão mais recente foi carregada automaticamente.",
          });
        }
      } catch {
        setIsRemoteReady(true);
      } finally {
        hasHydratedRef.current = true;
      }
    };

    void loadRemoteBriefing();
  }, [form]);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      return;
    }

    setIsDirty(true);
    const timer = window.setTimeout(() => {
      try {
        const now = new Date();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
        window.localStorage.setItem(STORAGE_TIMESTAMP_KEY, now.toISOString());
        setLastSavedAt(now);
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

  useEffect(() => {
    if (!isRemoteReady) {
      return;
    }

    if (remoteSaveTimeoutRef.current) {
      window.clearTimeout(remoteSaveTimeoutRef.current);
    }

    remoteSaveTimeoutRef.current = window.setTimeout(() => {
      void syncRemoteBriefing(values);
    }, 1500);

    return () => {
      if (remoteSaveTimeoutRef.current) {
        window.clearTimeout(remoteSaveTimeoutRef.current);
      }
    };
  }, [isRemoteReady, values]);

  const handleReset = async () => {
    form.reset(defaultValues);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
    } catch {
      // ignore
    }
    setLastSavedAt(null);
    setLastRemoteSavedAt(null);
    setIsDirty(false);
    lastRemoteSignatureRef.current = "";
    try {
      await fetch(REMOTE_BRIEFING_ENDPOINT, { method: "DELETE" });
      toast({ title: "Briefing limpo", description: "As respostas locais e remotas foram removidas." });
    } catch {
      toast({
        title: "Limpeza parcial",
        description: "As respostas locais foram removidas, mas o briefing remoto não pôde ser apagado agora.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary(values));
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
      toast({ title: "Briefing copiado", description: "O resumo completo foi enviado para a área de transferência." });
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Seu navegador impediu o acesso à área de transferência.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const file = new Blob([buildSummary(values)], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "briefing-targg-logistica.txt";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBackupDownload = () => {
    const file = new Blob([JSON.stringify(buildBackupPayload(values), null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = window.URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "briefing-targg-logistica-backup.json";
    anchor.click();
    window.URL.revokeObjectURL(url);
    toast({ title: "Backup gerado", description: "Use esse arquivo para continuar o briefing em outro navegador." });
  };

  const handleImportBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as { values?: unknown };

      if (!isBriefingFormData(parsed.values)) {
        throw new Error("invalid");
      }

      form.reset(parsed.values);
      setLastSavedAt(new Date());
      setIsDirty(false);
      toast({ title: "Backup importado", description: "As respostas foram restauradas neste navegador." });
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

  const handleEmailSubmit = async () => {
    if (answeredCount < 4) {
      toast({
        title: "Preencha mais algumas respostas",
        description: "Antes de enviar, informe pelo menos os dados principais do briefing.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await syncRemoteBriefing(values, true);
    const latestSummary = buildSummary(values);

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "[TARGG Logística] Briefing do novo site",
          "Cliente do briefing": "TARGG Logística",
          "Nome informado no formulário": values.nomeEmpresa || "TARGG Logística",
          "E-mail de destino": TARGET_EMAIL,
          Respostas: latestSummary,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha no envio.");
      }

      toast({
        title: "Briefing enviado",
        description: `As respostas foram enviadas para ${TARGET_EMAIL}.`,
      });
    } catch {
      toast({
        title: "Não foi possível enviar agora",
        description: "Copie ou baixe o resumo e envie por e-mail se a falha persistir.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = useCallback((question: Question) => {
    const value = values[question.name];
    const otherField = getOtherFieldForQuestion(question.name);
    const otherValue = otherField ? values[otherField] : "";
    const selectedValues = question.type === "checkbox" ? getSelectedValues(value) : [];
    const shouldShowOtherField =
      otherField && selectedValues.some((item) => item === "Outra" || item === "Outros" || item === "Outro");
    const shouldShowReadyTexts = question.name !== "textosProntos" || values.textosSite === "Temos textos prontos" || value.trim().length > 0;

    if (!shouldShowReadyTexts) {
      return null;
    }

    const hasValue = value.trim().length > 0;

    return (
      <div key={question.name} className="border border-border bg-background/55 p-4 md:p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <label htmlFor={question.name} className="max-w-3xl text-base font-medium text-foreground">
              {question.label}
            </label>
            {question.helper ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{question.helper}</p> : null}
          </div>
          {hasValue ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> : null}
        </div>

        {question.type === "input" ? (
          <Input
            id={question.name}
            {...form.register(question.name)}
            placeholder={question.placeholder}
            className="min-h-12 rounded-none border-border bg-secondary/20 px-4 py-3 text-base placeholder:text-muted-foreground/70 focus-visible:ring-accent"
          />
        ) : null}

        {question.type === "checkbox" ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              {question.options?.map((option) => {
                const checked = selectedValues.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                  onClick={() => form.setValue(question.name, toggleOption(value, option), { shouldDirty: true })}
                    className={`flex min-h-12 touch-manipulation items-center justify-between gap-3 border px-4 py-3 text-left text-sm transition-colors ${
                      checked
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-secondary/20 text-muted-foreground hover:border-accent/60 hover:text-foreground"
                    }`}
                  >
                    <span>{option}</span>
                    {checked ? <Check className="h-4 w-4" /> : null}
                  </button>
                );
              })}
            </div>

            {shouldShowOtherField ? (
              <Textarea
                value={otherValue}
                onChange={(event) => form.setValue(otherField, event.target.value, { shouldDirty: true })}
                placeholder="Descreva aqui a outra informação que vocês querem acrescentar."
                className="mt-4 min-h-[110px] rounded-none border-border bg-secondary/20 px-4 py-3 text-base placeholder:text-muted-foreground/70 focus-visible:ring-accent"
              />
            ) : null}
          </>
        ) : null}

        {question.type === "radio" ? (
          <div className="grid gap-3">
            {question.options?.map((option) => (
              <button
                key={option}
                type="button"
              onClick={() => form.setValue(question.name, option, { shouldDirty: true })}
                className={`flex min-h-12 touch-manipulation items-center justify-between gap-3 border px-4 py-3 text-left text-sm transition-colors ${
                  value === option
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-secondary/20 text-muted-foreground hover:border-accent/60 hover:text-foreground"
                }`}
              >
                <span>{option}</span>
                {value === option ? <Check className="h-4 w-4" /> : null}
              </button>
            ))}
          </div>
        ) : null}

        {!question.type || question.type === "textarea" ? (
          <Textarea
            id={question.name}
            {...form.register(question.name)}
            placeholder={question.placeholder}
            className="min-h-[140px] rounded-none border-border bg-secondary/20 px-4 py-3 text-base placeholder:text-muted-foreground/70 focus-visible:ring-accent"
          />
        ) : null}
      </div>
    );
  }, [form, values]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Briefing de Site | TARGG Logística"
        description="Página interna de briefing para criação do novo site da TARGG Logística."
        url="/targglogistica"
        robots="noindex, nofollow"
      />

      <div className="noise-overlay" />
      <Navigation />

      <main className="pt-28 md:pt-40">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.16),transparent_28%),radial-gradient(circle_at_left,hsl(var(--foreground)/0.08),transparent_32%)]" />
          <div className="container-wide relative z-10 w-full max-w-full overflow-hidden px-4 py-12 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="w-full max-w-full overflow-hidden border border-border bg-card/30 p-4 md:p-10">
                <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
                  <div className="min-w-0">
                    <div className="mb-6 flex flex-wrap items-center gap-3 md:gap-4">
                      <span className="label text-accent">Portal do briefing</span>
                      <div className="h-px w-16 bg-accent/70" />
                      <span className="max-w-[12rem] text-sm leading-5 text-muted-foreground sm:max-w-none">Acesso apenas pelo link</span>
                    </div>

                    <motion.h1
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.8 }}
                      className="max-w-full [overflow-wrap:anywhere] break-words font-epic text-[2.15rem] font-black uppercase leading-[0.92] tracking-[-0.02em] text-foreground min-[390px]:text-[2.35rem] sm:text-6xl md:text-7xl lg:text-[5rem] lg:tracking-[-0.055em] xl:text-[6.2rem] 2xl:text-[7rem]"
                    >
                      Briefing <span className="text-accent">TARGG Logística</span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.8 }}
                      className="mt-6 max-w-full break-words text-sm leading-7 text-muted-foreground sm:text-base md:body-lg md:mt-8"
                    >
                      Preencha as informações abaixo para alinharmos a criação do novo site da TARGG Logística. As respostas
                      ajudam na definição da estrutura, textos, páginas, serviços, diferenciais e visual do site.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="grid min-w-0 max-w-full gap-3 text-xs text-muted-foreground sm:text-sm md:min-w-[320px]"
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 pb-3">
                      <span className="min-w-0 font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em]">Tempo médio</span>
                      <span className="min-w-0 text-right font-mono text-foreground">5 a 8 min</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 pb-3">
                      <span className="min-w-0 font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em]">Progresso</span>
                      <span className="min-w-0 text-right font-mono text-foreground">{completion}%</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 pb-3">
                      <span className="min-w-0 font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em]">Salvamento</span>
                      <span className="min-w-0 text-right font-mono text-foreground">
                        {isDirty ? "Salvando..." : isRemoteSaving ? "Sincronizando..." : "Site + local"}
                      </span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                      <span className="min-w-0 font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em]">Último sync</span>
                      <span className="min-w-0 text-right font-mono text-foreground">
                        {lastRemoteSavedAt ? formatDateTime(lastRemoteSavedAt) : "Aguardando"}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="grid max-w-full gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                <div className="min-w-0 bg-card/60 p-4 backdrop-blur-sm md:p-5">
                  <span className="label text-muted-foreground">Progresso</span>
                  <p className="mt-3 font-syne text-4xl font-bold text-foreground">{completion}%</p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${completion}%` }} />
                  </div>
                </div>

                <div className="min-w-0 bg-card/60 p-4 backdrop-blur-sm md:p-5">
                  <span className="label text-muted-foreground">Respondidas</span>
                  <p className="mt-3 font-syne text-4xl font-bold text-foreground">
                    {answeredCount}/{totalFieldCount}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">As respostas aparecem no resumo final em tempo real.</p>
                </div>

                <div className="min-w-0 bg-card/60 p-4 backdrop-blur-sm md:p-5">
                  <span className="label text-muted-foreground">Materiais</span>
                  <p className="mt-3 flex items-center gap-2 text-sm text-foreground">
                    <Mail className="h-4 w-4 text-accent" />
                    Enviar arquivos por e-mail
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">Assunto: Materiais TARGG Logística - Site</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container-wide py-12 md:py-16">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_420px]">
            <div className="space-y-6">
              <div className="border border-border bg-secondary/20 p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="label text-accent">Antes de começar</p>
                    <h2 className="heading-sm mt-3">Responda do jeito mais direto possível</h2>
                  </div>
                  <Button
                    type="button"
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    className="h-12 touch-manipulation rounded-none bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Enviando..." : "Enviar briefing"}
                  </Button>
                </div>

                <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
                  Caso tenham imagens, fotos da frota, fotos da equipe, vídeos, logotipo, materiais da empresa ou qualquer
                  arquivo visual que possa ser usado no site, enviem diretamente para{" "}
                  <a href={`mailto:${TARGET_EMAIL}`} className="text-accent hover:underline">
                    {TARGET_EMAIL}
                  </a>
                  .
                </p>
              </div>

              <form className="space-y-4">
                <Accordion type="multiple" defaultValue={sectionIds} className="space-y-4">
                  {sections.map((section) => {
                    const answeredInSection = sectionProgress[section.id] ?? 0;

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
                          <div className="grid gap-5">{section.questions.map(renderQuestion)}</div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </form>

              <div className="border border-accent/30 bg-accent/10 p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="label text-accent">Finalizar briefing</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Revise as respostas e envie o briefing completo para o e-mail do projeto.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    className="h-12 touch-manipulation rounded-none bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Enviando briefing..." : "Enviar briefing"}
                  </Button>
                </div>
              </div>
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
                  Ao finalizar, clique em enviar para mandar as perguntas e respostas para o e-mail do projeto.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={handleImportBackup}
                  />
                  <Button
                    type="button"
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    className="touch-manipulation justify-start rounded-none bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Enviando..." : "Enviar por e-mail"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCopy}
                    variant="outline"
                    className="touch-manipulation justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent"
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    {isCopied ? "Copiado" : "Copiar"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDownload}
                    variant="outline"
                    className="touch-manipulation justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent"
                  >
                    <Download className="h-4 w-4" />
                    Baixar .txt
                  </Button>
                  <Button
                    type="button"
                    onClick={handleBackupDownload}
                    variant="outline"
                    className="touch-manipulation justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent"
                  >
                    <Download className="h-4 w-4" />
                    Backup .json
                  </Button>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="touch-manipulation justify-start rounded-none border-border bg-background/40 text-foreground hover:border-accent"
                  >
                    <Upload className="h-4 w-4" />
                    Importar backup
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="touch-manipulation justify-start rounded-none border-destructive/40 bg-background/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
                  {summaryPreview}
                </pre>
                <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <Save className="h-3.5 w-3.5 text-accent" />
                  Último salvamento local: {formatDateTime(lastSavedAt)}
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

export default TarggLogisticaBriefing;
