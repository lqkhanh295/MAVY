"use client";

import { useState, useRef } from "react";
import { IoRestaurant, IoSparkles, IoClose } from "react-icons/io5";
import { animate } from "animejs";
import ChatWindow from "./ChatWindow";

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  initialQuery?: string;
}

export default function ChatWidget({ isOpen, onToggle, onClose, initialQuery }: ChatWidgetProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: [1, 0.88, 1.15, 1],
        duration: 500,
        ease: "outElastic(1, .5)",
        onComplete: () => {
          onToggle();
        },
      });
    } else {
      onToggle();
    }
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          {/* Invitation Tooltip */}
          {showTooltip && (
            <div className="relative bg-[#073372] border border-[#F2A900]/70 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl max-w-[220px] flex items-center justify-between gap-2 animate-fadeIn">
              <span className="leading-snug">
                Tủ lạnh bạn còn gì? Để <span className="text-[#F2A900]">Bếp Trưởng AI</span> gợi ý món ngon!
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-[#E8EEF9]/60 hover:text-white"
                aria-label="Đóng gợi ý"
              >
                <IoClose className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Main Floating Button */}
          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className="relative w-14 h-14 rounded-full bg-[#F2A900] text-[#00153d] shadow-2xl flex items-center justify-center hover:bg-[#d99700] hover:scale-105 active:scale-95 transition-all group"
            aria-label="Mở Bếp Trưởng AI MAVY"
          >
            {/* Ambient Pulse Ring */}
            <span className="absolute inset-0 rounded-full bg-[#F2A900] opacity-30 animate-ping" />

            <div className="relative z-10 flex items-center justify-center">
              <IoRestaurant className="w-6 h-6 text-[#00153d]" />
              <IoSparkles className="w-3.5 h-3.5 text-[#00153d] absolute -top-1 -right-1" />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window Dialog */}
      <ChatWindow isOpen={isOpen} onClose={onClose} initialQuery={initialQuery} />
    </>
  );
}
