// ============================================================
// Sanity Schema: trialAndError — Wave 6, Task C1
// ============================================================
// Document type for member Trial & Error contributions.
// 4 mandatory prompts + metadata fields.
// Studio validation: all 4 prompts required before publish.
// ============================================================

import { defineField, defineType } from 'sanity';

export const trialAndErrorSchema = defineType({
  name: 'trialAndError',
  title: 'Trial & Error',
  type: 'document',
  description:
    'A member contribution answering the 4 Barbets Duet reflection prompts. All 4 answers are required before publishing.',

  fields: [
    // ── Identity ───────────────────────────────────────────

    defineField({
      name: 'title',
      title: 'Entry Title',
      type: 'string',
      description: 'Short descriptive title for this T&E entry (auto-generated or member-supplied).',
      validation: (Rule) => Rule.required().max(120),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ── 4 Mandatory Prompts ────────────────────────────────

    defineField({
      name: 'prompt1',
      title: 'Prompt 1 — What have you tried and how did it turn out?',
      type: 'array',
      description:
        'Describe an experiment or action you undertook on your land or community. What happened?',
      of: [{ type: 'block' }],
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value || value.length === 0) {
            return 'Prompt 1 is required before publishing.';
          }
          return true;
        }),
    }),

    defineField({
      name: 'prompt2',
      title: 'Prompt 2 — What was your biggest mistake?',
      type: 'array',
      description:
        'Honest reflection on what went wrong. Mistakes shared here help the whole network learn.',
      of: [{ type: 'block' }],
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value || value.length === 0) {
            return 'Prompt 2 is required before publishing.';
          }
          return true;
        }),
    }),

    defineField({
      name: 'prompt3',
      title: 'Prompt 3 — What did you learn and what made you laugh?',
      type: 'array',
      description:
        'Learning and levity — what insight did you gain, and what brought joy or surprise?',
      of: [{ type: 'block' }],
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value || value.length === 0) {
            return 'Prompt 3 is required before publishing.';
          }
          return true;
        }),
    }),

    defineField({
      name: 'prompt4',
      title: 'Prompt 4 — Who would you include in your own Barbet circle and why?',
      type: 'array',
      description:
        'Name up to 5 people (real or imagined) you would bring into your peer learning circle and your reasoning.',
      of: [{ type: 'block' }],
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value || value.length === 0) {
            return 'Prompt 4 is required before publishing.';
          }
          return true;
        }),
    }),

    // ── Attribution ────────────────────────────────────────

    defineField({
      name: 'siteSlug',
      title: 'Learning Site',
      type: 'string',
      description:
        'Slug of the Barbets Duet learning site this entry is associated with. Must match a slug in lib/data/learning-sites.ts.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'authorMemberSlug',
      title: 'Author Member Slug',
      type: 'string',
      description: 'Supabase profile ID or member slug of the submitting member.',
      validation: (Rule) => Rule.required(),
    }),

    // ── Taxonomy ───────────────────────────────────────────

    defineField({
      name: 'challengeType',
      title: 'Challenge Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Carbon Sequestration', value: 'carbon_sequestration' },
          { title: 'Biodiversity Loss', value: 'biodiversity_loss' },
          { title: 'Water Management', value: 'water_management' },
          { title: 'Soil Health', value: 'soil_health' },
          { title: 'Agricultural Transition', value: 'agricultural_transition' },
          { title: 'Community Governance', value: 'community_governance' },
          { title: 'Economic Viability', value: 'economic_viability' },
          { title: 'Climate Adaptation', value: 'climate_adaptation' },
          { title: 'Invasive Species', value: 'invasive_species' },
          { title: 'Land Rights', value: 'land_rights' },
        ],
        layout: 'tags',
      },
    }),

    defineField({
      name: 'interventionType',
      title: 'Intervention Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Agroforestry', value: 'agroforestry' },
          { title: 'Rewilding', value: 'rewilding' },
          { title: 'Rotational Grazing', value: 'rotational_grazing' },
          { title: 'Permaculture', value: 'permaculture' },
          { title: 'Community Organizing', value: 'community_organizing' },
          { title: 'Water Harvesting', value: 'water_harvesting' },
          { title: 'Seed Banking', value: 'seed_banking' },
          { title: 'Education Programme', value: 'education_programme' },
          { title: 'Market Systems', value: 'market_systems' },
          { title: 'Policy Advocacy', value: 'policy_advocacy' },
        ],
        layout: 'tags',
      },
    }),

    defineField({
      name: 'propertyRightsRegime',
      title: 'Property Rights Regime',
      type: 'string',
      options: {
        list: [
          { title: 'Mosaic (Collective)', value: 'mosaic' },
          { title: 'Column (Individual)', value: 'column' },
          { title: 'Mixed / Transitioning', value: 'mixed' },
          { title: 'Not Applicable', value: 'na' },
        ],
        layout: 'radio',
      },
    }),

    // ── Media ──────────────────────────────────────────────

    defineField({
      name: 'images',
      title: 'Supporting Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for screen readers. Required for each uploaded image.',
              validation: (Rule) => Rule.required().error('Alt text is required for every image.'),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),

    // ── Status / workflow ──────────────────────────────────

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'draft',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Pending Review', value: 'pending_review' },
          { title: 'Published', value: 'published' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      description: 'Set automatically when the author submits for review.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Set by Site Coordinator when approving the entry.',
    }),
  ],

  // ── Studio preview ──────────────────────────────────────

  preview: {
    select: {
      title: 'title',
      site: 'siteSlug',
      author: 'authorMemberSlug',
      status: 'status',
    },
    prepare({ title, site, author, status }) {
      return {
        title: title ?? 'Untitled T&E Entry',
        subtitle: `${site ?? 'No site'} · ${author ?? 'Unknown author'} · ${status ?? 'draft'}`,
      };
    },
  },
});
