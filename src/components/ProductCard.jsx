import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const tagColors = {
  Bestseller: "bg-mocha-200 text-cream-50",
  Popular:    "bg-sage-400 text-cream-50",
  New:        "bg-dusty-300 text-cream-50",
  Statement:  "bg-sand-400 text-cream-50",
  Unique:     "bg-mocha-300 text-cream-50",
};

export default function ProductCard({ product, onAddToCart, onViewProduct }) {
  return (
    <motion.div
      className="product-card group flex flex-col cursor-pointer"
      whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(90,60,30,0.12)" }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div
        className="relative aspect-square bg-gradient-to-br from-cream-200 to-sand-100 overflow-hidden"
        onClick={() => onViewProduct(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onViewProduct(product)}
        aria-label={`View ${product.name}`}
      >
        {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-sand-200/60 blur-xl" />
              <div className="absolute w-12 h-12 rounded-full bg-cream-300/80 blur-md" />
              <span className="relative font-serif text-4xl text-mocha-200/50 font-light select-none">
                {product.name.charAt(0)}
              </span>
            </div>
          )}

        {product.tag && (
          <span className={`absolute top-3 left-3 text-xs font-sans tracking-widest uppercase px-2 py-0.5 z-10 ${tagColors[product.tag] || "bg-mocha-200 text-cream-50"}`}>
            {product.tag}
          </span>
        )}

        {/* Quick-add slides up on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-0 left-0 right-0 bg-mocha-400/90 text-cream-50 py-2.5 font-sans text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={14} strokeWidth={1.5} />
          Add to Bag
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="font-sans text-xs tracking-widest uppercase text-dusty-400">{product.category}</p>
        <h3
          className="font-serif text-lg text-mocha-400 font-light leading-snug hover:text-mocha-300 transition-colors cursor-pointer"
          onClick={() => onViewProduct(product)}
        >
          {product.name}
        </h3>
        <p className="font-sans text-xs text-dusty-400 leading-relaxed flex-1">{product.description}</p>
        <p className="font-sans text-xs text-dusty-300 mt-1">{product.dimensions}</p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-sand-100">
          <span className="font-serif text-lg text-mocha-400">
            LKR {product.price.toLocaleString()}
          </span>
          <motion.button
            onClick={() => onAddToCart(product)}
            whileTap={{ scale: 0.85 }}
            className="w-8 h-8 flex items-center justify-center border border-mocha-200 text-mocha-300 hover:bg-mocha-300 hover:text-cream-50 hover:border-mocha-300 transition-all duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
