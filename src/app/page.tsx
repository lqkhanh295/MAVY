"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import QualityCertifications from "@/components/sections/QualityCertifications";
import RecipeShowcase from "@/components/sections/RecipeShowcase";
import VideoShowcase from "@/components/sections/VideoShowcase";
import AboutStorySection from "@/components/sections/AboutStorySection";
import ContactCta from "@/components/sections/ContactCta";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [selectedProductForChef, setSelectedProductForChef] = useState<string>("");

  const handleSelectProductForChef = (productName: string) => {
    setSelectedProductForChef(productName);
  };

  return (
    <div className="min-h-screen bg-[#00153d] text-white flex flex-col selection:bg-[#F2A900] selection:text-[#00153d]">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content Flow */}
      <main className="flex-grow">
        {/* Hero: What is MAVY & Core Value Proposition */}
        <HeroSection />

        {/* Products: What should I buy? Detailed specs & pricing */}
        <ProductsSection onSelectProductForChef={handleSelectProductForChef} />

        {/* Standards & Transparency: Why trust MAVY vs traditional market? */}
        <QualityCertifications />

        {/* Culinary Workshop: Embedded AI Master Chef & Recipe Collection */}
        <RecipeShowcase initialIngredientQuery={selectedProductForChef} />

        {/* Video Documentary: On-boat harvesting & IQF technology */}
        <VideoShowcase />

        {/* Brand Origin & 4 Golden Commitments */}
        <AboutStorySection />

        {/* Contact & 2-Hour Dispatch Fulfillment */}
        <ContactCta />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
