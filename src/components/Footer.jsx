import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { label: "Shop", to: "/shop" },
    { label: "Gift Sets", to: "/gift-sets" },
    { label: "Blessing Kits", to: "/blessing-kits" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="bg-mocha-400 text-cream-200 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif text-3xl tracking-[0.3em] font-light hover:text-cream-50 transition-colors">
              KANISHE.
            </Link>
            <p className="font-sans text-xs text-cream-300 tracking-wide mt-3">
              Handcrafted Gypsum Home Décor
            </p>
            <p className="font-sans text-xs text-cream-400 mt-1">Sri Lanka · 2026</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs tracking-widest uppercase text-cream-400">Navigate</p>
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-sans text-xs text-cream-200 hover:text-cream-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs tracking-widest uppercase text-cream-400">Info</p>
            <p className="font-sans text-xs text-cream-200">Made to Order · ~2 weeks</p>
            <p className="font-sans text-xs text-cream-200">Custom orders non-refundable</p>
            <p className="font-sans text-xs text-cream-200">Damage reports within 24hrs</p>
            <p className="font-sans text-xs text-cream-200">Packaging: LKR 200 (under LKR 3,000)</p>
          </div>
        </div>

        <div className="border-t border-mocha-300 pt-6 text-center">
          <p className="font-sans text-xs text-cream-400">
            © 2026 KANISHE. · All rights reserved · Handcrafted with love
          </p>
        </div>
      </div>
    </footer>
  );
}
