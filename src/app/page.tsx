"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import VideoShowcase from "@/components/sections/VideoShowcase";
import ProductsSection from "@/components/sections/ProductsSection";
import RecipeShowcase from "@/components/sections/RecipeShowcase";
import AboutStorySection from "@/components/sections/AboutStorySection";
import QualityCertifications from "@/components/sections/QualityCertifications";
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
    <div className="min-h-screen bg-navy-950 text-white flex flex-col selection:bg-coral selection:text-navy-950 relative">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content Flow: Hero → Video → Products → Recipe → About → Certifications → Contact */}
      <main className="flex-grow">
        {/* 1. Hero: Giới thiệu & Định vị thương hiệu MAVY */}
        <HeroSection />

        {/* 2. Video: Thước phim thực địa quy trình đánh bắt & cấp đông IQF */}
        <VideoShowcase />

        {/* 3. Products: Danh mục 3 hải sản chủ lực & Bảng thông số kỹ thuật */}
        <ProductsSection onSelectProductForChef={handleOpenChat} />

        {/* 4. Recipe: Xưởng ẩm thực & 4 giai đoạn nấu chuẩn nhà hàng */}
        <RecipeShowcase onOpenChat={handleOpenChat} />

        {/* 5. About: Câu chuyện tâm huyết & 4 Cam kết vàng MAVY */}
        <AboutStorySection />

        {/* 6. Certifications: Bảng so sánh minh bạch MAVY vs Chợ & 4 Tiêu chuẩn kiểm định */}
        <QualityCertifications />

        {/* 7. Contact: Chính sách giao hỏa tốc 2H, bảo hành 1 đổi 1 & Hotline đặt hàng */}
        <ContactCta />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Global Floating Chef AI Button */}
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
