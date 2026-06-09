export interface NewsItem {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  image: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: 'barbets-duet-expands-to-southeast-asia',
    title: 'Barbets Duet Expands to Southeast Asia',
    summary:
      'We are proud to announce the launch of three new learning sites across Vietnam, Indonesia, and the Philippines, marking our first major expansion into Southeast Asia.',
    content: `Barbets Duet is expanding. After three years of building our model in East Africa and Central America, we are ready to bring that learning to Southeast Asia — a region of extraordinary biodiversity and rapid environmental change.

Our first three sites will be located in the Mekong Delta of Vietnam, the highlands of North Sulawesi in Indonesia, and the Cordillera region of Luzon in the Philippines. Each has been identified through a 12-month community consultation process and represents a distinct ecological context.

The Vietnam site focuses on mangrove and freshwater fishery restoration. North Sulawesi will centre on coral reef recovery linked to community-led marine protected areas. The Luzon site addresses upland deforestation through indigenous land tenure and agroforestry partnerships.

We expect all three sites to be operational by mid-2025. Partner applications are now open.`,
    category: 'Expansion',
    date: '3 Nov 2024',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200&h=675',
  },
  {
    slug: 'new-impact-measurement-framework-launched',
    title: 'New Impact Measurement Framework Launched',
    summary:
      'Our updated impact measurement framework brings greater rigour and transparency to how we track ecological and social outcomes across all learning sites.',
    content: `Measuring what matters is hard. For years, conservation organisations — including Barbets Duet — have relied on proxies and estimates that understate complexity and obscure trade-offs. Today we are publishing a new framework designed to do better.

The Barbets Duet Impact Framework v2.0 introduces three principal improvements. First, we have moved from annual snapshot reporting to continuous monitoring using low-cost sensor networks and community-collected data. Second, we have adopted a theory-of-change structure that explicitly maps our activities to measurable ecological and social outcomes. Third, all site data will now be published quarterly in a publicly accessible dashboard.

We are aware this creates accountability we cannot easily walk back. That is the point. Transparent data invites scrutiny, and scrutiny makes us better.

The framework documentation is available on our website. We welcome feedback from peers, critics, and anyone working in the same space.`,
    category: 'Methodology',
    date: '19 Oct 2024',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=675',
  },
  {
    slug: 'annual-summit-2024-recap',
    title: 'Annual Summit 2024: Key Takeaways',
    summary:
      'Over 200 practitioners, community leaders, and researchers gathered for our annual summit. Here are the conversations that will shape our work in 2025.',
    content: `The 2024 Barbets Duet Annual Summit brought together 214 participants from 38 countries. Four days of sessions, field visits, and late-evening conversations produced more clarity — and more productive disagreement — than we have seen in any previous gathering.

Three themes dominated the agenda. The first was finance: how do we move from project-by-project funding to long-term capitalisation of community-led restoration? The second was governance: as our network grows, how do we maintain authentic community control without sacrificing coordination? The third was measurement: the tension between rigour and accessibility in impact reporting ran through almost every session.

We left without resolved answers, but with much better questions. The summit working groups will continue meeting through Q1 2025, and outputs will be shared publicly as they emerge.

Our thanks to the hosting community in Nairobi and to all participants who made the journey.`,
    category: 'Events',
    date: '5 Oct 2024',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200&h=675',
  },
];
