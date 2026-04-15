'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ContainerScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

export function ContainerScrollAnimation({
  children,
  className = '',
}: ContainerScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);

  return (
    <div ref={containerRef} className={className} style={{ perspective: '1200px' }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          translateY,
          transformOrigin: 'center top',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
