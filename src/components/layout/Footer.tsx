import Image from "next/image";
import { IoShieldCheckmarkOutline, IoCallOutline, IoMailOutline, IoLocationOutline, IoHeartOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#000f2b] border-t border-[#073372] text-[#E8EEF9] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#073372]/60">
          {/* Brand Info Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#F2A900] bg-[#073372] p-1 flex items-center justify-center">
                <Image
                  src="/assets/image/logo.png"
                  alt="Logo MAVY Seafood"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  MAVY <span className="text-[#F2A900]">SEAFOOD</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#E8EEF9]/70 block">
                  Hải Sản Chuẩn Thượng Hạng
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E8EEF9]/70 leading-relaxed max-w-sm">
              Đơn vị phân phối Cua Cà Mau gạch son, Tôm Sú biển tự nhiên và Mực một nắng Cô Tô chuẩn xuất khẩu. Cam kết bao ăn 1 đổi 1 và giao nhanh trong 2 giờ.
            </p>

            <div className="pt-2 text-xs text-[#F2A900] font-semibold flex items-center gap-2">
              <IoShieldCheckmarkOutline className="w-4 h-4" />
              <span>Chứng nhận HACCP & ISO 22000:2018</span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Danh Mục</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-[#F2A900] transition-colors">
                  Cua Biển Cà Mau
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#F2A900] transition-colors">
                  Tôm Sú Biển Thiên Nhiên
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#F2A900] transition-colors">
                  Mực Một Nắng Cô Tô
                </a>
              </li>
              <li>
                <a href="#recipes" className="hover:text-[#F2A900] transition-colors">
                  Công Thức Món Ngon
                </a>
              </li>
              <li>
                <a href="#video-showcase" className="hover:text-[#F2A900] transition-colors">
                  Thước Phim MAVY
                </a>
              </li>
            </ul>
          </div>

          {/* Commitments & Policy */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Chính Sách</h4>
            <ul className="space-y-2 text-xs text-[#E8EEF9]/80">
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
              <p className="text-lg font-bold text-[#F2A900] flex items-center gap-1.5">
                <IoCallOutline className="w-4 h-4" />
                <span>1900 8899</span>
              </p>
              <p className="text-[#E8EEF9]/80">0988 123 456 (Zalo / Hotline)</p>
              <p className="text-[#E8EEF9]/70">Giờ mở cửa: 7:30 - 21:30 (Cả CN & Ngày lễ)</p>
              <p className="text-[#E8EEF9]/70 flex items-center gap-1">
                <IoMailOutline className="w-3.5 h-3.5" />
                <span>contact@mavyseafood.vn</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8EEF9]/60">
          <p>© {new Date().getFullYear()} MAVY SEAFOOD. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            <IoHeartOutline className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Tận tâm vì từng bữa cơm ngon gia đình Việt</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
