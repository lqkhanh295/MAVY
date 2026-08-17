"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoSparkles } from "react-icons/io5";

export default function PageIntroReveal() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00153d] text-white"
        >
          {/* Background Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] bg-[#073372] rounded-full blur-[100px] opacity-60" />
          <div className="absolute w-[200px] h-[200px] bg-[#F2A900]/20 rounded-full blur-[70px]" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center space-y-4 text-center px-4"
          >
            {/* Logo */}
            <div className="relative w-20 h-20 rounded-full bg-[#073372] border-2 border-[#F2A900] p-2 flex items-center justify-center shadow-2xl shadow-[#F2A900]/30 animate-pulse">
              <Image
                src="/assets/image/logo.png"
                alt="Logo MAVY"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>

            {/* Brand Text */}
            <div className="space-y-1">
              <motion.h2
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
              >
                MAVY <span className="text-[#F2A900]">SEAFOOD</span>
              </motion.h2>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-xs sm:text-sm text-[#E8EEF9]/80 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5"
              >
                <IoSparkles className="w-3.5 h-3.5 text-[#F2A900]" />
                <span>Tinh Hoa Hải Sản Biển Sạch</span>
              </motion.p>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-36 h-1 bg-[#073372] rounded-full overflow-hidden mt-4 border border-[#164082]">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="h-full bg-[#F2A900]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
