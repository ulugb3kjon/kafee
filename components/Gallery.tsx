"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, stagger, staggerItem, VIEWPORT } from "@/lib/animations";

export default function Gallery() {
  const { t } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-amber-700 font-medium uppercase tracking-widest text-sm">{t.gallery.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-serif">{t.gallery.title}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger}
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          {CAFE_CONFIG.gallery.map((src, i) => (
            <motion.div
              key={src}
              variants={staggerItem}
              className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden mb-4"
              onClick={() => setSelected(src)}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={src}
                alt={`Galereya ${i + 1}`}
                className="w-full object-cover group-hover:brightness-90 transition-all duration-400"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="bg-white/90 rounded-full p-3">
                  <ZoomIn className="w-5 h-5 text-amber-800" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected} alt="Kafe rasmi" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2.5 hover:bg-black/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
