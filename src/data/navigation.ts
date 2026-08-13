export const navigation = {
  primary: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'Audio Marketing', href: '/services/audio-marketing' },
        { name: 'Video Marketing', href: '/services/video-marketing' },
        { name: 'Digital Marketing', href: '/services/digital-marketing' },
        { name: 'Website Design', href: '/services/website-design' },
        { name: 'Graphic Designing', href: '/services/graphic-designing' },
        { name: 'SEO', href: '/services/seo' },
        { name: 'Branding', href: '/services/branding' },
      ]
    },
    { 
      name: 'Marketing', 
      href: '#',
      dropdown: [
        { name: 'Radio Ads', href: '/marketing/radio-ads' },
        { name: 'IVR', href: '/marketing/ivr' },
        { name: 'Jingles', href: '/marketing/jingles' },
        { name: 'Music Videos', href: '/marketing/music-videos' },
        { name: 'Social Media', href: '/marketing/social-media' },
        { name: 'TV Ads', href: '/marketing/tv-ads' },
        { name: 'Video Ads', href: '/marketing/video-ads' },
      ]
    },
    { name: 'Work', href: '/work' },
    { 
      name: 'Pricing', 
      href: '/pricing',
      dropdown: [
        { name: 'Social Media Content Pricing', href: '/pricing#social-media' },
        { name: 'Music Video Pricing', href: '/pricing#music-video' },
        { name: 'Short Films Pricing', href: '/pricing#short-films' },
        { name: 'Documentary Pricing', href: '/pricing#documentary' },
      ]
    },
    { name: 'Book', href: '/book' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Branding', href: '/services/branding' },
    { name: 'Graphic Design', href: '/services/graphic-design' },
    { name: 'Website Design', href: '/services/website-design' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'SEO', href: '/services/seo' },
    { name: 'Social Media', href: '/services/social-media' },
    { name: 'Video', href: '/services/video' },
    { name: 'Music Video', href: '/services/music-video' },
    { name: 'Audio', href: '/services/audio' },
    { name: 'Radio / TV', href: '/services/radio-tv' },
  ]
};
