"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// Bandsintown Artist ID for Collective Soul
const BANDSINTOWN_ARTIST = "Collective Soul";
const BANDSINTOWN_APP_ID = "collectivesoul_website";

export default function Tour() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Load Bandsintown widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgetv3.bandsintown.com/main.min.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[src="https://widgetv3.bandsintown.com/main.min.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="tour" className="relative py-24 lg:py-32 bg-gray-dark" ref={ref}>
      {/* Section Header */}
      <div className="px-6 lg:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.1em]">01</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl lg:text-6xl tracking-wide">
            TOUR DATES
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray to-transparent" />
        </motion.div>
      </div>

      {/* Bandsintown Widget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-6 lg:px-16 max-w-5xl"
      >
        <a
          className="bit-widget-initializer"
          data-artist-name={BANDSINTOWN_ARTIST}
          data-display-local-dates="false"
          data-display-past-dates="false"
          data-auto-style="false"
          data-text-color="#ffffff"
          data-link-color="#00d4ff"
          data-background-color="transparent"
          data-display-limit="15"
          data-display-start-time="false"
          data-link-text-color="#000000"
          data-display-lineup="false"
          data-display-play-my-city="true"
          data-separator-color="#333333"
          data-play-my-city-text-color="#00d4ff"
          data-widget-width="100%"
          data-date-format="MMM DD, YYYY"
          data-popup-background-color="#1a1a1a"
          data-language="en"
        />

        {/* Custom styles for the widget */}
        <style jsx global>{`
          .bit-widget {
            font-family: var(--font-outfit), sans-serif !important;
          }
          .bit-event {
            background: #000 !important;
            border-left: 3px solid #e91e8c !important;
            margin-bottom: 8px !important;
            padding: 16px 24px !important;
            transition: all 0.3s ease !important;
          }
          .bit-event:hover {
            border-left-color: #00d4ff !important;
            background: #1f1f1f !important;
            transform: translateX(10px);
          }
          .bit-date {
            font-family: 'Bebas Neue', sans-serif !important;
            font-size: 1.5rem !important;
            color: #00d4ff !important;
          }
          .bit-venue, .bit-location {
            font-family: var(--font-outfit), sans-serif !important;
          }
          .bit-venue {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
          }
          .bit-location {
            font-size: 0.75rem !important;
            letter-spacing: 0.1em !important;
            color: #888 !important;
          }
          .bit-button {
            background: #e91e8c !important;
            font-family: monospace !important;
            font-size: 0.7rem !important;
            letter-spacing: 0.15em !important;
            padding: 8px 16px !important;
            border: none !important;
            transition: background 0.3s ease !important;
          }
          .bit-button:hover {
            background: #ff3da5 !important;
          }
          .bit-no-dates-container {
            text-align: center !important;
            padding: 48px !important;
            color: #888 !important;
          }
          .bit-play-my-city {
            background: transparent !important;
            border: 2px solid #00d4ff !important;
            color: #00d4ff !important;
            font-family: monospace !important;
            letter-spacing: 0.1em !important;
            transition: all 0.3s ease !important;
          }
          .bit-play-my-city:hover {
            background: #00d4ff !important;
            color: #000 !important;
          }
        `}</style>
      </motion.div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="px-6 lg:px-16 mt-10 text-center lg:text-left"
      >
        <motion.a
          href={`https://www.bandsintown.com/a/3805-collective-soul`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.1em] px-6 py-3 border-2 border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors"
        >
          VIEW ALL DATES ON BANDSINTOWN
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
