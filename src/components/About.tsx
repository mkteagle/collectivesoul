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
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.1em]">05</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl lg:text-6xl tracking-wide">
            THE BAND
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray to-transparent" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-16 max-w-6xl">
        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mb-16"
        >
          <p className="font-[family-name:var(--font-bebas)] text-2xl lg:text-4xl text-magenta leading-tight mb-6">
            &ldquo;It&apos;s an honor and privilege.&rdquo;
          </p>

          {/* Intro paragraph - always visible */}
          <div className="text-gray-light text-base lg:text-lg leading-relaxed font-[family-name:var(--font-outfit)] space-y-4">
            <p>
              Ed Roland can describe 30 years in Collective Soul with two words. &ldquo;It&apos;s an honor and privilege,&rdquo; said the frontman and songwriter behind the Georgia-born band known for a bedrock of time-tested hits. &ldquo;It&apos;s that simple. Just being able to do what you love, it&apos;s an honor and a privilege.&rdquo;
            </p>
            <p>
              Since launching a major label career in 1994, Collective Soul has charted a path that most rock bands dream of, but only few achieve. They cut through a noisy 1990s rock scene with a knack for stick-to-you-like-glue melodies, roof-shaking guitars, and a touch of Southern grit. Behind enduring singles like &ldquo;Shine,&rdquo; &ldquo;December&rdquo; and &ldquo;The World I Know,&rdquo; the band hit the ground running for what would not be a short-lived sprint, but a steady marathon of uncompromising – and always catchy – albums.
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
                    And in the same year the band celebrates three decades of music making, Collective Soul returns with what may be its most ambitious project to-date: HERE TO ETERNITY, a double LP cut in the California home once owned by Elvis Presley. With sharp, polished rock riffs and Roland&apos;s signature wise-to-the-world storytelling, HERE TO ETERNITY plays like a full-throttle Collective Soul album from the moment it begins spilling out of stereo speakers.
                  </p>
                  <p>
                    &ldquo;When I gave the album to management and radio promo,&rdquo; he said, &ldquo;I was like, &lsquo;Put the needle on any song, I&apos;m that proud of it.&rsquo;&rdquo;
                  </p>
                  <p>
                    Roland – alongside brother and co-founding member Dean Roland (guitar), childhood friend and bassist Will Turpin, guitarist Jesse Triplett and drummer Johnny Rabb – decamped for a month to Palm Springs, California, to record virtually all of HERE TO ETERNITY inside a house once owned by Elvis and Priscilla Presley. Called the &ldquo;Elvis Presley Palm Springs Estate,&rdquo; it&apos;s believed to be the only home besides the famed Memphis estate owned by Presley at the time of his death.
                  </p>
                  <p>
                    Stepping inside the King&apos;s one-time California getaway, his influence seeped into the album-making process. E. Roland and album co-producer Shawn Grove slept in the home for the duration of the sessions, which overlapped with the death of Presley&apos;s daughter Lisa Marie in early 2023.
                  </p>
                  <p>
                    &ldquo;The sticky DNA, with Elvis being there,&rdquo; Turpin said, &ldquo;You can just tell it was his designs. All pink tiles. It&apos;s straight out of 1977. It was super cool just to be there and in the zone.&rdquo;
                  </p>
                  <p>
                    Or, in Triplett&apos;s words: &ldquo;It&apos;s not something you can put your finger on specifically, but the vibe and energy of that place translated through the music. You almost don&apos;t realize until the end and listen to the rough mixes and you go &lsquo;oh shit … we did that.&rsquo;&rdquo;
                  </p>
                  <p>
                    Rabb added, &ldquo;The energy was natural and the flow was incredible. We were all just in the pocket and the chemistry works so well.&rdquo;
                  </p>
                  <p>
                    Listeners hear the results on HERE TO ETERNITY, a thrilling no-skips effort from start-to-finish. The album kicks into gear with songs the blues-tinged &ldquo;Bluer Than Blue&rdquo; and jangly roots rocker &ldquo;Not The Same&rdquo; before later cruising into the band&apos;s long-running appreciation for Elton John and The Beatles with &ldquo;Sister and Mary.&rdquo;
                  </p>
                  <p>
                    They incorporate a Presley-like shuffle beat on throwback rockabilly jam &ldquo;Matter of Fact,&rdquo; adopt stripped-down balladeering on tender-to-the-touch number &ldquo;Letter From E,&rdquo; and croon a piano-backed tale of love on &ldquo;Be The One,&rdquo; which Ed Roland recorded solo in Elvis&apos; former bedroom. Plus, one of the standout songs on HERE TO ETERNITY wasn&apos;t cut in Palm Springs, but in another room where Elvis once walked – the famed Ryman Auditorium in Nashville, Tennessee. Ed Roland tracked a live rendition of &ldquo;Bob Dylan (Where Are You Today)&rdquo; during a sold-out tour stop inside the hallowed Ryman halls.
                  </p>
                  <p>
                    But no song grabs on the first listen quite like &ldquo;Mother&apos;s Love,&rdquo; the lead single and opening number debuted on the road last year. Featuring longtime Paul McCartney guitarist Brian Ray on slide guitar, &ldquo;Mother&apos;s Love&rdquo; blasts off the turntable with a foot-stompin&apos;, gnarled riff before gliding into a chorus layered by high-flying harmonies.
                  </p>
                  <p>
                    On &ldquo;Mother&apos;s Love,&rdquo; Ed Roland sings: &ldquo;Guess we&apos;re all misunderstood/To what we can and what we should/Still I find above/All my strength from Mother&apos;s Love.&rdquo;
                  </p>
                  <p>
                    Alongside Ray, who lives in Palm Springs, guests on the album include longtime Sheryl Crow bandleader Peter Stroud and Mickey Thomas of Jefferson Starship fame.
                  </p>
                  <p>
                    &ldquo;I happened to be walkin&apos; down the street and I had met Brian Ray a couple of times,&rdquo; Ed Roland said. &ldquo;I saw him and was like, &lsquo;Brian, hey man. Why don&apos;t you come over and break bread? We&apos;re up at Elvis&apos; house.&rsquo;&rdquo;
                  </p>
                  <p>
                    The invite for a bite of grub turned into a session, of course. With a laugh, Ed Roland added, &ldquo;I&apos;m gettin&apos; pretty sneaky in my old age.&rdquo;
                  </p>
                  <p>
                    And the album closes with &ldquo;Over and Out,&rdquo; an ominous folk-rock tune about life moving on – no matter if you&apos;re ready or not.
                  </p>
                  <p>
                    &ldquo;Last year, my niece was going over to college…and I don&apos;t understand that yet, because my son&apos;s 14,&rdquo; Ed Roland said. &ldquo;The song&apos;s about letting your children go and letting them start their adulthood. I tried to feel what my sister and brother-in-law were feeling, which I&apos;m about to feel.&rdquo;
                  </p>
                  <p>
                    This summer, the band takes HERE TO ETERNITY on the road with Hootie & the Blowfish and Edwin McCain for the &ldquo;Summer Camp with Trucks Tour.&rdquo; A coast-to-coast run inside some of North America&apos;s premier venues, stops including Fenway Park in Boston, Bridgestone Arena in Nashville, the Honda Center in Anaheim, California and Pine Knob Music Theatre in Detroit.
                  </p>
                  <p>
                    With 20 new songs, how does the band decide which to play live? You&apos;ll have to catch a show to find out.
                  </p>
                  <p>
                    &ldquo;It&apos;s tricky,&rdquo; Dean Roland said. &ldquo;We know we wanna play the songs people came there to see, but it&apos;s still fun. We&apos;re gettin&apos; up there, doin&apos; our thing.&rdquo;
                  </p>
                  <p>
                    And fans can bet on Collective Soul taking songs from HERE TO ETERNITY on the road for years to come. As the album title suggests, three decades is just the start.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Read More / Read Less Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm tracking-[0.15em] text-cyan hover:text-magenta transition-colors group"
            whileHover={{ x: 5 }}
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
