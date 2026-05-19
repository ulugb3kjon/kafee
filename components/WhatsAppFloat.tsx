"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";

export default function PhoneFloat() {
  const [hovered, setHovered] = useState(false);
  const phone = CAFE_CONFIG.contacts.phone;
  const href = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <motion.div
      className="fixed bottom-8 right-4 md:right-6 z-40 flex items-center justify-end"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Phone number label — slides in on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={href}
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mr-3 bg-[#1a1a1a] border border-white/10 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl whitespace-nowrap"
          >
            {phone}
          </motion.a>
        )}
      </AnimatePresence>

      {/* Pulse rings */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#FDE080]/20 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-[#FDE080]/10 animate-ping [animation-delay:0.4s]" />

        {/* Button */}
        <motion.a
          href={href}
          aria-label="Qo'ng'iroq qilish"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="relative w-14 h-14 bg-[#FDE080] rounded-full flex items-center justify-center shadow-xl shadow-[#FDE080]/20"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.div
            animate={{ rotate: hovered ? [0, -15, 15, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Phone className="w-6 h-6 text-[#0a0a0a] fill-[#0a0a0a]/20" />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
}
