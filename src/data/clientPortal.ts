import excellenceCover from '@/assets/excellence12.webp';

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
      'O Cenário e o Desafio',
      'Antes de desenhar qualquer forma, o diagnóstico focou na maturidade do negócio e no contexto real do mercado condominial. O principal problema identificado foi a insegurança causada por gestões amadoras, que operam de forma reativa, sem previsibilidade e sem transmitir confiança para conselhos e moradores.',
      'O Reposicionamento',
      'A nova identidade da Excellent Soluções foi estruturada para comunicar exatamente o oposto desse cenário: estabilidade, senioridade e controle. Não buscamos apenas uma estética atual; estabelecemos uma presença de autoridade desde o primeiro contato, reforçando a percepção de uma gestão profissional de alto nível.',
      'Impacto e Resultados Esperados',
      'Em termos estratégicos, o impacto esperado é claro:',
      'Reduzir objeções comerciais: transmitir segurança imediata ao síndico e conselheiros.',
      'Elevar a percepção de valor: justificar um posicionamento premium no mercado.',
      'Patamar de confiança: consolidar a marca como um ativo direto de crescimento.',
    ],
    conceito: [
      'A Arquitetura da Solução',
      'A marca Excellent Soluções não foi apenas desenhada; ela foi construída sobre fundamentos de geometria e narrativa visual. O objetivo foi criar um ícone que funcionasse como um selo de qualidade, reconhecível e imponente.',
      'A Ascensão da Excelência (O Símbolo)',
      'O elemento central utiliza a perspectiva para criar uma sensação de vanguarda e visão de futuro.',
      'O Número "1" Oculto: a estrutura do prédio principal foi milimetricamente ajustada para formar o numeral "1". Esta é uma mensagem subliminar de liderança: a Excellent não é apenas mais uma no mercado, ela é a primeira em performance e a escolha definitiva.',
      'Verticalidade e Resort: as linhas horizontais sugerem os pavimentos de um condomínio de alto padrão, remetendo diretamente ao conceito de "resort" solicitado. Elas comunicam organização, camadas de gestão e transparência.',
      'A Moldura Estrutural (O Equilíbrio Legal)',
      'O quadrado que envolve o símbolo não é apenas um adorno; ele representa o pilar da estabilidade.',
      'O Código Civil: no Direito e na Gestão, o "quadrado" representa os limites da lei e a ética profissional. Ele simboliza que a Excellent opera com rigor dentro das normas, oferecendo segurança jurídica e administrativa para os moradores.',
      'Confinamento da Solução: a moldura serve como uma "âncora" visual, garantindo que a marca tenha força e presença mesmo em aplicações pequenas, como ícones de redes sociais.',
      'Perspectiva e Dinamismo',
      'Diferente das marcas estáticas do mercado, o uso da perspectiva em diagonal imprime uma sensação de movimento e agilidade. Na sindicância profissional, a reatividade é um problema; a Excellent, através de seu design, comunica proatividade. É uma marca que olha para cima e para frente.',
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

