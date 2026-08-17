"use client";

import { BRAND_INFO } from "@/data/brandInfo";
import AnimeCounter from "@/components/ui/AnimeCounter";

export default function AboutStorySection() {
  return (
    <section id="about" className="py-24 bg-[#00153d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: Brand Story Copy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2A900]">
              CÂU CHUYỆN THƯƠNG HIỆU
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Tâm Huyết Giữ Trọn <span className="text-[#F2A900]">Vị Ngọt Đại Dương</span>
            </h2>

            <p className="text-base text-[#E8EEF9]/90 leading-relaxed">
              Xuất phát từ tình yêu sâu đậm với vùng biển Việt Nam trù phú, **MAVY Seafood** ra đời với sứ mệnh mang đến cho mọi gia đình những mẻ hải sản tươi ngon nhất, sạch nhất và chuẩn chất lượng xuất khẩu.
            </p>

            <p className="text-base text-[#E8EEF9]/80 leading-relaxed">
              Chúng tôi nói **KHÔNG** với hóa chất bảo quản, nói **KHÔNG** với dây trói cân nặng gian lận. Toàn bộ cua biển Cà Mau, tôm sú và mực một nắng đều được tuyển chọn kỹ lưỡng từng cá thể, áp dụng công nghệ cấp đông siêu tốc **IQF -40°C** tiên tiến ngay khi vừa cập bến.
            </p>

            {/* Anime.js Interactive Counting Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] text-center">
                <div className="text-2xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={50000} suffix="+" />
                </div>
                <div className="text-xs text-[#E8EEF9]/70 mt-1">Khách hàng tin chọn</div>
              </div>

              <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] text-center">
                <div className="text-2xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={99.2} suffix="%" decimals={1} />
                </div>
                <div className="text-xs text-[#E8EEF9]/70 mt-1">Đánh giá 5 sao</div>
              </div>

              <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] text-center">
                <div className="text-2xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={2} suffix=" Giờ" />
                </div>
                <div className="text-xs text-[#E8EEF9]/70 mt-1">Giao nội thành</div>
              </div>

              <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] text-center">
                <div className="text-2xl font-extrabold text-[#F2A900]">
                  <AnimeCounter targetValue={100} suffix="%" />
                </div>
                <div className="text-xs text-[#E8EEF9]/70 mt-1">Cam kết sạch</div>
              </div>
            </div>
          </div>

          {/* Right: Feature Image & Tech Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#073372] border-2 border-[#164082] p-8 space-y-6 shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#F2A900] text-[#00153d] flex items-center justify-center font-black text-xl">
                -40°
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Công Nghệ Cấp Đông Siêu Tốc IQF</h3>
                <p className="text-sm text-[#E8EEF9]/80 leading-relaxed">
                  Hải sản được làm lạnh nhanh ở nhiệt độ âm sâu -40°C trong chưa đầy 12 phút. Các tinh thể băng cực nhỏ không làm rách màng tế bào, giúp thịt hải sản giữ trọn 99% độ giòn ngọt và dinh dưỡng như vừa vớt dưới biển lên.
                </p>
              </div>

              <div className="pt-4 border-t border-[#164082] space-y-2 text-xs text-[#E8EEF9]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2A900]" />
                  <span>Không ngậm nước - Không mất trọng lượng sau rã đông</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2A900]" />
                  <span>Dễ dàng tách rời từng con để nấu mà không cần rã đông cả khay</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Golden Commitments (Numbered 01-04, No Icon Clutter) */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              4 Cam Kết Vàng Từ <span className="text-[#F2A900]">MAVY</span>
            </h3>
            <p className="text-sm text-[#E8EEF9]/70">
              Chất lượng làm nên thương hiệu — Sự hài lòng của khách hàng là ưu tiên số một.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {BRAND_INFO.commitments.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#051e48] p-6 rounded-2xl border border-[#073372] space-y-3 hover:border-[#F2A900]/60 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#073372] text-[#F2A900] font-mono font-bold flex items-center justify-center border border-[#164082] group-hover:bg-[#F2A900] group-hover:text-[#00153d] transition-colors">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-xs text-[#E8EEF9]/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
