import { useState } from "react";
import { motion } from "framer-motion";
import contactsImg from "../assets/contacts.jpeg";
import qrImg from "../assets/qr.jpeg";
import { contactInfo } from "../data/contacts";
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from "../hooks/useScrollAnimation";

// ── Social icon SVGs ──────────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

// ── Contact form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    const text =
      `Hello KANISHE.! 🌿\n\n` +
      `*Name:* ${form.name}\n` +
      (form.phone ? `*Phone:* ${form.phone}\n` : "") +
      `\n*Message:*\n${form.message}`;

    window.open(
      `https://wa.me/${contactInfo.whatsapp.number}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="font-sans text-xs tracking-widest uppercase text-mocha-300 mb-1.5 block">
          Your Name <span className="text-mocha-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Dinara Perera"
          className="w-full bg-transparent border border-sand-200 px-4 py-3 font-sans text-sm text-mocha-400 placeholder-dusty-300 focus:outline-none focus:border-mocha-300 transition-colors"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="font-sans text-xs tracking-widest uppercase text-mocha-300 mb-1.5 block">
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+94 7X XXX XXXX"
          className="w-full bg-transparent border border-sand-200 px-4 py-3 font-sans text-sm text-mocha-400 placeholder-dusty-300 focus:outline-none focus:border-mocha-300 transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="font-sans text-xs tracking-widest uppercase text-mocha-300 mb-1.5 block">
          Message <span className="text-mocha-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us what you're looking for — a specific piece, a custom order, a gift idea..."
          className="w-full bg-transparent border border-sand-200 px-4 py-3 font-sans text-sm text-mocha-400 placeholder-dusty-300 focus:outline-none focus:border-mocha-300 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 font-sans text-xs tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors duration-200"
      >
        <WhatsAppIcon />
        Send via WhatsApp
      </button>

      {sent && (
        <p className="font-sans text-xs text-sage-500 text-center tracking-wide">
          ✓ Opening WhatsApp...
        </p>
      )}

      <p className="font-sans text-xs text-dusty-300 text-center leading-relaxed">
        This will open WhatsApp with your message pre-filled.
      </p>
    </form>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const socialLinks = [
    contactInfo.whatsapp.number && {
      id: "whatsapp",
      label: "WhatsApp",
      sub: contactInfo.whatsapp.display,
      icon: <WhatsAppIcon />,
      href: `https://wa.me/${contactInfo.whatsapp.number}`,
      color: "hover:border-[#25D366] hover:text-[#25D366]",
      iconBg: "bg-[#25D366]/10 text-[#25D366]",
    },
    contactInfo.instagram.url && {
      id: "instagram",
      label: "Instagram",
      sub: contactInfo.instagram.handle,
      icon: <InstagramIcon />,
      href: contactInfo.instagram.url,
      color: "hover:border-[#E1306C] hover:text-[#E1306C]",
      iconBg: "bg-[#E1306C]/10 text-[#E1306C]",
    },
    contactInfo.facebook.url && {
      id: "facebook",
      label: "Facebook",
      sub: contactInfo.facebook.name,
      icon: <FacebookIcon />,
      href: contactInfo.facebook.url,
      color: "hover:border-[#1877F2] hover:text-[#1877F2]",
      iconBg: "bg-[#1877F2]/10 text-[#1877F2]",
    },
    contactInfo.tiktok.url && {
      id: "tiktok",
      label: "TikTok",
      sub: contactInfo.tiktok.handle,
      icon: <TikTokIcon />,
      href: contactInfo.tiktok.url,
      color: "hover:border-mocha-400 hover:text-mocha-400",
      iconBg: "bg-mocha-100 text-mocha-400",
    },
    contactInfo.email && {
      id: "email",
      label: "Email",
      sub: contactInfo.email,
      icon: <EmailIcon />,
      href: `mailto:${contactInfo.email}`,
      color: "hover:border-sand-400 hover:text-sand-500",
      iconBg: "bg-sand-100 text-sand-500",
    },
  ].filter(Boolean);

  return (
    <main className="pt-20 min-h-screen bg-cream-100">
      {/* Page header */}
      <motion.div
        className="bg-gradient-to-br from-cream-200 to-sand-100 py-16 px-6 text-center border-b border-sand-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-3">Get in Touch</p>
        <h1 className="font-serif text-4xl md:text-5xl text-mocha-400 font-light tracking-wide mb-4">Contact Us</h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-sand-300" />
          <div className="w-1 h-1 rounded-full bg-sand-400" />
          <div className="h-px w-12 bg-sand-300" />
        </div>
        <p className="font-sans text-sm text-dusty-400 mt-5 max-w-sm mx-auto leading-relaxed">
          Reach us on any of the platforms below — we'd love to hear from you.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* LEFT */}
        <motion.div
          className="flex flex-col gap-8"
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Contacts card */}
          <motion.div
            className="relative overflow-hidden border border-sand-200 shadow-sm"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <img src={contactsImg} alt="KANISHE. contact information" className="w-full h-auto object-contain" />
          </motion.div>

          {/* Social links */}
          <div>
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-5">Find Us On</p>
            <motion.div
              className="flex flex-col gap-3"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 border border-sand-200 px-5 py-4 bg-white/60 transition-colors duration-200 group ${link.color}`}
                  aria-label={`Contact via ${link.label}`}
                >
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${link.iconBg}`}>
                    {link.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs tracking-widest uppercase text-mocha-400">{link.label}</p>
                    <p className="font-sans text-sm text-dusty-400 truncate mt-0.5">{link.sub}</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-dusty-300 group-hover:translate-x-1 transition-transform flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Info notes */}
          <motion.div
            className="bg-sand-100/50 border border-sand-200 p-6 space-y-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="font-sans text-xs tracking-widest uppercase text-mocha-200 mb-3">Good to Know</p>
            {[
              "Made to order — ~2 weeks production time",
              "Custom orders are non-refundable",
              "Report damages within 24 hrs with unboxing proof",
              "Packaging fee: LKR 200 on orders below LKR 3,000",
            ].map((note) => (
              <div key={note} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-mocha-200 mt-1.5 flex-shrink-0" />
                <p className="font-sans text-xs text-dusty-400 leading-relaxed">{note}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="mb-8">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-mocha-200 mb-2">Send a Message</p>
            <h2 className="font-serif text-3xl text-mocha-400 font-light mb-3">Let's Talk</h2>
            <p className="font-sans text-sm text-dusty-400 leading-relaxed">
              Have a question about a piece, want to place a custom order, or need help choosing
              the perfect gift? Fill in the form — it'll open straight in WhatsApp.
            </p>
          </div>

          <div className="bg-white/60 border border-sand-200 p-6 md:p-8">
            <ContactForm />
          </div>

          {/* QR */}
          <motion.div
            className="mt-6 flex items-center gap-5 bg-cream-200/50 border border-sand-100 p-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={qrImg} alt="Scan to contact KANISHE." className="w-20 h-20 object-contain flex-shrink-0 border border-sand-200" />
            <div>
              <p className="font-serif text-base text-mocha-400 font-light">Scan to Chat</p>
              <p className="font-sans text-xs text-dusty-400 mt-1 leading-relaxed">
                Scan the QR code to open our WhatsApp directly on your phone.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}
