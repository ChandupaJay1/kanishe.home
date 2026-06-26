import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { giftSets } from "../data/products";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";

export default function GiftSets({ onAddToCart }) {
  return (
    <section className="py-24 px-6 bg-sand-100/40">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-3">Curated For You</p>
          <h2 className="section-title mb-4">Gift as a Set</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-sand-300" />
            <div className="w-1 h-1 rounded-full bg-sand-400" />
            <div className="h-px w-12 bg-sand-300" />
          </div>
          <p className="font-sans text-sm text-dusty-400 mt-6 max-w-md mx-auto">
            Thoughtfully paired pieces for gifting or styling your space together.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
        >
          {giftSets.map((set) => (
            <motion.div
              key={set.id}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(90,60,30,0.10)" }}
              transition={{ duration: 0.25 }}
              className="bg-white/70 backdrop-blur-sm border border-sand-200 p-6 hover:border-mocha-200 transition-colors duration-300 group"
            >
              {/* Preview */}
              <div className="w-full aspect-video bg-gradient-to-br from-cream-200 to-sand-100 mb-5 flex items-center justify-center">
                <div className="text-center">
                  {set.items.map((item, i) => (
                    <p key={i} className="font-serif text-xs text-mocha-200 font-light">{item}</p>
                  ))}
                  <div className="mt-2 mx-auto w-8 h-px bg-sand-300" />
                </div>
              </div>

              <h3 className="font-serif text-base text-mocha-400 font-light leading-snug mb-1">
                {set.items.join(" + ")}
              </h3>
              <p className="font-sans text-xs text-dusty-300 mb-4">Gift Set</p>

              <div className="flex items-center justify-between">
                <span className="font-serif text-xl text-mocha-400">
                  LKR {set.price.toLocaleString()}
                </span>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => onAddToCart({ ...set, name: set.name, category: "Gift Set" })}
                  className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-mocha-300 border border-mocha-200 px-3 py-2 hover:bg-mocha-300 hover:text-cream-50 hover:border-mocha-300 transition-all duration-200"
                  aria-label={`Add ${set.name} to cart`}
                >
                  <ShoppingBag size={13} strokeWidth={1.5} />
                  Add
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
