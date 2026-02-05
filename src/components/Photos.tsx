"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const photos = [
  { src: "/images/Collective-Soul-Promo-Photo_Cred-John-Fulton.png", label: "PROMO SHOOT" },
  { src: "/images/CSoul-Battery-7602-2-2.jpg", label: "BATTERY PARK" },
  { src: "/images/photo2.jpeg", label: "ON STAGE" },
  { src: "/images/Collective-Blood-NY18-0468-2-e1651693926905.jpg", label: "NYC 2018" },
  { src: "/images/CS_Lightbox_Pledge_APPROVED-PHOTO.png", label: "LIGHTBOX SESSION" },
  { src: "/images/photo3.jpeg", label: "LIVE PERFORMANCE" },
  { src: "/images/image-8004.jpeg", label: "BACKSTAGE" },
];

export default function Photos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  }, [selectedIndex]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  }, [selectedIndex]);

  return (
    <section id="photos" className="relative py-24 lg:py-32 bg-gray-dark overflow-hidden" ref={ref}>
      {/* Section Header */}
      <div className="px-6 lg:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.1em]">04</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl lg:text-6xl tracking-wide">
            PHOTOS
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray to-transparent" />
        </motion.div>
      </div>

      {/* Scattered Photo Layout */}
      <div className="relative h-[800px] lg:h-[900px] mx-6 lg:mx-16">
        {/* Photo 1 - Large left */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -3 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -3 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="absolute top-0 left-0 w-[55%] lg:w-[45%] aspect-[4/3] cursor-pointer group z-10"
          onClick={() => openLightbox(0)}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img src={photos[0].src} alt={photos[0].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan">{photos[0].label}</span>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>

        {/* Photo 2 - Top right */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 2 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 2 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute top-[5%] right-0 w-[40%] lg:w-[30%] aspect-square cursor-pointer group z-20"
          onClick={() => openLightbox(1)}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img src={photos[1].src} alt={photos[1].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan">{photos[1].label}</span>
            </div>
          </div>
        </motion.div>

        {/* Photo 3 - Middle right */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -1 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute top-[35%] right-[5%] w-[35%] lg:w-[28%] aspect-[3/4] cursor-pointer group z-30"
          onClick={() => openLightbox(2)}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img src={photos[2].src} alt={photos[2].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan">{photos[2].label}</span>
            </div>
          </div>
        </motion.div>

        {/* Photo 4 - Center overlapping */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 4 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 4 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute top-[28%] left-[20%] w-[45%] lg:w-[35%] aspect-video cursor-pointer group z-40"
          onClick={() => openLightbox(3)}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img src={photos[3].src} alt={photos[3].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan">{photos[3].label}</span>
            </div>
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>

        {/* Photo 5 - Bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -2 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute bottom-[15%] left-[5%] w-[40%] lg:w-[32%] aspect-[4/3] cursor-pointer group z-20"
          onClick={() => openLightbox(4)}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img src={photos[4].src} alt={photos[4].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan">{photos[4].label}</span>
            </div>
          </div>
        </motion.div>

        {/* Photo 6 - Bottom center */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 3 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 3 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute bottom-[5%] left-[35%] w-[35%] lg:w-[25%] aspect-square cursor-pointer group z-30"
          onClick={() => openLightbox(5)}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img src={photos[5].src} alt={photos[5].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan">{photos[5].label}</span>
            </div>
          </div>
        </motion.div>

        {/* Photo 7 - Bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -4 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -4 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="absolute bottom-[20%] right-[2%] w-[30%] lg:w-[22%] aspect-[3/4] cursor-pointer group z-10"
          onClick={() => openLightbox(6)}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img src={photos[6].src} alt={photos[6].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan">{photos[6].label}</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-[15%] left-[50%] w-32 h-32 border border-magenta/20 rounded-full" />
        <div className="absolute bottom-[30%] right-[25%] w-20 h-20 border border-cyan/20" />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
              onClick={closeLightbox}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button */}
            <button
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-cyan transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next button */}
            <button
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-cyan transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].label}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <span className="font-mono text-sm tracking-[0.2em] text-cyan">
                  {photos[selectedIndex].label}
                </span>
                <span className="font-mono text-xs text-white/50 ml-4">
                  {selectedIndex + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
