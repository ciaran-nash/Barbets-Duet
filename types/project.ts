import type { ImpactPoint } from '@/types/shared';

export type ProjectMaturity = 'Idea' | 'Pilot' | 'Scaling' | 'Systemic';

/** @deprecated Use ImpactPoint from @/types/shared directly */
export type ProjectImpact = ImpactPoint;

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'Mariculture' | 'Agroforestry' | 'Urban' | 'Bio-Materials';
  siteSlug: string;
  maturity: ProjectMaturity;
  image: string;
  featured?: boolean;
  impactMetrics: ImpactPoint[];
  innovationSummary: string;
  longDescription: string;
}
