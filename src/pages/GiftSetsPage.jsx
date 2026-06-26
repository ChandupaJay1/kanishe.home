import GiftSets from "../components/GiftSets";

export default function GiftSetsPage({ onAddToCart }) {
  return (
    <main className="pt-20">
      <GiftSets onAddToCart={onAddToCart} />
    </main>
  );
}
