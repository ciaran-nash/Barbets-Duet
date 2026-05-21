'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KineticRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down';
}

/**
 * KineticReveal
 * A high-fidelity "slice-reveal" component for typography.
 * Wraps content in an overflow-hidden container and animates it into view.
 */
export function KineticReveal({ 
  children, 
  delay = 0, 
  duration = 1.2, 
  className = "",
  direction = 'up'
}: KineticRevealProps) {
  const initialY = direction === 'up' ? "100%" : "-100%";

  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        initial={{ y: initialY }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ 
          duration, 
          delay, 
          ease: [0.16, 1, 0.3, 1] // Custom quint ease for luxury feel
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
