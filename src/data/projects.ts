export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  heroImage: string;
  heroVideo?: string;
  thumbnail: string;
  thumbnailVideo?: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  gallery: string[];
  videos?: string[];
  nextProject: string;
  prevProject: string;
  keyTakeaways?: string;
  focus?: string;
  projectUrl?: string;
}

import gwapo1 from '@/assets/gwapo1.webp';
import gwapo2 from '@/assets/gwapo2.webp';
import gwapo3 from '@/assets/gwapo3.webp';
import gwapo4 from '@/assets/gwapo4.webp';
import rocha1 from '@/assets/rocha1.webp';
import rocha2 from '@/assets/rocha2.webp';
import rocha3 from '@/assets/rocha3.webp';
import rocha4 from '@/assets/rocha4.webp';
import beach1 from '@/assets/beach1.webp';
import beach2 from '@/assets/beach2.webp';
import beach3 from '@/assets/beach3.webp';
import beach4 from '@/assets/beach4.webp';
import sumitomo1 from '@/assets/sumitomo1.webp';
import sumitomo2 from '@/assets/sumitomo2.webp';
import sumitomo3 from '@/assets/sumitomo3.webp';
import sumitomo4 from '@/assets/sumitomo4.webp';
import excellentCover from '@/assets/excellent/excellence12 copiar.webp';
import excellentMockupOne from '@/assets/excellent/1 copiar.webp';
import excellentMockupTwo from '@/assets/excellent/13 copiar.webp';
import excellentCardCover from '@/assets/excellent/1 copiar 23.webp';
import excellentThirdGallery from '@/assets/excellent/1 copiar 2.webp';
import webCapa1 from '@/assets/webcapa1.webp';
import webImage from '@/assets/web.webp';
import webImage2 from '@/assets/web2.webp';
import webImage3 from '@/assets/web3.webp';
import webImage4 from '@/assets/web4.webp';
import orbitsCover from '@/assets/orbits.webp';
import orbitsGalleryOne from '@/assets/orbits1.webp';
import orbitsGalleryTwo from '@/assets/orbits2.webp';
import orbitsGalleryThree from '@/assets/orbits3.webp';

export const projects: Project[] = [
  {
    id: 'luminary',
    title: 'GWAPO',
    category: 'Reprogramação de Marca',
    year: '2024',
    client: 'Luminary Tech',
    heroImage: gwapo1,
    thumbnail: gwapo1,
    description: 'Reposicionamento completo de identidade para uma empresa que precisava sair da categoria "mais uma no mercado" e assumir postura premium. Estruturação visual, direção estética estratégica e coerência de presença digital.',
    challenge: 'A marca precisava comunicar inovação em energia renovável sem perder proximidade com o público. A identidade antiga enfraquecia a percepção de autoridade e não refletia o nível tecnológico da operação.',
    solution: 'Criamos um sistema de marca completo com linguagem visual orientada a posicionamento premium. Refinamos tipografia, paleta, símbolo e aplicações para garantir consistência em todos os pontos de contato digitais e institucionais.',
    results: [
      '340% aumento de reconhecimento de marca',
      '85% percepção positiva em pesquisa',
      'Destaque em premiação de design',
      'R$ 2,4M captados após o reposicionamento',
    ],
    services: ['Estratégia de Marca', 'Identidade Visual', 'Design de Logotipo', 'Guia de Marca', 'Materiais Institucionais'],
    gallery: [gwapo2, gwapo3, gwapo4],
    nextProject: 'ethereal',
    prevProject: 'elektra',
    keyTakeaways: 'Quando a marca traduz inovação com clareza e estética coerente, o mercado percebe valor antes da proposta comercial.',
    focus: 'Reposicionamento',
  },
  {
    id: 'ethereal',
    title: 'Car Web',
    category: 'Posts de Alta Conversão no Instagram',
    year: '2024',
    client: 'Car Web',
    heroImage: sumitomo1,
    thumbnail: sumitomo1,
    description: 'Estruturamos um sistema de posts de alta conversão para Instagram, com criativos que chamam atenção nos primeiros segundos e conduzem o público para ação imediata.',
    challenge: 'A marca publicava com frequência, mas o conteúdo não gerava leads consistentes. Faltava uma linha de copy persuasiva, narrativa estratégica e chamada comercial clara.',
    solution: 'Criamos uma operação de conteúdo com ganchos fortes, provas de valor e CTAs orientados para direct e orçamento. Cada post foi desenhado para transformar alcance em conversa e conversa em venda.',
    results: [
      '3,8x mais conversas comerciais no direct',
      '69% aumento no engajamento qualificado',
      '54% crescimento de pedidos de orçamento pelo Instagram',
      'Mais previsibilidade de vendas com calendário estratégico',
    ],
    services: ['Estratégia de Conteúdo', 'Criativos para Instagram', 'Copy Persuasiva', 'Direção de Arte', 'Planejamento de Conversão'],
    gallery: [sumitomo2, sumitomo3, sumitomo4],
    nextProject: 'zenith',
    prevProject: 'luminary',
    keyTakeaways: 'Post de alta conversão não depende de sorte: depende de mensagem certa, criativo certo e CTA certo, no momento certo.',
    focus: 'Conversão',
  },
  {
    id: 'zenith',
    title: 'Beach Tennis',
    category: 'Criativos para Instagram',
    year: '2023',
    client: 'Beach Tennis Club',
    heroImage: beach4,
    thumbnail: beach4,
    description: 'Criamos um sistema de criativos para Instagram que transformou presença em desejo e desejo em ação. Conteúdo com direção estratégica, identidade forte e foco total em conversão.',
    challenge: 'O perfil tinha boa estrutura, mas os posts não prendiam atenção e não geravam volume consistente de mensagens no direct. A marca precisava parar de postar por obrigação e começar a vender por estratégia.',
    solution: 'Desenvolvemos criativos com ganchos visuais de alto impacto, narrativas curtas e CTAs diretos para levar o público do scroll ao direct. Cada peça foi pensada para autoridade, retenção e resposta comercial.',
    results: [
      '4,1x mais mensagens no direct em 60 dias',
      '73% aumento no engajamento médio por publicação',
      '58% crescimento de leads qualificados via Instagram',
      'Agenda de aulas e turmas preenchida com mais previsibilidade',
    ],
    services: ['Estratégia de Conteúdo', 'Direção Criativa', 'Criativos para Instagram', 'Copy Persuasiva', 'Planejamento de Conversão'],
    gallery: [beach1, beach2, beach3],
    nextProject: 'cascade',
    prevProject: 'ethereal',
    keyTakeaways: 'No Instagram, quem domina atenção com clareza e posicionamento forte vende mais sem depender de promoção o tempo todo.',
    focus: 'Performance',
  },
  {
    id: 'cascade',
    title: 'Rocha Obras',
    category: 'Reestruturação de Identidade Visual',
    year: '2023',
    client: 'Rocha Obras',
    heroImage: rocha1,
    thumbnail: rocha1,
    description: 'Reestruturamos toda a identidade visual da Rocha Obras para transformar percepção de mercado em confiança imediata. A marca deixou de parecer comum e passou a comunicar padrão premium em cada contato.',
    challenge: 'A empresa entregava obras de alto nível, mas a comunicação visual transmitia pouco valor. Isso atraía negociações por preço e enfraquecia a autoridade comercial.',
    solution: 'Criamos uma nova base visual com posicionamento claro, direção estética consistente e aplicações estratégicas para digital e institucional. O resultado foi uma presença forte, profissional e preparada para converter mais e melhor.',
    results: [
      '62% aumento em pedidos de orçamento qualificados',
      '47% crescimento na taxa de resposta comercial',
      'Percepção de marca premium consolidada no mercado local',
      'Ciclo de venda encurtado com menos objeções por preço',
    ],
    services: ['Estratégia de Marca', 'Reestruturação Visual', 'Identidade Visual', 'Direção de Arte', 'Aplicações Digitais'],
    gallery: [rocha2, rocha3, rocha4],
    nextProject: 'edicao-de-video',
    prevProject: 'zenith',
    keyTakeaways: 'Quando a identidade visual comunica valor antes da proposta, a negociação muda de preço para confiança e decisão.',
    focus: 'Reposicionamento',
  },
  {
    id: 'edicao-de-video',
    title: 'Edição de Vídeo e Motion',
    category: 'Motion Design e Edição Estratégica',
    year: '2022-2026',
    client: 'Clientes Diversos',
    heroImage: '/coveredicao.webp',
    thumbnail: '/coveredicao.webp',
    description: 'Esta seção reúne projetos de motion design e edição de vídeo para clientes de diferentes nichos. Cada criativo foi construído para prender atenção nos primeiros segundos, elevar percepção de valor e transformar visualização em ação.',
    challenge: 'No feed, criativos comuns são ignorados em segundos. O desafio é comunicar autoridade, proposta e oferta com clareza visual, ritmo certo e narrativa estratégica para gerar resposta comercial.',
    solution: 'Estruturamos roteiros curtos, direção de motion, cortes orientados à retenção e finalizações com CTA. O resultado é um sistema de criativos animados profissionais, com consistência de marca e foco real em conversão.',
    results: [
      '3x mais retenção nos primeiros 3 segundos',
      '67% aumento de respostas em campanhas com vídeo',
      '52% crescimento de cliques em chamadas para ação',
      'Mais percepção de autoridade e valor da marca',
    ],
    services: ['Motion Design', 'Edição de Vídeo', 'Roteiro de Conversão', 'Direção Criativa', 'Finalização para Social'],
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2187d80a0003?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80',
    ],
    videos: [
      '1166195302',
      '1166195390',
      '1166195605',
      '1166195792',
      '1166196052',
      '1166196455',
      '1166197011',
      '1166197065',
      '1166197489',
      '1166197651',
      '1166197763',
      '1166197885',
      '1166197945',
      '1166198077',
      '1166198223',
      '1166198312',
      '1166198407',
      '1166198490',
      '1166198593',
      '1166198691',
      '1166198890',
      '1166198976',
      '1166199160',
      '1166199440',
      '1166199579',
      '1166199883',
      '1166200027',
      '1166200168',
      '1166200359',
      '1166200624',
      '1166200774',
      '1166200862',
      '1166201032',
      '1166201092',
      '1166201178',
      '1166201272',
      '1166201394',
      '1166201484',
    ],
    nextProject: 'excellent-solucoes',
    prevProject: 'cascade',
    keyTakeaways: 'Vídeo bom não é só bonito: é estratégia em movimento. Quando animação, mensagem e CTA trabalham juntos, a conversão acontece.',
    focus: 'Conversão',
  },
  {
    id: 'excellent-solucoes',
    title: 'Excellent Soluções',
    category: 'Reposicionamento de Marca Premium',
    year: '2026',
    client: 'Excellent Soluções',
    heroImage: excellentCover,
    thumbnail: excellentCardCover,
    description: 'Proposta de identidade visual criada para reposicionar a marca com autoridade, solidez e modernidade no mercado condominial, elevando a percepção de valor desde o primeiro contato.',
    challenge: 'O diagnóstico revelou uma dor central do segmento: insegurança gerada por gestões amadoras, reativas e sem previsibilidade. Mesmo com operação madura, a marca ainda não comunicava senioridade, controle e confiabilidade na intensidade necessária para reduzir objeções comerciais.',
    solution: 'Desenvolvemos uma arquitetura visual estratégica baseada em geometria, narrativa e contraste premium. O símbolo foi construído para traduzir estabilidade e liderança, enquanto o sistema tipográfico e cromático reforça clareza, rigor e presença institucional em todos os pontos de contato.',
    results: [
      'Autoridade percebida desde o primeiro contato',
      'Redução de objeções por insegurança na proposta',
      'Posicionamento premium mais consistente no mercado',
      'Maior clareza de valor para síndicos e conselhos',
    ],
    services: ['Estratégia de Marca', 'Reposicionamento', 'Identidade Visual', 'Direção Criativa', 'Aplicações de Marca'],
    gallery: [excellentMockupOne, excellentMockupTwo, excellentThirdGallery],
    nextProject: 'orbits',
    prevProject: 'edicao-de-video',
    keyTakeaways: 'Quando a identidade visual comunica estabilidade e liderança com precisão, a marca deixa de disputar preço e passa a disputar confiança.',
    focus: 'Reposicionamento',
  },
  {
    id: 'orbits',
    title: 'Orbits',
    category: 'Site de Game',
    year: '2026',
    client: 'Orbits Game',
    heroImage: orbitsCover,
    thumbnail: orbitsCover,
    description: 'Site do game Orbits desenvolvido para apresentar o universo do jogo com impacto visual, narrativa clara e fluxo pensado para transformar curiosidade em comunidade ativa.',
    challenge: 'O projeto precisava comunicar atmosfera, diferencial e proposta do game logo no primeiro contato, sem criar uma página pesada ou confusa para quem chega por campanhas e redes sociais.',
    solution: 'Construímos uma landing page com hierarquia visual forte, blocos de conteúdo objetivos e direção criativa alinhada ao universo do jogo, equilibrando estética, performance e clareza de mensagem.',
    results: [
      'Apresentação do game com identidade própria e memorável',
      'Mensagem principal mais clara para novos visitantes',
      'Estrutura pronta para lançamentos, atualizações e campanhas',
      'Experiência de navegação mais envolvente e orientada para ação',
    ],
    services: ['Web Design', 'Landing Page', 'Direção Criativa', 'UX/UI', 'Copy Estratégica'],
    gallery: [orbitsGalleryOne, orbitsGalleryTwo, orbitsGalleryThree],
    nextProject: 'elektra',
    prevProject: 'excellent-solucoes',
    keyTakeaways: 'Quando o site de um game combina atmosfera com clareza de proposta, a marca cria conexão mais rápida e converte interesse em comunidade.',
    focus: 'Experiência',
    projectUrl: 'https://orbitsone.netlify.app/',
  },
  {
    id: 'elektra',
    title: 'Elektra',
    category: 'Landing Page • Site',
    year: '2026',
    client: 'K30 E-Bike',
    heroImage: webCapa1,
    thumbnail: webCapa1,
    description: 'Landing page/site da Elektra para a bike elétrica K30, construída para valorizar produto, destacar diferenciais e conduzir o visitante para ação.',
    challenge: 'A marca precisava comunicar tecnologia, design e performance da K30 com clareza, sem cair em apresentação genérica e sem perder foco em conversão.',
    solution: 'Desenvolvemos uma estrutura com narrativa objetiva, seções de prova, hierarquia visual forte e fluxo orientado para transformar interesse em clique e contato.',
    results: [
      'Percepção de produto premium reforçada',
      'Mensagem da K30 mais clara para novos visitantes',
      'Base pronta para campanhas de tráfego e vendas',
      'Experiência mais fluida da descoberta à decisão',
    ],
    services: ['Landing Page', 'Web Design', 'UX/UI', 'Copy Estratégica', 'Otimização de Conversão'],
    gallery: [webImage, webImage2, webImage3, webImage4],
    nextProject: 'luminary',
    prevProject: 'orbits',
    keyTakeaways: 'Uma landing page forte organiza narrativa, prova e CTA para acelerar decisão de compra sem depender só de desconto.',
    focus: 'Conversão',
    projectUrl: 'https://elektraebike.netlify.app/',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  const normalizedId =
    id === 'nexus'
      ? 'edicao-de-video'
      : id === 'apex'
        ? 'excellent-solucoes'
        : id;
  return projects.find((p) => p.id === normalizedId);
};

export const getProjectIndex = (id: string): number => {
  return projects.findIndex((p) => p.id === id);
};
