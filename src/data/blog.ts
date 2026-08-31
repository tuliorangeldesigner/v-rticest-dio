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
  faqs?: { question: string; answer: string }[];
  serviceLinks?: { label: string; to: string }[];
}


const author = {
  name: 'TR Designer',
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
  {
    id: 'quanto-custa-criar-site-profissional', title: 'Quanto Custa Criar um Site Profissional?', category: 'SITES', author, date: '26 de junho de 2026', readTime: '6 min de leitura', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'Entenda o que realmente define o investimento em um site profissional e como comparar propostas com critério.',
    content: ['O custo de um site profissional não depende apenas de quantas páginas ele terá. Estratégia, arquitetura de informação, conteúdo, design, desenvolvimento e integrações mudam o escopo e o resultado final.', 'Comparar somente o menor preço costuma esconder diferenças importantes: quem pensa a jornada, quem organiza a mensagem e quem entrega uma base que a empresa consegue usar para gerar negócio.', 'Antes de pedir uma proposta, defina objetivo, público, serviços prioritários e o próximo passo desejado. Um diagnóstico bem feito evita contratar uma vitrine bonita que não ajuda o comercial.'],
    serviceLinks: [{ label: 'Criação de sites profissionais', to: '/servicos/criacao-de-sites' }], faqs: [{ question: 'O que muda o valor de um site?', answer: 'Escopo, quantidade de páginas, estratégia, conteúdo, integrações e complexidade de desenvolvimento.' }, { question: 'Vale escolher apenas pelo menor orçamento?', answer: 'Não. Compare processo, entregáveis, clareza estratégica e suporte ao objetivo comercial.' }],
  },
  {
    id: 'site-institucional-ou-landing-page', title: 'Site Institucional ou Landing Page: Qual Escolher?', category: 'SITES', author, date: '26 de junho de 2026', readTime: '5 min de leitura', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'A escolha certa depende da intenção do visitante e do objetivo comercial da empresa.',
    content: ['O site institucional apresenta a empresa, seus serviços, repertório e formas de contato. Ele é a base para quem precisa construir presença, confiança e diferentes portas de entrada orgânicas.', 'A landing page concentra uma oferta e uma ação: captar leads, agendar, vender ou lançar algo. Ela reduz caminhos paralelos para conduzir uma decisão específica.', 'Muitas empresas precisam dos dois formatos. O site sustenta autoridade e a landing page recebe campanhas ou buscas com intenção muito clara.'],
    serviceLinks: [{ label: 'Criação de sites', to: '/servicos/criacao-de-sites' }, { label: 'Criação de landing pages', to: '/servicos/criacao-de-landing-pages' }], faqs: [{ question: 'Landing page substitui o site?', answer: 'Não necessariamente. Ela atende uma oferta específica; o site atende a presença mais ampla da marca.' }],
  },
  {
    id: 'o-que-uma-landing-page-precisa-ter', title: 'O Que uma Landing Page Precisa Ter Para Converter?', category: 'CONVERSÃO', author, date: '26 de junho de 2026', readTime: '5 min de leitura', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'Clareza de oferta, prova e um próximo passo sem fricção são os elementos que dão função a uma landing page.',
    content: ['Uma landing page eficiente deixa claro, logo no início, o que é oferecido, para quem e qual transformação ou resultado ela busca gerar. Se a pessoa precisa adivinhar, a conversão começa a escapar.', 'Depois da proposta, entram contexto, benefícios, método, provas disponíveis e respostas às objeções. Cada bloco precisa ajudar a próxima decisão, sem criar excesso de informação.', 'O CTA deve apontar para uma ação coerente com a oferta. Formulário, WhatsApp ou agendamento funcionam melhor quando a expectativa do que acontece depois está explícita.'],
    serviceLinks: [{ label: 'Criar uma landing page estratégica', to: '/servicos/criacao-de-landing-pages' }], faqs: [{ question: 'Uma landing page precisa ter muitas seções?', answer: 'Precisa ter as seções necessárias para reduzir dúvidas e conduzir a ação, não volume por si só.' }],
  },
  {
    id: 'quanto-tempo-leva-criar-site', title: 'Quanto Tempo Leva Para Criar um Site?', category: 'SITES', author, date: '26 de junho de 2026', readTime: '4 min de leitura', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'O prazo de um site depende do escopo, da qualidade das decisões iniciais e da velocidade das validações.',
    content: ['Não existe um prazo responsável sem entender o escopo. Um site de uma oferta, um institucional com várias frentes e uma plataforma com integrações têm necessidades diferentes.', 'A fase que mais protege o prazo é o diagnóstico: objetivo, público, páginas, conteúdo e referências são alinhados antes da produção. Isso reduz retrabalho e decisões tardias.', 'Também importa a participação da empresa. Materiais, aprovações e retornos em tempo adequado mantêm a construção fluida e ajudam a preservar qualidade.'],
    serviceLinks: [{ label: 'Planejar a criação do seu site', to: '/servicos/criacao-de-sites' }], faqs: [{ question: 'É possível definir prazo antes do diagnóstico?', answer: 'É possível dar uma estimativa, mas o prazo real precisa considerar escopo e validações.' }],
  },
  {
    id: 'quanto-custa-criar-logo-profissional', title: 'Quanto Custa Criar um Logo Profissional?', category: 'BRANDING', author, date: '26 de junho de 2026', readTime: '5 min de leitura', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'O investimento em um logo acompanha a profundidade estratégica e o sistema visual necessário para o negócio.',
    content: ['Um logo profissional não é apenas um desenho final. O trabalho relevante começa entendendo empresa, público, percepção desejada e onde a marca será aplicada.', 'Propostas diferentes podem incluir níveis distintos de pesquisa, direção criativa, refinamento, arquivos e regras de uso. Por isso, comparar somente o valor final não mostra todo o escopo.', 'O melhor caminho é avaliar se o processo entrega uma marca adequada ao momento da empresa e preparada para seus pontos de contato reais.'],
    serviceLinks: [{ label: 'Criação de logo profissional', to: '/servicos/criacao-de-logo' }], faqs: [{ question: 'Por que um logo profissional custa mais?', answer: 'Porque envolve estratégia, direção, refinamento e entregáveis pensados para aplicação consistente.' }],
  },
  {
    id: 'diferenca-logo-e-identidade-visual', title: 'Logo e Identidade Visual: Qual é a Diferença?', category: 'BRANDING', author, date: '26 de junho de 2026', readTime: '4 min de leitura', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'O logo é um elemento de reconhecimento; a identidade visual é o sistema que faz a marca permanecer coerente.',
    content: ['O logo é o sinal principal de uma marca: nome, símbolo ou assinatura que permite reconhecimento. Ele precisa funcionar em diferentes tamanhos e contextos.', 'A identidade visual amplia esse sinal com tipografia, cores, composições, imagens e regras de aplicação. É ela que impede que cada material pareça pertencer a uma empresa diferente.', 'Quando a empresa precisa ganhar consistência em site, redes e materiais comerciais, pensar apenas no logo costuma ser pouco. O sistema é o que sustenta a percepção no dia a dia.'],
    serviceLinks: [{ label: 'Criação de logo', to: '/servicos/criacao-de-logo' }, { label: 'Criação de identidade visual', to: '/servicos/identidade-visual' }], faqs: [{ question: 'Posso criar logo sem identidade visual?', answer: 'Pode, mas a marca terá menos diretrizes para manter consistência nas aplicações futuras.' }],
  },
  {
    id: 'o-que-inclui-identidade-visual', title: 'O Que Inclui uma Identidade Visual?', category: 'BRANDING', author, date: '26 de junho de 2026', readTime: '5 min de leitura', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'Entenda quais elementos formam uma identidade visual e por que o escopo deve acompanhar o momento da empresa.',
    content: ['Uma identidade visual pode reunir marca, paleta de cores, tipografia, elementos gráficos e diretrizes de aplicação. O conjunto exato depende das necessidades reais do negócio.', 'Não se trata de acumular entregáveis. Uma empresa precisa de um sistema que ajude as pessoas a reconhecer a marca e que seja simples de aplicar nos seus canais mais importantes.', 'O diagnóstico define prioridades: para algumas empresas, a base é a marca e o guia; para outras, é importante desdobrar aplicações para site, apresentações e redes sociais.'],
    serviceLinks: [{ label: 'Criar identidade visual', to: '/servicos/identidade-visual' }], faqs: [{ question: 'Identidade visual inclui manual de marca?', answer: 'O escopo é definido no diagnóstico; diretrizes de aplicação fazem parte de uma identidade consistente.' }],
  },
  {
    id: 'como-escolher-agencia-site-identidade-visual', title: 'Como Escolher uma Agência Para Criar Site e Identidade Visual?', category: 'ESTRATÉGIA', author, date: '26 de junho de 2026', readTime: '6 min de leitura', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80', featured: false,
    excerpt: 'Critérios práticos para escolher um parceiro de site e identidade visual além de portfólio e preço.',
    content: ['Portfólio importa, mas não deve ser o único critério. Observe se as marcas e páginas mostram clareza de proposta, coerência e adequação ao contexto de cada negócio.', 'Pergunte sobre processo: como a agência entende objetivo, público, oferta e critérios de decisão antes de criar? Uma boa resposta mostra método, não apenas gosto visual.', 'Por fim, compare escopo, comunicação e capacidade de implantação. O parceiro ideal ajuda a conectar marca, presença digital e próximo passo comercial.'],
    serviceLinks: [{ label: 'Criar site profissional', to: '/servicos/criacao-de-sites' }, { label: 'Criar identidade visual', to: '/servicos/identidade-visual' }], faqs: [{ question: 'O que avaliar além do portfólio?', answer: 'Processo, clareza de escopo, comunicação, entendimento do negócio e entregáveis aplicáveis.' }],
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








