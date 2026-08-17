"use client";

import { useState } from "react";
import { FEATURED_RECIPES } from "@/data/recipes";
import { Recipe } from "@/types";
import { IoTimeOutline, IoSparkles, IoBookOutline, IoRestaurantOutline } from "react-icons/io5";
import RecipeDetailModal from "@/components/ui/RecipeDetailModal";

interface RecipeShowcaseProps {
  onOpenChat: () => void;
  onAskChefRecipe: (recipeTitle: string) => void;
}

export default function RecipeShowcase({ onOpenChat, onAskChefRecipe }: RecipeShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories = [
    { id: "all", name: "Tất Cả Món Ngon" },
    { id: "cua", name: "Cua Cà Mau" },
    { id: "tom", name: "Tôm Sú Biển" },
    { id: "muc", name: "Mực Một Nắng" },
    { id: "combo", name: "Lẩu & Combo" },
  ];

  const filteredRecipes =
    activeCategory === "all"
      ? FEATURED_RECIPES
      : FEATURED_RECIPES.filter((r) => r.category === activeCategory);

  return (
    <section id="recipes" className="py-24 bg-[#051e48] border-y border-[#073372] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#073372] border border-[#164082] text-xs font-bold text-[#F2A900]">
            <IoRestaurantOutline className="w-3.5 h-3.5" />
            <span>THƯ VIỆN ẨM THỰC MAVY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Món Ngon <span className="text-[#F2A900]">Truyền Cảm Hứng</span> Cho Bữa Cơm Nhà
          </h2>
          <p className="text-base text-[#E8EEF9]/80 leading-relaxed">
            Khám phá các tuyệt phẩm hải sản được sáng tạo bởi các đầu bếp hàng đầu, dễ dàng thực hiện ngay tại gian bếp của bạn.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#F2A900] text-[#00153d]"
                    : "bg-[#073372] text-[#E8EEF9] border border-[#164082] hover:bg-[#0c4494]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-[#00153d] rounded-2xl border border-[#073372] p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#F2A900]/50 group"
            >
              <div className="space-y-4">
                {/* Top Badge & Duration */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#073372] text-[#F2A900] text-xs font-bold border border-[#164082]">
                    {recipe.category === "cua"
                      ? "Cua Cà Mau"
                      : recipe.category === "tom"
                      ? "Tôm Sú Biển"
                      : recipe.category === "muc"
                      ? "Mực Một Nắng"
                      : "Combo Hải Sản"}
                  </span>

                  <div className="flex items-center gap-3 text-xs text-[#E8EEF9]/70">
                    <span className="flex items-center gap-1">
                      <IoTimeOutline className="w-3.5 h-3.5 text-[#F2A900]" />
                      {recipe.cookTime}
                    </span>
                    <span className="text-[#F2A900] font-medium">• {recipe.difficulty}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#F2A900] transition-colors leading-snug">
                  {recipe.title}
                </h3>

                {/* Flavor Profile */}
                <p className="text-xs text-[#F2A900] font-medium">
                  {recipe.flavorProfile}
                </p>

                {/* Description */}
                <p className="text-sm text-[#E8EEF9]/80 leading-relaxed line-clamp-2">
                  {recipe.description}
                </p>

                {/* Key Ingredients Pill List */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {recipe.ingredients.slice(0, 4).map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#051e48] border border-[#073372] text-[11px] text-[#E8EEF9]"
                    >
                      {ing.name}
                    </span>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <span className="px-2 py-1 rounded-md bg-[#073372] text-[11px] text-[#F2A900]">
                      +{recipe.ingredients.length - 4} gia vị
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 border-t border-[#073372] flex items-center justify-between gap-3 mt-5">
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#E8EEF9] hover:text-[#F2A900] transition-colors"
                >
                  <IoBookOutline className="w-4 h-4" />
                  <span>Xem Công Thức Chi Tiết</span>
                </button>

                <button
                  onClick={() => onAskChefRecipe(recipe.title)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#073372] border border-[#164082] text-xs font-semibold text-[#F2A900] hover:bg-[#0c4494] transition-colors"
                >
                  <IoSparkles className="w-3.5 h-3.5" />
                  <span>Hỏi Mẹo Nấu</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Chef Banner Prompt */}
        <div className="mt-16 bg-[#00153d] border-2 border-[#164082] rounded-2xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073372] text-xs font-bold text-[#F2A900]">
              <IoSparkles className="w-3.5 h-3.5" />
              <span>BẾP TRƯỞNG AI MAVY TƯ VẤN MIỄN PHÍ</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Bạn Đang Có Nguyên Liệu Gì Trong Tủ Lạnh?
            </h3>
            <p className="text-sm text-[#E8EEF9]/80 leading-relaxed">
              Chỉ cần nhập các nguyên liệu sẵn có, Bếp Trưởng AI MAVY sẽ tự động sáng tạo công thức món ngon độc quyền dành riêng cho bạn!
            </p>
          </div>

          <button
            onClick={onOpenChat}
            className="shrink-0 flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F2A900] text-[#00153d] font-bold text-base hover:bg-[#d99700] transition-colors shadow-lg active:scale-95"
          >
            <IoSparkles className="w-5 h-5" />
            <span>Mở Bếp Trưởng AI Ngay</span>
          </button>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAskChefMore={onAskChefRecipe}
      />
    </section>
  );
}
