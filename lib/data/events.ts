import { BarbetsEvent } from '@/types/narrative';

export const events: BarbetsEvent[] = [
  {
    slug: 'invention-convention-2026',
    title: 'Invention Convention 2026',
    description: 'Our annual showcase of systemic breakthroughs in ecological restoration and localized manufacturing.',
    date: 'September 15, 2026',
    time: '09:00 AM - 06:00 PM',
    location: 'Zanzibar Innovation Lab',
    type: 'Convention',
    image: 'https://images.unsplash.com/photo-1599059021750-8de994966601?q=80&w=2075&auto=format&fit=crop',
    registrationStatus: 'Open'
  },
  {
    slug: 'coastal-restoration-summit',
    title: 'Coastal Restoration Summit',
    description: 'A deep-dive technical workshop on mariculture and coral regeneration protocols.',
    date: 'June 20, 2026',
    time: '10:00 AM - 04:00 PM',
    location: 'Msichoke Learning Site',
    type: 'Summit',
    siteSlug: 'msichoke-seaweed-growers',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
    registrationStatus: 'Waitlist'
  }
];
