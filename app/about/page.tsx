"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Coffee, Zap, Leaf, Sofa, MapPin, Clock, Star, Award, Heart, ChevronDown } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";

/* ─── Animated counter ─── */
function Counter({ target, suffix, duration = 1600 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let c = 0;
        const steps = 60;
        const timer = setInterval(() => {
          c += target / steps;
          if (c >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(c));
        }, duration / steps);
        return () => clearInterval(timer);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Fade-in on scroll ─── */
function FadeIn({ children, delay = 0, y = 32, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const PHOTOS = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
];

const TIMELINE = [
  { year: "2020", title: "Ochildi", desc: "Chilonzor tumanida birinchi filial ochildi. Kichik, lekin yurak-yurakdan qilingan joy." },
  { year: "2021", title: "O'sish", desc: "Mijozlar ishonchi ortdi, retseptlarimiz yangilandi. Yangi baristalar jamoasi shakllandi." },
  { year: "2022", title: "Kengayish", desc: "Yunusobod filiali ochildi. Yetkazib berish xizmati ishga tushirildi." },
  { year: "2023", title: "Mukofot", desc: "Toshkentning eng yaxshi kafesi sovriniga sazovor bo'ldik. 1000+ doimiy mijoz." },
  { year: "2024", title: "Bugun", desc: "3 filial, 50+ taom turi, har kuni yangi qovurilgan kofe." },
];

const VALUES = [
  { icon: <Coffee className="w-6 h-6" />, title: "Sifat", desc: "Arabika va robusta aralashmasi, har kuni yangi qovurilgan. Faqat premium donalar ishlatiladi." },
  { icon: <Heart className="w-6 h-6" />, title: "Mehribon xizmat", desc: "Har bir mehmon bizning oilamiz. Xizmat sifati bizning asosiy ustuvorligimiz." },
  { icon: <Leaf className="w-6 h-6" />, title: "Tabiiy mahsulotlar", desc: "Faqat eng taza va sifatli ingredientlardan foydalanamiz. Kimyoviy qo'shimchalar yo'q." },
  { icon: <Zap className="w-6 h-6" />, title: "Tezkor yetkazish", desc: "30-60 daqiqa ichida eshigingizga yetkazamiz. Issiq va mazali holda." },
  { icon: <Sofa className="w-6 h-6" />, title: "Qulay muhit", desc: "Dam olish, ishlash yoki do'stlar bilan uchrashuv uchun ideal muhit yaratilgan." },
  { icon: <Award className="w-6 h-6" />, title: "Tajriba", desc: "2020-yildan beri 5 yil davomida har kuni yangi narsalar o'rganib, rivojlanib kelmoqdamiz." },
];

export default function AboutPage() {
  const router = useRouter();
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const statLabels = [t.about.stats.clients, t.about.stats.dishes, t.about.stats.years, t.about.stats.branches];

  return (
    <div style={{ backgroundColor: "#060606", color: "#fff", minHeight: "100vh" }}>

      {/* ── Fixed top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center gap-4 px-5 md:px-10"
        style={{ height: 64, backgroundColor: "rgba(6,6,6,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <motion.button
          onClick={() => router.back()}
          className="flex items-center justify-center shrink-0"
          style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}
          whileHover={{ scale: 1.08, borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FDE080" }}>
            <Coffee className="w-3.5 h-3.5 text-[#0a0a0a]" />
          </div>
          <span className="font-serif font-bold">{CAFE_CONFIG.name}</span>
        </div>
      </header>

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&h=1000&fit=crop"
            alt="Kafe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #060606 0%, rgba(6,6,6,0.6) 50%, rgba(6,6,6,0.2) 100%)" }} />
        </motion.div>

        <motion.div className="relative z-10 w-full px-6 md:px-16 pb-24 pt-32" style={{ opacity: heroOpacity }}>
          <FadeIn>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#FDE080" }}>
              {t.about.badge}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold font-serif leading-[0.92] tracking-tight mt-4 mb-6">
              {CAFE_CONFIG.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-2xl max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              {CAFE_CONFIG.slogan}
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div className="flex items-center gap-2 mt-10" style={{ color: "rgba(255,255,255,0.25)" }}>
              <ChevronDown className="w-5 h-5 animate-bounce" />
              <span className="text-xs uppercase tracking-widest">Pastga aylantiring</span>
            </div>
          </FadeIn>
        </motion.div>
      </div>

      {/* ── STORY ── */}
      <section className="py-32 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
              Bizning hikoya
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 leading-tight">
              Kofe — bu shunchaki ichimlik emas
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t.about.text}
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              Biz 2020-yilda oddiy bir orzudan yo'lga chiqdik — odamlarga uydan tashqarida ham uyda o'tgandek his qildiradigan joy yaratish. Har bir stol, har bir stakan, har bir tabassum bu orzuning bir qismi.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Bugun biz Toshkentning 3 tumanida ishlab turibmiz. Lekin qalbimiz hali ham o'sha 2020-yildagi birinchi finjon kofe kabi issiq.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24" style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 24, overflow: "hidden" }}>
            {CAFE_CONFIG.stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center" style={{ backgroundColor: "#0d0d0d" }}>
                  <span className="text-4xl md:text-6xl font-bold font-serif" style={{ color: "#FDE080" }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className="text-xs mt-3 uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {statLabels[i]}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-32 px-6 md:px-16 max-w-4xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            Tarix
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">Bizning yo'l</h2>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "rgba(255,255,255,0.07)", transform: "translateX(-50%)" }} />
          {TIMELINE.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} className={`relative flex gap-8 md:gap-0 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Dot */}
              <div className="absolute left-[18px] md:left-1/2 w-3 h-3 rounded-full top-2" style={{ backgroundColor: "#FDE080", transform: "translateX(-50%)", boxShadow: "0 0 12px rgba(253,224,128,0.5)" }} />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <span className="text-3xl font-bold font-serif" style={{ color: "#FDE080" }}>{item.year}</span>
                <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24" style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <FadeIn className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
              Qadriyatlarimiz
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">{t.about.title}</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div
                  className="p-6 rounded-2xl h-full"
                  style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
                  whileHover={{ borderColor: "rgba(253,224,128,0.2)", y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(253,224,128,0.1)", color: "#FDE080" }}>
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{v.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            Galereya
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">Bizning joyi</h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {PHOTOS.map((src, i) => (
            <FadeIn key={i} delay={i * 0.08} className={i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""}>
              <motion.div
                className="overflow-hidden rounded-2xl"
                style={{ height: i === 0 ? 320 : 180 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={src} alt=""
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section className="py-24" style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <FadeIn className="text-center mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
              Manzillar
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">Filiallar</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {CAFE_CONFIG.branches.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.07)" }}
                  whileHover={{ borderColor: "rgba(253,224,128,0.2)", y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(253,224,128,0.1)" }}>
                    <MapPin className="w-5 h-5" style={{ color: "#FDE080" }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{b.name}</h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{b.address}</p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{b.workHours}</span>
                  </div>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="block mt-3 text-sm font-semibold hover:underline transition-colors"
                    style={{ color: "#FDE080" }}
                  >
                    {b.phone}
                  </a>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── */}
      <section className="py-36 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <FadeIn>
          <div className="w-12 h-px mx-auto mb-10" style={{ backgroundColor: "rgba(253,224,128,0.4)" }} />
          <p className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-10" style={{ color: "rgba(255,255,255,0.88)" }}>
            "Har bir finjon kofe — bu bir lahzalik baxt. Biz o'sha baxtni yaratish uchun mavjudmiz."
          </p>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4" style={{ color: "#FDE080" }} />
            <span className="text-sm uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {CAFE_CONFIG.name} — 2020
            </span>
            <Star className="w-4 h-4" style={{ color: "#FDE080" }} />
          </div>
          <div className="w-12 h-px mx-auto mt-10" style={{ backgroundColor: "rgba(253,224,128,0.4)" }} />
        </FadeIn>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 text-center" style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <FadeIn>
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            Keyingi qadam
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-4">Menyuni ko'ring</h2>
          <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>
            50+ taom va ichimlik sizni kutmoqda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => { router.push("/"); setTimeout(() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" }), 400); }}
              className="px-10 py-4 rounded-full font-bold text-sm"
              style={{ backgroundColor: "#FDE080", color: "#0a0a0a" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Menyuni ko'rish
            </motion.button>
            <motion.button
              onClick={() => router.push("/order")}
              className="px-10 py-4 rounded-full font-semibold text-sm"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
              whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
            >
              Buyurtma berish
            </motion.button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
