/**
 * Sanity seed script — migrates lib/data/*.ts content into Sanity.
 *
 * USAGE (run once after the Sanity project + write token exist):
 *   npx tsx scripts/seed-sanity.ts
 *   (or: npx ts-node --project tsconfig.json scripts/seed-sanity.ts)
 *
 * PREREQUISITES (.env.local):
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - SANITY_API_TOKEN with WRITE permission (Editor token)
 *
 * What it does:
 *   - Seeds learningSite, story, barbetsEvent, project, teamMember, blogPost, newsItem.
 *   - Uploads primary images (hero, gallery, card images, avatars) from their
 *     source URLs as real Sanity image assets, so Sanity-backed pages render
 *     images (not just text). Image upload is best-effort: a failed fetch logs a
 *     warning and leaves the field empty rather than aborting the seed.
 *   - Wires `associatedSite` references using deterministic `learningSite-{slug}` ids.
 *
 * Re-runnable: every document uses a deterministic _id + createOrReplace, so
 * running twice updates in place rather than duplicating. (Re-uploads images.)
 *
 * ponytail: nested challenge/initiative/restoration images are left for manual
 * Studio upload — only high-visibility images (hero, gallery, cards) are migrated.
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@sanity/client';
import { learningSites } from '../lib/data/learning-sites';
import { stories } from '../lib/data/stories';
import { events } from '../lib/data/events';
import { projects } from '../lib/data/projects';
import { teamMembers as team } from '../lib/data/team';
import { newsItems } from '../lib/data/news';
import { blogPosts } from '../lib/data/blog';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

// ── Helpers ────────────────────────────────────────────────────────────────

type SanityImage = { _type: 'image'; asset: { _type: 'reference'; _ref: string } };
type SanityRef = { _type: 'reference'; _ref: string };

function toSlug(s: string): { _type: 'slug'; current: string } {
  return { _type: 'slug', current: s };
}

function siteRef(siteSlug?: string): SanityRef | undefined {
  return siteSlug ? { _type: 'reference', _ref: `learningSite-${siteSlug}` } : undefined;
}

function key(s: string): string {
  return s.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

// Cache uploads by source URL so a shared image is only fetched/uploaded once.
const assetCache = new Map<string, string>();

async function uploadImage(url?: string): Promise<SanityImage | undefined> {
  if (!url) return undefined;
  let assetId = assetCache.get(url);
  if (!assetId) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const filename = url.split('/').pop()?.split('?')[0] || 'image.jpg';
      const asset = await client.assets.upload('image', buf, { filename });
      assetId = asset._id;
      assetCache.set(url, assetId);
    } catch (err) {
      console.warn(`  ! image skipped (${url}): ${err instanceof Error ? err.message : err}`);
      return undefined;
    }
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } };
}

async function uploadGallery(urls: string[] = []): Promise<(SanityImage & { _key: string })[]> {
  const out: (SanityImage & { _key: string })[] = [];
  for (let i = 0; i < urls.length; i++) {
    const img = await uploadImage(urls[i]);
    if (img) out.push({ ...img, _key: `g${i}` });
  }
  return out;
}

// ── Seeders ──────────────────────────────────────────────────────────────────

async function seedLearningSites() {
  console.log(`Seeding ${learningSites.length} learning sites...`);
  for (const site of learningSites) {
    const doc = {
      _type: 'learningSite',
      _id: `learningSite-${site.slug}`,
      slug: toSlug(site.slug),
      name: site.name,
      location: site.location,
      founded: site.founded,
      category: site.category,
      leadPartners: site.leadPartners,
      lat: site.lat,
      lng: site.lng,
      heroImage: await uploadImage(site.heroImage),
      accentImage: await uploadImage(site.accentImage),
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
        _key: key(init.title),
        title: init.title,
        description: init.description,
        icon: init.icon,
      })),
      challenges: {
        title: site.challenges.title,
        description: site.challenges.description,
        tags: site.challenges.tags,
      },
      restorationStrategies: site.restorationStrategies
        ? { description: site.restorationStrategies.description, tags: site.restorationStrategies.tags }
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
          _key: key(stat.label),
          label: stat.label,
          value: stat.value,
          description: stat.description,
          trend: stat.trend,
        })),
        community: (site.impactData.community ?? []).map((stat) => ({
          _type: 'object',
          _key: key(stat.label),
          label: stat.label,
          value: stat.value,
          description: stat.description,
          trend: stat.trend,
        })),
      },
      futureGoals: site.futureGoals,
      gallery: await uploadGallery(site.gallery),
      testimonial: site.testimonial
        ? {
            quote: site.testimonial.quote,
            authorName: site.testimonial.authorName,
            authorPosition: site.testimonial.authorPosition,
          }
        : undefined,
      contact: site.contact
        ? { intro: site.contact.intro, buttonLabel: site.contact.buttonLabel, contactLink: site.contact.contactLink }
        : undefined,
    };

    try {
      await client.createOrReplace(doc);
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
      content: [
        {
          _type: 'block',
          _key: 'content-0',
          style: 'normal',
          children: [{ _type: 'span', _key: 'span-0', text: typeof story.content === 'string' ? story.content : '' }],
          markDefs: [],
        },
      ],
      image: await uploadImage(story.image),
      category: story.category,
      date: story.date,
      readTime: story.readTime,
      impactMetrics: (story.impactMetrics ?? []).map((m) => ({
        _type: 'object',
        _key: key(m.label),
        label: m.label,
        value: m.value,
        unit: m.unit,
      })),
      associatedSite: siteRef(story.siteSlug),
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
      image: await uploadImage(event.image),
      link: event.link,
      registrationStatus: event.registrationStatus,
      associatedSite: siteRef(event.siteSlug),
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
      image: await uploadImage(project.image),
      impactMetrics: (project.impactMetrics ?? []).map((m) => ({
        _type: 'object',
        _key: key(m.label),
        label: m.label,
        value: m.value,
        unit: m.unit,
      })),
      associatedSite: siteRef(project.siteSlug),
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
      avatar: await uploadImage(member.avatar),
      joinedYear: member.joinedYear,
      isCoreTeam: member.isCoreTeam,
      associatedSite: siteRef(member.siteSlug),
      associatedSites: (member.siteSlugs ?? []).map((s, i) => ({
        _type: 'reference',
        _key: `s${i}`,
        _ref: `learningSite-${s}`,
      })),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${member.name}`);
    } catch (err) {
      console.error(`  ✗ ${member.name}:`, err);
    }
  }
}

async function seedNews() {
  console.log(`Seeding ${newsItems.length} news items...`);
  for (const item of newsItems) {
    const doc = {
      _type: 'newsItem',
      _id: `newsItem-${item.slug}`,
      slug: toSlug(item.slug),
      title: item.title,
      summary: item.summary,
      content: item.content,
      category: item.category,
      date: item.date,
      image: await uploadImage(item.image),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${item.title}`);
    } catch (err) {
      console.error(`  ✗ ${item.title}:`, err);
    }
  }
}

async function seedBlog() {
  console.log(`Seeding ${blogPosts.length} blog posts...`);
  for (const post of blogPosts) {
    const doc = {
      _type: 'blogPost',
      _id: `blogPost-${post.slug}`,
      slug: toSlug(post.slug),
      title: post.title,
      summary: post.summary,
      content: post.content,
      label: post.label,
      author: post.author,
      published: post.published,
      image: await uploadImage(post.image),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${post.title}`);
    } catch (err) {
      console.error(`  ✗ ${post.title}:`, err);
    }
  }
}

async function main() {
  console.log('Starting Sanity seed...');
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);
  console.log('');

  await seedLearningSites(); // first — others reference learningSite-{slug}
  await seedStories();
  await seedEvents();
  await seedProjects();
  await seedTeam();
  await seedNews();
  await seedBlog();

  console.log('');
  console.log('Seed complete. Open /studio to view content.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
