"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowLeft, MessageCircle, AtSign } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const inputCls = "w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder:text-white/20 outline-none transition-all";
const inputStyle = { backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" };
const inputFocusStyle = { borderColor: "rgba(253,224,128,0.4)" };

export default function ContactPage() {
  const router = useRouter();
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  const contactItems = [
    { icon: Phone, label: t.contact.phone, value: CAFE_CONFIG.contacts.phone, href: `tel:${CAFE_CONFIG.contacts.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: t.contact.email, value: CAFE_CONFIG.contacts.email, href: `mailto:${CAFE_CONFIG.contacts.email}` },
    { icon: MapPin, label: t.contact.address, value: CAFE_CONFIG.branches[0].address, href: undefined },
  ];

  const socials = [
    { label: "Instagram", icon: AtSign, handle: CAFE_CONFIG.contacts.instagram, href: `https://instagram.com/${CAFE_CONFIG.contacts.instagram.replace("@", "")}` },
    { label: "Telegram", icon: Send, handle: CAFE_CONFIG.contacts.telegram, href: `https://t.me/${CAFE_CONFIG.contacts.telegram.replace("@", "")}` },
    { label: "WhatsApp", icon: MessageCircle, handle: CAFE_CONFIG.contacts.whatsapp, href: `https://wa.me/${CAFE_CONFIG.contacts.whatsapp.replace(/\D/g, "")}` },
  ];

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh" }}>
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold backdrop-blur-md"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.14)", color: "#fff" }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Ortga
        </motion.button>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
              {t.contact.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 font-serif leading-[1.05]">
              {t.contact.title}
            </h1>
            <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
              Savollaringiz, takliflaringiz yoki hamkorlik bo'yicha muloqotga tayyormiz
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {contactItems.map(({ icon: Icon, label, value, href }, i) => {
              const inner = (
                <FadeIn key={label} delay={i * 0.08}>
                  <motion.div
                    className="flex flex-col items-center text-center gap-4 p-7 rounded-2xl h-full"
                    style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ borderColor: "rgba(253,224,128,0.2)", y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(253,224,128,0.1)" }}>
                      <Icon className="w-6 h-6" style={{ color: "#FDE080" }} />
                    </div>
                    <div>
                      <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                      <p className="font-semibold text-white text-sm leading-relaxed">{value}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              );
              return href ? <a key={label} href={href}>{inner}</a> : <div key={label}>{inner}</div>;
            })}
          </div>

          {/* Socials */}
          <FadeIn>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-bold text-white mb-5">{t.contact.social}</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {socials.map(({ label, icon: Icon, handle, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-xl flex-1 transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    whileHover={{ borderColor: "rgba(253,224,128,0.25)", backgroundColor: "rgba(253,224,128,0.05)" }}
                    transition={{ duration: 0.18 }}
                  >
                    <Icon className="w-4 h-4 shrink-0" style={{ color: "#FDE080" }} />
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                      <p className="text-sm font-semibold text-white">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact form */}
      <section className="px-4 pb-32">
        <div className="max-w-2xl mx-auto">
          <FadeIn className="mb-8">
            <h2 className="text-3xl font-bold text-white font-serif">{t.contact.form.title}</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(253,224,128,0.1)" }}>
                    <CheckCircle className="w-8 h-8" style={{ color: "#FDE080" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t.contact.form.success}</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{t.contact.form.successDesc}</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }}
                    className="mt-2 text-sm font-semibold underline"
                    style={{ color: "#FDE080" }}
                  >
                    {t.contact.form.newMessage}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: t.contact.form.name, placeholder: t.contact.form.namePlaceholder, type: "text" },
                    { key: "phone", label: t.contact.form.phone, placeholder: t.contact.form.phonePlaceholder, type: "tel" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        onFocus={() => setFocused(key)}
                        onBlur={() => setFocused(null)}
                        placeholder={placeholder}
                        className={inputCls}
                        style={{ ...inputStyle, ...(focused === key ? inputFocusStyle : {}) }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>{t.contact.form.message}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder={t.contact.form.messagePlaceholder}
                      className={inputCls + " resize-none"}
                      style={{ ...inputStyle, ...(focused === "message" ? inputFocusStyle : {}) }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                    style={{ backgroundColor: "#FDE080", color: "#0a0a0a" }}
                    whileHover={{ scale: 1.02, backgroundColor: "#e8cc6a" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
                        {t.contact.form.sending}
                      </span>
                    ) : (
                      <><Send className="w-4 h-4" />{t.contact.form.send}</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
