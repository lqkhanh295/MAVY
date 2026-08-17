"use client";

import { motion } from "framer-motion";
import { IoRestaurantOutline } from "react-icons/io5";

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
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full bg-navy-900/95 border border-gold/50 text-gold shadow-2xl backdrop-blur-md hover:border-gold hover:bg-navy-800 transition-all duration-200 cursor-pointer group"
      aria-label="Mở Bếp Trưởng AI"
    >
      {/* Refined Chef Icon Container */}
      <div className="w-8 h-8 rounded-full bg-navy-950 border border-gold/60 flex items-center justify-center text-gold group-hover:border-gold group-hover:scale-105 transition-all">
        <IoRestaurantOutline className="w-4 h-4 text-gold" />
      </div>

      {/* Typography */}
      <div className="text-left pr-1">
        <div className="text-xs font-bold text-white group-hover:text-gold transition-colors leading-tight">
          Bếp Trưởng AI
        </div>
        <div className="text-[10px] text-ink-light/70 leading-tight">
          Gợi ý món theo nguyên liệu
        </div>
      </div>
    </motion.button>
  );
}
