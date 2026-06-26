import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";

const collections = [
  { label: "Vases & Trays",     desc: "Sculptural forms for modern spaces",  to: "/shop",          emoji: "🏺", bg: "from-cream-200 to-sand-100" },
  { label: "Gift Sets",         desc: "Curated pairs & trios",               to: "/gift-sets",     emoji: "🎁", bg: "from-sand-100 to-cream-200" },
  { label: "Blessing Kits",     desc: "For sacred spaces & gifting",         to: "/blessing-kits", emoji: "🕊️", bg: "from-cream-200 to-sand-200" },
  { label: "Incense & Spiritual",desc: "Serene atmosphere pieces",           to: "/shop",          emoji: "🌿", bg: "from-sand-200 to-cream-200" },
];

export default function CollectionsStrip() {
  return (
    <section className="py-16 px-6 bg-cream-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-2">Explore</p>
          <h2 className="font-serif text-3xl text-mocha-400 font-light">Collections</h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {collections.map((col) => (
            <motion.div key={col.label} variants={fadeUp}>
              <Link
                to={col.to}
                className={`group bg-gradient-to-br ${col.bg} border border-sand-200 hover:border-mocha-200 p-6 flex flex-col items-center text-center gap-3 transition-colors duration-300 hover:shadow-md block`}
              >
                <motion.span
                  className="text-3xl"
                  whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {col.emoji}
                </motion.span>
                <h3 className="font-serif text-base text-mocha-400 font-light group-hover:text-mocha-500 transition-colors">
                  {col.label}
                </h3>
                <p className="font-sans text-xs text-dusty-400">{col.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
