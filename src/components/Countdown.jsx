import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logonew from "../assets/logonew.PNG";

// ── Target: July 19, 2026 12:00 PM (noon) Sri Lanka time (UTC+5:30) ──
const TARGET = new Date("2026-07-19T12:00:00+05:30").getTime();

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    total:   diff,
    hours:   Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Block({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        key={value}
        initial={{ rotateX: -60, opacity: 0 }}
        animate={{ rotateX: 0,   opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="font-serif text-5xl sm:text-7xl md:text-8xl text-cream-50 font-light tabular-nums leading-none drop-shadow-lg"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase text-cream-200/70">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ onDone }) {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    if (time.total <= 0) { onDone(); return; }
    const id = setInterval(() => {
      const t = getTimeLeft();
      setTime(t);
      if (t.total <= 0) { clearInterval(id); onDone(); }
    }, 1000);
    return () => clearInterval(id);
  }, [onDone]);

  if (time.total <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-mocha-500 via-mocha-400 to-mocha-500 overflow-hidden"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_40%,#fff_1px,transparent_1px)] bg-[length:24px_24px]" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-cream-50/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-sage-400/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 px-6">
        {/* Logo */}
        <motion.img
          src={logonew}
          alt="KANISHE."
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-12 sm:h-16 md:h-20 drop-shadow-md"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-cream-200/80 text-center"
        >
          Something beautiful is on its way
        </motion.p>

        {/* Countdown blocks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center gap-5 sm:gap-8 md:gap-10"
        >
          <Block value={time.hours}   label="Hours" />
          <span className="font-serif text-4xl sm:text-5xl text-cream-50/30 mt-[-1.5rem]">:</span>
          <Block value={time.minutes} label="Minutes" />
          <span className="font-serif text-4xl sm:text-5xl text-cream-50/30 mt-[-1.5rem]">:</span>
          <Block value={time.seconds} label="Seconds" />
        </motion.div>

        {/* Separator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-24 h-px bg-cream-50/20"
        />

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-sans text-[10px] tracking-widest text-cream-200/40 text-center"
        >
          We&apos;ll be right back
        </motion.p>
      </div>
    </motion.div>
  );
}
