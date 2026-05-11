import { LearningSite } from '@/types/learning-site';

export const learningSites: LearningSite[] = [
  {
    slug: 'msichoke-seaweed-growers',
    name: 'Msichoke Seaweed Growers',
    location: 'Mlingotini, Bagamoyo, Tanzania',
    founded: '2009',
    category: 'Coastal Restoration & Mariculture',
    leadPartners: ['Mwajuma Masaiganah', 'Rose Lyimo'],
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop',
    accentImage: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop',
    visionEyebrow: 'Mlingotini Coastal Initiative',
    visionStatement: 'Restoring the delicate balance between coastal livelihoods and mangrove ecosystems through sustainable mariculture.',
    challenges: {
      title: 'The Challenge of Coastal Erosion',
      description: 'The Mlingotini coastline has faced accelerating erosion due to mangrove deforestation and rising sea levels. Traditional fishing practices were no longer sustainable as fish stocks declined, forcing the community to seek alternative economic inventions.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop'
    },
    initiatives: [
      {
        title: 'Mangrove Reforestation',
        description: 'Planting over 50,000 mangrove saplings to stabilize the shoreline and create nursery grounds for marine life.'
      },
      {
        title: 'Deep Sea Seaweed Farming',
        description: 'Moving seaweed cultivation to deeper, cooler waters to prevent crop loss from rising surface temperatures.'
      }
    ],
    marketStrategies: {
      title: 'Economic Inventions',
      description: 'Transforming seaweed from a raw commodity into value-added products for global cosmetic and culinary markets.',
      strategies: [
        'Direct-to-market distribution channels',
        'Communal ownership of processing equipment',
        'Certification of regenerative coastal practices'
      ]
    },
    impactData: {
      ecological: [
        { label: 'Mangrove Coverage', value: '+132%', description: 'Increase in forest density since 2014', trend: 'up' },
        { label: 'Tree Survival Rate', value: '89%', description: 'Survival of new saplings in tidal zones' }
      ],
      community: [
        { label: 'Household Income', value: '+161%', description: 'Average increase for collective members', trend: 'up' },
        { label: 'Women in Leadership', value: '75%', description: 'Percentage of site management roles held by women' }
      ]
    },
    futureGoals: 'To establish a regional training hub for other coastal communities in East Africa, scaling the Msichoke model across the Swahili coast.',
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop'
    ]
  }
];

export function getLearningSite(slug: string): LearningSite | undefined {
  return learningSites.find(site => site.slug === slug);
}
