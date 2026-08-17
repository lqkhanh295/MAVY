"use client";

import { useState } from "react";
import Image from "next/image";
import { SIGNATURE_PRODUCTS } from "@/data/products";

interface ProductsSectionProps {
  onSelectProductForChef?: (productName: string) => void;
}

export default function ProductsSection({ onSelectProductForChef }: ProductsSectionProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="products" className="py-24 bg-[#00153d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#051e48] border border-[#073372] text-xs font-semibold text-[#F2A900]">
            <span>DANH MỤC 3 HẢI SẢN CHỦ LỰC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Bộ Ba Hải Sản <span className="text-[#F2A900]">Tuyển Chọn Tự Nhiên</span>
          </h2>
          <p className="text-base text-[#E8EEF9]/80 leading-relaxed">
            Tuyển chọn từng con chắc khỏe, cam kết thông số quy cách minh bạch, trọng lượng dây trói siêu nhẹ và áp dụng chuẩn cấp đông IQF -40°C.
          </p>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {SIGNATURE_PRODUCTS.map((product) => {
            const isExpanded = expandedCard === product.id;

            return (
              <div
                key={product.id}
                className="bg-[#051e48] rounded-2xl border border-[#073372] overflow-hidden flex flex-col shadow-lg transition-all duration-200 hover:border-[#164082]"
              >
                {/* Product Photo Container */}
                <div className="relative aspect-[4/3] bg-[#00153d]/70 p-6 flex items-center justify-center border-b border-[#073372]">
                  {/* Origin Badge */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-[#073372] text-[#F2A900] text-xs font-semibold border border-[#164082]">
                    {product.origin}
                  </div>

                  {/* Product Type Badge */}
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded bg-[#051e48] text-[#E8EEF9] text-xs font-medium border border-[#073372]">
                    {product.badge}
                  </div>

                  {/* Clean Product Image */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                {/* Product Summary Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[#F2A900] uppercase tracking-wider">
                      {product.category}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#E8EEF9]/80 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Fact Bullets */}
                  <div className="space-y-1.5 pt-3 border-t border-[#073372] text-xs text-[#E8EEF9]/90">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#F2A900] font-bold select-none">•</span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Unit */}
                  <div className="pt-3 border-t border-[#073372] flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-[#F2A900]">{product.price}</span>
                      <span className="text-xs text-[#E8EEF9]/60 ml-1">/ {product.unit}</span>
                    </div>
                  </div>

                  {/* Inline Technical Specifications Accordion */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-[#073372] space-y-4 text-xs text-[#E8EEF9] animate-fadeIn">
                      {/* Specs Table */}
                      <div className="bg-[#00153d] p-3 rounded-lg border border-[#073372] space-y-2">
                        <div className="font-bold text-[#F2A900] uppercase tracking-wide">Quy cách kỹ thuật</div>
                        <div className="space-y-1.5">
                          {product.specifications.map((spec, i) => (
                            <div key={i} className="flex justify-between border-b border-[#073372]/40 pb-1">
                              <span className="text-[#E8EEF9]/70">{spec.label}:</span>
                              <span className="font-semibold text-white">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Nutrition Facts */}
                      <div className="bg-[#00153d] p-3 rounded-lg border border-[#073372]">
                        <div className="font-bold text-[#F2A900] uppercase tracking-wide mb-2">Dinh dưỡng ước tính (100g)</div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-[#051e48] p-1.5 rounded">
                            <span className="text-[10px] text-[#E8EEF9]/70 block">Đạm</span>
                            <span className="font-bold text-white text-xs">{product.nutritionFacts.protein}</span>
                          </div>
                          <div className="bg-[#051e48] p-1.5 rounded">
                            <span className="text-[10px] text-[#E8EEF9]/70 block">Calories</span>
                            <span className="font-bold text-white text-xs">{product.nutritionFacts.calories}</span>
                          </div>
                          <div className="bg-[#051e48] p-1.5 rounded">
                            <span className="text-[10px] text-[#E8EEF9]/70 block">Omega-3</span>
                            <span className="font-bold text-white text-xs">{product.nutritionFacts.omega3}</span>
                          </div>
                          <div className="bg-[#051e48] p-1.5 rounded">
                            <span className="text-[10px] text-[#E8EEF9]/70 block">Canxi</span>
                            <span className="font-bold text-white text-xs">{product.nutritionFacts.calcium}</span>
                          </div>
                        </div>
                      </div>

                      {/* Cooking Recommendations */}
                      <div className="bg-[#00153d] p-3 rounded-lg border border-[#073372] space-y-1.5">
                        <div className="font-bold text-[#F2A900] uppercase tracking-wide">Món ngon phù hợp</div>
                        {product.cookingSuggestions.map((sug, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#E8EEF9]/90">
                            <span className="text-[#F2A900]">•</span>
                            <span>{sug}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions: Toggle Specs & Ask Chef In-Context */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      onClick={() => toggleExpand(product.id)}
                      className="py-2.5 px-3 rounded-lg bg-[#073372] text-white text-xs font-semibold hover:bg-[#0c4494] transition-colors border border-[#164082] text-center"
                    >
                      {isExpanded ? "Thu gọn thông số" : "Xem thông số kỹ thuật"}
                    </button>

                    <a
                      href="#culinary-studio"
                      onClick={() => {
                        if (onSelectProductForChef) {
                          onSelectProductForChef(product.name);
                        }
                      }}
                      className="py-2.5 px-3 rounded-lg bg-[#F2A900] text-[#00153d] text-xs font-bold hover:bg-[#d99700] transition-colors shadow-sm text-center flex items-center justify-center"
                    >
                      Hỏi AI Cách Nấu
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Ordering Assurance Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#051e48] border border-[#073372] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">Cần tư vấn số lượng lớn cho tiệc gia đình hoặc nhà hàng?</h4>
            <p className="text-xs text-[#E8EEF9]/70">Hỗ trợ giao sống tận nơi trong 2 giờ hoặc đóng thùng xốp giữ lạnh 24 giờ cho khách liên tỉnh.</p>
          </div>
          <a
            href="tel:19008899"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#F2A900] text-[#00153d] font-bold text-xs hover:bg-[#d99700] transition-colors shadow"
          >
            Hotline Đặt Hàng: 1900 8899
          </a>
        </div>

      </div>
    </section>
  );
}
