import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import FloatingButtons from "./components/FloatingButtons";

import HomePage        from "./pages/HomePage";
import ShopPage        from "./pages/ShopPage";
import GiftSetsPage    from "./pages/GiftSetsPage";
import BlessingKitsPage from "./pages/BlessingKitsPage";
import AboutPage       from "./pages/AboutPage";
import ContactPage     from "./pages/ContactPage";

// Smooth page fade/slide transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeItem(id); return; }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/" element={<PageTransition><HomePage onAddToCart={addToCart} /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><ShopPage onAddToCart={addToCart} /></PageTransition>} />
            <Route path="/gift-sets" element={<PageTransition><GiftSetsPage onAddToCart={addToCart} /></PageTransition>} />
            <Route path="/blessing-kits" element={<PageTransition><BlessingKitsPage onAddToCart={addToCart} /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><HomePage onAddToCart={addToCart} /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>

      {!isHome && <Footer />}

      {/* Floating WhatsApp + scroll-to-top */}
      <FloatingButtons />

      {/* Animated cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <Cart
            items={cartItems}
            onClose={() => setCartOpen(false)}
            onUpdateQty={updateQty}
            onRemove={removeItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
