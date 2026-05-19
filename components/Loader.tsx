"use client";

import { motion } from "framer-motion";
import { CAFE_CONFIG } from "@/config/cafe.config";

export default function Loader() {
  const name = CAFE_CONFIG.name;

  return (
    // Curtain wrapper — 100vh + 80px so the wave hangs below the visible area.
    // Exit: slides up by its full height, the wave passes through the viewport
    // creating a liquid-wipe reveal.
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "calc(100vh + 80px)",
        zIndex: 100,
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ── Dark curtain ── */}
      <div
        style={{ height: "100vh", backgroundColor: "#0a0a0a" }}
        className="flex flex-col items-center justify-center gap-6"
      >
        {/* Pulsing gold dot */}
        <motion.span
          className="block w-1.5 h-1.5 rounded-full bg-[#FDE080]"
          animate={{ scale: [1, 2.4, 1], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cafe name */}
        <motion.h1
          className="font-serif font-semibold text-[#FDE080] tracking-[0.22em]"
          style={{ fontSize: "1.6rem" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
        >
          {name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-white/18 text-[10px] tracking-[0.5em] uppercase font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          premium coffee
        </motion.p>
      </div>

      {/* ── Wave boundary ──
          Sits 80 px below the curtain (outside the viewport on load).
          As the curtain slides up, this wave passes through the screen
          acting as a liquid surface between the dark curtain and the site. ── */}
      <div style={{ height: 80, overflow: "hidden" }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 80 }}
        >
          <motion.path
            fill="#0a0a0a"
            animate={{
              d: [
                "M 0,40 C 240,4 480,76 720,40 C 960,4 1200,76 1440,40 L 1440,0 L 0,0 Z",
                "M 0,40 C 240,76 480,4 720,40 C 960,76 1200,4 1440,40 L 1440,0 L 0,0 Z",
                "M 0,40 C 240,4 480,76 720,40 C 960,4 1200,76 1440,40 L 1440,0 L 0,0 Z",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
