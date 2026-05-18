"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, X } from "lucide-react";

interface YandexMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: number;
  title?: string;
}

export default function YandexMap({
  lat,
  lng,
  zoom = 16,
  height = 320,
  title,
}: YandexMapProps) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://yandex.uz/map-widget/v1/?ll=${lng},${lat}&z=${zoom}&pt=${lng},${lat},pm2rdm&lang=ru_RU&source=constructor`;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gray-100"
      style={{ height }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-amber-50 z-10">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="w-6 h-6 text-amber-800" />
          </div>
          <p className="text-sm text-gray-500">Xarita yuklanmoqda...</p>
        </div>
      )}
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title={title ?? "Yandex Xarita"}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

interface AllBranchesMapProps {
  branches: Array<{ name: string; lat: number; lng: number }>;
  height?: number;
}

export function AllBranchesMap({ branches, height = 400 }: AllBranchesMapProps) {
  const avgLat = branches.reduce((s, b) => s + b.lat, 0) / branches.length;
  const avgLng = branches.reduce((s, b) => s + b.lng, 0) / branches.length;
  const pts = branches
    .map((b) => `${b.lng},${b.lat},pm2rdm`)
    .join("~");
  const src = `https://yandex.uz/map-widget/v1/?ll=${avgLng},${avgLat}&z=12&pt=${pts}&lang=ru_RU&source=constructor`;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100" style={{ height }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50 z-10">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="w-5 h-5 text-amber-800" />
          </div>
        </div>
      )}
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title="Barcha filiallar"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

interface AddressMapModalProps {
  lat: number;
  lng: number;
  address: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddressMapModal({ lat, lng, address, isOpen, onClose }: AddressMapModalProps) {
  if (!isOpen) return null;
  const src = `https://yandex.uz/map-widget/v1/?ll=${lng},${lat}&z=17&pt=${lng},${lat},pm2rdm&lang=ru_RU&source=constructor`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-800" />
            <span className="font-semibold text-gray-900 text-sm truncate max-w-xs">{address}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <iframe src={src} width="100%" height="380" frameBorder="0" title="Manzil xaritasi" />
      </motion.div>
    </motion.div>
  );
}
