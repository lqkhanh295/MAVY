import Image from "next/image";
import { IoShieldCheckmarkOutline, IoCallOutline, IoMailOutline, IoLocationOutline, IoHeartOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 text-ink-light pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800/60">
          {/* Brand Info Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image
                  src="/assets/image/logo.png"
                  alt="Logo MAVY Seafood"
                  width={54}
                  height={54}
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">
                  Công ty cổ phần Mavy Seafood
                </span>
                <span className="text-[10px] tracking-wider uppercase text-ink-light/70 block">
                  Hải Sản Chuẩn Thượng Hạng
                </span>
              </div>
            </div>

            <p className="text-xs text-ink-light/70 leading-relaxed max-w-sm">
              Đơn vị phân phối Cua tươi Cà Mau, Tôm sú đông lạnh và Mực trứng đông lạnh chuẩn xuất khẩu. Cam kết bao ăn 1 đổi 1 và giao nhanh trong 2 giờ.
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-ink-light/80">
              <div className="flex items-start gap-2">
                <IoLocationOutline className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Đường 379, Phường Tăng Nhơn Phú A, Thành phố Thủ Đức, Tp Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span className="text-gold font-semibold">Chứng nhận HACCP & ISO 22000:2018</span>
              </div>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Danh Mục</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-gold transition-colors">
                  Cua Tươi Cà Mau
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold transition-colors">
                  Tôm Sú Đông Lạnh
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold transition-colors">
                  Mực Trứng Đông Lạnh
                </a>
              </li>
              <li>
                <a href="#culinary-studio" className="hover:text-gold transition-colors">
                  Công Thức Bếp Trưởng AI
                </a>
              </li>
              <li>
                <a href="#video-showcase" className="hover:text-gold transition-colors">
                  Thước Phim Thực Địa
                </a>
              </li>
            </ul>
          </div>

          {/* Commitments & Policy */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Chính Sách</h4>
            <ul className="space-y-2 text-xs text-ink-light/80">
              <li>Chính sách bao ăn 1 đổi 1</li>
              <li>Chính sách giao hàng hỏa tốc 2H</li>
              <li>Quy trình bảo quản cấp đông IQF</li>
              <li>Cam kết cân đúng, dây trói nhẹ</li>
              <li>Bảo mật thông tin khách hàng</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tổng Đài Đặt Hàng</h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:090132517"
                className="text-lg font-bold text-gold flex items-center gap-1.5 hover:underline"
              >
                <IoCallOutline className="w-4 h-4" />
                <span>090 132 517</span>
              </a>
              <p className="text-ink-light/70">Giờ mở cửa: 7:30 - 21:30 (Cả CN & Ngày lễ)</p>
              <a
                href="mailto:mavy.info@gmail.com"
                className="text-ink-light/70 flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <IoMailOutline className="w-3.5 h-3.5 text-gold" />
                <span>mavy.info@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-light/60">
          <p>© {new Date().getFullYear()} Công ty cổ phần Mavy Seafood. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            <IoHeartOutline className="w-3.5 h-3.5 text-gold" />
            <span>Tận tâm vì từng bữa cơm ngon gia đình Việt</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
