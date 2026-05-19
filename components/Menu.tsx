"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Search, X, Plus } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/cart";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";

interface MenuProps {
  onAddToCart: (item: MenuItem, category: string) => void;
}

interface FlatItem extends MenuItem {
  category: string;
}

const allItems: FlatItem[] = CAFE_CONFIG.menu.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: CARD_EASE } },
};

function MenuCard({
  item,
  category,
  added,
  onAdd,
}: {
  item: MenuItem;
  category: string;
  added: string | null;
  onAdd: (item: MenuItem, cat: string) => void;
}) {
  const { t } = useLang();
  const isAdded = added === item.name;

  return (
    <motion.div
      layout
      variants={cardVariant}
      className="group relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        backgroundColor: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      whileHover={{
        y: -5,
        borderColor: "rgba(253,224,128,0.22)",
        boxShadow: "0 20px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(253,224,128,0.1)",
        transition: { duration: 0.28 },
      }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{ scale: 1 }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop";
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        {/* Price badge — top right */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold"
          style={{ backgroundColor: "#FDE080", color: "#0a0a0a" }}
        >
          {formatPrice(item.price)}
        </div>

        {/* Name — bottom left of image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-bold text-white text-base leading-tight">{item.name}</h3>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <p
          className="text-sm leading-relaxed line-clamp-2 flex-1"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          {item.description}
        </p>

        <motion.button
          onClick={() => onAdd(item, category)}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={
            isAdded
              ? {
                  backgroundColor: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#4ade80",
                }
              : {
                  backgroundColor: "#FDE080",
                  color: "#0a0a0a",
                  border: "1px solid transparent",
                }
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                {t.menu.added}
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.menu.addToCart}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Menu({ onAddToCart }: MenuProps) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState(0);
  const [added, setAdded] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleAdd = (item: MenuItem, category: string) => {
    onAddToCart(item, category);
    setAdded(item.name);
    setTimeout(() => setAdded(null), 1400);
  };

  const trimmed = query.trim().toLowerCase();
  const isSearching = trimmed.length > 0;

  const searchResults = isSearching
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmed) ||
          item.description.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed)
      )
    : [];

  const clearSearch = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <section id="menu" className="py-24 overflow-hidden" style={{ backgroundColor: "#080808" }}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.28em]"
            style={{ color: "#FDE080" }}
          >
            {t.menu.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 font-serif">
            {t.menu.title}
          </h2>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="max-w-xl mx-auto mb-10"
        >
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300"
            style={{
              backgroundColor: "#0d0d0d",
              border: `1.5px solid ${isSearching ? "rgba(253,224,128,0.35)" : "rgba(255,255,255,0.07)"}`,
              boxShadow: isSearching ? "0 0 0 4px rgba(253,224,128,0.05)" : "none",
            }}
          >
            <Search
              className="w-4.5 h-4.5 shrink-0 transition-colors"
              style={{ color: isSearching ? "#FDE080" : "rgba(255,255,255,0.25)", width: 18, height: 18 }}
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 outline-none min-w-0"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <AnimatePresence>
              {isSearching && (
                <motion.button
                  key="clear"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={clearSearch}
                  className="flex items-center justify-center shrink-0 rounded-full transition-colors"
                  style={{
                    width: 26, height: 26,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <X className="w-3 h-3" style={{ color: "rgba(255,255,255,0.5)" }} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isSearching && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs mt-2.5 px-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {searchResults.length > 0
                  ? t.menu.searchResults.replace("{count}", String(searchResults.length))
                  : t.menu.noResults}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSearching ? (
            /* ── Search results ── */
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {searchResults.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {searchResults.map((item) => (
                    <MenuCard key={item.name} item={item} category={item.category} added={added} onAdd={handleAdd} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-24 flex flex-col items-center gap-3 text-center"
                >
                  <div
                    className="flex items-center justify-center mb-2"
                    style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)" }}
                  >
                    <Search className="w-7 h-7" style={{ color: "rgba(255,255,255,0.2)" }} />
                  </div>
                  <p className="font-bold text-white text-lg">{t.menu.noResults}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>{t.menu.noResultsHint}</p>
                  <button
                    onClick={clearSearch}
                    className="mt-3 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
                    style={{ backgroundColor: "#FDE080", color: "#0a0a0a" }}
                  >
                    {t.menu.searchPlaceholder.split("...")[0]}…
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* ── Category tabs + grid ── */
            <motion.div key="tabs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* Tabs — scrollable */}
              <div ref={tabsRef} className="flex gap-2 justify-center flex-wrap mb-10">
                {CAFE_CONFIG.menu.map((cat, i) => {
                  const active = activeTab === i;
                  return (
                    <motion.button
                      key={cat.category}
                      onClick={() => setActiveTab(i)}
                      className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                      style={{
                        backgroundColor: active ? "#FDE080" : "rgba(255,255,255,0.05)",
                        color: active ? "#0a0a0a" : "rgba(255,255,255,0.45)",
                        border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.07)"}`,
                      }}
                      whileHover={{
                        scale: 1.04,
                        backgroundColor: active ? "#FDE080" : "rgba(255,255,255,0.09)",
                        color: active ? "#0a0a0a" : "rgba(255,255,255,0.8)",
                      }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                    >
                      {cat.category}
                    </motion.button>
                  );
                })}
              </div>

              {/* Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {CAFE_CONFIG.menu[activeTab].items.map((item) => (
                    <MenuCard
                      key={item.name}
                      item={item}
                      category={CAFE_CONFIG.menu[activeTab].category}
                      added={added}
                      onAdd={handleAdd}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
