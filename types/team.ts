export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  location?: string;
  siteSlug?: string;       // link to associated learning site
  siteSlugs?: string[];    // for members associated with multiple sites
  avatar?: string;         // image URL
  joinedYear?: string;
  isCoreTeam?: boolean;    // founding/core vs site manager
}
