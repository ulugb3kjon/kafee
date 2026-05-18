"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Search, X } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/cart";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, stagger, staggerItem, VIEWPORT, cardHover, btnHover, btnTap } from "@/lib/animations";

interface MenuProps {
  onAddToCart: (item: MenuItem, category: string) => void;
}

interface FlatItem extends MenuItem {
  category: string;
}

const allItems: FlatItem[] = CAFE_CONFIG.menu.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);

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
      variants={staggerItem}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
      whileHover={cardHover}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1">{item.name}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-amber-800 font-bold">{formatPrice(item.price)}</span>
          <motion.button
            onClick={() => onAdd(item, category)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isAdded ? "bg-green-500 text-white" : "bg-amber-800 text-white hover:bg-amber-700"
            }`}
            whileHover={btnHover}
            whileTap={btnTap}
          >
            {isAdded ? (
              <><Check className="w-3.5 h-3.5" />{t.menu.added}</>
            ) : (
              <><ShoppingCart className="w-3.5 h-3.5" />{t.menu.addToCart}</>
            )}
          </motion.button>
        </div>
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
    <section id="menu" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <span className="text-amber-700 font-medium uppercase tracking-widest text-sm">{t.menu.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-serif">{t.menu.title}</h2>
        </motion.div>

        {/* ── SEARCH BAR ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-8"
        >
          <div
            className={`flex items-center gap-3 bg-gray-50 border-2 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
              isSearching ? "border-amber-800 bg-white shadow-md shadow-amber-800/5" : "border-transparent"
            }`}
          >
            <Search className={`w-5 h-5 shrink-0 transition-colors ${isSearching ? "text-amber-800" : "text-gray-400"}`} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              className="flex-1 bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none min-w-0"
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
                  className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors shrink-0"
                  aria-label="Tozalash"
                >
                  <X className="w-3.5 h-3.5 text-gray-600" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Results count */}
          <AnimatePresence>
            {isSearching && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-gray-500 mt-2.5 px-1"
              >
                {searchResults.length > 0
                  ? t.menu.searchResults.replace("{count}", String(searchResults.length))
                  : t.menu.noResults}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── SEARCH RESULTS ── */}
          {isSearching ? (
            <motion.div key="search">
              {searchResults.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {searchResults.map((item) => (
                    <MenuCard
                      key={item.name}
                      item={item}
                      category={item.category}
                      added={added}
                      onAdd={handleAdd}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 flex flex-col items-center gap-3 text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Search className="w-7 h-7 text-gray-300" />
                  </div>
                  <p className="font-semibold text-gray-700 text-lg">{t.menu.noResults}</p>
                  <p className="text-gray-400 text-sm">{t.menu.noResultsHint}</p>
                  <button
                    onClick={clearSearch}
                    className="mt-3 px-5 py-2.5 bg-amber-800 text-white rounded-full text-sm font-medium hover:bg-amber-700 transition-colors"
                  >
                    {t.menu.searchPlaceholder.split("...")[0]}…
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* ── TABS + NORMAL VIEW ── */
            <motion.div key="tabs">
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {CAFE_CONFIG.menu.map((cat, i) => (
                  <motion.button
                    key={cat.category}
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                      activeTab === i
                        ? "bg-amber-800 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-800"
                    }`}
                    whileHover={btnHover}
                    whileTap={btnTap}
                  >
                    {cat.category}
                  </motion.button>
                ))}
              </div>

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
