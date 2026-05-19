"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Star, Zap, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";

const GRADIENTS = [
  "linear-gradient(135deg, #4a2800 0%, #8B4513 100%)",
  "linear-gradient(135deg, #1a0a00 0%, #5C3A0A 100%)",
  "linear-gradient(135deg, #0e0800 0%, #4a3000 100%)",
];
const BADGE_ICONS = [Flame, Star, Zap];

export default function Promotions() {
  const router = useRouter();
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const promos = t.promotions.items;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % promos.length), 5000);
    return () => clearInterval(timer);
  }, [promos.length]);

  const BadgeIcon = BADGE_ICONS[current % BADGE_ICONS.length];

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: "#080808" }}>
      <div className="container mx-auto px-4 max-w-5xl">

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            <Sparkles className="w-3.5 h-3.5" />{t.promotions.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 font-serif">
            {t.promotions.title}
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="relative rounded-3xl p-8 md:p-10 text-white overflow-hidden"
                style={{ background: GRADIENTS[current], border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)", transform: "translate(30%,-50%)" }} />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: "rgba(253,224,128,0.12)", border: "1px solid rgba(253,224,128,0.2)", color: "#FDE080" }}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    {promos[current].badge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif leading-snug">{promos[current].title}</h3>
                  <p className="text-white/65 text-base max-w-lg">{promos[current].desc}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-5">
            {promos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{ height: 6, width: i === current ? 32 : 8, backgroundColor: i === current ? "#FDE080" : "rgba(255,255,255,0.15)" }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => router.push("/promotions")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{ backgroundColor: "#FDE080", borderColor: "#FDE080", color: "#0a0a0a", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            Barcha aksiyalar — batafsil
            <motion.span
              className="flex items-center"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
