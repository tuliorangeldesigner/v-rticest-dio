import type { FaqItem } from '@/lib/seoSchemas';

export interface SeoService {
  slug: string;
  title: string;
  description: string;
  introduction: string;
  sections: { title: string; content: string }[];
  faqs: FaqItem[];
  primaryService: string;
  primaryServiceLabel: string;
}

export const seoServices: SeoService[] = [
  {
    slug: 'criacao-de-sites',
    title: 'Criação de Sites Profissionais',
    description: 'Criação de sites profissionais para empresas que precisam transformar presença digital em oportunidades comerciais.',
    introduction: 'Um site profissional organiza proposta, prova e próximo passo para que a empresa seja entendida e escolhida com mais segurança.',
    sections: [
      { title: 'Site como ativo comercial', content: 'A construção começa pelo que sua empresa precisa comunicar, para quem e qual ação deve acontecer depois da visita.' },
      { title: 'Estrutura antes da estética', content: 'Hierarquia, clareza e provas de autoridade orientam cada seção. O design sustenta a decisão; não é uma camada solta.' },
      { title: 'Preparado para crescer', content: 'A página é pensada para receber tráfego orgânico, campanhas e indicações sem perder coerência na mensagem.' },
    ],
    faqs: [
      { question: 'Quanto tempo leva para criar um site?', answer: 'O prazo depende do escopo, do material disponível e das validações. O diagnóstico inicial define uma previsão responsável.' },
      { question: 'O site é feito para celular?', answer: 'Sim. A experiência é planejada para telas menores e maiores, porque boa parte das visitas começa no celular.' },
      { question: 'Como começar um projeto de site?', answer: 'O primeiro passo é um diagnóstico do objetivo, público, oferta e estrutura necessária.' },
    ],
    primaryService: '/services/arquitetura-de-site-e-conversao',
    primaryServiceLabel: 'Conhecer Arquitetura de Site & Conversão',
  },
  {
    slug: 'criacao-de-landing-pages',
    title: 'Criação de Landing Pages',
    description: 'Landing pages estratégicas para campanhas, lançamentos e captação de leads qualificados.',
    introduction: 'Uma landing page reduz distrações e conduz uma intenção específica: pedir orçamento, agendar, comprar ou deixar um contato.',
    sections: [
      { title: 'Uma página, uma decisão', content: 'A mensagem, a prova e o CTA trabalham para a ação mais relevante da campanha.' },
      { title: 'Coerência com a origem do tráfego', content: 'A promessa do anúncio, conteúdo ou indicação precisa continuar na página para preservar confiança.' },
      { title: 'Conversão com clareza', content: 'A estrutura responde objeções reais e deixa claro o que acontece depois do contato.' },
    ],
    faqs: [
      { question: 'Landing page substitui um site?', answer: 'Não necessariamente. Landing pages atendem uma oferta ou campanha específica; o site sustenta a presença institucional mais ampla.' },
      { question: 'Uma landing page pode receber tráfego orgânico?', answer: 'Sim, quando a página responde a uma intenção específica e possui conteúdo útil e indexável.' },
      { question: 'O que preciso enviar para começar?', answer: 'Oferta, público, objetivo e materiais existentes ajudam a orientar o diagnóstico e a produção.' },
    ],
    primaryService: '/services/arquitetura-de-site-e-conversao',
    primaryServiceLabel: 'Conhecer Arquitetura de Site & Conversão',
  },
  {
    slug: 'criacao-de-logo',
    title: 'Criação de Logo Profissional',
    description: 'Criação de logo profissional com direção estratégica para empresas que querem ser reconhecidas com consistência.',
    introduction: 'Um logo é um sinal de reconhecimento. Para funcionar no negócio, precisa nascer de uma direção clara de posicionamento, não apenas de preferência estética.',
    sections: [
      { title: 'Direção antes do desenho', content: 'O processo alinha percepção desejada, público e diferenciais para que a marca represente o negócio de forma coerente.' },
      { title: 'Aplicação no mundo real', content: 'A marca precisa manter leitura e personalidade no site, redes sociais, propostas e materiais comerciais.' },
      { title: 'Sistema, não símbolo isolado', content: 'O melhor resultado vem quando o logo faz parte de um conjunto visual capaz de sustentar a comunicação.' },
    ],
    faqs: [
      { question: 'Logo e identidade visual são a mesma coisa?', answer: 'Não. O logo é parte da identidade visual, que inclui regras de tipografia, cores e aplicações.' },
      { question: 'Posso usar o logo em redes sociais e site?', answer: 'Esse é o objetivo: criar uma base reconhecível para os principais pontos de contato da marca.' },
      { question: 'Como o processo começa?', answer: 'Com um diagnóstico para entender cenário, percepção atual e direção estratégica desejada.' },
    ],
    primaryService: '/services/reprogramacao-de-marca',
    primaryServiceLabel: 'Conhecer Reprogramação de Marca',
  },
  {
    slug: 'identidade-visual',
    title: 'Criação de Identidade Visual',
    description: 'Criação de identidade visual estratégica para empresas que precisam comunicar valor com consistência.',
    introduction: 'Identidade visual transforma posicionamento em um sistema reconhecível, aplicável e coerente em cada ponto de contato.',
    sections: [
      { title: 'Coerência gera confiança', content: 'Quando marca, site e materiais seguem a mesma lógica, a empresa reduz ruído e aumenta a percepção de profissionalismo.' },
      { title: 'Decisões com contexto', content: 'Cores, tipografia e aplicações são escolhidas para servir à estratégia e ao público, não tendências passageiras.' },
      { title: 'Base para crescer', content: 'Um sistema visual bem definido facilita novas peças e mantém a marca reconhecível conforme a empresa avança.' },
    ],
    faqs: [
      { question: 'O que inclui uma identidade visual?', answer: 'O escopo é definido no diagnóstico e pode reunir marca, paleta, tipografia e diretrizes de aplicação.' },
      { question: 'Posso contratar apenas a identidade visual?', answer: 'Sim. O diagnóstico indica a solução compatível com o momento e objetivo da empresa.' },
      { question: 'Por que identidade visual importa?', answer: 'Ela reduz inconsistência e ajuda o mercado a entender, lembrar e confiar mais na marca.' },
    ],
    primaryService: '/services/reprogramacao-de-marca',
    primaryServiceLabel: 'Conhecer Reprogramação de Marca',
  },
];

export const getSeoService = (slug: string) => seoServices.find((service) => service.slug === slug);
