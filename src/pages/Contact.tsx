import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, Loader2, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PageTransition from '@/components/PageTransition';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be less than 255 characters'),
  company: z.string().trim().max(100, 'Company must be less than 100 characters').optional(),
  budget: z.string().optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const budgetOptions = [
  { value: '', label: 'Select a budget range' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k+', label: '$50,000+' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@studio.design', href: 'mailto:hello@studio.design' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: null },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const formRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', { ...data, email: '[REDACTED]' });
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24-48 hours.",
    });
    reset();
  };

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
              <span className="text-sm font-mono text-muted-foreground tracking-wider">GET IN TOUCH</span>
            </motion.div>

            <div className="max-w-4xl">
              {["Let's create", 'something', 'extraordinary'].map((text, index) => (
                <div key={text} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={heroInView ? { y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className={`font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] ${
                      index === 2 ? 'text-accent' : 'text-foreground'
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
              Have a project in mind? We'd love to hear about it. 
              Drop us a line and let's start the conversation.
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section ref={formRef} className="pb-24 md:pb-32">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-sm font-mono text-accent">02</span>
                  <div className="h-px w-12 bg-accent" />
                  <span className="text-sm font-mono text-muted-foreground tracking-wider">CONTACT INFO</span>
                </div>

                <div className="space-y-8 mb-12">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={formInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                          <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-muted-foreground block mb-1">{item.label}</span>
                          {item.href ? (
                            <a 
                              href={item.href} 
                              className="text-lg font-syne font-semibold hover:text-accent transition-colors inline-flex items-center gap-2"
                            >
                              {item.value}
                              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ) : (
                            <span className="text-lg font-syne font-semibold">{item.value}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-xs font-mono text-muted-foreground block mb-4">FOLLOW US</span>
                  <div className="flex flex-wrap gap-3">
                    {['Twitter', 'LinkedIn', 'Dribbble', 'Instagram'].map((social, index) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="px-4 py-2 border border-border rounded-full text-sm hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={formInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 + index * 0.05 }}
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-sm font-mono text-accent">03</span>
                  <div className="h-px w-12 bg-accent" />
                  <span className="text-sm font-mono text-muted-foreground tracking-wider">SEND MESSAGE</span>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20 border border-border bg-card/30"
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle className="w-10 h-10 text-accent" />
                    </motion.div>
                    <h2 className="text-3xl font-syne font-bold mb-4">Thank you!</h2>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                      Your message has been sent successfully. We'll get back to you within 24-48 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-accent hover:underline transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 border border-border bg-card/30">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent/30" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent/30" />

                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`w-full px-4 py-4 bg-background border-2 transition-colors focus:outline-none ${
                          errors.name 
                            ? 'border-destructive focus:border-destructive' 
                            : 'border-border focus:border-accent'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-4 bg-background border-2 transition-colors focus:outline-none ${
                          errors.email 
                            ? 'border-destructive focus:border-destructive' 
                            : 'border-border focus:border-accent'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Company Field */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        {...register('company')}
                        className="w-full px-4 py-4 bg-background border-2 border-border focus:border-accent transition-colors focus:outline-none"
                        placeholder="Your company (optional)"
                      />
                    </div>

                    {/* Budget Field */}
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        {...register('budget')}
                        className="w-full px-4 py-4 bg-background border-2 border-border focus:border-accent transition-colors focus:outline-none appearance-none cursor-pointer"
                      >
                        {budgetOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-background text-foreground">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        {...register('message')}
                        rows={5}
                        className={`w-full px-4 py-4 bg-background border-2 transition-colors focus:outline-none resize-none ${
                          errors.message 
                            ? 'border-destructive focus:border-destructive' 
                            : 'border-border focus:border-accent'
                        }`}
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-8 py-5 bg-foreground text-background font-semibold text-lg rounded-full flex items-center justify-center gap-3 hover:bg-accent transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
