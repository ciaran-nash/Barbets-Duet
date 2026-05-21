export interface ImpactMetric {
  label: string;
  value: string;
  unit: string;
}

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'Restoration' | 'Community' | 'Innovation';
  date: string;
  readTime: string;
  impactMetrics: ImpactMetric[];
  siteSlug?: string;
}

export interface BarbetsEvent {
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Convention' | 'Workshop' | 'Lab Day' | 'Summit';
  image: string;
  link?: string;
  registrationStatus: 'Open' | 'Waitlist' | 'Closed';
  siteSlug?: string;
}
