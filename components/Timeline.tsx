import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Timeline() {
  const timelineData = [
    {
      year: '2009',
      title: 'First sites established',
      description: 'Woodland Valley Farm and Msichoke Seaweed Growers Cooperative become founding learning sites — the earliest experiments in integrating ecological restoration with economic opportunity.',
      image: 'https://picsum.photos/seed/timeline-farm/800/600',
    },
    {
      year: '2010',
      title: 'North American expansion',
      description: 'Hannacroix Creek (Hudson Valley, New York) joins as the first North American site, bringing 49 bird species back to restored freshwater tidal swamp forest.',
      image: 'https://picsum.photos/seed/timeline-creek/800/600',
    },
    {
      year: '2012',
      title: 'East Africa convention',
      description: 'Himo, Tanzania hosts the network\'s first East Africa convention, connecting partners across Kenya, Uganda, and Tanzania around shared restoration frameworks.',
      image: 'https://picsum.photos/seed/timeline-eastafrica/800/600',
    },
    {
      year: '2016',
      title: 'Network-wide convention',
      description: 'Molo, Uganda hosts the Coming of Age Convention — a pivotal moment formalising peer review, site accountability, and the Jumuiya network structure.',
      image: 'https://picsum.photos/seed/timeline-convention/800/600',
    },
    {
      year: '2023',
      title: 'Arboretum milestone',
      description: 'Arboretum Kajokoby hosts a milestone event integrating pastoral and agricultural land-use priorities, expanding the network\'s reach into urban agroforestry.',
      image: 'https://picsum.photos/seed/timeline-arboretum/800/600',
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background text-foreground overflow-hidden border-t border-border/10">
      <div className="max-w-[1600px] mx-auto px-6 w-full">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6 text-foreground/50 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-foreground/30"></span>
            Archive
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-tight leading-tight">
            Our journey of <span className="italic text-foreground/60">impact</span>
          </h2>
          <p className="text-foreground/70 leading-relaxed text-lg lg:text-xl font-sans">
            A chronological record of key milestones — each one a working proof that ecological restoration and economic prosperity are not opposites.
          </p>
        </div>
      </div>

      <div className="w-full px-6 lg:px-0 lg:pl-[max(1.5rem,calc((100vw-100rem)/2+1.5rem))]">
        <div className="relative w-full lg:-ml-12 lg:-mt-8 lg:pl-12 lg:pt-16 lg:overflow-x-auto lg:pb-24 lg:-mb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col lg:flex-row lg:gap-16 relative lg:min-w-max lg:pr-[360px]">
            {/* Horizontal line (desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-foreground/20 -translate-y-1/2 z-0 hidden lg:block" />
            {/* Vertical line (mobile) */}
            <div className="absolute top-8 bottom-8 left-[17px] md:left-[21px] w-[1px] bg-foreground/20 z-0 lg:hidden" />

            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                 <div key={idx} className="w-full lg:w-[360px] flex-shrink-0 flex flex-col lg:relative z-10 group relative pl-[48px] md:pl-[60px] lg:pl-0 mb-16 lg:mb-0">

                    {/* Desktop: Top half */}
                    <div className="hidden lg:flex flex-1 min-h-[240px] flex-col justify-end pb-12 relative cursor-default">
                       {isEven ? (
                         <div className="w-full h-64 overflow-hidden relative border border-border/10 transition-all duration-500 transform group-hover:-translate-y-3">
                           <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 filter grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
                         </div>
                       ) : (
                         <div className="bg-transparent p-0 transition-all duration-500 transform group-hover:-translate-y-2">
                            <span className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase mb-2 block border border-border/10 w-fit px-2 py-1 bg-white">Year: {item.year}</span>
                            <h4 className="text-2xl font-serif font-light mb-4 leading-snug text-foreground transition-colors">{item.title}</h4>
                            <p className="text-foreground/70 text-sm leading-relaxed font-sans">{item.description}</p>
                         </div>
                       )}
                    </div>

                    {/* Desktop Timeline Node */}
                    <div className="h-0 relative items-center justify-start hidden lg:flex z-10">
                       <div className="w-4 h-4 bg-background rounded-full border border-border absolute left-[-8px] shrink-0 group-hover:scale-[1.5] group-hover:bg-accent group-hover:border-border transition-all duration-300" />
                    </div>

                    {/* Desktop: Bottom half */}
                    <div className="hidden lg:flex flex-1 min-h-[240px] flex-col justify-start pt-12 relative cursor-default">
                       {isEven ? (
                         <div className="bg-transparent p-0 transition-all duration-500 transform group-hover:translate-y-2">
                            <span className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase mb-2 block border border-border/10 w-fit px-2 py-1 bg-white">Year: {item.year}</span>
                            <h4 className="text-2xl font-serif font-light mb-4 leading-snug text-foreground transition-colors">{item.title}</h4>
                            <p className="text-foreground/70 text-sm leading-relaxed font-sans">{item.description}</p>
                         </div>
                       ) : (
                         <div className="w-full h-64 overflow-hidden relative border border-border/10 transition-all duration-500 transform group-hover:translate-y-3">
                           <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 filter grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
                         </div>
                       )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden flex flex-col relative w-full pt-2 cursor-default">
                       <div className="w-3 h-3 bg-background rounded-full border border-border absolute left-[-35px] md:left-[-45px] top-[14px] shrink-0 z-10 transition-transform group-hover:scale-[1.5] group-hover:bg-accent duration-300" />
                       <div className="bg-white p-6 border border-border/10 transition-all duration-500 transform">
                         <span className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase mb-3 block border border-border/10 w-fit px-2 py-1 bg-background">Year: {item.year}</span>
                         <h4 className="text-xl font-serif font-light mb-3 leading-snug text-foreground">{item.title}</h4>
                         <p className="text-foreground/70 text-[13px] font-sans leading-relaxed mb-6">{item.description}</p>
                         <div className="w-full h-48 md:h-64 overflow-hidden relative transition-all duration-300 border border-border/10">
                           <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-1000 filter grayscale" referrerPolicy="no-referrer" />
                         </div>
                       </div>
                    </div>

                 </div>
              );
            })}

            {/* CTA Node */}
            <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col justify-center items-start lg:items-center pl-[48px] md:pl-[60px] lg:pl-0 relative z-10 group mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
                <div className="lg:hidden w-3 h-3 bg-foreground rounded-full border border-border absolute left-[9px] md:left-[13px] top-1/2 -translate-y-1/2 shrink-0 z-10 group-hover:scale-[1.5] transition-all duration-300 group-hover:bg-accent" />
                <div className="w-full bg-band p-8 md:p-10 text-center border border-band-border transition-all duration-500 flex flex-col items-center justify-center lg:h-[260px]">
                    <div className="w-12 h-12 bg-band-foreground rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <ChevronRight className="w-6 h-6 text-band" />
                    </div>
                    <h4 className="font-serif font-light text-2xl mb-6 text-band-foreground">Ready to make an impact?</h4>
                    <Button asChild className="w-full bg-band-accent text-band hover:bg-band-accent/90 px-6 h-12 text-[10px] font-mono tracking-widest uppercase transition-all font-bold active:scale-[0.98]">
                      <Link href="/get-involved">[ Get involved ]</Link>
                    </Button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
