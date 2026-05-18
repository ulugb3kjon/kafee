"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Zap, Leaf, Sofa } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, slideLeft, slideRight, stagger, staggerItem, VIEWPORT, cardHover } from "@/lib/animations";

const ICONS = [
  <Coffee key="c" className="w-6 h-6" />,
  <Sofa key="s" className="w-6 h-6" />,
  <Zap key="z" className="w-6 h-6" />,
  <Leaf key="l" className="w-6 h-6" />,
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCount(0);
        let c = 0;
        const steps = 50;
        const timer = setInterval(() => {
          c += target / steps;
          if (c >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(c));
        }, 1600 / steps);
        return () => clearInterval(timer);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="text-3xl md:text-4xl font-bold text-amber-800">{count}{suffix}</span>;
}

export default function About() {
  const { t } = useLang();
  const statLabels = [t.about.stats.clients, t.about.stats.dishes, t.about.stats.years, t.about.stats.branches];

  return (
    <section id="about" className="py-20 bg-amber-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} className="text-center mb-16">
          <span className="text-amber-700 font-medium uppercase tracking-widest text-sm">{t.about.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 font-serif">{CAFE_CONFIG.name}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">{t.about.text}</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {CAFE_CONFIG.stats.map((stat, i) => (
            <motion.div key={i} variants={staggerItem} className="text-center bg-white rounded-2xl p-6 shadow-sm" whileHover={cardHover}>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-gray-500 mt-2 text-sm">{statLabels[i]}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={slideLeft} className="grid grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop",
            ].map((src, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? "col-span-2" : ""}`}>
                <img src={src} alt="" className={`w-full object-cover ${i === 0 ? "h-48" : "h-36"}`} />
              </div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={slideRight}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">{t.about.title}</h3>
            <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={stagger} className="space-y-4">
              {t.about.features.map((f, i) => (
                <motion.div key={i} variants={staggerItem} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm" whileHover={cardHover}>
                  <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800 shrink-0">
                    {ICONS[i]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-0.5">{f.title}</h4>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
