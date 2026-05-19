"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

type L = "uz" | "ru" | "en";
type ML = Record<L, string>;

type Coffee = {
  id: string;
  name: ML;
  sub: ML;
  desc: ML;
  image: string;
  bg: string;
  glow: string;
  accent: string;
};

const COFFEES: Coffee[] = [
  {
    id: "espresso",
    name: { uz: "Espresso",   ru: "Эспрессо",   en: "Espresso"   },
    sub:  { uz: "Kuchli va sof", ru: "Крепкий и чистый", en: "Strong & Pure" },
    desc: {
      uz: "Italiyaning eng mashhur kofe uslubi. Kuchli, konsentrlangan va to'yimli ta'm.",
      ru: "Самый известный итальянский кофе. Крепкий, концентрированный.",
      en: "Italy's most iconic coffee. Strong, concentrated, full-bodied.",
    },
    image: "/coffees/espresso.png",
    bg: "#0c0400",
    glow: "rgba(175,75,10,0.55)",
    accent: "#c4601a",
  },
  {
    id: "cappuccino",
    name: { uz: "Cappuccino", ru: "Капучино",    en: "Cappuccino" },
    sub:  { uz: "Yumshoq va ko'pikli", ru: "Нежный и пенистый", en: "Soft & Foamy" },
    desc: {
      uz: "Espresso va ipak ko'pik bilan. Har bir qultumda mayin va issiq hissiyot.",
      ru: "Эспрессо с шёлковой пенкой. Нежное и тёплое ощущение.",
      en: "Espresso with silky microfoam. Warm and velvety in every sip.",
    },
    image: "/coffees/cappuccino.png",
    bg: "#150800",
    glow: "rgba(205,145,55,0.48)",
    accent: "#c49038",
  },
  {
    id: "latte",
    name: { uz: "Latte Art",  ru: "Латте Арт",  en: "Latte Art"  },
    sub:  { uz: "San'at ichimlik", ru: "Искусство в стакане", en: "Art in a Cup" },
    desc: {
      uz: "Ko'zingizni ham, ko'nglingizni ham qondiruvchi latte. Bir kosa — bir san'at.",
      ru: "Латте, которое радует глаза и душу. Одна чашка — произведение.",
      en: "Latte that delights eyes and soul. One cup — one masterpiece.",
    },
    image: "/coffees/latte-art.png",
    bg: "#0f0a00",
    glow: "rgba(195,158,22,0.45)",
    accent: "#b89820",
  },
  {
    id: "mocha",
    name: { uz: "Mocha",      ru: "Мокко",      en: "Mocha"      },
    sub:  { uz: "Shokolad va kofe", ru: "Шоколад и кофе", en: "Chocolate & Coffee" },
    desc: {
      uz: "Shokoladning mayin ta'mi va kofening kuchi bir kosada. Tatlisevarlar uchun.",
      ru: "Нежный шоколад и сила кофе в одной чашке. Для любителей сладкого.",
      en: "Chocolate's sweetness meets coffee's strength. For the sweet-toothed.",
    },
    image: "/coffees/mocha.png",
    bg: "#100208",
    glow: "rgba(155,28,55,0.52)",
    accent: "#a01e3a",
  },
  {
    id: "americano",
    name: { uz: "Americano",  ru: "Американо",  en: "Americano"  },
    sub:  { uz: "Sof va kuchli", ru: "Чистый и крепкий", en: "Bold & Clean" },
    desc: {
      uz: "Espressoning kuchi, suv bilan yumshatilgan. Oddiy, lekin beqiyos lazzatli.",
      ru: "Сила эспрессо, смягчённая водой. Просто, но непревзойдённо вкусно.",
      en: "Espresso's power, mellowed with water. Simple, honest, irresistible.",
    },
    image: "/coffees/americano.png",
    bg: "#03050e",
    glow: "rgba(55,78,195,0.48)",
    accent: "#4a62cc",
  },
  {
    id: "coldbrew",
    name: { uz: "Cold Brew",  ru: "Колд Брю",   en: "Cold Brew"  },
    sub:  { uz: "Sovuq va yangilovchi", ru: "Холодный и освежающий", en: "Chilled & Fresh" },
    desc: {
      uz: "12 soat sovuq suvda dmlangan kofe. Yoz kunlarida ruhingizni ko'taradi.",
      ru: "Кофе, настоянный 12 часов. Освежает в летние дни.",
      en: "Steeped cold for 12 hours. Smooth, strong, perfect for warm days.",
    },
    image: "/coffees/coldbrew.png",
    bg: "#011012",
    glow: "rgba(12,128,138,0.48)",
    accent: "#0e8fa0",
  },
];

const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Bir xil tezlik + easing → konveyer hissi
const CYCLE_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const CYCLE_DUR = 1.05;
const ENTER_EASE = CYCLE_EASE;

// Rasm: opacity YO'Q — panel overflow:hidden burchakda kesadi
// d=1:  o'ng-tepadan kirib → o'ng-pastga ketadi
// d=-1: o'ng-pastdan kirib → o'ng-tepaga ketadi
const D = 620; // doira paneldan to'liq chiqib ketadi (radius 150px + panel yarim kengligi)

const imgVariants = {
  enter: (d: number) => ({ x: D, y: d * -D }),
  show:  { x: 0, y: 0,
           transition: { duration: CYCLE_DUR, ease: CYCLE_EASE } },
  exit:  (d: number) => ({ x: D, y: d * D,
           transition: { duration: CYCLE_DUR, ease: CYCLE_EASE } }),
};

// past-chap: cx=-165, cy=300 | past-o'ng: cx=165, cy=300
const BEANS = [
  { src: "/coffees/telegram-cloud-document-2-5217780992806267172.jpg", size: 72,  cls: "absolute -top-12 -left-10",    cx: -165, cy: 300, opacity: 0.88, float: { y:[0,-9,0], rotate:[0,20,0]    }, dur: 3.8, fDelay: 0,   eDelay: 0.12 },
  { src: "/coffees/telegram-cloud-document-2-5217780992806267173.jpg", size: 58,  cls: "absolute -top-10 -right-8",    cx:  165, cy: 300, opacity: 0.78, float: { y:[0,-8,0], rotate:[-12,10,-12] }, dur: 4.4, fDelay: 0.6, eDelay: 0.08 },
  { src: "/coffees/telegram-cloud-document-2-5217780992806267174.jpg", size: 64,  cls: "absolute -bottom-11 -right-9", cx:  165, cy: 300, opacity: 0.82, float: { y:[0,-9,0], rotate:[0,-18,0]   }, dur: 3.6, fDelay: 1.0, eDelay: 0    },
  { src: "/coffees/telegram-cloud-document-2-5217780992806267172.jpg", size: 54,  cls: "absolute -bottom-9 -left-7",   cx: -165, cy: 300, opacity: 0.72, float: { y:[0,-7,0], rotate:[10,-10,10]  }, dur: 4.8, fDelay: 0.3, eDelay: 0    },
];

const shadowVariants = {
  enter: (d: number) => ({ x: D * 0.6, y: d * -D * 0.4, opacity: 0, scaleX: 0.4 }),
  show:  { x: 0, y: 0, opacity: 1, scaleX: 1,
           transition: { duration: CYCLE_DUR, ease: CYCLE_EASE } },
  exit:  (d: number) => ({ x: D * 0.6, y: d * D * 0.4, opacity: 0, scaleX: 0.4,
           transition: { duration: CYCLE_DUR, ease: CYCLE_EASE } }),
};

// Qoshiq: tepadan tushib kelsin → past chap burchakka ketadi
const spoonVariants = {
  enter: { x: 0, y: -D },
  show:  { x: 0, y: 0,   transition: { duration: CYCLE_DUR, ease: CYCLE_EASE } },
  exit:  { x: -D, y: D,  transition: { duration: CYCLE_DUR, ease: CYCLE_EASE } },
};



export default function CoffeeShowcase() {
  const { lang } = useLang();
  const l = lang as L;
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1); // 1 = oldinga, -1 = orqaga
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const coffee = COFFEES[active];

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % COFFEES.length);
    }, 5000);
  }, []);

  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setActive(p => {
      const next = p + d;
      if (next < 0 || next >= COFFEES.length) return p;
      return next;
    });
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const goTo = (idx: number) => {
    setDir(idx >= active ? 1 : -1);
    setActive(idx);
    resetTimer();
  };

  const menuLabel =
    l === "uz" ? "Menuga o'tish" :
    l === "ru" ? "Перейти в меню" : "View Menu";

  return (
    <section className="relative flex flex-col md:flex-row min-h-screen overflow-hidden" style={{ backgroundColor: "#0d0d0d" }}>

      {/* ─────────────────── LEFT — Image panel ──────────────── */}
      <div className="relative w-full md:w-1/2 flex-1 md:flex-none min-h-[45vh] md:min-h-screen overflow-hidden">

        {/* Background curtain — slides in from top on change */}
        {/* Dark fallback so there's no white flash between transitions */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${active}`}
            className="absolute inset-0"
            style={{ backgroundColor: coffee.bg }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)"   }}
            exit={{    clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: CURTAIN_EASE } }}
            transition={{ duration: 1.1, ease: CURTAIN_EASE }}
          />
        </AnimatePresence>

        {/* Dot-grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.018,
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 60% at 50% 52%, ${coffee.glow}, transparent 68%)`,
            transition: "background 0.9s ease",
          }}
        />

        {/* Image + decorations — centered together */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 sm:p-10 md:p-16">
          {/* Shared container sized to the circle — decorations use negative offsets to sit just outside */}
          <div
            className="relative"
            style={{
              width:  "clamp(160px, 42vw, 300px)",
              height: "clamp(160px, 42vw, 300px)",
              color: coffee.accent,
              transition: "color 0.85s ease",
            }}
          >
            {/* Decorations */}
            <AnimatePresence initial={false}>
              <motion.div
                key={`decors-${active}`}
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.05 } }}
                exit={{ opacity: 0, transition: { duration: CYCLE_DUR } }}
              >
                {BEANS.map((b, i) => (
                  <motion.div
                    key={i}
                    className={b.cls}
                    initial={{ x: b.cx, y: b.cy, scale: 0.08, opacity: 0 }}
                    animate={{ x: 0, y: 0, scale: 1, opacity: b.opacity,
                      transition: { duration: 0.85, ease: CYCLE_EASE, delay: i * 0.1 } }}
                    exit={{ x: b.cx, y: b.cy, scale: 0.08, opacity: 0,
                      transition: { duration: 0.6, ease: CYCLE_EASE, delay: b.eDelay } }}
                  >
                    <motion.div
                      animate={b.float}
                      transition={{ duration: b.dur, delay: b.fDelay, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img src={b.src} alt=""
                        style={{ width: `clamp(${Math.round(b.size*0.5)}px, ${b.size*0.14}vw, ${b.size}px)`, height: `clamp(${Math.round(b.size*0.5)}px, ${b.size*0.14}vw, ${b.size}px)`, objectFit: "contain", mixBlendMode: "multiply" }} />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Coffee image + spoon — birgalikda harakatlanadi */}
            {/* Qoshiq — o'ng tepadan kirib, chap pastga ketadi */}
            <AnimatePresence>
              <motion.div
                key={`spoon-${active}`}
                variants={spoonVariants}
                initial="enter"
                animate="show"
                exit="exit"
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: "-32%" }}
              >
                <img
                  src="/coffees/telegram-cloud-document-2-5217780992806267035.jpg"
                  alt="spoon"
                  style={{ height: "clamp(120px, 22vw, 280px)", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence custom={dir}>
              <motion.div
                key={`img-${active}`}
                custom={dir}
                variants={imgVariants}
                initial="enter"
                animate="show"
                exit="exit"
                className="absolute inset-0"
              >
                {/* Doira + rasm */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-white/10"
                  style={{
                    boxShadow: [
                      `0 0   40px ${coffee.glow}`,
                      `0 18px 35px rgba(0,0,0,0.55)`,
                      `0 35px 60px rgba(0,0,0,0.35)`,
                      `inset 0 -12px 24px rgba(0,0,0,0.30)`,
                      `inset 0  6px 14px rgba(255,255,255,0.06)`,
                    ].join(", "),
                  }}
                >
                  <img
                    src={coffee.image}
                    alt={coffee.name[l]}
                    className="w-full h-full object-cover"
                    style={{ transform: "scale(1.42)", transformOrigin: "center", mixBlendMode: "screen" }}
                    onError={e => { (e.target as HTMLImageElement).src = "/coffees/americano.png"; }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Ground shadow */}
            <AnimatePresence custom={dir}>
              <motion.div
                key={`shadow-${active}`}
                custom={dir}
                variants={shadowVariants}
                initial="enter"
                animate="show"
                exit="exit"
                className="absolute pointer-events-none"
                style={{ bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: "88%", height: "28px" }}
              >
                <div style={{
                  width: "100%", height: "100%",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.45)",
                  filter: "blur(12px)",
                }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─────────────────── CENTER — Dot navigation ─────────── */}
      <div className="absolute right-3 md:right-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5 items-center">
        {COFFEES.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => goTo(i)}
            aria-label={c.name[l]}
            className="rounded-full block cursor-pointer"
            style={{ backgroundColor: c.accent }}
            animate={{
              width:     i === active ? 22 : 12,
              height:    i === active ? 22 : 12,
              opacity:   i === active ? 1 : 0.45,
              boxShadow: i === active ? `0 0 18px ${c.accent}95` : "none",
            }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            whileHover={{ scale: 1.35, opacity: 1 }}
            whileTap={{ scale: 0.85 }}
          />
        ))}
      </div>

      {/* ─────────────────── RIGHT — Text panel ──────────────── */}
      <div
        className="relative w-full md:w-1/2 flex items-center px-6 md:px-12 lg:px-20 py-8 md:py-0 overflow-hidden"
        style={{ backgroundColor: "#0d0d0d", minHeight: "38vh" }}
      >
        {/* Subtle left border */}
        <div className="hidden md:block absolute left-0 top-[16%] bottom-[16%] w-px bg-linear-to-b from-transparent via-white/6 to-transparent pointer-events-none" />

        {/* Text content — slides up from bottom on change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`txt-${active}`}
            className="w-full max-w-md"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{    y: -20, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Name */}
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white font-serif leading-[0.92] tracking-tight mb-3 md:mb-5">
              {coffee.name[l]}
            </h2>

            {/* Sub-label */}
            <div className="flex items-center gap-3 mb-4 md:mb-7">
              <div className="h-px w-6 shrink-0" style={{ backgroundColor: `${coffee.accent}55` }} />
              <p
                className="text-[11px] font-bold tracking-[0.32em] uppercase"
                style={{ color: coffee.accent }}
              >
                {coffee.sub[l]}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/40 text-[13px] md:text-[15px] leading-relaxed mb-6 md:mb-10">
              {coffee.desc[l]}
            </p>

            {/* CTA button — accent color */}
            <motion.button
              onClick={() =>
                document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2.5 font-semibold px-7 py-3.5 rounded-full text-[#0a0a0a] text-sm shadow-lg"
              style={{ backgroundColor: coffee.accent }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.16 }}
            >
              {menuLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Prev / Next navigation */}
            <div className="flex items-center gap-3 mt-4 md:mt-8">
              <motion.button
                onClick={() => go(-1)}
                disabled={active === 0}
                className="w-11 h-11 rounded-full border flex items-center justify-center disabled:opacity-25 transition-opacity"
                style={{ borderColor: `${coffee.accent}55`, color: coffee.accent }}
                whileHover={{ scale: 1.12, borderColor: coffee.accent }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={() => go(1)}
                disabled={active === COFFEES.length - 1}
                className="w-11 h-11 rounded-full border flex items-center justify-center disabled:opacity-25 transition-opacity"
                style={{ borderColor: `${coffee.accent}55`, color: coffee.accent }}
                whileHover={{ scale: 1.12, borderColor: coffee.accent }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>

              <span className="text-white/25 text-[11px] font-mono tracking-widest ml-1">
                {String(active + 1).padStart(2, "0")} / {String(COFFEES.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
