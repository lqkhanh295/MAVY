# 🌊 MAVY Seafood — Official Landing Page & AI Culinary Studio

> Trang thông tin thương mại điện tử & Xưởng ẩm thực AI của thương hiệu hải sản tự nhiên cao cấp **MAVY Seafood**.

---

## 📌 1. Tổng Quan Dự Án

**MAVY Seafood** là nền tảng giới thiệu và phân phối 3 dòng hải sản chủ lực tự nhiên tại Việt Nam (Cua gạch Cà Mau, Tôm sú đông lạnh VIP, Mực trứng đông lạnh) với tiêu chuẩn cấp đông siêu tốc **IQF -40°C** và chính sách giao hàng hỏa tốc trong 2 giờ.

### ✨ Điểm Nổi Bật Về Trải Nghiệm & Kỹ Thuật:
1. **Purposeful Storytelling Motion**: Hệ thống chuyển động có chủ đích giúp dẫn mắt và giải thích công nghệ (Orchestrated Hero Reveal, Shared-Element Transition, 4-Stage Cooking Stepper, Sơ đồ công nghệ cấp đông IQF).
2. **Xưởng Ẩm Thực AI In-Context (AI Culinary Studio)**: Tích hợp mô hình AI (Google Gemini 2.0 / 1.5) giúp người dùng nhập nguyên liệu tủ lạnh và nhận công thức chuẩn vị được hướng dẫn theo từng giai đoạn nhiệt độ.
3. **Minh Bạch Thông Số & Nguồn Gốc**: Bảng so sánh trực tiếp MAVY vs Chợ truyền thống (trọng lượng dây trói <20g, tỷ lệ thịt ≥95%, cam kết không hóa chất).
4. **Design System Chuẩn Hóa**: Hệ thống Design Token tập trung duy nhất tại `tailwind.config.ts` (thang màu `navy-*`, `gold`, `ink-*`, `sale`).

---

## 🛠️ 2. Công Nghệ Sử Dụng (Tech Stack)

| Thành phần | Công nghệ / Thư viện |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, React 19, Server Components) |
| **Ngôn ngữ** | [TypeScript](https://www.typescriptlang.org/) (Strict mode, full type-safety) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) (Centralized Design Tokens) |
| **Motion & Animation** | [Framer Motion v12](https://www.framer.com/motion/) (Layout transitions, Shared Elements) |
| **Icon Set** | [Ionicons 5](https://ionic.io/ionicons) qua `react-icons/io5` |
| **AI Backend** | Google Gemini API (`gemini-2.0-flash`, `gemini-1.5-flash`) qua Serverless Route Handler |

---

## 📂 3. Cấu Trúc Thư Mục Dự Án

```text
d:\CODE\MAVY/
├── public/
│   └── assets/
│       ├── image/         # 5 asset ảnh chuẩn hóa (cua-ca-mau, tom-su, muc, logo, hero)
│       └── video/         # Video tài liệu thực địa 1080p tối ưu web (14MB)
├── src/
│   ├── app/
│   │   ├── api/chat/      # Route Handler xử lý Bếp Trưởng AI & IP Rate Limiter
│   │   ├── globals.css    # Style toàn cục, scrollbar & utility classes
│   │   ├── layout.tsx     # Root Layout, font Be Vietnam Pro & Inter
│   │   └── page.tsx       # Cấu trúc trang chủ: Hero → Video → Products → Recipe → About → Standards → Contact
│   ├── components/
│   │   ├── layout/        # Navbar, Footer
│   │   ├── sections/      # HeroSection, VideoShowcase, ProductsSection, RecipeShowcase, AboutStorySection, QualityCertifications, ContactCta
│   │   ├── chatbot/       # ChatMessage, RecipeCard, ChatWindow
│   │   └── ui/            # AnimeCounter
│   ├── data/              # brandInfo.ts, products.ts, recipes.ts
│   ├── lib/               # llm-rotator.ts (Hệ thống điều phối AI & Fallback Generator)
│   └── types/             # Type definitions (Product, Recipe, ChatMessage)
├── .env.local.example     # Mẫu cấu hình API key
├── tailwind.config.ts     # Single Source of Truth cho toàn bộ Design Tokens
└── tsconfig.json          # Cấu hình TypeScript
```

---

## 🚀 4. Cài Đặt & Chạy Dự Án

### Bước 1: Clone repository
```bash
git clone https://github.com/lqkhanh295/MAVY.git
cd MAVY
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cấu hình biến môi trường
Tạo file `.env.local` tại thư mục gốc:
```env
# Google Gemini API Key (Lấy tại https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here

# (Tùy chọn) Hỗ trợ danh sách nhiều key xoay vòng
# GEMINI_API_KEYS=key_1,key_2,key_3
```

### Bước 4: Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập [`http://localhost:3000`](http://localhost:3000) trên trình duyệt.

### Bước 5: Build và chạy Production
```bash
npm run build
npm start
```

---

## 📐 5. Quy Chuẩn Thiết Kế & Lập Trình (Guidelines)

- **Không viết mã màu Hex tùy ý trong component**: Luôn sử dụng token từ `tailwind.config.ts` (`bg-navy-950`, `bg-navy-900`, `bg-navy-800`, `text-gold`, `text-ink-light`).
- **Nguyên tắc Motion Design**: Mỗi viewport chỉ có 1 animation chính làm tâm điểm (Hero reveal, Shared-element modal transition, hoặc Step progress indicator).
- **Fallback an toàn**: Khi chưa cấu hình API key hoặc gặp lỗi mạng, Bếp Trưởng AI sẽ tự động kích hoạt bộ tạo công thức thông minh dự phòng để đảm bảo trải nghiệm người dùng luôn liền mạch.

---

## 📄 6. Giấy Phép & Bản Quyền

Bản quyền © 2026 MAVY Seafood. Mọi quyền được bảo lưu.
