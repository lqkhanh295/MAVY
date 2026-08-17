"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import VideoShowcase from "@/components/sections/VideoShowcase";
import ProductsSection from "@/components/sections/ProductsSection";
import RecipeShowcase from "@/components/sections/RecipeShowcase";
import AboutStorySection from "@/components/sections/AboutStorySection";
import QualityCertifications from "@/components/sections/QualityCertifications";
import ContactCta from "@/components/sections/ContactCta";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";
import PageIntroReveal from "@/components/ui/PageIntroReveal";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  // Đảm bảo luôn cuộn lên đầu trang (0, 0) khi tải hoặc làm mới trang
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleOpenChatWithQuery = (query: string) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };

  const handleOpenChat = () => {
    setChatInitialQuery(undefined);
    setIsChatOpen(true);
  };

  const handleScrollToProduct = (productId: string) => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#00153d] text-white selection:bg-[#F2A900] selection:text-[#00153d] relative">
      {/* Cinematic Opening Intro Reveal Animation */}
      <PageIntroReveal />

      {/* Navigation Bar */}
      <Navbar
        onOpenChat={handleOpenChat}
        onOpenConsultModal={() => {
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Hero Section with Signature 3D Floating Reveal */}
      <HeroSection
        onOpenChat={handleOpenChat}
        onSelectProduct={handleScrollToProduct}
      />

      {/* Brand Film Video Showcase */}
      <VideoShowcase />

      {/* Signature Products Section (Cua, Tôm Sú, Mực) */}
      <ProductsSection
        onAskChefWithProduct={(productName) =>
          handleOpenChatWithQuery(`Gợi ý các món ngon nhất làm từ ${productName}`)
        }
      />

      {/* Culinary Inspiration & Recipe Showcase */}
      <RecipeShowcase
        onOpenChat={handleOpenChat}
        onAskChefRecipe={(recipeTitle) =>
          handleOpenChatWithQuery(`Bếp trưởng hướng dẫn mẹo nấu món: ${recipeTitle}`)
        }
      />

      {/* Brand Story & IQF Flash Freeze Technology */}
      <AboutStorySection />

      {/* Certifications (HACCP, ISO 22000) & Customer Testimonials */}
      <QualityCertifications />

      {/* Contact & Consultation Booking Form */}
      <ContactCta />

      {/* Footer */}
      <Footer />

      {/* Floating AI Master Chef Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
      />
    </main>
  );
}
