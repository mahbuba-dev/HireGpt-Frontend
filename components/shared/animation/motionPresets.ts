// Framer Motion variants and easing presets for consistent motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const parallax = (offset = 40) => ({
  hidden: { opacity: 0, y: offset },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
});

export const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 40,
};
