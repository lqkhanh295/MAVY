"use client";

import { BRAND_INFO } from "@/data/brandInfo";
import { IoCallOutline, IoTimeOutline, IoLocationOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

export default function ContactCta() {
  return (
    <section id="contact" className="py-24 bg-[#00153d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Dispatch Card */}
        <div className="bg-[#051e48] border-2 border-[#164082] rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Ordering Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00153d] border border-[#073372] text-xs font-semibold text-[#F2A900]">
                <IoTimeOutline className="w-4 h-4" />
                <span>GIAO HÀNG TẬN NƠI TRONG 2 GIỜ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Đặt Hải Sản Tươi Sống & <br />
                <span className="text-[#F2A900]">Giao Tận Cửa Hôm Nay</span>
              </h2>

              <p className="text-sm sm:text-base text-[#E8EEF9]/85 leading-relaxed">
                Hải sản được đóng thùng xốp chuyên dụng kèm túi đá gel kháng khuẩn, giữ trọn độ tươi giòn trong suốt quá trình vận chuyển. Hỗ trợ giao hỏa tốc 2 giờ tại TP.HCM & Hà Nội.
              </p>

              {/* 3 Ordering Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#00153d] p-3.5 rounded-xl border border-[#073372]">
                  <div className="font-bold text-white text-xs">Bao Ăn 1 Đổi 1</div>
                  <p className="text-[11px] text-[#E8EEF9]/70 mt-1">Đổi mới 100% trong 24h nếu cua ốp nước hoặc tôm không chắc thịt.</p>
                </div>
                <div className="bg-[#00153d] p-3.5 rounded-xl border border-[#073372]">
                  <div className="font-bold text-white text-xs">Dây Trói Dưới 20g</div>
                  <p className="text-[11px] text-[#E8EEF9]/70 mt-1">Trọng lượng minh bạch, không độn dây vải ngấm nước.</p>
                </div>
                <div className="bg-[#00153d] p-3.5 rounded-xl border border-[#073372]">
                  <div className="font-bold text-white text-xs">Chuẩn IQF -40°C</div>
                  <p className="text-[11px] text-[#E8EEF9]/70 mt-1">Dễ tách rời từng con, không cần rã đông cả túi lớn.</p>
                </div>
              </div>
            </div>

            {/* Right: Direct Hotline & Location Action Box */}
            <div className="lg:col-span-5 bg-[#00153d] rounded-2xl border border-[#073372] p-6 sm:p-8 space-y-6 text-center lg:text-left">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#E8EEF9]/70 font-semibold">Tổng Đài Tư Vấn & Đặt Hàng</div>
                <a
                  href="tel:19008899"
                  className="text-3xl sm:text-4xl font-black text-[#F2A900] hover:text-[#d99700] transition-colors block"
                >
                  1900 8899
                </a>
                <p className="text-xs text-[#E8EEF9]/60">Phục vụ từ 07:00 – 21:30 (Cả Thứ 7, Chủ Nhật & Ngày Lễ)</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#073372] text-xs text-[#E8EEF9]/80">
                <div className="flex items-start gap-2.5">
                  <IoLocationOutline className="w-4 h-4 text-[#F2A900] shrink-0 mt-0.5" />
                  <span><strong>Kho TP.HCM:</strong> {BRAND_INFO.storeLocations[0].address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <IoLocationOutline className="w-4 h-4 text-[#F2A900] shrink-0 mt-0.5" />
                  <span><strong>Kho Hà Nội:</strong> {BRAND_INFO.storeLocations[1].address}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:19008899"
                  className="w-full py-3.5 rounded-xl bg-[#F2A900] text-[#00153d] font-bold text-sm hover:bg-[#d99700] transition-colors shadow flex items-center justify-center gap-2"
                >
                  <IoCallOutline className="w-4 h-4" />
                  <span>Gọi Đặt Hàng Ngay (1900 8899)</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
