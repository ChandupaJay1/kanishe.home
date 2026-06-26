import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { fadeUp, fadeIn, scaleIn, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";

import careTipsImg from "../assets/care_tips.jpeg";
import orderEnImg  from "../assets/order_english.jpeg";
import orderSiImg  from "../assets/order_sinhala.jpeg";

const cards = [
  { id: "care",     title: "Care Tips",               subtitle: "Keeping your pieces beautiful",             img: careTipsImg, badge: "Care Guide", badgeColor: "bg-sage-400 text-cream-50" },
  { id: "order_en", title: "How to Order",             subtitle: "Simple steps to place your order",          img: orderEnImg,  badge: "English",    badgeColor: "bg-mocha-200 text-cream-50" },
  { id: "order_si", title: "ඇණවුම් කරන ආකාරය",        subtitle: "සිංහලෙන් ඇණවුම් කිරීමේ මාර්ගෝපදේශය",    img: orderSiImg,  badge: "සිංහල",     badgeColor: "bg-sand-400 text-cream-50" },
];

export default function InfoSection() {
  const [lightbox, setLightbox] = useState(null);
  const openCard = cards.find((c) => c.id === lightbox);

  return (
    <>
      <section className="py-20 px-6 bg-sand-100/40">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-2">Good to Know</p>
            <h2 className="font-serif text-3xl md:text-4xl text-mocha-400 font-light mb-4">Guides & Tips</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-sand-300" />
              <div className="w-1 h-1 rounded-full bg-sand-400" />
              <div className="h-px w-12 bg-sand-300" />
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {cards.map((card) => (
              <motion.button
                key={card.id}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(90,60,30,0.10)" }}
                transition={{ duration: 0.25 }}
                onClick={() => setLightbox(card.id)}
                className="group text-left bg-white/70 border border-sand-200 hover:border-mocha-200 transition-colors duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-mocha-200"
                aria-label={`View ${card.title}`}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-cream-200">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-mocha-400/0 group-hover:bg-mocha-400/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn size={28} strokeWidth={1.5} className="text-cream-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className={`absolute top-3 left-3 font-sans text-xs tracking-widest uppercase px-2 py-0.5 ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-mocha-400 font-light mb-1">{card.title}</h3>
                  <p className="font-sans text-xs text-dusty-400">{card.subtitle}</p>
                  <p className="font-sans text-xs text-mocha-300 mt-3 tracking-widest uppercase group-hover:text-mocha-500 transition-colors">
                    Tap to view →
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated lightbox */}
      <AnimatePresence>
        {lightbox && openCard && (
          <>
            <motion.div
              className="fixed inset-0 bg-mocha-500/60 backdrop-blur-sm z-[80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
              <motion.div
                className="relative bg-cream-50 max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
                variants={scaleIn}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
              >
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-cream-100/90 flex items-center justify-center text-mocha-400 hover:bg-cream-200 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
                <span className={`absolute top-3 left-3 z-10 font-sans text-xs tracking-widest uppercase px-2 py-0.5 ${openCard.badgeColor}`}>
                  {openCard.badge}
                </span>
                <img src={openCard.img} alt={openCard.title} className="w-full h-auto object-contain" />
                <div className="p-5 border-t border-sand-100">
                  <h3 className="font-serif text-xl text-mocha-400 font-light">{openCard.title}</h3>
                  <p className="font-sans text-xs text-dusty-400 mt-1">{openCard.subtitle}</p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
