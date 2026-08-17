"use client";

import { IoClose, IoRestaurantOutline, IoSparkles } from "react-icons/io5";
import { Recipe } from "@/types";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onAskChefMore: (recipeTitle: string) => void;
}

export default function RecipeDetailModal({ recipe, onClose, onAskChefMore }: RecipeDetailModalProps) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#00153d] border-2 border-[#073372] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#073372] border-b border-[#164082] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IoRestaurantOutline className="w-5 h-5 text-[#F2A900]" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Công Thức Bếp Trưởng MAVY</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#E8EEF9] hover:text-white hover:bg-[#0c4494] transition-colors"
            aria-label="Đóng"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Metadata */}
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-white">{recipe.title}</h3>
            <p className="text-sm text-[#F2A900] font-medium italic">{recipe.flavorProfile}</p>
            <p className="text-sm text-[#E8EEF9]/90 leading-relaxed">{recipe.description}</p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#051e48] p-3 rounded-lg border border-[#073372] text-center">
                <div className="text-[11px] text-[#E8EEF9]/70">Chuẩn bị & Nấu</div>
                <div className="text-sm font-bold text-white mt-0.5">{recipe.prepTime} + {recipe.cookTime}</div>
              </div>
              <div className="bg-[#051e48] p-3 rounded-lg border border-[#073372] text-center">
                <div className="text-[11px] text-[#E8EEF9]/70">Độ khó</div>
                <div className="text-sm font-bold text-[#F2A900] mt-0.5">{recipe.difficulty}</div>
              </div>
              <div className="bg-[#051e48] p-3 rounded-lg border border-[#073372] text-center">
                <div className="text-[11px] text-[#E8EEF9]/70">Khẩu phần</div>
                <div className="text-sm font-bold text-white mt-0.5">{recipe.servings}</div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] space-y-3">
            <h4 className="text-sm font-bold text-[#E8EEF9] uppercase tracking-wider flex items-center gap-2">
              <span>Nguyên Liệu Cần Chuẩn Bị</span>
            </h4>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm py-1 border-b border-[#073372]/50 last:border-0"
                >
                  <span className={ing.isMain ? "font-bold text-[#F2A900]" : "text-[#E8EEF9]"}>
                    {ing.name}
                  </span>
                  <span className="text-xs text-[#E8EEF9]/80 font-medium bg-[#00153d] px-2 py-0.5 rounded border border-[#073372]">
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#E8EEF9] uppercase tracking-wider">
              Các Bước Nấu Chi Tiết
            </h4>
            <div className="space-y-2.5">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 bg-[#051e48]/70 p-3 rounded-lg border border-[#073372]">
                  <span className="w-6 h-6 rounded-full bg-[#F2A900] text-[#00153d] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-[#E8EEF9] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Tips */}
          <div className="bg-[#073372]/60 p-4 rounded-xl border border-[#164082] flex gap-3">
            <IoSparkles className="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#F2A900] uppercase tracking-wider">
                Bí Quyết Của Bếp Trưởng MAVY
              </div>
              <p className="text-sm text-[#E8EEF9] mt-1 leading-relaxed">{recipe.chefTips}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#051e48] border-t border-[#073372] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskChefMore(`Tư vấn thêm về món ${recipe.title}`);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#073372] border border-[#F2A900] text-[#F2A900] font-semibold text-sm hover:bg-[#0c4494] transition-colors"
          >
            <IoSparkles className="w-4 h-4" />
            <span>Hỏi Bếp Trưởng Cách Nêm Gia Vị Khác</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#F2A900] text-[#00153d] font-bold text-sm hover:bg-[#d99700] transition-colors"
          >
            Đã Hiểu Công Thức
          </button>
        </div>
      </div>
    </div>
  );
}
