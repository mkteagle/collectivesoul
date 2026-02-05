"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/collectivesoul/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Twitter/X",
    url: "https://twitter.com/collectivesoul",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/collectivesoul",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/user/collectivesoultv",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/4e5V1Q2dKCzbLVMQ8qbTn6",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/artist/collective-soul/146191",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.364-2.172-1.158-.39-.804-.196-1.784.474-2.372.396-.347.87-.552 1.378-.674.417-.1.838-.172 1.26-.248.27-.05.536-.112.787-.222.28-.123.418-.336.44-.634.01-.12.013-.24.013-.36V8.373c0-.147-.018-.292-.072-.432-.058-.15-.164-.23-.323-.217-.18.015-.357.043-.532.08l-4.177.86c-.022.004-.043.013-.065.02-.21.057-.378.187-.44.401-.034.119-.053.243-.053.366-.003 2.26-.002 4.52-.003 6.78 0 .44-.05.878-.238 1.284-.28.61-.752 1.004-1.39 1.19-.37.11-.75.165-1.135.18-.947.037-1.776-.36-2.156-1.163-.378-.796-.186-1.768.468-2.357.4-.36.887-.567 1.404-.69.438-.104.878-.178 1.318-.267.24-.05.48-.107.705-.2.32-.132.463-.382.477-.727.005-.107.006-.214.006-.32V6.628c0-.32.063-.626.22-.906.163-.29.4-.495.69-.64.195-.097.4-.16.61-.203.27-.054.54-.104.81-.156l3.757-.772c.4-.082.803-.158 1.207-.22.272-.04.547-.034.816.037.418.11.716.377.87.78.073.188.1.384.1.584v4.002z" />
      </svg>
    ),
  },
];

export default function Connect() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1000);
  };

  return (
    <section
      id="connect"
      className="relative min-h-[80vh] flex items-center justify-center py-24 lg:py-32 overflow-hidden"
      ref={ref}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%] bg-[radial-gradient(ellipse_at_center,var(--color-magenta)_0%,transparent_60%)] opacity-15"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-xl px-6"
      >
        {/* Title */}
        <motion.h2
          className="font-[family-name:var(--font-bebas)] text-5xl lg:text-7xl leading-[0.9] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          JOIN THE
          <br />
          <span className="text-magenta">COLLECTIVE</span>
        </motion.h2>

        <motion.p
          className="text-gray-light text-lg mb-10 font-[family-name:var(--font-outfit)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          Get exclusive updates, presale access, and behind-the-scenes content.
        </motion.p>

        {/* Newsletter Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          {!isSubmitted ? (
            <div className="flex flex-col sm:flex-row bg-gray-dark border-2 border-gray focus-within:border-magenta transition-colors" suppressHydrationWarning>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                required
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                className="flex-1 px-6 py-4 bg-transparent font-mono text-sm tracking-[0.1em] text-white placeholder:text-gray-light outline-none"
                suppressHydrationWarning
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-magenta font-mono text-sm tracking-[0.1em] text-white hover:bg-magenta-light transition-colors disabled:opacity-50"
                suppressHydrationWarning
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ◌
                  </motion.span>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 px-6 bg-cyan/20 border-2 border-cyan text-cyan font-mono text-sm tracking-[0.1em]"
            >
              WELCOME TO THE COLLECTIVE ◆ CHECK YOUR INBOX
            </motion.div>
          )}
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center border-2 border-gray rounded-full hover:border-cyan hover:text-cyan transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
