/**
 * Admin-only Sanity queries — bypasses CDN + Next.js cache.
 * Used exclusively by /admin/* server components and server actions.
 *
 * These queries always fetch fresh data (no CDN, no route cache).
 * Env guards match the pattern in lib/sanity/queries.ts.
 */
import { createClient } from 'next-sanity'
import type { TrialAndErrorEntry } from './queries'

// Read-only admin client — bypasses CDN cache for fresh data
function getAdminReadClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  if (!projectId) return null

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false, // Always bypass CDN in admin context
  })
}

/**
 * Write client — requires SANITY_API_TOKEN with editor/admin permissions.
 * Used by AP5 server actions (publishSubmission, rejectSubmission).
 */
export function getAdminWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !token) {
    console.warn('[admin-queries] SANITY_API_TOKEN not set — write operations will fail')
    return null
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })
}

/**
 * Extended T&E entry type including the Sanity document _id.
 * Required for patch/delete operations via the Sanity write client.
 */
export interface AdminTrialAndErrorEntry extends TrialAndErrorEntry {
  _id: string
}

const T_AND_E_ADMIN_PROJECTION = `{
  _id,
  "slug": slug.current,
  title,
  siteSlug,
  authorMemberSlug,
  prompt1,
  prompt2,
  prompt3,
  prompt4,
  challengeType,
  interventionType,
  propertyRightsRegime,
  status,
  submittedAt,
  publishedAt,
  "images": images[] { "url": asset->url, altText, caption }
}`

/**
 * Fetch all T&E entries by status for the admin queue.
 * Returns empty array if Sanity not configured.
 *
 * Uses cache: 'no-store' to always return fresh data in admin context.
 */
export async function getSubmissionsByStatus(
  status: 'pending_review' | 'published' | 'rejected'
): Promise<AdminTrialAndErrorEntry[]> {
  const client = getAdminReadClient()
  if (!client) return []

  try {
    return await client.fetch<AdminTrialAndErrorEntry[]>(
      `*[_type == "trialAndError" && status == $status]
        | order(submittedAt desc)
        ${T_AND_E_ADMIN_PROJECTION}`,
      { status },
      { cache: 'no-store' }
    )
  } catch (error) {
    console.error('[admin-queries] getSubmissionsByStatus failed:', error)
    return []
  }
}

/**
 * Count T&E entries by status — for tab badge display.
 * Returns zeroes if Sanity not configured or query fails.
 */
export async function countSubmissionsByStatus(): Promise<{
  pending_review: number
  published: number
  rejected: number
}> {
  const client = getAdminReadClient()
  if (!client) return { pending_review: 0, published: 0, rejected: 0 }

  try {
    const [pending, published, rejected] = await Promise.all([
      client.fetch<number>(
        `count(*[_type == "trialAndError" && status == "pending_review"])`,
        {},
        { cache: 'no-store' }
      ),
      client.fetch<number>(
        `count(*[_type == "trialAndError" && status == "published"])`,
        {},
        { cache: 'no-store' }
      ),
      client.fetch<number>(
        `count(*[_type == "trialAndError" && status == "rejected"])`,
        {},
        { cache: 'no-store' }
      ),
    ])
    return { pending_review: pending, published, rejected }
  } catch {
    return { pending_review: 0, published: 0, rejected: 0 }
  }
}
