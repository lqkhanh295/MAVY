import { Product } from "@/types";

export const SIGNATURE_PRODUCTS: Product[] = [
  {
    id: "cua-ca-mau",
    name: "Cua Biển Cà Mau Thượng Hạng",
    category: "Cua Biển",
    tagline: "100% Cua sống tự nhiên – Gạch son béo bùi, thịt chắc ngọt từng thớ",
    description:
      "Cua biển Cà Mau MAVY được đánh bắt tự nhiên từ vùng sinh thái rừng ngập mặn Năm Căn. Tuyển chọn từng con chắc khỏe, cam kết dây trói siêu nhẹ không trọng lượng, bao ăn 1 đổi 1.",
    price: "580.000₫",
    unit: "Kg (2-3 con/kg)",
    image: "/assets/image/cua-ca-mau.png",
    badge: "Bán Chạy Nhất",
    origin: "Năm Căn, Cà Mau",
    specifications: [
      { label: "Quy cách", value: "Cua sống thở oxy / Cấp đông nhanh IQF" },
      { label: "Dây trói", value: "Dây vải siêu mỏng (< 20g/con)" },
      { label: "Tỷ lệ thịt", value: "Đảm bảo độ đầy thịt ≥ 95%" },
      { label: "Bảo quản", value: "Ngăn đông -18°C hoặc dùng tươi trong 24h" },
    ],
    nutritionFacts: {
      protein: "19.5g / 100g",
      calories: "87 kcal",
      omega3: "450mg",
      calcium: "141mg",
    },
    cookingSuggestions: [
      "Cua sốt ớt Singapore cay nồng đậm vị",
      "Cua rang me chua ngọt sánh quyện",
      "Cua hấp nước dừa giữ trọn vị ngọt thanh tự nhiên",
      "Cua sốt trứng muối hoàng kim béo ngậy",
    ],
    features: [
      "Bao ăn 1 đổi 1 nếu cua ốp nước",
      "Dây trói siêu mỏng, không gian lận trọng lượng",
      "Vận chuyển sống tận nơi trong 2 giờ tại nội thành",
    ],
  },
  {
    id: "tom-su-bien",
    name: "Tôm Sú Biển Thiên Nhiên VIP",
    category: "Tôm Sú",
    tagline: "Size đại khổng lồ – Vỏ mỏng bóng bẩy, thịt giòn ngọt săn chắc",
    description:
      "Tôm sú biển MAVY được đánh bắt từ vùng biển sâu sạch, giữ nguyên độ tươi nguyên bản với công nghệ cấp đông siêu tốc IQF -40°C ngay khi lên tàu, giữ trọn 99% dinh dưỡng và độ giòn ngọt.",
    price: "420.000₫",
    unit: "Hộp 500g (10-12 con/hộp)",
    image: "/assets/image/tom-su.png",
    badge: "Thượng Hạng",
    origin: "Vùng biển Phú Quốc - Kiên Giang",
    specifications: [
      { label: "Kích thước", value: "Size VIP (15 - 20 con/kg)" },
      { label: "Công nghệ", value: "Cấp đông rời IQF -40°C chuẩn Châu Âu" },
      { label: "Tình trạng", value: "Nguyên con, râu càng nguyên vẹn" },
      { label: "Hạn sử dụng", value: "12 tháng ở nhiệt độ -18°C" },
    ],
    nutritionFacts: {
      protein: "24.0g / 100g",
      calories: "99 kcal",
      omega3: "300mg",
      calcium: "70mg",
    },
    cookingSuggestions: [
      "Tôm sú nướng muối ớt cay xè thơm lừng",
      "Tôm sú sốt bơ tỏi hoàng gia thơm ngậy",
      "Tôm sú hấp bia sả gừng giữ vị tươi nguyên",
      "Tôm sú sốt me Thái Lan chua cay chuẩn vị",
    ],
    features: [
      "Thịt giòn sần sật, ngọt tự nhiên không ngâm hóa chất",
      "Từng con đóng khay hút chân không cao cấp tiện lợi",
      "Cấp đông IQF giúp rã đông dễ dàng từng con",
    ],
  },
  {
    id: "muc-mot-nang",
    name: "Mực Ống Tươi / Mực Một Nắng",
    category: "Mực Biển",
    tagline: "Thân dày trắng trong – Phơi 1 nắng chuẩn vị giòn thơm mềm ngọt",
    description:
      "Mực ống câu đêm tươi rói được tuyển lựa kỹ càng, sơ chế sạch sẽ và phơi đúng một nắng giòn rụm bên ngoài nhưng mọng nước ngọt thanh bên trong, đem đến trải nghiệm ẩm thực tinh tế.",
    price: "360.000₫",
    unit: "Túi 500g (3-4 con/túi)",
    image: "/assets/image/muc.png",
    badge: "Đặc Sản Đảo",
    origin: "Đảo Cô Tô / Phan Thiết",
    specifications: [
      { label: "Loại mực", value: "Mực ống câu tay tự nhiên" },
      { label: "Độ khô", value: "Chuẩn một nắng (dẻo mềm, ngọt đượm)" },
      { label: "Đóng gói", value: "Hút chân không màng PA bảo quản an toàn" },
      { label: "Tiêu chuẩn", value: "Không chất tẩy trắng, không bảo quản" },
    ],
    nutritionFacts: {
      protein: "18.0g / 100g",
      calories: "92 kcal",
      omega3: "480mg",
      calcium: "32mg",
    },
    cookingSuggestions: [
      "Mực nướng sa tế than hoa thơm nức mũi",
      "Mực hấp hành gừng nước mắm nhĩ gừng ớt",
      "Mực chiên giòn xóc tỏi ớt lá quế",
      "Mực xào chua ngọt giòn sần sật với dứa và ớt chuông",
    ],
    features: [
      "Không ngâm nước, nướng lên nở phồng thơm phức",
      "Mực dẻo ngọt, không bị dai như mực đông lạnh thông thường",
      "Đầy đủ tem truy xuất nguồn gốc và kiểm định an toàn",
    ],
  },
];
