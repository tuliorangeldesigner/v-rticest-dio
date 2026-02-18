import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getWhatsAppLink } from '@/lib/whatsapp';

const footerLinks = {
  navigation: [
    { name: 'Projetos', href: '/work' },
    { name: 'Sobre', href: '/about' },
    { name: 'Serviços', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contact' },
  ],
  services: [
    { name: 'Web Design', href: '/services#web-design' },
    { name: 'Branding', href: '/services#branding' },
    { name: 'UI/UX Design', href: '/services#ui-ux' },
    { name: 'Development', href: '/services#development' },
  ],
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/tulio_rangel_designer/' },
    { name: 'Twitter', href: '#' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/t%C3%BAlio-rangel-designer1/' },
    { name: 'Dribbble', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
};

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const whatsappHref = getWhatsAppLink();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-background border-t border-border relative z-50">
      {/* Brutalist Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 border-l border-border">
         
         {/* Column 1: Brand & Time */}
         <div className="lg:col-span-1 border-r border-border p-8 lg:p-12 flex flex-col justify-between min-h-[400px] lg:min-h-[600px]">
            <div>
               <Link to="/" className="inline-block mb-12">
                 <span className="font-syne text-4xl font-bold tracking-tighter">
                   Vértice Studio<span className="text-accent">™</span>
                 </span>
               </Link>
               <p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-[200px]">
                  Sistema de Reprogramação de Presença e Conversão
               </p>
            </div>
            
            <div className="space-y-2">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Local Time</span>
               </div>
               <p className="font-syne text-3xl font-bold tabular-nums">
                  {currentTime.toLocaleTimeString('en-US', { hour12: false })}
               </p>
            </div>
         </div>

         {/* Column 2: Navigation - Mega Type */}
         <div className="lg:col-span-1 border-r border-border">
            {footerLinks.navigation.map((link) => (
               <Link 
                  key={link.name} 
                  to={link.href}
                  className="block p-8 border-b border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 group last:border-b-0"
               >
                  <div className="flex items-center justify-between">
                     <span className="font-syne text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                        {link.name}
                     </span>
                     <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
               </Link>
            ))}
         </div>

         {/* Column 3: Contact & Social */}
         <div className="lg:col-span-1 border-r border-border flex flex-col">
            <div className="flex-1 p-8 border-b border-border">
               <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 block">Contato</span>
               <a href="mailto:tuliorangeldesigner@gmail.com" className="block text-xl font-bold hover:text-accent transition-colors mb-2">tuliorangeldesigner@gmail.com</a>
               <a href={whatsappHref} className="block text-xl font-bold hover:text-accent transition-colors">(41) 98744-8273</a>
            </div>
            
            <div className="flex-1 p-8 border-b border-border">
               <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 block">Localização</span>
               <address className="not-italic text-lg text-muted-foreground">
                  Morretes / PR<br/>
                  Atendimento nacional e projetos remotos.
               </address>
            </div>

            <div className="p-8">
               <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 block">Social</span>
               <div className="grid grid-cols-2 gap-4">
                  {footerLinks.social.map((link) => (
                     <a 
                        key={link.name}
                        href={link.href}
                        onClick={link.href === '#' ? (e) => e.preventDefault() : undefined}
                        className="text-sm hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
                     >
                        {link.name} <ArrowUpRight className="w-3 h-3" />
                     </a>
                  ))}
               </div>
            </div>
         </div>

         {/* Column 4: Big CTA */}
         <div className="lg:col-span-1 p-8 lg:p-12 flex flex-col justify-center items-center text-center bg-foreground/5 hover:bg-accent transition-colors duration-500 group cursor-pointer relative overflow-hidden">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label="Abrir WhatsApp"></a>
            
            {/* Animated Background Text */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-10 pointer-events-none select-none overflow-hidden group-hover:opacity-20 transition-opacity">
               <div className="animate-marquee whitespace-nowrap text-9xl font-black uppercase text-foreground">
                  Let's Talk Let's Talk Let's Talk
               </div>
            </div>

            <div className="relative z-10">
               <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-transform duration-500">
                  <ArrowUpRight className="w-8 h-8 text-foreground group-hover:text-accent transition-colors" />
               </div>
               <h3 className="text-3xl lg:text-4xl font-syne font-black uppercase leading-none mb-4 group-hover:text-accent-foreground transition-colors">
                  Solicitar<br/>Diagnóstico
               </h3>
               <p className="font-mono text-sm text-muted-foreground group-hover:text-accent-foreground/80 transition-colors">
                  Se sua marca parece comum, este é o ponto de virada.
               </p>
            </div>
         </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-border p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-background">
         <p className="text-xs font-mono text-muted-foreground uppercase">
            © 2024 Vértice Studio.
         </p>
         <div className="flex gap-8">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="text-xs font-mono text-muted-foreground uppercase hover:text-accent transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="text-xs font-mono text-muted-foreground uppercase hover:text-accent transition-colors"
            >
              Terms of Service
            </button>
         </div>
      </div>

      {activeLegalModal && (
        <div
          className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-2xl border border-border bg-card p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="font-syne text-2xl md:text-3xl font-bold">
                {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-sm font-mono text-muted-foreground hover:text-foreground"
              >
                FECHAR
              </button>
            </div>

            {activeLegalModal === 'privacy' ? (
              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Na Vértice Studio, coletamos apenas as informações necessárias para contato comercial,
                  diagnóstico estratégico e continuidade de atendimento.
                </p>
                <p>
                  Seus dados são usados para responder solicitações, organizar propostas e melhorar a
                  experiência digital. Não vendemos dados e não compartilhamos informações pessoais com
                  terceiros para fins indevidos.
                </p>
                <p>
                  Se você quiser revisão, atualização ou remoção dos seus dados, basta solicitar pelos canais
                  oficiais de contato.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Os serviços da Vértice Studio são prestados com escopo definido por proposta, com etapas,
                  entregas e prazos acordados para cada projeto.
                </p>
                <p>
                  Todo trabalho é estratégico e personalizado, por isso alterações de escopo, cronograma e
                  prioridades precisam ser formalizadas entre as partes.
                </p>
                <p>
                  Ao contratar, o cliente concorda com as condições comerciais, direitos de uso dos materiais
                  entregues e responsabilidades de cada lado no processo.
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-border flex gap-4">
              <Link
                to={activeLegalModal === 'privacy' ? '/privacy-policy' : '/terms-of-service'}
                className="text-sm font-mono uppercase text-accent hover:underline"
              >
                Ver Página Completa
              </Link>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;






