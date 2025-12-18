import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

const services = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    tagline: 'Define your visual story',
    description: 'We craft comprehensive brand identities that communicate your values, differentiate you from competitors, and create lasting emotional connections with your audience.',
    features: [
      'Brand strategy & positioning',
      'Logo design & variations',
      'Color palette & typography',
      'Brand guidelines document',
      'Collateral design',
      'Brand voice development',
    ],
    startingPrice: '8,000',
    timeline: '4-6 weeks',
    popular: false,
  },
  {
    id: 'web-design',
    title: 'Web Design & Development',
    tagline: 'Digital experiences that convert',
    description: 'From concept to launch, we design and build stunning, high-performance websites that captivate visitors and drive business results.',
    features: [
      'UX research & strategy',
      'Custom UI design',
      'Responsive development',
      'CMS integration',
      'Performance optimization',
      'SEO foundation',
      'Analytics setup',
      '3 months support',
    ],
    startingPrice: '15,000',
    timeline: '6-10 weeks',
    popular: true,
  },
  {
    id: 'digital-campaign',
    title: 'Digital Campaigns',
    tagline: 'Stories that spread',
    description: 'We create integrated digital campaigns that capture attention, spark conversations, and drive measurable engagement across all platforms.',
    features: [
      'Campaign strategy',
      'Creative direction',
      'Content production',
      'Social media assets',
      'Motion graphics',
      'Performance tracking',
    ],
    startingPrice: '12,000',
    timeline: '3-5 weeks',
    popular: false,
  },
  {
    id: 'product-design',
    title: 'Product Design',
    tagline: 'User-centered solutions',
    description: 'We design intuitive digital products that users love. From initial research to final handoff, we ensure every interaction is thoughtful and purposeful.',
    features: [
      'User research & testing',
      'Information architecture',
      'Wireframing & prototyping',
      'UI design system',
      'Interaction design',
      'Developer handoff',
      'Design QA',
    ],
    startingPrice: '20,000',
    timeline: '8-12 weeks',
    popular: false,
  },
];

const addOns = [
  { name: 'Motion Design Package', price: '3,000+' },
  { name: 'Photography Direction', price: '2,500+' },
  { name: 'Copywriting', price: '1,500+' },
  { name: 'Ongoing Retainer', price: '4,000/mo' },
];

const Services = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8 bg-background/80 backdrop-blur-sm">
        <div className="container-wide flex items-center justify-between">
          <Link to="/" className="font-syne text-xl md:text-2xl font-bold tracking-tight">
            STUDIO<span className="text-accent">.</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-3xl"
          >
            <h1 className="heading-xl mb-6">
              Services &<br />
              <span className="text-accent">Pricing</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60">
              We offer a range of services tailored to help your brand stand out 
              in the digital landscape. Each engagement is customized to your 
              unique needs and goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.19, 1, 0.22, 1] 
                }}
                className={`relative p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:border-foreground/20 ${
                  service.popular 
                    ? 'border-accent bg-accent/5' 
                    : 'border-foreground/10 bg-foreground/[0.02]'
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-accent text-background text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-syne font-bold mb-2">
                    {service.title}
                  </h2>
                  <p className="text-accent text-sm uppercase tracking-widest">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-foreground/60 mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing & Timeline */}
                <div className="pt-8 border-t border-foreground/10">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-sm text-foreground/40 mb-1">Starting at</p>
                      <p className="text-3xl md:text-4xl font-syne font-bold">
                        ${service.startingPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground/40 mb-1">Timeline</p>
                      <p className="text-foreground/80 font-medium">{service.timeline}</p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className={`w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      service.popular
                        ? 'bg-accent text-background hover:bg-accent/90'
                        : 'bg-foreground text-background hover:bg-foreground/90'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 md:py-32 bg-foreground/[0.02] border-y border-foreground/10">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-syne font-bold mb-4">
              Add-on Services
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Enhance your project with these additional services, 
              available as standalone or bundled with any package.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-foreground/10 bg-background hover:border-foreground/20 transition-colors"
              >
                <h3 className="font-syne font-semibold mb-2">{addon.name}</h3>
                <p className="text-2xl font-bold text-accent">${addon.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-syne font-bold mb-4">
              Our Process
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              A proven methodology that ensures every project 
              is delivered on time and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We dive deep into your business, goals, and target audience.' },
              { step: '02', title: 'Strategy', desc: 'We develop a tailored approach based on research and insights.' },
              { step: '03', title: 'Creation', desc: 'Our team brings the vision to life with meticulous attention.' },
              { step: '04', title: 'Launch', desc: 'We deliver, test, and ensure everything performs flawlessly.' },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center md:text-left"
              >
                <span className="text-5xl md:text-6xl font-syne font-bold text-foreground/10">
                  {phase.step}
                </span>
                <h3 className="text-xl font-syne font-semibold mt-4 mb-2">
                  {phase.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {phase.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-syne font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-background/60 max-w-xl mx-auto mb-10">
              Let's discuss how we can help bring your vision to life. 
              Schedule a free consultation to get started.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-medium rounded-full hover:bg-accent/90 transition-colors"
            >
              Schedule a Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8 bg-background">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-syne font-bold">STUDIO<span className="text-accent">.</span></span>
          <span className="text-sm text-foreground/50">© 2024 All rights reserved.</span>
        </div>
      </footer>
      </div>
    </PageTransition>
  );
};

export default Services;
