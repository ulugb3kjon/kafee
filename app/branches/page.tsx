"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink, ArrowLeft, Map } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { useLang } from "@/contexts/LanguageContext";
import { checkBranchOpen } from "@/lib/openStatus";
import YandexMap, { AllBranchesMap } from "@/components/YandexMap";

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

export default function BranchesPage() {
  const router = useRouter();
  const { t } = useLang();
  const [openMap, setOpenMap] = useState<number | "all" | null>(null);
  const mapBranches = CAFE_CONFIG.branches.map((b) => ({ name: b.name, lat: b.lat, lng: b.lng }));

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
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#FDE080" }}>
              {t.branches.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 font-serif leading-[1.05]">
              {t.branches.title}
            </h1>
            <p className="text-white/45 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Toshkentning {CAFE_CONFIG.branches.length} ta nuqtasida sizni issiq qabul qilishga tayyormiz. Eng yaqin filialimizni toping.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* All branches on map */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <AllBranchesMap branches={mapBranches} height={400} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Branch cards */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">Barcha filiallar</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAFE_CONFIG.branches.map((branch, i) => {
              const isOpen = checkBranchOpen(branch.workHours);
              return (
                <FadeIn key={branch.name} delay={i * 0.08}>
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(253,224,128,0.1)" }}>
                          <MapPin className="w-5 h-5" style={{ color: "#FDE080" }} />
                        </div>
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

                      <h3 className="text-xl font-bold text-white mb-4">{branch.name}</h3>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "rgba(253,224,128,0.55)" }} />
                          <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 shrink-0" style={{ color: "rgba(253,224,128,0.55)" }} />
                          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{branch.workHours}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 shrink-0" style={{ color: "rgba(253,224,128,0.55)" }} />
                          <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-sm font-semibold" style={{ color: "#FDE080" }}>
                            {branch.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setOpenMap(openMap === i ? null : i)}
                          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                          style={{ color: "#FDE080" }}
                        >
                          <Map className="w-4 h-4" />
                          {openMap === i ? t.branches.hideMap : t.branches.showMap}
                        </button>
                        <span style={{ color: "rgba(255,255,255,0.1)" }}>|</span>
                        <a
                          href={branch.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm transition-colors"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Yandex Maps
                        </a>
                      </div>
                    </div>

                    <AnimatePresence>
                      {openMap === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <YandexMap lat={branch.lat} lng={branch.lng} zoom={16} height={260} title={branch.name} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-32">
        <FadeIn>
          <div
            className="max-w-3xl mx-auto rounded-3xl p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(135deg, #1a0f00 0%, #0d0d0d 100%)", border: "1px solid rgba(253,224,128,0.12)" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">Buyurtma bering</h2>
            <p className="text-white/45 text-base mb-8">Filialga keling yoki yetkazib berishni buyurtma qiling</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={() => router.push("/#menu")}
                className="px-8 py-3.5 rounded-full font-semibold text-sm"
                style={{ backgroundColor: "#FDE080", color: "#0a0a0a" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Menyuni ko'rish
              </motion.button>
              <motion.button
                onClick={() => router.push("/order")}
                className="px-8 py-3.5 rounded-full font-semibold text-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.97 }}
              >
                Buyurtma berish
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
