"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import RecipeShowcase from "@/components/sections/RecipeShowcase";
import QualityCertifications from "@/components/sections/QualityCertifications";
import VideoShowcase from "@/components/sections/VideoShowcase";
import AboutStorySection from "@/components/sections/AboutStorySection";
import ContactCta from "@/components/sections/ContactCta";
import Footer from "@/components/layout/Footer";
import FloatingChatButton from "@/components/chatbot/FloatingChatButton";
import ChatWindow from "@/components/chatbot/ChatWindow";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string>("");

  const handleOpenChat = (query?: string) => {
    if (query) {
      setChatInitialQuery(query);
    }
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col selection:bg-teal selection:text-navy-950 relative">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content Flow theo đúng thứ tự:
          Hero → 1. Sản Phẩm → 2. Xưởng Ẩm Thực → 3. Tiêu Chuẩn & So Sánh → 4. Phim Tài Liệu → 5. Về MAVY → 6. Liên Hệ */}
      <main className="flex-grow">
        {/* Hero: Giới thiệu & Định vị thương hiệu MAVY */}
        <HeroSection />

        {/* 1. Sản Phẩm: Danh mục 3 hải sản chủ lực & Bảng thông số kỹ thuật */}
        <ProductsSection onSelectProductForChef={handleOpenChat} />

        {/* 2. Xưởng Ẩm Thực: 4 giai đoạn nấu chuẩn nhà hàng & Bếp trưởng AI */}
        <RecipeShowcase onOpenChat={handleOpenChat} />

        {/* 3. Tiêu Chuẩn & So Sánh: Bảng so sánh minh bạch MAVY vs Chợ & 4 Tiêu chuẩn kiểm định */}
        <QualityCertifications />

        {/* 4. Phim Tài Liệu: Thước phim thực địa quy trình đánh bắt & cấp đông IQF */}
        <VideoShowcase />

        {/* 5. Về MAVY: Câu chuyện tâm huyết & 4 Cam kết vàng MAVY */}
        <AboutStorySection />

        {/* 6. Liên Hệ: Chính sách giao hỏa tốc 2H, bảo hành 1 đổi 1 & Hotline Zalo đặt hàng */}
        <ContactCta />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Global Floating Chef AI Button (Draggable) */}
      <FloatingChatButton
        isOpen={isChatOpen}
        onClick={() => handleOpenChat()}
      />

      {/* 5. Global Chef AI Popup Modal */}
      <ChatWindow
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialQuery={chatInitialQuery}
      />
    </div>
  );
}
