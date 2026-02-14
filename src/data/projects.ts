export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  heroImage: string;
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  gallery: string[];
  nextProject: string;
  prevProject: string;
  keyTakeaways?: string;
  focus?: string;
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
    prevProject: 'apex',
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
    nextProject: 'nexus',
    prevProject: 'zenith',
    keyTakeaways: 'Quando a identidade visual comunica valor antes da proposta, a negociação muda de preço para confiança e decisão.',
    focus: 'Reposicionamento',
  },
  {
    id: 'nexus',
    title: 'Nexus',
    category: 'Presença Digital Integrada',
    year: '2022',
    client: 'Nexus Health',
    heroImage: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80',
    description: 'Integração entre identidade, ambiente web e narrativa estratégica. Coerência visual e aumento de autoridade percebida.',
    challenge: 'A comunicação estava fragmentada entre canais, gerando ruído de posicionamento e queda de confiança na jornada digital do usuário.',
    solution: 'Unificamos identidade, linguagem e experiência em um ecossistema coeso. A operação digital passou a comunicar a mesma promessa em todos os pontos de contato.',
    results: [
      '30% redução em faltas de agendamento',
      '92% índice de satisfação dos pacientes',
      '15K usuários ativos mensais em 6 meses',
      'Prêmio de melhor design em health app',
    ],
    services: ['Design de App', 'Pesquisa', 'Design de Interação', 'Identidade Visual', 'Testes de Usabilidade'],
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2187d80a0003?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'apex',
    prevProject: 'cascade',
    keyTakeaways: 'Autoridade digital depende de consistência. Quando marca, UX e mensagem falam a mesma língua, a confiança cresce.',
    focus: 'Autoridade',
  },
  {
    id: 'apex',
    title: 'Apex',
    category: 'Interface de Alta Performance',
    year: '2023',
    client: 'Apex Capital',
    heroImage: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=80',
    description: 'Desenvolvimento de dashboard com foco em clareza visual, leitura de dados e impacto estratégico. Estética funcional aliada à performance.',
    challenge: 'A equipe operava sob alta pressão com excesso de dados na tela. O layout antigo comprometia leitura, aumentava erro operacional e atrasava tomada de decisão.',
    solution: 'Reestruturamos hierarquia visual, blocos de informação e alertas críticos para reduzir carga cognitiva. O painel ganhou velocidade de leitura e suporte a decisões em tempo real.',
    results: [
      '15% ganho de velocidade de execução',
      '40% redução de erros operacionais',
      'Adoção por 3 fundos de investimento',
      'Plataforma bem avaliada em UX institucional',
    ],
    services: ['Design de Dashboard', 'Visualização de Dados', 'UX/UI', 'Arquitetura Front-end', 'Otimização de Performance'],
    gallery: [
      'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'luminary',
    prevProject: 'nexus',
    keyTakeaways: 'Em cenários de alta complexidade, performance nasce da priorização visual: mostrar o essencial no momento certo.',
    focus: 'Performance',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getProjectIndex = (id: string): number => {
  return projects.findIndex((p) => p.id === id);
};
