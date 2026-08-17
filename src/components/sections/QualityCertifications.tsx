"use client";

import { BRAND_INFO } from "@/data/brandInfo";
import { IoCheckmarkOutline, IoCloseOutline, IoStar, IoCheckmarkCircleOutline } from "react-icons/io5";
import AnimeCounter from "@/components/ui/AnimeCounter";

export default function QualityCertifications() {
  const comparisonData = [
    {
      criteria: "Trọng lượng dây trói cua",
      mavy: "Dây vải siêu mỏng (< 20g/con), không thấm nước",
      traditional: "Dây ngâm bùn, vải dày nặng 200g - 350g/con",
    },
    {
      criteria: "Bảo quản & Kiểm định",
      mavy: "Cấp đông rời IQF -40°C ngay tại bến, không ngâm hóa chất",
      traditional: "Ướp đá cây, có nguy cơ ngâm hàn the/urê giữ màu",
    },
    {
      criteria: "Chất lượng thịt sau nấu",
      mavy: "Chắc nịch, mọng nước, giữ 99% độ giòn ngọt nguyên bản",
      traditional: "Dễ bị bở nát, hao 25% - 40% trọng lượng do ngậm nước",
    },
    {
      criteria: "Chính sách bảo hành",
      mavy: "Bao ăn 1 đổi 1 tận nơi nếu cua ốp nước hoặc tôm không tươi",
      traditional: "Không hỗ trợ đổi trả sau khi rời quầy",
    },
  ];

  const testimonials = [
    {
      name: "Chef Hoàng Hải",
      role: "Bếp Trưởng Điều Hành - Khách sạn 5 sao",
      product: "Cua Gạch & Tôm Sú Đông Lạnh",
      rating: 5,
      date: "3 ngày trước",
      comment:
        "Cua Cà Mau và Tôm Sú của MAVY đạt chuẩn gạch son và độ chắc thịt hiếm có. Cấp đông IQF giúp thịt tôm giữ nguyên độ giòn ngọt mọng nước mà không bị bở nát.",
    },
    {
      name: "Chị Minh Thư",
      role: "Quận 7, TP. Hồ Chí Minh",
      product: "Cua Gạch & Mực Trứng Đông Lạnh",
      rating: 5,
      date: "Hôm qua",
      comment:
        "Mực trứng đông lạnh và tôm sú đông lạnh giao tới đóng gói bao bì hút chân không chỉn chu, tươi rói. Cua gạch thì siêu nhiều gạch, dây trói nhẹ tênh đúng như cam kết. Rất an tâm cho bữa ăn gia đình!",
    },
    {
      name: "Anh Tuấn Vũ",
      role: "Cầu Giấy, Hà Nội",
      product: "Combo Lẩu Hải Sản 3 Món",
      rating: 5,
      date: "5 ngày trước",
      comment:
        "Thùng xốp đóng đá gel chuyển ra Hà Nội vẫn còn nguyên độ đông lạnh chuẩn. Nấu lẩu hải sản ngọt nước tự nhiên, khác hẳn hải sản mua ở chợ dân sinh.",
    },
  ];

  return (
    <section id="standards" className="py-20 bg-navy-900 border-t border-navy-800 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3.5 py-1 rounded-full bg-navy-800 border border-navy-700 text-teal text-xs font-semibold uppercase tracking-wider">
            Tiêu Chuẩn & Đo Lường Thực Tế
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight pb-2">
            <span className="block leading-tight">Minh Bạch Chất Lượng</span>
            <span className="block text-gold leading-tight mt-2.5 sm:mt-3.5">
              Từ Biển Sạch Đến Bàn Ăn
            </span>
          </h2>
          <p className="text-sm sm:text-base text-ink-light/80 leading-relaxed font-normal">
            Chúng tôi xóa bỏ hoàn toàn các vấn nạn cố hữu của chợ truyền thống: gian lận dây trói, ướp hóa chất bảo quản và từ chối bảo hành.
          </p>
        </div>

        {/* Social Proof Real-Time Metrics Overview Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <AnimeCounter targetValue={128450} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Đơn Hàng Đã Bán</div>
            <p className="text-[11px] text-ink-light/60">Giao hỏa tốc 2H toàn quốc</p>
          </div>

          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <AnimeCounter targetValue={15820} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Đánh Giá & Feedback</div>
            <p className="text-[11px] text-ink-light/60">Hình ảnh & video thực tế từ khách</p>
          </div>

          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <span>99.4%</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Khách Hàng Hài Lòng</div>
            <p className="text-[11px] text-ink-light/60">Tỷ lệ tái đặt hàng trên 85%</p>
          </div>

          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <span>&lt; 2 Phút</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Tốc Độ Phản Hồi</div>
            <p className="text-[11px] text-ink-light/60">Tư vấn Zalo & Bảo hành 1 đổi 1</p>
          </div>
        </div>

        {/* Comparison Table: MAVY vs Chợ Truyền Thống */}
        <div className="glass-dark-card rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 bg-white/[0.04] border-b border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">Bảng Đối Chiếu Tiêu Chuẩn Minh Bạch</h3>
              <p className="text-xs text-ink-light/70">So sánh trực tiếp giữa quy chuẩn MAVY Seafood và hải sản trôi nổi</p>
            </div>
            <span className="text-xs text-coral font-semibold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              Cam kết bằng văn bản
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            <div className="grid grid-cols-12 p-4 text-xs font-bold text-ink-light/60 uppercase tracking-wider bg-white/[0.02]">
              <div className="col-span-4 sm:col-span-3">Tiêu Chí</div>
              <div className="col-span-4 sm:col-span-5 text-coral font-bold">Quy Chuẩn MAVY Seafood</div>
              <div className="col-span-4 sm:col-span-4 text-rose-400/80">Hải Sản Chợ Truyền Thống</div>
            </div>

            {comparisonData.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 text-xs sm:text-sm items-center hover:bg-white/[0.03] transition-colors">
                <div className="col-span-4 sm:col-span-3 font-semibold text-white pr-2">
                  {item.criteria}
                </div>
                <div className="col-span-4 sm:col-span-5 text-ink-light flex items-start gap-2 pr-2">
                  <IoCheckmarkOutline className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span className="font-medium text-white">{item.mavy}</span>
                </div>
                <div className="col-span-4 sm:col-span-4 text-ink-light/60 flex items-start gap-2">
                  <IoCloseOutline className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Quality Certifications Badges */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Hệ Thống Chứng Nhận & Kiểm Định Quốc Tế
            </h3>
            <p className="text-xs sm:text-sm text-ink-light/70">
              Mỗi lô hàng đều có mã truy xuất nguồn gốc và giấy kiểm định an toàn vệ sinh thực phẩm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_INFO.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="glass-dark-card glass-dark-card-hover p-6 rounded-2xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] text-coral flex items-center justify-center font-mono font-bold text-xs border border-white/10">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white">{cert.name}</h4>
                  <p className="text-xs text-coral font-mono">{cert.code}</p>
                  <p className="text-xs text-ink-light/70 leading-relaxed">{cert.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] text-[11px] text-ink-light/60">
                  Kiểm định định kỳ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Testimonials Grid with Verified Proof */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-base">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <span className="text-white font-bold text-sm ml-1.5">4.9 / 5.0</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Phản Hồi & Đánh Giá Thực Tế Từ Khách Hàng
            </h3>
            <p className="text-xs sm:text-sm text-ink-light/70">
              Trích xuất từ hơn 15.820+ đơn hàng đã giao và phản hồi qua Zalo / Hotline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="glass-dark-card glass-dark-card-hover p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Verified Buyer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {[...Array(item.rating)].map((_, i) => (
                        <IoStar key={i} />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-coral font-medium">
                      <IoCheckmarkCircleOutline className="w-3.5 h-3.5" />
                      <span>Đã mua hàng</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-light/90 italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  <div className="text-[11px] text-ink-light/50 flex justify-between">
                    <span>Đã mua: <strong className="text-ink-light/80">{item.product}</strong></span>
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 text-white flex items-center justify-center font-bold text-xs">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{item.name}</h5>
                      <p className="text-[11px] text-coral">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
