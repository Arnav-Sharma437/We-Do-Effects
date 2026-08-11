export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'Brand & Design' | 'Digital Growth' | 'Media & Production';
  shortDescription: string;
  description: string;
  outcome: string;
  process: string[];
  projects: string[];
  startingPrice?: number | string;
  cta: string;
}

export const services: Service[] = [
  // Brand & Design
  {
    id: 'branding',
    name: 'Branding',
    slug: 'branding',
    category: 'Brand & Design',
    shortDescription: 'Build a distinctive identity that resonates with your audience.',
    description: 'We create cohesive brand identities that communicate your core values and stand out in the market.',
    outcome: 'A memorable, cohesive brand identity.',
    process: ['Discovery', 'Strategy', 'Design', 'Refinement', 'Delivery'],
    projects: ['brand-x'],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Branding',
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    slug: 'graphic-design',
    category: 'Brand & Design',
    shortDescription: 'Compelling visuals for every touchpoint.',
    description: 'From print to digital, we design stunning visuals that capture attention and communicate your message clearly.',
    outcome: 'High-quality visual assets that elevate your communications.',
    process: ['Briefing', 'Concept', 'Design', 'Review', 'Final Delivery'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Graphic Design',
  },
  {
    id: 'website-design',
    name: 'Website Design',
    slug: 'website-design',
    category: 'Brand & Design',
    shortDescription: 'User-centric, high-performance web experiences.',
    description: 'We design and develop custom websites focused on user experience, aesthetics, and conversion.',
    outcome: 'A modern, responsive, and high-converting website.',
    process: ['UX Strategy', 'UI Design', 'Development', 'Testing', 'Launch'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Website Design',
  },
  
  // Digital Growth
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    category: 'Digital Growth',
    shortDescription: 'Data-driven campaigns to grow your audience.',
    description: 'Strategic digital marketing that connects your brand with the right audience at the right time.',
    outcome: 'Increased visibility, engagement, and conversions.',
    process: ['Audit', 'Strategy', 'Execution', 'Optimization', 'Reporting'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Digital Marketing',
  },
  {
    id: 'seo',
    name: 'SEO',
    slug: 'seo',
    category: 'Digital Growth',
    shortDescription: 'Improve your search visibility and organic traffic.',
    description: 'Comprehensive technical and content SEO strategies to help you rank higher on search engines.',
    outcome: 'Sustainable organic traffic growth.',
    process: ['Technical Audit', 'Keyword Research', 'On-Page Optimization', 'Link Building', 'Monitoring'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore SEO',
  },
  {
    id: 'social-media',
    name: 'Social Media',
    slug: 'social-media',
    category: 'Digital Growth',
    shortDescription: 'Engaging content and community management.',
    description: 'We help you build an active, loyal community through strategic content and engagement on social platforms.',
    outcome: 'A strong, engaged social media presence.',
    process: ['Audience Analysis', 'Content Strategy', 'Creation', 'Community Management', 'Analytics'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Social Media',
  },

  // Media & Production
  {
    id: 'video',
    name: 'Video',
    slug: 'video',
    category: 'Media & Production',
    shortDescription: 'Cinematic video production for your brand.',
    description: 'High-quality video production from concept to final cut, telling your story visually.',
    outcome: 'Compelling video content that captivates audiences.',
    process: ['Pre-production', 'Shooting', 'Editing', 'Color Grading', 'Delivery'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Video',
  },
  {
    id: 'music-video',
    name: 'Music Video',
    slug: 'music-video',
    category: 'Media & Production',
    shortDescription: 'Creative visual treatments for your music.',
    description: 'We bring your music to life with stunning, creative music video production.',
    outcome: 'A visually striking music video that enhances your track.',
    process: ['Treatment', 'Pre-production', 'Production', 'Post-production', 'Final Master'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Music Video',
  },
  {
    id: 'audio',
    name: 'Audio',
    slug: 'audio',
    category: 'Media & Production',
    shortDescription: 'Professional audio production and engineering.',
    description: 'Crystal clear audio recording, mixing, and mastering services.',
    outcome: 'Professional-grade audio ready for distribution.',
    process: ['Recording', 'Editing', 'Mixing', 'Mastering', 'Delivery'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Audio',
  },
  {
    id: 'radio-tv',
    name: 'Radio / TV',
    slug: 'radio-tv',
    category: 'Media & Production',
    shortDescription: 'Broadcast-ready commercial production.',
    description: 'High-end production for radio and television commercials designed for broadcast standards.',
    outcome: 'Broadcast-compliant media ready for the airwaves.',
    process: ['Scripting', 'Casting', 'Production', 'Post-production', 'Broadcast Delivery'],
    projects: [],
    startingPrice: 'Pricing available on request',
    cta: 'Explore Radio / TV',
  }
];
