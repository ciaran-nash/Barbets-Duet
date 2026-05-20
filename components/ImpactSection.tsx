'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import EarthGlobe from '@/components/EarthGlobe';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';

function StatCircle({ 
  startValue, 
  endValue, 
  suffix, 
  label, 
  percentage 
}: { 
  startValue: number, 
  endValue: number, 
  suffix: string, 
  label: string, 
  percentage: number 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentValue, setCurrentValue] = useState(startValue);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 1500;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCurrentValue(startValue + (endValue - startValue) * easeOut);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, startValue, endValue]);

  let displayValue = "";
  if (endValue % 1 !== 0) {
     displayValue = currentValue.toFixed(1);
  } else {
     displayValue = Math.round(currentValue).toString();
  }

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={ref} className="flex flex-col items-center justify-center relative w-56 h-56 mx-auto group">
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle 
          cx="112" cy="112" r={radius} 
          stroke="rgba(255,255,255,0.05)" 
          strokeWidth="1" fill="none" 
        />
        <motion.circle 
          cx="112" cy="112" r={radius} 
          stroke="#DBFF66" 
          strokeWidth="1.5" 
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10 px-6">
        <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-2 tracking-tight">
           {displayValue}{suffix}
        </div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-platinum/50 font-mono mt-1 text-center leading-relaxed">
          {label}
        </div>
      </div>
    </div>
  )
}

export default function ImpactSection() {
  return (
    <section className="bg-white text-black">
      {/* 1. Impact Numbers Section - Styled like the screenshot */}
      <div className="bg-[#0B0F19] py-32 border-y border-white/10 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
            
            <StatCircle 
              startValue={0} 
              endValue={8} 
              suffix="" 
              label="Learning Sites" 
              percentage={100}
            />

            <StatCircle 
              startValue={0} 
              endValue={172} 
              suffix="" 
              label="Community Partners Engaged" 
              percentage={80}
            />

            <StatCircle 
              startValue={0} 
              endValue={18.6} 
              suffix="K" 
              label="Total Hectares Involved" 
              percentage={65}
            />

            <StatCircle 
              startValue={0} 
              endValue={56} 
              suffix="%" 
              label="Hectares Restored" 
              percentage={56}
            />

          </div>
        </div>
      </div>

      {/* 2. Worldwide Learning Sites (Globe Section) */}
      <div className="relative w-full overflow-hidden">
        {/* We place the globe as an absolute background element on the right, but fading out on the left */}
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-[800px] pointer-events-auto opacity-70">
           {/* For simplicity we'll just float the EarthGlobe. But EarthGlobe component takes full width. Let's wrap it. */}
           <div className="w-[150%] h-[150%] -translate-y-[20%] translate-x-[20%]">
             <EarthGlobe />
           </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center">
          
          <div className="flex-1 max-w-xl mb-16 lg:mb-0">
            <h4 className="text-sm font-sans font-bold tracking-widest mb-4">Worldwide Learning Sites</h4>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold leading-tight mb-6">
              Headline highlighting Barbets results
            </h2>
            <p className="text-lg text-white/80 font-sans leading-relaxed mb-8">
              We believe in transparent, measurable results. Here&apos;s a look at the progress we&apos;ve made together.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="#" className="inline-flex items-center justify-center bg-transparent border border-white hover:bg-white hover:text-black font-sans font-medium px-8 py-3 rounded-md transition-colors">
                Explore Our Learning Sites
              </Link>
              <Link href="#" className="inline-flex items-center gap-2 text-white hover:opacity-80 font-sans font-medium transition-opacity">
                Apply to Become a Learning Site <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Feature Card overlaying the globe */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="bg-white text-black p-6 rounded-xl w-full max-w-[480px] shadow-2xl relative">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-full sm:w-[160px] h-[200px] bg-gray-200 rounded-lg relative overflow-hidden shrink-0">
                  <Image src="https://images.unsplash.com/photo-1596489370005-3e4b77dbd4aa?auto=format&fit=crop&q=80&w=400" fill className="object-cover" alt="Msichoke Seaweed Growers" unoptimized={true} />
                </div>
                <div className="flex flex-col pt-2">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-2xl font-serif font-bold leading-tight mr-2">Msichoke Seaweed Growers</h3>
                     <div className="flex items-center shrink-0 mt-1">
                       <MapPin className="w-4 h-4 mr-1" />
                       <span className="text-xs font-bold font-sans">TZ</span>
                     </div>
                   </div>
                   <p className="text-sm font-sans leading-relaxed text-gray-700">
                     A seaweed farming group based in Mlingotini, Bagamoyo, Tanzania. They are known for their production of both raw seaweed and seaweed products like soap. The group initially comprised older members but has since expanded to include youth from the village. They are involved in various aspects of seaweed production, including farming, processing, and packaging.
                   </p>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <Link href="#" className="inline-flex items-center text-sm font-bold font-sans hover:underline">
                Explore Learning Site <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
