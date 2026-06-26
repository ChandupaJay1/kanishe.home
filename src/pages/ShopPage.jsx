import { useState } from "react";
import Shop from "../components/Shop";
import ProductModal from "../components/ProductModal";

export default function ShopPage({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="pt-20">
      <Shop
        onAddToCart={onAddToCart}
        onViewProduct={setSelectedProduct}
      />

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
