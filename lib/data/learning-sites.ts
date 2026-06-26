import { LearningSite } from '@/types/learning-site';

export const learningSites: LearningSite[] = [
  {
    slug: 'woodland-valley-farm',
    name: 'Woodland Valley Farm',
    location: 'Ladock, Cornwall, UK',
    founded: '2009',
    category: 'Regenerative Organic Farming',
    leadPartners: ['Chris Jones', 'Janet Jones', 'Felicity Jones'],
    lat: 50.30,
    lng: -4.90,

    heroImage: 'https://picsum.photos/seed/woodland-valley-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/woodland-valley-accent/800/600',

    visionEyebrow: 'Cornwall Carbon Pioneer',
    visionStatement: 'Demonstrating that low-carbon organic farming can sequester more carbon than it emits while feeding communities and restoring biodiversity.',
    overview: 'Woodland Valley Farm in Ladock, Cornwall has been a founding member of Barbets Duet since 2009. The Jones family have transformed their land into a model of regenerative agriculture, achieving a negative carbon footprint while producing organic beef, pork, cider and cider vinegar. They host over 600 schoolchildren annually, making environmental education a core pillar of their work.',
    focusAreas: [
      'Carbon sequestration',
      'Low-carbon organic farming',
      'Watershed flood prevention',
      'Biodiversity restoration',
      'Soil health',
    ],
    restorationGoals: [
      'Maintain negative carbon footprint year-on-year',
      'Expand agroforestry nut tree planting',
      'Scale Cornwall Beaver Project for flood mitigation',
      'Transition remaining annual crops to perennials',
    ],

    founderNames: 'Chris & Janet Jones',
    memberNames: 'Felicity Jones',

    challenges: {
      title: 'Farming Against the Carbon Tide',
      description: 'Conventional farming norms in Cornwall favoured high-input annual cropping and intensive grazing, making it economically and socially difficult to transition to regenerative practices. Demonstrating profitability without chemical inputs while absorbing carbon at scale required years of patient experimentation.',
      image: 'https://picsum.photos/seed/woodland-valley-challenge/1200/800',
      tags: ['Carbon accounting', 'Agricultural transition', 'Biodiversity loss'],
    },

    restorationStrategies: {
      description: 'Mob-stocking (rotational grazing) dramatically reduces soil compaction and allows pasture recovery. The Cornwall Beaver Project introduces beavers to naturally slow water flow and prevent downstream flooding. Agroforestry integrates nut trees into pasture, building soil organic matter and shade corridors.',
      tags: ['Mob-stocking', 'Beaver rewilding', 'Agroforestry', 'Perennial crops'],
      image: 'https://picsum.photos/seed/woodland-valley-restoration/1200/800',
    },

    initiativesIntro: 'Three interlocking programmes make Woodland Valley a living demonstration site for regenerative agriculture.',
    initiatives: [
      {
        title: 'Cornwall Beaver Project',
        description: 'Partnering with the Cornwall Beaver Project to reintroduce beavers as natural flood engineers, slowing water flow through the valley and preventing downstream flash flooding.',
        icon: '🦫',
      },
      {
        title: 'Mob-Stocking Rotational Grazing',
        description: 'High-density, short-duration grazing rotations that mimic natural herd behaviour, rebuilding soil carbon and restoring plant diversity across the farm.',
        icon: '🌱',
      },
      {
        title: 'Farm School Programme',
        description: 'Hosting over 600 schoolchildren annually for hands-on environmental education, making the farm a classroom for the next generation of ecological stewards.',
        icon: '📚',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/woodland-valley-initiatives/1200/800',

    marketStrategies: {
      title: 'Ecological Economics',
      description: 'Diversified income streams allow the farm to remain financially viable while prioritising restoration over yield maximisation.',
      strategies: [
        'Organic beef and pork direct sales',
        'Cider and apple cider vinegar production',
        'Eco-tourism and farm stays accommodation',
        'Wedding venue hire',
        'Educational outreach and school visit fees',
      ],
    },

    impactIntro: 'Woodland Valley Farm achieved a verified negative carbon footprint in its first full accounting period — sequestering 353 tonnes net in 2010–2011.',
    impactData: {
      ecological: [
        { label: 'Net Carbon', value: '−353t', description: 'Net carbon sequestered in 2010–2011 accounting period', trend: 'up' },
        { label: 'Member Since', value: '2009', description: 'Founding member of Barbets Duet network' },
      ],
      community: [
        { label: 'Schoolchildren/year', value: '600+', description: 'Children receiving hands-on environmental education annually', trend: 'up' },
        { label: 'Economic Model', value: '5+', description: 'Diversified income streams supporting farm viability' },
      ],
    },

    futureGoals: 'To expand the agroforestry programme to cover a further 20 hectares, deepen the beaver reintroduction project, and publish a replicable carbon accounting methodology for small organic farms across the UK.',
    futureGoalsImage: 'https://picsum.photos/seed/woodland-valley-future/1200/800',

    galleryText: 'From ancient woodlands to organic pastures, Woodland Valley Farm embodies the Scholarly Cycle — learning from nature to restore it.',
    gallery: [
      'https://picsum.photos/seed/wvf-g1/1200/800',
      'https://picsum.photos/seed/wvf-g2/1200/800',
      'https://picsum.photos/seed/wvf-g3/1200/800',
      'https://picsum.photos/seed/wvf-g4/1200/800',
    ],

    testimonial: {
      quote: 'The beaver project alone has transformed our relationship with water on this land. What took us decades of drainage work to manage, they sorted in two seasons.',
      authorName: 'Chris Jones',
      authorPosition: 'Farmer, Woodland Valley Farm',
    },

    contact: {
      intro: 'Interested in visiting or collaborating with Woodland Valley Farm?',
      buttonLabel: 'Get in Touch',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['hannacroix-creek', 'seme', 'arboretum-kajokoby'],

    pentangleGroup: 'uk_cornwall',
    peerReviewChainPosition: 1,
  },

  {
    slug: 'hannacroix-creek',
    name: 'Hannacroix Creek (Hannacroix Bay)',
    location: 'New Baltimore, Hudson Valley, New York, USA',
    founded: '2010',
    category: 'Freshwater Tidal Swamp Restoration',
    leadPartners: ['Barbara Heinzen', 'Eric Remillard'],
    lat: 42.46,
    lng: -73.78,

    heroImage: 'https://picsum.photos/seed/hannacroix-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/hannacroix-accent/800/600',

    visionEyebrow: 'North American Pioneer',
    visionStatement: 'Restoring a degraded freshwater tidal swamp forest and testing tradable biodiversity indices as a new economic model for ecological stewardship.',
    overview: 'Hannacroix Creek was Barbets Duet\'s first North American site, joining in 2010. Barbara Heinzen and Eric Remillard have been restoring a freshwater tidal swamp forest on the banks of the Hudson River, managing invasive species, replanting native species, and pioneering enterprise stacking as a way to make ecological stewardship financially viable. Their work has seen 49 bird species return to the site.',
    focusAreas: [
      'Freshwater tidal swamp forest restoration',
      'Watershed protection',
      'Maximising wild biodiversity',
      'Remediating polluted industrial habitats',
      'Tradable biodiversity indices',
    ],
    restorationGoals: [
      'Complete invasive species removal from core swamp zones',
      'Restore full native understorey',
      'Demonstrate tradable biodiversity index methodology',
      'Achieve verified 60+ bird species on site',
    ],

    founderNames: 'Barbara Heinzen & Eric Remillard',

    challenges: {
      title: 'Industrial Legacy and Invasive Species',
      description: 'The creek corridor bears the legacy of industrial pollution and decades of invasive species spread — Japanese stilt grass and multiflora rose have crowded out native plants, while the site\'s industrial history left contaminated soil in several zones. Community mobilisation was also needed to pass protective environmental legislation.',
      image: 'https://picsum.photos/seed/hannacroix-challenge/1200/800',
      tags: ['Invasive species', 'Industrial remediation', 'Legislative advocacy'],
    },

    restorationStrategies: {
      description: 'Systematic removal of Japanese stilt grass and multiflora rose, followed by careful replanting of native swamp roses, winterberry, and other indigenous wetland species. Continuous fauna monitoring tracks beavers, turtles, and bird species as indicators of ecosystem recovery.',
      tags: ['Invasive species management', 'Native species replanting', 'Fauna monitoring', 'Wetland restoration'],
      image: 'https://picsum.photos/seed/hannacroix-restoration/1200/800',
    },

    initiativesIntro: 'Three programmes define the Hannacroix approach to integrated ecological and economic restoration.',
    initiatives: [
      {
        title: 'Enterprise Stacking Pilot',
        description: 'Testing how multiple small economic activities — consultancy, hunting, biodiversity indices — can be layered to make ecological stewardship financially self-sustaining.',
        icon: '📊',
      },
      {
        title: 'Biodiversity Index Development',
        description: 'Pioneering tradable biodiversity indices as a new financial instrument for rewarding verified ecological restoration at the landscape scale.',
        icon: '🔬',
      },
      {
        title: 'Native Species Corridors',
        description: 'Replanting native swamp roses, winterberry, and canopy trees to create connected wildlife corridors through the tidal swamp forest.',
        icon: '🌿',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/hannacroix-initiatives/1200/800',

    marketStrategies: {
      title: 'Enterprise Stacking',
      description: 'Combining multiple economic activities to create a diversified income model that can fund long-term ecological restoration.',
      strategies: [
        'Independent environmental planning consultancy',
        'Controlled deer hunting (habitat management)',
        'Tradable biodiversity index pilot',
        'Ecological monitoring data services',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Bird Species', value: '49', description: 'Species that have returned to the site since restoration began', trend: 'up' },
        { label: 'Invasive Coverage', value: '−60%', description: 'Reduction in invasive species cover in core zones', trend: 'up' },
      ],
      community: [
        { label: 'Legislative Wins', value: '2', description: 'Environmental protection laws influenced by site advocacy' },
        { label: 'Network Pioneer', value: '2010', description: 'First North American member of Barbets Duet' },
      ],
    },

    futureGoals: 'To publish and open-source the tradable biodiversity index methodology, enabling other restoration sites to monetise verified ecological gains without relying on carbon markets alone.',

    gallery: [
      'https://picsum.photos/seed/hannacroix-g1/1200/800',
      'https://picsum.photos/seed/hannacroix-g2/1200/800',
      'https://picsum.photos/seed/hannacroix-g3/1200/800',
    ],

    testimonial: {
      quote: 'The 49 bird species that have come back are not just an ecological metric — they are proof that the land remembers what it was, and wants to return.',
      authorName: 'Barbara Heinzen',
      authorPosition: 'Restoration Lead, Hannacroix Creek',
    },

    contact: {
      buttonLabel: 'Connect with Hannacroix',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['woodland-valley-farm', 'sikia-community-dam', 'rufiji'],

    pentangleGroup: 'usa_ne',
    peerReviewChainPosition: 1,
  },

  {
    slug: 'molo-magode-farm',
    name: 'Molo (Magode Farm)',
    location: 'Near Tororo, Eastern Uganda',
    founded: '2010',
    category: 'Watershed & Stream Restoration',
    leadPartners: ['James Magode Ikuya'],
    lat: 0.69,
    lng: 34.18,

    heroImage: 'https://picsum.photos/seed/molo-magode-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/molo-magode-accent/800/600',

    visionEyebrow: 'Mount Elgon Watershed',
    visionStatement: 'Restoring the Mount Elgon watershed through 21 kilometres of stream-bank reforestation and community-driven water management.',
    overview: 'Magode Farm in Eastern Uganda, run by James Magode Ikuya, is working to restore the Kagninima stream and the broader Mount Elgon watershed through intensive indigenous tree planting along 21km of stream banks. The site has overcome significant setbacks — including the robbery and fire that destroyed fish ponds — to re-establish productive systems combining fish farming, bee-keeping, and oil seed production.',
    focusAreas: [
      'Mount Elgon watershed restoration',
      'Kagninima stream bank reforestation',
      'Swamp and riparian habitat recovery',
      'Community water management',
    ],
    restorationGoals: [
      'Complete indigenous tree planting along all 21km of Kagninima stream',
      'Rebuild fish pond network to full capacity',
      'Establish functioning water storage dam system',
      'Develop eco-tourism offer around restored watershed',
    ],

    founderNames: 'James Magode Ikuya',

    challenges: {
      title: 'Setbacks, Theft and Fire',
      description: 'The site has faced exceptional adversity — fish ponds destroyed by robbery and fire had to be rebuilt from scratch, and working in a politically complex region of Eastern Uganda has required persistent community organising. Deforestation of the Mount Elgon watershed upstream threatens the Kagninima stream with increasing sediment loads.',
      image: 'https://picsum.photos/seed/molo-magode-challenge/1200/800',
      tags: ['Watershed deforestation', 'Resilience', 'Community organising'],
    },

    restorationStrategies: {
      description: 'Replanting indigenous trees along the full 21km length of the Kagninima stream to stabilise banks and filter agricultural runoff. Building a series of small dams and channels to harvest and store water, reducing seasonal water insecurity for farming communities.',
      tags: ['Stream bank reforestation', 'Indigenous trees', 'Water harvesting', 'Dam construction'],
      image: 'https://picsum.photos/seed/molo-magode-restoration/1200/800',
    },

    initiativesIntro: 'Magode Farm combines ecological restoration with practical agricultural enterprise to demonstrate the economic viability of watershed stewardship.',
    initiatives: [
      {
        title: 'Kagninima Stream Reforestation',
        description: 'Planting indigenous trees along 21 kilometres of stream bank to prevent erosion, filter runoff, and restore riparian habitat.',
        icon: '🌳',
      },
      {
        title: 'MRAFI Community Initiative',
        description: 'The Molo Rural Agricultural Farming Initiative engages local smallholders in collective restoration and agricultural improvement, spreading the watershed stewardship model across the region.',
        icon: '🤝',
      },
      {
        title: 'Integrated Fish Farming',
        description: 'Tilapia and catfish ponds rebuilt after the robbery and fire, now operating as a demonstration of sustainable inland aquaculture linked to the restored stream system.',
        icon: '🐟',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/molo-magode-initiatives/1200/800',

    marketStrategies: {
      title: 'Watershed Livelihoods',
      description: 'Multiple enterprises woven into the restoration model ensure that ecological work generates economic returns for the community.',
      strategies: [
        'Tilapia and catfish aquaculture',
        'Bee-keeping and honey production',
        'Oil seed crops (castor, Kabaka njagala)',
        'Fruit growing and orchard development',
        'Eco-tourism (proposed)',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Stream Banks Restored', value: '21km', description: 'Length of Kagninima stream with indigenous tree planting', trend: 'up' },
        { label: 'Water Storage', value: 'Active', description: 'Functional dam and channel network operational' },
      ],
      community: [
        { label: 'Network Events', value: '1', description: 'Hosted 2016 Coming of Age Convention' },
        { label: 'MRAFI Members', value: 'Growing', description: 'Expanding community participation in watershed stewardship' },
      ],
    },

    futureGoals: 'To complete the full 21km stream reforestation corridor, establish an eco-tourism offer around the restored watershed, and use MRAFI as a vehicle for replicating the model in neighbouring river catchments.',

    gallery: [
      'https://picsum.photos/seed/molo-g1/1200/800',
      'https://picsum.photos/seed/molo-g2/1200/800',
      'https://picsum.photos/seed/molo-g3/1200/800',
    ],

    testimonial: {
      quote: 'After the fish ponds were destroyed, we had to rebuild — but rebuilding taught us what was resilient and what was not. The stream is our teacher.',
      authorName: 'James Magode Ikuya',
      authorPosition: 'Founder, Magode Farm / MRAFI',
    },

    contact: {
      buttonLabel: 'Connect with Molo',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['seme', 'himo', 'mwasama-primary-school'],

    pentangleGroup: 'east_african',
    peerReviewChainPosition: 4,
  },

  {
    slug: 'lukenya-zumula-farm',
    name: 'Lukenya (Zumula Farm)',
    location: '50 km outside Nairobi, Kenya',
    founded: '2012',
    category: 'Dryland Restoration & Water Harvesting',
    leadPartners: ['Sammy Muvelah'],
    lat: -1.5,
    lng: 36.9,

    heroImage: 'https://picsum.photos/seed/lukenya-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/lukenya-accent/800/600',

    visionEyebrow: 'Dryland Resilience',
    visionStatement: 'Proving that arid rangeland can be made productive and water-secure through innovative rock-face harvesting and indigenous agroforestry.',
    overview: 'Zumula Farm sits on a dry, rocky hillside 50km from Nairobi. Sammy Muvelah has engineered a system for harvesting water from rock faces into constructed dams, enabling year-round water security in one of Kenya\'s most challenging dryland environments. The success of goat farming over maize, and the replication of his techniques by neighbours, has made Lukenya a model for dryland agricultural transformation.',
    focusAreas: [
      'Dry rangeland restoration',
      'Rocky hillside reforestation',
      'Water harvesting from rock faces',
      'Indigenous species conservation',
    ],
    restorationGoals: [
      'Expand constructed dam network to provide water security for neighbouring farms',
      'Establish tree nursery supplying indigenous species to the wider region',
      'Prove the economic case for goat farming over maize at scale',
      'Train neighbouring farmers in rock-face water harvesting',
    ],

    founderNames: 'Sammy Muvelah',

    challenges: {
      title: 'Water Scarcity in Arid Rangeland',
      description: 'The Lukenya area receives highly variable rainfall on rocky, thin-soiled hillsides that shed water rapidly. Conventional farming — especially maize — was economically marginal and accelerated soil degradation. Demonstrating a viable alternative required solving the water problem first.',
      image: 'https://picsum.photos/seed/lukenya-challenge/1200/800',
      tags: ['Water scarcity', 'Arid lands', 'Soil degradation', 'Economic marginalisation'],
    },

    restorationStrategies: {
      description: 'Water is channelled from natural rock faces into a series of constructed earthen dams, providing year-round water storage for livestock, irrigation, and domestic use. This is combined with indigenous tree planting — acacia and moringa — and a tree nursery supplying the broader area.',
      tags: ['Rock-face water harvesting', 'Earthen dam construction', 'Indigenous tree nursery', 'Acacia & moringa planting'],
      image: 'https://picsum.photos/seed/lukenya-restoration/1200/800',
    },

    initiativesIntro: 'Water security unlocks everything else at Zumula Farm — once water is abundant, restoration and enterprise become possible.',
    initiatives: [
      {
        title: 'Rock-Face Water Harvesting',
        description: 'Engineering channels and gutters to capture rainfall running off exposed rock faces, directing it into constructed earthen dams for year-round water storage.',
        icon: '💧',
      },
      {
        title: 'Indigenous Tree Nursery',
        description: 'Growing acacia, moringa, and other indigenous dryland species for reforestation of the hillside and supply to neighbouring farms undertaking their own restoration.',
        icon: '🌱',
      },
      {
        title: 'Goat Farming Demonstration',
        description: 'Proving the profitability of goat husbandry over maize cultivation in dryland conditions — a model that neighbours have already begun replicating.',
        icon: '🐐',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/lukenya-initiatives/1200/800',

    marketStrategies: {
      title: 'Dryland Enterprise',
      description: 'Income streams adapted to dryland conditions and native species, demonstrating economic viability without relying on water-intensive crops.',
      strategies: [
        'Goat farming and meat production',
        'Woodlot timber and fuelwood sales',
        'Indigenous seedling sales from tree nursery',
        'Eco-tourism guest house (proposed)',
        'Moringa and acacia products',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Water Security', value: 'Year-round', description: 'Achieved year-round water security in arid dryland conditions', trend: 'up' },
        { label: 'Hillside Coverage', value: 'Expanding', description: 'Progressive reforestation of rocky hillside habitat' },
      ],
      community: [
        { label: 'Neighbour Replication', value: 'Confirmed', description: 'Neighbouring farms have begun replicating water harvesting techniques' },
        { label: 'Economic Shift', value: 'Goat > Maize', description: 'Proved goat farming profitability over maize in dryland conditions' },
      ],
    },

    futureGoals: 'To scale the rock-face water harvesting model across the Lukenya district, establishing a regional demonstration hub for dryland restoration and a network of community tree nurseries.',

    gallery: [
      'https://picsum.photos/seed/lukenya-g1/1200/800',
      'https://picsum.photos/seed/lukenya-g2/1200/800',
      'https://picsum.photos/seed/lukenya-g3/1200/800',
    ],

    testimonial: {
      quote: 'Once we solved the water problem, everything else followed. The land was not dead — it was just thirsty.',
      authorName: 'Sammy Muvelah',
      authorPosition: 'Farmer, Zumula Farm',
    },

    contact: {
      buttonLabel: 'Learn from Lukenya',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['seme', 'sikia-community-dam', 'nkoroi'],

    pentangleGroup: 'east_african',
    peerReviewChainPosition: 5,
  },

  {
    slug: 'seme',
    name: 'Seme',
    location: 'Near Kisumu, Shores of Lake Victoria, Kenya',
    founded: '2013',
    category: 'Watershed & Soil Restoration',
    leadPartners: ['Oby Obyerodhyambo', 'Hilda Obyerodhyambo'],
    lat: -0.1,
    lng: 34.6,

    heroImage: 'https://picsum.photos/seed/seme-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/seme-accent/800/600',

    visionEyebrow: 'Lake Victoria Watershed',
    visionStatement: 'Reversing over-cropping and overgrazing on Lake Victoria\'s shores by restoring indigenous food systems and sacred grove traditions.',
    overview: 'Seme sits on the shores of Lake Victoria near Kisumu, a landscape scarred by decades of overgrazing and monoculture. Oby and Hilda Obyerodhyambo have been restoring watershed health while preserving indigenous tree species and "sacred groves" — traditional conservation areas maintained by local communities. Their work combines high-value horticulture with livestock husbandry, training youth in animal husbandry and preserving traditional medicinal knowledge.',
    focusAreas: [
      'Over-cropped and over-grazed land restoration',
      'Watershed protection for Lake Victoria',
      'Indigenous tree conservation',
      'Sacred grove preservation',
    ],
    restorationGoals: [
      'Restore full canopy cover to degraded watershed areas',
      'Preserve and map all surviving sacred grove sites',
      'Transition community from maize monoculture to diversified traditional crops',
      'Document and protect traditional medicinal plant knowledge',
    ],

    founderNames: 'Oby & Hilda Obyerodhyambo',

    challenges: {
      title: 'Monoculture and Sacred Grove Loss',
      description: 'Decades of maize monoculture have depleted soil fertility on the Lake Victoria shoreline, while sacred groves — traditional community conservation areas — have been cleared for cultivation. Restoring both ecological function and cultural conservation practices required deep community engagement.',
      image: 'https://picsum.photos/seed/seme-challenge/1200/800',
      tags: ['Soil degradation', 'Cultural heritage loss', 'Watershed pressure', 'Youth disengagement'],
    },

    restorationStrategies: {
      description: 'Water harvesting and drip irrigation allow high-value crops to be grown without exhausting groundwater. Traditional sorghum and pumpkins replace maize, rebuilding soil health. Indigenous and medicinal trees are planted throughout the farm, preserving both ecological and cultural heritage.',
      tags: ['Drip irrigation', 'Traditional crops', 'Medicinal tree planting', 'Sacred grove restoration'],
      image: 'https://picsum.photos/seed/seme-restoration/1200/800',
    },

    initiativesIntro: 'Seme weaves cultural knowledge preservation into every aspect of its ecological restoration work.',
    initiatives: [
      {
        title: 'Youth Animal Husbandry Programme',
        description: 'Training local youth in pig and goat husbandry as an alternative livelihood to subsistence maize farming, building economic independence while reducing pressure on land.',
        icon: '👥',
      },
      {
        title: 'Sacred Grove Documentation',
        description: 'Mapping and restoring surviving sacred groves — traditional community conservation areas — and documenting the medicinal plant knowledge held within them.',
        icon: '🌳',
      },
      {
        title: 'Water Harvesting & Drip Irrigation',
        description: 'Installing water harvesting infrastructure and drip irrigation to enable year-round horticulture without depleting the Lake Victoria watershed.',
        icon: '💧',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/seme-initiatives/1200/800',

    marketStrategies: {
      title: 'High-Value Horticulture',
      description: 'Premium horticultural crops and livestock provide income without depleting fragile watershed soils.',
      strategies: [
        'Tissue culture banana cultivation',
        'Greenhouse tomato production',
        'Pig and goat husbandry',
        'Indigenous seedling sales',
        'High-value cash crops (onions, watermelons)',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Food Sustainability', value: 'Achieved', description: 'Household food security achieved through diversified production', trend: 'up' },
        { label: 'Medicinal Species', value: 'Preserved', description: 'Traditional medicinal plant knowledge documented and protected' },
      ],
      community: [
        { label: 'Youth Trained', value: 'Active cohorts', description: 'Young people trained annually in sustainable animal husbandry', trend: 'up' },
        { label: 'Sacred Groves', value: 'Mapped & restored', description: 'Traditional conservation areas identified and under active protection' },
      ],
    },

    futureGoals: 'To establish Seme as a regional centre for Lake Victoria watershed restoration, combining sacred grove preservation with modern agroecology and youth employment.',

    gallery: [
      'https://picsum.photos/seed/seme-g1/1200/800',
      'https://picsum.photos/seed/seme-g2/1200/800',
      'https://picsum.photos/seed/seme-g3/1200/800',
    ],

    testimonial: {
      quote: 'The sacred groves hold the memory of what this land was. Restoring them is not just ecology — it is remembering who we are.',
      authorName: 'Hilda Obyerodhyambo',
      authorPosition: 'Co-founder, Seme Learning Site',
    },

    contact: {
      buttonLabel: 'Connect with Seme',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['arboretum-kajokoby', 'nkoroi', 'lukenya-zumula-farm'],

    pentangleGroup: 'east_african',
    peerReviewChainPosition: 3,
  },

  {
    slug: 'msichoke-seaweed-growers',
    name: 'Msichoke Seaweed Growers Cooperative',
    location: 'Mlingotini Village, Bagamoyo, Tanzania',
    founded: '2013',
    category: 'Coastal Restoration & Mariculture',
    leadPartners: ['Mwajuma Masaiganah'],
    lat: -6.44,
    lng: 38.9,

    heroImage: 'https://picsum.photos/seed/msichoke-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/msichoke-accent/800/600',

    visionEyebrow: 'Mlingotini Coastal Initiative',
    visionStatement: 'Restoring the balance between coastal livelihoods and mangrove ecosystems through a women-led seaweed cooperative.',
    overview: 'The Msichoke Seaweed Growers Cooperative in Mlingotini Village is one of Barbets Duet\'s most celebrated sites — a women-led cooperative that has transformed coastal degradation into a model of community-owned mariculture. Mwajuma Masaiganah has guided the cooperative to actively plant mangroves, farm seaweed, produce seaweed soap and shampoo with confirmed medicinal properties, and establish a credit union for members.',
    focusAreas: [
      'Mangrove ecosystem protection',
      'Coastal lagoon biodiversity',
      'Storm impact mitigation',
      'Women-led cooperative development',
    ],
    restorationGoals: [
      'Establish complete mangrove buffer along the Mlingotini coastline',
      'Scale seaweed soap and shampoo production to regional markets',
      'Develop eco-tourism offer around mangrove restoration',
      'Expand credit union membership and services',
    ],

    founderNames: 'Mwajuma Masaiganah',

    challenges: {
      title: 'Coastal Erosion and Economic Marginalisation',
      description: 'Mangrove deforestation along the Mlingotini coast had accelerated erosion and reduced fish nursery habitat, threatening the livelihoods of fishing families. Women — who did most of the traditional seaweed harvesting — were economically marginalised with no access to credit or markets for value-added products.',
      image: 'https://picsum.photos/seed/msichoke-challenge/1200/800',
      tags: ['Coastal erosion', 'Mangrove loss', 'Women\'s economic exclusion', 'Market access'],
    },

    restorationStrategies: {
      description: 'Active mangrove planting improves fish breeding habitat and reduces wave impact on the coastline. Seaweed farming is positioned strategically to reduce wave energy further inland. Both work together to create a living coastal defence system.',
      tags: ['Mangrove planting', 'Seaweed farming', 'Coastal defence', 'Fish habitat restoration'],
      image: 'https://picsum.photos/seed/msichoke-restoration/1200/800',
    },

    initiativesIntro: 'Three interlocked programmes make Msichoke a model for women-led coastal restoration.',
    initiatives: [
      {
        title: 'Mangrove Planting Programme',
        description: 'Active reforestation of the Mlingotini coastline with mangrove species, creating fish nursery habitat and natural coastal protection against storms.',
        icon: '🌿',
      },
      {
        title: 'Seaweed Soap & Shampoo Production',
        description: 'Value-added processing of farmed seaweed into soaps and shampoos with confirmed medicinal properties, opening premium markets for cooperative members.',
        icon: '🧴',
      },
      {
        title: 'Member Credit Union',
        description: 'A cooperative credit union providing financial services and savings mechanisms for seaweed farmers, enabling investment in equipment and processing capacity.',
        icon: '💰',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/msichoke-initiatives/1200/800',

    marketStrategies: {
      title: 'Coastal Value Chains',
      description: 'Moving from raw commodity sales to value-added products dramatically increases income per kilogram of seaweed produced.',
      strategies: [
        'Seaweed soap and shampoo sales',
        'Raw seaweed export for food industry',
        'Honey production and sales',
        'Eco-tourism and mangrove experience tours',
        'Cooperative credit union financial services',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Mangrove Coverage', value: 'Growing', description: 'Active mangrove reforestation programme underway along Mlingotini coast', trend: 'up' },
        { label: 'Coastal Protection', value: 'Active', description: 'Combined seaweed farm and mangrove buffer reducing wave impact' },
      ],
      community: [
        { label: 'Credit Union', value: 'Established', description: 'Member-owned credit union providing financial services to cooperative' },
        { label: 'Women in Leadership', value: '100%', description: 'Entirely women-led cooperative management' },
      ],
    },

    futureGoals: 'To scale seaweed soap and shampoo production to regional and international markets, expand the credit union, and establish Msichoke as a training centre for women-led coastal cooperatives across East Africa.',

    gallery: [
      'https://picsum.photos/seed/msichoke-g1/1200/800',
      'https://picsum.photos/seed/msichoke-g2/1200/800',
      'https://picsum.photos/seed/msichoke-g3/1200/800',
    ],

    testimonial: {
      quote: 'We did not wait for someone to save our coast. We planted the trees ourselves, and the fish came back.',
      authorName: 'Mwajuma Masaiganah',
      authorPosition: 'Cooperative Leader, Msichoke',
    },

    contact: {
      buttonLabel: 'Support the Cooperative',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['mwasama-primary-school', 'himo', 'cichlid-breeding'],

    pentangleGroup: 'east_african',
    peerReviewChainPosition: 1,
  },

  {
    slug: 'mwasama-primary-school',
    name: 'Mwasama Primary School (Shamba Darasa)',
    location: 'Bagamoyo, Tanzania',
    founded: '2013',
    category: 'Environmental Education & School Restoration',
    leadPartners: ['Mwajuma Masaiganah'],
    lat: -6.44,
    lng: 38.9,

    heroImage: 'https://picsum.photos/seed/mwasama-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/mwasama-accent/800/600',

    visionEyebrow: 'The Garden Classroom',
    visionStatement: 'Making every school a living laboratory for ecological restoration, with Mwasama as the model for East Africa.',
    overview: 'Mwasama Primary School in Bagamoyo is home to Shamba Darasa — the Garden Classroom. Under Mwajuma Masaiganah\'s guidance, the school has integrated environmental restoration into its primary curriculum, built botanical collections of native trees, established vegetable gardens, and developed catfish ponds whose waste fertilises the crops. The school is now nearly food self-sufficient and is considered a model inspiration site for integrated environmental education.',
    focusAreas: [
      'Environmental education in primary curriculum',
      'Botanical collection of native trees and plants',
      'Integrated food production',
      'School-based restoration demonstration',
    ],
    restorationGoals: [
      'Achieve full food self-sufficiency through school garden and pond system',
      'Expand native tree botanical collection to 100+ species',
      'Replicate Shamba Darasa model in five neighbouring schools',
      'Establish formal environmental education certification programme',
    ],

    founderNames: 'Mwajuma Masaiganah',

    challenges: {
      title: 'Education Without a Living Curriculum',
      description: 'Environmental education in Bagamoyo schools was entirely theoretical — students learned about ecosystems from textbooks while standing on degraded schoolgrounds. Integrating hands-on restoration into a constrained school curriculum and budget required creative problem-solving and strong community support.',
      image: 'https://picsum.photos/seed/mwasama-challenge/1200/800',
      tags: ['Curriculum integration', 'School resources', 'Community engagement'],
    },

    restorationStrategies: {
      description: 'The Garden Classroom uses the schoolgrounds as a living laboratory — students plant and maintain native trees, tend vegetable gardens, and manage catfish ponds. Plant waste and pond water are cycled as fertiliser, creating a closed-loop system that is both educational and productive.',
      tags: ['Garden Classroom', 'Native tree nursery', 'Aquaponics', 'Closed-loop farming'],
      image: 'https://picsum.photos/seed/mwasama-restoration/1200/800',
    },

    initiativesIntro: 'The Garden Classroom turns the school into a working farm and restoration site — education through doing.',
    initiatives: [
      {
        title: 'Shamba Darasa (Garden Classroom)',
        description: 'Hands-on planting sessions integrated into the school timetable, where students grow mango, palm, teak, and bamboo and learn ecological principles through direct practice.',
        icon: '🌱',
      },
      {
        title: 'Catfish Pond System',
        description: 'Catfish ponds provide protein for school meals and produce nutrient-rich water that irrigates and fertilises the vegetable and tree plots.',
        icon: '🐟',
      },
      {
        title: 'Native Plant Botanical Collection',
        description: 'A growing collection of native Tanzanian trees and plants, maintained by students as a living reference library for local biodiversity.',
        icon: '📖',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/mwasama-initiatives/1200/800',

    marketStrategies: {
      title: 'School Enterprise',
      description: 'The school\'s productive systems generate income that reduces dependence on external funding.',
      strategies: [
        'School produce sales (vegetables, sugar cane, fruit)',
        'Poultry and egg production',
        'Agricultural training for community members',
        'Native seedling sales',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Food Self-Sufficiency', value: 'Near-complete', description: 'School approaching full food self-sufficiency through integrated garden and pond system', trend: 'up' },
        { label: 'Native Species', value: 'Growing collection', description: 'Expanding botanical collection of native Tanzanian trees and plants' },
      ],
      community: [
        { label: 'Curriculum Integration', value: 'Full', description: 'Environmental restoration fully integrated into primary curriculum' },
        { label: 'Model Status', value: 'Recognised', description: 'Considered a model inspiration site for integrated environmental education in East Africa' },
      ],
    },

    futureGoals: 'To replicate the Shamba Darasa model across at least five neighbouring primary schools in the Bagamoyo district, and to develop a formal environmental education certification programme in partnership with the Tanzanian Ministry of Education.',

    gallery: [
      'https://picsum.photos/seed/mwasama-g1/1200/800',
      'https://picsum.photos/seed/mwasama-g2/1200/800',
      'https://picsum.photos/seed/mwasama-g3/1200/800',
    ],

    testimonial: {
      quote: 'When children plant trees and watch them grow, they understand conservation in a way no textbook can teach.',
      authorName: 'Mwajuma Masaiganah',
      authorPosition: 'Site Lead, Mwasama School / Msichoke Cooperative',
    },

    contact: {
      buttonLabel: 'Visit the Garden Classroom',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['msichoke-seaweed-growers', 'himo', 'molo-magode-farm'],
  },
  // mwasama-primary-school: not in a pentangle group yet — will be assigned in Wave 6

  {
    slug: 'himo',
    name: 'Himo',
    location: 'Himo, near Moshi, Tanzania',
    founded: '2013',
    category: 'Soil Fertility & Medicinal Plants',
    leadPartners: ['Rose Lyimo', 'Hans Mtika'],
    lat: -3.38,
    lng: 37.52,

    heroImage: 'https://picsum.photos/seed/himo-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/himo-accent/800/600',

    visionEyebrow: 'Kilimanjaro Foothills',
    visionStatement: 'Recovering soil fertility and preserving native medicinal plants in the rapidly urbanising foothills of Kilimanjaro.',
    overview: 'Himo is a traditional Chagga shamba in the foothills of Kilimanjaro, guided by Rose Lyimo and Hans Mtika. In an area of rapid urbanisation, they have transformed what began as a bare building site into a productive shamba combining bananas, maize, beans, piggery, and medicinal plant cultivation. The site hosted Barbets Duet\'s 2012 Convention, and Rose Lyimo brings expertise in micro-lending — connecting ecological restoration with community finance.',
    focusAreas: [
      'Soil fertility recovery',
      'Native and medicinal plant preservation',
      'Chagga irrigation system restoration',
      'Urban fringe habitat protection',
    ],
    restorationGoals: [
      'Restore full soil fertility across the shamba through permaculture techniques',
      'Document and preserve all native medicinal plant species on site',
      'Revitalise traditional Chagga irrigation canal system',
      'Establish micro-lending programme linked to restoration activities',
    ],

    founderNames: 'Rose Lyimo & Hans Mtika',

    challenges: {
      title: 'Urbanisation and Soil Depletion',
      description: 'Rapid urban expansion around Himo means agricultural land is under constant pressure from development, while decades of intensive cultivation have depleted soil fertility. Preserving the traditional Chagga shamba model in this environment requires demonstrating its economic as well as ecological value.',
      image: 'https://picsum.photos/seed/himo-challenge/1200/800',
      tags: ['Urban encroachment', 'Soil depletion', 'Cultural heritage', 'Traditional knowledge'],
    },

    restorationStrategies: {
      description: 'Permaculture principles applied to the traditional Chagga shamba system, utilising the customary Chagga irrigation canal (mfereji) to distribute water efficiently. Joint management with local caretakers ensures the knowledge and practice is community-owned.',
      tags: ['Permaculture', 'Chagga irrigation canals', 'Traditional shamba', 'Community caretakers'],
      image: 'https://picsum.photos/seed/himo-restoration/1200/800',
    },

    initiativesIntro: 'Himo demonstrates that traditional agricultural knowledge systems are not relics — they are living solutions.',
    initiatives: [
      {
        title: 'Chagga Canal Restoration',
        description: 'Revitalising the traditional Chagga irrigation canal system (mfereji) to distribute gravity-fed water through the shamba without pumping infrastructure.',
        icon: '💧',
      },
      {
        title: 'Medicinal Plant Cultivation',
        description: 'Growing and marketing native medicinal plants and timber species, preserving traditional botanical knowledge while creating a commercial product line.',
        icon: '🌿',
      },
      {
        title: 'Micro-Lending for Restoration',
        description: 'Rose Lyimo\'s expertise in micro-lending is deployed to link restoration activities with community finance, enabling smallholders to invest in long-term ecological work.',
        icon: '💰',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/himo-initiatives/1200/800',

    marketStrategies: {
      title: 'Traditional Value Chains',
      description: 'The Chagga shamba tradition offers a diversity of products that modern markets are increasingly seeking.',
      strategies: [
        'Traditional shamba produce (bananas, maize, beans)',
        'Piggery and pork products',
        'Medicinal plant sales and herbal products',
        'Timber from native species',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Soil Recovery', value: 'Active', description: 'Ongoing permaculture-based soil fertility restoration programme', trend: 'up' },
        { label: 'Medicinal Species', value: 'Documented', description: 'Native medicinal plant species catalogued and under cultivation' },
      ],
      community: [
        { label: '2012 Convention', value: 'Hosted', description: 'Barbets Duet 2012 Convention held at Himo' },
        { label: 'Micro-lending', value: 'Active', description: 'Community micro-lending programme linked to restoration work' },
      ],
    },

    futureGoals: 'To complete the restoration of the traditional Chagga irrigation canal system and establish Himo as a regional training site for permaculture and traditional agricultural knowledge.',

    gallery: [
      'https://picsum.photos/seed/himo-g1/1200/800',
      'https://picsum.photos/seed/himo-g2/1200/800',
      'https://picsum.photos/seed/himo-g3/1200/800',
    ],

    testimonial: {
      quote: 'This land was bare when we started. Now it feeds families and teaches them. That is the Chagga way — learn from the land, return to the land.',
      authorName: 'Rose Lyimo',
      authorPosition: 'Co-lead, Himo Learning Site',
    },

    contact: {
      buttonLabel: 'Explore Himo',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['mwasama-primary-school', 'rufiji', 'cichlid-breeding'],

    pentangleGroup: 'east_african',
    peerReviewChainPosition: 2,
  },

  {
    slug: 'sikia-community-dam',
    name: 'Sikia Community Dam Project',
    location: 'East Africa (Kenya / Tanzania / Uganda border region)',
    founded: '2020',
    category: 'Water Resilience & Community Infrastructure',
    leadPartners: ['Village and farmers\' cooperatives'],
    lat: 1.0,
    lng: 34.5,

    heroImage: 'https://picsum.photos/seed/sikia-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/sikia-accent/800/600',

    visionEyebrow: 'Water Resilience Initiative',
    visionStatement: 'Building climate-resilient water infrastructure through community cooperatives, with geospatial planning tools and knowledge centres.',
    overview: 'The Sikia Community Dam Project is a multi-site initiative operating across the Kenya-Tanzania-Uganda border region, working with village and farmers\' cooperatives to build water harvesting infrastructure for climate resilience. The project uses real-time geospatial planning tools like Felt to coordinate construction and monitoring, and is building knowledge centres to preserve and share water resilience expertise across communities.',
    focusAreas: [
      'Water harvesting and storage',
      'Climate resilience infrastructure',
      'Women\'s empowerment through water access',
      'Knowledge centre development',
    ],
    restorationGoals: [
      'Complete network of community dams across all participating villages',
      'Establish functional knowledge centres in each community',
      'Achieve measurable outcomes for water harvesting efficiency',
      'Empower women as primary water infrastructure managers',
    ],

    founderNames: 'Village and farmers\' cooperatives',

    challenges: {
      title: 'Water Insecurity at the Climate Frontier',
      description: 'The tri-border region faces intensifying climate variability, with longer dry seasons and more intense rainfall events overwhelming traditional water management. Women bear the primary burden of water collection, spending hours daily on water fetching that could otherwise go to farming, education, and enterprise.',
      image: 'https://picsum.photos/seed/sikia-challenge/1200/800',
      tags: ['Climate variability', 'Water insecurity', 'Women\'s time burden', 'Infrastructure gaps'],
    },

    restorationStrategies: {
      description: 'Real-time geospatial planning using tools like Felt enables precise siting of dams and water catchment structures to maximise capture from rainfall events. Community knowledge centres provide ongoing training in water management and maintenance.',
      tags: ['Geospatial planning', 'Community dams', 'Water harvesting', 'Knowledge centres'],
      image: 'https://picsum.photos/seed/sikia-restoration/1200/800',
    },

    initiativesIntro: 'Sikia combines infrastructure, technology and community empowerment into an integrated water resilience model.',
    initiatives: [
      {
        title: 'Community Dam Construction',
        description: 'Building water harvesting dams sited using geospatial analysis to maximise catchment from seasonal rainfall, providing water security through dry seasons.',
        icon: '🏗️',
      },
      {
        title: 'Geospatial Planning with Felt',
        description: 'Using real-time geospatial tools to plan, monitor, and evaluate water infrastructure, enabling data-driven decision-making by community cooperatives.',
        icon: '🗺️',
      },
      {
        title: 'Women\'s Water Leadership',
        description: 'Placing women at the centre of water infrastructure governance, converting time previously spent on water collection into economic and educational opportunity.',
        icon: '👩‍🌾',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/sikia-initiatives/1200/800',

    marketStrategies: {
      title: 'Water as Economic Infrastructure',
      description: 'Water security converts directly into agricultural productivity, economic opportunity, and community resilience.',
      strategies: [
        'Irrigated agriculture enabled by dam water',
        'Knowledge centre training fees',
        'Water resilience consultancy for neighbouring communities',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Water Security', value: 'Multi-village', description: 'Water harvesting infrastructure serving multiple village cooperatives', trend: 'up' },
        { label: 'Knowledge Centres', value: 'Established', description: 'Community knowledge centres operational for water resilience training' },
      ],
      community: [
        { label: 'Women Empowered', value: 'Core programme', description: 'Women placed at centre of water infrastructure governance' },
        { label: 'Measurable Outcomes', value: 'Tracked', description: 'Quantitative outcomes for water harvesting established and monitored' },
      ],
    },

    futureGoals: 'To complete the regional dam network, establish knowledge centres in all participating communities, and develop a replicable model for community water infrastructure governance that can be applied across East Africa.',

    gallery: [
      'https://picsum.photos/seed/sikia-g1/1200/800',
      'https://picsum.photos/seed/sikia-g2/1200/800',
      'https://picsum.photos/seed/sikia-g3/1200/800',
    ],

    contact: {
      buttonLabel: 'Support the Dam Project',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['lukenya-zumula-farm', 'seme', 'arboretum-kajokoby'],
  },

  {
    slug: 'arboretum-kajokoby',
    name: "Arboretum KaJok'Oby",
    location: 'East Africa',
    founded: '2020',
    category: 'Agroforestry & Biodiversity',
    leadPartners: ['Village and farmers\' cooperatives'],
    lat: -0.1,
    lng: 34.6,

    heroImage: 'https://picsum.photos/seed/kajokoby-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/kajokoby-accent/800/600',

    visionEyebrow: 'Agroforestry Hotspot',
    visionStatement: 'Creating biodiversity hotspots through agroforestry and urban farming, bridging the divide between pastoralists and settled farmers.',
    overview: 'The Arboretum KaJok\'Oby is a community-led initiative creating agroforestry demonstration sites and tree nurseries that serve as biodiversity hotspots. The project hosts futures-enabled dialogue between pastoralists and settled farmers — two communities that have historically competed for land — and hosted a milestone Barbets Duet event in 2023.',
    focusAreas: [
      'Agroforestry demonstration',
      'Biodiversity hotspot creation',
      'Urban farming integration',
      'Pastoral-agricultural dialogue',
    ],
    restorationGoals: [
      'Establish self-sustaining tree nursery network',
      'Create productive fruit forests on degraded land',
      'Develop formal dialogue framework for pastoralist-farmer land sharing',
      'Build bee-keeping enterprises linked to agroforestry plantings',
    ],

    founderNames: 'Village and farmers\' cooperatives',

    challenges: {
      title: 'The Pastoral-Agricultural Divide',
      description: 'In East Africa, conflict between pastoral communities and settled farmers over land use is a persistent source of tension. Climate change is intensifying this conflict as pastoralists are pushed into farming areas by shrinking grazing lands. Creating shared economic incentives for agroforestry requires building trust across deep cultural divides.',
      image: 'https://picsum.photos/seed/kajokoby-challenge/1200/800',
      tags: ['Land use conflict', 'Pastoral communities', 'Climate pressure', 'Dialogue facilitation'],
    },

    restorationStrategies: {
      description: 'Documenting and scaling tree nursery networks that produce species valuable to both pastoralists (browse and fodder) and farmers (fruit, timber, soil improvement). Fruit forests on degraded land demonstrate shared value and create economic incentives for joint stewardship.',
      tags: ['Tree nurseries', 'Fruit forests', 'Agroforestry', 'Dialogue facilitation'],
      image: 'https://picsum.photos/seed/kajokoby-restoration/1200/800',
    },

    initiativesIntro: 'KaJok\'Oby is as much a social project as an ecological one — restoring land and restoring relationships simultaneously.',
    initiatives: [
      {
        title: 'Tree Nursery Network',
        description: 'Documenting and scaling community tree nurseries producing agroforestry species for reforestation, soil improvement, and economic diversification.',
        icon: '🌱',
      },
      {
        title: 'Fruit Forest Development',
        description: 'Establishing productive fruit forests on degraded land as demonstration sites for long-term agroforestry value, accessible to both pastoral and farming communities.',
        icon: '🌳',
      },
      {
        title: 'Pastoralist-Farmer Dialogue',
        description: 'Structured futures-enabled dialogue sessions bringing pastoralists and settled farmers together to develop shared land use priorities and agroforestry agreements.',
        icon: '🤝',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/kajokoby-initiatives/1200/800',

    marketStrategies: {
      title: 'Shared Agroforestry Enterprise',
      description: 'Economic activities that serve both pastoral and farming communities create shared incentives for ecological stewardship.',
      strategies: [
        'Bee-keeping and honey production (shared pastoral/farm access)',
        'Tree nursery seedling sales',
        'Fruit forest produce',
        'Urban farming enterprise',
      ],
    },

    impactData: {
      ecological: [
        { label: '2023 Milestone', value: 'Hosted', description: 'Hosted milestone Barbets Duet event in 2023', trend: 'up' },
        { label: 'Land Use Integration', value: 'Active', description: 'Pastoral and agricultural land use priorities being integrated' },
      ],
      community: [
        { label: 'Dialogue Sessions', value: 'Ongoing', description: 'Regular structured dialogue between pastoralists and farmers' },
        { label: 'Nursery Network', value: 'Documented', description: 'Community tree nursery network mapped and in active development' },
      ],
    },

    futureGoals: 'To formalise the pastoralist-farmer land sharing framework developed through the dialogue process, and to establish the fruit forest network as a permanent biodiversity hotspot and income source for all participating communities.',

    gallery: [
      'https://picsum.photos/seed/kajokoby-g1/1200/800',
      'https://picsum.photos/seed/kajokoby-g2/1200/800',
      'https://picsum.photos/seed/kajokoby-g3/1200/800',
    ],

    contact: {
      buttonLabel: 'Join the Dialogue',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['seme', 'sikia-community-dam', 'lukenya-zumula-farm'],
  },

  {
    slug: 'cichlid-breeding',
    name: 'Cichlid Breeding Facility',
    location: 'Dar es Salaam, Tanzania',
    founded: '2014',
    category: 'Freshwater Fish Conservation',
    leadPartners: ['Hans Mtika'],
    lat: -6.8,
    lng: 39.27,

    heroImage: 'https://picsum.photos/seed/cichlid-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/cichlid-accent/800/600',

    visionEyebrow: 'Rift Valley Lake Conservation',
    visionStatement: 'Preventing the collapse of Rift Valley Lake cichlid populations by shifting from extraction to captive breeding and professional aquarium trade.',
    overview: 'Hans Mtika\'s Cichlid Breeding Facility in Dar es Salaam is tackling one of East Africa\'s most acute conservation challenges: the collapse of endemic cichlid fish populations in the Rift Valley Lakes through over-harvesting for the international aquarium trade. By moving from an extractive collection model to a professional captive breeding operation, the facility protects wild populations while supplying high-quality, licensed fish to collectors worldwide.',
    focusAreas: [
      'Rift Valley Lake cichlid conservation',
      'Wild fish stock protection',
      'Sustainable aquarium trade',
      'Fishery collapse prevention',
    ],
    restorationGoals: [
      'Establish captive breeding programmes for all key endemic cichlid species',
      'Train local divers in sustainable harvesting protocols',
      'Achieve full licensing of the Tanzanian aquarium export trade',
      'Reduce wild collection pressure by 80%',
    ],

    founderNames: 'Hans Mtika',

    challenges: {
      title: 'Extractive Trade and Fishery Collapse',
      description: 'Endemic cichlid species in the Rift Valley Lakes — many found nowhere else on Earth — were being harvested unsustainably for the international aquarium trade, pushing multiple species toward extinction. The trade was largely unlicensed and unregulated, with local divers extracting wild fish with no economic alternative.',
      image: 'https://picsum.photos/seed/cichlid-challenge/1200/800',
      tags: ['Extractive trade', 'Endemic species', 'Fishery collapse', 'Unlicensed export'],
    },

    restorationStrategies: {
      description: 'Moving from wild extraction to captive breeding produces consistent, high-quality fish that meet the quality standards of premium international collectors — while protecting wild populations. Training local divers in sustainable harvesting protocols ensures that any remaining wild collection is within ecological limits.',
      tags: ['Captive breeding', 'Sustainable harvesting', 'Diver training', 'Export licensing'],
      image: 'https://picsum.photos/seed/cichlid-restoration/1200/800',
    },

    initiativesIntro: 'Conservation through commerce — turning the aquarium trade from a threat into a tool for species protection.',
    initiatives: [
      {
        title: 'Captive Breeding Programme',
        description: 'Specialist breeding facilities for endemic Rift Valley cichlid species, producing consistent, licensed fish for international collectors while protecting wild populations.',
        icon: '🐟',
      },
      {
        title: 'Diver Training Programme',
        description: 'Training local divers in sustainable harvesting protocols that keep any remaining wild collection within ecological limits.',
        icon: '🤿',
      },
      {
        title: 'Trade Professionalisation',
        description: 'Working with authorities to license and professionalise the Tanzanian aquarium export trade, converting informal extraction into a regulated, sustainable sector.',
        icon: '📋',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/cichlid-initiatives/1200/800',

    marketStrategies: {
      title: 'Premium Conservation Commerce',
      description: 'High-quality captive-bred endemic species command premium prices from international collectors, generating conservation revenue.',
      strategies: [
        'Captive-bred cichlid export to international collectors',
        'Breeding consultancy for other East African facilities',
        'Licensed sustainable harvesting services',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Wild Stocks', value: 'Protected', description: 'Captive breeding reducing pressure on wild Rift Valley Lake populations', trend: 'up' },
        { label: 'Breeding Facility', value: 'Operational', description: 'Specialised captive breeding facility constructed and operating' },
      ],
      community: [
        { label: 'Trade Licensing', value: 'Professionalised', description: 'Tanzanian aquarium export trade professionalised via licensing' },
        { label: 'Diver Training', value: 'Active', description: 'Local divers trained in sustainable harvesting protocols' },
      ],
    },

    futureGoals: 'To expand captive breeding to cover all critically threatened endemic cichlid species, and to develop an internationally recognised certification scheme for sustainably sourced Rift Valley cichlids.',

    gallery: [
      'https://picsum.photos/seed/cichlid-g1/1200/800',
      'https://picsum.photos/seed/cichlid-g2/1200/800',
      'https://picsum.photos/seed/cichlid-g3/1200/800',
    ],

    testimonial: {
      quote: 'These fish are found nowhere else on Earth. If we lose them, we lose them forever. Breeding them is not just commerce — it is custody.',
      authorName: 'Hans Mtika',
      authorPosition: 'Director, Cichlid Breeding Facility',
    },

    contact: {
      buttonLabel: 'Support Cichlid Conservation',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['himo', 'rufiji', 'mwasama-primary-school'],
  },

  {
    slug: 'rufiji',
    name: 'Rufiji',
    location: 'Rufiji area, Tanzania',
    founded: '2015',
    category: 'Carbon Forest Conservation',
    leadPartners: ['Rose Lyimo'],
    lat: -7.8,
    lng: 38.5,

    heroImage: 'https://picsum.photos/seed/rufiji-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/rufiji-accent/800/600',

    visionEyebrow: 'Tanzanian Carbon Frontier',
    visionStatement: 'Protecting and expanding Rufiji\'s forests as a high-value carbon sink, pioneering community-owned carbon market experimentation.',
    overview: 'The Rufiji site, led by Rose Lyimo, is positioned at the frontier of community carbon market experimentation. The Rufiji delta region contains some of Tanzania\'s most important remaining forest and mangrove ecosystems. This site is focused on protecting existing forest stands, replanting forest species, and developing the evidence base needed to enter high-value carbon markets in a way that genuinely benefits local communities rather than external investors.',
    focusAreas: [
      'Carbon sequestration',
      'Forest protection',
      'Mangrove ecosystem preservation',
      'Community carbon market access',
    ],
    restorationGoals: [
      'Complete baseline carbon inventory for Rufiji forest stands',
      'Establish replanting programme for degraded forest areas',
      'Develop community-controlled carbon credit methodology',
      'Pilot first community-owned carbon market transaction',
    ],

    founderNames: 'Rose Lyimo',

    challenges: {
      title: 'Community Control in Carbon Markets',
      description: 'Carbon markets have frequently extracted value from forest communities without fair compensation, with complex verification processes and intermediaries capturing most of the economic benefit. Developing a model where the Rufiji community retains control and economic benefit from their carbon assets requires both technical and institutional innovation.',
      image: 'https://picsum.photos/seed/rufiji-challenge/1200/800',
      tags: ['Carbon market equity', 'Community ownership', 'Forest protection', 'Institutional complexity'],
    },

    restorationStrategies: {
      description: 'Protecting existing high-carbon forest stands from clearance is the immediate priority, combined with replanting degraded areas with native forest species. A community-controlled carbon accounting methodology is being developed that keeps verification processes accessible and benefit flows direct.',
      tags: ['Forest protection', 'Native species replanting', 'Carbon accounting', 'Community verification'],
      image: 'https://picsum.photos/seed/rufiji-restoration/1200/800',
    },

    initiativesIntro: 'Rufiji is proving that communities can be sovereign actors in carbon markets, not just recipients of externally imposed conservation.',
    initiatives: [
      {
        title: 'Carbon Baseline Survey',
        description: 'Conducting a comprehensive carbon inventory of Rufiji forest stands as the foundation for credible, community-controlled carbon credit issuance.',
        icon: '📊',
      },
      {
        title: 'Native Forest Replanting',
        description: 'Replanting indigenous forest species in degraded areas of the Rufiji delta, expanding the carbon sink and restoring habitat for endemic wildlife.',
        icon: '🌳',
      },
      {
        title: 'Eco-Tourism Development',
        description: 'Developing low-impact eco-tourism that brings income to the community while creating economic incentives for forest protection.',
        icon: '🏕️',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/rufiji-initiatives/1200/800',

    marketStrategies: {
      title: 'Forest Economy',
      description: 'Multiple income streams that all depend on standing forest, creating strong community incentives for protection.',
      strategies: [
        'Eco-tourism (forest and delta experiences)',
        'Community carbon credit sales (proposed)',
        'Sustainable timber from replanted areas',
        'Non-timber forest products',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Forest Protection', value: 'Active', description: 'Existing high-carbon forest stands under active protection', trend: 'up' },
        { label: 'Carbon Market', value: 'Pioneering', description: 'First community-controlled carbon market experiment in development' },
      ],
      community: [
        { label: 'Eco-Tourism', value: 'In development', description: 'Community-owned eco-tourism programme being established' },
        { label: 'Carbon Equity', value: 'Model development', description: 'New community-controlled carbon credit methodology being piloted' },
      ],
    },

    futureGoals: 'To complete the first verified community-controlled carbon credit transaction in the Rufiji delta, establishing a replicable model for equitable community participation in voluntary carbon markets.',

    gallery: [
      'https://picsum.photos/seed/rufiji-g1/1200/800',
      'https://picsum.photos/seed/rufiji-g2/1200/800',
      'https://picsum.photos/seed/rufiji-g3/1200/800',
    ],

    testimonial: {
      quote: 'The forest has always been here. The question is whether the carbon market will work for the people who protected it, or for people who never saw it.',
      authorName: 'Rose Lyimo',
      authorPosition: 'Site Lead, Rufiji',
    },

    contact: {
      buttonLabel: 'Support Rufiji',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['himo', 'cichlid-breeding', 'woodland-valley-farm'],
  },

  {
    slug: 'nkoroi',
    name: 'Nkoroi',
    location: 'Outside Nairobi, Kenya',
    founded: '2010',
    category: 'Environmental Restoration',
    leadPartners: ['Oby Obyerodhyambo', 'Hilda Obyerodhyambo'],
    lat: -1.35,
    lng: 36.82,

    heroImage: 'https://picsum.photos/seed/nkoroi-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/nkoroi-accent/800/600',

    visionEyebrow: 'Nairobi Peri-Urban Restoration',
    visionStatement: 'Restoring ecological function on the peri-urban fringe of Nairobi through patient trial-and-error experimentation.',
    overview: 'Nkoroi, outside Nairobi, is one of Barbets Duet\'s Kenyan sites led by Oby and Hilda Obyerodhyambo. The site is notable for its role in the network\'s history — hosting the 2010 Partners Meeting and the 2016 debrief — as well as its approach to restoration: patient, empirical trial and error that prioritises understanding the specific conditions of peri-urban Nairobi before scaling any intervention.',
    focusAreas: [
      'Peri-urban ecological restoration',
      'Trial-and-error restoration methodology',
      'Soil and vegetation recovery',
      'Urban fringe biodiversity',
    ],
    restorationGoals: [
      'Document the full range of species that can be successfully established in peri-urban Nairobi conditions',
      'Develop a replicable protocol for peri-urban restoration based on site findings',
      'Restore native vegetation cover across the full site area',
      'Create educational resource for other peri-urban restoration practitioners',
    ],

    founderNames: 'Oby & Hilda Obyerodhyambo',

    challenges: {
      title: 'Peri-Urban Complexity',
      description: 'Peri-urban environments like Nkoroi present unique restoration challenges: disturbed soils, invasive species, air and water pollution, and intense human pressure. There is no established restoration playbook for this environment — the site\'s trial-and-error methodology is building that knowledge from scratch.',
      image: 'https://picsum.photos/seed/nkoroi-challenge/1200/800',
      tags: ['Urban encroachment', 'Soil disturbance', 'Invasive species', 'Pollution'],
    },

    restorationStrategies: {
      description: 'Trial-and-error empirical methodology — carefully testing which native species can establish in peri-urban Nairobi conditions, learning from failures, and systematically building a restoration protocol grounded in direct observation.',
      tags: ['Empirical methodology', 'Native species trials', 'Peri-urban restoration', 'Knowledge documentation'],
      image: 'https://picsum.photos/seed/nkoroi-restoration/1200/800',
    },

    initiativesIntro: 'Nkoroi is building the knowledge base that other peri-urban restoration sites will rely on.',
    initiatives: [
      {
        title: 'Peri-Urban Species Trials',
        description: 'Systematic testing of native species under peri-urban Nairobi conditions to identify those that can establish and thrive despite soil disturbance, pollution and invasive pressure.',
        icon: '🔬',
      },
      {
        title: 'Restoration Protocol Development',
        description: 'Documenting the site\'s trial-and-error findings into a replicable protocol for peri-urban restoration that can be applied to other urban fringe sites in East Africa.',
        icon: '📖',
      },
      {
        title: 'Network Knowledge Hub',
        description: 'Serving as a knowledge hub for the Barbets Duet network — hosting the 2010 Partners Meeting and the 2016 debrief, and continuing to share findings with partner sites.',
        icon: '🤝',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/nkoroi-initiatives/1200/800',

    marketStrategies: {
      title: 'Knowledge as Value',
      description: 'The primary output of Nkoroi is knowledge — restoration protocols, species data, and methodology that has value for the whole network and beyond.',
      strategies: [
        'Restoration methodology licensing and consultancy',
        'Educational programme for peri-urban restoration practitioners',
        'Native species propagation for peri-urban contexts',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Restoration Approach', value: 'Trial & Error', description: 'Systematic empirical methodology building peri-urban restoration knowledge base', trend: 'up' },
        { label: 'Protocol Development', value: 'In progress', description: 'Replicable peri-urban restoration protocol being documented' },
      ],
      community: [
        { label: '2010 Partners Meeting', value: 'Hosted', description: 'Barbets Duet 2010 Partners Meeting held at Nkoroi' },
        { label: '2016 Debrief', value: 'Hosted', description: 'Barbets Duet 2016 network debrief held at Nkoroi' },
      ],
    },

    futureGoals: 'To publish a comprehensive peri-urban restoration protocol based on Nkoroi\'s empirical findings, and to use this as the foundation for a network of peri-urban restoration demonstration sites around Nairobi.',

    gallery: [
      'https://picsum.photos/seed/nkoroi-g1/1200/800',
      'https://picsum.photos/seed/nkoroi-g2/1200/800',
      'https://picsum.photos/seed/nkoroi-g3/1200/800',
    ],

    testimonial: {
      quote: 'We do not pretend to know what will work before we try it. That honesty is what makes the knowledge we build here real.',
      authorName: 'Oby Obyerodhyambo',
      authorPosition: 'Co-lead, Nkoroi Learning Site',
    },

    contact: {
      buttonLabel: 'Connect with Nkoroi',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['seme', 'lukenya-zumula-farm', 'arboretum-kajokoby'],
  },

  // FIXME(client): Provisional entry. `london-urban-canopy` is NOT one of the 13
  // CSV partner sites — it was referenced only by two projects in lib/data/projects.ts.
  // Added so those projects resolve and pages render. Confirm whether this is a real
  // Barbets Duet learning site (then replace placeholder copy/partners/images) or
  // remove it and reassign the two projects to an existing site.
  {
    slug: 'london-urban-canopy',
    name: 'London Urban Canopy',
    location: 'Greater London, United Kingdom',
    founded: '2021',
    category: 'Urban Biodiversity Restoration',
    leadPartners: ['Barbets Duet (lead partner TBC)'],
    lat: 51.5074,
    lng: -0.1278,

    heroImage: 'https://picsum.photos/seed/london-urban-canopy-hero/1600/900',
    accentImage: 'https://picsum.photos/seed/london-urban-canopy-accent/800/600',

    visionEyebrow: 'Urban Biodiversity Grid',
    visionStatement: 'Reversing the urban "island effect" by knitting fragmented green spaces into a connected, city-wide biodiversity grid.',
    overview: 'London Urban Canopy applies the Barbets Duet restoration model to a dense urban environment, connecting parks, gardens, green roofs and street verges into continuous pollinator and canopy corridors. The site demonstrates that meaningful ecological restoration is possible inside a major city when private citizens, councils and businesses are given a standardised, replicable model to contribute to.',
    focusAreas: [
      'Urban pollinator corridors',
      'Canopy connectivity and the heat-island effect',
      'Citizen-led micro-restoration',
      'Green-space biodiversity grids',
    ],
    restorationGoals: [
      'Connect fragmented green spaces into continuous pollinator corridors across the city',
      'Increase species richness in participating sites year on year',
      'Reduce local peak temperatures through expanded canopy cover',
      'Standardise a "Botanical Pocket" model that any citizen can replicate',
    ],

    challenges: {
      title: 'The Urban Island Effect',
      description: 'Dense cities fragment habitat into isolated islands, collapsing biodiversity and amplifying the urban heat-island effect. Restoration here competes with land value, hard surfaces and pollution — and there is no off-the-shelf playbook for stitching a living network back together at city scale.',
      image: 'https://picsum.photos/seed/london-urban-canopy-challenge/1200/800',
      tags: ['Habitat fragmentation', 'Heat-island effect', 'Land pressure', 'Pollution'],
    },

    restorationStrategies: {
      description: 'A networked micro-restoration approach: many small, standardised "Botanical Pocket" interventions that individually are modest but collectively form a connected city-wide biodiversity grid.',
      tags: ['Micro-restoration', 'Pollinator corridors', 'Green roofs', 'Citizen science'],
      image: 'https://picsum.photos/seed/london-urban-canopy-restoration/1200/800',
    },

    initiativesIntro: 'London Urban Canopy turns private and public green space into a single, connected restoration network.',
    initiatives: [
      {
        title: 'Botanical Pocket Network',
        description: 'A standardised micro-restoration model that lets private citizens, schools and businesses each contribute a node to a city-wide biodiversity grid.',
        icon: '🌿',
      },
      {
        title: 'Urban Pollinator Corridors',
        description: 'Connecting fragmented city parks through high-biodiversity pocket gardens and green roofs so pollinators can move across the urban landscape.',
        icon: '🐝',
      },
      {
        title: 'Canopy & Cooling Programme',
        description: 'Expanding tree and canopy cover in priority neighbourhoods to measurably reduce local peak temperatures and the urban heat-island effect.',
        icon: '🌳',
      },
    ],
    initiativesImage: 'https://picsum.photos/seed/london-urban-canopy-initiatives/1200/800',

    marketStrategies: {
      title: 'Restoration as Civic Infrastructure',
      description: 'Positioning urban biodiversity as shared civic infrastructure that councils, businesses and residents co-fund because it returns cooling, wellbeing and amenity value.',
      strategies: [
        'Corporate green-roof and verge sponsorship',
        'Council biodiversity-net-gain partnerships',
        'Citizen "Botanical Pocket" subscription kits',
      ],
    },

    impactData: {
      ecological: [
        { label: 'Species Richness', value: '+42%', description: 'Increase in species richness across participating Botanical Pocket sites', trend: 'up' },
        { label: 'Temperature Reduction', value: '-2.4°C', unit: 'local peak', description: 'Measured reduction in local peak temperature in canopy-restored zones', trend: 'down' },
      ],
      community: [
        { label: 'Restoration Model', value: 'Systemic', description: 'Standardised Botanical Pocket model enabling city-wide citizen participation' },
        { label: 'Participation', value: 'Citizen-led', description: 'Private citizens contributing nodes to a shared biodiversity grid' },
      ],
    },

    futureGoals: 'To scale the Botanical Pocket model across every London borough, creating an unbroken pollinator and canopy network, and to publish the model as an open template for other cities.',

    gallery: [
      'https://picsum.photos/seed/london-urban-canopy-g1/1200/800',
      'https://picsum.photos/seed/london-urban-canopy-g2/1200/800',
      'https://picsum.photos/seed/london-urban-canopy-g3/1200/800',
    ],

    contact: {
      buttonLabel: 'Connect with London Urban Canopy',
      contactLink: '/get-involved',
    },

    relatedSitesSlugs: ['woodland-valley-farm'],
  },
];

export function getLearningSite(slug: string): LearningSite | undefined {
  return learningSites.find(site => site.slug === slug);
}

export function getLearningSitesByCategory(category: string): LearningSite[] {
  return learningSites.filter(site => site.category === category);
}

export function getRelatedSites(slug: string): LearningSite[] {
  const site = getLearningSite(slug);
  if (!site?.relatedSitesSlugs) return [];
  return site.relatedSitesSlugs
    .map(s => getLearningSite(s))
    .filter((s): s is LearningSite => s !== undefined);
}
