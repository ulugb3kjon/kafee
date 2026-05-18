import type { Variants } from "framer-motion";

// Apple's standard easing curve
export const ease = [0.25, 0.1, 0.25, 1.0] as const;
export const easeOut = [0.0, 0.0, 0.2, 1.0] as const;

export const VIEWPORT = { once: false, margin: "-60px" };

// Subtle fade + lift (Apple style)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

// Card hover — very subtle
export const cardHover = { y: -3, transition: { duration: 0.25, ease: easeOut } };
export const cardTap = { scale: 0.98 };

// Button spring
export const btnHover = { scale: 1.03, transition: { type: "spring" as const, stiffness: 400, damping: 30 } };
export const btnTap = { scale: 0.97 };
