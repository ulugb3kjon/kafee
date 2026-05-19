"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { fadeUp, VIEWPORT } from "@/lib/animations";
import { checkBranchOpen } from "@/lib/openStatus";

export default function Branches() {
  const router = useRouter();
  const { t } = useLang();
  const preview = CAFE_CONFIG.branches.slice(0, 2);

  return (
    <section id="branches" className="py-24 overflow-hidden" style={{ backgroundColor: "#111" }}>
      <div className="container mx-auto px-4 max-w-5xl">

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
            {t.branches.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4 font-serif">
            {t.branches.title}
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Toshkentning {CAFE_CONFIG.branches.length} ta nuqtasida sizni kutmoqdamiz
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-2 gap-4 mb-10"
        >
          {preview.map((branch) => {
            const isOpen = checkBranchOpen(branch.workHours);
            return (
              <motion.div
                key={branch.name}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-lg">{branch.name}</h3>
                  <span
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={isOpen
                      ? { backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }
                      : { backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }
                    }
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                    {isOpen ? t.openStatus.open : t.openStatus.closed}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "rgba(253,224,128,0.6)" }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 shrink-0" style={{ color: "rgba(253,224,128,0.6)" }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{branch.workHours}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 shrink-0" style={{ color: "rgba(253,224,128,0.6)" }} />
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-sm font-semibold" style={{ color: "#FDE080" }}>
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => router.push("/branches")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{ backgroundColor: "#FDE080", borderColor: "#FDE080", color: "#0a0a0a", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            Barcha filiallar — batafsil
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
