"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_INFO } from "@/data/brandInfo";
import AnimeCounter from "@/components/ui/AnimeCounter";
import { IoSnowOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

export default function AboutStorySection() {
  const [activeIqfStep, setActiveIqfStep] = useState<number>(1);

  const iqfStages = [
    {
      step: 1,
      title: "Tuyển Chọn Tươi Sống",
      subtitle: "Thu hoạch trực tiếp tại bến Năm Căn & Phú Quốc",
      detail: "Hải sản sống khỏe được phân loại kỹ lưỡng ngay khi tàu cập cảng, loại bỏ 100% cá thể yếu hoặc ngậm nước.",
      stat: "100% Sống Khỏe",
    },
    {
      step: 2,
      title: "Cấp Đông Siêu Tốc -40°C",
      subtitle: "Hạ nhiệt độ cực nhanh trong chưa đầy 12 phút",
      detail: "Băng chuyền IQF hạ nhiệt độ âm sâu -40°C lập tức đóng băng toàn bộ thân tôm, mực và cua trong thời gian kỷ lục.",
      stat: "< 12 Phút",
    },
    {
      step: 3,
      title: "Khống Chế Tinh Thể Băng",
      subtitle: "Tinh thể băng vi mô không xé rách màng tế bào",
      detail: "Cấp đông nhanh tạo ra các tinh thể băng siêu nhỏ. Nhờ đó màng tế bào thịt không bị vỡ, không làm thất thoát dịch ngọt.",
      stat: "Micro-crystals",
    },
    {
      step: 4,
      title: "Giữ 99% Độ Giòn Ngọt",
      subtitle: "Thịt mọng nước nguyên bản sau khi rã đông",
      detail: "Khi chế biến, thịt săn chắc giòn ngọt như vừa vớt dưới biển lên, không bị teo ngót hay chảy nước như ướp đá thường.",
      stat: "99% Tế Bào",
    },
  ];

  return (
    <section id="about" className="py-24 bg-navy-950 border-b border-navy-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Brand Narrative & Editorial Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-xs font-semibold text-gold">
              <span>CÂU CHUYỆN THƯƠNG HIỆU</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight pb-2">
              <span className="block leading-tight">Tâm Huyết Giữ Trọn</span>
              <span className="block text-gold leading-tight mt-2.5 sm:mt-3.5">Vị Ngọt Đại Dương</span>
            </h2>

            <p className="text-base text-ink-light/90 leading-relaxed">
              Xuất phát từ tình yêu sâu đậm với các vùng biển Việt Nam trù phú, <strong>MAVY Seafood</strong> được sáng lập với sứ mệnh mang đến cho mọi gia đình những mẻ hải sản tự nhiên tươi ngon nhất, sạch nhất và chuẩn chất lượng xuất khẩu.
            </p>

            <p className="text-sm text-ink-light/75 leading-relaxed">
              Chúng tôi nói <strong>KHÔNG</strong> với hóa chất bảo quản, nói <strong>KHÔNG</strong> với dây trói ngâm nước gian lận trọng lượng. Toàn bộ hải sản đều được bảo quản bằng công nghệ cấp đông siêu tốc <strong>IQF -40°C</strong> tiên tiến ngay tại bến.
            </p>

            {/* Factual Technical Stats (Clean Editorial Strip - NO nested boxes) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-navy-800">
              <div>
                <div className="text-2xl font-black text-gold">
                  <AnimeCounter targetValue={-40} suffix="°C" />
                </div>
                <div className="text-xs text-ink-light/60 mt-0.5">Cấp đông sâu IQF</div>
              </div>

              <div>
                <div className="text-2xl font-black text-gold">
                  <AnimeCounter targetValue={12} suffix=" Phút" />
                </div>
                <div className="text-xs text-ink-light/60 mt-0.5">Thời gian hạ nhiệt</div>
              </div>

              <div>
                <div className="text-2xl font-black text-gold">
                  <AnimeCounter targetValue={0} suffix="%" />
                </div>
                <div className="text-xs text-ink-light/60 mt-0.5">Hóa chất bảo quản</div>
              </div>

              <div>
                <div className="text-2xl font-black text-gold">
                  &lt; 20g
                </div>
                <div className="text-xs text-ink-light/60 mt-0.5">Trọng lượng dây trói</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive 4-Stage IQF Diagram (Explaining Technology) */}
          <div className="lg:col-span-6 bg-navy-900 border border-navy-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold text-navy-950 flex items-center justify-center font-bold text-xs">
                  IQF
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Quy Trình Khoa Học Cấp Đông Siêu Tốc</h3>
              </div>
              <span className="text-xs text-gold font-mono font-semibold">4 Giai Đoạn</span>
            </div>

            {/* Stepper Interactive Timeline */}
            <div className="grid grid-cols-4 gap-2">
              {iqfStages.map((stage) => {
                const isActive = activeIqfStep === stage.step;

                return (
                  <button
                    key={stage.step}
                    onClick={() => setActiveIqfStep(stage.step)}
                    className={`py-2 px-1 rounded-xl text-center border transition-all duration-200 ${
                      isActive
                        ? "bg-navy-950 border-gold text-gold ring-1 ring-gold"
                        : "bg-navy-950/40 border-navy-800 text-ink-light/60 hover:border-navy-600"
                    }`}
                  >
                    <span className="block text-xs font-mono font-bold">0{stage.step}</span>
                    <span className="block text-[10px] font-medium truncate mt-0.5">{stage.stat}</span>
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Card with Smooth AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIqfStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-navy-950 p-5 rounded-2xl border border-navy-800 space-y-2"
              >
                <div className="text-xs font-bold text-gold uppercase tracking-wide">
                  {iqfStages[activeIqfStep - 1].title}
                </div>
                <div className="text-xs text-white font-medium">
                  {iqfStages[activeIqfStep - 1].subtitle}
                </div>
                <p className="text-xs text-ink-light/80 leading-relaxed pt-1">
                  {iqfStages[activeIqfStep - 1].detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-2 text-xs text-ink-light/60 flex items-center justify-between border-t border-navy-800/60">
              <span>• Tách rời từng cá thể không dính tảng</span>
              <span>• Không hao hụt trọng lượng khi rã đông</span>
            </div>
          </div>

        </div>

        {/* 4 Commitments (Clean Editorial 4-Column Grid - NO nested boxes) */}
        <div className="space-y-6 pt-10 border-t border-navy-800">
          <div className="max-w-xl space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              4 Cam Kết Vàng Từ <span className="text-gold">MAVY</span>
            </h3>
            <p className="text-xs sm:text-sm text-ink-light/60">
              Chất lượng làm nên thương hiệu — Sự an tâm của khách hàng là ưu tiên số một.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {BRAND_INFO.commitments.map((item, idx) => (
              <div
                key={idx}
                className="space-y-2.5 border-l-2 border-navy-800 pl-4 hover:border-gold transition-colors duration-200"
              >
                <div className="text-xs font-mono font-bold text-gold">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-ink-light/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
