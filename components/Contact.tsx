"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";

export default function Contact() {
  const router = useRouter();
  const { t } = useLang();

  const items = [
    { icon: Phone, label: t.contact.phone, value: CAFE_CONFIG.contacts.phone, href: `tel:${CAFE_CONFIG.contacts.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: t.contact.address, value: CAFE_CONFIG.branches[0].address, href: undefined },
    { icon: Mail, label: t.contact.email, value: CAFE_CONFIG.contacts.email, href: `mailto:${CAFE_CONFIG.contacts.email}` },
    { icon: Send, label: "Telegram", value: CAFE_CONFIG.contacts.telegram, href: `https://t.me/${CAFE_CONFIG.contacts.telegram.replace("@", "")}` },
  ];

  return (
    <section id="contact" className="py-24 overflow-hidden" style={{ backgroundColor: "#111" }}>
      <div className="container mx-auto px-4 max-w-5xl">

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            {t.contact.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4 font-serif">
            {t.contact.title}
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Savollaringiz bormi? Biz doim muloqotga tayyormiz
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {items.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl transition-all"
                style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
                whileHover={{ borderColor: "rgba(253,224,128,0.25)", y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(253,224,128,0.1)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#FDE080" }} />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                  <p className="text-sm font-semibold text-white leading-tight">{value}</p>
                </div>
              </motion.div>
            );
            return href ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{content}</a> : <div key={label}>{content}</div>;
          })}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => router.push("/contact")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{ backgroundColor: "#FDE080", borderColor: "#FDE080", color: "#0a0a0a", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            Xabar yuborish — batafsil
            <motion.span
              className="flex items-center"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
