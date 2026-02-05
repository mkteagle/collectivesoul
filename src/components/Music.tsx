"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Albums in chronological order with found.ee links
const albums = [
  { title: "Hints Allegations and Things Left Unsaid", year: "1993", image: "/album_art/hints.jpg", link: "https://found.ee/HATLU" },
  { title: "Collective Soul", year: "1995", image: "/album_art/collectivesoul.png", link: "https://found.ee/collective-soul" },
  { title: "Disciplined Breakdown", year: "1997", image: "/album_art/disciplined_breakdown.png", link: "https://found.ee/disciplined-breakdown" },
  { title: "Dosage", year: "1999", image: "/album_art/dosage.jpg", link: "https://found.ee/dosage" },
  { title: "Blender", year: "2000", image: "/album_art/blender.png", link: "https://found.ee/blender" },
  { title: "7even Year Itch", year: "2001", image: "/album_art/7even-year-itch.jpg", link: "https://found.ee/7evenyearitch" },
  { title: "Youth", year: "2004", image: "/album_art/youth.jpg", link: "https://found.ee/collectivesoul_youth" },
  { title: "From the Ground Up", year: "2005", image: "/album_art/from_the_ground_up.jpg", link: "https://found.ee/cs_fromthegroundup" },
  { title: "Afterwords", year: "2007", image: "/album_art/afterwords.jpg", link: "https://found.ee/afterwords" },
  { title: "Home", year: "2009", image: "/album_art/home.jpg", link: "https://found.ee/collectivesoul_home" },
  { title: "Live", year: "2017", image: "/album_art/live.jpg", link: "https://found.ee/cs-live" },
  { title: "See What You Started by Continuing", year: "2015", image: "/album_art/see-what-you-started-by-continuing.jpg", link: "https://found.ee/swysbc" },
  { title: "Blood", year: "2019", image: "/album_art/blood.jpg", link: "https://found.ee/collectivesoul_blood" },
  { title: "Vibrating", year: "2022", image: "/album_art/vibrating.jpg", link: "https://found.ee/CollectiveSoulVibrating" },
  { title: "Half & Half", year: "2023", image: "/album_art/half-&-half.jpg", link: "https://found.ee/half-and-half" },
  { title: "Here To Eternity", year: "2024", image: "/album_art/here-to-eternity.jpg", link: "https://found.ee/CollectiveSoulHereToEternity" },
];

export default function Music() {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const albumWidth = 600; // Width of each album
    const totalOriginalWidth = albums.length * albumWidth;

    // Calculate new scroll position
    let newScrollLeft = scrollLeft + (direction === "left" ? -albumWidth : albumWidth);

    // Handle looping
    if (direction === "right" && newScrollLeft >= totalOriginalWidth * 2) {
      // Jump back to the middle set
      carouselRef.current.scrollLeft = totalOriginalWidth;
      newScrollLeft = totalOriginalWidth + albumWidth;
    } else if (direction === "left" && newScrollLeft < totalOriginalWidth) {
      // Jump forward to the middle set
      carouselRef.current.scrollLeft = totalOriginalWidth * 2;
      newScrollLeft = totalOriginalWidth * 2 - albumWidth;
    }

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  // Duplicate albums for seamless loop (3 sets)
  const loopedAlbums = [...albums, ...albums, ...albums];

  // Set initial scroll position to the middle set for seamless looping
  useEffect(() => {
    if (carouselRef.current) {
      const albumWidth = 600;
      carouselRef.current.scrollLeft = albums.length * albumWidth;
    }
  }, []);

  return (
    <section
      id="music"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-black to-gray-dark"
      ref={ref}
    >
      {/* Section Header */}
      <div className="px-6 lg:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.1em]">02</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl lg:text-6xl tracking-wide">
            MUSIC
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray to-transparent" />
        </motion.div>
      </div>

      {/* Full Width Album Carousel */}
      <div className="relative mb-16">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/80 hover:bg-magenta transition-colors rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/80 hover:bg-magenta transition-colors rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-l from-gray-dark to-transparent z-10 pointer-events-none" />

        {/* Carousel */}
        <motion.div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {loopedAlbums.map((album, i) => (
            <motion.a
              key={`${album.title}-${i}`}
              href={album.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + (i % albums.length) * 0.03 }}
              className="flex-shrink-0 w-[500px] lg:w-[600px] group"
              onClick={(e) => isDragging && e.preventDefault()}
            >
              {/* Album Cover */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  draggable={false}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-magenta/90 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Cyan Border on Hover */}
                <div className="absolute inset-0 border-2 border-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Album Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h4 className="font-[family-name:var(--font-bebas)] text-lg lg:text-xl leading-tight mb-1 group-hover:text-magenta transition-colors line-clamp-2">
                    {album.title}
                  </h4>
                  <span className="font-mono text-xs text-cyan tracking-[0.1em]">
                    {album.year}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* All Music Link */}
      <div className="px-6 lg:px-16 text-center">
        <motion.a
          href="https://found.ee/listen_collectivesoul"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.15em] px-8 py-4 border-2 border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors"
        >
          EXPLORE ALL MUSIC
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
