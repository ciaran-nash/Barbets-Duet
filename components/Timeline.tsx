import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Timeline() {
  const timelineData = [
    {
      year: '2015',
      title: 'Foundation & Vision',
      description: 'The inception of Barbets Duet. A small group of passionate ecologists and community leaders gathered to map out a vision for systemic, community-led ecological restoration.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
    },
    {
      year: '2017',
      title: 'First Learning Site Established',
      description: 'We secured our inaugural learning site in a rural community, providing a hands-on environment to test sustainable land management and community-based eco-incentives.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
    },
    {
      year: '2019',
      title: 'Major Partnership',
      description: 'A pivotal moment as we partnered with regional authorities, officially recognizing mosaic rights and integrating our conservation frameworks into local policy.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
    },
    {
      year: '2021',
      title: 'First 1,000 Hectares Restored',
      description: 'Years of community-driven effort culminated in the successful restoration of 1,000 hectares of degraded land, bringing back vital biodiversity and thriving ecosystems.',
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80',
    },
    {
      year: '2023',
      title: 'New Initiatives Launched',
      description: 'Expanding our reach with new real-world adaptable models, integrating technology for carbon tracking, and scaling our mission to empower more communities globally.',
      image: 'https://images.unsplash.com/photo-1531239223707-160cc128fc83?auto=format&fit=crop&q=80',
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F4F4F0] text-[#111111] overflow-hidden border-t border-[#111111]/10">
      {/* Header section constrained to max-width */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6 text-[#111111]/50 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[#111111]/30"></span>
            Barbet&apos;s Duet Archive
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-tight leading-tight">
            Our Journey of <span className="italic text-[#111111]/60">Impact</span>
          </h2>
          <p className="text-[#111111]/70 leading-relaxed text-lg lg:text-xl font-sans">
            A chronological ledger of our key milestones, showcasing our commitment and progress in systemic ecological restoration.
          </p>
        </div>
      </div>

      {/* Timeline wrapper breaking out of max-width on the right side for desktop */}
      <div className="w-full px-6 lg:px-0 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <div className="relative w-full lg:-ml-12 lg:-mt-8 lg:pl-12 lg:pt-16 lg:overflow-x-auto lg:pb-24 lg:-mb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col lg:flex-row lg:gap-16 relative lg:min-w-max lg:pr-[360px]">
            {/* Absolute horizontal line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#111111]/20 -translate-y-1/2 z-0 hidden lg:block" />
            
            {/* Absolute vertical line (Mobile) */}
            <div className="absolute top-8 bottom-8 left-[17px] md:left-[21px] w-[1px] bg-[#111111]/20 z-0 lg:hidden" />
            
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                 <div key={idx} className="w-full lg:w-[360px] flex-shrink-0 flex flex-col lg:relative z-10 group relative pl-[48px] md:pl-[60px] lg:pl-0 mb-16 lg:mb-0">
                    
                    {/* Desktop: Top half */}
                    <div className="hidden lg:flex flex-1 min-h-[240px] flex-col justify-end pb-12 relative cursor-default">
                       {isEven ? (
                         <div className="w-full h-64 bg-gray-200 rounded-none overflow-hidden relative border border-[#111111]/10 transition-all duration-500 transform group-hover:-translate-y-3">
                           <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 filter grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
                         </div>
                       ) : (
                         <div className="bg-transparent p-0 transition-all duration-500 transform group-hover:-translate-y-2">
                            <span className="font-mono text-[10px] tracking-widest text-[#111111]/50 uppercase mb-2 block border border-[#111111]/10 w-fit px-2 py-1 bg-white">YEAR: {item.year}</span>
                            <h4 className="text-2xl font-serif font-light mb-4 leading-snug group-hover:text-[#111111] transition-colors">{item.title}</h4>
                            <p className="text-[#111111]/70 text-sm leading-relaxed transition-colors font-sans">{item.description}</p>
                         </div>
                       )}
                    </div>
                    
                    {/* Desktop Timeline Node */}
                    <div className="h-0 relative items-center justify-start hidden lg:flex z-10">
                       <div className="w-4 h-4 bg-[#F4F4F0] rounded-full border border-[#111111] absolute left-[-8px] shrink-0 group-hover:scale-[1.5] group-hover:bg-[#C7F16C] group-hover:border-[#111111] transition-all duration-300" />
                    </div>

                    {/* Desktop: Bottom half */}
                    <div className="hidden lg:flex flex-1 min-h-[240px] flex-col justify-start pt-12 relative cursor-default">
                       {isEven ? (
                         <div className="bg-transparent p-0 transition-all duration-500 transform group-hover:translate-y-2">
                            <span className="font-mono text-[10px] tracking-widest text-[#111111]/50 uppercase mb-2 block border border-[#111111]/10 w-fit px-2 py-1 bg-white">YEAR: {item.year}</span>
                            <h4 className="text-2xl font-serif font-light mb-4 leading-snug group-hover:text-[#111111] transition-colors">{item.title}</h4>
                            <p className="text-[#111111]/70 text-sm leading-relaxed transition-colors font-sans">{item.description}</p>
                         </div>
                       ) : (
                         <div className="w-full h-64 bg-gray-200 rounded-none overflow-hidden relative border border-[#111111]/10 transition-all duration-500 transform group-hover:translate-y-3">
                           <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 filter grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
                         </div>
                       )}
                    </div>

                    {/* Mobile Layout (Visible only on < lg) */}
                    <div className="lg:hidden flex flex-col relative w-full pt-2 cursor-default">
                       {/* Mobile Node */}
                       <div className="w-3 h-3 bg-[#F4F4F0] rounded-full border border-[#111111] absolute left-[-35px] md:left-[-45px] top-[14px] shrink-0 z-10 transition-transform group-hover:scale-[1.5] group-hover:bg-[#C7F16C] duration-300" />
                       
                       <div className="bg-white rounded-none p-6 border border-[#111111]/10 transition-all duration-500 transform">
                         <span className="font-mono text-[10px] tracking-widest text-[#111111]/50 uppercase mb-3 block border border-[#111111]/10 w-fit px-2 py-1 bg-[#F4F4F0]">YEAR: {item.year}</span>
                         <h4 className="text-xl font-serif font-light mb-3 leading-snug group-hover:text-[#111111] transition-colors text-[#111111]">{item.title}</h4>
                         <p className="text-[#111111]/70 text-[13px] font-sans leading-relaxed mb-6">{item.description}</p>
                         <div className="w-full h-48 md:h-64 bg-gray-200 rounded-none overflow-hidden relative transition-all duration-300 border border-[#111111]/10">
                           <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-1000 filter grayscale" referrerPolicy="no-referrer" />
                         </div>
                       </div>
                    </div>

                 </div>
              );
            })}
            
            {/* CTA Node at the end */}
            <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col justify-center items-start lg:items-center pl-[48px] md:pl-[60px] lg:pl-0 relative z-10 group mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
                {/* Mobile CTA Node */}
                <div className="lg:hidden w-3 h-3 bg-[#111111] rounded-full border border-[#111111] absolute left-[9px] md:left-[13px] top-1/2 -translate-y-1/2 shrink-0 z-10 group-hover:scale-[1.5] transition-all duration-300 group-hover:bg-[#C7F16C]" />
                
                <div className="w-full bg-[#111111] p-8 md:p-10 text-center rounded-none border border-[#111111]/10 transition-all duration-500 flex flex-col items-center justify-center lg:h-[260px]">
                    <div className="w-12 h-12 bg-[#F4F4F0] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <ChevronRight className="w-6 h-6 text-[#111111]" />
                    </div>
                    <h4 className="font-serif font-light text-2xl mb-6 text-[#F4F4F0]">Ready to make an impact?</h4>
                    <Button className="w-full bg-[#C7F16C] text-[#111111] hover:bg-[#D9F99D] rounded-none px-6 h-12 text-[10px] font-mono tracking-widest uppercase transition-all font-bold">
                      [ Initiate Contact ]
                    </Button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
