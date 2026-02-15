export type PortalSectionKey = 'visao-geral' | 'conceito' | 'manual' | 'aplicacoes' | 'mockups' | 'downloads';

export interface PortalDownload {
  label: string;
  description: string;
  href: string;
  unlocked: boolean;
}

export interface ClientPortal {
  slug: string;
  clientName: string;
  projectName: string;
  status: 'Em andamento' | 'Entregue';
  updatedAt: string;
  overview: string[];
  conceito: string[];
  manual: string[];
  aplicacoes: string[];
  mockups: string[];
  downloads: PortalDownload[];
}

// Edite este objeto para atualizar o conteúdo do portal de cada cliente.
export const clientPortals: ClientPortal[] = [
  {
    slug: 'excellent-solucoes',
    clientName: 'Excellent Soluções',
    projectName: 'Reposicionamento de Marca e Sistema de Presença Premium',
    status: 'Em andamento',
    updatedAt: '15 de fevereiro de 2026',
    overview: [
      'Antes da forma, o diagnóstico mostrou uma dor real do mercado condominial: a insegurança causada por gestões amadoras, reativas e sem previsibilidade.',
      'A estratégia da nova identidade foi construída para ser o oposto disso: estabilidade, senioridade e autoridade percebida desde o primeiro contato.',
      'O objetivo central do reposicionamento é claro: elevar a Excellent Soluções para um novo patamar de confiança junto a conselhos, síndicos e moradores.',
      'Este projeto não nasce para “parecer bonito”; ele nasce para sustentar percepção premium, reduzir objeção comercial e fortalecer valor percebido.',
      'A conclusão estratégica é direta: consolidar o novo momento da marca com uma linguagem visual robusta, coerente e escalável.',
    ],
    conceito: [
      'O símbolo foi desenhado como uma “joia geométrica”, afastando a marca dos clichês visuais de telhados e prédios literais do setor.',
      'Enquanto concorrentes comunicam apenas operação, a Excellent passa a comunicar inteligência estratégica e postura consultiva.',
      'O cubo fechado ataca a principal dor do mercado: insegurança. Sua forma transmite proteção, controle e estabilidade para gestão patrimonial.',
      'No monograma, três letras “E” formam uma tríade em perspectiva: Excelência, Eficiência e Ética.',
      'Excelência representa padrão elevado de atendimento e entrega.',
      'Eficiência representa precisão, agilidade e resolução inteligente das demandas administrativas.',
      'Ética representa transparência, confiança e compromisso com a gestão responsável sob o Código Civil 1348.',
    ],
    manual: [
      'Paleta Gold & Black: contraste premium para reforçar autoridade, sofisticação e diferenciação competitiva.',
      'Tipografia moderna, equilibrada e sem serifa para comunicar clareza, contemporaneidade e credibilidade.',
      'Sistema de proporções e área de respiro para preservar leitura e impacto do símbolo em qualquer contexto.',
      'Hierarquia tipográfica definida para títulos, subtítulos e textos de apoio, com consistência entre digital e impresso.',
      'Diretrizes de aplicação da marca para fundo claro, fundo escuro e cenários de alta restrição visual.',
      'Tom verbal institucional orientado a segurança, objetividade e domínio técnico.',
    ],
    aplicacoes: [
      'Performance no Instagram: o conjunto tipográfico garante leitura imediata em feed, stories e criativos de tráfego.',
      'Reconhecimento em pequena escala: o ícone geométrico mantém legibilidade e presença forte em avatares e miniaturas.',
      'Integridade visual em ambientes digitais: a marca preserva forma e contraste mesmo em espaços reduzidos.',
      'Templates para apresentações e propostas comerciais com percepção premium e linguagem consistente.',
      'Assinaturas visuais para materiais institucionais e comunicação recorrente com síndicos e conselhos.',
    ],
    mockups: [
      'Mockups de avatar, capa e grid para Instagram, com foco em reconhecimento rápido da marca.',
      'Mockups de proposta comercial e apresentação institucional com narrativa de autoridade.',
      'Mockups de aplicação da identidade em materiais administrativos e comunicação com moradores.',
      'Mockups de páginas estratégicas do site com uso consistente de cor, tipografia e hierarquia.',
      'Mockups de cenários de baixa escala para validar legibilidade do símbolo e da assinatura.',
    ],
    downloads: [
      {
        label: 'Pacote de Marca (.zip)',
        description: 'Arquivos editáveis de identidade visual e variações.',
        href: '#',
        unlocked: false,
      },
      {
        label: 'Manual da Marca (.pdf)',
        description: 'Documento consolidado de diretrizes e aplicações.',
        href: '#',
        unlocked: false,
      },
      {
        label: 'Apresentação Estratégica (.pdf)',
        description: 'Conceito, narrativa e lógica de posicionamento.',
        href: '#',
        unlocked: false,
      },
    ],
  },
];

export const getClientPortalBySlug = (slug: string): ClientPortal | undefined => {
  return clientPortals.find((portal) => portal.slug === slug);
};
