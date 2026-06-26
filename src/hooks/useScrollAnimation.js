// Reusable scroll-triggered animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Stagger container — wraps a list of animated children
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Common viewport config for useInView
export const viewportOnce = { once: true, amount: 0.18 };
