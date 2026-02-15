import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navigation from '@/components/Navigation';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://verticestudio.vercel.app').replace(/\/$/, '');

const TermsOfService = () => {
  const breadcrumbItems = [
    { label: 'Termos de Serviço', href: '/terms-of-service' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="Termos de Serviço"
        description="Conheça os termos e condições para contratação dos serviços da Vértice Studio."
        url={`${SITE_URL}/terms-of-service`}
      />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-6">
          <Breadcrumbs items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
              Termos de Serviço
            </h1>

            <p className="text-muted-foreground mb-8">
              Última atualização: 12 de fevereiro de 2026
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  1. Aceitação dos termos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao contratar ou utilizar os serviços da Vértice Studio, você concorda com estes termos.
                  Se não concordar com as condições, não prossiga com a contratação.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  2. Descrição dos serviços
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Vértice Studio presta serviços estratégicos de branding, presença digital, arquitetura de site,
                  criativos de performance e consultoria aplicada. O escopo final é definido em proposta formal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  3. Propriedade intelectual
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Materiais e entregas permanecem sob titularidade da Vértice Studio até a quitação integral do
                  projeto. Após pagamento total, os direitos de uso são transferidos conforme definido em contrato.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  4. Condições de pagamento
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Valores e prazos são definidos em proposta comercial</li>
                  <li>Pode haver sinal para início da execução</li>
                  <li>Atrasos podem gerar encargos adicionais</li>
                  <li>O projeto pode ser pausado em caso de inadimplência</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  5. Responsabilidades do cliente
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O cliente deve fornecer informações corretas, aprovações dentro dos prazos e materiais necessários
                  para execução. Atrasos de retorno podem impactar cronograma e entregas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  6. Revisões e alterações de escopo
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O número de revisões está incluído na proposta. Demandas fora do escopo contratado podem gerar
                  reorçamento e reajuste de prazo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  7. Limitação de responsabilidade
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Vértice Studio não se responsabiliza por danos indiretos, lucros cessantes ou perdas decorrentes
                  de fatores externos ao escopo contratado. A responsabilidade total limita-se ao valor pago pelo
                  serviço em questão.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  8. Encerramento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Qualquer parte pode encerrar a prestação mediante aviso formal. Em caso de encerramento, os valores
                  referentes ao trabalho já executado permanecem devidos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  9. Contato
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para dúvidas sobre estes Termos de Serviço, entre em contato:
                  <br />
                  <a href="mailto:tuliorangeldesigner@gmail.com" className="text-primary hover:underline">
                    tuliorangeldesigner@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;

