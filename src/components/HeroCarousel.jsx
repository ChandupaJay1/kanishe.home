import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Add more images here as you get them ─────────────────────────────────────
import caro1 from "../assets/caro1.jpeg";
// import caro2 from "../assets/caro2.jpeg";
// import caro3 from "../assets/caro3.jpeg";
// import caro4 from "../assets/caro4.jpeg";

// Each slide: bg image + text + overlay tint + CTA
const slides = [
  {
    id: 1,
    image: caro1,
    // dark gradient from bottom so text is legible
    scrim: "from-mocha-500/80 via-mocha-400/40 to-transparent",
    textPosition: "items-end",   // text sits at bottom
    tagline: "Handcrafted Gypsum Décor · Sri Lanka",
    heading: "KANISHE.",
    sub: "Home Décor Catalogue 2026",
    cta:  { label: "Shop Collection", to: "/shop" },
    cta2: { label: "Gift Sets",       to: "/gift-sets" },
  },
  {
    id: 2,
    image: caro1,               // replace with caro2 when available
    scrim: "from-mocha-500/70 via-mocha-300/30 to-transparent",
    textPosition: "items-end",
    tagline: "Curated For You",
    heading: "Gift as a Set",
    sub: "Thoughtfully paired pieces for gifting or styling your space.",
    cta: { label: "View Gift Sets", to: "/gift-sets" },
  },
  {
    id: 3,
    image: caro1,               // replace with caro3
    scrim: "from-mocha-500/75 via-mocha-400/35 to-transparent",
    textPosition: "items-end",
    tagline: "Sacred Collections",
    heading: "Blessing Kits",
    sub: "Crafted with intention — for sacred spaces and heartfelt gifting.",
    cta: { label: "View Blessing Kits", to: "/blessing-kits" },
  },
  {
    id: 4,
    image: caro1,               // replace with caro4
    scrim: "from-mocha-500/65 via-mocha-300/25 to-transparent",
    textPosition: "items-end",
    tagline: "The Craft",
    heading: "One of a Kind.",
    sub: "Every piece individually handcrafted — natural texture, quiet elegance.",
    cta: { label: "Our Story", to: "/about" },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent]            = useState(0);
  const [isTransitioning, setTransition] = useState(false);
  const [direction, setDirection]        = useState(1); // 1=forward, -1=back

  const goTo = useCallback((index, dir = 1) => {
    if (isTransitioning) return;
    setDirection(dir);
    setTransition(true);
    setTimeout(() => { setCurrent(index); setTransition(false); }, 50);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);
  const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[560px] overflow-hidden">

      {/* ── Full-bleed background image with cross-fade ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1,  scale: 1    }}
          exit={{    opacity: 0,  scale: 0.97 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src={slide.image}
            alt={slide.heading}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
          {/* Bottom-up gradient scrim for text legibility */}
          <div className={`absolute inset-0 bg-gradient-to-t ${slide.scrim}`} />
          {/* Subtle top navbar fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Text content — bottom-left ── */}
      <div className={`absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-16 pb-28`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-text"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Tagline */}
            <p className="font-sans text-xs tracking-[0.45em] uppercase text-cream-200/80 mb-4">
              {slide.tagline}
            </p>

            {/* Heading */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.1em] text-cream-50 mb-4 leading-none drop-shadow-md">
              {slide.heading}
            </h1>

            {/* Sub */}
            <p className="font-serif italic text-lg md:text-xl text-cream-200 font-light mb-8 max-w-md drop-shadow-sm">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={slide.cta.to}
                className="px-8 py-3.5 bg-cream-50 text-mocha-400 font-sans text-xs tracking-widest uppercase hover:bg-white transition-colors text-center min-w-[160px] shadow-md"
              >
                {slide.cta.label}
              </Link>
              {slide.cta2 && (
                <Link
                  to={slide.cta2.to}
                  className="px-8 py-3.5 border border-cream-200/70 text-cream-50 font-sans text-xs tracking-widest uppercase hover:bg-cream-50/10 backdrop-blur-sm transition-colors text-center min-w-[160px]"
                >
                  {slide.cta2.label}
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-black/20 hover:bg-black/35 border border-white/20 text-cream-50 backdrop-blur-sm transition-all duration-200 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-black/20 hover:bg-black/35 border border-white/20 text-cream-50 backdrop-blur-sm transition-all duration-200 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* ── Progress bar + dots — bottom ── */}
      <div className="absolute bottom-8 left-8 md:left-16 z-20 flex items-center gap-4">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-400 rounded-full ${
                i === current
                  ? "w-7 h-1.5 bg-cream-50"
                  : "w-1.5 h-1.5 bg-cream-50/40 hover:bg-cream-50/70"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="font-sans text-xs text-cream-50/50 tracking-widest">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Auto-progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cream-50/10 z-20">
        <motion.div
          key={current}
          className="h-full bg-cream-50/50"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>
    </section>
  );
}
