import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'mangrove-honey-initiative',
    title: 'Mangrove Honey Initiative',
    description: 'A sustainable apiculture project utilizing restored mangrove forests for high-value medicinal honey.',
    category: 'Mariculture',
    siteSlug: 'msichoke-seaweed-growers',
    maturity: 'Pilot',
    featured: true,
    image: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?q=80&w=2081&auto=format&fit=crop',
    impactMetrics: [
      { label: 'Bee Colonies', value: '45' },
      { label: 'Monthly Income', value: '+$320', unit: 'per household' }
    ],
    innovationSummary: 'Creating an economic incentive for mangrove protection through non-extractive forest use.',
    longDescription: 'By introducing stingless bee colonies to restored mangrove zones, we have created a secondary income stream for seaweed growers that directly depends on the health of the forest canopy.'
  },
  {
    slug: 'seaweed-bio-packaging',
    title: 'Seaweed Bio-Packaging',
    description: 'Transforming waste seaweed biomass into biodegradable alternatives for single-use plastics.',
    category: 'Bio-Materials',
    siteSlug: 'msichoke-seaweed-growers',
    maturity: 'Scaling',
    image: 'https://images.unsplash.com/photo-1584444262846-e2716db1294b?q=80&w=2070&auto=format&fit=crop',
    impactMetrics: [
      { label: 'Waste Diverted', value: '12', unit: 'tons/year' },
      { label: 'Plastic Reduction', value: '40%' }
    ],
    innovationSummary: 'Utilizing low-grade seaweed that is currently discarded to create high-value industrial materials.',
    longDescription: 'Our proprietary processing method extracts alginates from local seaweed varieties to create a flexible, compostable film suitable for food packaging.'
  },
  {
    slug: 'urban-pollinator-corridors',
    title: 'Urban Pollinator Corridors',
    description: 'Connecting fragmented city parks through high-biodiversity pocket gardens and green roofs.',
    category: 'Urban',
    siteSlug: 'london-urban-canopy',
    maturity: 'Systemic',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2064&auto=format&fit=crop',
    impactMetrics: [
      { label: 'Species Richness', value: '+42%' },
      { label: 'Temperature reduction', value: '-2.4°C', unit: 'local peak' }
    ],
    innovationSummary: 'Reversing the "Island Effect" in urban biodiversity through micro-restoration networks.',
    longDescription: 'By standardizing the "Botanical Pocket" model, we have enabled private citizens to contribute to a city-wide biodiversity grid.'
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
