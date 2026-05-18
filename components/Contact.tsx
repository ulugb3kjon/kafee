"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { slideLeft, slideRight, fadeUp, VIEWPORT, btnHover, btnTap } from "@/lib/animations";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  const socials = [
    { label: "Instagram", handle: CAFE_CONFIG.contacts.instagram, href: `https://instagram.com/${CAFE_CONFIG.contacts.instagram.replace("@", "")}` },
    { label: "Telegram", handle: CAFE_CONFIG.contacts.telegram, href: `https://t.me/${CAFE_CONFIG.contacts.telegram.replace("@", "")}` },
    { label: "WhatsApp", handle: CAFE_CONFIG.contacts.whatsapp, href: `https://wa.me/${CAFE_CONFIG.contacts.whatsapp.replace(/\D/g, "")}` },
  ];

  return (
    <section id="contact" className="py-20 bg-amber-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-amber-700 font-medium uppercase tracking-widest text-sm">{t.contact.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-serif">{t.contact.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideLeft}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t.contact.info}</h3>

            <div className="space-y-4 mb-8">
              {[
                { icon: Phone, label: t.contact.phone, value: CAFE_CONFIG.contacts.phone, href: `tel:${CAFE_CONFIG.contacts.phone.replace(/\s/g, "")}` },
                { icon: MapPin, label: t.contact.address, value: CAFE_CONFIG.branches[0].address, href: undefined },
                { icon: Mail, label: t.contact.email, value: CAFE_CONFIG.contacts.email, href: `mailto:${CAFE_CONFIG.contacts.email}` },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} whileHover={{ x: 4 }}>
                  {href ? (
                    <a href={href} className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
                      <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-800 transition-colors">
                        <Icon className="w-5 h-5 text-amber-800 group-hover:text-white transition-colors" />
                      </div>
                      <div><p className="text-xs text-gray-500">{label}</p><p className="font-semibold text-gray-900">{value}</p></div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                      <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-amber-800" />
                      </div>
                      <div><p className="text-xs text-gray-500">{label}</p><p className="font-semibold text-gray-900">{value}</p></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <h4 className="font-semibold text-gray-900 mb-4">{t.contact.social}</h4>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-amber-800 transition-colors font-medium"
                  whileHover={{ x: 6 }}
                >
                  <span className="text-sm w-24 font-semibold">{s.label}</span>
                  <span className="text-sm">{s.handle}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideRight}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t.contact.form.title}</h3>
              {sent ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">{t.contact.form.success}</p>
                  <p className="text-gray-500 text-sm">{t.contact.form.successDesc}</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }} className="mt-6 text-amber-800 font-medium hover:underline">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-800 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.form.message}</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-800 transition-colors resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-amber-800 text-white rounded-full font-semibold hover:bg-amber-700 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                    whileHover={btnHover}
                    whileTap={btnTap}
                  >
                    {loading ? t.contact.form.sending : <><Send className="w-4 h-4" />{t.contact.form.send}</>}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
