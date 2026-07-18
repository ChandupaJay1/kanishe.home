import { Link } from "react-router-dom";
import logonew from "../assets/logonew.PNG";

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
            <Link to="/">
              <img src={logonew} alt="KANISHE." className="h-12 md:h-16" />
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
          <p className="font-sans text-xs text-cream-400 mt-3">
            Developed and published by <a href="https://nerdtechlabs.info" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-cream-50 transition-colors underline underline-offset-2">Nerdtech Labs</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
