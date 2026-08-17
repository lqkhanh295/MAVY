"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#00153d] border-b border-[#073372] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & Practical Value */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#051e48] border border-[#073372] text-xs font-semibold text-[#F2A900]">
              <span className="w-2 h-2 rounded-full bg-[#F2A900]" />
              <span>Nguồn Hải Sản Trực Tiếp Từ Vùng Biển Sạch</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Hải Sản Tự Nhiên <br />
              <span className="text-[#F2A900]">Chuẩn Vị Ngọt Nguyên Bản</span>
            </h1>

            <p className="text-base sm:text-lg text-[#E8EEF9]/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              MAVY thu mua trực tiếp tại bến Năm Căn và Phú Quốc, áp dụng công nghệ cấp đông siêu tốc <strong>IQF -40°C</strong> ngay khi cập bờ. Cam kết 100% dây trói siêu mỏng, không ngậm nước, giao sống hoặc cấp đông chuẩn xuất khẩu trong 2 giờ.
            </p>

            {/* 3 Practical Trust Metrics (No Icon Fluff, Factual Specs) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] text-left">
                <div className="text-xl font-extrabold text-[#F2A900]">Năm Căn & Phú Quốc</div>
                <p className="text-xs text-[#E8EEF9]/70 mt-1 leading-snug">
                  Đánh bắt tự nhiên tại các vùng nước mặn sinh thái sạch nhất Việt Nam.
                </p>
              </div>

              <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] text-left">
                <div className="text-xl font-extrabold text-[#F2A900]">IQF -40°C</div>
                <p className="text-xs text-[#E8EEF9]/70 mt-1 leading-snug">
                  Cấp đông sâu trong 12 phút, giữ 99% thớ thịt giòn ngọt như vừa vớt.
                </p>
              </div>

              <div className="bg-[#051e48] p-4 rounded-xl border border-[#073372] text-left">
                <div className="text-xl font-extrabold text-[#F2A900]">Dây Trói &lt; 20g</div>
                <p className="text-xs text-[#E8EEF9]/70 mt-1 leading-snug">
                  Nói không với gian lận trọng lượng. Bao ăn 1 đổi 1 nếu cua ốp nước.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F2A900] text-[#00153d] font-bold text-base hover:bg-[#d99700] transition-colors shadow-lg text-center"
              >
                Xem Bảng Giá 3 Hải Sản Chủ Lực
              </a>

              <a
                href="#standards"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#051e48] text-white border border-[#073372] font-semibold text-base hover:bg-[#073372] transition-colors text-center"
              >
                So Sánh Với Hải Sản Chợ
              </a>
            </div>
          </div>

          {/* Right Column: Grounded Editorial Photography Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#051e48] border border-[#073372] p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl">
              <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                <Image
                  src="/assets/image/hero-3-products.png"
                  alt="Bộ ba hải sản thượng hạng MAVY: Cua Cà Mau, Tôm Sú Biển, Mực Một Nắng"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                  priority
                  unoptimized
                />
              </div>

              {/* Simple Bottom Legend Bar */}
              <div className="w-full mt-4 pt-4 border-t border-[#073372] flex items-center justify-between text-xs text-[#E8EEF9]/80 font-medium">
                <span>Cua Cà Mau</span>
                <span className="text-[#073372]">•</span>
                <span>Tôm Sú VIP</span>
                <span className="text-[#073372]">•</span>
                <span>Mực Một Nắng</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
