'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollGlowProps {
  color?: string;
  size?: number;
  opacity?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  driftX?: [number, number];
  driftY?: [number, number];
  blur?: number;
}

/**
 * ScrollGlow
 * An atmospheric orbital glow element that drifts based on scroll progress.
 */
export function ScrollGlow({
  color = "var(--primary)",
  size = 600,
  opacity = 0.2,
  top,
  left,
  right,
  bottom,
  driftX = [0, 100],
  driftY = [0, -50],
  blur = 120
}: ScrollGlowProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const x = useTransform(scrollYProgress, [0, 1], driftX);
  const y = useTransform(scrollYProgress, [0, 1], driftY);
  
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        top,
        left,
        right,
        bottom,
        x: smoothX,
        y: smoothY,
        filter: `blur(${blur}px)`,
      }}
      className="absolute orbital-glow pointer-events-none rounded-full"
    />
  );
}
