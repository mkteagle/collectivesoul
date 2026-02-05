"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const tourDates = [
  { date: "MAR 15", city: "ATLANTA, GA", venue: "State Farm Arena", status: "on-sale" },
  { date: "MAR 22", city: "NASHVILLE, TN", venue: "Bridgestone Arena", status: "on-sale" },
  { date: "APR 05", city: "CHICAGO, IL", venue: "United Center", status: "low" },
  { date: "APR 12", city: "DENVER, CO", venue: "Ball Arena", status: "on-sale" },
  { date: "APR 19", city: "LOS ANGELES, CA", venue: "The Forum", status: "sold-out" },
  { date: "MAY 03", city: "NEW YORK, NY", venue: "Madison Square Garden", status: "on-sale" },
];

export default function Tour() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

      {/* Tour Grid */}
      <div className="px-6 lg:px-16 max-w-5xl">
        {tourDates.map((tour, i) => (
          <motion.article
            key={tour.city}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            whileHover={{ x: 10 }}
            className="group grid grid-cols-[auto_1fr_auto] gap-4 lg:gap-8 items-center p-4 lg:p-6 bg-black border-l-[3px] border-magenta hover:border-cyan hover:bg-gray transition-all duration-300 mb-2"
          >
            {/* Date */}
            <div className="flex flex-col items-center min-w-[70px]">
              <span className="font-mono text-[0.65rem] tracking-[0.15em] text-cyan">
                {tour.date.split(" ")[0]}
              </span>
              <span className="font-[family-name:var(--font-bebas)] text-4xl leading-none">
                {tour.date.split(" ")[1]}
              </span>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-[family-name:var(--font-bebas)] text-xl lg:text-2xl tracking-wide mb-1">
                {tour.city}
              </h3>
              <p className="font-mono text-xs text-gray-light tracking-[0.1em]">
                {tour.venue}
              </p>
            </div>

            {/* Action */}
            <div className="flex items-center gap-3">
              {tour.status === "low" && (
                <span className="font-mono text-[0.6rem] tracking-[0.1em] px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-400">
                  LOW TICKETS
                </span>
              )}
              {tour.status === "sold-out" ? (
                <span className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-2 bg-red-500/20 text-red-400 border border-red-400">
                  SOLD OUT
                </span>
              ) : (
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-mono text-[0.7rem] tracking-[0.15em] px-4 py-2 bg-magenta text-white hover:bg-magenta-light transition-colors"
                >
                  TICKETS
                </motion.a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="px-6 lg:px-16 mt-10 text-center lg:text-left"
      >
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.1em] px-6 py-3 border-2 border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors"
        >
          VIEW ALL DATES
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
