import excellenceCover from '@/assets/excellence1.webp';

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
  coverImage?: string;
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
    coverImage: excellenceCover,
    status: 'Em andamento',
    updatedAt: '15 de fevereiro de 2026',
    overview: [
      'Antes de desenhar qualquer forma, o diagnóstico focou na maturidade do negócio e no contexto real do mercado condominial. O principal problema identificado foi a insegurança causada por gestões amadoras, que operam de forma reativa, sem previsibilidade e sem transmitir confiança para conselhos e moradores.',
      'O reposicionamento da Excellent Soluções foi estruturado para comunicar exatamente o oposto desse cenário: estabilidade, senioridade e controle. A nova identidade não busca apenas uma estética mais atual, ela estabelece uma presença de autoridade desde o primeiro contato e reforça a percepção de uma gestão profissional de alto nível.',
      'Em termos estratégicos, o impacto esperado é claro: reduzir objeções comerciais, elevar a percepção de valor dos serviços e posicionar a marca em um novo patamar de confiança. Esta evolução visual consolida um novo momento da Excellent Soluções e transforma a comunicação da empresa em um ativo direto de crescimento.',
    ],
    conceito: [
      'O símbolo da marca foi concebido como uma joia geométrica, com a intenção de afastar a Excellent Soluções dos códigos visuais óbvios do setor, como telhados e prédios literais. Em vez de comunicar apenas execução operacional, a marca passa a comunicar pensamento estratégico, visão consultiva e posicionamento de referência.',
      'A estrutura central em forma de cubo fechado responde diretamente à maior dor do mercado: a insegurança. A geometria transmite solidez, proteção e estabilidade, atributos essenciais para quem administra patrimônios de médio porte e precisa tomar decisões com responsabilidade e clareza.',
      'Dentro dessa construção, o monograma revela três letras E em perspectiva, formando a tríade que sustenta o posicionamento da marca: Excelência no padrão de atendimento e entrega, Eficiência na resolução das demandas com agilidade e precisão, e Ética como base permanente de transparência e confiança na gestão.',
    ],
    manual: [
      'O sistema visual foi definido para garantir consistência e valor percebido em todos os pontos de contato. A paleta Gold & Black foi escolhida para reforçar autoridade e sofisticação, criando um contraste premium que diferencia a Excellent Soluções da comunicação tradicional do segmento.',
      'A tipografia institucional segue uma linha moderna, equilibrada e sem serifa, favorecendo clareza de leitura e presença profissional. A hierarquia entre títulos, subtítulos e textos de apoio foi organizada para manter ritmo visual e coerência, tanto em peças digitais quanto em materiais impressos.',
      'No uso da marca, foram estabelecidas regras de proporção, área de respiro e aplicação em fundos claros e escuros para preservar legibilidade e impacto. O tom verbal acompanha esse padrão: objetivo, seguro e técnico, sempre orientado a transmitir confiança, competência e previsibilidade.',
    ],
    aplicacoes: [
      'A identidade foi pensada para performar com consistência no ambiente digital. Em redes sociais, especialmente no Instagram, a combinação entre símbolo e tipografia garante leitura rápida e reconhecimento imediato em feed, stories, anúncios e conteúdos de rotina.',
      'Em escalas reduzidas, como avatares e miniaturas, a estrutura geométrica preserva integridade e evita perda de força visual. Isso permite que a marca mantenha presença premium mesmo quando aplicada em espaços limitados, sem comprometer clareza ou diferenciação.',
      'Nas frentes comerciais e institucionais, o sistema se desdobra em templates de apresentação, proposta e materiais recorrentes de comunicação. O resultado é uma linguagem única, contínua e profissional, que sustenta a mesma percepção de valor em todos os canais.',
    ],
    mockups: [
      'Os mockups desta etapa demonstram a identidade aplicada em cenários reais de operação da Excellent Soluções, com foco em percepção, clareza e coerência. Foram simuladas situações de uso em social media, comunicação institucional e materiais comerciais para validar comportamento visual em diferentes contextos.',
      'Também foram desenvolvidos exemplos para proposta comercial, apresentação corporativa e peças de relacionamento com síndicos e moradores. Em todos os casos, a construção visual reforça autoridade, organização e padrão premium, sem perder objetividade na mensagem.',
      'Por fim, os testes em pequena escala confirmam a robustez técnica do sistema. Mesmo em formatos compactos, o símbolo mantém reconhecimento e a assinatura preserva legibilidade, garantindo consistência da marca do primeiro contato até os pontos mais operacionais da comunicação.',
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
