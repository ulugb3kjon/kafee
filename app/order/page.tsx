"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Coffee, Truck, Store, CheckCircle,
  Phone, MessageSquare, PenLine, Map, ShoppingBag,
} from "lucide-react";
import { CartItem, OrderData } from "@/types";
import { getCart, formatPrice, getCartTotal, clearCart } from "@/lib/cart";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { sendTelegramOrder, buildWhatsAppLink } from "@/lib/telegram";
import { useLang } from "@/contexts/LanguageContext";

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

const BLANK = {
  name: "", phone: "", street: "", building: "", apartment: "",
  landmark: "", mapAddress: "", note: "",
  branch: CAFE_CONFIG.branches[0].name, pickupTime: "",
};

const inputCls =
  "w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none transition-all";
const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};
const inputFocusStyle = { border: "1px solid rgba(253,224,128,0.4)" };

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}

const STEP_LABELS = ["type", "form", "confirm"];

export default function OrderPage() {
  const router = useRouter();
  const { t } = useLang();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("type");
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [addressMode, setAddressMode] = useState<AddressMode>("manual");
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
    setMounted(true);
  }, []);

  const set = (k: string) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const total = getCartTotal(cartItems);
  const delivery =
    orderType === "delivery" && total < CAFE_CONFIG.delivery.freeDeliveryFrom
      ? CAFE_CONFIG.delivery.deliveryFee : 0;

  const fullAddress =
    addressMode === "map"
      ? form.mapAddress
      : [form.street, form.building, form.apartment && `kv. ${form.apartment}`, form.landmark]
          .filter(Boolean).join(", ");

  const selectedBranch =
    CAFE_CONFIG.branches.find((b) => b.name === form.branch) ?? CAFE_CONFIG.branches[0];

  const canSubmit =
    form.name &&
    form.phone.length >= 16 &&
    (orderType === "pickup" || (addressMode === "manual" ? form.street : form.mapAddress));

  const handleSubmit = async () => {
    setLoading(true);
    const order: OrderData = {
      type: orderType, name: form.name, phone: form.phone,
      address: fullAddress, landmark: form.landmark, note: form.note,
      branch: form.branch, pickupTime: form.pickupTime, items: cartItems, total,
    };
    await sendTelegramOrder(order);
    clearCart();
    setStep("success");
    setLoading(false);
  };

  if (!mounted) return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#FDE080]/20 border-t-[#FDE080] animate-spin" />
    </div>
  );

  const stepIdx = STEP_LABELS.indexOf(step);
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const cardStyle = {
    backgroundColor: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20,
  };

  const btnPrimary = {
    backgroundColor: "#FDE080",
    color: "#0a0a0a",
    borderRadius: 999,
    padding: "14px 0",
    fontWeight: 700,
    fontSize: 14,
    width: "100%",
    cursor: "pointer",
  };

  const btnOutline = {
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.4)",
    borderRadius: 999,
    padding: "14px 0",
    fontWeight: 600,
    fontSize: 14,
    width: "100%",
    cursor: "pointer",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060606", color: "#fff" }}>

      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center gap-4 px-5"
        style={{
          height: 64,
          backgroundColor: "rgba(6,6,6,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <motion.button
          onClick={() => router.back()}
          className="flex items-center justify-center shrink-0"
          style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}
          whileHover={{ scale: 1.08, borderColor: "rgba(255,255,255,0.25)" }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.button>

        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#FDE080" }}>
            <Coffee className="w-3.5 h-3.5 text-[#0a0a0a]" />
          </div>
          <span className="font-serif font-bold text-base">{CAFE_CONFIG.name}</span>
        </div>

        {step !== "success" && cartCount > 0 && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(253,224,128,0.08)", border: "1px solid rgba(253,224,128,0.18)" }}
          >
            <ShoppingBag className="w-3.5 h-3.5" style={{ color: "#FDE080" }} />
            <span className="text-sm font-semibold" style={{ color: "#FDE080" }}>{cartCount}</span>
          </div>
        )}
      </header>

      <main className="pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          {step !== "success" && (
            <div className="text-center pt-12 pb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] mb-3" style={{ color: "#FDE080" }}>
                {t.order.badge}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-serif">{t.order.title}</h1>

              {/* Step dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {STEP_LABELS.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <motion.div
                      className="flex items-center justify-center text-xs font-bold"
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        backgroundColor: i <= stepIdx ? "#FDE080" : "rgba(255,255,255,0.06)",
                        color: i <= stepIdx ? "#0a0a0a" : "rgba(255,255,255,0.2)",
                      }}
                      animate={{ scale: i === stepIdx ? 1.15 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {i + 1}
                    </motion.div>
                    {i < STEP_LABELS.length - 1 && (
                      <div
                        className="h-px transition-all duration-500"
                        style={{
                          width: 36,
                          backgroundColor: i < stepIdx ? "#FDE080" : "rgba(255,255,255,0.1)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={step !== "success" ? "grid md:grid-cols-[1fr_1.55fr] gap-6 items-start" : "max-w-md mx-auto pt-12"}>

            {/* ── LEFT: Cart summary (desktop sticky) ── */}
            {step !== "success" && (
              <div className="md:sticky md:top-24">
                <div style={cardStyle} className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                    {t.order.summary}
                  </p>

                  {cartItems.length === 0 ? (
                    <p className="text-sm text-white/25 text-center py-4">{t.order.emptyCart}</p>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ backgroundColor: "rgba(253,224,128,0.1)", color: "#FDE080" }}
                          >
                            {item.quantity}
                          </div>
                          <span className="text-sm flex-1" style={{ color: "rgba(255,255,255,0.6)" }}>{item.name}</span>
                          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex justify-between text-sm mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                      <span>{t.cart.delivery}</span>
                      <span>{delivery === 0 ? t.cart.free : formatPrice(delivery)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>{t.cart.total}</span>
                      <span className="text-xl font-bold" style={{ color: "#FDE080" }}>
                        {formatPrice(total + delivery)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── RIGHT: Form steps ── */}
            <div>
              <AnimatePresence mode="wait">

                {/* SUCCESS */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ ...cardStyle, padding: 48, textAlign: "center" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.15, stiffness: 260 }}
                    >
                      <div
                        className="mx-auto mb-6 flex items-center justify-center"
                        style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(253,224,128,0.1)" }}
                      >
                        <CheckCircle className="w-10 h-10" style={{ color: "#FDE080" }} />
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold font-serif mb-2">{t.order.success.title}</h3>
                    <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>{t.order.success.desc}</p>
                    <a
                      href={`tel:${CAFE_CONFIG.contacts.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 font-bold text-lg hover:underline"
                      style={{ color: "#FDE080" }}
                    >
                      <Phone className="w-5 h-5" />{CAFE_CONFIG.contacts.phone}
                    </a>
                    <motion.button
                      onClick={() => router.push("/")}
                      style={btnPrimary}
                      className="mt-8 block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Bosh sahifaga qaytish
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 1 — TYPE */}
                {step === "type" && (
                  <motion.div
                    key="type"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32 }}
                  >
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {(["delivery", "pickup"] as const).map((type) => {
                        const active = orderType === type;
                        return (
                          <motion.button
                            key={type}
                            onClick={() => setOrderType(type)}
                            className="p-5 text-left"
                            style={{
                              borderRadius: 18,
                              border: `1.5px solid ${active ? "rgba(253,224,128,0.4)" : "rgba(255,255,255,0.07)"}`,
                              backgroundColor: active ? "rgba(253,224,128,0.06)" : "#0d0d0d",
                            }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {type === "delivery"
                              ? <Truck className="w-7 h-7 mb-3" style={{ color: active ? "#FDE080" : "rgba(255,255,255,0.2)" }} />
                              : <Store className="w-7 h-7 mb-3" style={{ color: active ? "#FDE080" : "rgba(255,255,255,0.2)" }} />}
                            <p className="font-bold text-sm mb-1" style={{ color: active ? "#FDE080" : "rgba(255,255,255,0.65)" }}>
                              {type === "delivery" ? t.order.delivery : t.order.pickup}
                            </p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
                              {type === "delivery"
                                ? t.order.deliveryDesc
                                    .replace("{time}", CAFE_CONFIG.delivery.deliveryTime)
                                    .replace("{fee}", formatPrice(CAFE_CONFIG.delivery.deliveryFee))
                                : t.order.pickupDesc}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                    <motion.button
                      onClick={() => setStep("form")}
                      style={btnPrimary}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {t.order.continue}
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 2 — FORM */}
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32 }}
                  >
                    <div style={{ ...cardStyle, padding: 20 }} className="space-y-4">

                      <Field label={t.order.form.name} required>
                        <input
                          className={inputCls}
                          style={inputStyle}
                          value={form.name}
                          onChange={(e) => set("name")(e.target.value)}
                          placeholder={t.order.form.namePlaceholder}
                          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                        />
                      </Field>

                      <Field label={t.order.form.phone} required>
                        <input
                          type="tel"
                          className={inputCls}
                          style={inputStyle}
                          value={form.phone}
                          onChange={(e) => set("phone")(formatPhone(e.target.value))}
                          placeholder="+998 90 123 45 67"
                          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                        />
                      </Field>

                      {/* DELIVERY */}
                      {orderType === "delivery" && (
                        <Field label={t.order.form.foundAddress} required>
                          {/* Mode tabs */}
                          <div
                            className="flex p-1 mb-3"
                            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}
                          >
                            {(["manual", "map"] as AddressMode[]).map((mode) => (
                              <button
                                key={mode}
                                onClick={() => setAddressMode(mode)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all"
                                style={{
                                  borderRadius: 9,
                                  backgroundColor: addressMode === mode ? "rgba(255,255,255,0.08)" : "transparent",
                                  color: addressMode === mode ? "#FDE080" : "rgba(255,255,255,0.3)",
                                }}
                              >
                                {mode === "manual"
                                  ? <><PenLine className="w-3.5 h-3.5" />{t.order.form.addressMode.manual}</>
                                  : <><Map className="w-3.5 h-3.5" />{t.order.form.addressMode.fromMap}</>}
                              </button>
                            ))}
                          </div>

                          <AnimatePresence mode="wait">
                            {addressMode === "manual" ? (
                              <motion.div key="manual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                                <input className={inputCls} style={inputStyle} value={form.street} onChange={(e) => set("street")(e.target.value)} placeholder={t.order.form.streetPlaceholder} onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                                <div className="grid grid-cols-2 gap-3">
                                  <input className={inputCls} style={inputStyle} value={form.building} onChange={(e) => set("building")(e.target.value)} placeholder={t.order.form.buildingPlaceholder} onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                                  <input className={inputCls} style={inputStyle} value={form.apartment} onChange={(e) => set("apartment")(e.target.value)} placeholder={t.order.form.apartmentPlaceholder} onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                                </div>
                                <input className={inputCls} style={inputStyle} value={form.landmark} onChange={(e) => set("landmark")(e.target.value)} placeholder={t.order.form.landmarkPlaceholder} onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </motion.div>
                            ) : (
                              <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                                  <iframe
                                    src={`https://yandex.uz/map-widget/v1/?ll=69.268,41.306&z=12&pt=${CAFE_CONFIG.branches.map((b) => `${b.lng},${b.lat},pm2rdm`).join("~")}&lang=ru_RU&source=constructor`}
                                    width="100%" height="200" allowFullScreen title="Xarita" className="block"
                                  />
                                </div>
                                <input className={inputCls} style={inputStyle} value={form.mapAddress} onChange={(e) => set("mapAddress")(e.target.value)} placeholder={t.order.form.foundAddressPlaceholder} onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Field>
                      )}

                      {/* PICKUP */}
                      {orderType === "pickup" && (
                        <>
                          <Field label={t.order.form.branch} required>
                            <select
                              className={inputCls}
                              style={{ ...inputStyle, appearance: "none" } as React.CSSProperties}
                              value={form.branch}
                              onChange={(e) => set("branch")(e.target.value)}
                            >
                              {CAFE_CONFIG.branches.map((b) => (
                                <option key={b.name} value={b.name} style={{ backgroundColor: "#111" }}>{b.name}</option>
                              ))}
                            </select>
                          </Field>
                          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                            <iframe
                              src={`https://yandex.uz/map-widget/v1/?ll=${selectedBranch.lng},${selectedBranch.lat}&z=16&pt=${selectedBranch.lng},${selectedBranch.lat},pm2rdm&lang=ru_RU&source=constructor`}
                              width="100%" height="180" allowFullScreen title={selectedBranch.name} className="block"
                            />
                          </div>
                          <Field label={t.order.form.pickupTime}>
                            <input className={inputCls} style={inputStyle} value={form.pickupTime} onChange={(e) => set("pickupTime")(e.target.value)} placeholder={t.order.form.pickupTimePlaceholder} onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                          </Field>
                        </>
                      )}

                      <Field label={t.order.form.note}>
                        <textarea
                          className={`${inputCls} resize-none`}
                          style={inputStyle}
                          rows={2}
                          value={form.note}
                          onChange={(e) => set("note")(e.target.value)}
                          placeholder={t.order.form.notePlaceholder}
                          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                        />
                      </Field>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <motion.button onClick={() => setStep("type")} style={btnOutline} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                        {t.order.back}
                      </motion.button>
                      <motion.button
                        onClick={() => setStep("confirm")}
                        disabled={!canSubmit}
                        style={{ ...btnPrimary, opacity: canSubmit ? 1 : 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {t.order.continue}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — CONFIRM */}
                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32 }}
                  >
                    <div style={{ ...cardStyle, padding: 20 }} className="mb-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                        {t.order.summary}
                      </p>
                      <div className="space-y-3 text-sm">
                        {[
                          [t.order.form.name, form.name],
                          [t.order.form.phone, form.phone],
                          [t.order.type, orderType === "delivery" ? t.order.deliveryType : t.order.pickupType],
                          orderType === "delivery"
                            ? [t.order.form.foundAddress, fullAddress]
                            : [t.order.form.branch, form.branch],
                          form.note ? [t.order.form.note, form.note] : null,
                        ].filter(Boolean).map((row) => { const [label, value] = row as [string, string]; return value ? (
                            <div key={label} className="flex gap-3">
                              <span className="shrink-0 w-24 text-xs pt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>{label}</span>
                              <span className="font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>{value}</span>
                            </div>
                          ) : null; })}

                        <div className="pt-3 mt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          {cartItems.map((item) => (
                            <div key={item.name} className="flex justify-between py-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                              <span>{item.name} ×{item.quantity}</span>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between font-bold text-base pt-1">
                          <span style={{ color: "rgba(255,255,255,0.7)" }}>{t.order.totalPayment}</span>
                          <span style={{ color: "#FDE080" }}>{formatPrice(total + delivery)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button onClick={() => setStep("form")} style={btnOutline} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                        {t.order.change}
                      </motion.button>
                      <motion.button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{ ...btnPrimary, opacity: loading ? 0.5 : 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {loading ? t.order.sending : t.order.sendOrder}
                      </motion.button>
                    </div>

                    <a
                      href={buildWhatsAppLink({ type: orderType, name: form.name, phone: form.phone, address: fullAddress, landmark: form.landmark, note: form.note, branch: form.branch, pickupTime: form.pickupTime, items: cartItems, total })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center mt-3 text-xs hover:text-green-400 transition-colors"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      {t.order.sendViaWhatsapp}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
