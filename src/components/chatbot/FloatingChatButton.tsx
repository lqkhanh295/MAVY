"use client";

import { motion } from "framer-motion";
import { IoRestaurantOutline, IoChatbubblesOutline } from "react-icons/io5";

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function FloatingChatButton({ isOpen, onClick }: FloatingChatButtonProps) {
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-gold/60 text-gold shadow-2xl backdrop-blur-md group hover:border-gold transition-all duration-300 cursor-pointer"
      aria-label="Mở Bếp Trưởng AI"
    >
      {/* Live Online Breathing Dot */}
      <div className="relative flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
      </div>

      {/* Chef Icon & Typography */}
      <div className="flex items-center gap-2">
        <IoRestaurantOutline className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform duration-300" />
        <div className="text-left">
          <div className="text-xs font-bold text-white leading-none">Bếp Trưởng AI</div>
          <div className="text-[10px] text-ink-light/70 leading-tight mt-0.5">Gợi ý món theo nguyên liệu</div>
        </div>
      </div>
    </motion.button>
  );
}
