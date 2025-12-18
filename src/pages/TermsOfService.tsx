import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

const TermsOfService = () => {
  const breadcrumbItems = [
    { label: 'Terms of Service', href: '/terms-of-service' }
  ];

  return (
    <PageTransition>
      <SEO 
        title="Terms of Service"
        description="Read our terms of service to understand the rules and guidelines for using our services."
        url="https://studio.design/terms-of-service"
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
              Terms of Service
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Last updated: December 18, 2025
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using our services, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  2. Services Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Creativa Studio provides digital design and development services including but not limited to 
                  web design, branding, UI/UX design, and digital marketing. The specific scope of services 
                  will be defined in individual project agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  3. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, designs, and materials created by Creativa Studio remain our intellectual property 
                  until full payment is received. Upon complete payment, ownership of deliverables transfers to the client 
                  as specified in the project agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  4. Payment Terms
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Payment terms are specified in individual project proposals</li>
                  <li>A deposit may be required before work begins</li>
                  <li>Late payments may incur additional fees</li>
                  <li>Work may be suspended for overdue payments</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  5. Client Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Clients are responsible for providing accurate information, timely feedback, and necessary 
                  materials required for project completion. Delays caused by client may affect project timelines.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  6. Revisions and Changes
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The number of included revisions will be specified in each project agreement. Additional 
                  revisions beyond the agreed scope may incur extra charges.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Creativa Studio shall not be liable for any indirect, incidental, special, or consequential 
                  damages arising from the use of our services. Our total liability shall not exceed the amount 
                  paid for the specific service in question.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  8. Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate services with written notice. Upon termination, payment is due 
                  for all work completed up to the termination date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  9. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at:
                  <br />
                  <a href="mailto:legal@creativastudio.com" className="text-primary hover:underline">
                    legal@creativastudio.com
                  </a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default TermsOfService;
