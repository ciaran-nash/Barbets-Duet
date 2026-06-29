import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Mission() {
  const missions = [
    {
      title: 'Solve the Oak Tree Paradox',
      description: 'A living oak supports 284 species. Its financial value is realised only once it is dead. Barbets Duet exists to invent the market rules that flip this — making a living forest worth more than a felled one.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
      href: '/about',
    },
    {
      title: 'Learn by Doing on Real Land',
      description: 'Each learning site is a hands-on experiment: real families, real ecologies, real livelihoods at stake. Trial and error on the ground generates the knowledge no textbook can — and conventions share it across the network.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
      href: '/learning-sites',
    },
    {
      title: 'Invent Mosaic Rights for the 21st Century',
      description: 'Traditional African mosaic rights — where women own food crops, herders graze after harvest, and those who dug the well own the water — maintained high biodiversity for generations. We are adapting this for modern markets.',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80',
      href: '/about#mosaic-rights',
    }
  ];

  return (
    <section className="pt-20 pb-0 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 max-w-4xl mx-auto tracking-tight leading-tight [text-wrap:balance]">
          A 20-year experiment to reward the abundance of life
        </h2>
        <p className="max-w-2xl mx-auto text-foreground/60 mb-10 leading-relaxed text-lg">
          A business idea, not a charity. Self-financed and independent since 2006 — because real change in economic systems cannot be donor-driven.
        </p>
        <Button asChild variant="outline" className="rounded-full px-8 border-border/20 text-foreground hover:bg-foreground/5 mb-12 text-base h-12 transition-colors duration-500">
          <Link href="/about">Explore our mission</Link>
        </Button>

        <div className="border-t border-border/10">
          {missions.map((mission, idx) => (
            <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 border-b border-border/10 last:border-b-0 ${idx === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-foreground/10">
                <Image
                  src={mission.image}
                  alt={mission.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center p-10 md:p-16 text-left">
                <h4 className="font-serif text-3xl md:text-4xl font-light leading-snug mb-6 [text-wrap:balance]">{mission.title}</h4>
                <p className="text-foreground/70 mb-8 text-base leading-relaxed max-w-md font-sans">{mission.description}</p>
                <a href={mission.href} className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.15em] text-foreground border-b border-border/30 hover:border-accent hover:text-accent pb-1 transition-colors duration-500 w-fit group">
                  Learn more <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
