import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from "../hooks/useScrollAnimation";
import aboutHero from "../assets/images/IMG_5901.JPG";

const policies = [
  {
    title: "Handcrafted",
    body: "Each gypsum piece is individually handcrafted, making it one of a kind. Natural variations in texture, finish, and small details are a beautiful part of the handmade process — not defects.",
  },
  {
    title: "Made to Order",
    body: "Standard production time is approximately 2 weeks to allow for proper setting and drying. During the rainy season this may extend naturally. In-stock items can be delivered within a few days.",
  },
  {
    title: "Packaging",
    body: "A packaging fee of LKR 200 applies to orders below LKR 3,000. Charges may vary for larger orders.",
  },
  {
    title: "Returns & Damages",
    body: "Custom and personalized orders are non-refundable. Any damages must be reported within 24 hours of delivery with clear unboxing proof.",
  },
];

export default function About() {
  return (
    <section className="bg-sand-100/30">
      {/* Hero banner */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={aboutHero}
          alt="About KANISHE."
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-100/90 via-sand-100/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-cream-200 mb-3 drop-shadow-sm">Our Story</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.1em] text-cream-50 mb-4 drop-shadow-md">
              About KANISHE.
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-cream-200/60" />
              <div className="w-1 h-1 rounded-full bg-cream-200/60" />
              <div className="h-px w-12 bg-cream-200/60" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-24 px-6">

        {/* Brand story */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-20"
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="font-serif text-xl text-mocha-300 font-light italic leading-relaxed mb-6">
            "Where craft meets calm."
          </p>
          <p className="font-sans text-sm text-dusty-400 leading-relaxed">
            KANISHE. creates handcrafted gypsum home décor pieces designed to bring quiet elegance,
            texture, and peace to your everyday spaces. Founded by Kånîshķá Rodrigo, each piece
            is sculpted with care — from serene vases to sacred blessing kits.
          </p>
        </motion.div>

        {/* Policies grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {policies.map((p, i) => (
            <motion.div
              key={p.title}
              variants={i % 2 === 0 ? fadeLeft : fadeRight}
              className="bg-white/50 border border-sand-200 p-7 hover:border-mocha-200 transition-colors duration-300"
            >
              <h3 className="font-serif text-lg text-mocha-400 font-light mb-3">{p.title}</h3>
              <p className="font-sans text-xs text-dusty-400 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          className="mt-8 bg-cream-200/50 border border-sand-200 p-6 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="font-sans text-xs text-dusty-400 leading-relaxed italic">
            While we strive for accurate product representation, slight colour differences may occur
            due to lighting and screen settings.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
