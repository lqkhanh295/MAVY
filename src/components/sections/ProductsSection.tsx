"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SIGNATURE_PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { IoClose, IoArrowForwardOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

interface ProductsSectionProps {
  onSelectProductForChef?: (productName: string) => void;
}

export default function ProductsSection({ onSelectProductForChef }: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-24 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy-900 border border-navy-800 text-xs font-semibold text-gold">
            <span>BỘ 3 SẢN PHẨM SIGNATURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Bộ Ba Hải Sản <span className="text-gold">Tuyển Chọn Tự Nhiên</span>
          </h2>
          <p className="text-base text-ink-light/80 leading-relaxed">
            Nhấp vào từng sản phẩm để khám phá chi tiết quy cách tuyển chọn, xuất xứ vùng biển và bảng giá trị dinh dưỡng tiêu chuẩn.
          </p>
        </div>

        {/* 3 Product Cards Grid with Hover & Shared-Element Triggers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SIGNATURE_PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              layoutId={`product-card-${product.id}`}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-navy-900 rounded-2xl border border-navy-800 overflow-hidden flex flex-col justify-between shadow-lg hover:border-gold/60 hover:shadow-2xl transition-colors cursor-pointer group"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Photo Container */}
              <div className="relative aspect-[4/3] bg-navy-950/80 p-6 flex items-center justify-center border-b border-navy-800 overflow-hidden">
                {/* Origin Badge */}
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-navy-800 text-gold text-xs font-semibold border border-navy-600">
                  {product.origin}
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded bg-navy-900 text-ink-light text-xs font-medium border border-navy-800">
                  {product.badge}
                </div>

                {/* Animated Zooming Product Image */}
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                    priority
                    unoptimized
                  />
                </motion.div>
              </div>

              {/* Product Summary Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gold uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-ink-light/80 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Key Fact Bullets */}
                <div className="space-y-1.5 pt-3 border-t border-navy-800 text-xs text-ink-light/90">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-gold font-bold select-none">•</span>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Unit */}
                <div className="pt-3 border-t border-navy-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-gold">{product.price}</span>
                    <span className="text-xs text-ink-light/60 ml-1">/ {product.unit}</span>
                  </div>
                </div>

                {/* Interactive Action Hint Bar */}
                <div className="pt-2">
                  <div className="w-full py-2.5 px-4 rounded-lg bg-navy-800 text-white text-xs font-semibold group-hover:bg-gold group-hover:text-navy-950 transition-colors border border-navy-600 flex items-center justify-center gap-2">
                    <span>Xem Chi Tiết Quy Cách & Dinh Dưỡng</span>
                    <IoArrowForwardOutline className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shared-Element Transition Modal (Product Detail Fluid Overlay) */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
              {/* Backdrop Click */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0"
              />

              {/* Expanded Shared Modal */}
              <motion.div
                layoutId={`product-card-${selectedProduct.id}`}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-3xl bg-navy-950 border-2 border-navy-600 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col z-10"
              >
                {/* Header */}
                <div className="px-6 py-4 bg-navy-800 border-b border-navy-600 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold text-navy-950 font-bold text-xs">
                      {selectedProduct.badge}
                    </span>
                    <span className="text-sm font-semibold text-white">Xuất xứ: {selectedProduct.origin}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-1.5 rounded-lg text-ink-light hover:text-white hover:bg-navy-700 transition-colors"
                    aria-label="Đóng"
                  >
                    <IoClose className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                  {/* Top Image + Headline Block */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 relative aspect-square bg-navy-900 rounded-2xl border border-navy-800 p-4 flex items-center justify-center">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>

                    <div className="md:col-span-7 space-y-3">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider">{selectedProduct.category}</div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">{selectedProduct.name}</h3>
                      <p className="text-xs sm:text-sm text-gold font-medium italic">{selectedProduct.tagline}</p>
                      <p className="text-xs sm:text-sm text-ink-light/90 leading-relaxed">{selectedProduct.description}</p>

                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-gold">{selectedProduct.price}</span>
                        <span className="text-xs text-ink-light/70">/ {selectedProduct.unit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Specifications Table */}
                  <div className="bg-navy-900 p-5 rounded-2xl border border-navy-800 space-y-3">
                    <h4 className="text-xs font-bold text-ink-light uppercase tracking-wider">Thông Số Quy Cách Tuyển Chọn</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {selectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-navy-800/60 pb-1.5">
                          <span className="text-ink-light/70">{spec.label}:</span>
                          <span className="font-semibold text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition Facts Table */}
                  <div className="bg-navy-800/40 p-5 rounded-2xl border border-navy-600 space-y-3">
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider">
                      Giá Trị Dinh Dưỡng Ước Tính (100g thịt thành phẩm)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                        <div className="text-[11px] text-ink-light/70">Protein (Đạm)</div>
                        <div className="text-base font-bold text-white mt-1">{selectedProduct.nutritionFacts.protein}</div>
                      </div>
                      <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                        <div className="text-[11px] text-ink-light/70">Năng lượng</div>
                        <div className="text-base font-bold text-white mt-1">{selectedProduct.nutritionFacts.calories}</div>
                      </div>
                      <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                        <div className="text-[11px] text-ink-light/70">Omega-3</div>
                        <div className="text-base font-bold text-white mt-1">{selectedProduct.nutritionFacts.omega3}</div>
                      </div>
                      <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                        <div className="text-[11px] text-ink-light/70">Canxi tự nhiên</div>
                        <div className="text-base font-bold text-white mt-1">{selectedProduct.nutritionFacts.calcium}</div>
                      </div>
                    </div>
                  </div>

                  {/* Cooking Suggestions */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-ink-light uppercase tracking-wider">Món Ngon Đầu Bếp Khuyên Dùng</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProduct.cookingSuggestions.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-ink-light bg-navy-900 p-2.5 rounded-lg border border-navy-800">
                          <span className="text-gold font-bold">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 bg-navy-900 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href="#culinary-studio"
                    onClick={() => {
                      if (onSelectProductForChef) {
                        onSelectProductForChef(selectedProduct.name);
                      }
                      setSelectedProduct(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-800 border border-gold text-gold font-semibold text-xs hover:bg-navy-700 transition-colors text-center"
                  >
                    Hỏi Bếp Trưởng AI Cách Nấu {selectedProduct.name}
                  </a>

                  <a
                    href="tel:19008899"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gold text-navy-950 font-bold text-xs hover:bg-gold-hover transition-colors text-center"
                  >
                    Đặt Mua Giao 2 Giờ (Hotline 1900 8899)
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
