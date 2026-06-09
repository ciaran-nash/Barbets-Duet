import type { ImpactPoint } from '@/types/shared';
import type { Project } from '@/types/project';

/** @deprecated Use ImpactPoint from @/types/shared directly */
export type ImpactStat = ImpactPoint;

export interface ImpactReport {
  label: string;
  url: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorAvatar?: string;
}

export interface ContactBlock {
  intro?: string;
  buttonLabel: string;
  contactLink: string;
}

export interface SiteInitiative {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface LearningSite {
  slug: string;
  name: string;
  location: string;
  founded: string;
  category: string;
  leadPartners: string[];

  // Geographic coordinates for map display (required — used by T12/T13 MapLibre map)
  lat: number;
  lng: number;

  // Hero
  heroImage: string;
  heroVideo?: string;
  accentImage?: string;

  // Overview
  visionEyebrow: string;
  visionStatement: string;
  overview?: string;
  focusAreas?: string[];
  restorationGoals?: string[];

  // Sidebar details
  founderNames?: string;
  memberNames?: string;
  websiteUrl?: string;
  socialLinks?: SocialLink[];

  // Challenges
  challenges: {
    title: string;
    description: string;
    image: string;
    tags?: string[];
  };

  // Restoration strategies (ecological methods — distinct from market strategies)
  restorationStrategies?: {
    description?: string;
    tags?: string[];
    image?: string;
  };

  // Initiatives / Projects
  initiativesIntro?: string;
  initiatives: SiteInitiative[];
  initiativesImage?: string;

  // Market strategies
  marketStrategies: {
    title: string;
    description: string;
    strategies: string[];
  };

  // Impact data
  impactIntro?: string;
  impactReports?: ImpactReport[];
  impactData: {
    ecological: ImpactPoint[];
    community: ImpactPoint[];
  };
  impactImages?: string[];

  // Future goals
  futureGoals: string;
  futureGoalsImage?: string;

  // Gallery
  galleryText?: string;
  gallery: string[];

  // Testimonial
  testimonial?: Testimonial;

  // Contact
  contact?: ContactBlock;

  // Network
  featuredSiteSlug?: string;
  relatedSitesSlugs?: string[];

  pentangleGroup?: string;
  memberCount?: number;
  forumLink?: string;
  peerReviewChainPosition?: number;

  projects?: Project[];
}
