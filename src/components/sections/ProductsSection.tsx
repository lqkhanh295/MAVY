"use client";

import { useState } from "react";
import Image from "next/image";
import { SIGNATURE_PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import ProductDetailModal from "@/components/ui/ProductDetailModal";

interface ProductsSectionProps {
  onAskChefWithProduct: (productName: string) => void;
}

export default function ProductsSection({ onAskChefWithProduct }: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-24 bg-[#00153d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F2A900]">
            BỘ 3 SẢN PHẨM SIGNATURE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Bộ 3 Hải Sản <span className="text-[#F2A900]">Thượng Hạng</span> Tuyển Chọn
          </h2>
          <p className="text-base text-[#E8EEF9]/80 leading-relaxed">
            Mỗi con cua, từng chú tôm sú và từng thân mực đều trải qua quy trình kiểm định độ tươi nghiêm ngặt, đóng gói theo tiêu chuẩn an toàn thực phẩm quốc tế.
          </p>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIGNATURE_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-[#051e48] rounded-2xl border border-[#073372] overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#F2A900]/60 hover:shadow-2xl group"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/3] bg-[#073372]/40 p-6 flex items-center justify-center overflow-hidden">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-[#F2A900] text-[#00153d] font-bold text-xs shadow-md">
                  {product.badge}
                </div>

                {/* Origin tag */}
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-[#00153d]/80 text-[#E8EEF9] text-[11px] font-medium border border-[#164082]">
                  {product.origin}
                </div>

                {/* Product Image with Fallback Container */}
                <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#F2A900] uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F2A900] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#E8EEF9]/70 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features List (Clean Minimalist Bullets without icon clutter) */}
                <div className="space-y-1.5 pt-2 border-t border-[#073372]/60 text-xs text-[#E8EEF9]/90">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#F2A900] font-bold select-none leading-none mt-0.5">•</span>
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

                {/* Card Action Buttons (Clean Typography, No Icon Fluff) */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="py-2.5 px-3 rounded-lg bg-[#073372] text-white text-xs font-semibold hover:bg-[#0c4494] transition-colors border border-[#164082] text-center"
                  >
                    Xem Chi Tiết
                  </button>

                  <button
                    onClick={() => onAskChefWithProduct(product.name)}
                    className="py-2.5 px-3 rounded-lg bg-[#F2A900] text-[#00153d] text-xs font-bold hover:bg-[#d99700] transition-colors shadow-md text-center"
                  >
                    Hỏi AI Cách Nấu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAskChef={onAskChefWithProduct}
      />
    </section>
  );
}
