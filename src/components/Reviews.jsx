import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";

const reviews = [
  {
    name: "Dinara Perera",
    text: "Absolutely in love with the Nordic Ribbed Vase! The craftsmanship is stunning and it adds such a serene touch to my living room. Highly recommend KANISHE.",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    name: "Samantha Fonseka",
    text: "Ordered the Serene Wave Vase as a gift and it was so well received. The quality is exceptional and the packaging was beautiful. Will definitely order again.",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Ravin de Silva",
    text: "Beautiful handcrafted pieces. The attention to detail is incredible. Got the Aura Round Plate and it's perfect for my vanity. Great customer service too!",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    name: "Amaya Wickramasinghe",
    text: "The Blessing Kit made the perfect gift for my mother. Everything was thoughtfully curated and beautifully presented. Truly a special brand.",
    rating: 5,
    date: "2 months ago",
  },
];

export default function Reviews() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-cream-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-2">What Our Customers Say</p>
          <h2 className="font-serif text-3xl md:text-4xl text-mocha-400 font-light mb-4">Google Reviews</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-sand-300" />
            <div className="w-1 h-1 rounded-full bg-sand-400" />
            <div className="h-px w-12 bg-sand-300" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={18} className="fill-yellow-500 text-yellow-500" strokeWidth={1} />
            ))}
            <span className="font-sans text-sm text-dusty-400 ml-2">5.0 · 4 reviews</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              variants={i % 2 === 0 ? fadeLeft : fadeRight}
              className="bg-white border border-sand-200 p-4 sm:p-6 hover:border-mocha-200 transition-colors duration-300"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }, (_, s) => (
                  <Star key={s} size={14} className="fill-yellow-500 text-yellow-500" strokeWidth={1} />
                ))}
              </div>
              <p className="font-serif text-sm text-mocha-400 font-light italic leading-relaxed mb-4">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-medium text-mocha-300">{r.name}</span>
                <span className="font-sans text-xs text-dusty-300">{r.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <a
            href="https://search.google.com/local/reviews?q=Kanishe+Home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs tracking-widest uppercase text-cream-50 bg-mocha-300 px-6 py-3 hover:bg-mocha-400 transition-colors"
          >
            Leave a Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}