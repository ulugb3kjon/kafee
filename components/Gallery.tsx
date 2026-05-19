"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";

export default function Gallery() {
  const router = useRouter();
  const { t } = useLang();
  const preview = CAFE_CONFIG.gallery.slice(0, 5);

  return (
    <section id="gallery" className="py-24 overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container mx-auto px-4 max-w-5xl">

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            {t.gallery.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4 font-serif">
            {t.gallery.title}
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Kafemizdagi issiq muhit va ajoyib lahzalar
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10"
        >
          {preview.map((src, i) => (
            <motion.div
              key={src}
              variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } } }}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "unset" : "1", height: i === 0 ? "100%" : undefined, minHeight: i === 0 ? 320 : 140 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={src}
                alt={`Galereya ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <Images className="w-7 h-7 text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => router.push("/gallery")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{ backgroundColor: "#FDE080", borderColor: "#FDE080", color: "#0a0a0a", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            Barcha rasmlar — batafsil
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
