import { defineField, defineType } from 'sanity';

export const researchSchema = defineType({
  name: 'researchPaper',
  title: 'Research Paper',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this paper. Click "Generate" to create from the title.',
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
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      description: 'A short summary shown on cards and at the top of the paper page.',
      validation: (Rule) => Rule.required().max(800),
    }),
    defineField({
      name: 'area',
      title: 'Research Area',
      type: 'string',
      options: {
        list: [
          { title: 'Ecosystem Finance Models', value: 'ecosystem-finance' },
          { title: 'Community Behaviour Change', value: 'behaviour-change' },
          { title: 'Biodiversity Measurement', value: 'biodiversity-measurement' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'string',
      description: 'Comma-separated author names (e.g. "A. Mwangi, J. Smith").',
    }),
    defineField({
      name: 'published',
      title: 'Published Date',
      type: 'string',
      description: 'Human-readable publication date (e.g. "12 Oct 2026").',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The full paper body or findings summary. Separate paragraphs with blank lines.',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Link',
      type: 'url',
      description: 'Optional link to the full paper (journal, PDF, preprint).',
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'area' },
  },
});
