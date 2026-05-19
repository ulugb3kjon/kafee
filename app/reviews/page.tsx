"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Quote, ArrowLeft, TrendingUp } from "lucide-react";
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

function Stars({ count, size = "sm" }: { count: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} ${i < count ? "fill-[#FDE080] text-[#FDE080]" : "text-white/10 fill-white/10"}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const router = useRouter();
  const { t } = useLang();

  const avgRating = CAFE_CONFIG.reviews.reduce((s, r) => s + r.rating, 0) / CAFE_CONFIG.reviews.length;
  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: CAFE_CONFIG.reviews.filter((r) => r.rating === star).length,
  }));

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
              {t.reviews.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 font-serif leading-[1.05]">
              {t.reviews.title}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <Stars count={5} size="lg" />
              <span className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</span>
              <span className="text-white/40">/ 5 · {CAFE_CONFIG.reviews.length} ta sharh</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Rating breakdown */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5" style={{ color: "#FDE080" }} />
                <h2 className="font-bold text-white text-lg">Reyting taqsimoti</h2>
              </div>
              <div className="space-y-3">
                {starCounts.map(({ star, count }) => {
                  const pct = CAFE_CONFIG.reviews.length ? (count / CAFE_CONFIG.reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16 shrink-0">
                        <span className="text-sm text-white/50">{star}</span>
                        <Star className="w-3.5 h-3.5 fill-[#FDE080] text-[#FDE080]" />
                      </div>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: "#FDE080" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: (5 - star) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span className="text-sm w-8 text-right shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* All reviews */}
      <section className="px-4 pb-32">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-8">
            <h2 className="text-3xl font-bold text-white font-serif">Barcha sharhlar</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAFE_CONFIG.reviews.map((review, i) => (
              <FadeIn key={review.name} delay={i * 0.06}>
                <div
                  className="relative rounded-2xl p-6 overflow-hidden h-full"
                  style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Quote className="absolute top-4 right-4 w-9 h-9" style={{ color: "rgba(253,224,128,0.07)" }} />

                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                      style={{ border: "2px solid rgba(253,224,128,0.2)" }}
                    />
                    <div>
                      <h4 className="font-semibold text-white">{review.name}</h4>
                      <Stars count={review.rating} />
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed relative z-10" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {review.text}
                  </p>

                  <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {new Date(review.date).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
