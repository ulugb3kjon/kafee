"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLang, Lang } from "@/contexts/LanguageContext";

const FLAGS: Record<Lang, { src: string; alt: string }> = {
  uz: { src: "https://flagcdn.com/w40/uz.png", alt: "UZ" },
  ru: { src: "https://flagcdn.com/w40/ru.png", alt: "RU" },
  en: { src: "https://flagcdn.com/w40/gb.png", alt: "EN" },
};

const NAMES: Record<Lang, string> = {
  uz: "O'zbek",
  ru: "Русский",
  en: "English",
};

interface Props {
  scrolled: boolean;
}

export default function LanguageSwitcher({ scrolled }: Props) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const langs = (["uz", "ru", "en"] as Lang[]).filter((l) => l !== lang);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm font-medium ${
          scrolled
            ? "border-amber-200 text-amber-800 hover:bg-amber-50"
            : "border-white/30 text-white hover:bg-white/10"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={FLAGS[lang].src}
          alt={FLAGS[lang].alt}
          width={20}
          height={14}
          className="rounded-sm object-cover"
          style={{ width: 20, height: 14 }}
        />
        <span className="hidden sm:inline">{t.lang[lang]}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-37.5"
          >
            {langs.map((l) => (
              <motion.button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                whileHover={{ x: 3 }}
              >
                <img
                  src={FLAGS[l].src}
                  alt={FLAGS[l].alt}
                  width={22}
                  height={15}
                  className="rounded-sm object-cover shadow-sm"
                  style={{ width: 22, height: 15 }}
                />
                <span className="font-medium">{NAMES[l]}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
