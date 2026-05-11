export interface ImpactStat {
  label: string;
  value: string;
  description: string;
  trend?: 'up' | 'down';
}

export interface SiteInitiative {
  title: string;
  description: string;
  image?: string;
}

export interface LearningSite {
  slug: string;
  name: string;
  location: string;
  founded: string;
  category: string;
  leadPartners: string[];
  heroImage: string;
  accentImage?: string;
  visionEyebrow: string;
  visionStatement: string;
  challenges: {
    title: string;
    description: string;
    image: string;
  };
  initiatives: SiteInitiative[];
  marketStrategies: {
    title: string;
    description: string;
    strategies: string[];
  };
  impactData: {
    ecological: ImpactStat[];
    community: ImpactStat[];
  };
  futureGoals: string;
  gallery: string[];
}
