"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const photos = [
  { src: "/images/Collective-Soul-Promo-Photo_Cred-John-Fulton.png" },
  { src: "/promo/gmaw-band.jpg" },
  { src: "/images/photo2.jpeg" },
  { src: "/images/gmaw-47.jpg" },
  { src: "/images/gmaw-66.jpg" },
  { src: "/images/CSoul-Battery-7602-2-2.jpg" },
  { src: "/images/gmaw-75.jpg" },
  { src: "/images/Collective-Blood-NY18-0468-2-e1651693926905.jpg" },
  { src: "/images/photo3.jpeg" },
  { src: "/images/image-8004.jpeg" },
];

// Scattered layout positions for visual interest
const positions = [
  { top: "0%", left: "0%", w: "55%", lgW: "45%", aspect: "aspect-[4/3]", rotate: -3, z: 10 },
  { top: "5%", right: "0%", w: "40%", lgW: "30%", aspect: "aspect-square", rotate: 2, z: 20 },
  { top: "35%", right: "5%", w: "35%", lgW: "28%", aspect: "aspect-[3/4]", rotate: -1, z: 30 },
  { top: "28%", left: "20%", w: "45%", lgW: "35%", aspect: "aspect-video", rotate: 4, z: 40 },
  { bottom: "22%", left: "5%", w: "40%", lgW: "32%", aspect: "aspect-[4/3]", rotate: -2, z: 20 },
  { bottom: "8%", left: "35%", w: "35%", lgW: "25%", aspect: "aspect-square", rotate: 3, z: 30 },
  { bottom: "25%", right: "2%", w: "30%", lgW: "22%", aspect: "aspect-[3/4]", rotate: -4, z: 10 },
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

  // First 7 photos get the scattered layout, rest go in a row below
  const scatteredPhotos = photos.slice(0, 7);
  const extraPhotos = photos.slice(7);

  return (
    <section id="photos" className="relative py-24 lg:py-32 bg-gray-dark overflow-hidden" ref={ref}>
      {/* Section Header */}
      <div className="px-6 lg:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.3em] block mb-4">06</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl lg:text-7xl tracking-wide">
            PHOTOS
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-magenta to-transparent mx-auto mt-4" />
        </motion.div>
      </div>

      {/* Scattered Photo Layout */}
      <div className="relative h-[800px] lg:h-[900px] mx-6 lg:mx-16">
        {scatteredPhotos.map((photo, i) => {
          const pos = positions[i];
          return (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 50, rotate: pos.rotate }}
              animate={isInView ? { opacity: 1, y: 0, rotate: pos.rotate } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className={`absolute ${pos.aspect} cursor-pointer group`}
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
                width: pos.w,
                zIndex: pos.z,
              }}
              onClick={() => openLightbox(i)}
            >
              <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                <img src={photo.src} alt="Collective Soul" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-magenta scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                {i % 3 === 0 && (
                  <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                {i % 3 === 1 && (
                  <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Decorative elements */}
        <div className="absolute top-[15%] left-[50%] w-32 h-32 border border-magenta/20 rounded-full" />
        <div className="absolute bottom-[30%] right-[25%] w-20 h-20 border border-cyan/20" />
      </div>

      {/* Additional Photos Row */}
      {extraPhotos.length > 0 && (
        <div className="mx-6 lg:mx-16 mt-8 grid grid-cols-3 gap-4">
          {extraPhotos.map((photo, i) => {
            const actualIndex = 7 + i;
            return (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="cursor-pointer group overflow-hidden"
                onClick={() => openLightbox(actualIndex)}
              >
                <div className="relative aspect-video overflow-hidden shadow-lg border border-white/10">
                  <img src={photo.src} alt="Collective Soul" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

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
                alt="Collective Soul"
                className="max-w-full max-h-[85vh] object-contain"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <span className="font-mono text-xs text-white/50">
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
