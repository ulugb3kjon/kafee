"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, BadgeCheck } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/cart";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, stagger, staggerItem, VIEWPORT, btnHover, btnTap } from "@/lib/animations";

interface NewProductsProps {
  onAddToCart: (item: MenuItem, category: string) => void;
}

export default function NewProducts({ onAddToCart }: NewProductsProps) {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const newItems = CAFE_CONFIG.menu.flatMap((cat) =>
    cat.items.filter((item) => item.isNew).map((item) => ({ ...item, category: cat.category }))
  );

  if (newItems.length === 0) return null;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.firstChild as HTMLElement)?.offsetWidth ?? 0;
    const gap = 16;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, newItems.length - 1)));
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.firstChild as HTMLElement)?.offsetWidth ?? 0;
    el.scrollTo({ left: index * (cardWidth + 16), behavior: "smooth" });
    setActiveIndex(index);
  };

  const Card = ({ item }: { item: (typeof newItems)[0] }) => (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100 group h-full">
      {/* NEW badge */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
        <BadgeCheck className="w-3 h-3" />
        {t.newProducts.label}
      </div>

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{item.name}</h3>
        <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-amber-800 font-bold text-sm shrink-0">{formatPrice(item.price)}</span>
          <motion.button
            onClick={() => onAddToCart(item, item.category)}
            className="flex items-center gap-1.5 bg-amber-800 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-amber-700 transition-colors"
            whileHover={btnHover}
            whileTap={btnTap}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {t.menu.addToCart}
          </motion.button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-14 bg-linear-to-b from-white to-amber-50/60">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="flex items-center justify-between mb-7"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium uppercase tracking-widest text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              {t.newProducts.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">{t.newProducts.title}</h2>
          </div>
          <motion.button
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber-800 hover:text-amber-600 transition-colors"
            whileHover={{ x: 3 }}
          >
            {t.nav.menu} →
          </motion.button>
        </motion.div>

        {/* ── MOBILE: snap scroll ── */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="-mx-4 px-4 flex gap-4 overflow-x-auto pb-1"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            }}
          >
            {newItems.map((item) => (
              <div
                key={item.name}
                className="shrink-0 w-[72vw]"
                style={{ scrollSnapAlign: "start" }}
              >
                <Card item={item} />
              </div>
            ))}
            {/* trailing spacer so last card snaps correctly */}
            <div className="shrink-0 w-4" />
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {newItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-7 bg-amber-800" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger}
          className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {newItems.map((item) => (
            <motion.div key={item.name} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <Card item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
