"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ShoppingCart, X, Menu as MenuIcon } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { CartItem } from "@/types";
import { useLang } from "@/contexts/LanguageContext";
import { checkBranchOpen } from "@/lib/openStatus";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  cartItems: CartItem[];
  onCartClick: () => void;
}

export default function SidebarNav({ isOpen, onToggle, onClose, cartItems, onCartClick }: Props) {
  const { t } = useLang();
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
    document.body.style.overflowX = isOpen ? "hidden" : "";
    return () => { document.body.style.overflowX = ""; };
  }, [isOpen]);

  const nav = (href: string) => {
    onClose();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <>
      {/* Trigger / Close button — always top-right */}
      <motion.button
        onClick={onToggle}
        className="fixed top-6 right-6 z-[70] w-11 h-11 flex items-center justify-center rounded-full bg-[#FDE080] text-[#0a0a0a] shadow-xl shadow-[#FDE080]/25"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}
        aria-label={isOpen ? "Yopish" : "Menyu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MenuIcon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[58] bg-black/25 backdrop-blur-[3px]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 h-full z-[60] flex flex-col"
            style={{
              width: "clamp(280px, 33vw, 480px)",
              backgroundColor: "#0d0d0d",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Logo row */}
            <div
              className="flex items-center gap-3 px-7 pt-7 pb-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-9 h-9 bg-[#FDE080] rounded-full flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5 text-[#0a0a0a]" />
              </div>
              <span className="font-serif font-bold text-xl text-white">{CAFE_CONFIG.name}</span>
            </div>

            {/* Open/closed badge */}
            <div className="px-7 pt-5 pb-1">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  cafeOpen
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    cafeOpen ? "bg-green-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                {cafeOpen ? t.openStatus.open : t.openStatus.closed}
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-5 pt-5 flex flex-col gap-0.5 overflow-y-auto">
              {NAV.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.38, ease: "easeOut" }}
                  onClick={() => nav(link.href)}
                  className="text-left py-3.5 px-4 text-white/55 hover:text-[#FDE080] hover:bg-white/5 rounded-xl font-medium text-base transition-colors group flex items-center gap-3"
                >
                  <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-[#FDE080] transition-all duration-200 shrink-0" />
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Bottom bar */}
            <div
              className="px-5 pb-7 pt-4 flex items-center justify-between gap-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <LanguageSwitcher scrolled={false} />

              <motion.button
                onClick={onCartClick}
                className="relative flex items-center gap-2 px-4 py-2.5 bg-[#FDE080] text-[#0a0a0a] rounded-full font-semibold text-sm hover:bg-[#e8cc6a] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{cartCount > 0 ? cartCount : "Savat"}</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
