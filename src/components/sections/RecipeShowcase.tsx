"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FEATURED_RECIPES } from "@/data/recipes";
import { Recipe } from "@/types";
import { IoTimeOutline, IoChevronDownOutline, IoChevronUpOutline, IoRestaurantOutline, IoChatbubblesOutline } from "react-icons/io5";

interface RecipeShowcaseProps {
  onOpenChat?: (query?: string) => void;
}

export default function RecipeShowcase({ onOpenChat }: RecipeShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(null);
  
  // Cooking Process Stepper State
  const [currentStepStage, setCurrentStepStage] = useState<number>(0);

  const cookingStages = [
    {
      num: "01",
      title: "SELECT (Nguyên Liệu)",
      subtitle: "Tuyển chọn hải sản tươi & gia vị nền",
      desc: "Ưu tiên hải sản tự nhiên chuẩn IQF hoặc tươi sống thở oxy. Chuẩn bị bơ lạt, tỏi phi và chanh tươi để tôn vị ngọt.",
    },
    {
      num: "02",
      title: "PREPARE (Sơ Chế)",
      subtitle: "Khử mùi tanh & giữ cấu trúc màng tế bào",
      desc: "Rửa hải sản với chút rượu trắng và gừng đập dập. QUAN TRỌNG: Luôn dùng khăn sạch thấm khô ráo bề mặt trước khi nấu.",
    },
    {
      num: "03",
      title: "COOK (Xử Lý Nhiệt)",
      subtitle: "Kiểm soát lửa lớn & thời gian vàng",
      desc: "Áp chảo hoặc xào ở nhiệt độ cao trong thời gian ngắn (tôm 3-4 phút, mực 2-3 phút, cua hấp 12-15 phút) để thịt không bị dai khô.",
    },
    {
      num: "04",
      title: "SERVE (Bày Đĩa)",
      subtitle: "Cân bằng vị giác & thưởng thức nóng",
      desc: "Rưới sốt bơ tỏi sánh mịn, rắc tiêu xay và vắt nhẹ chanh vàng. Dùng ngay khi còn nóng hổi cùng gia đình.",
    },
  ];

  const categories = [
    { id: "all", name: "Tất Cả Món Ngon" },
    { id: "cua", name: "Cua Gạch" },
    { id: "tom", name: "Tôm Sú Đông Lạnh" },
    { id: "muc", name: "Mực Trứng Đông Lạnh" },
    { id: "combo", name: "Lẩu & Hấp Thủy Nhiệt" },
  ];

  const getCategoryLabel = (category: string) => {
    switch (category?.toLowerCase()) {
      case "cua":
        return "Cua Gạch";
      case "tom":
        return "Tôm Sú Đông Lạnh";
      case "muc":
        return "Mực Trứng Đông Lạnh";
      case "combo":
        return "Lẩu & Combo";
      default:
        return "Món Ngon";
    }
  };

  const filteredRecipes =
    activeCategory === "all"
      ? FEATURED_RECIPES
      : FEATURED_RECIPES.filter((r) => r.category === activeCategory);

  return (
    <section id="culinary-studio" className="py-24 bg-navy-950 border-b border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-navy-800 text-xs font-semibold text-gold">
            <IoRestaurantOutline className="w-3.5 h-3.5" />
            <span>XƯỞNG ẨM THỰC MAVY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight pb-2">
            <span className="block leading-tight">Nấu Chuẩn Vị Tại Nhà</span>
            <span className="block text-gold leading-tight mt-2.5 sm:mt-3.5">Cùng Bí Quyết Bếp Trưởng</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-light/80 leading-relaxed max-w-2xl mx-auto pt-2">
            Khám phá 4 giai đoạn chế biến hải sản chuẩn khoa học và công cụ Bếp Trưởng AI tạo công thức độc quyền theo nguyên liệu tủ lạnh.
          </p>
        </div>

        {/* 4-Stage Cooking Process Stepper */}
        <div className="mb-16 bg-navy-900 border border-navy-800 rounded-3xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider leading-snug">
              4 Giai Đoạn Nấu Hải Sản Đạt Chuẩn Mọng Nước
            </h3>
            <p className="text-xs text-ink-light/60">Nhấp chọn từng giai đoạn để xem bí quyết xử lý nhiệt và khử tanh từ Bếp Trưởng.</p>
          </div>

          {/* Stepper Tabs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {cookingStages.map((stage, idx) => {
              const isActive = currentStepStage === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentStepStage(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-navy-950 border-gold ring-1 ring-gold"
                      : "bg-navy-950/40 border-navy-800 hover:border-navy-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isActive ? "text-gold" : "text-ink-light/60"}`}>
                      {stage.num}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-white mt-1">{stage.title}</div>
                </button>
              );
            })}
          </div>

          {/* Stepper Content Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepStage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-2"
            >
              <div className="text-xs font-bold text-gold uppercase tracking-wider">
                {cookingStages[currentStepStage].subtitle}
              </div>
              <p className="text-sm text-ink-light/90 leading-relaxed">
                {cookingStages[currentStepStage].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Culinary Consultation Callout Box */}
        <div className="mb-20 bg-navy-900 border border-navy-800 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-teal font-bold block">
              CẨM NANG ẨM THỰC MAVY
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Bạn Đang Có Nguyên Liệu Riêng Trong Gian Bếp?
            </h3>
            <p className="text-xs sm:text-sm text-ink-light/80 max-w-xl">
              Nhận gợi ý công thức chi tiết từ tỷ lệ gia vị đến thời gian canh lửa chuẩn cho từng món Cua gạch, Tôm sú và Mực trứng.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onOpenChat?.()}
              className="px-6 py-3.5 rounded-xl bg-gold text-navy-950 font-bold text-xs sm:text-sm hover:bg-gold-hover transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoChatbubblesOutline className="w-4 h-4" />
              <span>Tư Vấn Công Thức Nhanh</span>
            </button>
          </div>
        </div>

        {/* Recipe Library Section */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-navy-800 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Bộ Sưu Tập Món Ngon Signature</h3>
              <p className="text-xs sm:text-sm text-ink-light/60 mt-1">Các công thức được nghiên cứu và tối ưu riêng cho hải sản tự nhiên MAVY.</p>
            </div>

            {/* Filter category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-gold text-navy-950"
                      : "bg-navy-900 text-ink-light border border-navy-800 hover:border-gold hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => {
              const isExpanded = expandedRecipeId === recipe.id;

              return (
                <div
                  key={recipe.id}
                  className="bg-navy-900 rounded-2xl border border-navy-800 overflow-hidden flex flex-col justify-between hover:border-gold/50 transition-all duration-300 shadow-md"
                >
                  <div className="p-6 space-y-4">
                    {/* Header meta */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-gold tracking-wider uppercase">
                        {getCategoryLabel(recipe.category)}
                      </span>
                      <div className="flex items-center gap-1 text-ink-light/60">
                        <IoTimeOutline className="w-3.5 h-3.5" />
                        <span>{recipe.prepTime}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white leading-snug">{recipe.title}</h4>
                    <p className="text-xs text-ink-light/70 line-clamp-2 leading-relaxed">{recipe.description}</p>
                    
                    {recipe.flavorProfile && (
                      <div className="text-[11px] font-medium text-gold/90 bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800">
                        Hương vị: {recipe.flavorProfile}
                      </div>
                    )}

                    {/* Expandable Step-by-Step Instructions */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4 pt-4 border-t border-navy-800 text-xs overflow-hidden"
                        >
                          {/* Ingredients List */}
                          <div>
                            <span className="font-bold text-white block mb-2">Nguyên liệu chuẩn bị:</span>
                            <ul className="space-y-1 text-ink-light/90">
                              {recipe.ingredients.map((ing, i) => (
                                <li key={i} className="flex justify-between">
                                  <span>{ing.name}</span>
                                  <span className="text-gold font-medium">{ing.amount}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Steps List */}
                          <div>
                            <span className="font-bold text-white block mb-2">Các bước nấu chuẩn:</span>
                            <div className="space-y-2 text-ink-light/90">
                              {recipe.steps.map((st, i) => (
                                <div key={i} className="flex gap-2">
                                  <span className="font-bold text-gold">{i + 1}.</span>
                                  <span>{st}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Chef tips */}
                          {recipe.chefTips && (
                            <div className="p-3 rounded-xl bg-navy-950 border border-gold/30">
                              <span className="font-bold text-gold block mb-1">Mẹo Bếp Trưởng:</span>
                              <span className="text-ink-light/80">{recipe.chefTips}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Bottom Toggle & Ask Chef Button */}
                  <div className="p-4 bg-navy-950/70 border-t border-navy-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setExpandedRecipeId(isExpanded ? null : recipe.id)}
                      className="text-xs font-semibold text-gold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? "Thu gọn công thức" : "Xem chi tiết cách nấu"}</span>
                      {isExpanded ? <IoChevronUpOutline className="w-3.5 h-3.5" /> : <IoChevronDownOutline className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => onOpenChat?.(`Công thức ${recipe.title}`)}
                      className="text-[11px] text-ink-light hover:text-gold transition-colors flex items-center gap-1 cursor-pointer"
                      title="Hỏi Bếp Trưởng AI về món này"
                    >
                      <IoRestaurantOutline className="w-3.5 h-3.5 text-gold" />
                      <span>Hỏi AI</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
