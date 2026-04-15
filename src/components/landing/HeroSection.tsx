'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const logoRotateY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-crown-dark via-crown-dark to-crown-dark-card" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,255,0,0.08)_0%,transparent_70%)]" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-crown-lavender/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-crown-lime/5 blur-3xl" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        {/* Logo with 3D tilt */}
        <motion.div
          style={{
            rotateY: logoRotateY,
            scale: logoScale,
            perspective: '800px',
          }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="Crown Crumb JA"
            width={200}
            height={200}
            className="mx-auto rounded-2xl glow-lime"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-crown-white">Equipping Jamaica&apos;s</span>
          <br />
          <span className="text-crown-lime text-glow-lime">
            Bakers &amp; Pop-Up Dreamers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-crown-muted max-w-2xl mx-auto mb-10"
        >
          Premium packaging solutions, display fixtures, canopy tents, and baking
          supplies — everything you need to shine at your next pop-up event.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="px-8 py-4 bg-crown-lime text-crown-dark font-bold text-lg rounded-full hover:bg-crown-lime/90 transition-all hover:scale-105 animate-pulse-glow"
          >
            Shop Products
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-crown-lavender text-crown-lavender font-bold text-lg rounded-full hover:bg-crown-lavender/10 transition-all hover:scale-105"
          >
            Our Story
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-float">
          <div className="w-6 h-10 border-2 border-crown-muted/30 rounded-full mx-auto flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-crown-lime rounded-full animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
