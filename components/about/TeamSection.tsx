'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TeamMember } from '@/types/team';
import { KineticReveal } from '@/components/motion/KineticReveal';

interface TeamMemberCardProps {
  member: TeamMember;
  featured?: boolean;
}

function TeamMemberCard({ member, featured = false }: TeamMemberCardProps) {
  const siteLink = member.siteSlug ? `/learning-sites/${member.siteSlug}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border border-foreground/10 rounded-2xl p-8 hover:border-accent/30 transition-colors
                  ${featured ? 'lg:col-span-2' : ''}`}
    >
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent block mb-2">
        {member.isCoreTeam ? 'Co-Founder' : 'Site Manager'}
      </span>

      <h3 className={`font-serif font-bold leading-tight mb-1 ${featured ? 'text-3xl' : 'text-2xl'}`}>
        {member.name}
      </h3>

      <p className="text-sm font-sans text-foreground/50 mb-2">{member.role}</p>

      {member.location && (
        <p className="text-xs font-mono text-foreground/40 mb-6">{member.location}</p>
      )}

      {member.bio && featured && (
        <p className="text-base font-sans leading-relaxed text-foreground/70 mb-8">
          {member.bio}
        </p>
      )}

      {!member.bio && !featured && member.joinedYear && (
        <p className="text-xs font-mono text-foreground/30 mb-6">
          Member since {member.joinedYear}
        </p>
      )}

      {siteLink && (
        <Link
          href={siteLink}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em]
                     text-accent hover:opacity-70 transition-opacity"
        >
          View site <ArrowRight className="w-3 h-3" />
        </Link>
      )}

      {member.siteSlugs && member.siteSlugs.length > 1 && (
        <p className="text-[9px] font-mono text-foreground/30 mt-2">
          +{member.siteSlugs.length - 1} more site{member.siteSlugs.length - 1 > 1 ? 's' : ''}
        </p>
      )}
    </motion.div>
  );
}

interface TeamSectionProps {
  coreTeam: TeamMember[];
  siteManagers: TeamMember[];
}

export function TeamSection({ coreTeam, siteManagers }: TeamSectionProps) {
  return (
    <div>
      {/* Core team */}
      <section className="pt-48 pb-24 px-6 bg-background text-foreground">
        <div className="max-w-[1600px] mx-auto">
          <KineticReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-6 block">
              Founding Team
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.88] tracking-tighter mb-16">
              The People<br />Behind the Experiment
            </h1>
          </KineticReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTeam.map((member) => (
              <TeamMemberCard key={member.slug} member={member} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Site managers */}
      <section className="py-24 px-6 bg-platinum text-night-forest">
        <div className="max-w-[1600px] mx-auto">
          <KineticReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-viridian mb-6 block">
              Jumuiya Network
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter mb-16">
              Site Managers
            </h2>
          </KineticReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteManagers.map((member) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-night-forest/10 rounded-2xl p-8 hover:border-viridian/40 transition-colors"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-viridian block mb-2">
                  Site Manager
                </span>
                <h3 className="text-2xl font-serif font-bold leading-tight mb-1 text-night-forest">
                  {member.name}
                </h3>
                <p className="text-sm font-sans text-night-forest/50 mb-2">{member.role}</p>
                {member.location && (
                  <p className="text-xs font-mono text-night-forest/40 mb-6">{member.location}</p>
                )}
                {member.bio && (
                  <p className="text-sm font-sans leading-relaxed text-night-forest/70 mb-6 line-clamp-3">
                    {member.bio}
                  </p>
                )}
                {member.siteSlug && (
                  <Link
                    href={`/learning-sites/${member.siteSlug}`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em]
                               text-viridian hover:opacity-70 transition-opacity"
                  >
                    View site <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
