"use client";

import { motion } from "framer-motion";
import { Coffee, Phone, MapPin, Clock } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";

export default function Footer() {
  const { t } = useLang();

  const NAV = [
    { href: "#home", label: t.nav.home },
    { href: "#menu", label: t.nav.menu },
    { href: "#about", label: t.nav.about },
    { href: "#branches", label: t.nav.branches },
    { href: "#order", label: t.nav.order },
    { href: "#contact", label: t.nav.contact },
  ];

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { label: "TG", href: `https://t.me/${CAFE_CONFIG.contacts.telegram.replace("@", "")}` },
    { label: "IG", href: `https://instagram.com/${CAFE_CONFIG.contacts.instagram.replace("@", "")}` },
    { label: "WA", href: `https://wa.me/${CAFE_CONFIG.contacts.whatsapp.replace(/\D/g, "")}` },
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/5 text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#FDE080] rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#0a0a0a]" />
              </div>
              <span className="text-white font-bold text-lg font-serif">{CAFE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{CAFE_CONFIG.slogan}</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/8 rounded-full flex items-center justify-center text-xs font-bold hover:border-[#FDE080]/50 hover:text-[#FDE080] transition-colors"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {NAV.map((link) => (
                <li key={link.href}>
                  <motion.button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-600 hover:text-[#FDE080] transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.branches}</h4>
            <ul className="space-y-3">
              {CAFE_CONFIG.branches.map((b) => (
                <li key={b.name}>
                  <p className="text-sm text-white font-medium">{b.name}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{b.workHours}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.contacts}</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${CAFE_CONFIG.contacts.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FDE080] transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  {CAFE_CONFIG.contacts.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{CAFE_CONFIG.branches[0].address}</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{CAFE_CONFIG.branches[0].workHours}</span>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/5 py-5 flex flex-col items-center gap-1.5">
        <p className="text-center text-sm text-gray-700">
          {t.footer.copyright.replace("{name}", CAFE_CONFIG.name)}
        </p>
        <p className="text-xs text-gray-700">
          made by{" "}
          <span className="text-[#FDE080]/70 font-semibold tracking-wide">Ulugbek_devv</span>
        </p>
      </div>
    </footer>
  );
}
