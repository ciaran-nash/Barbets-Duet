'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Share2, Download } from 'lucide-react';
import { Project } from '@/types/project';
import Image from 'next/image';

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailDrawer({ project, isOpen, onClose }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-4xl bg-background border-l border-border z-[101] shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 p-8 flex justify-between items-center bg-background/80 backdrop-blur-md z-10 border-b border-border">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand">Project Blueprint — {project.category}</div>
                <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-8 md:p-16">
                <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-12 border border-border">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold leading-none mb-8">{project.title}</h2>
                        <div className="flex flex-wrap gap-4 mb-12">
                            <span className="px-4 py-2 bg-brand/10 text-brand rounded-full text-xs font-mono uppercase tracking-widest font-bold">Origin: {project.siteSlug}</span>
                            <span className="px-4 py-2 bg-forest text-platinum rounded-full text-xs font-mono uppercase tracking-widest font-bold">Maturity: {project.maturity}</span>
                        </div>

                        <div className="space-y-8">
                            <section>
                                <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Innovation Summary</h4>
                                <p className="text-2xl font-serif leading-relaxed italic">{project.innovationSummary}</p>
                            </section>
                            
                            <section>
                                <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">The Narrative</h4>
                                <p className="text-xl text-muted-foreground font-serif leading-relaxed">{project.longDescription}</p>
                            </section>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <div className="p-8 bg-card/5 rounded-3xl border border-border">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Impact Verified</h4>
                            <div className="space-y-8">
                                {project.impactMetrics.map((m, i) => (
                                    <div key={i}>
                                        <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">{m.label}</div>
                                        <div className="text-3xl font-serif font-bold text-brand">{m.value} <span className="text-sm font-normal text-muted-foreground">{m.unit}</span></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button className="w-full py-4 bg-foreground text-background rounded-full font-serif font-bold flex items-center justify-center gap-3 hover:bg-brand hover:text-forest transition-all">
                                Download Protocol <Download className="w-4 h-4" />
                            </button>
                            <button className="w-full py-4 border border-border rounded-full font-serif font-bold flex items-center justify-center gap-3 hover:bg-muted transition-all">
                                Share Innovation <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
