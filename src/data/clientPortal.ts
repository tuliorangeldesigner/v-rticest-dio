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
    projectName: 'Proposta de Identidade Visual • Reposicionamento de Marca e Sistema de Presença Premium',
    coverImage: excellenceCover,
    overviewCoverImage: overviewCover,
    status: 'Em andamento',
    updatedAt: '18 de fevereiro de 2026',
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
      'O Universo Cromático (Especificações Técnicas)',
      'A paleta de cores foi selecionada para evocar um sentimento de exclusividade, rigor administrativo e modernidade.',
      'Dourado Solaris (Primária - #fdb51f): Mais do que uma cor de prestígio, este tom representa o "Padrão de Ouro" de atendimento. É a cor da clareza e da transparência.',
      'Laranja Ativo (Apoio - #fd9900): Utilizado para trazer energia e destaque a elementos de conversão e pontos de contato dinâmicos.',
      'Preto Profundo (#1c1c1c): Representa a soberania e a autoridade máxima. Confere o peso necessário para uma marca que lida com responsabilidade e patrimônio.',
      'Cinza de Contraste (#ededed): Utilizado para garantir legibilidade e respiro em fundos e aplicações secundárias, mantendo o equilíbrio visual.',
      'Tipografia Estratégica (A Voz da Marca)',
      'A escolha tipográfica reflete a personalidade da marca: direta, robusta e inabalável.',
      'Fonte Principal: Raleway - Extra Bold',
      'Sua construção geométrica e peso sólido comunicam objetividade. Na Excellent, as soluções são baseadas em dados e fatos.',
      'Ajuste Fino: Utilizamos um espaçamento entre letras de 200 para garantir uma leitura impactante e moderna.',
      'Fonte de Apoio: Abacaxi Latin VF - Medium',
      'Utilizada para sublinhar a sofisticação da marca.',
      'Elegância e Respiro: Com um espaçamento entre letras (tracking) expandido de 400, esta fonte traz um ar de exclusividade e atenção aos detalhes, equilibrando a força da tipografia principal.',
      'Integridade e Escala (Proteção Visual)',
      'Para que a percepção de autoridade não seja diluída, a marca respeita critérios técnicos rigorosos:',
      'Área de Proteção: Definimos um perímetro de segurança ao redor do logo, garantindo que a marca "respire" e mantenha seu impacto visual.',
      'Versatilidade e Arquitetura da Marca',
      'Para garantir uma comunicação consistente em diferentes contextos e suportes, a marca Excellent foi projetada em um sistema modular, permitindo o uso de suas partes de forma independente sem perder a identidade.',
      'Configuração Monocromática (Alto Contraste):',
      'Versão Positiva (Preta): Destinada a aplicações em fundos claros, carimbos oficiais e documentos que exigem sobriedade absoluta.',
      'Versão Negativa (Branca): Desenvolvida para máxima legibilidade sobre fundos escuros ou imagens, mantendo a integridade da silhueta.',
      'O Ícone (Símbolo Isolado):',
      'O símbolo da torre, com sua geometria calculada, pode ser utilizado de forma independente em contextos onde a marca já foi estabelecida, como em favicons, perfis de redes sociais ou como elemento de design em marca d’água.',
      'Logotipo (Tipografia Isolada):',
      'Em situações de espaço vertical limitado (como canetas ou réguas de rodapé), a combinação das fontes Raleway Extra Bold e Abacaxi Latin pode ser aplicada sem o ícone, sustentando a autoridade da marca através de sua força tipográfica única.',
      'Redução e Legibilidade',
      'Independentemente da versão utilizada (completa, apenas ícone ou apenas texto), as linhas e os espaçamentos (Tracking 200/400) foram calibrados para que a marca permaneça impecável desde um pequeno selo de segurança até grandes empenas de edifícios.',
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
  {
    slug: 'lexs-company',
    clientName: 'Lexs Company',
    projectName: 'Conceito e Direção de Identidade Visual',
    status: 'Em andamento',
    updatedAt: '11 de março de 2026',
    overview: [
      'A identidade visual da Lexs Company foi concebida para materializar uma marca com ambição de crescimento, presença de mercado e percepção de autoridade.',
      'Mais do que um exercício estético, este projeto nasce como uma construção estratégica: uma identidade criada para posicionar a Lexs Company como uma empresa capaz de unir estrutura, direção e performance em uma proposta visual sólida, contemporânea e memorável.',
      'Em um mercado onde muitas marcas disputam atenção apenas pelo impacto superficial, a Lexs Company precisava se apresentar de forma diferente: com uma linguagem visual que transmitisse credibilidade, clareza, força e expansão.',
      'A síntese dessa visão é objetiva: transformar estratégia em resultado real.',
    ],
    conceito: [
      'Arquitetura do Símbolo',
      'O monograma LX é o principal ativo visual da marca e sintetiza, em sua construção, os fundamentos do posicionamento da Lexs Company.',
      'Sua forma foi desenhada a partir de uma lógica geométrica precisa, criando um símbolo de presença forte, leitura imediata e alta capacidade de reconhecimento.',
      'O L se apresenta como base: um elemento de sustentação, direção e fundamento.',
      'O X amplia a narrativa da marca ao introduzir a ideia de conexão, multiplicação e expansão.',
      'O encontro entre essas formas comunica, de maneira silenciosa e poderosa, aquilo que a Lexs entrega ao mercado: crescimento com estrutura, resultado com inteligência e expansão com direção.',
      'A geometria do símbolo reforça um aspecto essencial da marca: parecer sólida sem se tornar rígida, e contemporânea sem perder força institucional.',
      'Onde estratégia vira resultado.',
    ],
    manual: [
      'Linguagem Formal e Geometria',
      'A construção visual da marca parte de uma linguagem geométrica limpa, objetiva e intencional.',
      'Formas bem definidas, recortes firmes e equilíbrio estrutural contribuem para uma percepção de marca mais segura, profissional e escalável.',
      'Nesse contexto, a geometria comunica método, organização e precisão, atributos conectados diretamente à proposta de valor da Lexs Company.',
      'Tipografia',
      'A escolha tipográfica acompanha a lógica central do projeto: clareza, contemporaneidade e autoridade.',
      'A tipografia de apoio apresenta desenho limpo, proporções equilibradas e excelente legibilidade, reforçando uma comunicação direta e profissional.',
      'Lexs ganha protagonismo com presença e firmeza, enquanto Company amplia o caráter institucional da assinatura e reforça a ideia de estrutura empresarial.',
      'Sistema Cromático',
      'A paleta foi definida para equilibrar energia, distinção e autoridade.',
      'O tom amarelo-alaranjado atua como vetor de visibilidade e expansão, trazendo dinamismo e protagonismo comercial.',
      'O preto assume o papel de ancoragem institucional, comunicando solidez, elegância, confiança e autoridade.',
      'A combinação constrói um território visual eficiente: uma marca forte, memorável, comercial e premium.',
    ],
    aplicacoes: [
      'Flexibilidade e Consistência do Sistema',
      'A identidade da Lexs Company foi pensada como um sistema de marca, e não como uma assinatura isolada.',
      'As composições visuais desenvolvidas permitem adaptação com consistência em múltiplos contextos, do avatar digital à assinatura institucional, do cabeçalho do site à comunicação em redes sociais.',
      'A existência de versões alternativas de disposição, redução e contraste demonstra maturidade de construção e visão estratégica de longo prazo.',
      'Essa versatilidade garante continuidade visual, fortalece lembrança de marca e sustenta percepção profissional em todos os canais.',
      'Percepção de Marca',
      'A Lexs Company passa a ocupar um território visual marcado por cinco atributos centrais: estrutura, resultado, clareza, força e expansão.',
      'Visualmente, é uma marca com presença. Conceitualmente, é uma marca com direção. Estrategicamente, é uma marca preparada para se diferenciar.',
      'Síntese Conceitual',
      'A nova identidade traduz, em linguagem de marca, crescimento estruturado, resultado orientado e posicionamento sólido.',
    ],
    mockups: [
      'Mockups em preparação.',
      'Assim que você enviar as imagens, eu integro nesta seção para apresentar as aplicações finais da marca Lexs Company no portal.',
    ],
    downloads: [],
  },
];

export const getClientPortalBySlug = (slug: string): ClientPortal | undefined => {
  return clientPortals.find((portal) => portal.slug === slug);
};




