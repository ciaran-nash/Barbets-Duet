export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  label: string;
  author: string;
  published: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'restoring-the-kenyan-highlands',
    title: 'Restoring the Kenyan Highlands',
    summary:
      'Learn how our community-led initiatives are bringing back native flora and fauna to the Kenyan highlands, improving water retention and soil health.',
    content: `The Kenyan highlands have long been a focal point for Barbets Duet restoration work. Over the past three years, our community partners have replanted over 40,000 native trees across degraded hillsides, resulting in measurable improvements in water retention and soil stabilisation.

Local farmers report that seasonal springs, which had run dry for decades, are flowing again. Soil erosion has dropped by an estimated 60% in targeted zones. The work is far from finished, but the trajectory is clear: when communities are given ownership of restoration outcomes, the results compound.

Our approach combines traditional ecological knowledge with modern monitoring tools. Community rangers use simple sensor networks to track soil moisture and biodiversity indicators, feeding data back to our research partners for long-term analysis.`,
    label: 'Ecology',
    author: 'Jane Doe',
    published: '12 Oct 2024',
    image:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1200&h=675',
  },
  {
    slug: 'sustainable-finance-for-conservation',
    title: 'Sustainable Finance for Conservation',
    summary:
      'A deep dive into how we use innovative financing models to support long-term ecosystem restoration projects around the globe.',
    content: `Conservation without sustainable funding is conservation on borrowed time. Barbets Duet has spent years developing financing models that align economic incentives with ecological outcomes — ensuring that restoration work outlasts any single grant cycle.

Our blended-finance approach draws on three pillars: community savings groups that build local capital, impact investment from aligned institutional partners, and revenue-generating land-use activities that fund ongoing stewardship.

The results are encouraging. Sites that adopted this model three years ago are now largely self-funding their maintenance costs. The goal is not dependency on external capital, but the cultivation of financial ecosystems as resilient as the natural ones we are trying to restore.`,
    label: 'Finance',
    author: 'John Smith',
    published: '28 Sep 2024',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=675',
  },
  {
    slug: 'community-growth-in-action',
    title: 'Community Growth in Action',
    summary:
      'Meet the local leaders driving change in their communities. Their stories are a testament to the power of grassroots conservation efforts.',
    content: `Behind every hectare of restored land is a person who decided to act. Barbets Duet works with community leaders across twelve countries, and the diversity of their approaches is as rich as the ecosystems they protect.

In the delta region, a cooperative of women farmers shifted from slash-and-burn agriculture to agroforestry after participating in a Barbets Duet exchange programme. Within two seasons they were training their neighbours. In the highlands, a youth-led ranger corps has become the most effective anti-poaching unit in the district.

These stories share a common thread: lasting change does not arrive from outside. It emerges from within communities when the right resources, knowledge, and networks are present. Our role is to build those conditions, then get out of the way.`,
    label: 'Community',
    author: 'Alice Johnson',
    published: '15 Sep 2024',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200&h=675',
  },
];
