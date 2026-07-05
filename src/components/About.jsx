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
            <h1 className="font-logo text-5xl md:text-7xl lg:text-8xl tracking-wider text-cream-50 mb-4 drop-shadow-md">
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
            "This is a story of two creatives, one shared vision and a love
            for beautiful spaces."
          </p>
          <p className="font-sans text-sm text-dusty-400 leading-relaxed">
            Kanishe.home was founded in 2025 as a reflection of the love we share and the
            creative paths that brought us together. At its heart, Kanishe. is shaped by two
            artists. A designer and a musician. Each expressing creativity in different forms, yet
            guided by the same sensitivity to rhythm, balance, and emotion. Where design
            meets music, Kanishe. finds its language: quiet, intentional and deeply expressive.

            Every piece is handcrafted in Sri Lanka drawing inspiration from minimal living,
            natural textures and timeless forms. Our home décor is designed to feel calm and
            understated,created to sit gently within modern spaces while adding warmth and
            character. Kanishe. is more than a brand; it is a shared journey shaped by love, art
            and a belief in creating beauty with a meaning.

            Love,

            Kanishka & Sheyal
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
