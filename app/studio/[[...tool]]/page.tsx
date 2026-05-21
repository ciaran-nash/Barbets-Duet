/**
 * Sanity Studio route — serves the CMS editing interface at /studio
 *
 * SETUP REQUIRED:
 * Before this route works, set these environment variables:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  — from sanity.io/manage
 *   NEXT_PUBLIC_SANITY_DATASET     — usually "production"
 *
 * Access is protected by Sanity's built-in user management.
 * Only Sanity project members can edit content.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
