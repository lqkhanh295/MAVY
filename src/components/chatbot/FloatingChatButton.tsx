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
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileDrag={{
        scale: 1.08,
        rotate: 1.5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.85)",
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full bg-navy-900/95 border border-gold/60 text-gold shadow-2xl backdrop-blur-md hover:border-gold hover:bg-navy-850 transition-colors duration-200 cursor-grab active:cursor-grabbing select-none touch-none group"
      aria-label="Mở Bếp Trưởng AI"
      title="Bấm để mở hoặc kéo thả di chuyển khắp màn hình"
    >
      {/* Refined Chef Icon Container */}
      <div className="w-8 h-8 rounded-full bg-navy-950 border border-gold/60 flex items-center justify-center text-gold group-hover:border-gold group-hover:scale-105 transition-all pointer-events-none">
        <IoRestaurantOutline className="w-4 h-4 text-gold" />
      </div>

      {/* Typography */}
      <div className="text-left pr-1 pointer-events-none">
        <div className="text-xs font-bold text-white group-hover:text-gold transition-colors leading-tight">
          Bếp Trưởng AI
        </div>
        <div className="text-[10px] text-ink-light/70 leading-tight">
          Gợi ý món theo nguyên liệu
        </div>
      </div>
    </motion.div>
  );
}
