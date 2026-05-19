"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Menu, X, ShoppingCart } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { CartItem } from "@/types";
import { useLang } from "@/contexts/LanguageContext";
import { checkBranchOpen } from "@/lib/openStatus";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

export default function Header({ cartItems, onCartClick }: HeaderProps) {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cafeOpen = checkBranchOpen(CAFE_CONFIG.branches[0].workHours);

  const NAV = [
    { href: "#home", label: t.nav.home },
    { href: "#menu", label: t.nav.menu },
    { href: "#about", label: t.nav.about },
    { href: "#branches", label: t.nav.branches },
    { href: "#order", label: t.nav.order },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "py-2 bg-[#0a0a0a]/96 backdrop-blur-lg border-b border-white/5" : "py-4 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <motion.button
          onClick={() => nav("#home")}
          className="flex items-center gap-2 shrink-0"
          whileHover={{ scale: 1.04 }}
          style={{ transformPerspective: 600 }}
        >
          <motion.div
            className="w-9 h-9 bg-[#FDE080] rounded-full flex items-center justify-center"
            whileHover={{ rotateY: 20, rotateX: -10 }}
          >
            <Coffee className="w-5 h-5 text-[#0a0a0a]" />
          </motion.div>
          <span className="font-bold text-lg font-serif text-white transition-colors">
            {CAFE_CONFIG.name}
          </span>
        </motion.button>

        <nav className="hidden lg:flex items-center gap-5">
          {NAV.map((link) => (
            <button
              key={link.href}
              onClick={() => nav(link.href)}
              className="text-sm font-medium text-white/70 hover:text-[#FDE080] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FDE080] group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  cafeOpen
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${cafeOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                <span className="hidden sm:inline">{cafeOpen ? t.openStatus.open : t.openStatus.closed}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <LanguageSwitcher scrolled={scrolled} />

          <motion.button
            onClick={onCartClick}
            className="relative p-2.5 rounded-full bg-[#FDE080] text-[#0a0a0a] hover:bg-[#e8cc6a] transition-colors"
            whileHover={{ scale: 1.1, rotateY: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{ transformPerspective: 400 }}
          >
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen
                ? <X className="text-white w-6 h-6" />
                : <Menu className="text-white w-6 h-6" />
              }
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#111] backdrop-blur-lg border-t border-white/8"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => nav(link.href)}
                  className="text-left py-3 px-4 text-gray-300 hover:text-[#FDE080] hover:bg-white/5 rounded-xl font-medium transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
