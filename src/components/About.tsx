"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const bandMembers = [
  { name: "Ed Roland", role: "Lead Vocals, Guitar", image: "/band_images/ed.png" },
  { name: "Dean Roland", role: "Rhythm Guitar", image: "/band_images/dean.png" },
  { name: "Will Turpin", role: "Bass", image: "/band_images/will.png" },
  { name: "Jesse Triplett", role: "Lead Guitar", image: "/band_images/jesse.png" },
  { name: "Johnny Rabb", role: "Drums", image: "/band_images/johnny.png" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-gray-dark to-black"
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
          <span className="font-mono text-xs text-cyan tracking-[0.3em] block mb-4">07</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl lg:text-7xl tracking-wide">
            THE BAND
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-magenta to-transparent mx-auto mt-4" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-16 max-w-6xl mx-auto">
        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <p className="font-[family-name:var(--font-bebas)] text-2xl lg:text-4xl text-magenta leading-tight mb-6">
            &ldquo;We&apos;re just going to keep rolling. That&apos;s the plan.&rdquo;
          </p>

          {/* Intro paragraph - always visible */}
          <div className="text-gray-light text-base lg:text-lg leading-relaxed font-[family-name:var(--font-outfit)] space-y-4">
            <p>
              More than three decades in, Collective Soul isn&apos;t slowing down – they&apos;re accelerating. With over 15 million albums sold worldwide, six Gold or Platinum records, and seven #1 singles to their name, the Georgia-born band led by frontman and songwriter Ed Roland has cemented a legacy that few rock acts can match. And yet, in their 31st year, they&apos;re as prolific and road-hungry as ever.
            </p>
            <p>
              Since launching a major label career in 1994, Collective Soul cut through a noisy &apos;90s rock scene with stick-to-you-like-glue melodies, roof-shaking guitars, and a touch of Southern grit. Behind enduring singles like &ldquo;Shine,&rdquo; &ldquo;December&rdquo; and &ldquo;The World I Know,&rdquo; the band hit the ground running for what would not be a short-lived sprint, but a steady marathon of uncompromising – and always catchy – albums. As bassist Will Turpin has noted, the band is selling more tickets now than they did in the &apos;90s – proof that Collective Soul&apos;s music hasn&apos;t just endured, it&apos;s grown.
            </p>
          </div>

          {/* Expandable content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="text-gray-light text-base lg:text-lg leading-relaxed font-[family-name:var(--font-outfit)] space-y-4 mt-4">
                  <p>
                    The band&apos;s 2024 double LP HERE TO ETERNITY – their 12th studio album and most ambitious project to date – proved the point. A sprawling 20-track, 70-minute effort recorded at Elvis Presley&apos;s former Palm Springs estate, the album debuted at No. 14 on Billboard&apos;s Top Current Album chart. Ed Roland – alongside brother and co-founding member Dean Roland (guitar), childhood friend and bassist Will Turpin, guitarist Jesse Triplett and drummer Johnny Rabb – decamped for a month to the King&apos;s one-time California getaway to lay down tracks steeped in rock &apos;n&apos; roll history.
                  </p>
                  <p>
                    &ldquo;When I gave the album to management and radio promo,&rdquo; Ed Roland said, &ldquo;I was like, &lsquo;Put the needle on any song, I&apos;m that proud of it.&rsquo;&rdquo;
                  </p>
                  <p>
                    The sessions at the Elvis Presley Palm Springs Estate – believed to be the only home besides Graceland owned by Presley at the time of his death – left their mark on every member. &ldquo;The sticky DNA, with Elvis being there,&rdquo; Turpin said. &ldquo;All pink tiles. It&apos;s straight out of 1977. It was super cool just to be there and in the zone.&rdquo; Triplett put it another way: &ldquo;The vibe and energy of that place translated through the music. You almost don&apos;t realize until the end and listen to the rough mixes and you go &lsquo;oh shit … we did that.&rsquo;&rdquo; And Rabb added simply, &ldquo;The energy was natural and the flow was incredible. We were all just in the pocket.&rdquo;
                  </p>
                  <p>
                    The album features guest appearances from Paul McCartney&apos;s longtime guitarist Brian Ray, Sheryl Crow bandleader Peter Stroud, and Mickey Thomas of Jefferson Starship fame – the result of Ed Roland&apos;s talent for turning a casual Palm Springs sidewalk encounter into a recording session. &ldquo;I&apos;m gettin&apos; pretty sneaky in my old age,&rdquo; he said with a laugh.
                  </p>
                  <p>
                    Collective Soul spent 2024 tearing across North America on the 43-city &ldquo;Summer Camp with Trucks Tour&rdquo; alongside Hootie &amp; the Blowfish and Edwin McCain, playing premier venues from Fenway Park in Boston to Bridgestone Arena in Nashville. Then in 2025, they reunited with +LIVE+ for the first time in 17 years on the 30-date &ldquo;Summer Unity Tour,&rdquo; co-headlining amphitheaters coast-to-coast with Our Lady Peace and Greylin James Rue. Concert reviewers regularly singled out Collective Soul as the highlight of the evening, with the band mixing deep cuts and new material alongside the hits that packed the houses.
                  </p>
                  <p>
                    &ldquo;We&apos;ve never tried to adhere to any trends, for better or worse,&rdquo; Dean Roland reflected. &ldquo;We&apos;re just going to keep rolling and keep it rolling. That&apos;s the plan as of now.&rdquo;
                  </p>
                  <p>
                    The band&apos;s story got its definitive telling in July 2025 with the release of GIVE ME A WORD: THE COLLECTIVE SOUL STORY, a feature-length documentary directed by Joseph Rubinstein. Filmed at the Elvis estate during the HERE TO ETERNITY sessions and woven with archival footage spanning three decades, the film features appearances by Sammy Hagar and Dolly Parton – who recounts how her version of &ldquo;Shine&rdquo; won her a Grammy, while Ed Roland chuckles that the band has never been nominated. The documentary is available on Apple TV, Amazon, and Blu-ray/DVD.
                  </p>
                  <p>
                    Will Turpin, who took over his late father&apos;s Reel 2 Reel Studios in Georgia, has spoken movingly about the documentary&apos;s tribute to his dad, Bill Turpin, and the family roots that have always anchored the band. &ldquo;Find your allies, whether it&apos;s bandmates or people who like what you&apos;re doing,&rdquo; Dean Roland has advised. &ldquo;Just have your foundation and build off that.&rdquo;
                  </p>
                  <p>
                    Now in 2026, Collective Soul shows no signs of easing up. The band kicked off the year with a headlining U.S. tour launched in January and a three-night residency at The Venetian Theatre in Las Vegas. They&apos;re set to join Creed&apos;s &ldquo;Summer of &apos;99 and Beyond Cruise&rdquo; in April, with more dates being added throughout the year. And on Record Store Day – April 18, 2026 – the band drops TOUCH &amp; GO, their 13th studio album. A 10-song LP drawing inspiration from The Cars and New Wave, it marks a new musical chapter for a band that refuses to stand still.
                  </p>
                  <p>
                    Three decades and counting. As drummer Johnny Rabb put it on the Modern Drummer Podcast, the chemistry just works. And as the title of their last album suggests – here to eternity.
                  </p>
                  <div className="mt-8 pt-6 border-t border-gray/30">
                    <p className="font-mono text-[0.65rem] tracking-[0.1em] text-gray-light/50 leading-relaxed">
                      SOURCES: Quotes and information sourced from{" "}
                      <a href="https://www.billboard.com/music/rock/collective-soul-live-2025-us-summer-unity-tour-dates-1235923460/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan transition-colors">Billboard</a>,{" "}
                      <a href="https://www.galleryspacemedia.com/interviews/collective-souls-dean-roland-shares-insights-on-music-origins-new-album-and-future-plans" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan transition-colors">Gallery Space Media</a>,{" "}
                      <a href="https://www.moderndrummer.com/2025/04/johnny-rabb-collective-soul-modern-drummer-podcast-with-david-frangioni-35/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan transition-colors">Modern Drummer</a>,{" "}
                      <a href="https://www.notreble.com/buzz/2025/06/05/groove-episode-126-will-turpin-collective-soul/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan transition-colors">No Treble</a>,{" "}
                      <a href="https://rockandbluesmuse.com/2025/12/09/collective-soul-announces-u-s-headline-tour-2026/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan transition-colors">Rock and Blues Muse</a>,{" "}
                      <a href="https://www.songwriteruniverse.com/ed-roland-collective-soul-songs-shine-here-to-eternity/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan transition-colors">Songwriter Universe</a>,{" "}
                      and the documentary{" "}
                      <a href="https://www.givemeawordfilm.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan transition-colors italic">Give Me a Word: The Collective Soul Story</a>{" "}
                      (2025).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Read More / Read Less Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm tracking-[0.15em] text-cyan hover:text-magenta transition-colors group mx-auto"
            whileHover={{ scale: 1.05 }}
          >
            <span>{isExpanded ? "READ LESS" : "READ MORE"}</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* Band Members */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bandMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group text-center"
            >
              {/* Member Image */}
              <div className="relative mb-4 overflow-hidden">
                <motion.div
                  className="aspect-[3/4] bg-gradient-to-br from-gray to-gray-dark relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-magenta/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  />

                  {/* Decorative lines */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-magenta origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Member Info */}
              <h4 className="font-[family-name:var(--font-bebas)] text-xl mb-1 group-hover:text-magenta transition-colors">
                {member.name}
              </h4>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] text-gray-light">
                {member.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
