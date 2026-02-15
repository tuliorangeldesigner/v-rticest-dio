import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navigation from '@/components/Navigation';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://verticestudio.vercel.app').replace(/\/$/, '');

const PrivacyPolicy = () => {
  const breadcrumbItems = [
    { label: 'Política de Privacidade', href: '/privacy-policy' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="Política de Privacidade"
        description="Entenda como coletamos, usamos e protegemos seus dados na Vértice Studio."
        url={`${SITE_URL}/privacy-policy`}
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
              Política de Privacidade
            </h1>

            <p className="text-muted-foreground mb-8">
              Última atualização: 12 de fevereiro de 2026
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  1. Informações que coletamos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Coletamos os dados que você fornece diretamente em formulários de contato, solicitação de diagnóstico,
                  newsletter e comunicação comercial. Isso pode incluir nome, e-mail, telefone, empresa e outras
                  informações relevantes para o atendimento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  2. Como usamos suas informações
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Responder solicitações e prestar suporte comercial</li>
                  <li>Enviar atualizações, conteúdos e comunicações da Vértice Studio</li>
                  <li>Melhorar o site, os processos e a experiência digital</li>
                  <li>Cumprir obrigações legais e contratuais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  3. Compartilhamento de dados
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendemos seus dados. O compartilhamento com terceiros ocorre apenas quando necessário para a
                  execução do serviço, por exigência legal ou para proteção de direitos da Vértice Studio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  4. Cookies e tecnologias de rastreamento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos utilizar cookies e tecnologias semelhantes para melhorar navegação, desempenho e análise do
                  site. Você pode ajustar permissões de cookies diretamente no seu navegador.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  5. Segurança das informações
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aplicamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado,
                  alteração, divulgação ou destruição indevida.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  6. Seus direitos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Você pode solicitar acesso, correção, atualização ou exclusão dos seus dados pessoais, além de
                  interromper o recebimento de comunicações de marketing a qualquer momento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  7. Contato
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para dúvidas sobre esta Política de Privacidade, fale com:
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

export default PrivacyPolicy;

