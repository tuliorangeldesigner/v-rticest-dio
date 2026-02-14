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
    subtitle: 'Reposicionamento estratégico para aumentar percepção de valor.',
    summary:
      'Reprogramação de Marca organiza como sua empresa é percebida no mercado. O objetivo é sair da lógica de marca comum e construir autoridade visual e narrativa para vender com mais margem.',
    objective:
      'Fazer sua marca comunicar valor antes da proposta comercial, reduzindo objeção por preço e elevando confiança na decisão de compra.',
    forWho: [
      'Empresas que já entregam bem, mas não parecem premium.',
      'Negócios que estão presos em comparação por preço.',
      'Marcas com comunicação inconsistente entre canais.',
    ],
    includes: [
      'Diagnóstico de posicionamento e percepção atual.',
      'Estrutura estratégica de diferenciação.',
      'Direção estética e identidade visual coerente.',
      'Guia de aplicação para manter consistência no digital.',
    ],
    process: [
      'Análise do cenário, concorrência e gaps de percepção.',
      'Definição de território, narrativa e promessa central.',
      'Desenvolvimento do sistema visual e validações.',
      'Entrega de ativos com direcionamento de uso.',
    ],
    deliverables: [
      'Sistema de identidade visual completo.',
      'Diretrizes de posicionamento e mensagem.',
      'Estrutura prática para aplicação em site e social.',
    ],
    results: [
      'Maior autoridade percebida no primeiro contato.',
      'Melhor qualidade de lead e negociação.',
      'Redução de pressão por desconto.',
    ],
  },
  {
    slug: 'arquitetura-de-site-e-conversao',
    number: '02',
    title: 'Arquitetura de Site & Conversão',
    subtitle: 'Seu site deixa de ser vitrine e vira sistema de decisão.',
    summary:
      'Arquitetura de Site & Conversão estrutura páginas para conduzir o visitante da atenção até a ação. Não é só design: é estratégia de conteúdo, hierarquia de informação e copy orientada a conversão.',
    objective:
      'Aumentar contatos qualificados com páginas que deixam claro o que você faz, para quem faz e por que sua empresa é a escolha certa.',
    forWho: [
      'Empresas com tráfego e baixa geração de contatos.',
      'Sites bonitos, mas sem narrativa comercial clara.',
      'Negócios que precisam transformar visitas em oportunidade real.',
    ],
    includes: [
      'Arquitetura estratégica das páginas principais.',
      'Copy orientada à autoridade e redução de objeção.',
      'UX focada em clareza, prova e ação.',
      'Landing pages específicas para campanhas.',
    ],
    process: [
      'Mapeamento da jornada e pontos de fricção.',
      'Planejamento da narrativa por seção e prioridade.',
      'Construção de layout e mensagens com foco em decisão.',
      'Ajustes para performance, velocidade e conversão.',
    ],
    deliverables: [
      'Estrutura completa do site orientada a conversão.',
      'Páginas-chave com copy e CTA estratégicos.',
      'Base pronta para tráfego e escala comercial.',
    ],
    results: [
      'Mais contatos com intenção real de compra.',
      'Menos dúvidas no processo comercial.',
      'Maior taxa de conversão do tráfego existente.',
    ],
  },
  {
    slug: 'criativos-de-performance',
    number: '03',
    title: 'Criativos de Performance',
    subtitle: 'Criativos orientados por métrica para escalar resultado.',
    summary:
      'Criativos de Performance conecta estratégia de oferta com execução visual para anúncios. A proposta é testar, aprender e iterar rapidamente para reduzir custo e aumentar retorno.',
    objective:
      'Produzir criativos que capturam atenção, sustentam interesse e geram ação com previsibilidade de performance.',
    forWho: [
      'Empresas que investem em tráfego e não escalam com consistência.',
      'Operações com criativos sem teste estruturado.',
      'Negócios que precisam melhorar CTR, CPL e ROAS.',
    ],
    includes: [
      'Planejamento de ângulos criativos por campanha.',
      'Produção de variações para testes A/B reais.',
      'Direção de hooks visuais e mensagens de alto impacto.',
      'Otimização contínua baseada em dados.',
    ],
    process: [
      'Leitura de contexto, oferta e público.',
      'Desenho de hipóteses criativas e roteiro de teste.',
      'Produção e publicação com rastreio de performance.',
      'Análise de resultado e iteração em ciclos curtos.',
    ],
    deliverables: [
      'Lotes de criativos por objetivo de campanha.',
      'Matriz de testes com hipóteses e aprendizados.',
      'Direção de otimização para próximas rodadas.',
    ],
    results: [
      'Melhora de CTR e retenção nos anúncios.',
      'Redução de desperdício em mídia paga.',
      'Escala mais previsível de aquisição.',
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

            <h1 className="font-syne font-black text-4xl sm:text-5xl md:text-7xl leading-[0.95] mb-6 max-w-5xl">
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
