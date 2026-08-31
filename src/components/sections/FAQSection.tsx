import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, HelpCircle } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getWhatsAppLink } from '@/lib/whatsapp';

const faqs = [
  {
    question: 'O que exatamente a TR Designer entrega?',
    answer:
      'Criamos branding estratégico, sites de alta conversão e criativos visuais para marcas que querem parecer maiores, vender melhor e parar de disputar atenção como amadoras.',
  },
  {
    question: 'Vocês fazem só o design ou também desenvolvem o site?',
    answer:
      'Depende do projeto. Podemos estruturar a parte visual, a experiência da página e também conduzir a criação do site completo, com foco em clareza, percepção de valor e conversão.',
  },
  {
    question: 'E se minha marca ainda não tiver identidade visual?',
    answer:
      'Melhor ainda. Antes de desenhar qualquer tela, entendemos o posicionamento, o público, a oferta e a percepção que sua marca precisa construir. Site bonito sem identidade forte vira vitrine sem autoridade.',
  },
  {
    question: 'Quanto tempo leva para criar um projeto?',
    answer:
      'O prazo depende do tamanho do projeto, quantidade de páginas, nível de estratégia e materiais disponíveis. Depois do primeiro contato, avaliamos o cenário e enviamos uma previsão realista de entrega.',
  },
  {
    question: 'Como funciona o processo depois que eu entro em contato?',
    answer:
      'Você envia sua demanda, analisamos o momento da sua marca e entendemos o que precisa ser criado ou reconstruído. Depois disso, montamos uma proposta com escopo, prazo, investimento e próximos passos.',
  },
  {
    question: 'Posso pedir ajustes durante o projeto?',
    answer:
      'Sim. O processo inclui alinhamentos e revisões dentro do escopo combinado. A ideia não é apenas “fazer bonito”, mas chegar em uma solução visual que faça sentido para o posicionamento e para o objetivo comercial.',
  },
  {
    question: 'Tem suporte depois da entrega?',
    answer:
      'Sim, quando previsto na proposta. Podemos orientar ajustes, manutenção, atualizações ou próximos materiais para manter a presença da marca consistente depois que o projeto for entregue.',
  },
];

export const FAQSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const whatsappHref = getWhatsAppLink();

  return (
    <section ref={sectionRef} className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute left-0 right-0 h-px bg-foreground/5"
            style={{ top: `${20 * (index + 1)}%` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.08, duration: 1.1 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
        animate={isInView ? { opacity: 0.04, rotate: 0, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute -right-10 top-16 pointer-events-none"
      >
        <HelpCircle className="w-56 h-56 md:w-72 md:h-72 text-foreground" strokeWidth={1} />
      </motion.div>

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-10 md:mb-12"
        >
          <span className="text-sm font-mono text-accent">06</span>
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-mono text-muted-foreground tracking-wider">FAQ</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] max-w-2xl"
            >
              Dúvidas antes de <span className="text-accent">transformar sua marca em presença</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-8 border border-accent/30 bg-accent/5 p-6 md:mt-10 md:p-8"
            >
              <p className="font-syne text-2xl font-bold leading-tight md:text-3xl">
                Ainda com dúvida? Provavelmente sua marca também está deixando dinheiro na mesa.
              </p>
              <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                Vamos analisar o que precisa ser criado, ajustado ou reconstruído.
              </p>

              <div className="mt-7">
                <MagneticButton>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background md:text-base"
                  >
                    <span className="relative z-10">Solicitar diagnóstico</span>
                    <motion.div
                      className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/20"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 origin-bottom bg-accent"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    />
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-border/60 bg-card/70 shadow-xl shadow-background/20"
            >
              <Accordion type="single" collapsible className="divide-y divide-border/60">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`} className="border-b-0">
                    <AccordionTrigger className="px-5 py-5 text-left font-syne text-base md:px-7 md:py-6 md:text-lg hover:no-underline hover:text-accent">
                      <span className="pr-5">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-6 text-base leading-relaxed text-muted-foreground md:px-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
