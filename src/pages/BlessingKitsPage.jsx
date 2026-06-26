import BlessingKits from "../components/BlessingKits";

export default function BlessingKitsPage({ onAddToCart }) {
  return (
    <main className="pt-20">
      <BlessingKits onAddToCart={onAddToCart} />
    </main>
  );
}
