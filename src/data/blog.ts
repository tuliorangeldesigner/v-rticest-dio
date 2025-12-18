export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'future-of-brand-identity',
    title: 'The Future of Brand Identity in a Digital-First World',
    excerpt: 'As digital touchpoints multiply, brands must evolve their identity systems to remain cohesive and memorable across every platform.',
    content: [
      'The landscape of brand identity has fundamentally shifted. What once lived primarily in print—business cards, letterheads, signage—now must perform across an ever-expanding digital ecosystem. From social media avatars to app icons, from website animations to virtual reality environments, modern brands face unprecedented challenges in maintaining coherence.',
      'This evolution demands a new approach to identity design. Static logos give way to dynamic systems. Fixed color palettes expand to accommodate dark modes and accessibility requirements. Typography must perform across countless screen sizes and resolutions.',
      'The most successful brands of tomorrow will embrace flexibility without sacrificing recognition. They will build identity systems that can adapt to contexts we have not yet imagined, while maintaining the emotional core that connects them to their audiences.',
      'At Studio, we approach every brand project with this future in mind. We create not just logos, but comprehensive systems designed to evolve. We establish principles rather than rigid rules, empowering brands to grow while staying true to their essence.',
      'The future belongs to brands that can be everywhere while feeling like themselves. The question is no longer whether your brand can adapt—it is whether it was designed to.',
    ],
    category: 'Branding',
    author: {
      name: 'Alexandra Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    date: 'December 15, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 'psychology-of-color',
    title: 'The Psychology of Color in Digital Design',
    excerpt: 'Understanding how color influences user behavior and emotional response is crucial for creating effective digital experiences.',
    content: [
      'Color is perhaps the most immediate and visceral element of design. Before users read a single word or interact with any element, color has already begun shaping their perception and emotional response.',
      'In digital design, color choices carry even more weight. Screen-based experiences intensify color perception, and the right palette can dramatically influence user behavior—from click-through rates to time on page to conversion rates.',
      'Research consistently shows that color can increase brand recognition by up to 80%. It affects readability, guides attention, and creates emotional associations that linger long after users leave your site.',
      'But effective use of color goes beyond picking a nice palette. It requires understanding cultural contexts, accessibility requirements, and the specific goals of each project. A color that works for a luxury brand might fail completely for a healthcare application.',
      'The key is intentionality. Every color choice should serve a purpose, whether that is establishing hierarchy, creating emotional resonance, or ensuring accessibility for users with visual impairments.',
    ],
    category: 'Design',
    author: {
      name: 'Sofia Rodriguez',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    },
    date: 'December 10, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'motion-design-principles',
    title: 'Motion Design Principles for Web Experiences',
    excerpt: 'Thoughtful animation can transform a good interface into an exceptional one. Learn the principles that guide effective motion design.',
    content: [
      'Motion is the secret language of digital interfaces. When done well, it guides users effortlessly through experiences, provides feedback, and creates moments of delight. When done poorly, it frustrates and distracts.',
      'The foundation of effective motion design lies in purpose. Every animation should answer the question: what problem does this solve? Motion can show relationships between elements, indicate state changes, direct attention, and provide continuity during transitions.',
      'Timing is everything. Animations that are too fast feel jarring; too slow and they become annoying. The sweet spot typically falls between 200-500 milliseconds for most UI animations, though this varies based on the size and complexity of the moving elements.',
      'Easing—the acceleration and deceleration of motion—is what separates amateur animation from professional work. Natural motion rarely moves at a constant speed. Elements should ease in and out, mimicking the physics of the real world.',
      'Finally, restraint is crucial. The best motion design often goes unnoticed because it feels so natural. If users are consciously aware of your animations, you may have overdone it.',
    ],
    category: 'Design',
    author: {
      name: 'Emma Thompson',
      role: 'Motion Designer',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    date: 'December 5, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'ai-design-future',
    title: 'AI and the Future of Design: Collaboration, Not Replacement',
    excerpt: 'Artificial intelligence is transforming creative work. Here is why designers should embrace it as a powerful collaborator.',
    content: [
      'The rise of AI-powered design tools has sparked intense debate in our industry. Will AI replace designers? Is the craft of design being diminished? These fears, while understandable, miss the larger picture.',
      'AI is not replacing creativity—it is amplifying it. Tools that can generate variations, automate repetitive tasks, and explore possibilities at unprecedented speed are giving designers more time to focus on what matters most: strategic thinking, emotional resonance, and human connection.',
      'The designers who will thrive in this new landscape are those who view AI as a collaborator rather than a threat. They will use these tools to explore more options, iterate faster, and push their creative boundaries further than ever before.',
      'But AI cannot replicate the human elements that make design truly powerful: understanding cultural nuance, empathizing with users, making intuitive leaps that logic alone cannot justify. These remain firmly in the human domain.',
      'The future of design is not human versus machine. It is human plus machine, with each contributing their unique strengths to create work that neither could achieve alone.',
    ],
    category: 'Trends',
    author: {
      name: 'Marcus Williams',
      role: 'Head of Strategy',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    date: 'November 28, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 'minimalism-in-ux',
    title: 'The Art of Minimalism in UX Design',
    excerpt: 'Less is more, but achieving effective minimalism requires discipline, intention, and deep understanding of user needs.',
    content: [
      'Minimalism in design is often misunderstood. It is not about removing elements until nothing is left—it is about removing everything that does not serve a purpose. The goal is clarity, not emptiness.',
      'Effective minimalist design requires deep understanding of user needs. You cannot simplify what you do not understand. Before stripping away elements, you must know which ones are essential and why.',
      'White space is not wasted space. It is a powerful design element that creates hierarchy, improves readability, and gives users room to breathe. The most successful minimal interfaces use space as deliberately as they use content.',
      'Typography becomes critical in minimal design. With fewer elements competing for attention, every typographic choice is amplified. Size, weight, spacing—all must be considered with care.',
      'True minimalism is harder than maximalism. It requires the discipline to resist adding that extra feature, the confidence to let content speak for itself, and the skill to create interest without clutter.',
    ],
    category: 'Design',
    author: {
      name: 'James Park',
      role: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    date: 'November 20, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
  {
    id: 'building-design-systems',
    title: 'Building Design Systems That Scale',
    excerpt: 'A well-crafted design system can transform how teams work. Here are the principles that make systems successful.',
    content: [
      'Design systems have moved from nice-to-have to essential for any organization building digital products at scale. But many systems fail to deliver on their promise. They become outdated, ignored, or too rigid to accommodate real-world needs.',
      'The key to a successful design system is understanding that it is a product, not a project. It requires ongoing investment, maintenance, and evolution. Systems that are built once and forgotten quickly become irrelevant.',
      'Start with principles, not components. Before building a single button, establish the foundational values that will guide every decision. These principles become the DNA of your system, ensuring consistency even as individual elements evolve.',
      'Documentation is just as important as the components themselves. A beautiful component library is useless if developers cannot find what they need or understand how to use it correctly.',
      'Finally, build for adoption. The most technically perfect system fails if no one uses it. Listen to your users—the designers and developers who work with your system daily—and iterate based on their feedback.',
    ],
    category: 'Trends',
    author: {
      name: 'David Kim',
      role: 'Senior Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    },
    date: 'November 12, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
    featured: false,
  },
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const getRelatedPosts = (currentId: string, category: string): BlogPost[] => {
  return blogPosts
    .filter((post) => post.id !== currentId && post.category === category)
    .slice(0, 2);
};
