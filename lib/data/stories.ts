import { Story } from '@/types/narrative';

export const stories: Story[] = [
  {
    slug: 'the-seaweed-pioneers',
    title: 'The Seaweed Pioneers',
    subtitle: 'Regenerating the Blue Frontier',
    excerpt: 'How a small group of growers in Msichoke transformed a dying coastline into a thriving bio-economy.',
    content: 'Long-form narrative content about the Msichoke Seaweed Growers...',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
    category: 'Restoration',
    date: 'April 12, 2026',
    readTime: '8 min',
    siteSlug: 'msichoke-seaweed-growers',
    impactMetrics: [
      { label: 'Marine Life Increase', value: '400', unit: '%' },
      { label: 'Carbon Sequestered', value: '12', unit: 'Tons/yr' }
    ]
  },
  {
    slug: 'mangrove-honey-revolution',
    title: 'The Mangrove Honey Revolution',
    subtitle: 'Sweetening the Restoration Agenda',
    excerpt: 'Beekeeping as a primary economic driver for protecting the vital mangrove forests of the delta.',
    content: 'Full story on the integration of apiary and forest protection...',
    image: 'https://images.unsplash.com/photo-1587334206571-3390cfe4a5df?q=80&w=2040&auto=format&fit=crop',
    category: 'Innovation',
    date: 'May 02, 2026',
    readTime: '6 min',
    impactMetrics: [
      { label: 'Forest Protected', value: '120', unit: 'Hectares' },
      { label: 'Farmer Income Boost', value: '65', unit: '%' }
    ]
  }
];
