"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SIGNATURE_PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { IoClose, IoArrowForwardOutline } from "react-icons/io5";

interface ProductsSectionProps {
  onSelectProductForChef?: (productName: string) => void;
}

export default function ProductsSection({ onSelectProductForChef }: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Scroll-in Viewport Stagger
  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardScrollVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Modal Tiered Information Reveal
  const modalInfoContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const modalInfoItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section id="products" className="py-24 bg-navy-950 border-b border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-xs font-semibold text-gold">
            <span>BỘ 3 SẢN PHẨM SIGNATURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.3] sm:leading-[1.35] tracking-tight">
            Bộ Ba Hải Sản <span className="text-gold">Tuyển Chọn Tự Nhiên</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-light/80 leading-relaxed">
            Đánh bắt tại vùng biển sạch, giữ sống hoặc cấp đông siêu tốc IQF -40°C trong 12 phút.
          </p>
        </div>

        {/* 3 Product Cards Grid with Lightweight Refined Aesthetic */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {SIGNATURE_PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={cardScrollVariants}
              className="h-full"
            >
              <motion.div
                layoutId={`product-card-${product.id}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-navy-900/60 rounded-3xl border border-navy-800/80 p-6 overflow-hidden flex flex-col justify-between hover:border-gold/50 hover:bg-navy-900/90 transition-all duration-300 cursor-pointer group h-full shadow-lg"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Top Metadata Header (Minimalist & Sleek) */}
                <div className="flex items-center justify-between gap-2 pb-2">
                  <div className="text-[11px] font-semibold tracking-wider text-gold uppercase">
                    {product.category} • {product.origin}
                  </div>
                  <span className="text-[10px] text-ink-light/60 px-2 py-0.5 rounded-full border border-navy-800 bg-navy-950/60">
                    {product.badge}
                  </span>
                </div>

                {/* Product Photo Container with Smooth Ambient Light */}
                <div className="relative aspect-[4/3] w-full my-3 flex items-center justify-center overflow-hidden rounded-2xl bg-navy-950/40 border border-navy-800/40">
                  <motion.div
                    className="relative w-full h-full p-4 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-contain filter drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)]"
                      priority
                      unoptimized
                    />
                  </motion.div>
                </div>

                {/* Product Content Body */}
                <div className="space-y-4 flex-1 flex flex-col justify-between pt-2">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-ink-light/75 line-clamp-2 leading-relaxed font-normal">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Weight Detail */}
                  <div className="pt-3 border-t border-navy-800/60 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-gold">{product.price}</span>
                      <span className="text-xs text-ink-light/50 font-normal ml-1.5">/ {product.unit}</span>
                    </div>
                    <span className="text-[11px] text-ink-light/50 font-medium">Dây trói &lt; 20g</span>
                  </div>

                  {/* Refined Sleek CTA Link */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs font-medium text-ink-light/80 group-hover:text-gold transition-colors pt-2 border-t border-navy-800/40">
                      <span>Xem quy cách & dinh dưỡng</span>
                      <IoArrowForwardOutline className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Shared-Element Transition Modal (Editorial Product Dossier) */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
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
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-3xl bg-navy-950 border border-navy-700 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col z-10"
              >
                {/* Header */}
                <div className="px-6 py-4 bg-navy-900 border-b border-navy-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold text-navy-950 font-bold text-xs">
                      {selectedProduct.badge}
                    </span>
                    <span className="text-sm font-semibold text-white">Xuất xứ: {selectedProduct.origin}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-1.5 rounded-lg text-ink-light hover:text-white hover:bg-navy-800 transition-colors"
                    aria-label="Đóng"
                  >
                    <IoClose className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content with Tiered Information Reveal */}
                <motion.div
                  variants={modalInfoContainer}
                  initial="hidden"
                  animate="visible"
                  className="p-6 sm:p-8 overflow-y-auto space-y-6"
                >
                  {/* Top Image + Headline Block */}
                  <motion.div
                    variants={modalInfoItem}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-navy-800 pb-6"
                  >
                    <div className="md:col-span-5 relative aspect-square bg-navy-900/40 rounded-2xl border border-navy-800 p-4 flex items-center justify-center overflow-hidden">
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
                  </motion.div>

                  {/* Technical Specifications (Clean Hairline Table) */}
                  <motion.div variants={modalInfoItem} className="space-y-3">
                    <h4 className="text-xs font-bold text-ink-light uppercase tracking-wider">Thông Số Quy Cách Tuyển Chọn</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs">
                      {selectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-navy-800/80 pb-2">
                          <span className="text-ink-light/60">{spec.label}:</span>
                          <span className="font-semibold text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Nutrition Strip */}
                  <motion.div variants={modalInfoItem} className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider">
                      Dinh Dưỡng Ước Tính (100g thịt thành phẩm)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 border-t border-b border-navy-800 py-3">
                      <div>
                        <div className="text-[11px] text-ink-light/60">Protein (Đạm)</div>
                        <div className="text-base font-bold text-white mt-0.5">{selectedProduct.nutritionFacts.protein}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-ink-light/60">Năng lượng</div>
                        <div className="text-base font-bold text-white mt-0.5">{selectedProduct.nutritionFacts.calories}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-ink-light/60">Omega-3</div>
                        <div className="text-base font-bold text-white mt-0.5">{selectedProduct.nutritionFacts.omega3}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-ink-light/60">Canxi tự nhiên</div>
                        <div className="text-base font-bold text-white mt-0.5">{selectedProduct.nutritionFacts.calcium}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cooking Suggestions */}
                  <motion.div variants={modalInfoItem} className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-ink-light uppercase tracking-wider">Món Ngon Đầu Bếp Khuyên Dùng</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-light/90">
                      {selectedProduct.cookingSuggestions.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-gold font-bold select-none">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

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
                    href="tel:0901325178"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gold text-navy-950 font-bold text-xs hover:bg-gold-hover transition-colors text-center"
                  >
                    Đặt Mua Giao 2 Giờ (Hotline 090 132 517)
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
