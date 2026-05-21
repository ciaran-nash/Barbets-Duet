import { defineField, defineType } from 'sanity';

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-safe identifier for this person (e.g. "barbara-heinzen"). Click "Generate".',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'The person\'s full name as it should appear on the site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'Their role at Barbets Duet or associated site (e.g. "Site Communications Administrator", "Co-Founder").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'A short biography for display on the team page.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Country or city where this person is based.',
    }),
    defineField({
      name: 'avatar',
      title: 'Profile Photo',
      type: 'image',
      description: 'Headshot or profile photo. Displayed on team cards.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'joinedYear',
      title: 'Year Joined',
      type: 'string',
      description: 'The year they joined Barbets Duet (e.g. "2014").',
    }),
    defineField({
      name: 'isCoreTeam',
      title: 'Core Team Member',
      type: 'boolean',
      description: 'Check if this is a founding or core team member (vs. a site-level manager).',
    }),
    defineField({
      name: 'associatedSite',
      title: 'Primary Associated Site',
      type: 'reference',
      description: 'The main learning site this person is associated with.',
      to: [{ type: 'learningSite' }],
    }),
    defineField({
      name: 'associatedSites',
      title: 'All Associated Sites',
      type: 'array',
      description: 'If this person is associated with multiple learning sites, list all of them here.',
      of: [{ type: 'reference', to: [{ type: 'learningSite' }] }],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
});
