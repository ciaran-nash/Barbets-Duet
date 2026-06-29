'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import EarthGlobe from '@/components/EarthGlobe';
import Image from 'next/image';

export default function ImpactSection() {
  return (
    <section className="bg-background text-foreground">
      {/* 1. Quote / Rationale Section */}
      <div className="bg-band py-32 border-y border-band-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(237,232,216,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(237,232,216,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-light text-band-foreground leading-tight mb-8 [text-wrap:balance]">
            &ldquo;We will only protect ecosystems if we are rewarded for doing so.&rdquo;
          </h2>
          <p className="text-band-foreground/75 font-sans text-lg leading-relaxed max-w-2xl mx-auto">
            At present, it is easy to make money by cutting a forest down, but no one gets paid for leaving one standing. Since 2006, Barbets Duet has been inventing the rules and market mechanisms that change this — site by site, convention by convention.
          </p>
        </div>
      </div>

      {/* 2. Worldwide Learning Sites (Globe Section) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-[800px] pointer-events-none opacity-70 overflow-hidden">
          <div className="-translate-y-[80px] translate-x-[8%]">
            <EarthGlobe />
          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center">

          <div className="flex-1 max-w-xl mb-16 lg:mb-0">
            <h2 className="text-5xl sm:text-6xl font-serif font-light leading-tight mb-6 [text-wrap:balance]">
              Real experiments. Real land. Real livelihoods.
            </h2>
            <p className="text-lg text-foreground/70 font-sans leading-relaxed mb-8">
              Each learning site is a living laboratory — testing what works, documenting what doesn&apos;t, and sharing both openly across the network.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/learning-sites" className="inline-flex items-center justify-center bg-transparent border border-border hover:bg-foreground hover:text-background font-sans font-medium px-8 py-3 rounded-md transition-colors duration-500">
                Explore our learning sites
              </Link>
              <Link href="/get-involved" className="inline-flex items-center gap-2 text-foreground hover:opacity-70 font-sans font-medium transition-opacity duration-300">
                Apply to Become a Learning Site <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Feature Card overlaying the globe */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="bg-card text-card-foreground p-6 rounded-xl w-full max-w-[480px] shadow-paper relative">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-full sm:w-[160px] h-[200px] bg-foreground/10 rounded-lg relative overflow-hidden shrink-0">
                  <Image src="https://images.unsplash.com/photo-1596489370005-3e4b77dbd4aa?auto=format&fit=crop&q=80&w=400" fill className="object-cover" alt="Msichoke Seaweed Growers" unoptimized={true} />
                </div>
                <div className="flex flex-col pt-2">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-2xl font-serif font-light leading-tight mr-2">Msichoke Seaweed Growers</h3>
                     <div className="flex items-center shrink-0 mt-1">
                       <MapPin className="w-4 h-4 mr-1" />
                       <span className="text-xs font-bold font-sans">TZ</span>
                     </div>
                   </div>
                   <p className="text-sm font-sans leading-relaxed text-foreground/70">
                     A seaweed farming group based in Mlingotini, Bagamoyo, Tanzania. They are known for their production of both raw seaweed and seaweed products like soap. The group initially comprised older members but has since expanded to include youth from the village. They are involved in various aspects of seaweed production, including farming, processing, and packaging.
                   </p>
                </div>
              </div>
              <div className="w-full h-px bg-foreground/10 mb-4"></div>
              <Link href="/learning-sites/msichoke-seaweed-growers" className="inline-flex items-center text-sm font-bold font-sans hover:underline">
                Explore Learning Site <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
