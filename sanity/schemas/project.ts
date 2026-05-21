import { defineField, defineType } from 'sanity';

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this project. Click "Generate" to create from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The name of the project.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A concise description shown in project cards.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'longDescription',
      title: 'Full Description',
      type: 'text',
      description: 'The detailed project description shown on the project detail view.',
    }),
    defineField({
      name: 'innovationSummary',
      title: 'Innovation Summary',
      type: 'text',
      description: 'What is novel or innovative about this project?',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The project\'s primary ecological or economic category.',
      options: {
        list: [
          { value: 'Mariculture', title: 'Mariculture' },
          { value: 'Agroforestry', title: 'Agroforestry' },
          { value: 'Urban', title: 'Urban' },
          { value: 'Bio-Materials', title: 'Bio-Materials' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedSite',
      title: 'Associated Learning Site',
      type: 'reference',
      description: 'The Jumuiya learning site where this project is based.',
      to: [{ type: 'learningSite' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'maturity',
      title: 'Project Maturity',
      type: 'string',
      description: 'How developed or scaled this project currently is.',
      options: {
        list: [
          { value: 'Idea', title: 'Idea — concept stage' },
          { value: 'Pilot', title: 'Pilot — being tested' },
          { value: 'Scaling', title: 'Scaling — proven, expanding' },
          { value: 'Systemic', title: 'Systemic — fully embedded' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      description: 'Main image shown in project cards and the detail view.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'If checked, this project may be highlighted on the homepage or projects index.',
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Impact Metrics',
      type: 'array',
      description: 'Quantified outcomes from this project.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Metric Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'unit', title: 'Unit', type: 'string', description: 'e.g. "tonnes", "km²", "households"' }),
          ],
        },
      ],
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
