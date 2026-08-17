"use client";

import { BRAND_INFO } from "@/data/brandInfo";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";

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
      comment:
        "Cua Cà Mau và Tôm Sú của MAVY đạt chuẩn gạch son và độ chắc thịt hiếm có. Cấp đông IQF giúp thịt tôm giữ nguyên độ giòn ngọt mọng nước mà không bị bở nát.",
    },
    {
      name: "Chị Minh Thư (Quận 7, TP.HCM)",
      role: "Khách hàng mua định kỳ cho gia đình",
      comment:
        "Mực một nắng và tôm sú giao tới đóng gói bao bì hút chân không chỉn chu, tươi rói. Cua thì siêu nhiều gạch, dây trói nhẹ tênh đúng như cam kết. Rất an tâm cho bữa ăn gia đình!",
    },
    {
      name: "Anh Tuấn Vũ (Cầu Giấy, Hà Nội)",
      role: "Khách hàng liên tỉnh",
      comment:
        "Thùng xốp đóng đá gel chuyển ra Hà Nội vẫn còn nguyên độ đông lạnh chuẩn. Nấu lẩu hải sản ngọt nước tự nhiên, khác hẳn hải sản mua ở chợ dân sinh.",
    },
  ];

  return (
    <section id="standards" className="py-24 bg-navy-900 border-y border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950 border border-navy-800 text-xs font-semibold text-gold">
            <span>MINH BẠCH TIÊU CHUẨN NGUỒN GỐC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight pb-2">
            <span className="block leading-tight">Tại Sao Nên Chọn</span>
            <span className="block text-gold leading-tight mt-2.5 sm:mt-3.5">Hải Sản MAVY?</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-light/80 leading-relaxed max-w-2xl mx-auto pt-2">
            Chúng tôi xóa bỏ nỗi lo mua phải hải sản ngậm nước, dây trói gian lận cân nặng hay ướp hóa chất bảo quản.
          </p>
        </div>

        {/* Direct Comparison Table */}
        <div className="mb-20 bg-navy-950 rounded-2xl border border-navy-800 overflow-hidden shadow-xl">
          <div className="p-6 bg-navy-800/50 border-b border-navy-800">
            <h3 className="text-xl font-bold text-white leading-snug">
              Bảng So Sánh Minh Bạch: Hải Sản MAVY vs Hải Sản Chợ Truyền Thống
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-navy-900 text-xs font-bold uppercase tracking-wider text-ink-light/70 border-b border-navy-800">
                <tr>
                  <th className="p-4 sm:p-5 w-1/4">Tiêu Chí</th>
                  <th className="p-4 sm:p-5 w-3/8 text-gold bg-navy-800/30">MAVY Seafood</th>
                  <th className="p-4 sm:p-5 w-3/8 text-ink-light/60">Hải Sản Chợ Dân Sinh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-navy-900/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white align-top leading-relaxed">{row.criteria}</td>
                    <td className="p-4 sm:p-5 text-ink-light bg-navy-800/20 font-medium align-top leading-relaxed">
                      <div className="flex items-start gap-2">
                        <IoCheckmarkOutline className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.mavy}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-ink-light/70 align-top leading-relaxed">
                      <div className="flex items-start gap-2">
                        <IoCloseOutline className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Standards Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Quy Chuẩn Kiểm Định & Cấp Đông IQF
            </h3>
            <p className="text-xs sm:text-sm text-ink-light/70">
              Quy trình khép kín từ lúc thuyền cập cảng đến khi đóng gói đến tay khách hàng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_INFO.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-3 flex flex-col justify-between hover:border-navy-600 transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-800 text-gold flex items-center justify-center font-mono font-bold text-xs border border-navy-600">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white">{cert.name}</h4>
                  <p className="text-xs text-gold font-mono">{cert.code}</p>
                  <p className="text-xs text-ink-light/70 leading-relaxed">{cert.desc}</p>
                </div>
                <div className="pt-3 border-t border-navy-800/60 text-[11px] text-ink-light/60">
                  Kiểm định định kỳ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Testimonials Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Đánh Giá Từ Khách Hàng & Đầu Bếp
            </h3>
            <p className="text-xs sm:text-sm text-ink-light/70">
              Sự tin cậy của hơn 50.000 bữa cơm gia đình và tiệc ẩm thực trên toàn quốc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-navy-950 p-6 rounded-2xl border border-navy-800 flex flex-col justify-between space-y-4 shadow-md"
              >
                <p className="text-xs sm:text-sm text-ink-light/90 italic leading-relaxed">
                  "{item.comment}"
                </p>

                <div className="pt-4 border-t border-navy-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy-800 border border-navy-600 text-white flex items-center justify-center font-bold text-xs">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{item.name}</h5>
                    <p className="text-[11px] text-gold">{item.role}</p>
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
