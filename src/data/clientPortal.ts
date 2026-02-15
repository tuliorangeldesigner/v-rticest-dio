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
    projectName: 'Reestruturação de Marca e Presença Digital',
    status: 'Em andamento',
    updatedAt: '15 de fevereiro de 2026',
    overview: [
      'Este portal centraliza todo o material estratégico e criativo do projeto da Excellent Soluções.',
      'Aqui você acompanha evolução, valida entregas e baixa os arquivos finais quando a fase for concluída.',
    ],
    conceito: [
      'Direção de posicionamento focada em autoridade e clareza comercial.',
      'Linguagem visual orientada para percepção premium, sem perder objetividade.',
      'Base narrativa construída para reforçar confiança antes da proposta.',
    ],
    manual: [
      'Regras de uso de logotipo e áreas de proteção.',
      'Paleta cromática principal e secundária com aplicações recomendadas.',
      'Tipografia institucional, escala e hierarquia de títulos/textos.',
      'Guia de tom de voz para peças digitais e comunicação comercial.',
    ],
    aplicacoes: [
      'Assinatura visual para redes sociais.',
      'Template para apresentações comerciais.',
      'Estrutura visual para peças de conversão e anúncios.',
      'Padrão de identidade para materiais institucionais.',
    ],
    mockups: [
      'Mockups de capa e feed para redes sociais.',
      'Mockups de materiais de proposta e apresentação.',
      'Mockups de páginas e blocos estratégicos do site.',
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
