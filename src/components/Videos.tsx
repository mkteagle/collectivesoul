"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";

const videos = [
  {
    id: "_m0bI82Rz_k",
    title: "Shine",
    year: "1994",
    album: "Hints Allegations and Things Left Unsaid",
  },
  {
    id: "n7TLTjqUyog",
    title: "The World I Know",
    year: "1995",
    album: "Collective Soul",
  },
  {
    id: "6exsatE-DUk",
    title: "December",
    year: "1995",
    album: "Collective Soul",
  },
  {
    id: "GGgTPAbsaGo",
    title: "Listen",
    year: "1999",
    album: "Dosage",
  },
  {
    id: "hFebAtN7hhk",
    title: "Precious Declaration",
    year: "1997",
    album: "Disciplined Breakdown",
  },
  {
    id: "k6XqBea3ORk",
    title: "Mother's Love",
    year: "2024",
    album: "Here To Eternity",
  },
];

export default function Videos() {
  const ref = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState(0);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  const handleVideoSelect = useCallback((index: number) => {
    setActiveVideo(index);
    if (!playerLoaded) {
      setPlayerLoaded(true);
    } else if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videos[index].id}?rel=0&modestbranding=1&autoplay=1`;
    }
  }, [playerLoaded]);

  const loadPlayer = useCallback(() => {
    setPlayerLoaded(true);
  }, []);

  return (
    <section
      id="videos"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
      ref={ref}
    >
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-cyan)_0%,transparent_50%)] opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.3em] block mb-4">
            05
          </span>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl lg:text-7xl tracking-wide">
            VIDEOS
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-magenta to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Featured Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
            {playerLoaded ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videos[activeVideo].id}?rel=0&modestbranding=1&autoplay=1`}
                title={videos[activeVideo].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                onClick={loadPlayer}
                aria-label="Play video"
                className="absolute inset-0 w-full h-full cursor-pointer group"
              >
                <Image
                  src={`https://img.youtube.com/vi/${videos[activeVideo].id}/maxresdefault.jpg`}
                  alt={videos[activeVideo].title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-magenta/90 group-hover:bg-magenta flex items-center justify-center transition-colors shadow-2xl">
                    <svg className="w-9 h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>
          <div className="max-w-5xl mx-auto mt-4 flex items-center justify-between">
            <div>
              <h3 className="font-[family-name:var(--font-bebas)] text-2xl lg:text-3xl text-white">
                {videos[activeVideo].title}
              </h3>
              <p className="font-mono text-xs text-gray-light tracking-wider">
                {videos[activeVideo].album} ({videos[activeVideo].year})
              </p>
            </div>
            <span className="font-mono text-xs text-white/40">
              {activeVideo + 1} / {videos.length}
            </span>
          </div>
        </motion.div>

        {/* Video Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto"
        >
          {videos.map((video, i) => (
            <button
              key={video.id}
              type="button"
              onClick={() => handleVideoSelect(i)}
              className={`group relative aspect-video overflow-hidden border-2 transition-all duration-300 ${
                i === activeVideo
                  ? "border-magenta shadow-lg shadow-magenta/30"
                  : "border-white/10 hover:border-cyan/50"
              }`}
            >
              <Image
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                fill
                sizes="(max-width: 1024px) 33vw, 160px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  i === activeVideo
                    ? "bg-magenta/20"
                    : "bg-black/40 group-hover:bg-black/20"
                }`}
              />
              {i === activeVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-mono text-[0.55rem] text-white/90 tracking-wider line-clamp-1">
                  {video.title}
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
