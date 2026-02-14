"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-magenta/60 blur-[100px] -top-[200px] -right-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-cyan/60 blur-[100px] -bottom-[100px] -left-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-magenta-light/40 blur-[80px] top-1/2 left-[40%]"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            x: [0, 40, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-cyan) 1px, transparent 1px),
                           linear-gradient(90deg, var(--color-cyan) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full grid lg:grid-cols-2 gap-8 lg:gap-16 px-6 lg:px-16 pt-32 lg:pt-0"
      >
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-center">
          {/* Album Announce Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block font-mono text-xs tracking-[0.2em] px-4 py-2 border border-cyan text-cyan animate-pulse-border">
              NEW ALBUM 2026
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="flex flex-col mb-8 lg:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 60, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bebas)] text-[clamp(5rem,15vw,12rem)] leading-[0.85] tracking-tight"
            >
              TOUCH
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,10vw,8rem)] leading-[0.85] text-cyan ml-4 lg:ml-12"
            >
              AND
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bebas)] text-[clamp(5rem,15vw,12rem)] leading-[0.85] tracking-tight text-magenta"
            >
              GO
            </motion.span>
          </h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-16"
          >
            <motion.a
              href="#music"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-3 font-mono text-sm tracking-[0.15em] px-8 py-4 bg-magenta text-white overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-magenta-light"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative">LISTEN NOW</span>
              <span className="relative group-hover:translate-x-1 transition-transform">▶</span>
            </motion.a>

            <motion.a
              href="#tour"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-3 font-mono text-sm tracking-[0.15em] px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              <span>SEE US LIVE</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hidden lg:flex items-center gap-4"
          >
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gray-light">
              SCROLL
            </span>
            <div className="relative w-16 h-px bg-gradient-to-r from-gray-light to-transparent scroll-indicator" />
          </motion.div>
        </div>

        {/* Right Side - Album Art */}
        <div className="flex items-center justify-center">
          <a
            href="https://recordstoreday.com/SpecialRelease/20149"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[450px] lg:h-[450px] group"
          >
            {/* Vinyl Record */}
            <motion.div
              className="absolute inset-0 rounded-full translate-x-[30%]"
              style={{
                background: `radial-gradient(circle at center,
                  #1a1a1a 0%,
                  #1a1a1a 15%,
                  #111 15%,
                  #111 16%,
                  #1a1a1a 16%,
                  #1a1a1a 30%,
                  #111 30%,
                  #111 31%,
                  #1a1a1a 31%,
                  #1a1a1a 50%,
                  #111 50%,
                  #111 51%,
                  #1a1a1a 51%)`,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                transformOrigin: "center",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Vinyl Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-magenta flex items-center justify-center">
                <span className="font-[family-name:var(--font-bebas)] text-xl text-white">CS</span>
              </div>
            </motion.div>

            {/* Album Cover */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              whileHover={{ scale: 1.02, rotate: 2 }}
              transition={{ duration: 0.4 }}
              style={{
                boxShadow: "0 30px 80px rgba(233, 30, 140, 0.3)",
              }}
            >
              <Image
                src="/promo/touch-and-go.webp"
                alt="Touch and Go - Collective Soul"
                fill
                sizes="(max-width: 768px) 440px, (max-width: 1024px) 300px, 450px"
                className="object-cover"
                priority
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="font-mono text-xs tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-magenta px-4 py-2">
                  PRE-ORDER NOW
                </span>
              </div>

              {/* Glare Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
                initial={{ opacity: 0.3, x: "-100%" }}
                whileHover={{ x: "100%", opacity: 0.5 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
