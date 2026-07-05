import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts, getCategories } from "../utils/storage";
import ProductCard from "./ProductCard";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";

const ITEMS_PER_PAGE = 8;

export default function Shop({ onAddToCart, onViewProduct }) {
  const products = getProducts();
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [activeCategory, searchQuery]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-3">Handcrafted Gypsum</p>
        <h2 className="section-title mb-4">The Collection</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-sand-300" />
          <div className="w-1 h-1 rounded-full bg-sand-400" />
          <div className="h-px w-12 bg-sand-300" />
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        className="max-w-sm mx-auto mb-8"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <input
          type="text"
          placeholder="Search pieces..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border border-sand-200 px-4 py-2.5 font-sans text-sm text-mocha-400 placeholder-dusty-300 focus:outline-none focus:border-mocha-200 transition-colors"
          aria-label="Search products"
        />
      </motion.div>

      {/* Category filters */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-12"
        variants={staggerContainer(0.04)}
        initial="hidden"
        animate="show"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            variants={fadeIn}
            whileTap={{ scale: 0.93 }}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200 ${
              activeCategory === cat
                ? "bg-mocha-300 text-cream-50"
                : "border border-sand-200 text-dusty-400 hover:border-mocha-200 hover:text-mocha-300"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <p className="font-serif text-2xl text-mocha-200 font-light">No pieces found.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-4 font-sans text-xs tracking-widest uppercase text-mocha-300 underline underline-offset-4"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory + searchQuery + page}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="show"
          >
            {paginated.map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="h-full">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewProduct={onViewProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex items-center justify-center gap-3 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-sand-200 text-dusty-400 font-sans text-xs tracking-widest uppercase hover:border-mocha-200 hover:text-mocha-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 font-sans text-sm transition-all ${
                p === page
                  ? "bg-mocha-300 text-cream-50"
                  : "border border-sand-200 text-dusty-400 hover:border-mocha-200 hover:text-mocha-300"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-sand-200 text-dusty-400 font-sans text-xs tracking-widest uppercase hover:border-mocha-200 hover:text-mocha-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </motion.div>
      )}
    </section>
  );
}
