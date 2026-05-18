"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink, Map } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import YandexMap, { AllBranchesMap } from "./YandexMap";
import { fadeUp, stagger, staggerItem, VIEWPORT, cardHover } from "@/lib/animations";
import { checkBranchOpen } from "@/lib/openStatus";

export default function Branches() {
  const { t } = useLang();
  const [openMap, setOpenMap] = useState<number | "all" | null>(null);
  const mapBranches = CAFE_CONFIG.branches.map((b) => ({ name: b.name, lat: b.lat, lng: b.lng }));

  return (
    <section id="branches" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} className="text-center mb-12">
          <span className="text-amber-700 font-medium uppercase tracking-widest text-sm">{t.branches.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-serif">{t.branches.title}</h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={stagger}
          className={`grid gap-6 ${CAFE_CONFIG.branches.length === 1 ? "max-w-lg mx-auto" : CAFE_CONFIG.branches.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {CAFE_CONFIG.branches.map((branch, i) => (
            <motion.div key={branch.name} variants={staggerItem} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm" whileHover={cardHover}>
              <div className="bg-linear-to-br from-amber-50 to-amber-100/40 p-6">
                <div className="w-11 h-11 bg-amber-800 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${checkBranchOpen(branch.workHours) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${checkBranchOpen(branch.workHours) ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                    {checkBranchOpen(branch.workHours) ? t.openStatus.open : t.openStatus.closed}
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-gray-600 text-sm">{branch.workHours}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-amber-800 font-semibold text-sm hover:underline">{branch.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setOpenMap(openMap === i ? null : i)}
                    className="flex items-center gap-1.5 text-sm font-medium text-amber-800 hover:text-amber-600 transition-colors">
                    <Map className="w-4 h-4" />
                    {openMap === i ? t.branches.hideMap : t.branches.showMap}
                  </button>
                  <span className="text-gray-200">|</span>
                  <a href={branch.mapLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-amber-700 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />Yandex Maps
                  </a>
                </div>
              </div>
              <AnimatePresence>
                {openMap === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                    <YandexMap lat={branch.lat} lng={branch.lng} zoom={16} height={260} title={branch.name} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} className="text-center mt-10">
          <motion.button onClick={() => setOpenMap(openMap === "all" ? null : "all")}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-800 text-amber-800 rounded-full font-semibold hover:bg-amber-800 hover:text-white transition-all text-sm"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Map className="w-4 h-4" />
            {openMap === "all" ? t.branches.hideMap : t.branches.allOnMap}
          </motion.button>
          <AnimatePresence>
            {openMap === "all" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden mt-6">
                <AllBranchesMap branches={mapBranches} height={420} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
