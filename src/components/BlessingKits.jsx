import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { blessingKits } from "../data/products";
import { fadeUp, fadeLeft, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";

const kitDescriptions = {
  "Serenity Set": "Find stillness. A gentle collection for your sacred corner.",
  "Grace Set":    "Soft and spiritual — designed to bring grace to your space.",
  "Divine Set":   "A full sacred curation for the devoted heart.",
  "Harmony Set":  "Balance and calm, beautifully composed.",
  "Aura Set":     "Cleanse your space with mindful, curated décor.",
  "Sacred Set":   "For the sacred spaces that deserve the finest.",
  "Faith Set":    "A heartfelt collection for those who believe in beauty.",
};

export default function BlessingKits({ onAddToCart }) {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-3">Sacred Collections</p>
        <h2 className="section-title mb-4">Blessing Kits</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-sand-300" />
          <div className="w-1 h-1 rounded-full bg-sand-400" />
          <div className="h-px w-12 bg-sand-300" />
        </div>
        <p className="font-sans text-sm text-dusty-400 mt-6 max-w-md mx-auto">
          Curated sets crafted with intention — for gifting, prayer spaces, and sacred corners.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
      >
        {blessingKits.map((kit, index) => (
          <motion.div
            key={kit.id}
            variants={fadeUp}
            whileHover={{ y: -5, boxShadow: "0 14px 36px rgba(90,60,30,0.10)" }}
            transition={{ duration: 0.25 }}
            className="relative bg-gradient-to-br from-cream-100 to-sand-100 border border-sand-200 p-7 hover:border-mocha-200 transition-colors duration-300 group overflow-hidden"
          >
            {/* Background number */}
            <motion.span
              className="absolute top-4 right-5 font-serif text-6xl text-sand-200/60 font-light select-none"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
              viewport={viewportOnce}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>

            <div className="relative z-10">
              <h3 className="font-serif text-xl text-mocha-400 font-light mb-2">{kit.name}</h3>
              <p className="font-sans text-xs text-dusty-400 leading-relaxed mb-6">
                {kitDescriptions[kit.name] || "A beautiful blessing kit for your home."}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-mocha-400">
                  LKR {kit.price.toLocaleString()}
                </span>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => onAddToCart({ ...kit, category: "Blessing Kit" })}
                  className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-mocha-300 border border-mocha-200 px-3 py-2 hover:bg-mocha-300 hover:text-cream-50 hover:border-mocha-300 transition-all duration-200"
                  aria-label={`Add ${kit.name} to cart`}
                >
                  <ShoppingBag size={13} strokeWidth={1.5} />
                  Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
