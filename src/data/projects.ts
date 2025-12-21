export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  heroImage: string;
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  gallery: string[];
  nextProject: string;
  prevProject: string;
  keyTakeaways?: string;
}

export const projects: Project[] = [
  {
    id: 'luminary',
    title: 'Luminary',
    category: 'Brand Identity',
    year: '2024',
    client: 'Luminary Tech',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'A complete brand transformation for a tech startup revolutionizing the renewable energy sector. We crafted a visual identity that speaks to innovation, sustainability, and forward-thinking leadership.',
    challenge: 'Luminary Tech approached us with a complex challenge: they needed a brand identity that could communicate cutting-edge technology while remaining approachable and environmentally conscious. Their existing brand felt dated and failed to convey the revolutionary nature of their solar energy solutions.',
    solution: 'We developed a comprehensive visual language built around the concept of light and energy. The new identity features a dynamic logo that represents both a sun and a light bulb—a visual metaphor for their mission. The color palette draws from sunrise gradients, creating warmth and optimism. Every touchpoint, from business cards to their digital presence, was redesigned to create a cohesive and memorable brand experience.',
    results: [
      '340% increase in brand recognition',
      '85% positive sentiment in market research',
      'Featured in Design Week Awards',
      '$2.4M in new investment following rebrand',
    ],
    services: ['Brand Strategy', 'Visual Identity', 'Logo Design', 'Brand Guidelines', 'Collateral Design'],
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'ethereal',
    prevProject: 'apex',
    keyTakeaways: 'Through this project, we learned that balancing technical innovation with human warmth is crucial for adoption in the renewable sector. The most successful brand elements were those that simplified complex technologies into relatable visual metaphors.',
  },
  {
    id: 'ethereal',
    title: 'Ethereal',
    category: 'Web Design',
    year: '2024',
    client: 'Ethereal Design Co.',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    description: 'An immersive digital experience for a luxury interior design studio. We created a website that serves as a portfolio of their work while embodying the same elegance and sophistication they bring to their projects.',
    challenge: 'Ethereal Design Co. needed a website that could showcase their high-end interior design work without overwhelming the visual content. The challenge was creating an interface that was both invisible and memorable—allowing their stunning portfolio to shine while maintaining a distinct digital identity.',
    solution: 'We designed a minimal yet sophisticated web experience with micro-interactions that reveal content gracefully. Large-format imagery is presented in a carefully choreographed sequence, with subtle animations that guide visitors through their portfolio. The navigation is intuitive yet unobtrusive, and the overall experience mirrors the refined elegance of their physical spaces.',
    results: [
      '420% increase in time on site',
      '65% reduction in bounce rate',
      '180% increase in inquiry conversions',
      'Awwwards Site of the Day',
    ],
    services: ['UX Strategy', 'Web Design', 'Motion Design', 'Frontend Development', 'CMS Integration'],
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'zenith',
    prevProject: 'luminary',
    keyTakeaways: 'Restraint is a powerful design tool. By stripping away non-essential UI elements, we allowed the content to take center stage, proving that in luxury markets, less truly is more. The pacing of information reveal is just as important as the information itself.',
  },
  {
    id: 'zenith',
    title: 'Zenith',
    category: 'Digital Campaign',
    year: '2023',
    client: 'Zenith Athletics',
    heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    description: 'A multi-platform digital campaign for a premium athletic wear brand launching their most ambitious product line yet. We created a campaign that captured the spirit of human potential and peak performance.',
    challenge: 'Zenith Athletics was launching a revolutionary line of performance wear and needed a campaign that could compete with industry giants. They wanted to establish themselves as a premium alternative while connecting with a younger, digitally-native audience. The campaign needed to work across social media, web, and digital advertising.',
    solution: 'We developed "Beyond Limits"—a campaign centered on authentic athlete stories rather than product features. The visual language combined dynamic motion photography with bold typography. We created a content ecosystem that included long-form documentary content, snackable social media moments, and interactive digital experiences that let users explore the technology behind the products.',
    results: [
      '12M+ organic impressions',
      '280% ROI on ad spend',
      '45K new email subscribers',
      'Product line sold out in 72 hours',
    ],
    services: ['Campaign Strategy', 'Creative Direction', 'Content Production', 'Social Media', 'Digital Advertising'],
    gallery: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'cascade',
    prevProject: 'ethereal',
    keyTakeaways: 'Authenticity resonates more than polish. The campaign success was driven by real stories that connected emotionally, demonstrating that in the crowded athletic market, brands must stand for a lifestyle and set of values, not just product specifications.',
  },
  {
    id: 'cascade',
    title: 'Cascade',
    category: 'Product Design',
    year: '2023',
    client: 'Cascade Ventures',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    description: 'A complete product design overhaul for a fintech platform serving over 2 million users. We reimagined their entire user experience to make complex financial data accessible and actionable.',
    challenge: 'Cascade Ventures had grown rapidly but their product interface hadn\'t kept pace. Users were struggling with a complex interface that made simple tasks difficult. The platform needed to handle sophisticated financial data while remaining intuitive for users of all experience levels. Additionally, the redesign needed to happen without disrupting existing user workflows.',
    solution: 'We conducted extensive user research to understand pain points and develop a design system that could scale with their growing product. The new interface introduces progressive disclosure—showing complexity only when needed. We created a modular component library that maintains consistency while allowing for customization. The dashboard was completely reimagined with data visualization that turns complex information into actionable insights.',
    results: [
      '52% reduction in support tickets',
      '4.8/5 average user satisfaction',
      '38% increase in daily active users',
      '22% improvement in task completion',
    ],
    services: ['User Research', 'UX Design', 'UI Design', 'Design System', 'Prototyping'],
    gallery: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'nexus',
    prevProject: 'zenith',
    keyTakeaways: 'Complexity is not the enemy; confusion is. Even the most data-heavy platforms can feel simple if information architecture is prioritized. Progressive disclosure is essential for building confidence in users dealing with sensitive financial operations.',
  },
  {
    id: 'nexus',
    title: 'Nexus',
    category: 'Mobile App',
    year: '2022',
    client: 'Nexus Health',
    heroImage: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80',
    description: 'A holistic health management app connecting patients with specialists. We designed an ecosystem that prioritizes empathy, accessibility, and seamless communication.',
    challenge: 'Nexus Health aimed to bridge the gap between patients and specialized care providers. The existing fragmented systems caused frustration and delays. The challenge was to create a unified platform that felt personal and caring, not clinical and cold, while managing strict data privacy and complex scheduling logistics.',
    solution: 'We adopted a "human-centric" design philosophy. The interface uses soft, calming colors and rounded typography to reduce anxiety. We simplified the booking flow into a conversational interface. Key features include a secure messaging system, integrated health records, and a personalized wellness dashboard. The design system ensures accessibility for users with varying digital literacy levels.',
    results: [
      '30% reduction in appointment no-shows',
      '92% patient satisfaction score',
      '15k+ active monthly users within 6 months',
      'Winner of Best Health App Design 2022',
    ],
    services: ['Mobile App Design', 'User Research', 'Interaction Design', 'Visual Identity', 'Usability Testing'],
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2187d80a0003?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'apex',
    prevProject: 'cascade',
    keyTakeaways: 'Empathy must be baked into the design process, not just the outcome. By involving patients and doctors early in the prototyping phase, we uncovered critical friction points that standard usability testing would have missed.',
  },
  {
    id: 'apex',
    title: 'Apex',
    category: 'Fintech Dashboard',
    year: '2023',
    client: 'Apex Capital',
    heroImage: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=80',
    description: 'A high-frequency trading dashboard for institutional investors. We engineered a data-dense interface that optimizes for speed, clarity, and decision-making under pressure.',
    challenge: 'Apex Capital needed a trading terminal that could display thousands of real-time data points without overwhelming traders. The previous system was cluttered and slow. Our goal was to reduce cognitive load while maximizing information density, ensuring traders could execute split-second decisions with confidence.',
    solution: 'We utilized a modular grid system with a dark-mode-first approach to reduce eye strain during long trading sessions. Critical alerts are highlighted using a distinct, color-coded system that cuts through the noise. We implemented customizable workspaces allowing traders to tailor the layout to their specific strategies. Performance optimization was paramount, ensuring zero-latency updates.',
    results: [
      '15% increase in trade execution speed',
      '40% reduction in error rates',
      'Adopted by 3 major hedge funds',
      'Top rated platform for institutional UX',
    ],
    services: ['Dashboard Design', 'Data Visualization', 'UX/UI Design', 'Frontend Architecture', 'Performance Optimization'],
    gallery: [
      'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    nextProject: 'luminary',
    prevProject: 'nexus',
    keyTakeaways: 'In high-stakes environments, clarity is the ultimate luxury. The success of Apex relied on a rigorous "removal" process—constantly asking what could be taken away rather than what could be added, to focus entirely on the signal, not the noise.',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getProjectIndex = (id: string): number => {
  return projects.findIndex((p) => p.id === id);
};
