import { motion } from 'framer-motion';
import { Shield, Award, Lock, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'SSL Secured',
    description: '256-bit encryption'
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Design excellence'
  },
  {
    icon: Lock,
    title: 'Data Protected',
    description: 'GDPR compliant'
  },
  {
    icon: CheckCircle,
    title: 'Verified Agency',
    description: 'Trusted partner'
  }
];

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid';
  className?: string;
}

const TrustBadges = ({ variant = 'horizontal', className = '' }: TrustBadgesProps) => {
  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-transparent group-hover:border-primary transition-colors duration-300" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-transparent group-hover:border-primary transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-transparent group-hover:border-primary transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-transparent group-hover:border-primary transition-colors duration-300" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-syne font-bold text-foreground text-sm mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-muted-foreground font-mono">
                {badge.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -3, scale: 1.02 }}
          className="group relative flex items-center gap-4 p-4 border border-transparent hover:border-primary/20 transition-all duration-300"
        >
          {/* Corner accents on hover */}
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-transparent group-hover:border-primary/40 transition-colors duration-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-transparent group-hover:border-primary/40 transition-colors duration-300" />
          
          <div className="w-10 h-10 border border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
            <badge.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-syne font-bold text-foreground text-sm">
              {badge.title}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              {badge.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustBadges;