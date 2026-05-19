"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { checkBranchOpen, getCloseTime, getOpenTime } from "@/lib/openStatus";

// ─── Coffee bean ─────────────────────────────────────────────
function Bean({ size = 52, rotate = 0 }: { size?: number; rotate?: number }) {
  const h = Math.round(size * 0.68);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 52 36"
      fill="none"
      style={{ display: "block", transform: `rotate(${rotate}deg)` }}
    >
      <ellipse cx="26" cy="18" rx="24.5" ry="16" fill="#424242" />
      <ellipse cx="26" cy="18" rx="24.5" ry="16" stroke="#585858" strokeWidth="1" fill="none" />
      <path
        d="M26 3.5 Q33.5 10 32.5 27 Q31.5 33.5 26 35"
        stroke="#1e1e1e"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Steam wisp ──────────────────────────────────────────────
function Steam({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        bottom: "2px",
        width: 5,
        borderRadius: 99,
        background:
          "linear-gradient(to top, rgba(255,255,255,0.5), rgba(255,255,255,0))",
        filter: "blur(3px)",
      }}
      animate={{
        height: [10, 45, 10],
        y: [0, -55, 0],
        opacity: [0, 0.6, 0],
        x: [0, delay % 2 === 0 ? 6 : -6, 0],
      }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Premium coffee cup ───────────────────────────────────────
function CoffeeCup({
  name,
  uid,
  tilt = 0,
  w = 220,
  showSteam = false,
}: {
  name: string;
  uid: string;
  tilt?: number;
  w?: number;
  showSteam?: boolean;
}) {
  const H = Math.round(w * 1.42);
  const words = name.split(" ");
  const line1 = words[0] ?? name;
  const line2 = words.slice(1).join(" ");
  const fs1 = line1.length > 9 ? 13 : line1.length > 6 ? 16 : 19;
  const fs2 = line2 ? (line2.length > 9 ? 11 : line2.length > 6 ? 13 : 15) : 0;

  return (
    <div style={{ position: "relative", width: w, height: H + (showSteam ? 60 : 0) }}>
      {/* Steam */}
      {showSteam && (
        <div style={{ position: "absolute", bottom: H - 6, left: 0, right: 0, height: 70 }}>
          <Steam delay={0}   x="35%" />
          <Steam delay={0.6} x="47%" />
          <Steam delay={1.2} x="60%" />
        </div>
      )}

      {/* Cup SVG */}
      <svg
        width={w}
        height={H}
        viewBox="0 0 220 312"
        style={{
          position: "absolute",
          bottom: 0,
          display: "block",
          transform: `rotate(${tilt}deg)`,
          filter:
            "drop-shadow(0 30px 60px rgba(253,224,128,0.32)) drop-shadow(0 8px 20px rgba(253,224,128,0.12))",
        }}
      >
        <defs>
          {/* Cup body — warm gold gradient */}
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#FFE97A" />
            <stop offset="20%"  stopColor="#FDE080" />
            <stop offset="62%"  stopColor="#F2C038" />
            <stop offset="100%" stopColor="#BE8A06" />
          </linearGradient>

          {/* Right-side body shadow */}
          <linearGradient id={`bs-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(0,0,0,0)"    />
            <stop offset="60%"  stopColor="rgba(0,0,0,0)"    />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </linearGradient>

          {/* Top-left ambient highlight */}
          <radialGradient id={`rg-${uid}`} cx="30%" cy="20%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
          </radialGradient>

          {/* Lid gradient */}
          <linearGradient id={`lg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#404040" />
            <stop offset="100%" stopColor="#0e0e0e" />
          </linearGradient>

          {/* Bottom glow */}
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(253,224,128,0.22)" />
            <stop offset="100%" stopColor="rgba(253,224,128,0)"    />
          </radialGradient>
        </defs>

        {/* ── Main body ── */}
        <path
          d="M 56,84 L 74,272 Q 76,288 110,288 Q 144,288 146,272 L 164,84 Z"
          fill={`url(#bg-${uid})`}
        />
        {/* Shadow overlay */}
        <path
          d="M 56,84 L 74,272 Q 76,288 110,288 Q 144,288 146,272 L 164,84 Z"
          fill={`url(#bs-${uid})`}
        />
        {/* Ambient radial highlight */}
        <path
          d="M 56,84 L 74,272 Q 76,288 110,288 Q 144,288 146,272 L 164,84 Z"
          fill={`url(#rg-${uid})`}
        />

        {/* Left highlight stripe */}
        <path
          d="M 67,102 Q 64,178 68,265"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* Secondary thin highlight */}
        <path
          d="M 80,105 Q 78,170 81,260"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Rim ── */}
        <ellipse cx="110" cy="84" rx="54" ry="12"  fill="#202020" />
        <ellipse cx="110" cy="81" rx="54" ry="9.5" fill="#383838" />
        <ellipse cx="110" cy="80" rx="54" ry="8"   fill="#2e2e2e" />

        {/* ── Lid ── */}
        <path
          d="M 59,81 Q 110,62 161,81 Q 157,43 110,38 Q 63,43 59,81 Z"
          fill={`url(#lg-${uid})`}
        />
        {/* Lid shine crease */}
        <path
          d="M 70,73 Q 110,63 150,73"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Lid bottom seam */}
        <path
          d="M 59,81 Q 110,72 161,81"
          stroke="#111"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Drink sipping hole */}
        <path
          d="M 84,55 Q 110,51 132,55 L 130,63 Q 110,60 86,63 Z"
          fill="#141414"
        />
        <path
          d="M 84,55 Q 110,51 132,55"
          stroke="#3a3a3a"
          strokeWidth="1.2"
          fill="none"
        />

        {/* ── Lid button ── */}
        <rect x="85" y="28" width="50" height="15" rx="7.5" fill="#1c1c1c" />
        <rect x="87" y="29" width="46" height="8"  rx="4"   fill="#2e2e2e" />
        {/* Button shine */}
        <rect x="91" y="30" width="18" height="4"  rx="2"   fill="rgba(255,255,255,0.10)" />

        {/* ── Embossed stripe on cup ── */}
        <path
          d="M 58,130 L 162,130"
          stroke="rgba(0,0,0,0.10)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 60,132 L 160,132"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          fill="none"
        />

        {/* ── Name text ── */}
        <text
          x="110"
          y={line2 ? "172" : "180"}
          textAnchor="middle"
          fontSize={fs1}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          fill="#0a0a0a"
          letterSpacing="1.8"
        >
          {line1}
        </text>
        {line2 && (
          <text
            x="110"
            y="190"
            textAnchor="middle"
            fontSize={fs2}
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="bold"
            fill="#0a0a0a"
            letterSpacing="1.2"
          >
            {line2}
          </text>
        )}
        {/* "coffee" label */}
        <text
          x="110"
          y={line2 ? "210" : "202"}
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="'Arial', sans-serif"
          fill="#0a0a0a"
          opacity={0.45}
          letterSpacing="5"
        >
          COFFEE
        </text>

        {/* ── Bottom glow reflection ── */}
        <ellipse cx="110" cy="288" rx="78" ry="14" fill={`url(#glow-${uid})`} />
        <ellipse cx="110" cy="296" rx="50" ry="6"  fill="rgba(0,0,0,0.25)" />
      </svg>
    </div>
  );
}

// ─── Bean scatter config ──────────────────────────────────────
const BEANS = [
  { top: "5%",  left: "2%",  size: 58, rot: -28, op: 0.72, fy: 10, dl: 0.0 },
  { top: "8%",  left: "78%", size: 62, rot: -14, op: 0.68, fy: 8,  dl: 0.9 },
  { top: "38%", left: "95%", size: 56, rot: -46, op: 0.65, fy: 11, dl: 0.3 },
  { top: "72%", left: "92%", size: 50, rot: -18, op: 0.68, fy: 10, dl: 0.7 },
  { top: "88%", left: "52%", size: 58, rot: -8,  op: 0.65, fy: 11, dl: 0.4 },
  { top: "82%", left: "14%", size: 50, rot:  50, op: 0.62, fy: 9,  dl: 1.8 },
  { top: "45%", left: "1%",  size: 60, rot:  18, op: 0.68, fy: 12, dl: 1.4 },
  { top: "26%", left: "8%",  size: 44, rot: -22, op: 0.62, fy: 8,  dl: 0.6 },
];

// ─── Hero ─────────────────────────────────────────────────────
export default function Hero() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const cupsParallax   = useTransform(scrollY, [0, 600], [0, 100]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const mainBranch = CAFE_CONFIG.branches[0];
  const isOpen     = checkBranchOpen(mainBranch.workHours);
  const timeLabel  = isOpen ? getCloseTime(mainBranch.workHours) : getOpenTime(mainBranch.workHours);
  const cafeName   = CAFE_CONFIG.name;

  return (
    <section id="home" className="relative h-screen min-h-150 overflow-hidden bg-[#030303]">

      {/* ── Coffee beans scattered in background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BEANS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: b.top, left: b.left, opacity: b.op }}
            animate={{ y: [0, -b.fy, 0], rotate: [0, b.rot > 0 ? 6 : -6, 0] }}
            transition={{
              duration: 3.8 + (i % 5) * 0.55,
              delay: b.dl,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Bean size={b.size} rotate={b.rot} />
          </motion.div>
        ))}
      </div>

      {/* ── Large cup — right side (upright, desktop only) ── */}
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ right: "2%", top: "4%", y: cupsParallax }}
        animate={{
          y: [0, -18, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          y:      { duration: 4.6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <CoffeeCup name={cafeName} uid="a" tilt={-4} w={210} showSteam />
      </motion.div>

      {/* ── Small cup — left side (tilted / upside-down, desktop only) ── */}
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ left: "1%", bottom: "8%", y: cupsParallax }}
        animate={{
          y: [0, -14, 0],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          y:      { duration: 5.4, delay: 1.0, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7.0, delay: 0.4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <CoffeeCup name={cafeName} uid="b" tilt={163} w={170} />
      </motion.div>

      {/* ── Mobile cup (top-right corner, clipped) ── */}
      <motion.div
        className="absolute pointer-events-none block lg:hidden"
        style={{ right: "-18%", top: "-4%", opacity: 0.55 }}
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{
          y:      { duration: 4.6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <CoffeeCup name={cafeName} uid="m1" tilt={-8} w={180} showSteam />
      </motion.div>

      {/* ── Mobile cup (bottom-left corner, clipped) ── */}
      <motion.div
        className="absolute pointer-events-none block lg:hidden"
        style={{ left: "-20%", bottom: "-4%", opacity: 0.50 }}
        animate={{ y: [0, -9, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{
          y:      { duration: 5.4, delay: 1.0, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7.0, delay: 0.4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <CoffeeCup name={cafeName} uid="m2" tilt={155} w={155} />
      </motion.div>

      {/* ── Center radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 52%, rgba(253,224,128,0.055) 0%, transparent 70%)",
        }}
      />

      {/* ── Hero text content ── */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: contentOpacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="mb-5"
        >
          <span className="inline-block px-5 py-2 bg-[#FDE080]/15 backdrop-blur-sm border border-[#FDE080]/30 text-[#FDE080] text-sm rounded-full font-medium tracking-widest uppercase">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Cafe name */}
        <motion.h1
          initial={{ opacity: 0, y: 56, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 font-serif leading-tight"
        >
          {cafeName}ga!
        </motion.h1>

        {/* Open / closed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58 }}
          className="mb-5"
        >
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-semibold border ${
              isOpen
                ? "bg-green-500/15 border-green-400/30 text-green-300"
                : "bg-red-500/15 border-red-400/30 text-red-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
            />
            {isOpen ? t.openStatus.open : t.openStatus.closed}
            <span className="w-px h-3.5 bg-white/20" />
            <span className="text-white/60 font-normal text-xs">
              {isOpen ? t.openStatus.closed : t.openStatus.opensAt} {timeLabel}
            </span>
          </div>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/65 mb-10 max-w-2xl leading-relaxed"
        >
          {CAFE_CONFIG.slogan}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={() => scrollTo("#menu")}
            className="px-9 py-4 bg-[#FDE080] text-[#0a0a0a] rounded-full font-semibold text-lg hover:bg-[#e8cc6a] transition-all shadow-2xl shadow-[#FDE080]/20"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
          >
            {t.hero.btnMenu}
          </motion.button>
          <motion.button
            onClick={() => scrollTo("#order")}
            className="px-9 py-4 bg-white/8 backdrop-blur-sm text-white border border-white/25 rounded-full font-semibold text-lg hover:bg-white/15 transition-all"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
          >
            {t.hero.btnOrder}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 text-[#FDE080]/50" />
      </motion.div>
    </section>
  );
}
