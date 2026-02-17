import excellenceCover from '@/assets/excellent/excellence12 copiar.webp';
import overviewCover from '@/assets/excellent/imagemcapa.webp';

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
  overviewCoverImage?: string;
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
    overviewCoverImage: overviewCover,
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
      'Diretrizes de Identidade: O Sistema Visual Excellent',
      'Um sistema de identidade visual só é eficiente quando preserva sua integridade em qualquer ponto de contato. Esta seção detalha as diretrizes técnicas que garantem que a Excellent Soluções seja reconhecida com a mesma força e clareza, seja em um pequeno ícone digital ou em uma grande sinalização física.',
      'O Universo Cromático (Psicologia e Valor)',
      'A paleta de cores foi selecionada para evocar um sentimento de exclusividade e rigor administrativo.',
      'Dourado Solaris (Primária): mais do que uma cor de prestígio, o dourado representa o "Padrão de Ouro" de atendimento. É a cor da clareza e da transparência. No contexto da sindicância, ela simboliza a luz que a Excellent traz para a gestão financeira e operacional do condomínio.',
      'Uso: destaques, ícones e elementos de valor.',
      'Preto Absoluto (Institucional): representa a soberania, a lei e a autoridade máxima. O preto confere o peso necessário para uma marca que lida com o Código Civil e a responsabilidade sobre o patrimônio alheio.',
      'Uso: fundos, tipografia principal e superfícies que exigem sobriedade.',
      'Tipografia Estratégica (A Voz da Marca)',
      'A escolha tipográfica reflete a personalidade da marca: direta, moderna e inabalável.',
      'Fonte Principal (Logotipo): uma família Sans-Serif (sem serifa) de proporções geométricas. Sua construção sólida comunica objetividade, na Excellent, as soluções são baseadas em dados e fatos, sem ambiguidades.',
      'Hierarquia e Respiro: o uso de caixa alta (uppercase) para o nome principal impõe respeito, enquanto o espaçamento expandido (tracking) na palavra "Soluções" traz um respiro de elegância, sugerindo que, apesar do rigor, a empresa possui um atendimento sofisticado e atento aos detalhes.',
      'Integridade e Escala (Proteção Visual)',
      'Para que a percepção de autoridade não seja diluída, a marca deve respeitar critérios técnicos de aplicação.',
      'Área de Proteção: foi definido um perímetro de segurança ao redor do logo, livre de qualquer outro elemento gráfico ou texto. Isso garante que a marca "respire" e mantenha seu impacto visual, impedindo que ruídos externos comprometam sua leitura.',
      'Redução e Legibilidade: o símbolo foi otimizado para manter a clareza mesmo em escalas reduzidas. As linhas dos "prédios" possuem espessura calculada para não "fecharem" em aplicações pequenas, garantindo que a identidade seja impecável desde um cartão de visitas até um outdoor.',
      'Versatilidade de Aplicação',
      'A marca Excellent foi projetada para um mundo multicanal.',
      'Versão Positiva: máximo contraste sobre fundos escuros.',
      'Versão Monocromática: para aplicações em carimbos, documentos oficiais e gravações em metal ou baixo-relevo, mantendo a força da silhueta mesmo sem o auxílio das cores.',
    ],
    aplicacoes: [
      'A identidade foi pensada para performar com consistência no ambiente digital. Em redes sociais, especialmente no Instagram, a combinação entre símbolo e tipografia garante leitura rápida e reconhecimento imediato em feed, stories, anúncios e conteúdos de rotina.',
      'Em escalas reduzidas, como avatares e miniaturas, a estrutura geométrica preserva integridade e evita perda de força visual. Isso permite que a marca mantenha presença premium mesmo quando aplicada em espaços limitados, sem comprometer clareza ou diferenciação.',
      'Nas frentes comerciais e institucionais, o sistema se desdobra em templates de apresentação, proposta e materiais recorrentes de comunicação. O resultado é uma linguagem única, contínua e profissional, que sustenta a mesma percepção de valor em todos os canais.',
    ],
    mockups: [
      'Tangibilizando a Excelência: A Presença da Marca em Todos os Pontos de Contato',
      'Uma identidade visual só é plena quando se manifesta no mundo real. Através desses mockups, apresentamos como a Excellent Soluções se posiciona diante de seus clientes e parceiros: com clareza, solidez e um profissionalismo que não deixa margem para dúvidas.',
      'A Consistência como Estratégia de Confiança',
      'O design da marca foi desenvolvido para ser resiliente e adaptável. Seja no toque de um cartão de visita premium ou na agilidade de uma interface digital, a experiência visual permanece íntegra.',
      'Unidade Visual: do papel timbrado às assinaturas digitais, cada elemento reforça a autoridade da empresa no setor de soluções integradas.',
      'Minimalismo Funcional: a estética limpa não é apenas uma escolha visual, mas um reflexo da eficiência e da transparência que a Excellent entrega em seus serviços.',
      'Projeção de Valor: o uso estratégico do azul profundo comunica estabilidade, enquanto a tipografia moderna garante que a marca esteja pronta para os desafios do mercado contemporâneo.',
      'Não é apenas sobre estética; é sobre criar uma percepção de valor que precede o primeiro aperto de mão.',
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




