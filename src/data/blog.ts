export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

const author = {
  name: 'Vértice Studio',
  role: 'Estratégia & Posicionamento',
  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80',
};

export const blogPosts: BlogPost[] = [
  {
    id: 'marcas-comuns-brigam-por-preco',
    title: 'Por Que Marcas Que Parecem Comuns Sempre Brigam por Preço',
    excerpt:
      'Quando a percepção é fraca, o mercado negocia. Entenda como posicionamento e ambiente digital determinam autoridade antes mesmo da proposta comercial.',
    content: [
      'Quando a sua marca parece igual a todas as outras, o cliente não tem referência para escolher além de preço. Ele compara "quem faz mais barato", não "quem resolve melhor". Esse é o primeiro sintoma de posicionamento fraco.',
      'Muita empresa confunde esforço com autoridade. Produz conteúdo, faz tráfego, publica todo dia, mas sem direção estratégica. Resultado: mais exposição para a mesma percepção mediana. E quanto maior a exposição sem posicionamento, maior a pressão por desconto.',
      'Percepção de valor nasce da combinação entre mensagem, estética e experiência. Se seu site parece amador, se sua narrativa é genérica e se sua comunicação oscila entre estilos, o mercado interpreta risco. E risco sempre derruba ticket.',
      'Antes de falar de oferta, o cliente já tomou uma decisão emocional sobre o seu nível. Isso acontece em segundos. Feed, página inicial, headline, prova social e clareza de proposta: tudo comunica "premium" ou "comum".',
      'Marcas que cobram melhor não "convencem" no final da reunião. Elas chegam com autoridade construída. A conversa deixa de ser sobre preço e passa a ser sobre prioridade, prazo e capacidade de execução.',
      'Se você quer sair da guerra de preço, pare de tratar presença digital como vitrine. Trate como sistema de percepção. Quem controla percepção controla margem.',
    ],
    category: 'POSICIONAMENTO',
    author,
    date: '11 de fevereiro de 2026',
    readTime: '6 min de leitura',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 'site-nao-converte',
    title: 'Se Seu Site Não Converte, o Problema Pode Não Ser Tráfego',
    excerpt:
      'Entenda como estrutura, percepção e clareza impactam a decisão muito antes do clique.',
    content: [
      'A resposta mais comum para baixa conversão é "precisamos de mais tráfego". Em muitos casos, isso só acelera um problema estrutural. Você coloca mais pessoas em um funil que não conduz decisão.',
      'Sites que não convertem geralmente falham em três pontos: proposta pouco clara, hierarquia fraca de informação e ausência de prova de autoridade. O visitante entra, percorre a página e não entende por que deveria confiar.',
      'Conversão não é botão colorido. É sequência estratégica. Primeiro você organiza contexto, depois cria contraste de valor, em seguida reduz objeções e só então chama para ação. Pular etapas derruba resultado.',
      'Outro erro recorrente: páginas bonitas com copy vazia. Visual sem mensagem estratégica gera atenção, mas não gera decisão. O usuário precisa sentir que você entende o problema dele e tem método para resolver.',
      'Uma forma simples de auditar seu site: em 10 segundos, alguém de fora consegue responder o que você faz, para quem e por que você é diferente? Se não, existe ruído demais e clareza de menos.',
      'Tráfego funciona como amplificador. Se a estrutura está ruim, ele amplifica perda. Se a estrutura está certa, ele amplifica conversão. Corrija a base antes de acelerar.',
    ],
    category: 'CONVERSÃO',
    author,
    date: '08 de fevereiro de 2026',
    readTime: '5 min de leitura',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'percepcao-define-preco',
    title: 'Percepção de Valor: O Fator Invisível Que Define Seu Preço',
    excerpt:
      'Empresas premium não vendem mais porque gritam. Vendem porque são percebidas como referência.',
    content: [
      'Preço é consequência de percepção. Você pode ter o melhor processo técnico do mercado, mas se sua marca comunica insegurança, o cliente não paga premium. Ele paga o que "parece justo" para o nível que percebe.',
      'Esse fator é invisível porque acontece antes da proposta. O cliente já chega com uma âncora mental: "essa empresa parece de alto nível" ou "parece mais do mesmo". A proposta apenas confirma ou contradiz essa impressão inicial.',
      'Percepção de valor é construída por consistência. Identidade visual coerente, tom de voz firme, casos apresentados com contexto e site com narrativa de autoridade. Não é um elemento isolado. É o conjunto.',
      'Empresas que crescem com margem entendem que comunicação não é "divulgação", é posicionamento. Cada ponto de contato precisa reforçar uma mesma mensagem: clareza de direção, domínio técnico e capacidade de execução.',
      'Quando esse sistema está ajustado, o preço deixa de ser barreira principal. O foco da conversa vira risco, previsibilidade e retorno. Em outras palavras: você sai da comparação por custo e entra na comparação por confiança.',
      'Se você quer aumentar ticket com consistência, trabalhe primeiro o que o mercado percebe. O resto vem como efeito.',
    ],
    category: 'POSICIONAMENTO',
    author,
    date: '05 de fevereiro de 2026',
    readTime: '5 min de leitura',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'criativo-engenharia-atencao',
    title: 'Criativo Não é Arte. É Engenharia de Atenção.',
    excerpt:
      'O que realmente diferencia anúncios que performam de anúncios que só "ficam bonitos".',
    content: [
      'Criativo de performance não é sobre gosto pessoal. É sobre comportamento. Ele precisa capturar atenção em segundos, sustentar interesse e direcionar uma ação. Se falhar em uma dessas etapas, o custo sobe.',
      'Muitas campanhas quebram porque tratam criativo como peça final, não como hipótese. Quem escala pensa em blocos: gancho, tensão, promessa, prova e chamada. Cada bloco tem função clara e métrica associada.',
      'Visual bonito sem direção até pode ganhar elogio interno, mas não garante resultado no feed. O algoritmo premia retenção e resposta do público. Isso exige ritmo, clareza e adaptação contínua.',
      'Teste A/B sério não é trocar cor de botão. É testar ângulos de mensagem, formatos de prova, estilos de abertura e intensidade de oferta. Pequenas mudanças na entrada podem gerar grande diferença no CPA.',
      'Outro ponto crítico: consistência entre anúncio e destino. Se o criativo promete uma coisa e a landing entrega outra, a confiança quebra. E sem confiança não existe conversão escalável.',
      'Performance começa na estratégia e termina na otimização. Criativo é o elo entre as duas pontas. Trate como engenharia, não como decoração.',
    ],
    category: 'PERFORMANCE',
    author,
    date: '02 de fevereiro de 2026',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'autoridade-visual-feed',
    title: 'Autoridade Visual: O Que Seu Feed Comunica Antes de Você Falar',
    excerpt:
      'Seu posicionamento já está sendo julgado, mesmo quando você não percebe.',
    content: [
      'Seu feed não é só conteúdo. É ambiente de percepção. Antes de ler uma linha, o público avalia nível de organização, clareza de proposta e consistência estética. Isso define se ele te considera referência ou ruído.',
      'Quando cada postagem parece de uma marca diferente, você perde efeito acumulado. Autoridade visual depende de repetição inteligente: mesma direção estética, mesma lógica de mensagem, mesma intenção estratégica.',
      'Não significa tornar tudo igual. Significa manter um sistema. A diferença entre marca forte e marca comum está em como ela sustenta identidade sem ficar previsível.',
      'Outro erro frequente é publicar só para manter frequência. Volume sem direção enfraquece posicionamento. Melhor menos peças com narrativa clara do que dezenas de posts desconectados.',
      'Pense no feed como vitrine de decisão: ele precisa mostrar padrão, domínio e foco. Quando isso acontece, o cliente chega mais preparado e o ciclo de venda encurta.',
      'Autoridade visual é um ativo silencioso. Quem constrói com consistência colhe confiança em escala.',
    ],
    category: 'PRESENÇA DIGITAL',
    author,
    date: '30 de janeiro de 2026',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'branding-sem-estrategia',
    title: 'Branding Sem Estratégia é Decoração Cara',
    excerpt:
      'Por que identidade visual isolada não sustenta crescimento.',
    content: [
      'Branding sem estratégia vira estética sem direção. Pode ficar bonito, mas não muda posicionamento. E sem posicionamento, o mercado continua te tratando como mais uma opção.',
      'Identidade visual é só uma camada. Se ela não estiver conectada à narrativa comercial, à estrutura do site e à linguagem de performance, o efeito se dissipa rápido.',
      'Muitas empresas investem em logo e paleta, mas não definem mensagem central, promessa de valor e critérios de diferenciação. O resultado é um "rebranding" que não altera percepção real.',
      'Branding eficaz responde perguntas objetivas: qual território você ocupa, que problema lidera, como sustenta prova e por que merece confiança. Design entra para materializar essas respostas.',
      'Quando estratégia e branding caminham juntos, cada peça reforça a mesma tese de valor. Isso reduz ruído, aumenta coerência e facilita decisão.',
      'Se a meta é crescer com margem, branding precisa ser sistema de posicionamento. O resto é custo de imagem.',
    ],
    category: 'PRESENÇA DIGITAL',
    author,
    date: '26 de janeiro de 2026',
    readTime: '5 min de leitura',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'ia-amplifica-estrategia',
    title: 'IA Não Substitui Estratégia. Amplifica Quem Já Tem.',
    excerpt:
      'Como usar inteligência artificial para escalar percepção e não para virar commodity.',
    content: [
      'A IA reduziu custo de execução, mas não resolveu falta de direção. Quem não tem estratégia agora só produz conteúdo ruim em velocidade maior.',
      'Ferramenta não define posicionamento. Ela acelera produção, análise e variação. O que continua humano é a decisão sobre foco de mercado, narrativa e prioridade de negócio.',
      'Empresas que usam IA com maturidade seguem um fluxo claro: hipótese estratégica, produção assistida, validação de métrica e iteração. Sem hipótese, vira volume aleatório.',
      'No criativo, IA ajuda a explorar ângulos e formatos. No conteúdo, ajuda a organizar raciocínio. No operacional, reduz fricção. Mas nada disso substitui visão estratégica.',
      'O risco de virar commodity aumenta quando todo mundo publica o mesmo "conteúdo de ferramenta". O diferencial volta a ser interpretação: quem lê padrões, conecta contexto e transforma dado em decisão.',
      'Use IA para escalar consistência e qualidade. Não para terceirizar pensamento.',
    ],
    category: 'PERFORMANCE',
    author,
    date: '22 de janeiro de 2026',
    readTime: '5 min de leitura',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const getRelatedPosts = (currentId: string, category: string): BlogPost[] => {
  return blogPosts
    .filter((post) => post.id !== currentId && post.category === category)
    .slice(0, 2);
};







