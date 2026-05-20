export type ProjectMaturity = 'Idea' | 'Pilot' | 'Scaling' | 'Systemic';

export interface ProjectImpact {
  label: string;
  value: string;
  unit?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'Mariculture' | 'Agroforestry' | 'Urban' | 'Bio-Materials';
  siteSlug: string;
  maturity: ProjectMaturity;
  image: string;
  featured?: boolean;
  impactMetrics: ProjectImpact[];
  innovationSummary: string;
  longDescription: string;
}
