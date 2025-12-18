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
            className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="p-3 rounded-xl bg-primary/10 mb-3">
              <badge.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-display font-semibold text-foreground text-sm">
              {badge.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              {badge.description}
            </p>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex items-center gap-3 group"
        >
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <badge.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-display font-medium text-foreground text-sm">
              {badge.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {badge.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustBadges;
