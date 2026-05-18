"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Flame, Star, Zap } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT, btnHover, btnTap } from "@/lib/animations";

const GRADIENTS = [
  "from-amber-600 to-orange-500",
  "from-amber-800 to-amber-600",
  "from-stone-700 to-amber-700",
];

const BADGE_ICONS = [Flame, Star, Zap];

export default function Promotions() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const promos = t.promotions.items;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % promos.length), 5000);
    return () => clearInterval(timer);
  }, [promos.length]);

  const BadgeIcon = BADGE_ICONS[current % BADGE_ICONS.length];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-amber-700 font-medium uppercase tracking-widest text-sm">
            <Sparkles className="w-4 h-4" />{t.promotions.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-serif">{t.promotions.title}</h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current}-${t.promotions.badge}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className={`relative bg-linear-to-br ${GRADIENTS[current]} rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-lg`}>
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                    <BadgeIcon className="w-3.5 h-3.5" />
                    {promos[current].badge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif leading-snug">{promos[current].title}</h3>
                  <p className="text-white/85 text-base max-w-lg mb-7">{promos[current].desc}</p>
                  <motion.button
                    onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex items-center gap-2 bg-white text-amber-800 font-semibold px-7 py-3 rounded-full hover:bg-amber-50 transition-colors shadow"
                    whileHover={btnHover} whileTap={btnTap}
                  >
                    {t.nav.menu} →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button onClick={() => setCurrent((c) => (c - 1 + promos.length) % promos.length)}
              className="w-9 h-9 bg-gray-100 hover:bg-amber-100 rounded-full flex items-center justify-center transition-colors"
              whileHover={btnHover} whileTap={btnTap}>
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </motion.button>
            <div className="flex gap-2">
              {promos.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-amber-800" : "w-2 bg-gray-300"}`} />
              ))}
            </div>
            <motion.button onClick={() => setCurrent((c) => (c + 1) % promos.length)}
              className="w-9 h-9 bg-gray-100 hover:bg-amber-100 rounded-full flex items-center justify-center transition-colors"
              whileHover={btnHover} whileTap={btnTap}>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
