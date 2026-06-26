import { defineField, defineType } from 'sanity';

export const newsSchema = defineType({
  name: 'newsItem',
  title: 'News Item',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this item. Click "Generate" to create from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A 1-2 sentence summary used in news cards and previews.',
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The full news body. Separate paragraphs with blank lines.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'A short category tag (e.g. "Expansion", "Research").',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Human-readable date (e.g. "3 Nov 2024").',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
});
