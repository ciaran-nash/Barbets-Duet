'use client';

// ============================================================
// FourReturnsDisplay — Wave 6, Tasks B2 + E4
// ============================================================
// Animated "4 Returns" metrics panel: Natural Capital,
// Social Capital, Financial Capital, Inspiration.
// Used on: site profile pages (B2) and governance (E1-E2).
// Accessibility: aria-label per metric, keyboard-navigable.
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { Leaf, Users, TrendingUp, Sparkles } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────

export interface FourReturnsMetrics {
  natural: number | null;
  social: number | null;
  financial: number | null;
  inspiration: number | null;
}

interface MetricConfig {
  key: keyof FourReturnsMetrics;
  label: string;
  icon: React.ElementType;
  description: string;
  colour: string;
  accentBg: string;
}

const METRIC_CONFIG: MetricConfig[] = [
  {
    key: 'natural',
    label: 'Natural Capital',
    icon: Leaf,
    description: 'Ecological restoration — biodiversity, soil health, water cycles',
    colour: '#556B4E',     // viridian
    accentBg: 'bg-moss/10',
  },
  {
    key: 'social',
    label: 'Social Capital',
    icon: Users,
    description: 'Community cohesion, local ownership, well-being',
    colour: '#2D6A4F',
    accentBg: 'bg-[#2D6A4F]/10',
  },
  {
    key: 'financial',
    label: 'Financial Capital',
    icon: TrendingUp,
    description: 'Economic viability and local financial flows',
    colour: '#1B4332',
    accentBg: 'bg-[#1B4332]/10',
  },
  {
    key: 'inspiration',
    label: 'Inspiration',
    icon: Sparkles,
    description: 'Cultural vitality, learning, purpose-driven action',
    colour: '#DBFF66',     // neon lime — use dark text
    accentBg: 'bg-wheat/20',
  },
];

// ── Animated counter ─────────────────────────────────────────

function AnimatedCounter({
  value,
  pending,
}: {
  value: number | null;
  pending: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView && value !== null) {
      motionVal.set(value);
    }
  }, [inView, value, motionVal]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  if (pending || value === null) {
    return (
      <span className="font-mono text-foreground/30 text-sm">
        Baseline pending
      </span>
    );
  }

  return (
    <span ref={ref} className="tabular-nums">
      {display}%
    </span>
  );
}

// ── Single metric card ───────────────────────────────────────

function MetricCard({
  config,
  value,
  pending,
  index,
}: {
  config: MetricConfig;
  value: number | null;
  pending: boolean;
  index: number;
}) {
  const Icon = config.icon;
  const isInspiration = config.key === 'inspiration';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      role="region"
      aria-label={`${config.label}: ${value !== null ? value + '%' : 'Baseline pending'}`}
      className={`rounded-2xl p-5 ${config.accentBg} border border-foreground/5 flex flex-col gap-3`}
      tabIndex={0}
    >
      {/* Icon row */}
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: config.colour + '20' }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: isInspiration ? '#06211A' : config.colour }}
          />
        </div>
        {/* Progress arc (visual-only) */}
        {!pending && value !== null && (
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            className="rotate-[-90deg]"
            aria-hidden="true"
          >
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke={config.colour}
              strokeOpacity={0.15}
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke={config.colour}
              strokeWidth="3"
              strokeDasharray={`${Math.min((value / 200) * 87.96, 87.96)} 87.96`}
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Value */}
      <div
        className="font-serif text-3xl font-bold leading-none"
        style={{ color: isInspiration && !pending && value !== null ? '#06211A' : undefined }}
      >
        <AnimatedCounter value={value} pending={pending} />
      </div>

      {/* Label + description */}
      <div>
        <p className="font-sans font-semibold text-sm text-foreground/90">{config.label}</p>
        <p className="font-sans text-xs text-foreground/50 mt-0.5 leading-snug">
          {config.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────

interface FourReturnsDisplayProps {
  metrics: FourReturnsMetrics | null | undefined;
  /** Show "Baseline pending" when coordinator hasn't submitted yet */
  showPending?: boolean;
  className?: string;
}

export default function FourReturnsDisplay({
  metrics,
  showPending = false,
  className = '',
}: FourReturnsDisplayProps) {
  const hasSomeData = metrics && Object.values(metrics).some((v) => v !== null);

  return (
    <section className={`py-16 ${className}`}>
      <div className="mb-8">
        <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-2">
          4 Returns Metrics
        </p>
        <h2 className="font-serif font-bold text-3xl md:text-4xl mb-2">
          Ecological &amp; Community Impact
        </h2>
        <p className="text-sm text-foreground/60 font-sans max-w-md">
          Progress relative to the site's own baseline year. Values above 100% indicate
          improvement from starting conditions.
        </p>
      </div>

      {!hasSomeData && !showPending ? (
        <div className="rounded-2xl border border-foreground/10 p-8 text-center">
          <p className="text-foreground/40 font-sans text-sm">
            Metrics data not yet available for this site.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRIC_CONFIG.map((config, i) => (
            <MetricCard
              key={config.key}
              config={config}
              value={metrics?.[config.key] ?? null}
              pending={showPending && (metrics?.[config.key] ?? null) === null}
              index={i}
            />
          ))}
        </div>
      )}
    </section>
  );
}
