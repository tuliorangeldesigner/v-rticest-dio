import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type ServiceDetail = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  objective: string;
  forWho: string[];
  includes: string[];
  process: string[];
  deliverables: string[];
  results: string[];
};

const serviceDetails: ServiceDetail[] = [
  {
    slug: 'reprogramacao-de-marca',
    number: '01',
    title: 'Reprogramação de Marca',
    subtitle: 'Pare de parecer comum. Comece a ser percebido como referência.',
    summary:
      'Se sua empresa entrega qualidade, mas o mercado te compara por preço, o problema não está na entrega: está na percepção. A Reprogramação de Marca reposiciona sua autoridade para que o cliente certo enxergue valor antes mesmo da proposta.',
    objective:
      'Reposicionar sua marca para reduzir barganha, elevar confiança e abrir espaço para decisões de compra mais rápidas e com maior margem.',
    forWho: [
      'Empresas que entregam bem, mas ainda parecem "mais uma".',
      'Negócios presos em guerra de preço e desconto.',
      'Marcas com presença inconsistente entre site, social e materiais comerciais.',
    ],
    includes: [
      'Diagnóstico de percepção e posicionamento atual.',
      'Definição estratégica de território e diferenciação.',
      'Direção estética e sistema de identidade visual.',
      'Diretrizes de aplicação para consistência em todos os pontos de contato.',
    ],
    process: [
      'Mapeamento dos gaps de autoridade frente ao mercado.',
      'Construção de narrativa e promessa central da marca.',
      'Desenvolvimento da identidade com validação estratégica.',
      'Implantação orientada para ganho de percepção e conversão.',
    ],
    deliverables: [
      'Sistema visual completo (marca, tipografia, paleta e aplicações).',
      'Guia de posicionamento com direção de mensagem.',
      'Base pronta para site, redes sociais e operação comercial.',
    ],
    results: [
      'Aumento imediato da autoridade percebida no primeiro contato.',
      'Leads mais qualificados e menos objeção comercial.',
      'Redução da dependência de desconto para fechar contratos.',
    ],
  },
  {
    slug: 'arquitetura-de-site-e-conversao',
    number: '02',
    title: 'Arquitetura de Site & Conversão',
    subtitle: 'Seu site não pode ser bonito e improdutivo ao mesmo tempo.',
    summary:
      'Tráfego sem conversão é custo. Site sem clareza é perda de oportunidade. A Arquitetura de Site & Conversão estrutura cada seção para conduzir o visitante até a ação com lógica, prova e CTA estratégico.',
    objective:
      'Transformar visitas em conversas comerciais qualificadas com uma experiência que elimina ruído e acelera decisão.',
    forWho: [
      'Empresas com tráfego e poucos contatos relevantes.',
      'Sites esteticamente bons, mas sem narrativa de venda.',
      'Negócios que precisam converter autoridade em demanda real.',
    ],
    includes: [
      'Arquitetura estratégica das páginas e jornada.',
      'Copy de autoridade com foco em conversão.',
      'UX orientada para clareza, prova e ação.',
      'Landing pages prontas para campanhas e escala.',
    ],
    process: [
      'Diagnóstico de fricções e vazamentos do funil atual.',
      'Planejamento de narrativa por intenção do visitante.',
      'Construção de páginas com hierarquia de decisão.',
      'Refino de performance para melhorar conversão com o tráfego atual.',
    ],
    deliverables: [
      'Estrutura completa do site com foco comercial.',
      'Páginas-chave com copy, prova e CTA estratégicos.',
      'Base preparada para tráfego pago e orgânico com melhor aproveitamento.',
    ],
    results: [
      'Mais contatos com intenção real de compra.',
      'Menos dúvida no comercial e ciclo de venda mais curto.',
      'Aumento da taxa de conversão sem depender de mais mídia.',
    ],
  },
  {
    slug: 'criativos-de-performance',
    number: '03',
    title: 'Criativos de Performance',
    subtitle: 'Mídia sem criativo forte é orçamento sendo queimado.',
    summary:
      'Se o criativo não prende atenção, o resto do funil não existe. Criativos de Performance conecta estratégia de oferta com execução visual para aumentar retenção, clique e resposta comercial.',
    objective:
      'Construir um sistema criativo orientado por teste e métrica para reduzir desperdício e escalar campanhas com previsibilidade.',
    forWho: [
      'Empresas que investem em tráfego, mas não conseguem escala sustentável.',
      'Operações que publicam criativos sem método de teste.',
      'Negócios que precisam melhorar CTR, CPL e ROAS com urgência.',
    ],
    includes: [
      'Matriz de ângulos criativos por oferta e público.',
      'Variações para testes A/B com hipótese clara.',
      'Direção de hooks visuais e mensagens de alta retenção.',
      'Ciclos de otimização contínua guiados por dados.',
    ],
    process: [
      'Leitura de contexto, oferta, público e benchmark competitivo.',
      'Desenho de hipóteses criativas e plano de validação.',
      'Produção, publicação e acompanhamento por KPI.',
      'Iteração contínua para cortar perdas e ampliar vencedores.',
    ],
    deliverables: [
      'Pacotes de criativos por objetivo de campanha.',
      'Matriz de testes com aprendizados acionáveis.',
      'Direção de próximos ciclos para escala de performance.',
    ],
    results: [
      'Aumento de retenção nos primeiros segundos e melhor CTR.',
      'Redução de desperdício de verba em anúncios fracos.',
      'Escala de aquisição com mais previsibilidade e controle.',
    ],
  },
  {
    slug: 'sistema-completo-tr-designer',
    number: '04',
    title: 'Sistema Completo TR Designer',
    subtitle: 'Marca, site e performance trabalhando no mesmo objetivo de crescimento.',
    summary:
      'Quando branding, site e mídia são conduzidos por fornecedores diferentes sem direção única, a empresa perde dinheiro em retrabalho e incoerência. O Sistema Completo TR Designer integra toda a operação de presença e conversão em um fluxo estratégico único.',
    objective:
      'Unificar posicionamento, ambiente digital e aquisição para transformar comunicação fragmentada em crescimento previsível.',
    forWho: [
      'Empresas que já testaram ações isoladas e não sustentaram resultado.',
      'Negócios com percepção fraca, site ineficiente e mídia sem consistência.',
      'Operações que querem escalar com direção, não por tentativa e erro.',
    ],
    includes: [
      'Diagnóstico estratégico de percepção, conversão e performance.',
      'Reposicionamento de marca e direção de mensagem.',
      'Arquitetura de site orientada para geração de demanda.',
      'Sistema de criativos e otimização contínua por KPI.',
    ],
    process: [
      'Fase 1: Diagnóstico profundo e definição de prioridades.',
      'Fase 2: Reprogramação de marca e estrutura de comunicação.',
      'Fase 3: Construção do ambiente digital de alta conversão.',
      'Fase 4: Operação criativa e otimização de performance em escala.',
    ],
    deliverables: [
      'Sistema completo de posicionamento e identidade aplicada.',
      'Site estratégico com estrutura comercial de conversão.',
      'Rotina de criativos e performance com direção de crescimento.',
    ],
    results: [
      'Redução de ruído entre marketing, comercial e presença digital.',
      'Aumento de autoridade percebida e qualidade dos leads.',
      'Operação mais previsível de aquisição e crescimento.',
    ],
  },
];

const SectionBlock = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <section className="border border-border/60 bg-card/20 p-8 md:p-10">
      <h3 className="text-2xl md:text-3xl font-syne font-bold mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="container-wide pt-32 pb-24 flex-1">
          <h1 className="font-syne text-4xl md:text-6xl font-bold mb-6">Serviço não encontrado</h1>
          <Link to="/services" className="inline-flex items-center gap-2 text-accent">
            Voltar para Serviços <ArrowRight className="w-4 h-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-28 md:pt-36 pb-20 md:pb-28">
        <section className="container-wide mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-mono text-accent">{service.number}</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">SERVIÇO</span>
            </div>

            <h1 className="font-epic font-black text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6 max-w-5xl uppercase">
              {service.title}
            </h1>
            <p className="text-xl text-accent mb-8 max-w-3xl">{service.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">{service.summary}</p>
          </motion.div>
        </section>

        <section className="container-wide mb-16 md:mb-20">
          <div className="border border-accent/30 bg-accent/5 p-8 md:p-10">
            <p className="text-xs font-mono tracking-wider text-accent mb-3 uppercase">Objetivo</p>
            <p className="text-lg md:text-xl leading-relaxed">{service.objective}</p>
          </div>
        </section>

        <section className="container-wide mb-16 md:mb-20">
          <SectionBlock title="Para Quem É" items={service.forWho} />
        </section>

        <section className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 md:mb-20">
          <SectionBlock title="O Que Está Incluído" items={service.includes} />
          <SectionBlock title="Como Funciona" items={service.process} />
        </section>

        <section className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 md:mb-20">
          <SectionBlock title="Entregáveis" items={service.deliverables} />
          <SectionBlock title="Resultados Esperados" items={service.results} />
        </section>

        <section className="container-wide">
          <div className="border border-border/60 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-mono tracking-wider text-accent mb-2">PRÓXIMO PASSO</p>
              <h2 className="font-syne text-2xl md:text-4xl font-bold">Diagnóstico estratégico do seu cenário atual.</h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-black font-semibold rounded-full"
            >
              Agendar Diagnóstico
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
