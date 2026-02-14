"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Documentary() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="documentary"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
      ref={ref}
    >
      {/* Background cinematic effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-magenta)_0%,transparent_60%)] opacity-5" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Film Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Film frame effect */}
            <div className="relative aspect-[16/10] overflow-hidden group">
              {/* Film sprocket holes */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gray-dark z-10 flex flex-col justify-around items-center py-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm bg-black border border-gray/50" />
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gray-dark z-10 flex flex-col justify-around items-center py-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm bg-black border border-gray/50" />
                ))}
              </div>

              {/* Main Image */}
              <div className="absolute inset-0 ml-6 mr-6 bg-gradient-to-br from-gray-dark to-black">
                <Image
                  src="/promo/gmaw-band.webp"
                  alt="Give Me a Word - The Collective Soul Story"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Play button overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <a
                    href="https://www.givemeawordfilm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 rounded-full bg-magenta/80 hover:bg-magenta flex items-center justify-center transition-colors backdrop-blur-sm"
                  >
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Film strip label */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray" />
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gray-light">35MM</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-cyan block mb-4">
              FEATURE DOCUMENTARY
            </span>
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl lg:text-6xl leading-[0.9] mb-6">
              GIVE ME A WORD:
              <br />
              <span className="text-magenta">THE COLLECTIVE SOUL STORY</span>
            </h2>
            <p className="text-gray-light text-base lg:text-lg leading-relaxed font-[family-name:var(--font-outfit)] mb-4">
              The definitive telling of three decades of Collective Soul. Filmed at the Elvis Presley estate during the recording of <em>Here To Eternity</em> and featuring appearances by Sammy Hagar and Dolly Parton.
            </p>
            <p className="text-gray-light text-sm leading-relaxed font-[family-name:var(--font-outfit)] mb-8 opacity-70">
              Directed by Joseph Rubinstein. Available now on Apple TV, Amazon, and Blu-ray/DVD.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="https://www.givemeawordfilm.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 font-mono text-sm tracking-[0.15em] px-8 py-4 bg-magenta text-white hover:bg-magenta-light transition-colors"
              >
                WATCH NOW
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
              <motion.a
                href="https://stores.portmerch.com/collectivesoul/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 font-mono text-sm tracking-[0.15em] px-8 py-4 border-2 border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors"
              >
                GET THE DVD
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
