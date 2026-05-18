"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { checkBranchOpen, getCloseTime, getOpenTime } from "@/lib/openStatus";

export default function Hero() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 220]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.08]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const mainBranch = CAFE_CONFIG.branches[0];
  const isOpen = checkBranchOpen(mainBranch.workHours);
  const timeLabel = isOpen
    ? getCloseTime(mainBranch.workHours)
    : getOpenTime(mainBranch.workHours);

  return (
    <section id="home" className="relative h-screen min-h-150 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&h=1080&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/40 to-black/75" />
      </motion.div>

      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        style={{ opacity }}
      >
        {/* Welcome badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="mb-5"
        >
          <span className="inline-block px-5 py-2 bg-amber-800/80 backdrop-blur-sm text-amber-100 text-sm rounded-full font-medium tracking-widest uppercase">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Cafe name */}
        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 font-serif leading-tight"
        >
          {CAFE_CONFIG.name}ga!
        </motion.h1>

        {/* ── Open / Closed status ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58 }}
          className="mb-5"
        >
          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-semibold border ${
            isOpen
              ? "bg-green-500/20 border-green-400/40 text-green-300"
              : "bg-red-500/20 border-red-400/40 text-red-300"
          }`}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
            {isOpen ? t.openStatus.open : t.openStatus.closed}
            <span className="w-px h-3.5 bg-white/20" />
            <span className="text-white/70 font-normal text-xs">
              {isOpen ? t.openStatus.closed : t.openStatus.opensAt} {timeLabel}
            </span>
          </div>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
          className="text-lg md:text-2xl text-amber-100/85 mb-10 max-w-2xl leading-relaxed"
        >
          {CAFE_CONFIG.slogan}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={() => scrollTo("#menu")}
            className="px-9 py-4 bg-amber-800 text-white rounded-full font-semibold text-lg hover:bg-amber-700 transition-all shadow-2xl"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
          >
            {t.hero.btnMenu}
          </motion.button>
          <motion.button
            onClick={() => scrollTo("#order")}
            className="px-9 py-4 bg-white/15 backdrop-blur-sm text-white border-2 border-white/40 rounded-full font-semibold text-lg hover:bg-white/25 transition-all"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
          >
            {t.hero.btnOrder}
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  );
}
