import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";

const featuredIds = [1, 2, 15, 23, 17, 4, 9, 24];
const featured = featuredIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);

export default function FeaturedProducts({ onAddToCart, onViewProduct }) {
  return (
    <section className="py-20 px-6 bg-cream-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-2">Handpicked</p>
            <h2 className="font-serif text-3xl md:text-4xl text-mocha-400 font-light">Featured Pieces</h2>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <Link
              to="/shop"
              className="font-sans text-xs tracking-widest uppercase text-mocha-300 border-b border-mocha-200 pb-0.5 hover:text-mocha-500 hover:border-mocha-400 transition-colors whitespace-nowrap"
            >
              View All →
            </Link>
          </motion.div>
        </div>

        {/* Grid with stagger */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {featured.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
