"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-dialog"));
  };

  return (
    <footer className="border-t border-gray py-12 px-6 lg:px-16">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-bebas)] text-xl tracking-wider flex items-center"
        >
          COLLECTIVE S
          <img
            src="/csoul-logo.svg"
            alt="O"
            className="h-[0.9em] w-auto inline-block mx-0.5"
            style={{ filter: 'invert(76%) sepia(69%) saturate(4619%) hue-rotate(144deg) brightness(101%) contrast(101%)' }}
          />
          UL
        </motion.div>

        {/* Links */}
        <div className="flex gap-8">
          <button
            onClick={openContact}
            className="font-mono text-xs tracking-[0.1em] text-gray-light hover:text-cyan transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Copyright */}
        <p className="font-mono text-[0.65rem] tracking-[0.1em] text-gray-light">
          © 2026 Collective Soul. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
