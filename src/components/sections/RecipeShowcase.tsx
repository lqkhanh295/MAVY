"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FEATURED_RECIPES } from "@/data/recipes";
import { Recipe } from "@/types";
import { IoTimeOutline, IoSend, IoSyncOutline, IoChevronDownOutline, IoChevronUpOutline, IoRestaurantOutline } from "react-icons/io5";

interface RecipeShowcaseProps {
  initialIngredientQuery?: string;
}

export default function RecipeShowcase({ initialIngredientQuery = "" }: RecipeShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(null);
  
  // Cooking Process Stepper State
  const [currentStepStage, setCurrentStepStage] = useState<number>(0);

  // Embedded AI Chef State
  const [chefInput, setChefInput] = useState(initialIngredientQuery);
  const [isChefThinking, setIsChefThinking] = useState(false);
  const [customRecipeResult, setCustomRecipeResult] = useState<{
    message: string;
    recipes: Recipe[];
    suggestedFollowUps?: string[];
  } | null>(null);

  const chefResultRef = useRef<HTMLDivElement>(null);

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
    { id: "cua", name: "Cua Cà Mau" },
    { id: "tom", name: "Tôm Sú Biển" },
    { id: "muc", name: "Mực Một Nắng" },
    { id: "combo", name: "Lẩu & Hấp Thủy Nhiệt" },
  ];

  const filteredRecipes =
    activeCategory === "all"
      ? FEATURED_RECIPES
      : FEATURED_RECIPES.filter((r) => r.category === activeCategory);

  const handleAskChef = async (overrideQuery?: string) => {
    const query = overrideQuery || chefInput.trim();
    if (!query || isChefThinking) return;

    setIsChefThinking(true);
    setChefInput(query);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: query }),
      });

      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();

      if (data.success && data.data) {
        setCustomRecipeResult(data.data);
        setTimeout(() => {
          chefResultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (e) {
      console.error(e);
      // Fallback
      setCustomRecipeResult({
        message: `Bếp Trưởng MAVY đã thiết kế công thức thực tế từ nguyên liệu "${query}":`,
        recipes: [
          {
            id: `chef-custom-${Date.now()}`,
            title: `Món Ngon Tối Ưu Từ ${query.slice(0, 35)}`,
            category: "combo",
            prepTime: "15 phút",
            cookTime: "15 phút",
            difficulty: "Dễ",
            servings: "2 - 3 người",
            description: "Công thức tối ưu tận dụng trọn vẹn nguyên liệu có sẵn, kiểm soát nhiệt độ giữ ngọt mọng nước.",
            flavorProfile: "Thơm nồng bơ tỏi, đậm đà cân bằng vị.",
            ingredients: [
              { name: query, amount: "Lượng sẵn có", isMain: true },
              { name: "Bơ lạt & Tỏi băm nhuyễn", amount: "40g bơ + 1 củ tỏi" },
              { name: "Gia vị chuẩn (muối, tiêu xay, chanh tươi)", amount: "Vừa khẩu vị" },
            ],
            steps: [
              "Sơ chế sạch các nguyên liệu, thấm khô ráo nước bằng khăn sạch.",
              "Đun chảy bơ lạt trong chảo dày, phi thơm tỏi băm ở lửa vừa cho dậy mùi thơm.",
              "Cho nguyên liệu vào áp chảo/xào nhanh tay ở nhiệt độ cao để giữ trọn độ mọng nước tự nhiên.",
              "Nêm muối tiêu, vắt nhẹ chút nước cốt chanh vàng trước khi tắt bếp.",
              "Trình bày ra đĩa sâu lòng và thưởng thức khi còn nóng hổi.",
            ],
            chefTips: "Luôn thấm thật khô bề mặt hải sản trước khi cho vào chảo để món ăn thơm giòn và không bị chảy nước.",
          },
        ],
        suggestedFollowUps: ["Mẹo sơ chế khử tanh hải sản?", "Cách pha nước chấm muối ớt chanh ngon?"],
      });
    } finally {
      setIsChefThinking(false);
    }
  };

  return (
    <section id="culinary-studio" className="py-24 bg-[#00153d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#051e48] border border-[#073372] text-xs font-semibold text-[#F2A900]">
            <IoRestaurantOutline className="w-3.5 h-3.5" />
            <span>XƯỞNG ẨM THỰC & BẾP TRƯỞNG AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Nấu Chuẩn Vị Tại Nhà <span className="text-[#F2A900]">Cùng Bếp Trưởng MAVY</span>
          </h2>
          <p className="text-base text-[#E8EEF9]/80 leading-relaxed">
            Khám phá 4 giai đoạn chế biến hải sản chuẩn khoa học và công cụ tạo công thức độc quyền từ nguyên liệu sẵn có.
          </p>
        </div>

        {/* 4-Stage Cooking Process Stepper (Purposeful Process Motion) */}
        <div className="mb-16 bg-[#051e48] border border-[#073372] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              4 Giai Đoạn Nấu Hải Sản Đạt Chuẩn Mọng Nước
            </h3>
            <p className="text-xs text-[#E8EEF9]/70">Nhấp chọn từng giai đoạn để xem bí quyết xử lý nhiệt và khử tanh từ Bếp Trưởng.</p>
          </div>

          {/* Stepper Tabs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {cookingStages.map((stage, idx) => {
              const isActive = currentStepStage === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentStepStage(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#00153d] border-[#F2A900] shadow-lg ring-1 ring-[#F2A900]"
                      : "bg-[#00153d]/50 border-[#073372] hover:border-[#164082]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isActive ? "text-[#F2A900]" : "text-[#E8EEF9]/60"}`}>
                      {stage.num}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#F2A900] animate-pulse" />}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-white mt-1">{stage.title}</div>
                </button>
              );
            })}
          </div>

          {/* Stepper Content Card with Slide Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepStage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-[#00153d] p-6 rounded-2xl border border-[#164082] space-y-2"
            >
              <div className="text-xs font-bold text-[#F2A900] uppercase tracking-wider">
                {cookingStages[currentStepStage].subtitle}
              </div>
              <p className="text-sm text-[#E8EEF9] leading-relaxed">
                {cookingStages[currentStepStage].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Embedded AI Master Chef Tool */}
        <div className="mb-20 bg-[#051e48] border-2 border-[#164082] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Tạo Công Thức Độc Quyền Theo Nguyên Liệu Tủ Lạnh Của Bạn
            </h3>
            <p className="text-xs sm:text-sm text-[#E8EEF9]/80">
              Nhập các loại hải sản, rau củ hoặc gia vị bạn đang có, Bếp Trưởng AI sẽ tính toán tỷ lệ nêm nếm và hướng dẫn kỹ thuật nấu giữ trọn vị ngọt.
            </p>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskChef();
            }}
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2.5"
          >
            <input
              type="text"
              value={chefInput}
              onChange={(e) => setChefInput(e.target.value)}
              placeholder="VD: Tôm sú, bò kobe, bơ tỏi, chanh vàng..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#00153d] border border-[#073372] text-sm text-white placeholder-[#E8EEF9]/40 focus:outline-none focus:border-[#F2A900] transition-colors"
              disabled={isChefThinking}
            />
            <button
              type="submit"
              disabled={isChefThinking || !chefInput.trim()}
              className="px-6 py-3 rounded-xl bg-[#F2A900] text-[#00153d] font-bold text-sm hover:bg-[#d99700] disabled:opacity-50 transition-colors shrink-0 flex items-center justify-center gap-2 shadow"
            >
              {isChefThinking ? (
                <>
                  <IoSyncOutline className="w-4 h-4 animate-spin" />
                  <span>Đang Tính Toán...</span>
                </>
              ) : (
                <>
                  <IoSend className="w-4 h-4" />
                  <span>Thiết Kế Món Ăn</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Idea Chips */}
          <div className="max-w-2xl mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-[#E8EEF9]/70">
            <span>Gợi ý nhanh:</span>
            {["Cua Cà Mau + sốt me", "Tôm sú + bơ tỏi + chanh", "Mực một nắng + ớt chuông + dứa"].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAskChef(chip)}
                className="px-2.5 py-1 rounded bg-[#00153d] border border-[#073372] text-[11px] text-[#E8EEF9] hover:text-[#F2A900] hover:border-[#F2A900] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* AI Chef Result Display (Embedded Directly) */}
          {customRecipeResult && (
            <div ref={chefResultRef} className="mt-8 pt-8 border-t border-[#073372] space-y-6 animate-fadeIn">
              <div className="bg-[#00153d] p-4 rounded-xl border border-[#073372] text-sm text-[#E8EEF9]">
                <p className="font-semibold text-[#F2A900]">{customRecipeResult.message}</p>
              </div>

              {customRecipeResult.recipes.map((recipe, idx) => (
                <div key={idx} className="bg-[#00153d] rounded-2xl border border-[#164082] p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#073372] pb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white">{recipe.title}</h4>
                      <p className="text-xs text-[#F2A900] mt-1 font-medium">{recipe.flavorProfile}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#E8EEF9]/80 font-medium">
                      <span>Chuẩn bị: {recipe.prepTime}</span>
                      <span>•</span>
                      <span>Nấu: {recipe.cookTime}</span>
                      <span>•</span>
                      <span className="text-[#F2A900]">{recipe.difficulty}</span>
                    </div>
                  </div>

                  {/* Ingredients List */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#E8EEF9]">Nguyên Liệu Cần Chuẩn Bị</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {recipe.ingredients.map((ing, i) => (
                        <div key={i} className="flex justify-between items-center bg-[#051e48] px-3 py-2 rounded-lg border border-[#073372] text-xs">
                          <span className={ing.isMain ? "font-bold text-[#F2A900]" : "text-[#E8EEF9]"}>{ing.name}</span>
                          <span className="text-[#E8EEF9]/70 ml-2 font-mono">{ing.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step by Step Cooking Guide */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#E8EEF9]">Các Bước Chế Biến Chi Tiết</div>
                    <div className="space-y-2">
                      {recipe.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3 bg-[#051e48]/60 p-3 rounded-lg border border-[#073372] text-xs sm:text-sm text-[#E8EEF9]">
                          <span className="w-5 h-5 rounded-full bg-[#F2A900] text-[#00153d] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chef Tip */}
                  <div className="p-4 rounded-xl bg-[#073372]/40 border border-[#164082] text-xs text-[#E8EEF9] space-y-1">
                    <div className="font-bold text-[#F2A900] uppercase tracking-wide">Bí Quyết Bếp Trưởng MAVY</div>
                    <p className="leading-relaxed">{recipe.chefTips}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Recipe Library Header & Filters */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#073372] pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Thư Viện Công Thức Mẫu</h3>
              <p className="text-xs text-[#E8EEF9]/70 mt-1">Các món ngon kinh điển dễ nấu thành công ngay tại nhà.</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-[#F2A900] text-[#00153d] font-bold"
                      : "bg-[#051e48] text-[#E8EEF9] border border-[#073372] hover:bg-[#073372]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Cards Grid with Inline Accordions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecipes.map((recipe) => {
              const isExpanded = expandedRecipeId === recipe.id;

              return (
                <div
                  key={recipe.id}
                  className="bg-[#051e48] rounded-2xl border border-[#073372] p-6 space-y-4 shadow-md transition-colors hover:border-[#164082]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-[#00153d] text-[#F2A900] font-semibold border border-[#073372]">
                      {recipe.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2 text-[#E8EEF9]/70">
                      <span className="flex items-center gap-1">
                        <IoTimeOutline className="w-3.5 h-3.5 text-[#F2A900]" />
                        {recipe.cookTime}
                      </span>
                      <span>• {recipe.difficulty}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">{recipe.title}</h4>
                    <p className="text-xs text-[#F2A900] mt-0.5 font-medium">{recipe.flavorProfile}</p>
                    <p className="text-xs text-[#E8EEF9]/80 mt-2 leading-relaxed">{recipe.description}</p>
                  </div>

                  {/* Inline Expanded Steps */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-[#073372] space-y-4 text-xs animate-fadeIn">
                      {/* Ingredients */}
                      <div className="space-y-1.5">
                        <div className="font-bold text-[#E8EEF9] uppercase tracking-wide">Nguyên liệu:</div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {recipe.ingredients.map((ing, i) => (
                            <div key={i} className="flex justify-between bg-[#00153d] p-1.5 rounded border border-[#073372]">
                              <span className={ing.isMain ? "text-[#F2A900] font-semibold" : "text-[#E8EEF9]"}>{ing.name}</span>
                              <span className="text-[#E8EEF9]/70">{ing.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="space-y-2">
                        <div className="font-bold text-[#E8EEF9] uppercase tracking-wide">Các bước thực hiện:</div>
                        {recipe.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-[#00153d]/60 p-2 rounded text-[#E8EEF9]">
                            <span className="w-4 h-4 rounded-full bg-[#F2A900] text-[#00153d] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>

                      {/* Chef Tip */}
                      <div className="p-3 bg-[#073372]/30 rounded-lg border border-[#164082] text-[#E8EEF9] space-y-1">
                        <span className="font-bold text-[#F2A900]">Mẹo bếp trưởng: </span>
                        <span>{recipe.chefTips}</span>
                      </div>
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#073372] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setExpandedRecipeId(isExpanded ? null : recipe.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#E8EEF9] hover:text-[#F2A900] transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <span>Thu gọn công thức</span>
                          <IoChevronUpOutline className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Xem các bước nấu chi tiết</span>
                          <IoChevronDownOutline className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleAskChef(recipe.title)}
                      className="px-3 py-1.5 rounded-lg bg-[#073372] text-[#F2A900] text-xs font-semibold hover:bg-[#0c4494] transition-colors border border-[#164082]"
                    >
                      Tùy biến với Bếp Trưởng AI
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
