import { Product } from "@/types";

export const SIGNATURE_PRODUCTS: Product[] = [
  {
    id: "cua-gach",
    name: "Cua Gạch",
    category: "Cua Biển",
    tagline: "100% Cua sống tự nhiên – Gạch son béo bùi, thịt chắc ngọt từng thớ",
    description:
      "Cua gạch MAVY được đánh bắt tự nhiên từ vùng sinh thái rừng ngập mặn Năm Căn. Tuyển chọn từng con chắc khỏe, tràn đầy gạch son béo ngậy, cam kết dây trói siêu nhẹ không trọng lượng, bao ăn 1 đổi 1.",
    price: "690.000 VNĐ",
    unit: "1 kg",
    image: "/assets/image/cua-ca-mau.png",
    badge: "Bán Chạy Nhất",
    origin: "Năm Căn, Cà Mau",
    specifications: [
      { label: "Quy cách", value: "Cua sống tuyển chọn đầy gạch son" },
      { label: "Dây trói", value: "Dây vải siêu mỏng (< 20g/con)" },
      { label: "Tỷ lệ gạch & thịt", value: "Đảm bảo độ đầy gạch và thịt ≥ 95%" },
      { label: "Bảo quản", value: "Dùng tươi trong 24h hoặc ngăn đông" },
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
      "Bao ăn 1 đổi 1 nếu cua không đầy gạch hoặc ốp nước",
      "Dây trói siêu mỏng, không gian lận trọng lượng",
      "Vận chuyển tươi sống tận nơi trong 2 giờ tại nội thành",
    ],
  },
  {
    id: "tom-su-dong-lanh",
    name: "Tôm Sú Đông Lạnh",
    category: "Tôm Sú",
    tagline: "Size đại chuẩn xuất khẩu – Vỏ mỏng bóng bẩy, thịt giòn ngọt săn chắc",
    description:
      "Tôm sú đông lạnh MAVY được đánh bắt từ vùng biển sâu sạch, giữ nguyên độ tươi nguyên bản với công nghệ cấp đông siêu tốc IQF -40°C ngay khi lên tàu, giữ trọn 99% dinh dưỡng và độ giòn ngọt.",
    price: "349.000 VNĐ",
    unit: "1 kg",
    image: "/assets/image/tom-su.png",
    badge: "Thượng Hạng",
    origin: "Vùng biển Phú Quốc - Kiên Giang",
    specifications: [
      { label: "Kích thước", value: "Size VIP (15 - 20 con/kg)" },
      { label: "Công nghệ", value: "Cấp đông siêu tốc IQF -40°C chuẩn Châu Âu" },
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
      "Từng con đóng gói cấp đông rời tiện lợi",
      "Cấp đông IQF giúp rã đông dễ dàng từng con",
    ],
  },
  {
    id: "muc-trung-dong-lanh",
    name: "Mực Trứng Đông Lạnh",
    category: "Mực Biển",
    tagline: "Bụng đầy ắp trứng – Thân dày dẻo ngọt, thơm bùi béo ngậy đặc trưng",
    description:
      "Mực trứng đông lạnh MAVY được đánh bắt vào mùa sinh sản khi mực ôm trọn túi trứng béo bùi. Cấp đông siêu tốc IQF -40°C khóa chặt độ giòn sần sật và vị ngọt đậm đà của biển cả.",
    price: "319.000 VNĐ",
    unit: "1 kg",
    image: "/assets/image/muc.png",
    badge: "Đặc Sản Đảo",
    origin: "Đảo Cô Tô / Phan Thiết",
    specifications: [
      { label: "Tỷ lệ ôm trứng", value: "Đạt ≥ 85% - 95% thân chứa đầy trứng" },
      { label: "Công nghệ", value: "Cấp đông siêu tốc IQF -40°C chuẩn sạch" },
      { label: "Đóng gói", value: "Hút chân không bảo quản tiêu chuẩn xuất khẩu" },
      { label: "Tiêu chuẩn", value: "100% tự nhiên, không chất bảo quản" },
    ],
    nutritionFacts: {
      protein: "18.0g / 100g",
      calories: "92 kcal",
      omega3: "480mg",
      calcium: "32mg",
    },
    cookingSuggestions: [
      "Mực trứng hấp gừng hành thơm nức mũi",
      "Mực trứng chiên nước mắm tỏi ớt giòn rụm",
      "Mực trứng nướng muối ớt cay nồng đậm vị",
      "Mực trứng xào chua ngọt đưa cơm",
    ],
    features: [
      "100% đánh bắt tự nhiên từ vùng biển sạch",
      "Bụng căng tròn đầy trứng, vị béo bùi đậm đà",
      "Giao nhanh 2 giờ tận nơi, đóng thùng bảo ôn chuyên dụng",
    ],
  },
];
