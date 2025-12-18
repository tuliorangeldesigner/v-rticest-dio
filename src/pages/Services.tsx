import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';

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
    number: '01',
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
    number: '02',
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
    number: '03',
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
    number: '04',
  },
];

const addOns = [
  { name: 'Motion Design Package', price: '3,000+', number: '01' },
  { name: 'Photography Direction', price: '2,500+', number: '02' },
  { name: 'Copywriting', price: '1,500+', number: '03' },
  { name: 'Ongoing Retainer', price: '4,000/mo', number: '04' },
];

const Services = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState<number | null>(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const addOnsRef = useRef(null);
  const processRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const addOnsInView = useInView(addOnsRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) / 30,
      y: (e.clientY - window.innerHeight / 2) / 30,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
        <Navigation />

        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-foreground/5"
                style={{ top: `${16.66 * (i + 1)}%` }}
                initial={{ scaleX: 0 }}
                animate={heroInView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.05, duration: 1.2 }}
              />
            ))}
          </div>

          {/* Floating shapes */}
          <motion.div
            className="absolute top-32 right-[15%] w-24 h-24 border border-accent/20"
            style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          />
          <motion.div
            className="absolute bottom-32 left-[10%] w-32 h-32 rounded-full border border-accent/10"
            style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          />

          {/* Accent orb */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
            style={{ top: '10%', right: '0%' }}
          />

          <div className="container-wide relative z-10">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="text-sm font-mono text-accent">01</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">SERVICES</span>
            </motion.div>

            <div className="max-w-4xl">
              {['Services &', 'Pricing'].map((text, index) => (
                <div key={text} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={heroInView ? { y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className={`font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] ${
                      index === 1 ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {text}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-8"
            >
              We offer a range of services tailored to help your brand stand out 
              in the digital landscape. Each engagement is customized to your 
              unique needs and goals.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={servicesRef} className="pb-24 md:pb-32 relative">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="text-sm font-mono text-accent">02</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">WHAT WE OFFER</span>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  className={`relative p-8 md:p-10 border transition-all duration-500 ${
                    service.popular 
                      ? 'border-accent bg-accent/5' 
                      : activeService === index
                        ? 'border-accent/50 bg-accent/5'
                        : 'border-border bg-card/30'
                  }`}
                >
                  {/* Number */}
                  <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/50">
                    {service.number}
                  </span>

                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-3 left-8 px-4 py-1 bg-accent text-accent-foreground text-xs font-medium">
                      Most Popular
                    </div>
                  )}

                  {/* Corner decoration */}
                  <motion.div
                    className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeService === index || service.popular ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-syne font-bold mb-2">
                      {service.title}
                    </h2>
                    <p className="text-accent text-sm font-mono tracking-wider">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border border-accent/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing & Timeline */}
                  <div className="pt-8 border-t border-border">
                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-1">STARTING AT</p>
                        <p className="text-3xl md:text-4xl font-syne font-bold">
                          ${service.startingPrice}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-muted-foreground mb-1">TIMELINE</p>
                        <p className="text-foreground/80 font-medium">{service.timeline}</p>
                      </div>
                    </div>

                    <MagneticButton className="w-full">
                      <Link
                        to="/contact"
                        className={`w-full py-4 font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                          service.popular
                            ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                            : 'bg-foreground text-background hover:bg-accent'
                        }`}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </MagneticButton>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeService === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section ref={addOnsRef} className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`grid-${i}`}
                className="absolute left-0 right-0 h-px bg-foreground/5"
                style={{ top: `${25 * (i + 1)}%` }}
                initial={{ scaleX: 0 }}
                animate={addOnsInView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 1.2 }}
              />
            ))}
          </div>

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={addOnsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">03</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">ADD-ONS</span>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-syne font-bold"
              >
                Add-on Services
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-muted-foreground max-w-md"
              >
                Enhance your project with these additional services.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group relative p-6 border border-border bg-background hover:border-accent hover:bg-accent/5 transition-all duration-300"
                >
                  <span className="absolute top-3 right-3 text-xs font-mono text-muted-foreground/40 group-hover:text-accent transition-colors">
                    {addon.number}
                  </span>
                  <h3 className="font-syne font-semibold mb-2 group-hover:text-accent transition-colors">
                    {addon.name}
                  </h3>
                  <p className="text-2xl font-bold text-accent">${addon.price}</p>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-24 md:py-32 relative overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
            style={{ bottom: '10%', left: '-10%' }}
          />

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={processInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">04</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">OUR PROCESS</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-syne font-bold mb-16"
            >
              How We Work
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6 md:gap-8">
              {[
                { step: '01', title: 'Discovery', desc: 'We dive deep into your business, goals, and target audience.', icon: '◇' },
                { step: '02', title: 'Strategy', desc: 'We develop a tailored approach based on research and insights.', icon: '○' },
                { step: '03', title: 'Creation', desc: 'Our team brings the vision to life with meticulous attention.', icon: '△' },
                { step: '04', title: 'Launch', desc: 'We deliver, test, and ensure everything performs flawlessly.', icon: '□' },
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group relative p-6 border border-border bg-card/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-syne font-bold text-muted/30 group-hover:text-accent/30 transition-colors">
                      {phase.step}
                    </span>
                    <motion.span 
                      className="text-2xl text-muted-foreground/30 group-hover:text-accent transition-colors"
                      whileHover={{ rotate: 180, scale: 1.2 }}
                      transition={{ duration: 0.4 }}
                    >
                      {phase.icon}
                    </motion.span>
                  </div>
                  <h3 className="text-xl font-syne font-semibold mb-2 group-hover:text-accent transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {phase.desc}
                  </p>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-background/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <div className="container-wide text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-mono text-accent mb-6 block">START TODAY</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
                Ready to start your project?
              </h2>
              <p className="text-background/60 max-w-xl mx-auto mb-10">
                Let&apos;s discuss how we can help bring your vision to life. 
                Schedule a free consultation to get started.
              </p>
              <MagneticButton>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full"
                >
                  Schedule a Call
                  <motion.div
                    className="w-6 h-6 rounded-full bg-accent-foreground/20 flex items-center justify-center"
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
