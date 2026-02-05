"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "#tour", label: "TOUR" },
  { href: "#music", label: "MUSIC" },
  { href: "#store", label: "STORE" },
  { href: "#photos", label: "PHOTOS" },
  { href: "#about", label: "ABOUT" },
  { href: "#connect", label: "CONNECT" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-16 py-4 transition-all duration-500 ${
          scrolled ? "bg-black/95 backdrop-blur-md" : "bg-gradient-to-b from-black/95 to-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-mono text-xs tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">
            COLLECTIVE
          </span>
          <span className="font-[family-name:var(--font-bebas)] text-5xl lg:text-6xl tracking-widest text-magenta flex items-center font-bold">
            S
            <img
              src="/csoul-logo.svg"
              alt="O"
              className="h-[0.95em] w-auto inline-block relative top-[0.05em] ml-0.5 mr-1.5"
              style={{ filter: 'invert(76%) sepia(69%) saturate(4619%) hue-rotate(144deg) brightness(101%) contrast(101%)' }}
            />
            UL
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Link
                href={link.href}
                className="relative font-mono text-sm tracking-[0.15em] py-2 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 text-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 clip-path-inset">
                  {link.label}
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-cyan"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            className="block w-7 h-0.5 bg-white origin-center"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="block w-7 h-0.5 bg-white"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            className="block w-7 h-0.5 bg-white origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-[family-name:var(--font-bebas)] text-5xl text-white hover:text-magenta transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
