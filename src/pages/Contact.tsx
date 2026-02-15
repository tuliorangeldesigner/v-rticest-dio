import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, Loader2, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().trim().email('Digite um e-mail válido').max(255, 'E-mail deve ter no máximo 255 caracteres'),
  company: z.string().trim().max(100, 'Empresa deve ter no máximo 100 caracteres').optional(),
  budget: z.string().optional(),
  message: z.string().trim().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(2000, 'Mensagem deve ter no máximo 2000 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const budgetOptions = [
  { value: '', label: 'Selecione uma faixa de investimento' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k+', label: '$50,000+' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'tuliorangeldesigner@\ngmail.com', href: 'mailto:tuliorangeldesigner@gmail.com' },
  { icon: Phone, label: 'WhatsApp', value: '(41) 98744-8273', href: 'https://wa.me/5541987448273' },
  { icon: MapPin, label: 'Localização', value: 'Morretes / PR\nAtendimento nacional e projetos remotos.', href: null },
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
    try {
      const response = await fetch('https://formsubmit.co/ajax/tuliorangeldesigner@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Novo diagnóstico estratégico (site)',
          _captcha: 'false',
          _template: 'table',
          Nome: data.name,
          Email: data.email,
          Empresa: data.company || 'Não informado',
          Orcamento: data.budget || 'Não informado',
          Mensagem: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha no envio');
      }

      setIsSubmitted(true);
      toast({
        title: 'Mensagem enviada!',
        description: 'Recebemos sua solicitação e retornaremos em breve.',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Não foi possível enviar agora',
        description: 'Tente novamente em instantes.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span className="text-sm font-mono text-muted-foreground tracking-wider">CONTATO</span>
            </motion.div>

            <div className="max-w-4xl">
              {['Contato', 'Direto'].map((text, index) => (
                <div key={text} className="overflow-visible">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={heroInView ? { y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className={`font-epic font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] ${
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
              Atendimento direto com o responsável pelo projeto.
              <br />
              Sem intermediários. Sem ruído.
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section ref={formRef} className="pb-24 md:pb-32 pt-16">
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
                  <span className="text-sm font-mono text-muted-foreground tracking-wider">CONTATO DIRETO</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href || '#'}
                      className={`group relative p-8 border border-border bg-background hover:border-accent transition-all duration-500 flex flex-col justify-between min-h-[200px] ${
                        item.label === 'Localização' ? 'sm:col-span-2' : ''
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider group-hover:text-accent transition-colors">
                          {item.label}
                        </span>
                        <item.icon className="w-6 h-6 text-muted-foreground/50 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                      </div>

                      <div>
                        <span className="text-xl md:text-2xl font-syne font-bold leading-tight group-hover:text-accent transition-colors break-words whitespace-pre-line">
                          {item.value}
                        </span>
                        {item.href && (
                          <div className="mt-4 w-8 h-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 text-accent" />
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Fill Effect */}
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="pt-8 border-t border-border"
                >
                  <span className="text-xs font-mono text-muted-foreground block mb-6 uppercase tracking-wider">REDES</span>
                  <div className="flex flex-wrap gap-4">
                    {['Instagram', '@tulio_rangel_designer'].map((social, index) => (
                      <motion.a
                        key={social}
                        href="https://www.instagram.com/tulio_rangel_designer/"
                        className="px-8 py-4 border border-border text-sm font-bold font-syne hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 min-w-[120px] text-center"
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
                  <span className="text-sm font-mono text-muted-foreground tracking-wider">DIAGNSTICO</span>
                </div>

                <div className="mb-8 text-muted-foreground leading-relaxed">
                  <p className="mb-3">Antes de enviar sua mensagem, entenda:</p>
                  <p className="mb-3">
                    Trabalhamos com projetos estratégicos de reposicionamento, arquitetura digital e performance.
                  </p>
                  <p className="mb-3">
                    Se sua empresa está pronta para sair do comum e assumir postura premium, descreva seu momento atual e seus objetivos com clareza.
                  </p>
                  <p>Projetos são limitados por capacidade de execução.</p>
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
                    <h2 className="text-3xl font-syne font-bold mb-4">Obrigado!</h2>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                      Sua mensagem foi enviada com sucesso. Retornaremos em 24-48 horas.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-accent hover:underline transition-colors"
                    >
                      Enviar outra mensagem
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
                        Nome <span className="text-accent">*</span>
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
                        placeholder="Seu nome"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-mail <span className="text-accent">*</span>
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
                        Empresa
                      </label>
                      <input
                        id="company"
                        type="text"
                        {...register('company')}
                        className="w-full px-4 py-4 bg-background border-2 border-border focus:border-accent transition-colors focus:outline-none"
                        placeholder="Sua empresa (opcional)"
                      />
                    </div>

                    {/* Budget Field */}
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        Faixa de investimento
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
                        Mensagem <span className="text-accent">*</span>
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
                        placeholder="Descreva seu projeto..."
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
                      className="w-full mt-8 py-4 bg-white text-black font-semibold text-base rounded-full flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Solicitar Diagnóstico Estratégico
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Percepção define valor.
                      <br />
                      Valor define crescimento.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
};

export default Contact;




