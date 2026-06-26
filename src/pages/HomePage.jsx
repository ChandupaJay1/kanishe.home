import { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import CollectionsStrip from "../components/CollectionsStrip";
import FeaturedProducts from "../components/FeaturedProducts";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
import ProductModal from "../components/ProductModal";

export default function HomePage({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main>
      <HeroCarousel />
      <CollectionsStrip />
      <FeaturedProducts
        onAddToCart={onAddToCart}
        onViewProduct={setSelectedProduct}
      />
      <InfoSection />
      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </main>
  );
}
