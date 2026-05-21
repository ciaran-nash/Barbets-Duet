'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarbetsEvent } from '@/types/narrative';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export function EventCard({ event }: { event: BarbetsEvent }) {
  return (
    <motion.div 
      className="group bg-card/5 border border-border/30 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-stretch hover:border-brand/50 transition-all duration-700"
    >
      <div className="md:w-1/3 relative min-h-[300px]">
        <Image src={event.image} alt={event.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
      </div>
      
      <div className="md:w-2/3 p-10 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">{event.type}</span>
                <h3 className="text-3xl font-serif font-bold group-hover:text-brand transition-colors">{event.title}</h3>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold ${
                event.registrationStatus === 'Open' ? 'bg-brand/20 text-brand' : 'bg-muted text-muted-foreground'
            }`}>
                {event.registrationStatus}
            </div>
        </div>

        <p className="text-muted-foreground text-lg font-serif italic mb-8 max-w-xl">{event.description}</p>
        
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/30">
            <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-accent" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">When</span>
                    <span className="text-sm font-bold">{event.date}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-accent" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Where</span>
                    <span className="text-sm font-bold">{event.location}</span>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
