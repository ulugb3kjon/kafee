"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Store, CheckCircle, Phone, Clock, MessageSquare, PenLine, Map, ExternalLink } from "lucide-react";
import { CartItem, OrderData } from "@/types";
import { formatPrice, getCartTotal, clearCart } from "@/lib/cart";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { sendTelegramOrder, buildWhatsAppLink } from "@/lib/telegram";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT, btnHover, btnTap } from "@/lib/animations";

interface OrderProps {
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

type Step = "type" | "form" | "confirm" | "success";
type AddressMode = "manual" | "map";

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 12);
  if (d.length <= 3) return "+998";
  if (d.length <= 5) return `+998 ${d.slice(3)}`;
  if (d.length <= 7) return `+998 ${d.slice(3, 5)} ${d.slice(5)}`;
  if (d.length <= 9) return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}`;
};

const BLANK = { name: "", phone: "", street: "", building: "", apartment: "", landmark: "", mapAddress: "", note: "", branch: CAFE_CONFIG.branches[0].name, pickupTime: "" };

function InputField({ label, value, onChange, placeholder, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}{required && " *"}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
    </div>
  );
}

export default function Order({ cartItems, onOrderComplete }: OrderProps) {
  const { t } = useLang();
  const [step, setStep] = useState<Step>("type");
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [addressMode, setAddressMode] = useState<AddressMode>("manual");
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const total = getCartTotal(cartItems);
  const delivery = orderType === "delivery" && total < CAFE_CONFIG.delivery.freeDeliveryFrom
    ? CAFE_CONFIG.delivery.deliveryFee : 0;

  const fullAddress = addressMode === "map"
    ? form.mapAddress
    : [form.street, form.building, form.apartment && `kv. ${form.apartment}`, form.landmark].filter(Boolean).join(", ");

  const selectedBranch = CAFE_CONFIG.branches.find((b) => b.name === form.branch) ?? CAFE_CONFIG.branches[0];
  const mapsSearchUrl = `https://yandex.uz/maps/10335/tashkent/?text=${encodeURIComponent("Toshkent")}`;

  const canSubmit = form.name && form.phone.length >= 16 && (orderType === "pickup" || (addressMode === "manual" ? form.street : form.mapAddress));

  const handleSubmit = async () => {
    setLoading(true);
    const order: OrderData = { type: orderType, name: form.name, phone: form.phone, address: fullAddress, landmark: form.landmark, note: form.note, branch: form.branch, pickupTime: form.pickupTime, items: cartItems, total };
    await sendTelegramOrder(order);
    clearCart();
    onOrderComplete();
    setStep("success");
    setLoading(false);
  };

  const reset = () => { setStep("type"); setForm(BLANK); setAddressMode("manual"); };

  const btnBase = "w-full py-3.5 rounded-full font-semibold text-sm transition-all";
  const btnPrimary = `${btnBase} bg-[#FDE080] text-[#0a0a0a] hover:bg-[#e8cc6a] disabled:opacity-40 disabled:cursor-not-allowed`;
  const btnOutline = `${btnBase} border border-white/10 text-gray-400 hover:border-[#FDE080]/40 hover:text-[#FDE080]`;

  if (cartItems.length === 0 && step !== "success") {
    return (
      <section id="order" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-4 font-serif">{t.order.title}</h2>
            <p className="text-gray-500 mb-6">{t.order.emptyCart}</p>
            <motion.button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-[#FDE080] text-[#0a0a0a] rounded-full font-semibold hover:bg-[#e8cc6a] transition-colors"
              whileHover={btnHover} whileTap={btnTap}>
              {t.order.seeMenu}
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} className="text-center mb-12">
          <span className="text-[#FDE080] font-medium uppercase tracking-widest text-sm">{t.order.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 font-serif">{t.order.title}</h2>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ── SUCCESS ── */}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a1a1a] border border-white/6 rounded-2xl p-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15, stiffness: 260 }}>
                  <CheckCircle className="w-16 h-16 text-[#FDE080] mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.order.success.title}</h3>
                <p className="text-gray-500 mb-6 text-sm">{t.order.success.desc}</p>
                <a href={`tel:${CAFE_CONFIG.contacts.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-[#FDE080] font-bold text-lg hover:underline">
                  <Phone className="w-5 h-5" />{CAFE_CONFIG.contacts.phone}
                </a>
                <motion.button onClick={reset} className={`mt-8 ${btnPrimary}`} whileHover={btnHover} whileTap={btnTap}>
                  {t.order.success.newOrder}
                </motion.button>
              </motion.div>
            )}

            {/* ── STEP 1: TYPE ── */}
            {step === "type" && (
              <motion.div key="type" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                {/* Delivery type cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {(["delivery", "pickup"] as const).map((type) => (
                    <motion.button key={type} onClick={() => setOrderType(type)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all ${orderType === type ? "border-[#FDE080]/60 bg-[#FDE080]/5" : "border-white/8 bg-[#1a1a1a] hover:border-white/15"}`}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      {type === "delivery"
                        ? <Truck className={`w-7 h-7 mb-3 ${orderType === type ? "text-[#FDE080]" : "text-gray-600"}`} />
                        : <Store className={`w-7 h-7 mb-3 ${orderType === type ? "text-[#FDE080]" : "text-gray-600"}`} />}
                      <p className={`font-bold text-sm mb-1 ${orderType === type ? "text-[#FDE080]" : "text-gray-300"}`}>
                        {type === "delivery" ? t.order.delivery : t.order.pickup}
                      </p>
                      <p className="text-xs text-gray-600">
                        {type === "delivery"
                          ? t.order.deliveryDesc.replace("{time}", CAFE_CONFIG.delivery.deliveryTime).replace("{fee}", formatPrice(CAFE_CONFIG.delivery.deliveryFee))
                          : t.order.pickupDesc}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* Cart summary */}
                <div className="bg-[#1a1a1a] border border-white/6 rounded-2xl p-5 mb-5">
                  <h3 className="font-semibold text-white mb-3 text-sm">{t.order.summary}</h3>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.name} ×{item.quantity}</span>
                        <span className="font-medium text-gray-300">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/6 pt-2 mt-2 space-y-1">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{t.cart.delivery}:</span>
                        <span>{delivery === 0 ? t.cart.free : formatPrice(delivery)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-white">{t.cart.total}:</span>
                        <span className="text-[#FDE080]">{formatPrice(total + delivery)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button onClick={() => setStep("form")} className={btnPrimary} whileHover={btnHover} whileTap={btnTap}>
                  {t.order.continue}
                </motion.button>
              </motion.div>
            )}

            {/* ── STEP 2: FORM ── */}
            {step === "form" && (
              <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <div className="bg-[#1a1a1a] border border-white/6 rounded-2xl p-5 space-y-4">
                  <h3 className="font-bold text-white mb-1">
                    {orderType === "delivery" ? t.order.delivery : t.order.pickup}
                  </h3>

                  <InputField label={t.order.form.name} value={form.name} onChange={set("name")} placeholder={t.order.form.namePlaceholder} required />
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">{t.order.form.phone} *</label>
                    <input type="tel" value={form.phone} onChange={(e) => set("phone")(formatPhone(e.target.value))} placeholder="+998 90 123 45 67"
                      className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
                  </div>

                  {/* ── DELIVERY fields ── */}
                  {orderType === "delivery" && (
                    <>
                      {/* Address mode tabs */}
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">{t.order.form.foundAddress} *</label>
                        <div className="flex bg-[#111] rounded-xl p-1 mb-3">
                          {(["manual", "map"] as AddressMode[]).map((mode) => (
                            <button key={mode} onClick={() => setAddressMode(mode)}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${addressMode === mode ? "bg-[#1a1a1a] shadow-sm text-[#FDE080]" : "text-gray-600 hover:text-gray-400"}`}>
                              {mode === "manual" ? <><PenLine className="w-3.5 h-3.5" />{t.order.form.addressMode.manual}</> : <><Map className="w-3.5 h-3.5" />{t.order.form.addressMode.fromMap}</>}
                            </button>
                          ))}
                        </div>

                        <AnimatePresence mode="wait">
                          {addressMode === "manual" ? (
                            <motion.div key="manual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-3">
                              <input type="text" value={form.street} onChange={(e) => set("street")(e.target.value)} placeholder={t.order.form.streetPlaceholder}
                                className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
                              <div className="grid grid-cols-2 gap-3">
                                <input type="text" value={form.building} onChange={(e) => set("building")(e.target.value)} placeholder={t.order.form.buildingPlaceholder}
                                  className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
                                <input type="text" value={form.apartment} onChange={(e) => set("apartment")(e.target.value)} placeholder={t.order.form.apartmentPlaceholder}
                                  className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
                              </div>
                              <input type="text" value={form.landmark} onChange={(e) => set("landmark")(e.target.value)} placeholder={t.order.form.landmarkPlaceholder}
                                className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
                            </motion.div>
                          ) : (
                            <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-3">
                              <div className="bg-[#FDE080]/8 border border-[#FDE080]/20 rounded-xl p-3 text-sm text-[#FDE080]/80 flex items-start gap-2">
                                <Map className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{t.order.form.mapHint}</span>
                              </div>
                              <div className="rounded-xl overflow-hidden border border-white/8">
                                <iframe
                                  src={`https://yandex.uz/map-widget/v1/?ll=69.268,41.306&z=12&pt=${CAFE_CONFIG.branches.map((b) => `${b.lng},${b.lat},pm2rdm`).join("~")}&lang=ru_RU&source=constructor`}
                                  width="100%" height="220" allowFullScreen title="Toshkent xaritasi"
                                  className="block"
                                />
                              </div>
                              <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-[#FDE080] font-medium hover:underline">
                                <ExternalLink className="w-4 h-4" />{t.order.form.openInMaps}
                              </a>
                              <input type="text" value={form.mapAddress} onChange={(e) => set("mapAddress")(e.target.value)}
                                placeholder={t.order.form.foundAddressPlaceholder}
                                className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}

                  {/* ── PICKUP fields ── */}
                  {orderType === "pickup" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">{t.order.form.branch} *</label>
                        <select value={form.branch} onChange={(e) => set("branch")(e.target.value)}
                          className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]">
                          {CAFE_CONFIG.branches.map((b) => (
                            <option key={b.name} value={b.name} className="bg-[#111]">{b.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-white/8">
                        <iframe src={`https://yandex.uz/map-widget/v1/?ll=${selectedBranch.lng},${selectedBranch.lat}&z=16&pt=${selectedBranch.lng},${selectedBranch.lat},pm2rdm&lang=ru_RU&source=constructor`}
                          width="100%" height="200" allowFullScreen title={selectedBranch.name} className="block" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">
                          <Clock className="w-3.5 h-3.5 inline mr-1" />{t.order.form.pickupTime}
                        </label>
                        <input type="text" value={form.pickupTime} onChange={(e) => set("pickupTime")(e.target.value)}
                          placeholder={t.order.form.pickupTimePlaceholder}
                          className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all bg-[#111]" />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5 inline mr-1" />{t.order.form.note}
                    </label>
                    <textarea value={form.note} onChange={(e) => set("note")(e.target.value)}
                      placeholder={t.order.form.notePlaceholder} rows={2}
                      className="w-full px-4 py-3 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FDE080]/50 transition-all resize-none bg-[#111]" />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <motion.button onClick={() => setStep("type")} className={btnOutline} whileHover={{ scale: 1.01 }} whileTap={btnTap}>
                    {t.order.back}
                  </motion.button>
                  <motion.button onClick={() => setStep("confirm")} disabled={!canSubmit} className={btnPrimary} whileHover={btnHover} whileTap={btnTap}>
                    {t.order.continue}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: CONFIRM ── */}
            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <div className="bg-[#1a1a1a] border border-white/6 rounded-2xl p-5 mb-4">
                  <h3 className="font-bold text-white mb-4">{t.order.summary}</h3>
                  <div className="space-y-2.5 text-sm">
                    {[
                      [t.order.form.name, form.name],
                      [t.order.form.phone, form.phone],
                      [t.order.type, orderType === "delivery" ? t.order.deliveryType : t.order.pickupType],
                      orderType === "delivery"
                        ? [t.order.form.foundAddress, fullAddress]
                        : [t.order.form.branch, form.branch],
                    ].map(([label, value]) => value ? (
                      <div key={label} className="flex gap-2">
                        <span className="text-gray-600 w-28 shrink-0">{label}:</span>
                        <span className="text-gray-200 font-medium">{value}</span>
                      </div>
                    ) : null)}

                    <div className="border-t border-white/6 pt-3 space-y-1.5">
                      {cartItems.map((item) => (
                        <div key={item.name} className="flex justify-between text-gray-400">
                          <span>{item.name} ×{item.quantity}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/6 pt-3 space-y-1">
                      {orderType === "delivery" && (
                        <div className="flex justify-between text-gray-500">
                          <span>{t.cart.delivery}:</span>
                          <span>{delivery === 0 ? t.cart.free : formatPrice(delivery)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-base">
                        <span className="text-white">{t.order.totalPayment}:</span>
                        <span className="text-[#FDE080]">{formatPrice(total + delivery)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button onClick={() => setStep("form")} className={btnOutline} whileHover={{ scale: 1.01 }} whileTap={btnTap}>
                    {t.order.change}
                  </motion.button>
                  <motion.button onClick={handleSubmit} disabled={loading} className={btnPrimary} whileHover={btnHover} whileTap={btnTap}>
                    {loading ? t.order.sending : t.order.sendOrder}
                  </motion.button>
                </div>

                <a href={buildWhatsAppLink({ type: orderType, name: form.name, phone: form.phone, address: fullAddress, landmark: form.landmark, note: form.note, branch: form.branch, pickupTime: form.pickupTime, items: cartItems, total })}
                  target="_blank" rel="noopener noreferrer"
                  className="block text-center mt-3 text-xs text-gray-600 hover:text-green-400 transition-colors">
                  {t.order.sendViaWhatsapp}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
