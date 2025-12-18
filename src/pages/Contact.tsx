import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Send, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

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

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    // Simulate API call
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

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8">
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

      {/* Main Content */}
      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <h1 className="heading-xl mb-6">
                Let's create<br />
                something<br />
                <span className="text-accent">extraordinary</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-md">
                Have a project in mind? We'd love to hear about it. 
                Drop us a line and let's start the conversation.
              </p>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">Email</h3>
                  <a href="mailto:hello@studio.design" className="text-lg hover:text-accent transition-colors">
                    hello@studio.design
                  </a>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">Location</h3>
                  <p className="text-lg text-foreground/80">
                    San Francisco, CA<br />
                    Remote Worldwide
                  </p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">Social</h3>
                  <div className="flex gap-4">
                    {['Twitter', 'LinkedIn', 'Dribbble', 'Instagram'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="text-foreground/60 hover:text-foreground transition-colors"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-8">
                    <CheckCircle className="w-10 h-10 text-accent" />
                  </div>
                  <h2 className="text-3xl font-syne font-bold mb-4">Thank you!</h2>
                  <p className="text-foreground/60 mb-8 max-w-sm">
                    Your message has been sent successfully. We'll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`w-full px-0 py-4 bg-transparent border-b-2 transition-colors focus:outline-none ${
                        errors.name 
                          ? 'border-destructive focus:border-destructive' 
                          : 'border-foreground/10 focus:border-foreground'
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
                      className={`w-full px-0 py-4 bg-transparent border-b-2 transition-colors focus:outline-none ${
                        errors.email 
                          ? 'border-destructive focus:border-destructive' 
                          : 'border-foreground/10 focus:border-foreground'
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
                      className={`w-full px-0 py-4 bg-transparent border-b-2 transition-colors focus:outline-none ${
                        errors.company 
                          ? 'border-destructive focus:border-destructive' 
                          : 'border-foreground/10 focus:border-foreground'
                      }`}
                      placeholder="Your company (optional)"
                    />
                    {errors.company && (
                      <p className="mt-2 text-sm text-destructive">{errors.company.message}</p>
                    )}
                  </div>

                  {/* Budget Field */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      {...register('budget')}
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-foreground/10 focus:border-foreground transition-colors focus:outline-none appearance-none cursor-pointer"
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
                      className={`w-full px-0 py-4 bg-transparent border-b-2 transition-colors focus:outline-none resize-none ${
                        errors.message 
                          ? 'border-destructive focus:border-destructive' 
                          : 'border-foreground/10 focus:border-foreground'
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
                    className="w-full mt-8 py-5 bg-foreground text-background font-medium text-lg rounded-full flex items-center justify-center gap-3 hover:bg-accent transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-syne font-bold">STUDIO<span className="text-accent">.</span></span>
          <span className="text-sm text-foreground/50">© 2024 All rights reserved.</span>
        </div>
      </footer>
      </div>
    </PageTransition>
  );
};

export default Contact;
