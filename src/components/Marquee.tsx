"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const text = "TOUCH AND GO ◆ OUT NOW ◆ COLLECTIVE SOUL ◆ 2026 WORLD TOUR ◆ ";

  return (
    <div className="relative bg-magenta py-4 overflow-hidden -rotate-1 scale-[1.02] -my-5 z-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, "-25%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-bebas)] text-lg lg:text-xl tracking-wider text-black px-2"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
