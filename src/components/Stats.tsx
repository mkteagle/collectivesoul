"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { number: 15, suffix: "M+", label: "ALBUMS SOLD" },
  { number: 7, suffix: "", label: "#1 SINGLES" },
  { number: 6, suffix: "", label: "GOLD & PLATINUM" },
  { number: 30, suffix: "+", label: "YEARS ROCKING" },
];

function AnimatedNumber({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 lg:py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-magenta/10 via-black to-cyan/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-magenta)_0%,transparent_50%)] opacity-10" />

      {/* Top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magenta to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="font-[family-name:var(--font-bebas)] text-5xl lg:text-7xl text-magenta mb-2">
                <AnimatedNumber target={stat.number} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] text-gray-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
