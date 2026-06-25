'use client';

import React from 'react';
import { motion } from 'motion/react';

interface KineticRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down';
}

export function KineticReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  direction = 'up'
}: KineticRevealProps) {
  const initialY = direction === 'up' ? 64 : -64;

  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        initial={{ y: initialY, opacity: 0, filter: "blur(8px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration,
          delay,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
