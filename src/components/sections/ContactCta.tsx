"use client";

import { useState } from "react";
import { IoCallOutline, IoLocationOutline, IoMailOutline, IoSend, IoCheckmarkCircle } from "react-icons/io5";
import { BRAND_INFO } from "@/data/brandInfo";

export default function ContactCta() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    productInterest: "Cua Biển Cà Mau",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#00153d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details & Showrooms */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073372] border border-[#164082] text-xs font-bold text-[#F2A900]">
                <IoCallOutline className="w-4 h-4" />
                <span>LIÊN HỆ & TƯ VẤN ĐẶT HÀNG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Sẵn Sàng Phục Vụ <span className="text-[#F2A900]">Bữa Tiệc Hải Sản</span> Của Bạn
              </h2>
              <p className="text-sm sm:text-base text-[#E8EEF9]/80 leading-relaxed">
                Đội ngũ tư vấn viên MAVY luôn túc trực hỗ trợ chọn size cua, tôm, mực tươi ngon nhất và giao hàng hỏa tốc trong 2 giờ.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <a
                href="tel:19008899"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#051e48] border border-[#073372] hover:border-[#F2A900]/60 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F2A900] text-[#00153d] flex items-center justify-center font-bold shrink-0 shadow-md">
                  <IoCallOutline className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#E8EEF9]/70">Tổng đài đặt hàng miễn phí (7h30 - 21h30)</div>
                  <div className="text-lg font-extrabold text-white group-hover:text-[#F2A900] transition-colors">
                    1900 8899 - 0988 123 456
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#051e48] border border-[#073372]">
                <div className="w-12 h-12 rounded-xl bg-[#073372] text-[#F2A900] flex items-center justify-center font-bold shrink-0 border border-[#164082]">
                  <IoMailOutline className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#E8EEF9]/70">Hòm thư tiếp nhận hợp tác & phản hồi</div>
                  <div className="text-base font-bold text-white">contact@mavyseafood.vn</div>
                </div>
              </div>
            </div>

            {/* Showroom Locations */}
            <div className="bg-[#051e48] p-6 rounded-2xl border border-[#073372] space-y-4">
              <h3 className="text-sm font-bold text-[#F2A900] uppercase tracking-wider flex items-center gap-2">
                <IoLocationOutline className="w-4 h-4" />
                <span>Hệ Thống Showroom & Kho Lạnh MAVY</span>
              </h3>

              <div className="space-y-3">
                {BRAND_INFO.storeLocations.map((store, i) => (
                  <div key={i} className="text-xs border-b border-[#073372]/60 pb-2.5 last:border-0 last:pb-0">
                    <div className="font-bold text-white text-sm">{store.city}</div>
                    <div className="text-[#E8EEF9]/80 mt-0.5">{store.address}</div>
                    <div className="text-[#F2A900] font-medium mt-0.5">Hotline: {store.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Consultation Form */}
          <div className="lg:col-span-6 bg-[#051e48] p-8 rounded-2xl border-2 border-[#073372] shadow-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Đăng Ký Tư Vấn & Đặt Hải Sản</h3>
              <p className="text-xs text-[#E8EEF9]/70">
                Để lại thông tin, chuyên viên MAVY sẽ liên hệ lại ngay trong 5 phút để xác nhận size và thời gian giao hàng.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-[#00153d] rounded-xl border border-[#073372] p-6">
                <div className="w-16 h-16 rounded-full bg-[#073372] text-[#F2A900] flex items-center justify-center mx-auto border border-[#F2A900]">
                  <IoCheckmarkCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Đăng Ký Thành Công!</h4>
                <p className="text-sm text-[#E8EEF9]/80 max-w-sm mx-auto">
                  Cảm ơn quý khách. Chuyên viên MAVY sẽ gọi điện tới số <strong>{formData.phone}</strong> trong ít phút!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-lg bg-[#073372] text-xs font-semibold text-white hover:bg-[#0c4494] transition-colors"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#E8EEF9] mb-1.5">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Anh Hoàng / Chị Linh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#00153d] border border-[#073372] text-white placeholder-[#E8EEF9]/40 text-sm focus:outline-none focus:border-[#F2A900] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E8EEF9] mb-1.5">
                    Số điện thoại nhận hàng *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0988 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#00153d] border border-[#073372] text-white placeholder-[#E8EEF9]/40 text-sm focus:outline-none focus:border-[#F2A900] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E8EEF9] mb-1.5">
                    Sản phẩm bạn đang quan tâm
                  </label>
                  <select
                    value={formData.productInterest}
                    onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#00153d] border border-[#073372] text-white text-sm focus:outline-none focus:border-[#F2A900] transition-colors"
                  >
                    <option value="Cua Biển Cà Mau">Cua Biển Cà Mau Gạch Son (580k/kg)</option>
                    <option value="Tôm Sú Biển">Tôm Sú Biển Thiên Nhiên VIP (420k/500g)</option>
                    <option value="Mực Một Nắng">Mực Một Nắng Cô Tô Chuẩn Vị (360k/500g)</option>
                    <option value="Combo 3 Món Hải Sản">Combo Thượng Hạng Cả 3 Sản Phẩm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E8EEF9] mb-1.5">
                    Ghi chú thêm (địa chỉ nhận, thời gian giao...)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="VD: Giao trước 18h tối nay tại Quận 1, đóng thùng xốp giúp mình..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#00153d] border border-[#073372] text-white placeholder-[#E8EEF9]/40 text-sm focus:outline-none focus:border-[#F2A900] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F2A900] text-[#00153d] font-bold text-sm hover:bg-[#d99700] transition-colors shadow-lg shadow-black/30 flex items-center justify-center gap-2 active:scale-98"
                >
                  <IoSend className="w-4 h-4" />
                  <span>Xác Nhận Đặt Tư Vấn Ngay</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
