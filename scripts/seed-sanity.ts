/**
 * Sanity seed script — migrates lib/data/*.ts content into Sanity
 *
 * USAGE (run once after Sanity project is created):
 *   npx ts-node --project tsconfig.json scripts/seed-sanity.ts
 *
 * PREREQUISITES:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID set in .env.local
 *   - SANITY_API_TOKEN set in .env.local (must have write permissions)
 *
 * NOTE: Image URLs from Unsplash/Picsum cannot be imported as Sanity image
 * assets. The seed sets image fields to null — upload images via Studio.
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@sanity/client';
import { learningSites } from '../lib/data/learning-sites';
import { stories } from '../lib/data/stories';
import { events } from '../lib/data/events';
import { projects } from '../lib/data/projects';
import { teamMembers as team } from '../lib/data/team';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

function toSlug(s: string): { _type: 'slug'; current: string } {
  return { _type: 'slug', current: s };
}

async function seedLearningSites() {
  console.log(`Seeding ${learningSites.length} learning sites...`);
  for (const site of learningSites) {
    const doc = {
      _type: 'learningSite',
      slug: toSlug(site.slug),
      name: site.name,
      location: site.location,
      founded: site.founded,
      category: site.category,
      leadPartners: site.leadPartners,
      lat: site.lat,
      lng: site.lng,
      visionEyebrow: site.visionEyebrow,
      visionStatement: site.visionStatement,
      overview: site.overview,
      focusAreas: site.focusAreas,
      restorationGoals: site.restorationGoals,
      founderNames: site.founderNames,
      memberNames: site.memberNames,
      websiteUrl: site.websiteUrl,
      initiativesIntro: site.initiativesIntro,
      initiatives: (site.initiatives ?? []).map((init) => ({
        _type: 'object',
        _key: init.title.replace(/\s+/g, '-').toLowerCase(),
        title: init.title,
        description: init.description,
        icon: init.icon,
        // init.image is a URL, not a Sanity asset — omit for seed
      })),
      challenges: {
        title: site.challenges.title,
        description: site.challenges.description,
        tags: site.challenges.tags,
        // challenges.image omitted (external URL)
      },
      restorationStrategies: site.restorationStrategies
        ? {
            description: site.restorationStrategies.description,
            tags: site.restorationStrategies.tags,
          }
        : undefined,
      marketStrategies: {
        title: site.marketStrategies.title,
        description: site.marketStrategies.description,
        strategies: site.marketStrategies.strategies,
      },
      impactIntro: site.impactIntro,
      impactData: {
        ecological: (site.impactData.ecological ?? []).map((stat) => ({
          _type: 'object',
          _key: stat.label.replace(/\s+/g, '-').toLowerCase(),
          label: stat.label,
          value: stat.value,
          description: stat.description,
          trend: stat.trend,
        })),
        community: (site.impactData.community ?? []).map((stat) => ({
          _type: 'object',
          _key: stat.label.replace(/\s+/g, '-').toLowerCase(),
          label: stat.label,
          value: stat.value,
          description: stat.description,
          trend: stat.trend,
        })),
      },
      futureGoals: site.futureGoals,
      testimonial: site.testimonial
        ? {
            quote: site.testimonial.quote,
            authorName: site.testimonial.authorName,
            authorPosition: site.testimonial.authorPosition,
          }
        : undefined,
      contact: site.contact
        ? {
            intro: site.contact.intro,
            buttonLabel: site.contact.buttonLabel,
            contactLink: site.contact.contactLink,
          }
        : undefined,
      // gallery, heroImage, relatedSites: omitted for seed (require Sanity asset refs)
    };

    try {
      await client.createOrReplace({ ...doc, _id: `learningSite-${site.slug}` });
      console.log(`  ✓ ${site.name}`);
    } catch (err) {
      console.error(`  ✗ ${site.name}:`, err);
    }
  }
}

async function seedStories() {
  console.log(`Seeding ${stories.length} stories...`);
  for (const story of stories) {
    const doc = {
      _type: 'story',
      _id: `story-${story.slug}`,
      slug: toSlug(story.slug),
      title: story.title,
      subtitle: story.subtitle,
      excerpt: story.excerpt,
      // content: story.content is a plain string — convert to basic Portable Text block
      content: [
        {
          _type: 'block',
          _key: 'content-0',
          style: 'normal',
          children: [{ _type: 'span', _key: 'span-0', text: story.content }],
          markDefs: [],
        },
      ],
      category: story.category,
      date: story.date,
      readTime: story.readTime,
      impactMetrics: (story.impactMetrics ?? []).map((m) => ({
        _type: 'object',
        _key: m.label.replace(/\s+/g, '-').toLowerCase(),
        label: m.label,
        value: m.value,
        unit: m.unit,
      })),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${story.title}`);
    } catch (err) {
      console.error(`  ✗ ${story.title}:`, err);
    }
  }
}

async function seedEvents() {
  console.log(`Seeding ${events.length} events...`);
  for (const event of events) {
    const doc = {
      _type: 'barbetsEvent',
      _id: `event-${event.slug}`,
      slug: toSlug(event.slug),
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      link: event.link,
      registrationStatus: event.registrationStatus,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${event.title}`);
    } catch (err) {
      console.error(`  ✗ ${event.title}:`, err);
    }
  }
}

async function seedProjects() {
  console.log(`Seeding ${projects.length} projects...`);
  for (const project of projects) {
    const doc = {
      _type: 'project',
      _id: `project-${project.slug}`,
      slug: toSlug(project.slug),
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      innovationSummary: project.innovationSummary,
      category: project.category,
      maturity: project.maturity,
      featured: project.featured,
      impactMetrics: (project.impactMetrics ?? []).map((m) => ({
        _type: 'object',
        _key: m.label.replace(/\s+/g, '-').toLowerCase(),
        label: m.label,
        value: m.value,
        unit: m.unit,
      })),
      // associatedSite reference: set after learning sites are seeded
      // Use: client.patch(`project-${project.slug}`).set({ associatedSite: { _type: 'reference', _ref: `learningSite-${project.siteSlug}` } }).commit()
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${project.title}`);
    } catch (err) {
      console.error(`  ✗ ${project.title}:`, err);
    }
  }
}

async function seedTeam() {
  console.log(`Seeding ${team.length} team members...`);
  for (const member of team) {
    const doc = {
      _type: 'teamMember',
      _id: `teamMember-${member.slug}`,
      slug: toSlug(member.slug),
      name: member.name,
      role: member.role,
      bio: member.bio,
      location: member.location,
      joinedYear: member.joinedYear,
      isCoreTeam: member.isCoreTeam,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${member.name}`);
    } catch (err) {
      console.error(`  ✗ ${member.name}:`, err);
    }
  }
}

async function main() {
  console.log('Starting Sanity seed...');
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);
  console.log('');

  await seedLearningSites();
  await seedStories();
  await seedEvents();
  await seedProjects();
  await seedTeam();

  console.log('');
  console.log('Seed complete. Open /studio to view content.');
  console.log('Note: Images were not migrated — upload via Studio.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
