import { defineField, defineType } from 'sanity';

export const storySchema = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this story. Click "Generate" to create from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      description: 'The main title displayed at the top of the story page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A short subtitle shown below the main title.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A 1-2 sentence summary used in story cards and social previews.',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'content',
      title: 'Story Content',
      type: 'array',
      description: 'The full story. Use the toolbar to add headings, bold text, images, bullet lists, and more.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the image for accessibility and SEO.' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      description: 'The main cover image shown in story cards and at the top of the story.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The thematic category for this story.',
      options: {
        list: [
          { value: 'Restoration', title: 'Restoration' },
          { value: 'Community', title: 'Community' },
          { value: 'Innovation', title: 'Innovation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      description: 'When this story was published (YYYY-MM-DD).',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'Estimated read time (e.g. "5 min read"). Can be calculated manually or auto-filled.',
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Impact Metrics',
      type: 'array',
      description: 'Key quantified outcomes from this story (e.g. "500 trees planted").',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Metric Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'unit', title: 'Unit', type: 'string', description: 'e.g. "hectares", "families", "species"' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'associatedSite',
      title: 'Associated Learning Site',
      type: 'reference',
      description: 'Which Jumuiya learning site is this story about?',
      to: [{ type: 'learningSite' }],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
});
