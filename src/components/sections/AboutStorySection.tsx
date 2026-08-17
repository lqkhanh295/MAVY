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
      stat: "Tuyển chọn 100%",
    },
    {
      step: 2,
      title: "Cấp Đông Siêu Tốc -40°C",
      subtitle: "Hạ nhiệt độ cực nhanh trong chưa đầy 12 phút",
      detail: "Băng chuyền IQF hạ nhiệt độ âm sâu -40°C lập tức đóng băng toàn bộ thân tôm, mực và cua trong thời gian kỷ lục.",
      stat: "12 Phút chuẩn",
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
      stat: "99% Dinh dưỡng",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#00153d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Brand Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#051e48] border border-[#073372] text-xs font-semibold text-[#F2A900]">
              <span>CÂU CHUYỆN THƯƠNG HIỆU</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Tâm Huyết Giữ Trọn <span className="text-[#F2A900]">Vị Ngọt Đại Dương</span>
            </h2>

            <p className="text-base text-[#E8EEF9]/90 leading-relaxed">
              Xuất phát từ tình yêu sâu đậm với các vùng biển Việt Nam trù phú, <strong>MAVY Seafood</strong> được sáng lập với sứ mệnh mang đến cho mọi gia đình những mẻ hải sản tự nhiên tươi ngon nhất, sạch nhất và chuẩn chất lượng xuất khẩu.
            </p>

            <p className="text-sm text-[#E8EEF9]/80 leading-relaxed">
              Chúng tôi nói <strong>KHÔNG</strong> với hóa chất bảo quản, nói <strong>KHÔNG</strong> với dây trói ngâm nước gian lận trọng lượng. Toàn bộ hải sản đều được bảo quản bằng công nghệ cấp đông siêu tốc <strong>IQF -40°C</strong> tiên tiến ngay tại bến.
            </p>

            {/* Practical Numerical Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#051e48] p-3.5 rounded-xl border border-[#073372] text-center">
                <div className="text-xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={50000} suffix="+" />
                </div>
                <div className="text-[11px] text-[#E8EEF9]/70 mt-1">Khách hàng tin chọn</div>
              </div>

              <div className="bg-[#051e48] p-3.5 rounded-xl border border-[#073372] text-center">
                <div className="text-xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={99.2} suffix="%" decimals={1} />
                </div>
                <div className="text-[11px] text-[#E8EEF9]/70 mt-1">Đánh giá 5 sao</div>
              </div>

              <div className="bg-[#051e48] p-3.5 rounded-xl border border-[#073372] text-center">
                <div className="text-xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={2} suffix=" Giờ" />
                </div>
                <div className="text-[11px] text-[#E8EEF9]/70 mt-1">Giao nội thành</div>
              </div>

              <div className="bg-[#051e48] p-3.5 rounded-xl border border-[#073372] text-center">
                <div className="text-xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={100} suffix="%" />
                </div>
                <div className="text-[11px] text-[#E8EEF9]/70 mt-1">Cam kết sạch</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive 4-Stage IQF Diagram (Explaining Technology Motion) */}
          <div className="lg:col-span-6 bg-[#051e48] border-2 border-[#164082] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#073372] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F2A900] text-[#00153d] flex items-center justify-center font-bold text-xs">
                  -40°
                </div>
                <h3 className="text-lg font-bold text-white">Sơ Đồ Khoa Học Cấp Đông Siêu Tốc IQF</h3>
              </div>
              <span className="text-xs text-[#F2A900] font-mono font-semibold">4 Giai Đoạn</span>
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
                        ? "bg-[#00153d] border-[#F2A900] text-[#F2A900] shadow-md ring-1 ring-[#F2A900]"
                        : "bg-[#00153d]/50 border-[#073372] text-[#E8EEF9]/70 hover:border-[#164082]"
                    }`}
                  >
                    <span className="block text-xs font-mono font-bold">Bước 0{stage.step}</span>
                    <span className="block text-[10px] font-medium truncate mt-0.5">{stage.stat}</span>
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Card with Smooth AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIqfStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-[#00153d] p-5 rounded-2xl border border-[#073372] space-y-2"
              >
                <div className="text-xs font-bold text-[#F2A900] uppercase tracking-wide">
                  {iqfStages[activeIqfStep - 1].title}
                </div>
                <div className="text-xs text-white font-medium">
                  {iqfStages[activeIqfStep - 1].subtitle}
                </div>
                <p className="text-xs text-[#E8EEF9]/80 leading-relaxed pt-1">
                  {iqfStages[activeIqfStep - 1].detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-2 text-xs text-[#E8EEF9]/70 flex items-center justify-between">
              <span>• Tách rời từng con không dính tảng</span>
              <span>• Không hao hụt trọng lượng khi rã đông</span>
            </div>
          </div>

        </div>

        {/* 4 Golden Commitments */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              4 Cam Kết Vàng Từ <span className="text-[#F2A900]">MAVY</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#E8EEF9]/70">
              Chất lượng làm nên thương hiệu — Sự hài lòng và an tâm của khách hàng là ưu tiên số một.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {BRAND_INFO.commitments.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#051e48] p-6 rounded-2xl border border-[#073372] space-y-3 hover:border-[#F2A900]/60 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#073372] text-[#F2A900] font-mono font-bold flex items-center justify-center border border-[#164082] group-hover:bg-[#F2A900] group-hover:text-[#00153d] transition-colors">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-[#E8EEF9]/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
