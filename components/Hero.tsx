'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] bg-band pt-24 pb-12 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[minmax(280px,320px)]">
          {/* Main Content Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-2 lg:col-span-3 md:row-span-2 bg-card rounded-[2rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group shadow-sm border border-border"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>

            <span className="eyebrow border border-border text-foreground/60 mb-4 md:mb-6">
              Ecological Restoration Collective
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.1] tracking-tight mb-6 mt-2 relative z-10 [text-wrap:balance]">
              Barbets Duet <br className="hidden md:block"/>
              <span className="italic text-accent">Ecological Restoration Collective</span>
            </h1>

            <p className="text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed mb-10 relative z-10 font-sans">
              A mature oak tree supports 284 species of insect. Its life value is extraordinary — yet markets reward cutting it down, not leaving it standing. Barbets Duet invents the economic systems that change this: rewarding people who protect ecosystems, not just those who exploit them.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 text-base transition-all duration-500 active:scale-[0.98]">
                <Link href="/learning-sites">
                  Explore learning sites
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-transparent text-foreground hover:bg-foreground/5 px-8 h-14 text-base transition-all duration-500">
                <Link href="/get-involved">
                  Join our network
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Video Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-2 lg:col-span-2 md:row-span-1 rounded-[2rem] overflow-hidden relative shadow-sm group cursor-pointer"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-bark/10 group-hover:bg-bark/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 rounded-full bg-cream/20 backdrop-blur-md flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-cream/30">
                <PlayCircle className="w-8 h-8" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-cream text-sm font-medium tracking-wide z-10">
              Global restoration montage
            </div>
          </motion.div>

          {/* Image Box 1: Barbet Bird */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="md:col-span-1 lg:col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden relative shadow-sm group cursor-pointer"
          >
            <Image
              src="https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=800"
              alt="Barbet bird in its natural forest habitat"
              fill
              referrerPolicy="no-referrer"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bark/60 via-transparent to-transparent opacity-60 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/30 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 text-cream text-xs uppercase tracking-widest font-semibold flex items-center gap-2 z-10">
              <span className="w-2 h-2 rounded-full bg-wheat" aria-hidden="true"></span>
              Barbet
            </div>
          </motion.div>

          {/* Image Box 2: Learning Site */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="md:col-span-1 lg:col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden relative shadow-sm group cursor-pointer"
          >
            <Image
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
              alt="A Barbets Duet learning site in active restoration"
              fill
              referrerPolicy="no-referrer"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/30 transition-colors duration-500" />
            <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm text-bark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
              Site 01
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
