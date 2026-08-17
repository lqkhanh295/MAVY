"use client";

import { useState } from "react";
import {
  IoTimeOutline,
  IoCopyOutline,
  IoCheckmarkOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

interface RecipeCardProps {
  recipe: any;
  onAskMore?: (query: string) => void;
}

export default function RecipeCard({ recipe, onAskMore }: RecipeCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleCopyRecipe = () => {
    const text = `MAVY CULINARY STUDIO — ${recipe.title.toUpperCase()}
[Thông Số] Chuẩn bị: ${recipe.prepTime} | Nấu: ${recipe.cookTime} | Độ khó: ${recipe.difficulty}
[Hương Vị] ${recipe.flavorProfile || ""}

NGUYÊN LIỆU:
${(recipe.ingredients || []).map((i: any) => `• ${i.name}: ${i.amount}`).join("\n")}

CÁC BƯỚC THỰC HIỆN:
${(recipe.steps || []).map((s: string, idx: number) => `${idx + 1}. ${s}`).join("\n")}

MẸO BẾP TRƯỞNG:
${recipe.chefTips || ""}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 bg-navy-900 border-2 border-navy-600 rounded-xl overflow-hidden shadow-lg text-left w-full">
      {/* Recipe Header */}
      <div className="p-3.5 bg-navy-800 border-b border-navy-600 flex items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          {/* Top badges on 1 row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-gold text-navy-950 font-bold text-[11px] whitespace-nowrap shrink-0">
              Gợi Ý Bếp Trưởng
            </span>
            <span className="text-xs text-ink-light font-medium flex items-center gap-1 whitespace-nowrap shrink-0 bg-navy-950/70 px-2 py-0.5 rounded border border-navy-600">
              <IoTimeOutline className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{recipe.prepTime || "15p"} + {recipe.cookTime || "15p"}</span>
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-white leading-snug break-words">
            {recipe.title}
          </h4>

          {/* Flavor profile */}
          {recipe.flavorProfile && (
            <p className="text-xs text-gold font-medium leading-normal">
              {recipe.flavorProfile}
            </p>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-navy-950 text-ink-light hover:text-white transition-colors shrink-0 mt-0.5"
          title={expanded ? "Thu gọn" : "Mở rộng"}
        >
          {expanded ? <IoChevronUpOutline className="w-4 h-4" /> : <IoChevronDownOutline className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="p-3.5 space-y-3.5 text-xs">
          {/* Description */}
          {recipe.description && (
            <p className="text-ink-light/90 leading-relaxed italic">{recipe.description}</p>
          )}

          {/* Ingredients list */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 space-y-2">
              <div className="font-bold text-gold uppercase tracking-wider text-[11px] whitespace-nowrap">
                Nguyên Liệu Cần Chuẩn Bị:
              </div>
              <div className="space-y-2">
                {recipe.ingredients.map((ing: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-ink-light text-xs gap-3 py-0.5">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="text-gold font-bold text-xs select-none shrink-0 leading-none">•</span>
                      <span className={`truncate sm:break-words leading-tight ${ing.isMain ? "font-semibold text-white" : "text-ink-light/90"}`}>
                        {ing.name}
                      </span>
                    </div>
                    <span className="text-ink-light font-medium text-[11px] shrink-0 whitespace-nowrap bg-navy-900 px-2.5 py-0.5 rounded border border-navy-800 shadow-sm">
                      {ing.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Steps */}
          {recipe.steps && recipe.steps.length > 0 && (
            <div className="space-y-2">
              <div className="font-bold text-white uppercase tracking-wider text-[11px] whitespace-nowrap">
                Các Bước Chế Biến:
              </div>
              <div className="space-y-1.5">
                {recipe.steps.map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-2 text-ink-light text-xs leading-relaxed bg-navy-950/50 p-2 rounded-lg border border-navy-800/60">
                    <span className="w-5 h-5 rounded bg-navy-800 text-gold font-bold text-[11px] flex items-center justify-center shrink-0 border border-navy-600">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chef Tips */}
          {recipe.chefTips && (
            <div className="p-3 rounded-lg bg-navy-800/60 border border-gold/40 flex gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
              <div>
                <span className="font-bold text-gold text-xs block whitespace-nowrap">
                  Mẹo Bếp Trưởng:
                </span>
                <span className="text-ink-light text-xs leading-relaxed block mt-0.5">
                  {recipe.chefTips}
                </span>
              </div>
            </div>
          )}

          {/* Bottom Card Actions */}
          <div className="pt-2 border-t border-navy-800 flex items-center justify-between gap-2">
            <button
              onClick={handleCopyRecipe}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-800 text-ink-light text-xs font-medium hover:text-gold hover:border-gold transition-colors whitespace-nowrap"
            >
              {copied ? <IoCheckmarkOutline className="w-3.5 h-3.5 text-emerald-400" /> : <IoCopyOutline className="w-3.5 h-3.5" />}
              <span>{copied ? "Đã sao chép" : "Lưu công thức"}</span>
            </button>

            {onAskMore && (
              <button
                onClick={() => onAskMore(`Bếp trưởng hướng dẫn chi tiết thêm về cách sơ chế món ${recipe.title}`)}
                className="flex items-center gap-1 text-xs font-bold text-gold hover:underline whitespace-nowrap"
              >
                <span>Hỏi thêm cách làm</span>
                <IoArrowForwardOutline className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
