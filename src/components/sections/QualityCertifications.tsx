"use client";

import { BRAND_INFO } from "@/data/brandInfo";
import { IoStar } from "react-icons/io5";

export default function QualityCertifications() {
  const testimonials = [
    {
      name: "Chef Hoàng Hải",
      role: "Bếp Trưởng Điều Hành - Khách sạn 5 sao",
      comment:
        "Cua Cà Mau và Tôm Sú của MAVY đạt chuẩn gạch son và độ chắc thịt hiếm có. Cấp đông IQF giúp thịt tôm giữ nguyên độ giòn ngọt mọng nước mà không bị bở nát.",
      rating: 5,
    },
    {
      name: "Chị Minh Thư (Quận 7, TP.HCM)",
      role: "Khách hàng thân thiết",
      comment:
        "Mực một nắng và tôm sú giao tới vẫn đóng gói bao bì chỉn chu, tươi rói. Cua thì siêu nhiều gạch, dây trói nhẹ tênh đúng như cam kết. Rất an tâm cho bữa ăn gia đình!",
      rating: 5,
    },
    {
      name: "Anh Tuấn Vũ (Cầu Giấy, Hà Nội)",
      role: "Khách hàng mua định kỳ",
      comment:
        "Chatbot Bếp Trưởng AI của web rất hay, tôi gõ vài củ sả với gừng là nó chỉ cách hấp mực chuẩn không cần chỉnh. Đặt hàng qua hotline giao siêu nhanh!",
      rating: 5,
    },
  ];

  return (
    <section id="certifications" className="py-24 bg-[#051e48] border-y border-[#073372] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certifications Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F2A900]">
            TIÊU CHUẨN & CHỨNG NHẬN QUỐC TẾ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Bảo Chứng <span className="text-[#F2A900]">Chất Lượng Vàng</span>
          </h2>
          <p className="text-base text-[#E8EEF9]/80 leading-relaxed">
            Hải sản MAVY tuân thủ nghiêm ngặt các quy chuẩn kiểm định vệ sinh an toàn thực phẩm hàng đầu.
          </p>
        </div>

        {/* Certifications 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {BRAND_INFO.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-[#00153d] p-6 rounded-2xl border border-[#073372] space-y-3 flex flex-col justify-between hover:border-[#F2A900]/60 transition-colors"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#073372] text-[#F2A900] flex items-center justify-center font-mono font-bold text-xs border border-[#164082]">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white">{cert.name}</h3>
                <p className="text-xs text-[#F2A900] font-medium font-mono">{cert.code}</p>
                <p className="text-xs text-[#E8EEF9]/70 leading-relaxed">{cert.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#073372]/60 text-[11px] text-[#E8EEF9]/70">
                • Kiểm định định kỳ hằng quý
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Khách Hàng & Đầu Bếp Nói Về <span className="text-[#F2A900]">MAVY</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#E8EEF9]/70">
            Hơn 50.000 bữa cơm gia đình và tiệc sang trọng đã đồng hành cùng hải sản MAVY.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#00153d] p-6 rounded-2xl border border-[#073372] flex flex-col justify-between space-y-4 shadow-lg hover:border-[#F2A900]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <IoStar key={i} className="w-3.5 h-3.5 text-[#F2A900]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#E8EEF9]/90 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#073372] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#073372] border border-[#164082] text-white flex items-center justify-center font-bold text-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-[#F2A900]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
