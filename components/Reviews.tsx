"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < count ? "fill-[#FDE080] text-[#FDE080]" : "text-white/10 fill-white/10"}`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const router = useRouter();
  const { t } = useLang();
  const preview = CAFE_CONFIG.reviews.slice(0, 3);

  const avgRating = (CAFE_CONFIG.reviews.reduce((s, r) => s + r.rating, 0) / CAFE_CONFIG.reviews.length).toFixed(1);

  return (
    <section id="reviews" className="py-24 overflow-hidden" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="container mx-auto px-4 max-w-5xl">

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            {t.reviews.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-3 font-serif">
            {t.reviews.title}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FDE080] text-[#FDE080]" />
              ))}
            </div>
            <span className="text-white/60 text-sm">{avgRating} / 5 · {CAFE_CONFIG.reviews.length} ta sharh</span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {preview.map((review) => (
            <motion.div
              key={review.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8" style={{ color: "rgba(253,224,128,0.08)" }} />
              <div className="flex items-center gap-3 mb-3">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" style={{ border: "2px solid rgba(253,224,128,0.2)" }} />
                <div>
                  <p className="font-semibold text-white text-sm">{review.name}</p>
                  <Stars count={review.rating} />
                </div>
              </div>
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                {review.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => router.push("/reviews")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{ backgroundColor: "#FDE080", borderColor: "#FDE080", color: "#0a0a0a", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            Barcha sharhlar — batafsil
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
