"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, stagger, staggerItem, VIEWPORT, cardHover } from "@/lib/animations";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLang();

  return (
    <section id="reviews" className="py-20 bg-amber-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-amber-700 font-medium uppercase tracking-widest text-sm">{t.reviews.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-serif">{t.reviews.title}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CAFE_CONFIG.reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={staggerItem}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group"
              whileHover={cardHover}
            >
              <div className="absolute top-4 right-4 text-amber-100 group-hover:text-amber-200 transition-colors">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <Stars count={review.rating} />
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed relative z-10">{review.text}</p>

              <p className="text-xs text-gray-400 mt-4">
                {new Date(review.date).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
