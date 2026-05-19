"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ZoomIn } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function GalleryPage() {
  const router = useRouter();
  const { t } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const open = (src: string, idx: number) => { setSelected(src); setSelectedIdx(idx); };
  const close = () => setSelected(null);
  const prev = () => {
    const idx = (selectedIdx - 1 + CAFE_CONFIG.gallery.length) % CAFE_CONFIG.gallery.length;
    setSelectedIdx(idx);
    setSelected(CAFE_CONFIG.gallery[idx]);
  };
  const next = () => {
    const idx = (selectedIdx + 1) % CAFE_CONFIG.gallery.length;
    setSelectedIdx(idx);
    setSelected(CAFE_CONFIG.gallery[idx]);
  };

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh" }}>
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold backdrop-blur-md"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.14)", color: "#fff" }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Ortga
        </motion.button>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
              {t.gallery.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 font-serif leading-[1.05]">
              {t.gallery.title}
            </h1>
            <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
              Kafemizdagi issiq muhit, mazali taomlar va unutilmas lahzalar
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mosaic grid */}
      <section className="px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {CAFE_CONFIG.gallery.map((src, i) => (
              <motion.div
                key={src}
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                className="break-inside-avoid group relative cursor-pointer rounded-2xl overflow-hidden mb-4"
                onClick={() => open(src, i)}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={src}
                  alt={`Galereya ${i + 1}`}
                  className="w-full object-cover group-hover:brightness-85 transition-all duration-500"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(0,0,0,0.35)" }}
                >
                  <div className="p-3 rounded-full" style={{ backgroundColor: "#FDE080" }}>
                    <ZoomIn className="w-5 h-5" style={{ color: "#0a0a0a" }} />
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
                >
                  <span className="text-xs text-white/60">{i + 1} / {CAFE_CONFIG.gallery.length}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected} alt="Kafe rasmi" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />

              <motion.button
                onClick={close}
                className="absolute top-3 right-3 rounded-full p-2.5 backdrop-blur-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 backdrop-blur-sm" style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}>
                ←
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 backdrop-blur-sm" style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}>
                →
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                {selectedIdx + 1} / {CAFE_CONFIG.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
