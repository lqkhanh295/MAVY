"use client";

import { useState, useRef, useEffect } from "react";
import { IoClose, IoSend, IoRefreshOutline, IoSparkles, IoRestaurant, IoSyncOutline } from "react-icons/io5";
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
      text: "Xin chào! Tôi là Bếp Trưởng Master Chef của MAVY Seafood 👨‍🍳\n\nBạn đang có những nguyên liệu gì trong bếp hoặc tủ lạnh (Cua, Tôm, Mực, thịt bò, trứng, rau củ, phô mai...)? Hãy chia sẻ, tôi sẽ sáng tạo công thức món ngon độc quyền dành riêng cho bạn!",
      suggestedFollowUps: [
        "Tôm sú + bơ tỏi + chanh",
        "Mực một nắng + sả + ớt",
        "Cua Cà Mau + trứng muối",
        "Thịt bò kobe + cá hồi",
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
    "Tôm sú + sốt bơ tỏi",
    "Mực + dứa + ớt chuông",
    "Cua Cà Mau + sốt me chua",
    "Thịt bò + cá hồi + sò điệp",
  ];

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  // Intelligent Scroll: Scroll to the TOP of newly received chef recipes so the user reads from line 1
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
            "Cách làm sốt chấm chua cay chuẩn vị?",
            "Mẹo giữ hải sản tươi ngọt nhất?",
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, chefMsg]);
      } else {
        throw new Error(result.error || "Không nhận được phản hồi hợp lệ");
      }
    } catch (err: any) {
      console.error("[Chat Window] Error sending message:", err);
      const fallbackMsg: ChatMessageType = {
        id: `chef-${Date.now()}`,
        sender: "chef",
        text: `Bếp Trưởng MAVY rất vui được phục vụ bạn! Dưới đây là gợi ý công thức từ nguyên liệu "${query}":`,
        recipes: [
          {
            id: `recipe-fallback-${Date.now()}`,
            title: `Món Ngon Đặc Biệt Từ ${query.slice(0, 30)}`,
            category: "combo",
            prepTime: "15 phút",
            cookTime: "15 phút",
            difficulty: "Dễ",
            servings: "2 - 3 người",
            description: "Công thức tối ưu từ các nguyên liệu sẵn có, giữ trọn độ tươi giòn và ngọt vị tự nhiên.",
            flavorProfile: "Thơm lừng bơ tỏi, đậm đà dậy vị.",
            ingredients: [
              { name: query, amount: "Lượng sẵn có", isMain: true },
              { name: "Bơ lạt & Tỏi băm", amount: "Vừa đủ dùng" },
              { name: "Gia vị chuẩn (muối tiêu, chanh)", amount: "Vừa khẩu vị" },
            ],
            steps: [
              "Sơ chế sạch các nguyên liệu có sẵn, thấm khô ráo nước.",
              "Đun chảy bơ lạt, phi thơm tỏi băm đến khi ngả vàng óng.",
              "Cho các nguyên liệu chính vào xào/áp chảo đảo nhanh tay ở nhiệt độ cao.",
              "Nêm nếm gia vị vừa miệng, thêm chút tiêu xay và nước cốt chanh vàng.",
              "Bày ra đĩa và thưởng thức nóng hổi cùng gia đình!",
            ],
            chefTips: "Áp chảo ở nhiệt độ cao nhanh tay để hải sản giữ trọn độ mọng nước tự nhiên.",
          },
        ],
        suggestedFollowUps: ["Mẹo khử mùi tanh hải sản?", "Cách làm sốt chấm muối ớt xanh?"],
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
        id: "welcome-reset",
        sender: "chef",
        text: "Bếp Trưởng MAVY đã sẵn sàng! Hãy nhập nguyên liệu tiếp theo bạn muốn nấu nhé 👨‍🍳",
        suggestedFollowUps: [
          "Tôm sú + bơ tỏi",
          "Mực tươi + ớt chuông",
          "Cua Cà Mau sốt trứng muối",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[480px] sm:h-[650px] bg-[#00153d] border border-[#073372] sm:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-slideUp">
      {/* Chat Window Header */}
      <div className="p-4 bg-[#073372] border-b border-[#164082] flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-[#00153d] border border-[#F2A900] flex items-center justify-center text-[#F2A900]">
            <IoRestaurant className="w-5 h-5" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#073372] rounded-full" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Bếp Trưởng MAVY AI</span>
              <IoSparkles className="w-3.5 h-3.5 text-[#F2A900]" />
            </h3>
            <p className="text-[10px] text-[#E8EEF9]/70">Gợi ý món ngon từ mọi nguyên liệu</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-2 rounded-lg text-[#E8EEF9] hover:text-white hover:bg-[#0c4494] transition-colors"
            title="Làm mới cuộc trò chuyện"
            aria-label="Reset chat"
          >
            <IoRefreshOutline className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#E8EEF9] hover:text-white hover:bg-[#0c4494] transition-colors"
            title="Đóng cửa sổ"
            aria-label="Close chat"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#00153d]/90 space-y-2 scroll-smooth">
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
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#073372] border border-[#164082] text-xs text-[#E8EEF9] w-fit">
            <IoSyncOutline className="w-4 h-4 text-[#F2A900] animate-spin" />
            <span>Bếp Trưởng MAVY đang thiết kế công thức món ngon...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-2 bg-[#051e48] border-t border-[#073372] overflow-x-auto flex gap-1.5 scrollbar-none">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="shrink-0 text-[11px] px-2.5 py-1 rounded-md bg-[#00153d] border border-[#073372] text-[#E8EEF9] hover:border-[#F2A900] hover:text-[#F2A900] transition-colors"
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
        className="p-3 bg-[#051e48] border-t border-[#073372] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập nguyên liệu bạn có (VD: tôm, tỏi, me...)"
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#00153d] border border-[#073372] text-xs sm:text-sm text-white placeholder-[#E8EEF9]/40 focus:outline-none focus:border-[#F2A900] transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2.5 rounded-xl bg-[#F2A900] text-[#00153d] hover:bg-[#d99700] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-md font-bold"
          aria-label="Gửi tin nhắn"
        >
          <IoSend className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
