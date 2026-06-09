import { defineField, defineType } from 'sanity';

export const learningSiteSchema = defineType({
  name: 'learningSite',
  title: 'Learning Site',
  type: 'document',
  fields: [
    // --- Identity ---
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this site (e.g. "woodland-valley-farm"). Click "Generate" to create from the name.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      description: 'The full name of this learning site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Country or region (e.g. "Kenya", "Tanzania", "United Kingdom").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founded',
      title: 'Founded Year',
      type: 'string',
      description: 'The year this site was established (e.g. "2012").',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The primary ecological category of this site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadPartners',
      title: 'Lead Partners',
      type: 'array',
      description: 'Names of the organisations or individuals leading this site.',
      of: [{ type: 'string' }],
    }),

    // --- Map Coordinates ---
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
      description: 'GPS latitude (decimal degrees). Required for the interactive map.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lng',
      title: 'Longitude',
      type: 'number',
      description: 'GPS longitude (decimal degrees). Required for the interactive map.',
      validation: (Rule) => Rule.required(),
    }),

    // --- Hero ---
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'The main banner image shown at the top of the site page.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video URL',
      type: 'url',
      description: 'Optional YouTube or Vimeo URL for a hero video background.',
    }),
    defineField({
      name: 'accentImage',
      title: 'Accent Image',
      type: 'image',
      description: 'Secondary image used in the hero layout.',
      options: { hotspot: true },
    }),

    // --- Overview ---
    defineField({
      name: 'visionEyebrow',
      title: 'Vision Eyebrow',
      type: 'string',
      description: 'Short label that appears above the vision statement (e.g. "Community Restoration").',
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
      description: 'A 1-2 sentence statement of this site\'s ecological vision. Appears prominently on the detail page and in search results.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      description: 'A longer description of the site for the overview section.',
    }),
    defineField({
      name: 'focusAreas',
      title: 'Focus Areas',
      type: 'array',
      description: 'Key ecological or community focus areas (e.g. "Agroforestry", "Seaweed cultivation").',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'restorationGoals',
      title: 'Restoration Goals',
      type: 'array',
      description: 'Specific goals for ecological restoration at this site.',
      of: [{ type: 'string' }],
    }),

    // --- Sidebar ---
    defineField({
      name: 'founderNames',
      title: 'Founder Names',
      type: 'string',
      description: 'Names of the site founders (displayed in the sidebar).',
    }),
    defineField({
      name: 'memberNames',
      title: 'Member Names',
      type: 'string',
      description: 'Key community member names associated with this site.',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'External website for this site, if any.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Social media or external links for this site.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string', description: 'e.g. Twitter, Facebook, Instagram' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),

    // --- Challenges ---
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'object',
      description: 'The primary challenge section displayed on the site page.',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),

    // --- Restoration Strategies ---
    defineField({
      name: 'restorationStrategies',
      title: 'Restoration Strategies',
      type: 'object',
      description: 'Ecological restoration methods used at this site (distinct from market strategies).',
      fields: [
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'tags', title: 'Strategy Tags', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // --- Initiatives ---
    defineField({
      name: 'initiativesIntro',
      title: 'Initiatives Intro',
      type: 'text',
      description: 'Brief introduction text for the initiatives section.',
    }),
    defineField({
      name: 'initiatives',
      title: 'Initiatives',
      type: 'array',
      description: 'Key projects or initiatives at this site.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name (e.g. "Leaf", "Droplets").' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'initiativesImage',
      title: 'Initiatives Section Image',
      type: 'image',
      description: 'Background or decorative image for the initiatives section.',
      options: { hotspot: true },
    }),

    // --- Market Strategies ---
    defineField({
      name: 'marketStrategies',
      title: 'Market Strategies',
      type: 'object',
      description: 'Economic and market-based strategies used at this site.',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'strategies', title: 'Strategy List', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),

    // --- Impact Data ---
    defineField({
      name: 'impactIntro',
      title: 'Impact Intro',
      type: 'text',
      description: 'Introductory text for the impact section.',
    }),
    defineField({
      name: 'impactReports',
      title: 'Impact Reports',
      type: 'array',
      description: 'Links to published impact or research reports.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Report Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'Report URL', type: 'url', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'impactData',
      title: 'Impact Data',
      type: 'object',
      description: 'Quantified ecological and community impact statistics.',
      fields: [
        defineField({
          name: 'ecological',
          title: 'Ecological Impact Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'description', title: 'Description', type: 'string' }),
                defineField({
                  name: 'trend',
                  title: 'Trend',
                  type: 'string',
                  options: { list: [{ value: 'up', title: 'Improving' }, { value: 'down', title: 'Declining' }] },
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'community',
          title: 'Community Impact Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'description', title: 'Description', type: 'string' }),
                defineField({
                  name: 'trend',
                  title: 'Trend',
                  type: 'string',
                  options: { list: [{ value: 'up', title: 'Improving' }, { value: 'down', title: 'Declining' }] },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'impactImages',
      title: 'Impact Section Images',
      type: 'array',
      description: 'Images displayed in the impact section.',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // --- Future Goals ---
    defineField({
      name: 'futureGoals',
      title: 'Future Goals',
      type: 'text',
      description: 'A description of this site\'s future aspirations and planned growth.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'futureGoalsImage',
      title: 'Future Goals Image',
      type: 'image',
      description: 'Image associated with the future goals section.',
      options: { hotspot: true },
    }),

    // --- Gallery ---
    defineField({
      name: 'galleryText',
      title: 'Gallery Introduction Text',
      type: 'text',
      description: 'Optional text displayed above the photo gallery.',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      description: 'Photos from this learning site. Upload high-quality images; Sanity will auto-generate responsive sizes.',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // --- Testimonial ---
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      description: 'A quote from a community member or partner at this site.',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'authorName', title: 'Author Name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'authorPosition', title: 'Author Position / Role', type: 'string' }),
        defineField({ name: 'authorAvatar', title: 'Author Photo', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // --- Contact ---
    defineField({
      name: 'contact',
      title: 'Contact Block',
      type: 'object',
      description: 'Call-to-action contact information shown at the bottom of the site page.',
      fields: [
        defineField({ name: 'intro', title: 'Intro Text', type: 'text' }),
        defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'contactLink', title: 'Contact Link (email or URL)', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),

    // --- Network ---
    defineField({
      name: 'featuredSite',
      title: 'Featured Related Site',
      type: 'reference',
      description: 'The single most closely related learning site to feature.',
      to: [{ type: 'learningSite' }],
    }),
    defineField({
      name: 'relatedSites',
      title: 'Related Learning Sites',
      type: 'array',
      description: 'Other Jumuiya sites to recommend from this site\'s page.',
      of: [{ type: 'reference', to: [{ type: 'learningSite' }] }],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'heroImage',
    },
  },
});
