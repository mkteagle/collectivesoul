"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STORE_URL = "https://stores.portmerch.com/collectivesoul/";

const products = [
  {
    name: "Limited Edition Here To Eternity 2LP",
    price: "$100.00",
    image: "https://stores.portmerch.com/media/catalog/product/cache/29/small_image/540x540/9df78eab33525d08d6e5fb8d27136e95/e/t/eternity-lp.jpg",
    tag: "LIMITED",
  },
  {
    name: "Here To Eternity CD",
    price: "$18.00",
    image: "https://stores.portmerch.com/media/catalog/product/cache/29/small_image/540x540/9df78eab33525d08d6e5fb8d27136e95/e/t/eternity-cd.jpg",
    tag: "NEW",
  },
  {
    name: "Album Swirl T, Black",
    price: "$35.00",
    image: "https://stores.portmerch.com/media/catalog/product/cache/29/small_image/540x540/9df78eab33525d08d6e5fb8d27136e95/a/l/album-swirl-t.jpg",
    tag: null,
  },
  {
    name: "Give Me A Word DVD",
    price: "$24.98",
    image: "https://stores.portmerch.com/media/catalog/product/cache/29/small_image/540x540/9df78eab33525d08d6e5fb8d27136e95/g/i/give-me-a-word-dvd-front.jpg",
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
            <motion.a
              key={product.name}
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -10 }}
              className="group bg-gray-dark cursor-pointer block"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {product.tag && (
                  <span className="absolute top-3 left-3 font-mono text-[0.6rem] tracking-[0.15em] px-2 py-1 bg-cyan text-black">
                    {product.tag}
                  </span>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-magenta/0 group-hover:bg-magenta/20 transition-colors flex items-center justify-center">
                  <span className="font-mono text-xs tracking-[0.15em] px-4 py-2 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-[family-name:var(--font-outfit)] text-sm font-semibold mb-1 group-hover:text-magenta transition-colors">
                  {product.name}
                </h4>
                <p className="font-mono text-sm text-magenta">{product.price}</p>
              </div>
            </motion.a>
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
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
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

