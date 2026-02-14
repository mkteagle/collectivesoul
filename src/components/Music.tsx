"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Albums in chronological order with found.ee links
const albums = [
  { title: "Hints Allegations and Things Left Unsaid", year: "1993", image: "/album_art/hints.webp", link: "https://found.ee/HATLU" },
  { title: "Collective Soul", year: "1995", image: "/album_art/collectivesoul.webp", link: "https://found.ee/collective-soul" },
  { title: "Disciplined Breakdown", year: "1997", image: "/album_art/disciplined_breakdown.webp", link: "https://found.ee/disciplined-breakdown" },
  { title: "Dosage", year: "1999", image: "/album_art/dosage.webp", link: "https://found.ee/dosage" },
  { title: "Blender", year: "2000", image: "/album_art/blender.webp", link: "https://found.ee/blender" },
  { title: "7even Year Itch", year: "2001", image: "/album_art/7even-year-itch.webp", link: "https://found.ee/7evenyearitch" },
  { title: "Youth", year: "2004", image: "/album_art/youth.webp", link: "https://found.ee/collectivesoul_youth" },
  { title: "From the Ground Up", year: "2005", image: "/album_art/from_the_ground_up.webp", link: "https://found.ee/cs_fromthegroundup" },
  { title: "Afterwords", year: "2007", image: "/album_art/afterwords.webp", link: "https://found.ee/afterwords" },
  { title: "Home", year: "2009", image: "/album_art/home.webp", link: "https://found.ee/collectivesoul_home" },
  { title: "Live", year: "2017", image: "/album_art/live.webp", link: "https://found.ee/cs-live" },
  { title: "See What You Started by Continuing", year: "2015", image: "/album_art/see-what-you-started-by-continuing.webp", link: "https://found.ee/swysbc" },
  { title: "Blood", year: "2019", image: "/album_art/blood.webp", link: "https://found.ee/collectivesoul_blood" },
  { title: "Vibrating", year: "2022", image: "/album_art/vibrating.webp", link: "https://found.ee/CollectiveSoulVibrating" },
  { title: "Half & Half", year: "2023", image: "/album_art/half-&-half.webp", link: "https://found.ee/half-and-half" },
  { title: "Here To Eternity", year: "2024", image: "/album_art/here-to-eternity.webp", link: "https://found.ee/CollectiveSoulHereToEternity" },
];

// Lazy embed component - shows album art facade, loads iframe on click
function LazyEmbed({
  src,
  title,
  height,
  label,
  color,
  sandbox,
  coverImage,
  platformIcon,
}: {
  src: string;
  title: string;
  height: number;
  label: string;
  color: string;
  sandbox?: string;
  coverImage?: string;
  platformIcon: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 rounded-2xl opacity-20 group-hover:opacity-50 transition-opacity blur-sm" style={{ background: `linear-gradient(to right, ${color}, ${color}4d)` }} />
      <div className="relative bg-gray-dark rounded-2xl overflow-hidden p-1.5">
        {loaded ? (
          <iframe
            style={{ borderRadius: "14px", width: "100%", overflow: "hidden" }}
            src={src}
            width="100%"
            height={height}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            title={title}
            {...(sandbox ? { sandbox } : {})}
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="relative w-full overflow-hidden cursor-pointer rounded-[14px] group/btn"
            style={{ height }}
          >
            {/* Album art background */}
            {coverImage && (
              <Image
                src={coverImage}
                alt={label}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-40 group-hover/btn:opacity-60 transition-opacity duration-500 group-hover/btn:scale-105 transition-transform"
              />
            )}
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 h-full">
              <div className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: `${color}cc` }}>
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                {platformIcon}
                <span className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-white">
                  {label}
                </span>
              </div>
              <span className="font-mono text-xs text-white/60 tracking-[0.1em]">
                TAP TO LOAD PLAYER
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function Music() {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const { scrollLeft } = carouselRef.current;
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

  const spotifyIcon = (
    <svg viewBox="0 0 24 24" fill="#1DB954" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );

  const appleMusicIcon = (
    <svg viewBox="0 0 24 24" fill="#FC3C44" className="w-5 h-5">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.364-2.172-1.158-.39-.804-.196-1.784.474-2.372.396-.347.87-.552 1.378-.674.417-.1.838-.172 1.26-.248.27-.05.536-.112.787-.222.28-.123.418-.336.44-.634.01-.12.013-.24.013-.36V8.373c0-.147-.018-.292-.072-.432-.058-.15-.164-.23-.323-.217-.18.015-.357.043-.532.08l-4.177.86c-.022.004-.043.013-.065.02-.21.057-.378.187-.44.401-.034.119-.053.243-.053.366-.003 2.26-.002 4.52-.003 6.78 0 .44-.05.878-.238 1.284-.28.61-.752 1.004-1.39 1.19-.37.11-.75.165-1.135.18-.947.037-1.776-.36-2.156-1.163-.378-.796-.186-1.768.468-2.357.4-.36.887-.567 1.404-.69.438-.104.878-.178 1.318-.267.24-.05.48-.107.705-.2.32-.132.463-.382.477-.727.005-.107.006-.214.006-.32V6.628c0-.32.063-.626.22-.906.163-.29.4-.495.69-.64.195-.097.4-.16.61-.203.27-.054.54-.104.81-.156l3.757-.772c.4-.082.803-.158 1.207-.22.272-.04.547-.034.816.037.418.11.716.377.87.78.073.188.1.384.1.584v4.002z" />
    </svg>
  );

  return (
    <section
      id="music"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-black to-gray-dark"
      ref={ref}
    >
      {/* Section Header */}
      <div className="px-6 lg:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.3em] block mb-4">02</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl lg:text-7xl tracking-wide">
            MUSIC
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-magenta to-transparent mx-auto mt-4" />
        </motion.div>
      </div>

      {/* Full Width Album Carousel */}
      <div className="relative mb-16">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          aria-label="Previous album"
          className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/80 hover:bg-magenta transition-colors rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Next album"
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
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  sizes="(max-width: 1024px) 500px, 600px"
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  draggable={false}
                  loading="lazy"
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

      {/* Streaming Embeds */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-6 lg:px-16 mb-16"
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="font-[family-name:var(--font-bebas)] text-3xl lg:text-4xl text-center mb-4 tracking-wide">
            STREAM <span className="text-magenta">EVERYWHERE</span>
          </h3>
          <p className="text-center text-gray-light font-[family-name:var(--font-outfit)] text-sm mb-10">
            Listen to Collective Soul on your favorite platform
          </p>

          {/* Spotify Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 24 24" fill="#1DB954" className="w-6 h-6">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-white">SPOTIFY</span>
            </div>
            <LazyEmbed
              src="https://open.spotify.com/embed/artist/4e5V1Q2dKCzbLVMQ8qbTn6?utm_source=generator&theme=0"
              title="Collective Soul on Spotify"
              height={500}
              color="#1DB954"
              label="LISTEN ON SPOTIFY"
              coverImage="/images/Collective-Soul-Promo-Photo_Cred-John-Fulton.webp"
              platformIcon={spotifyIcon}
            />
          </div>

          {/* Apple Music Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 24 24" fill="#FC3C44" className="w-6 h-6">
                <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.364-2.172-1.158-.39-.804-.196-1.784.474-2.372.396-.347.87-.552 1.378-.674.417-.1.838-.172 1.26-.248.27-.05.536-.112.787-.222.28-.123.418-.336.44-.634.01-.12.013-.24.013-.36V8.373c0-.147-.018-.292-.072-.432-.058-.15-.164-.23-.323-.217-.18.015-.357.043-.532.08l-4.177.86c-.022.004-.043.013-.065.02-.21.057-.378.187-.44.401-.034.119-.053.243-.053.366-.003 2.26-.002 4.52-.003 6.78 0 .44-.05.878-.238 1.284-.28.61-.752 1.004-1.39 1.19-.37.11-.75.165-1.135.18-.947.037-1.776-.36-2.156-1.163-.378-.796-.186-1.768.468-2.357.4-.36.887-.567 1.404-.69.438-.104.878-.178 1.318-.267.24-.05.48-.107.705-.2.32-.132.463-.382.477-.727.005-.107.006-.214.006-.32V6.628c0-.32.063-.626.22-.906.163-.29.4-.495.69-.64.195-.097.4-.16.61-.203.27-.054.54-.104.81-.156l3.757-.772c.4-.082.803-.158 1.207-.22.272-.04.547-.034.816.037.418.11.716.377.87.78.073.188.1.384.1.584v4.002z" />
              </svg>
              <span className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-white">APPLE MUSIC</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Here To Eternity */}
              <LazyEmbed
                src="https://embed.music.apple.com/us/album/here-to-eternity/1732691960?theme=dark"
                title="Here To Eternity on Apple Music"
                height={450}
                color="#FC3C44"
                label="HERE TO ETERNITY"
                coverImage="/album_art/here-to-eternity.webp"
                platformIcon={appleMusicIcon}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              />
              {/* Dosage */}
              <LazyEmbed
                src="https://embed.music.apple.com/us/album/dosage/1576791716?theme=dark"
                title="Dosage on Apple Music"
                height={450}
                color="#FC3C44"
                label="DOSAGE"
                coverImage="/album_art/dosage.webp"
                platformIcon={appleMusicIcon}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              />
            </div>
          </div>
        </div>
      </motion.div>

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
