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
  },
  {
    slug: 'arboretum-kajokoby',
    name: "Arboretum KaJok'Oby",
    location: "Kisumu, Kenya (Seme, Kajulu)",
    founded: "2018",
    category: "Environmental Conservation & Wellness",
    leadPartners: ["Hilda Obyerodhyambo", "Oby Obyerodhyambo"],
    heroImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
    accentImage: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80",
    visionEyebrow: "Kenya's 2nd Arboretum",
    visionStatement: "A sanctuary for environmental resilience and serenity, preserving native plant life and providing a peaceful retreat.",
    challenges: {
      title: "Public Footfall vs. Conservation",
      description: "Maintaining a pristine environment while increasing public footfall for ecotherapy presents an ongoing challenge. We are also continuously adapting our native plant cultivation methods to combat the changing climate patterns in the Seme region.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
    },
    initiatives: [
      {
        title: "Forest Bathing & Tree Therapy",
        description: "Guided sessions on the grounds cultivated to provide a tranquil environment where visitors can immerse themselves in nature to reduce stress and improve mental well-being."
      },
      {
        title: "Bird Watching Tours",
        description: "Because of its rich plant life, the arboretum serves as a natural habitat for local bird species. We offer guided tours for enthusiasts."
      }
    ],
    marketStrategies: {
      title: "Wellness as Conservation",
      description: "Monetizing wellness experiences to fund the ongoing preservation of indigenous tree species.",
      strategies: [
        "Specialized week-long forest bathing retreats",
        "Educational bird watching photography workshops",
        "Indigenous sapling sales to local landowners"
      ]
    },
    impactData: {
      ecological: [
        { label: "Endangered Species Supported", value: "50+", description: "Target for endangered indigenous species support", trend: "up" },
        { label: "Bird Species Recorded", value: "120+", description: "Unique species observed on site" }
      ],
      community: [
        { label: "Public Visitors", value: "5,000+", description: "Annual visitors seeking ecotherapy", trend: "up" },
        { label: "Local Jobs Created", value: "12", description: "Permanent positions for site management and guiding" }
      ]
    },
    futureGoals: "Expand the Indigenous Tree Nursery and enhance the bird watching habitats to attract migratory species.",
    gallery: [
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80"
    ]
  }
];

export function getLearningSite(slug: string): LearningSite | undefined {
  return learningSites.find(site => site.slug === slug);
}
