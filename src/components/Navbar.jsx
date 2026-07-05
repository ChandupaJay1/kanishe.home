import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { auth } = useAuth();
  const navLinks = [
    { label: "Shop", to: "/shop" },
    { label: "Gift Sets", to: "/gift-sets" },
    { label: "Blessing Kits", to: "/blessing-kits" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const linkClass = ({ isActive }) =>
    `font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
      isActive
        ? "text-mocha-500 border-b border-mocha-400 pb-0.5"
        : "text-mocha-300 hover:text-mocha-500"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `font-sans text-xs tracking-widest uppercase transition-colors ${
      isActive ? "text-mocha-500" : "text-mocha-300 hover:text-mocha-500"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-100/90 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-serif text-2xl tracking-[0.3em] text-mocha-400 font-light hover:text-mocha-500 transition-colors"
        >
          KANISHE.
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          {auth && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </div>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className="relative text-mocha-400 hover:text-mocha-500 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-mocha-300 text-cream-50 text-xs flex items-center justify-center rounded-full font-sans">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-mocha-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream-100 border-t border-sand-200 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
