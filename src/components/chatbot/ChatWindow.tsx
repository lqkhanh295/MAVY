"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoSend, IoRefreshOutline, IoRestaurant, IoSyncOutline } from "react-icons/io5";
import { ChatMessage as ChatMessageType } from "@/types";
import ChatMessage from "./ChatMessage";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function ChatWindow({ isOpen, onClose, initialQuery }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "welcome-1",
      sender: "chef",
      text: "Xin chào! Tôi là Bếp Trưởng Điều Hành MAVY Seafood.\n\nBạn đang có những nguyên liệu gì trong bếp hoặc tủ lạnh (Cua, Tôm, Mực, bơ tỏi, sả, gừng, trứng muối, rau củ...)? Hãy nhập bên dưới, tôi sẽ thiết kế công thức món ngon độc quyền chuẩn vị cho bạn!",
      suggestedFollowUps: [
        "Tôm sú + sốt bơ tỏi",
        "Mực trứng + sốt me chua cay",
        "Cua gạch + hấp nước dừa",
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);

  // Quick suggestion chips
  const quickChips = [
    "Tôm sú + bơ tỏi",
    "Mực trứng + chiên mắm",
    "Cua gạch + sốt trứng muối",
    "Hải sản hấp sả gừng",
  ];

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  // Intelligent Scroll: Scroll to the TOP of newly received chef recipes so user reads from line 1
  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "chef") {
        latestMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const chefMsg: ChatMessageType = {
          id: `chef-${Date.now()}`,
          sender: "chef",
          text: result.data.message || "Bếp Trưởng MAVY đã thiết kế công thức đặc biệt này dành riêng cho bạn:",
          recipes: result.data.recipes || [],
          suggestedFollowUps: result.data.suggestedFollowUps || [
            "Bí quyết làm nước chấm hải sản chuẩn vị?",
            "Mẹo giữ hải sản mọng nước không bị khô?",
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, chefMsg]);
      } else {
        throw new Error(result.message || "Không thể tạo công thức");
      }
    } catch {
      const fallbackMsg: ChatMessageType = {
        id: `chef-fallback-${Date.now()}`,
        sender: "chef",
        text: "Bếp Trưởng đã nhận được nguyên liệu. Dưới đây là kỹ thuật nấu tối ưu nhất để giữ vị ngọt nguyên bản:",
        recipes: [
          {
            id: "hai-san-bo-toi",
            title: "Hải Sản Áp Chảo Bơ Tỏi Thảo Mộc",
            category: "combo",
            prepTime: "15 phút",
            cookTime: "15 phút",
            difficulty: "Dễ",
            servings: "2 - 4 người",
            description: "Món ăn tận dụng nguyên liệu tự nhiên tươi sạch kết hợp cùng các gia vị trong bếp để tôn lên độ ngọt bùi của hải sản MAVY.",
            flavorProfile: "Thơm dịu thảo mộc, ngọt thanh tự nhiên, giòn dai mọng nước",
            ingredients: [
              { name: "Hải sản tươi sạch MAVY", amount: "500g", isMain: true },
              { name: "Bơ lạt hoặc dầu ô liu", amount: "30g" },
              { name: "Tỏi tép & sả tươi băm nhuyễn", amount: "2 củ" },
              { name: "Gia vị chuẩn (muối biển, tiêu sọ, chanh)", amount: "Vừa đủ" },
            ],
            steps: [
              "Sơ chế: Rửa sạch hải sản, để ráo nước hoàn toàn để khi nấu không bị ra nước.",
              "Chế biến: Làm nóng chảo với lửa lớn, áp chảo nhanh mỗi mặt trong 3-4 phút để thịt săn chắc và giữ trọn dưỡng chất.",
              "Hoàn thiện: Tắt bếp, rưới sốt bơ tỏi ấm và rắc tiêu sọ đập dập lên trên. Dùng nóng ngay lập tức.",
            ],
            chefTips: "Luôn nấu hải sản ở lửa lớn trong thời gian vừa đủ, không nấu quá lâu sẽ làm mất độ mọng nước tự nhiên.",
          },
        ],
        suggestedFollowUps: [
          "Cách khử mùi tanh hải sản hiệu quả nhất",
          "Bí quyết làm nước chấm muối ớt xanh chuẩn vị",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "chef",
        text: "Bếp Trưởng MAVY đã sẵn sàng! Hãy nhập các nguyên liệu tiếp theo bạn muốn chế biến nhé.",
        suggestedFollowUps: [
          "Tôm sú + bơ tỏi",
          "Mực trứng + sốt me",
          "Cua gạch + sốt trứng muối",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-end sm:items-end justify-end sm:p-6">
          {/* Subtle Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] sm:hidden pointer-events-auto"
          />

          {/* Floating Popup Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative w-full sm:w-[460px] h-[85vh] sm:h-[620px] max-h-[85vh] bg-navy-950 border border-navy-700 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 rounded-t-3xl"
          >
            {/* Header */}
            <div className="p-4 bg-navy-900 border-b border-navy-800 flex items-center justify-between shadow-md select-none">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-950 border border-gold/70 flex items-center justify-center text-gold shadow-sm">
                  <IoRestaurant className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    Bếp Trưởng MAVY AI
                  </h3>
                  <p className="text-[10px] text-ink-light/70 leading-tight">Gợi ý món ngon từ nguyên liệu sẵn có</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-2 rounded-xl text-ink-light/70 hover:text-white hover:bg-navy-800 transition-colors"
                  title="Làm mới cuộc trò chuyện"
                  aria-label="Reset chat"
                >
                  <IoRefreshOutline className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-ink-light/70 hover:text-white hover:bg-navy-800 transition-colors"
                  title="Đóng cửa sổ"
                  aria-label="Close chat"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-navy-950/90 space-y-2 scroll-smooth">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  ref={idx === messages.length - 1 ? latestMessageRef : undefined}
                  className="scroll-mt-2"
                >
                  <ChatMessage
                    message={msg}
                    onSelectFollowUp={(query) => handleSendMessage(query)}
                  />
                </div>
              ))}

              {/* Loading Chef Indicator */}
              {isLoading && (
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-navy-900 border border-navy-700 text-xs text-ink-light w-fit animate-pulse">
                  <IoSyncOutline className="w-4 h-4 text-gold animate-spin" />
                  <span>Bếp Trưởng MAVY đang tính toán công thức...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-navy-900 border-t border-navy-800/80 overflow-x-auto flex gap-1.5 scrollbar-none">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-navy-950 border border-navy-800 text-ink-light hover:border-gold hover:text-gold transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-navy-900 border-t border-navy-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập nguyên liệu bạn có (VD: tôm, bơ tỏi, chanh...)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs sm:text-sm text-white placeholder-ink-light/40 focus:outline-none focus:border-gold transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-gold text-navy-950 hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-md font-bold"
                aria-label="Gửi tin nhắn"
              >
                <IoSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
