import { lazy, memo, Suspense, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Lock,
  Mail,
  RefreshCw,
  Save,
  Send,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import { toast } from '@/hooks/use-toast';

const Footer = lazy(() => import('@/components/Footer'));

type FieldType = 'text' | 'textarea';

interface BriefingField {
  key: string;
  label: string;
  type: FieldType;
  placeholder: string;
  rows?: number;
  defaultValue?: string;
}

interface BriefingSection {
  id: string;
  step: string;
  title: string;
  description: string;
  fields: BriefingField[];
}

type BriefingAnswers = Record<string, string>;

const STORAGE_KEY = 'portal-algoritmo-briefing';
const SUBMITTED_STORAGE_KEY = 'portal-algoritmo-briefing-submitted';
const REMOTE_DRAFT_STORAGE_KEY = 'portal-algoritmo-briefing-remote-draft-timestamp';
const REMOTE_DRAFT_HASH_KEY = 'portal-algoritmo-briefing-remote-draft-hash';
const REMOTE_BRIEFING_ENDPOINT = '/api/briefing/algoritmo';

type RemoteBriefingPayload = {
  version: number;
  client: 'algoritmo';
  savedAt: string;
  values: BriefingAnswers;
};

const sections: BriefingSection[] = [
  {
    id: 'arquitetura-home',
    step: '01',
    title: 'Arquitetura da Home',
    description:
      'Defina a hierarquia final da Home e da navegação principal para o layout ser organizado corretamente.',
    fields: [
      {
        key: 'home_order',
        label: 'Ordem final das seções da Home',
        type: 'textarea',
        rows: 7,
        placeholder:
          'Exemplo:\nHero\nSobre nós\nParceiros\nProdutos\nEcossistema\nDepoimentos\nCases\nMentores\nConteúdos\nPodcast\nContato',
      },
      {
        key: 'navbar_items',
        label: 'Itens finais da navbar',
        type: 'textarea',
        rows: 6,
        placeholder:
          'Exemplo:\nHome\nProgramas\nMentorias\nConteúdos\nComunidades\nSobre nós\nNosso Ecossistema',
      },
      {
        key: 'architecture_notes',
        label: 'Observações sobre estrutura, prioridade ou comportamento',
        type: 'textarea',
        rows: 4,
        placeholder: 'Se alguma seção precisa de mais destaque, mudança de ordem ou comportamento específico, detalhe aqui.',
      },
    ],
  },
  {
    id: 'parceiros-hero',
    step: '02',
    title: 'Parceiros e Hero',
    description:
      'Envie as referências que alimentam a primeira impressão do site e a seção de parceiros.',
    fields: [
      {
        key: 'partners_list',
        label: 'Lista de parceiros e ordem de prioridade',
        type: 'textarea',
        rows: 7,
        placeholder: 'Liste os parceiros, destaque prioridade e avise se existe alguma hierarquia visual entre eles.',
      },
      {
        key: 'partners_assets',
        label: 'Logos e materiais dos parceiros',
        type: 'textarea',
        rows: 4,
        placeholder: 'Cole links de Drive, Figma, pasta compartilhada ou indique onde os arquivos estão.',
      },
      {
        key: 'hero_photo',
        label: 'Foto principal da capa',
        type: 'text',
        placeholder: 'Link ou orientação da foto real/profissional que será usada na capa.',
      },
      {
        key: 'hero_title',
        label: 'Título final do hero',
        type: 'text',
        defaultValue: 'A maior escola de logística e transporte',
        placeholder: 'Título principal da capa.',
      },
      {
        key: 'hero_subtitle',
        label: 'Subtítulo final do hero',
        type: 'textarea',
        rows: 3,
        defaultValue:
          'Aprenda com quem já fez na prática e cresça com método aplicado ao seu negócio. Baseado em ensino prático e real.',
        placeholder: 'Subtítulo da capa.',
      },
      {
        key: 'hero_keep_notes',
        label: 'Elementos que devem permanecer na capa',
        type: 'textarea',
        rows: 3,
        defaultValue: 'Manter botão de ação e quantidade de inscritos no YouTube.',
        placeholder: 'Detalhe o que deve continuar no hero atual.',
      },
    ],
  },
  {
    id: 'programas',
    step: '03',
    title: 'Programas e Lista Final',
    description:
      'Documente os cursos, programas e conteúdos principais para a Home e futuras páginas internas.',
    fields: [
      {
        key: 'programs_catalog',
        label: 'Lista final de programas e conteúdos que entram no site',
        type: 'textarea',
        rows: 8,
        placeholder:
          'Exemplo:\nMapa de Vendas 1\nMapa de Vendas 2\nVocê Liderando\nMapa Operacional 1\nMapa Operacional 2\nCursos Online\nCursos Presenciais\nMentorias',
      },
      {
        key: 'programs_details',
        label: 'Detalhes dos programas/cursos',
        type: 'textarea',
        rows: 12,
        placeholder:
          'Para cada programa envie:\n- Nome oficial\n- Resumo curto\n- Descrição completa\n- Tópicos principais\n- Data, formato, duração e NPS (se aparecer no layout)\n- Imagem/capa existente',
      },
      {
        key: 'programs_assets',
        label: 'Links de capas, imagens ou referências visuais',
        type: 'textarea',
        rows: 4,
        placeholder: 'Cole os links das capas, thumbnails e materiais que devem representar os programas.',
      },
    ],
  },
  {
    id: 'mentorias',
    step: '04',
    title: 'Mentorias e Mentores',
    description:
      'Reúna as informações necessárias para cards, páginas internas e blocos de autoridade.',
    fields: [
      {
        key: 'mentoring_details',
        label: 'Mentorias',
        type: 'textarea',
        rows: 10,
        placeholder:
          'Para cada mentoria envie:\n- Nome\n- Resumo\n- Dores\n- Objetivos\n- Resultados esperados\n- Mentor responsável',
      },
      {
        key: 'mentors_details',
        label: 'Mentores',
        type: 'textarea',
        rows: 10,
        placeholder:
          'Para cada mentor envie:\n- Foto profissional\n- Nome completo\n- Cargo\n- Especialidade\n- Mini bio ou resumo profissional',
      },
      {
        key: 'mentors_assets',
        label: 'Links de fotos e materiais oficiais dos mentores',
        type: 'textarea',
        rows: 4,
        placeholder: 'Cole aqui os links para fotos, pastas ou documentos de apoio.',
      },
    ],
  },
  {
    id: 'prova-social',
    step: '05',
    title: 'Depoimentos e Cases',
    description:
      'Organize a prova social que vai sustentar percepção de autoridade, transformação e credibilidade.',
    fields: [
      {
        key: 'testimonials_details',
        label: 'Depoimentos',
        type: 'textarea',
        rows: 9,
        placeholder:
          'Para cada depoimento envie:\n- Foto\n- Nome da pessoa\n- Empresa/cargo\n- Frase curta ou resumo de identificação',
      },
      {
        key: 'cases_details',
        label: 'Cases reais',
        type: 'textarea',
        rows: 9,
        placeholder:
          'Para cada case envie:\n- Nome/título\n- Resumo curto\n- Imagem ou thumbnail\n- Quantidade de cases que devem aparecer inicialmente',
      },
      {
        key: 'social_proof_notes',
        label: 'Observações sobre prioridade, destaque ou formato',
        type: 'textarea',
        rows: 4,
        placeholder: 'Explique se algum case ou depoimento precisa aparecer com mais destaque na Home.',
      },
    ],
  },
  {
    id: 'conteudo-ecosistema',
    step: '06',
    title: 'Conteúdos, Comunidades e Ecossistema',
    description:
      'Consolide os materiais editoriais, institucionais e estratégicos que completam o projeto.',
    fields: [
      {
        key: 'content_details',
        label: 'Blog, podcast e conteúdos',
        type: 'textarea',
        rows: 10,
        placeholder:
          'Enviar:\n- Títulos dos conteúdos que vão aparecer\n- Imagens/thumbs\n- Episódio mais recente do podcast\n- Próximo convidado\n- Conteúdo ou título da seção sobre a nova legislação tributária',
      },
      {
        key: 'communities_details',
        label: 'Comunidades',
        type: 'textarea',
        rows: 6,
        placeholder:
          'Enviar:\n- Nome das comunidades\n- Breve descrição de cada uma\n- Identidade visual, referência ou direcionamento de destaque',
      },
      {
        key: 'about_numbers_ecosystem',
        label: 'Sobre nós, Algoritmo em números e Nosso Ecossistema',
        type: 'textarea',
        rows: 10,
        placeholder:
          'Enviar:\n- Texto base do Sobre nós\n- Principais mensagens\n- Números/dados de destaque\n- Texto base do ecossistema\n- Estrutura ou visão geral do ecossistema',
      },
      {
        key: 'official_images',
        label: 'Fotos profissionais e imagens oficiais',
        type: 'textarea',
        rows: 8,
        placeholder:
          'Enviar links ou direção para:\n- Fotos reais que substituem as atuais\n- Imagens dos mentores\n- Imagens dos cursos\n- Imagens de eventos\n- Imagens do podcast\n- Imagens de cases\n- Imagens institucionais em geral',
      },
      {
        key: 'final_notes',
        label: 'Observação final ou materiais extras',
        type: 'textarea',
        rows: 5,
        placeholder: 'Se existir alguma referência adicional, restrição ou comentário importante para o layout, detalhe aqui.',
      },
    ],
  },
];

const createInitialAnswers = (): BriefingAnswers =>
  sections.reduce<BriefingAnswers>((accumulator, section) => {
    section.fields.forEach((field) => {
      accumulator[field.key] = field.defaultValue || '';
    });
    return accumulator;
  }, {});

const parseStoredAnswers = (value: string | null): BriefingAnswers | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as BriefingAnswers;
  } catch {
    return null;
  }
};

const formatDateTime = (iso: string | null) => {
  if (!iso) return 'Ainda não salvo';
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const FooterFallback = () => <div className="min-h-[220px] border-t border-border bg-background" aria-hidden="true" />;

interface BriefingFieldInputProps {
  field: BriefingField;
  value: string;
  onChange: (key: string, value: string) => void;
}

const BriefingFieldInput = memo(({ field, value, onChange }: BriefingFieldInputProps) => (
  <label className="block">
    <div className="flex items-center justify-between gap-4 mb-3">
      <span className="text-sm font-mono uppercase tracking-[0.18em] text-foreground/90">
        {field.label}
      </span>
      {value.trim() ? (
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent">
          preenchido
        </span>
      ) : (
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          aguardando resposta
        </span>
      )}
    </div>

    {field.type === 'textarea' ? (
      <textarea
        value={value}
        onChange={(event) => onChange(field.key, event.target.value)}
        rows={field.rows || 6}
        placeholder={field.placeholder}
        className="min-h-[180px] w-full resize-y border border-border bg-background/80 px-4 py-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(field.key, event.target.value)}
        placeholder={field.placeholder}
        className="h-14 w-full border border-border bg-background/80 px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none"
      />
    )}
  </label>
));

BriefingFieldInput.displayName = 'BriefingFieldInput';

interface BriefingSectionCardProps {
  section: BriefingSection;
  delay: number;
  values: BriefingAnswers;
  onChange: (key: string, value: string) => void;
}

const BriefingSectionCard = memo(({ section, delay, values, onChange }: BriefingSectionCardProps) => (
  <motion.section
    id={section.id}
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="border border-border bg-card/25"
  >
    <div className="border-b border-border px-6 py-5 sm:px-8 sm:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent">
              Bloco {section.step}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-bold">{section.title}</h2>
        </div>
        <div className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <FileText className="w-3.5 h-3.5 text-accent" />
          {section.fields.length} campos
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">{section.description}</p>
    </div>

    <div className="grid gap-6 p-6 sm:p-8">
      {section.fields.map((field) => (
        <BriefingFieldInput
          key={field.key}
          field={field}
          value={values[field.key] || ''}
          onChange={onChange}
        />
      ))}
    </div>
  </motion.section>
));

BriefingSectionCard.displayName = 'BriefingSectionCard';

const getBriefingPayload = (answers: BriefingAnswers, progress: number) => {
  const formattedBriefing = sections
    .map((section) => {
      const block = section.fields
        .map((field) => `${field.label}\n${answers[field.key]?.trim() || '[Não respondido]'}`)
        .join('\n\n');
      return `${section.step}. ${section.title}\n${block}`;
    })
    .join('\n\n-------------------------\n\n');

  return {
    progress,
    formattedBriefing,
    answeredFields: Object.values(answers).filter((value) => value.trim().length > 0).length,
  };
};

const buildRemotePayload = (answers: BriefingAnswers): RemoteBriefingPayload => ({
  version: 1,
  client: 'algoritmo',
  savedAt: new Date().toISOString(),
  values: answers,
});

const AlgorithmPortal = () => {
  const [answers, setAnswers] = useState<BriefingAnswers>(() => {
    const stored = parseStoredAnswers(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null);
    return stored ? { ...createInitialAnswers(), ...stored } : createInitialAnswers();
  });
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(() =>
    typeof window !== 'undefined' ? window.localStorage.getItem(`${STORAGE_KEY}-timestamp`) : null,
  );
  const [lastSubmittedAt, setLastSubmittedAt] = useState<string | null>(() =>
    typeof window !== 'undefined' ? window.localStorage.getItem(`${SUBMITTED_STORAGE_KEY}-timestamp`) : null,
  );
  const [lastRemoteDraftAt, setLastRemoteDraftAt] = useState<string | null>(() =>
    typeof window !== 'undefined' ? window.localStorage.getItem(REMOTE_DRAFT_STORAGE_KEY) : null,
  );
  const [submittedSnapshot, setSubmittedSnapshot] = useState<BriefingAnswers | null>(() =>
    parseStoredAnswers(typeof window !== 'undefined' ? window.localStorage.getItem(SUBMITTED_STORAGE_KEY) : null),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const remoteSyncTimeoutRef = useRef<number | null>(null);
  const lastRemoteHashRef = useRef<string>(
    typeof window !== 'undefined' ? window.localStorage.getItem(REMOTE_DRAFT_HASH_KEY) || '' : '',
  );
  const previousSectionValuesRef = useRef<Record<string, BriefingAnswers>>({});
  const totalFields = useMemo(() => sections.reduce((sum, section) => sum + section.fields.length, 0), []);
  const answeredFields = useMemo(
    () => Object.values(answers).filter((value) => value.trim().length > 0).length,
    [answers],
  );
  const progress = Math.round((answeredFields / totalFields) * 100);
  const deferredAnswers = useDeferredValue(answers);
  const deferredProgress = useDeferredValue(progress);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadRemoteBriefing = async () => {
      try {
        const response = await fetch(REMOTE_BRIEFING_ENDPOINT, {
          cache: 'no-store',
        });

        if (response.status === 404) {
          setIsHydrated(true);
          return;
        }

        if (!response.ok) {
          throw new Error('Falha ao carregar briefing remoto');
        }

        const payload = (await response.json()) as RemoteBriefingPayload;
        const remoteSavedAt = payload.savedAt;
        const localSavedAt = window.localStorage.getItem(`${STORAGE_KEY}-timestamp`);
        const localAnswers = parseStoredAnswers(window.localStorage.getItem(STORAGE_KEY));
        const localHasAnswers = !!localAnswers && Object.values(localAnswers).some((value) => value.trim().length > 0);
        const shouldApplyRemote = !localHasAnswers || !localSavedAt || new Date(remoteSavedAt) > new Date(localSavedAt);

        lastRemoteHashRef.current = JSON.stringify(payload.values);
        setLastRemoteDraftAt(remoteSavedAt);

        if (shouldApplyRemote) {
          const mergedAnswers = { ...createInitialAnswers(), ...payload.values };
          setAnswers(mergedAnswers);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedAnswers));
          window.localStorage.setItem(`${STORAGE_KEY}-timestamp`, remoteSavedAt);
          window.localStorage.setItem(REMOTE_DRAFT_STORAGE_KEY, remoteSavedAt);
          window.localStorage.setItem(REMOTE_DRAFT_HASH_KEY, JSON.stringify(payload.values));
          setLastSavedAt(remoteSavedAt);
          toast({
            title: 'Briefing restaurado do site',
            description: 'A versão mais recente foi carregada automaticamente neste navegador.',
          });
        }
      } catch {
        // keep local fallback
      } finally {
        setIsHydrated(true);
      }
    };

    void loadRemoteBriefing();
  }, []);

  const sectionValues = useMemo(() => {
    const nextValues: Record<string, BriefingAnswers> = {};

    sections.forEach((section) => {
      const previousValues = previousSectionValuesRef.current[section.id];
      const hasChanged = !previousValues || section.fields.some((field) => previousValues[field.key] !== answers[field.key]);

      if (hasChanged) {
        const currentValues: BriefingAnswers = {};
        section.fields.forEach((field) => {
          currentValues[field.key] = answers[field.key] || '';
        });
        nextValues[section.id] = currentValues;
      } else {
        nextValues[section.id] = previousValues;
      }
    });

    previousSectionValuesRef.current = nextValues;
    return nextValues;
  }, [answers]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deferredAnswers));
    const now = new Date().toISOString();
    window.localStorage.setItem(`${STORAGE_KEY}-timestamp`, now);
    setLastSavedAt(now);
  }, [deferredAnswers, isHydrated]);

  const handleAnswerChange = useCallback((key: string, value: string) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
  }, []);

  const syncRemoteBriefing = useCallback(async (mode: 'draft' | 'final') => {
    const currentAnswers = mode === 'draft' ? deferredAnswers : answers;
    const currentProgress = mode === 'draft' ? deferredProgress : progress;
    const payload = getBriefingPayload(currentAnswers, currentProgress);
    const signature = JSON.stringify(currentAnswers);
    const subject =
      mode === 'draft'
        ? `Rascunho salvo - Portal Algoritmo - ${new Date().toLocaleString('pt-BR')}`
        : 'Portal do Cliente - Briefing Algoritmo';

    if (mode === 'draft') {
      if (signature === lastRemoteHashRef.current || payload.answeredFields === 0) {
        return false;
      }
      setIsSavingDraft(true);
    } else {
      setIsSubmitting(true);
    }

    try {
      const remoteResponse = await fetch(REMOTE_BRIEFING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildRemotePayload(currentAnswers)),
      });

      if (!remoteResponse.ok) {
        throw new Error('Falha ao salvar briefing remoto');
      }

      const response = await fetch('https://formsubmit.co/ajax/tuliorangeldesigner@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          _captcha: 'false',
          _template: 'table',
          Cliente: 'Algoritmo',
          Portal: 'Acesso privado por link',
          Tipo: mode === 'draft' ? 'Backup remoto de rascunho' : 'Envio final',
          Progresso: `${payload.progress}%`,
          Respostas: payload.formattedBriefing,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao sincronizar briefing');
      }

      const now = new Date().toISOString();
      if (typeof window !== 'undefined') {
        if (mode === 'draft') {
          window.localStorage.setItem(REMOTE_DRAFT_STORAGE_KEY, now);
          window.localStorage.setItem(REMOTE_DRAFT_HASH_KEY, signature);
        } else {
          window.localStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(currentAnswers));
          window.localStorage.setItem(`${SUBMITTED_STORAGE_KEY}-timestamp`, now);
          window.localStorage.setItem(REMOTE_DRAFT_STORAGE_KEY, now);
          window.localStorage.setItem(REMOTE_DRAFT_HASH_KEY, signature);
        }
      }

      lastRemoteHashRef.current = signature;
      setLastRemoteDraftAt(now);

      if (mode === 'final') {
        setSubmittedSnapshot(currentAnswers);
        setLastSubmittedAt(now);
        toast({
          title: 'Briefing enviado',
          description: 'A versão final foi enviada e o backup remoto ficou atualizado.',
        });
      }

      return true;
    } catch {
      if (mode === 'final') {
        toast({
          title: 'Não foi possível enviar agora',
          description: 'O briefing segue salvo localmente, mas o backup remoto falhou. Tente novamente.',
          variant: 'destructive',
        });
      }
      return false;
    } finally {
      if (mode === 'draft') {
        setIsSavingDraft(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [answers, deferredAnswers, deferredProgress, progress]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isHydrated) return;
    if (remoteSyncTimeoutRef.current) {
      window.clearTimeout(remoteSyncTimeoutRef.current);
    }

    remoteSyncTimeoutRef.current = window.setTimeout(() => {
      void syncRemoteBriefing('draft');
    }, 20000);

    return () => {
      if (remoteSyncTimeoutRef.current) {
        window.clearTimeout(remoteSyncTimeoutRef.current);
      }
    };
  }, [deferredAnswers, deferredProgress, isHydrated, syncRemoteBriefing]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isHydrated) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        void syncRemoteBriefing('draft');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handleVisibilityChange);
    };
  }, [isHydrated, syncRemoteBriefing]);

  const handleManualDraftSave = async () => {
    const synced = await syncRemoteBriefing('draft');
    if (synced) {
      toast({
        title: 'Progresso salvo',
        description: 'Um backup remoto do briefing foi registrado com sucesso.',
      });
    } else {
      toast({
        title: 'Sem novas alterações',
        description: 'O backup remoto já estava atualizado com a versão atual.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="Portal do Cliente | Algoritmo"
        description="Briefing privado do projeto Algoritmo."
        url="/portal/algoritmo"
        robots="noindex, nofollow"
      />

      <main className="pt-32 pb-24">
        <section className="container-wide mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden border border-border bg-card/40"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent)/0.22),transparent_38%),linear-gradient(180deg,transparent,rgba(0,0,0,0.18))]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] p-8 md:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-accent">
                    <Lock className="w-3.5 h-3.5" />
                    Portal privado
                  </span>
                  <span className="inline-flex items-center gap-2 border border-border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                    Cliente: Algoritmo
                  </span>
                </div>

                <h1 className="font-epic text-4xl sm:text-5xl md:text-7xl uppercase leading-[1.02] max-w-4xl">
                  Briefing de layout para <span className="text-accent">Algoritmo</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Esta página organiza todos os materiais necessários para o desenvolvimento do layout.
                  As respostas ficam salvas neste navegador e também recebem backup remoto ao longo do
                  preenchimento para reduzir o risco de perda.
                </p>
              </div>

              <div className="border border-border/80 bg-background/75 p-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  <span>Progresso</span>
                  <span>{progress}%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden bg-secondary">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-orange-300 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Save className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Autosave local</p>
                      <p className="text-muted-foreground">Último salvamento: {formatDateTime(lastSavedAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Backup remoto</p>
                      <p className="text-muted-foreground">Última sincronização: {formatDateTime(lastRemoteDraftAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Como usar</p>
                      <p className="text-muted-foreground">
                        Preencha por blocos. O rascunho é espelhado remotamente e a versão final pode ser enviada no fim.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className={`w-4 h-4 mt-0.5 ${isSavingDraft ? 'text-accent animate-spin' : 'text-accent'}`} />
                    <div>
                      <p className="font-medium text-foreground">Status do rascunho</p>
                      <p className="text-muted-foreground">
                        {isSavingDraft ? 'Sincronizando backup remoto...' : 'Aguardando novas alterações para sincronizar.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="container-wide mb-10">
          <div className="grid gap-10 xl:grid-cols-[0.38fr_0.62fr]">
            <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
              <div className="border border-border bg-card/20 p-6">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-4">Mapa do briefing</p>
                <div className="space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-start gap-3 border border-transparent px-3 py-3 transition-colors hover:border-border hover:bg-background/60"
                    >
                      <span className="text-xs font-mono text-accent mt-1">{section.step}</span>
                      <div>
                        <p className="font-syne text-lg font-bold group-hover:text-accent transition-colors">
                          {section.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {submittedSnapshot ? (
                <div className="border border-border bg-background/70 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <p className="font-syne text-2xl font-bold">Última versão enviada</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Registrada neste navegador em {formatDateTime(lastSubmittedAt)}.
                  </p>
                  <div className="space-y-4 max-h-[420px] overflow-auto pr-2">
                    {sections.map((section) => (
                      <div key={section.id} className="border border-border/70 bg-card/20 p-4">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-2">
                          {section.step}
                        </p>
                        <h2 className="font-syne text-xl font-bold mb-3">{section.title}</h2>
                        <div className="space-y-3">
                          {section.fields.map((field) => (
                            <div key={field.key}>
                              <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground mb-1">
                                {field.label}
                              </p>
                              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/88">
                                {submittedSnapshot[field.key] || 'Não respondido'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
            <div className="space-y-8">
              {sections.map((section, sectionIndex) => (
                <BriefingSectionCard
                  key={section.id}
                  section={section}
                  delay={sectionIndex * 0.05}
                  values={sectionValues[section.id]}
                  onChange={handleAnswerChange}
                />
              ))}

              <section className="border border-border bg-foreground text-background">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-background/60 mb-4">
                      Encerrar briefing
                    </p>
                    <h2 className="font-syne text-3xl sm:text-4xl font-bold mb-4">
                      Quando terminar, envie a versão atual do portal.
                    </h2>
                    <p className="max-w-2xl text-background/75 leading-relaxed">
                      Antes do envio final, você pode salvar um backup remoto do progresso. Depois, envie
                      a versão final quando o briefing estiver completo.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleManualDraftSave}
                      disabled={isSavingDraft}
                      className="inline-flex h-14 items-center justify-center gap-3 border border-background/20 bg-background px-8 text-sm font-semibold uppercase tracking-[0.18em] text-foreground transition-transform hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Save className="w-4 h-4" />
                      {isSavingDraft ? 'Salvando...' : 'Salvar progresso'}
                    </button>

                    <button
                      type="button"
                      onClick={() => void syncRemoteBriefing('final')}
                      disabled={isSubmitting}
                      className="inline-flex h-14 items-center justify-center gap-3 border border-background/20 bg-accent px-8 text-sm font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-transform hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? 'Enviando...' : 'Enviar briefing'}
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AlgorithmPortal;
