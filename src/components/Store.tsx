"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    name: "Touch and Go - Magenta Vinyl",
    price: "$34.99",
    type: "vinyl",
    tag: "LIMITED",
  },
  {
    name: "2026 Tour Tee - Black",
    price: "$35.00",
    type: "tee",
    tag: null,
  },
  {
    name: "Touch and Go Hoodie",
    price: "$65.00",
    type: "hoodie",
    tag: "NEW",
  },
  {
    name: "Limited Edition Poster",
    price: "$25.00",
    type: "poster",
    tag: null,
  },
];

export default function Store() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="store" className="relative py-24 lg:py-32 bg-black" ref={ref}>
      {/* Section Header */}
      <div className="px-6 lg:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <span className="font-mono text-xs text-cyan tracking-[0.1em]">03</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl lg:text-6xl tracking-wide">
            STORE
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray to-transparent" />
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl">
          {products.map((product, i) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -10 }}
              className="group bg-gray-dark cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <ProductPlaceholder type={product.type} />

                {product.tag && (
                  <span className="absolute top-3 left-3 font-mono text-[0.6rem] tracking-[0.15em] px-2 py-1 bg-cyan text-black">
                    {product.tag}
                  </span>
                )}

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-magenta/0 group-hover:bg-magenta/20 transition-colors flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="font-mono text-xs tracking-[0.15em] px-4 py-2 bg-white text-black"
                  >
                    VIEW
                  </motion.span>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-[family-name:var(--font-outfit)] text-sm font-semibold mb-1 group-hover:text-magenta transition-colors">
                  {product.name}
                </h4>
                <p className="font-mono text-sm text-magenta">{product.price}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Shop All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 lg:px-16 mt-10 text-center lg:text-left"
      >
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.1em] px-6 py-3 bg-magenta text-white hover:bg-magenta-light transition-colors"
        >
          SHOP ALL
          <span>→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}

function ProductPlaceholder({ type }: { type: string }) {
  switch (type) {
    case "vinyl":
      return (
        <div className="w-full h-full bg-gradient-to-br from-magenta to-magenta-dark flex items-center justify-center">
          <motion.div
            className="w-[70%] h-[70%] rounded-full"
            style={{
              background: `radial-gradient(circle at center,
                var(--color-magenta-light) 0%,
                var(--color-magenta-light) 20%,
                var(--color-gray-dark) 20%,
                var(--color-gray-dark) 21%,
                var(--color-magenta-light) 21%)`,
            }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>
      );
    case "tee":
      return (
        <div className="w-full h-full bg-gray flex items-center justify-center">
          <span className="font-[family-name:var(--font-bebas)] text-4xl">CS</span>
        </div>
      );
    case "hoodie":
      return (
        <div className="w-full h-full bg-black border border-gray flex items-center justify-center">
          <span className="font-[family-name:var(--font-bebas)] text-2xl text-magenta">SOUL</span>
        </div>
      );
    case "poster":
      return (
        <div className="w-full h-full bg-gradient-to-b from-magenta to-cyan flex items-center justify-center">
          <div className="w-[60%] h-[80%] border-[3px] border-white" />
        </div>
      );
    default:
      return <div className="w-full h-full bg-gray" />;
  }
}
