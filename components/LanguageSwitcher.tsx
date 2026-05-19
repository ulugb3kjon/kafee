"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { useLang, Lang } from "@/contexts/LanguageContext";

const FLAGS: Record<Lang, { src: string; label: string; native: string }> = {
  uz: { src: "https://flagcdn.com/w40/uz.png", label: "UZ", native: "O'zbek" },
  ru: { src: "https://flagcdn.com/w40/ru.png", label: "RU", native: "Русский" },
  en: { src: "https://flagcdn.com/w40/gb.png", label: "EN", native: "English" },
};

const LANGS: Lang[] = ["uz", "ru", "en"];

interface Props {
  scrolled: boolean;
}

export default function LanguageSwitcher({ scrolled: _scrolled }: Props) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        style={{
          border: `1px solid ${open ? "rgba(253,224,128,0.3)" : "rgba(255,255,255,0.1)"}`,
          color: open ? "#FDE080" : "rgba(255,255,255,0.65)",
          backgroundColor: open ? "rgba(253,224,128,0.07)" : "transparent",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={FLAGS[lang].src}
          alt={FLAGS[lang].label}
          style={{ width: 22, height: 15, borderRadius: 3, objectFit: "cover" }}
        />
        <span className="tracking-wide">{FLAGS[lang].label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <Globe className="w-3.5 h-3.5 opacity-60" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 bottom-full mb-3 z-50"
            style={{
              minWidth: 178,
              backgroundColor: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              boxShadow: "0 -12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
              padding: 6,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 px-3 pt-2 pb-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 4 }}
            >
              <Globe className="w-3 h-3 opacity-30" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold">
                Til tanlash
              </span>
            </div>

            {LANGS.map((l, i) => {
              const active = l === lang;
              return (
                <motion.button
                  key={l}
                  onClick={() => { setLang(l); setOpen(false); }}
                  className="flex items-center gap-3 w-full text-sm"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: i * 0.055, duration: 0.22 } }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    padding: "9px 12px",
                    borderRadius: 10,
                    backgroundColor: active ? "rgba(253,224,128,0.1)" : "transparent",
                    color: active ? "#FDE080" : "rgba(255,255,255,0.55)",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={FLAGS[l].src}
                    alt={FLAGS[l].label}
                    style={{
                      width: 26, height: 17, borderRadius: 4, objectFit: "cover",
                      opacity: active ? 1 : 0.65,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}
                  />
                  <span className="font-medium flex-1 text-left">{FLAGS[l].native}</span>
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "#FDE080" }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
