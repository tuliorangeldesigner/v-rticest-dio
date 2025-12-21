import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';

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
      <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
        <Navigation />

        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
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
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-foreground/5"
                style={{ left: `${25 * (i + 1)}%` }}
                initial={{ scaleY: 0 }}
                animate={heroInView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.05, duration: 1.2 }}
              />
            ))}
          </div>

          {/* Floating shapes */}
          <motion.div
            className="absolute top-32 right-[10%] w-20 h-20 border border-accent/20"
            style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          />
          <motion.div
            className="absolute bottom-20 left-[15%] w-32 h-32 rounded-full border border-accent/10"
            style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          />

          {/* Accent orb */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
            style={{ top: '20%', right: '10%', x: mousePosition.x * 3, y: mousePosition.y * 3 }}
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
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mt-8"
            >
              We offer a range of services tailored to help your brand stand out 
              in the digital landscape. Each engagement is customized to your 
              unique needs and goals.
            </motion.p>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-24 md:py-32 relative">
          <div className="container-wide">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-16 md:mb-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-mono text-accent">02</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">WHAT WE OFFER</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-syne font-bold leading-tight max-w-3xl">
                Comprehensive design solutions tailored to your needs.
              </h2>
            </motion.div>

            {/* Interactive Grid */}
            <div className="grid md:grid-cols-2 border-t border-l border-border">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  className="group relative border-r border-b border-border min-h-[500px] md:min-h-[600px] overflow-hidden bg-background"
                >
                  {/* Default View (Always visible/background) */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-0">
                    <div className="flex justify-between items-start">
                      <span className="text-6xl md:text-8xl font-syne font-bold text-foreground/5 group-hover:text-accent/10 transition-colors duration-500">
                        {service.number}
                      </span>
                      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-500">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-12 md:mb-0">
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold leading-[0.9] group-hover:text-accent transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-sm font-mono tracking-wider text-muted-foreground uppercase">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Reveal Panel (Slides up) */}
                  <div className="absolute inset-x-0 bottom-0 h-[85%] md:h-[75%] bg-card/95 backdrop-blur-xl border-t border-border p-8 md:p-12 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-10">
                    <div>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {service.features.slice(0, 6).map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between border-t border-border/50 pt-6">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-1">STARTING AT</p>
                        <p className="text-3xl font-syne font-bold">${service.startingPrice}</p>
                      </div>
                      <Link 
                        to="/contact" 
                        className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
                      >
                        Start Project →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section ref={addOnsRef} className="py-24 md:py-32 relative overflow-hidden">
          <div className="container-wide">
            {/* Centered Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm font-mono text-accent">03</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">ADD-ONS</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-syne font-bold max-w-2xl mx-auto">
                Enhance your project.
              </h2>
            </motion.div>

            {/* Typographic Ledger List */}
            <div className="max-w-6xl mx-auto border-t border-border">
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group relative flex flex-col md:flex-row md:items-baseline justify-between py-12 md:py-16 border-b border-border cursor-pointer"
                >
                  <div className="flex items-baseline gap-8 md:gap-16">
                    <span className="font-mono text-sm text-accent/50 group-hover:text-accent transition-colors duration-300">
                      {addon.number}
                    </span>
                    <h3 className="text-3xl md:text-6xl font-syne font-bold text-foreground group-hover:text-accent group-hover:translate-x-4 transition-all duration-500 ease-out">
                      {addon.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 mt-6 md:mt-0 pl-[calc(2rem+1px)] md:pl-0">
                    <p className="font-mono text-lg md:text-xl text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      ${addon.price}
                    </p>
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <span className="text-accent text-2xl">+</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
          <div className="container-wide">
            {/* Centered Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm font-mono text-accent">04</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">OUR PROCESS</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-syne font-bold max-w-2xl mx-auto">
                A proven methodology.
              </h2>
            </motion.div>

            {/* Architectural Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-y border-border">
              {[
                { step: '01', title: 'Discovery', desc: 'We dive deep into your business, goals, and target audience.', icon: '◇' },
                { step: '02', title: 'Strategy', desc: 'We develop a tailored approach based on research and insights.', icon: '○' },
                { step: '03', title: 'Creation', desc: 'Our team brings the vision to life with meticulous attention.', icon: '△' },
                { step: '04', title: 'Launch', desc: 'We deliver, test, and ensure everything performs flawlessly.', icon: '□' },
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group relative flex flex-col justify-between p-8 md:p-12 min-h-[500px] border-b md:border-b-0 md:border-r border-border last:border-b-0 last:border-r-0 hover:bg-foreground hover:text-background transition-colors duration-500"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xl font-mono group-hover:text-accent transition-colors duration-300">
                      {phase.step}
                    </span>
                    <motion.span 
                      className="text-3xl text-accent opacity-50 group-hover:opacity-100 group-hover:text-background transition-all duration-300"
                      whileHover={{ rotate: 180, scale: 1.2 }}
                    >
                      {phase.icon}
                    </motion.span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-3xl font-syne font-bold mb-6 group-hover:text-background transition-colors duration-300">
                      {phase.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-background/80 transition-colors duration-300">
                      {phase.desc}
                    </p>
                    
                    <div className="h-px w-8 bg-border mt-8 group-hover:w-full group-hover:bg-accent transition-all duration-700 ease-out" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-foreground/5"
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
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                Let&apos;s discuss how we can help bring your vision to life. 
                Schedule a free consultation to get started.
              </p>
              <MagneticButton>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full"
                >
                  Schedule a Call
                  <motion.div
                    className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center"
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
  );
};

export default Services;
