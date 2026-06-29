'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section id="our-mission" className="py-32 px-6 bg-card text-foreground relative overflow-hidden text-center md:text-left">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-foreground/10 hidden md:block -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-sm mx-auto md:max-w-none group"
        >
          <div className="relative aspect-[3/4] overflow-hidden border border-border/10 shadow-lg bg-foreground/10">
            <Image
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"
              alt="Community members working together on land restoration"
              fill
              referrerPolicy="no-referrer"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-[filter,opacity] duration-700 will-change-[filter]"
            />
            <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase bg-card/90 backdrop-blur-sm px-2 py-1 text-foreground border border-border/10 z-20">
              Fig 3.1
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full overflow-hidden border-8 border-border hidden md:block z-30 bg-foreground/10">
            <Image
              src="https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=400"
              alt="Barbet bird in natural habitat"
              fill
              referrerPolicy="no-referrer"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-[filter,opacity] duration-700 will-change-[filter]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-mono text-[10px] uppercase mb-6 text-foreground/70 tracking-[0.2em] flex items-center md:justify-start justify-center gap-4">
            <span className="w-8 h-[1px] bg-foreground/30"></span>
            The concept
          </h2>
          <h3 className="font-serif text-4xl lg:text-6xl font-light leading-tight mb-8 text-foreground [text-wrap:balance]">
            Like the harmonized calls of <span className="italic text-foreground/60">barbet birds</span>, we find balance.
          </h3>
          <div className="space-y-6 text-foreground/80 leading-relaxed text-sm md:text-base pb-8 border-b border-border/10 font-sans">
            <div>
              <p className="mb-2">
                The Barbets Duet Global Learning Sites are a network of real-world locations where people experiment with creating sustainable livelihoods.
              </p>
              <Link href="/research" className="inline-flex items-center text-[10px] font-mono text-band-foreground bg-band px-3 py-1.5 hover:bg-band-accent hover:text-band transition-colors duration-500 uppercase tracking-[0.2em] font-semibold border border-band-border">
                [ Read theory ]
              </Link>
            </div>
            <div>
              <p className="mb-2">
                Named after tropical birds who harmonise two voices into one, we learn from two cultures on equal terms — African and Western, traditional and modern — because solving the ecological crisis requires both.
              </p>
              <Link href="/about" className="inline-flex items-center text-[10px] font-mono text-band-foreground bg-band px-3 py-1.5 hover:bg-band-accent hover:text-band transition-colors duration-500 uppercase tracking-[0.2em] font-semibold border border-band-border">
                [ View origins ]
              </Link>
            </div>
          </div>

          <div className="pt-8">
             <Link href="/learning-sites" className="group flex items-center gap-3 text-sm tracking-[0.2em] font-mono uppercase text-foreground mx-auto md:mx-0 w-fit">
                Explore the archive
                <div className="w-10 h-10 rounded-full border border-border/20 group-hover:border-accent flex items-center justify-center transition-colors duration-500">
                  <ArrowUpRight size={16} className="text-foreground group-hover:text-accent" />
                </div>
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
