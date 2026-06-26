import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";

const WA_NUMBER = "94XXXXXXXXX"; // ← oya WhatsApp number

const tagColors = {
  Bestseller: "bg-mocha-200 text-cream-50",
  Popular:    "bg-sage-400 text-cream-50",
  New:        "bg-dusty-300 text-cream-50",
  Statement:  "bg-sand-400 text-cream-50",
  Unique:     "bg-mocha-300 text-cream-50",
};

export default function ProductModal({ product, onClose, onAddToCart }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hello KANISHE.! 🌿\n\nI'd like to order:\n\n• ${product.name}\n  ${product.dimensions}\n  LKR ${product.price.toLocaleString()}\n\nPlease confirm availability. Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Animated overlay */}
      <motion.div
        className="fixed inset-0 bg-mocha-500/50 backdrop-blur-sm z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={product.name}>
        <motion.div
          className="bg-cream-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit={{   opacity: 0, scale: 0.94,  y: 16 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
        >
          {/* ── Image panel ── */}
          <div className="relative w-full md:w-2/5 aspect-square md:aspect-auto bg-gradient-to-br from-cream-200 to-sand-100 flex-shrink-0 flex items-center justify-center min-h-[240px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-32 h-32 rounded-full bg-sand-200/50 blur-2xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <div className="absolute w-20 h-20 rounded-full bg-cream-300/70 blur-xl" />
            </div>
            <motion.span
              className="relative font-serif text-7xl text-mocha-200/40 font-light select-none"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {product.name.charAt(0)}
            </motion.span>

            {product.tag && (
              <span className={`absolute top-4 left-4 text-xs font-sans tracking-widest uppercase px-2 py-1 ${tagColors[product.tag] || "bg-mocha-200 text-cream-50"}`}>
                {product.tag}
              </span>
            )}

            <button onClick={onClose} className="absolute top-4 right-4 md:hidden w-8 h-8 bg-cream-100/80 flex items-center justify-center text-mocha-400 hover:bg-cream-200 transition-colors" aria-label="Close">
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── Details panel ── */}
          <div className="flex-1 p-6 md:p-8 flex flex-col">
            <div className="hidden md:flex justify-end mb-2">
              <button onClick={onClose} className="text-mocha-300 hover:text-mocha-500 transition-colors" aria-label="Close">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Staggered content reveal */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="flex flex-col flex-1"
            >
              {[
                <p key="cat" className="font-sans text-xs tracking-[0.3em] uppercase text-mocha-200 mb-2">{product.category}</p>,
                <h2 key="name" className="font-serif text-2xl md:text-3xl text-mocha-400 font-light leading-snug mb-4">{product.name}</h2>,
                <div key="div" className="flex items-center gap-3 mb-5"><div className="h-px w-8 bg-sand-300" /><div className="w-1 h-1 rounded-full bg-sand-400" /></div>,
                <p key="desc" className="font-sans text-sm text-dusty-400 leading-relaxed mb-5">{product.description}</p>,
                <div key="dims" className="bg-cream-100 border border-sand-100 px-4 py-3 mb-6">
                  <p className="font-sans text-xs tracking-widest uppercase text-mocha-200 mb-1">Dimensions</p>
                  <p className="font-sans text-sm text-mocha-400">{product.dimensions}</p>
                </div>,
                <div key="finish" className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-xs tracking-widest uppercase text-dusty-300">Finish</span>
                  <span className="font-sans text-xs text-mocha-300">{product.color}</span>
                </div>,
                <p key="note" className="font-sans text-xs text-dusty-300 italic leading-relaxed mb-6">
                  Each piece is individually handcrafted — natural variations in texture and finish are part of its beauty.
                </p>,
              ].map((child, i) => (
                <motion.div key={i} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
                  {child}
                </motion.div>
              ))}

              {/* Price + buttons */}
              <motion.div
                className="mt-auto pt-4 border-t border-sand-100"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              >
                <p className="font-serif text-3xl text-mocha-400 mb-5">
                  LKR {product.price.toLocaleString()}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleBuyNow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 font-sans text-xs tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Buy Now
                  </motion.button>
                  <motion.button
                    onClick={() => { onAddToCart(product); onClose(); }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 flex items-center justify-center gap-2 btn-outline"
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    Add to Bag
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
