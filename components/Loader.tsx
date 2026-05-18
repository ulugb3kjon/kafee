"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { CAFE_CONFIG } from "@/config/cafe.config";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-amber-50 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center mb-6"
      >
        <Coffee className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="h-1 bg-amber-800 rounded-full"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-amber-800 font-semibold font-serif text-lg"
      >
        {CAFE_CONFIG.name}
      </motion.p>
    </motion.div>
  );
}
