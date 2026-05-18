"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { uz, Translations } from "@/messages/uz";
import { ru } from "@/messages/ru";
import { en } from "@/messages/en";

export type Lang = "uz" | "ru" | "en";
const translations: Record<Lang, Translations> = { uz, ru, en };

const LanguageContext = createContext<{
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}>({ lang: "uz", t: uz, setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = localStorage.getItem("kafe_lang") as Lang | null;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kafe_lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
