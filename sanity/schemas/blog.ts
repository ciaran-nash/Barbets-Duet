import { defineField, defineType } from 'sanity';

export const blogSchema = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this post. Click "Generate" to create from the title.',
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
      description: 'A 1-2 sentence summary used in post cards and previews.',
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The full post body. Separate paragraphs with blank lines.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label / Topic',
      type: 'string',
      description: 'A short topic tag (e.g. "Ecology", "Finance").',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'published',
      title: 'Published Date',
      type: 'string',
      description: 'Human-readable publication date (e.g. "12 Oct 2024").',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'label', media: 'image' },
  },
});
