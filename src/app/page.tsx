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

export default function Home() {
  const [selectedProductForChef, setSelectedProductForChef] = useState<string>("");

  const handleSelectProductForChef = (productName: string) => {
    setSelectedProductForChef(productName);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col selection:bg-gold selection:text-navy-950">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content Flow: Hero → Video → Products → Recipe → About → Certifications → Contact */}
      <main className="flex-grow">
        {/* 1. Hero: Giới thiệu & Định vị thương hiệu MAVY */}
        <HeroSection />

        {/* 2. Video: Thước phim thực địa quy trình đánh bắt & cấp đông IQF */}
        <VideoShowcase />

        {/* 3. Products: Danh mục 3 hải sản chủ lực & Bảng thông số kỹ thuật inline */}
        <ProductsSection onSelectProductForChef={handleSelectProductForChef} />

        {/* 4. Recipe: Xưởng ẩm thực & Bếp trưởng AI tạo công thức theo nguyên liệu */}
        <RecipeShowcase initialIngredientQuery={selectedProductForChef} />

        {/* 5. About: Câu chuyện tâm huyết & 4 Cam kết vàng MAVY */}
        <AboutStorySection />

        {/* 6. Certifications: Bảng so sánh minh bạch MAVY vs Chợ & 4 Tiêu chuẩn kiểm định */}
        <QualityCertifications />

        {/* 7. Contact: Chính sách giao hỏa tốc 2H, bảo hành 1 đổi 1 & Hotline đặt hàng */}
        <ContactCta />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
