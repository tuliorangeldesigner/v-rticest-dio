import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your vision, goals, and audience. Deep research and strategic analysis form the foundation of every project.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Insights transform into actionable plans. We define the approach, set milestones, and align on success metrics.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Ideas take visual form. Our design process is iterative, collaborative, and focused on creating meaningful experiences.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Designs become reality. We build with precision, performance, and scalability as core principles.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'The culmination of our work. We ensure a seamless launch and provide ongoing support for continued success.',
  },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <AnimatedLine delay={0.2}>
            <span className="label text-accent mb-6 block">Our Process</span>
          </AnimatedLine>
          <AnimatedLine delay={0.4}>
            <h2 className="heading-xl">
              A structured approach to exceptional outcomes.
            </h2>
          </AnimatedLine>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border origin-top hidden md:block"
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                  index % 2 === 0 ? '' : 'md:text-right'
                }`}
              >
                {/* Content */}
                <div
                  className={`${
                    index % 2 === 0 ? 'md:pr-12' : 'md:order-2 md:pl-12'
                  } pb-12 md:pb-24`}
                >
                  <span className="heading-display text-secondary/80 mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="heading-md mb-4">{step.title}</h3>
                  <p className="body-md text-muted-foreground max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Dot on timeline */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-accent hidden md:block"
                />

                {/* Empty column for layout */}
                <div className={index % 2 === 0 ? 'md:order-2' : ''} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
