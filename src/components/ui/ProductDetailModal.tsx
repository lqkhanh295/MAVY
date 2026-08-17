"use client";

import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { Product } from "@/types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAskChef: (productName: string) => void;
}

export default function ProductDetailModal({ product, onClose, onAskChef }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#00153d] border-2 border-[#073372] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#073372] border-b border-[#164082] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F2A900] text-[#00153d] font-bold text-xs">
              {product.badge}
            </span>
            <span className="text-sm font-semibold text-[#E8EEF9]">{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#E8EEF9] hover:text-white hover:bg-[#0c4494] transition-colors"
            aria-label="Đóng"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Section: Image + Main Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 relative aspect-square bg-[#051e48] rounded-xl border border-[#073372] p-4 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <h3 className="text-2xl font-bold text-white leading-snug">{product.name}</h3>
              <p className="text-sm text-[#F2A900] font-medium">{product.tagline}</p>
              <p className="text-sm text-[#E8EEF9]/90 leading-relaxed">{product.description}</p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-[#F2A900]">{product.price}</span>
                <span className="text-xs text-[#E8EEF9]/70">/ {product.unit}</span>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] space-y-3">
            <h4 className="text-sm font-bold text-[#E8EEF9] uppercase tracking-wider">Thông Số & Quy Cách Sản Phẩm</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-[#073372]/60 pb-1.5">
                  <span className="text-[#E8EEF9]/70">{spec.label}:</span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts */}
          <div className="bg-[#073372]/50 p-4 rounded-xl border border-[#164082]">
            <h4 className="text-sm font-bold text-[#F2A900] uppercase tracking-wider mb-3">
              Giá Trị Dinh Dưỡng Ước Tính
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-[#00153d] p-2.5 rounded-lg border border-[#073372]">
                <div className="text-xs text-[#E8EEF9]/70">Protein (Đạm)</div>
                <div className="text-base font-bold text-white mt-1">{product.nutritionFacts.protein}</div>
              </div>
              <div className="bg-[#00153d] p-2.5 rounded-lg border border-[#073372]">
                <div className="text-xs text-[#E8EEF9]/70">Năng lượng</div>
                <div className="text-base font-bold text-white mt-1">{product.nutritionFacts.calories}</div>
              </div>
              <div className="bg-[#00153d] p-2.5 rounded-lg border border-[#073372]">
                <div className="text-xs text-[#E8EEF9]/70">Omega-3</div>
                <div className="text-base font-bold text-white mt-1">{product.nutritionFacts.omega3}</div>
              </div>
              <div className="bg-[#00153d] p-2.5 rounded-lg border border-[#073372]">
                <div className="text-xs text-[#E8EEF9]/70">Canxi</div>
                <div className="text-base font-bold text-white mt-1">{product.nutritionFacts.calcium}</div>
              </div>
            </div>
          </div>

          {/* Cooking Suggestions (Clean Minimalist Bullets) */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#E8EEF9] uppercase tracking-wider">Gợi Ý Món Ngon Nổi Bật</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.cookingSuggestions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-[#E8EEF9]">
                  <span className="text-[#F2A900] font-bold select-none">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-[#051e48] border-t border-[#073372] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskChef(product.name);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#073372] border border-[#F2A900] text-[#F2A900] font-semibold text-sm hover:bg-[#0c4494] transition-colors text-center"
          >
            Hỏi Bếp Trưởng AI Nấu {product.name}
          </button>

          <a
            href="#contact"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#F2A900] text-[#00153d] font-bold text-sm hover:bg-[#d99700] transition-colors text-center"
          >
            Đặt Mua Ngay (1900 8899)
          </a>
        </div>
      </div>
    </div>
  );
}
