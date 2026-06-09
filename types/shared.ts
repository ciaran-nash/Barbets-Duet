/**
 * Shared impact metric shape used across Story, Project, and LearningSite contexts.
 *
 * Replaces three parallel interfaces that existed before PRD-C unification:
 *   - ImpactMetric (types/narrative.ts)   — { label, value, unit }
 *   - ProjectImpact (types/project.ts)    — { label, value, unit? }
 *   - ImpactStat (types/learning-site.ts) — { label, value, description, trend? }
 *
 * ImpactPoint is a strict superset of all three — no existing data is broken.
 * `description` and `trend` are only populated by LearningSite impactData.
 * `unit` is only populated by Story and Project impact metrics.
 */
export interface ImpactPoint {
  label: string;
  value: string;
  unit?: string;
  description?: string;
  trend?: 'up' | 'down';
}
