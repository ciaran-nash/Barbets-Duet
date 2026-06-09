import { defineField, defineType } from 'sanity';

export const eventSchema = defineType({
  name: 'barbetsEvent',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this event. Click "Generate" to create from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'The name of the event.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A description of the event including what attendees can expect.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      description: 'The date of the event (YYYY-MM-DD).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Event Time',
      type: 'string',
      description: 'Time of the event, including timezone (e.g. "14:00 EAT", "10:00 GMT").',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the event takes place (venue name, city, or "Online").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Event Type',
      type: 'string',
      description: 'The format of this event.',
      options: {
        list: [
          { value: 'Convention', title: 'Convention' },
          { value: 'Workshop', title: 'Workshop' },
          { value: 'Lab Day', title: 'Lab Day' },
          { value: 'Summit', title: 'Summit' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      description: 'Image shown in event cards and at the top of the event detail page.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Registration / Info Link',
      type: 'url',
      description: 'External link for registration or more information.',
    }),
    defineField({
      name: 'registrationStatus',
      title: 'Registration Status',
      type: 'string',
      description: 'Current availability for this event.',
      options: {
        list: [
          { value: 'Open', title: 'Open — accepting registrations' },
          { value: 'Waitlist', title: 'Waitlist — event full, waitlist open' },
          { value: 'Closed', title: 'Closed — registration ended' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'associatedSite',
      title: 'Associated Learning Site',
      type: 'reference',
      description: 'Which Jumuiya learning site is hosting or most associated with this event?',
      to: [{ type: 'learningSite' }],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
});
