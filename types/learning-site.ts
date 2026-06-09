export interface ImpactStat {
  label: string;
  value: string;
  description: string;
  trend?: 'up' | 'down';
}

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
    ecological: ImpactStat[];
    community: ImpactStat[];
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

  // ── Community Network fields (Wave 5, Task B1) ──────────────
  // These are populated from the Supabase learning_sites table;
  // the static TS data in lib/data/learning-sites.ts may omit them.

  /**
   * Pentangle geographic cluster for this site.
   * 'east_african' | 'usa_ne' | 'uk_cornwall' | 'india' | undefined
   */
  pentangleGroup?: string;

  /**
   * Cached member count from learning_site_memberships.
   * Updated by database trigger on membership changes.
   */
  memberCount?: number;

  /**
   * URL to the site's forum thread (Wave 6).
   * Null/undefined until forums are live.
   */
  forumLink?: string;

  /**
   * 1-indexed position in the pentangle peer-review chain.
   * Null/undefined for sites not yet assigned to a chain.
   */
  peerReviewChainPosition?: number;
}
