import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Mission() {
  const missions = [
    {
      title: 'Create Incentives for Ecosystem Protection',
      description: 'Barbets Duet seeks to shift economic and institutional systems so that people are financially and socially rewarded for protecting and restoring ecosystems, rather than destroying them for short-term profit.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
    },
    {
      title: 'Experiment with Sustainable Land Management Models',
      description: 'Through local learning sites, members test practical strategies for sustainable living—balancing ecology, livelihoods, and community needs—thus generating real-world, adaptable models.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
    },
    {
      title: 'Invent New Rules and Market Mechanisms',
      description: 'The mission includes developing innovative governance structures (like mosaic rights) and market frameworks that recognize and reward biodiversity conservation, especially at the community level.',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80',
    }
  ];

  return (
    <section className="py-24 bg-platinum text-night-forest">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-sm font-semibold tracking-wider uppercase mb-6 font-serif">The Barbets Duet Mission</h3>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 max-w-4xl mx-auto tracking-tight leading-tight">
          Restoring ecosystems through collaborative innovation
        </h2>
        <p className="max-w-2xl mx-auto text-night-forest/60 mb-10 leading-relaxed text-lg">
          We are committed to making a tangible impact through targeted initiatives that address the most pressing environmental challenges of our time.
        </p>
        <Button variant="outline" className="rounded-full px-8 border-night-forest/20 text-night-forest hover:bg-night-forest/5 mb-20 text-base h-12 transition-colors">
          Explore our mission
        </Button>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {missions.map((mission, idx) => (
            <div key={idx} className="flex flex-col items-center group transition-all duration-300 hover:scale-[1.03] p-8 rounded-3xl bg-white border border-night-forest/10 cursor-pointer">
              <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-8 bg-night-forest/10 shadow-sm">
                <Image
                  src={mission.image}
                  alt={mission.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-2xl font-serif font-bold mb-4 leading-snug">{mission.title}</h4>
              <p className="text-night-forest/60 mb-6 text-[15px] leading-relaxed max-w-sm">{mission.description}</p>
              <a href="#" className="flex items-center px-6 py-3 bg-night-forest/5 text-night-forest rounded-full text-sm font-bold hover:bg-viridian hover:text-platinum transition-all mt-auto uppercase tracking-wide group/btn">
                Learn more <ArrowUpRight className="ml-1 w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
