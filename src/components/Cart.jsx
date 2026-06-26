import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart({ items, onClose, onUpdateQty, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const packagingFee = total < 3000 && items.length > 0 ? 200 : 0;

  const WA_NUMBER = "94XXXXXXXXX"; // ← oya WhatsApp number danna

  const handleCheckout = () => {
    if (items.length === 0) return;

    const itemLines = items.map(
      (item) => `  • ${item.name} x${item.qty} — LKR ${(item.price * item.qty).toLocaleString()}`
    );

    const summaryLines = [
      `Subtotal: LKR ${total.toLocaleString()}`,
    ];
    if (packagingFee > 0) summaryLines.push(`Packaging Fee: LKR ${packagingFee}`);
    summaryLines.push(`*Total: LKR ${(total + packagingFee).toLocaleString()}*`);

    const message =
      `Hello KANISHE.! 🌿\n\nI'd like to place an order:\n\n` +
      itemLines.join("\n") +
      `\n\n` +
      summaryLines.join("\n") +
      `\n\nPlease confirm availability and production time. Thank you!`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-mocha-500/20 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-cream-50 z-50 shadow-2xl flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-mocha-400" />
            <h2 className="font-serif text-xl text-mocha-400 font-light">Your Bag</h2>
            {items.length > 0 && (
              <span className="font-sans text-xs text-dusty-400">({items.length} item{items.length > 1 ? "s" : ""})</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-mocha-300 hover:text-mocha-500 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} strokeWidth={1} className="text-sand-300" />
              <p className="font-serif text-xl text-mocha-200 font-light">Your bag is empty</p>
              <p className="font-sans text-xs text-dusty-300">Add some beautiful pieces to get started.</p>
              <button onClick={onClose} className="btn-outline mt-2">
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-sand-100 last:border-0">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gradient-to-br from-cream-200 to-sand-100 flex-shrink-0 flex items-center justify-center">
                    <span className="font-serif text-xl text-mocha-200/50">
                      {item.name.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-mocha-400 leading-snug">{item.name}</h4>
                    <p className="font-sans text-xs text-dusty-300 mt-0.5">{item.category}</p>
                    <p className="font-serif text-sm text-mocha-400 mt-1">
                      LKR {(item.price * item.qty).toLocaleString()}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-sand-200 text-mocha-300 hover:border-mocha-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-sans text-xs w-4 text-center text-mocha-400">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-sand-200 text-mocha-300 hover:border-mocha-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-dusty-300 hover:text-mocha-400 transition-colors flex-shrink-0 self-start mt-0.5"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-sand-200 bg-cream-100">
            <div className="flex justify-between font-sans text-xs text-dusty-400 mb-1">
              <span className="tracking-wide">Subtotal</span>
              <span>LKR {total.toLocaleString()}</span>
            </div>
            {packagingFee > 0 && (
              <div className="flex justify-between font-sans text-xs text-dusty-400 mb-1">
                <span className="tracking-wide">Packaging Fee</span>
                <span>LKR {packagingFee}</span>
              </div>
            )}
            {packagingFee > 0 && (
              <p className="font-sans text-xs text-dusty-300 mb-3">
                * Free packaging on orders above LKR 3,000
              </p>
            )}
            <div className="flex justify-between font-serif text-lg text-mocha-400 mb-5 pt-2 border-t border-sand-200">
              <span>Total</span>
              <span>LKR {(total + packagingFee).toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 font-sans text-xs tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Checkout via WhatsApp
            </button>

            <p className="font-sans text-xs text-dusty-300 text-center mt-3">
              Made to order · ~2 weeks production time
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
}
