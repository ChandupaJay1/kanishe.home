import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-cream-100 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-sand-100 opacity-40 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-sand-200 opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cream-200 opacity-50 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Tagline */}
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-6">
          Handcrafted Gypsum Décor · Sri Lanka
        </p>

        {/* Brand name */}
        <h1 className="font-serif text-6xl md:text-8xl font-light tracking-[0.25em] text-mocha-400 mb-4">
          KANISHE.
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic text-xl md:text-2xl text-mocha-200 font-light mb-8">
          Home Décor Catalogue 2026
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-sand-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-sand-400" />
          <div className="h-px w-16 bg-sand-300" />
        </div>

        <p className="font-sans text-sm text-dusty-400 leading-relaxed max-w-md mx-auto mb-12">
          Each piece individually handcrafted — bringing quiet elegance,
          texture, and calm to your everyday spaces.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/shop" className="btn-primary">
            Shop Collection
          </Link>
          <Link to="/gift-sets" className="btn-outline">
            Gift Sets
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-sand-300" />
        <div className="w-1 h-1 rounded-full bg-sand-400" />
      </div>
    </section>
  );
}
