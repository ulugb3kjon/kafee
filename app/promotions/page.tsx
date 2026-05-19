"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Flame, Star, Zap, ArrowLeft, Clock, Tag, Gift } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { CAFE_CONFIG } from "@/config/cafe.config";

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

const GRADIENTS = [
  "linear-gradient(135deg, #4a2800 0%, #8B4513 100%)",
  "linear-gradient(135deg, #1a0a00 0%, #5C3A0A 100%)",
  "linear-gradient(135deg, #0e0800 0%, #4a3000 100%)",
];
const BADGE_ICONS = [Flame, Star, Zap];

const PERKS = [
  { icon: Gift, title: "Bonus dastur", desc: "Har 10-chi buyurtmangizda sovg'a ichimlik" },
  { icon: Clock, title: "Ertalabki chegirma", desc: "09:00–11:00 da barcha buyurtmalarga 20% chegirma" },
  { icon: Tag, title: "Bepul yetkazish", desc: "150 000 so'mdan yuqori buyurtmalarga yetkazish bepul" },
  { icon: Sparkles, title: "Doimiy mijozlar", desc: "Oy davomida 5 ta buyurtma — maxsus VIP maqomi" },
];

export default function PromotionsPage() {
  const router = useRouter();
  const { t } = useLang();
  const promos = t.promotions.items;

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
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
              <Sparkles className="w-3.5 h-3.5" />
              {t.promotions.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 font-serif leading-[1.05]">
              {t.promotions.title}
            </h1>
            <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
              Doimiy chegirmalar, bonus dasturlar va maxsus takliflar — hammasi bir joyda
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Active promotions */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h2 className="text-xl font-bold text-white">Faol aksiyalar</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {promos.map((promo, i) => {
              const BadgeIcon = BADGE_ICONS[i % BADGE_ICONS.length];
              return (
                <FadeIn key={promo.title} delay={i * 0.1}>
                  <motion.div
                    className="relative rounded-3xl p-7 overflow-hidden h-full"
                    style={{ background: GRADIENTS[i % GRADIENTS.length], border: "1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)", transform: "translate(30%,-40%)" }} />
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: "rgba(253,224,128,0.15)", border: "1px solid rgba(253,224,128,0.2)", color: "#FDE080" }}>
                        <BadgeIcon className="w-3 h-3" />
                        {promo.badge}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 font-serif leading-snug">{promo.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{promo.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          {/* Perks */}
          <FadeIn className="mb-8">
            <h2 className="text-3xl font-bold text-white font-serif">Doimiy imtiyozlar</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {PERKS.map((perk, i) => (
              <FadeIn key={perk.title} delay={i * 0.07}>
                <div
                  className="flex items-start gap-4 p-6 rounded-2xl"
                  style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(253,224,128,0.1)" }}>
                    <perk.icon className="w-5 h-5" style={{ color: "#FDE080" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{perk.title}</h4>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{perk.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-32">
        <FadeIn>
          <div
            className="max-w-3xl mx-auto rounded-3xl p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(135deg, #1a0f00 0%, #0d0d0d 100%)", border: "1px solid rgba(253,224,128,0.12)" }}
          >
            <Sparkles className="w-10 h-10 mx-auto mb-4" style={{ color: "#FDE080" }} />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">Hoziroq buyurtma bering</h2>
            <p className="text-white/45 text-base mb-8">Aksiyalardan foydalaning va tejang</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={() => { router.push("/"); setTimeout(() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" }), 300); }}
                className="px-8 py-3.5 rounded-full font-semibold text-sm"
                style={{ backgroundColor: "#FDE080", color: "#0a0a0a" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Menyuni ko'rish
              </motion.button>
              <motion.button
                onClick={() => router.push("/order")}
                className="px-8 py-3.5 rounded-full font-semibold text-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.97 }}
              >
                Buyurtma berish
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
