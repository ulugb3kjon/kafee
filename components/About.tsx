"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let c = 0;
        const steps = 50;
        const timer = setInterval(() => {
          c += target / steps;
          if (c >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(c));
        }, 1400 / steps);
        return () => clearInterval(timer);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const router = useRouter();
  const { t } = useLang();
  const statLabels = [t.about.stats.clients, t.about.stats.dishes, t.about.stats.years, t.about.stats.branches];

  return (
    <section id="about" className="py-24 overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Badge + headline */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            {t.about.badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-5 font-serif leading-[1.05] tracking-tight">
            {CAFE_CONFIG.name}
          </h2>
          <p className="text-white/38 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {t.about.text}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}
        >
          {CAFE_CONFIG.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <span className="text-3xl md:text-4xl font-bold" style={{ color: "#FDE080" }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <p className="text-xs mt-2 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>
                {statLabels[i]}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => router.push("/about")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{
              backgroundColor: "#FDE080",
              borderColor: "#FDE080",
              color: "#0a0a0a",
              scale: 1.03,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            {t.about.badge} — batafsil
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
