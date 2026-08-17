"use client";

import { BRAND_INFO } from "@/data/brandInfo";
import { IoCallOutline, IoTimeOutline, IoLocationOutline } from "react-icons/io5";

export default function ContactCta() {
  return (
    <section id="contact" className="py-24 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Dispatch Card */}
        <div className="bg-navy-900 border-2 border-navy-600 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left: Ordering Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy-950 border border-navy-800 text-xs font-semibold text-gold">
                <IoTimeOutline className="w-4 h-4" />
                <span>GIAO HÀNG TẬN NƠI TRONG 2 GIỜ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight pb-2">
                <span className="block leading-tight">Đặt Hải Sản Tươi Sống &</span>
                <span className="block text-gold leading-tight mt-2 sm:mt-3">Giao Tận Cửa Hôm Nay</span>
              </h2>

              <p className="text-sm sm:text-base text-ink-light/85 leading-relaxed">
                Hải sản được đóng thùng xốp chuyên dụng kèm túi đá gel kháng khuẩn, giữ trọn độ tươi giòn trong suốt quá trình vận chuyển. Hỗ trợ giao hỏa tốc 2 giờ tại TP.HCM.
              </p>

              {/* 3 Ordering Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800">
                  <div className="font-bold text-white text-xs">Bao Ăn 1 Đổi 1</div>
                  <p className="text-[11px] text-ink-light/70 mt-1">Đổi mới 100% trong 24h nếu cua ốp nước hoặc tôm không chắc thịt.</p>
                </div>
                <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800">
                  <div className="font-bold text-white text-xs">Dây Trói Dưới 20g</div>
                  <p className="text-[11px] text-ink-light/70 mt-1">Trọng lượng minh bạch, không độn dây vải ngấm nước.</p>
                </div>
                <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800">
                  <div className="font-bold text-white text-xs">Chuẩn IQF -40°C</div>
                  <p className="text-[11px] text-ink-light/70 mt-1">Dễ tách rời từng con, không cần rã đông cả túi lớn.</p>
                </div>
              </div>
            </div>

            {/* Right: Direct Hotline & Location Action Box */}
            <div className="lg:col-span-5 bg-navy-950 rounded-2xl border border-navy-800 p-6 sm:p-8 space-y-6 text-center lg:text-left">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-ink-light/70 font-semibold">Tổng Đài Tư Vấn & Đặt Hàng</div>
                <a
                  href="tel:0901325178"
                  className="text-3xl sm:text-4xl font-black text-gold hover:text-gold-hover transition-colors block"
                >
                  090 132 517
                </a>
                <p className="text-xs text-ink-light/60">Phục vụ từ 07:00 – 21:30 (Cả Thứ 7, Chủ Nhật & Ngày Lễ)</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-navy-800 text-xs text-ink-light/80">
                <div className="flex items-start gap-2.5">
                  <IoLocationOutline className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Địa chỉ:</strong> {BRAND_INFO.address}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:0901325178"
                  className="w-full py-3.5 rounded-xl bg-gold text-navy-950 font-bold text-sm hover:bg-gold-hover transition-colors shadow flex items-center justify-center gap-2"
                >
                  <IoCallOutline className="w-4 h-4" />
                  <span>Gọi Đặt Hàng Ngay (090 132 517)</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
