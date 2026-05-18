"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { CartItem } from "@/types";
import { formatPrice, getCartTotal } from "@/lib/cart";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdate: (name: string, quantity: number) => void;
  onRemove: (name: string) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, items, onClose, onUpdate, onRemove, onCheckout }: CartProps) {
  const { t } = useLang();
  const total = getCartTotal(items);
  const delivery =
    total >= CAFE_CONFIG.delivery.freeDeliveryFrom
      ? 0
      : items.length > 0
        ? CAFE_CONFIG.delivery.deliveryFee
        : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-amber-800" />
                <h2 className="text-lg font-bold text-gray-900">{t.cart.title}</h2>
                {items.length > 0 && (
                  <span className="bg-amber-800 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    {items.reduce((s, i) => s + i.quantity, 0)} {t.cart.items}
                  </span>
                )}
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-gray-400 gap-4 px-6"
                >
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-medium">{t.cart.empty}</p>
                  <p className="text-sm text-center">{t.cart.emptyDesc}</p>
                  <motion.button
                    onClick={onClose}
                    className="mt-2 flex items-center gap-2 px-6 py-3 bg-amber-800 text-white rounded-full font-semibold text-sm hover:bg-amber-700 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t.nav.menu}
                  </motion.button>
                </motion.div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.22 }}
                        className="flex gap-3 bg-gray-50 rounded-xl p-3"
                      >
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate text-sm">{item.name}</h4>
                          <p className="text-amber-800 font-bold text-sm mt-0.5">{formatPrice(item.price)}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() => onUpdate(item.name, item.quantity - 1)}
                                className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-amber-800 transition-colors"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.85 }}
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                              <motion.button
                                onClick={() => onUpdate(item.name, item.quantity + 1)}
                                className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-amber-800 transition-colors"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.85 }}
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>
                            <motion.button
                              onClick={() => onRemove(item.name)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold text-amber-800 text-sm">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-4 space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>{t.cart.products}:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>{t.cart.delivery}:</span>
                    <span className={delivery === 0 ? "text-green-600 font-semibold" : ""}>
                      {delivery === 0 ? t.cart.free : formatPrice(delivery)}
                    </span>
                  </div>
                  {total < CAFE_CONFIG.delivery.freeDeliveryFrom && (
                    <p className="text-xs text-gray-400">
                      {t.cart.freeDeliveryHint.replace("{amount}", formatPrice(CAFE_CONFIG.delivery.freeDeliveryFrom - total))}
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                    <span>{t.cart.total}:</span>
                    <span className="text-amber-800">{formatPrice(total + delivery)}</span>
                  </div>
                </div>

                {total < CAFE_CONFIG.delivery.minOrder && (
                  <p className="text-xs text-red-500 bg-red-50 p-2.5 rounded-xl">
                    {t.cart.minOrderWarn.replace("{amount}", formatPrice(CAFE_CONFIG.delivery.minOrder))}
                  </p>
                )}

                <motion.button
                  onClick={onCheckout}
                  disabled={total < CAFE_CONFIG.delivery.minOrder}
                  className="w-full py-3.5 bg-amber-800 text-white rounded-full font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={{ scale: total >= CAFE_CONFIG.delivery.minOrder ? 1.02 : 1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t.cart.checkout}
                </motion.button>

                {/* Back to menu — main exit on mobile */}
                <motion.button
                  onClick={onClose}
                  className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-amber-800 transition-colors rounded-full hover:bg-amber-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.cart.continueShopping}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
