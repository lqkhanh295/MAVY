import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mavyseafood.vn"),
  title: "MAVY SEAFOOD | Tinh Hoa Hải Sản Biển Sạch - Cua Cà Mau, Tôm Sú, Mực Một Nắng",
  description:
    "Thương hiệu hải sản cao cấp MAVY chuyên cung cấp Cua Cà Mau chuẩn gạch son, Tôm Sú biển thiên nhiên size VIP và Mực một nắng Cô Tô. Tích hợp Bếp Trưởng AI Master Chef gợi ý công thức món ngon từ nguyên liệu sẵn có.",
  keywords: [
    "hải sản cao cấp",
    "cua biển cà mau",
    "tôm sú biển",
    "mực một nắng",
    "hải sản mavy",
    "món ngon hải sản",
    "bếp trưởng ai gợi ý món ăn",
    "cấp đông iqf hải sản",
  ],
  authors: [{ name: "MAVY Seafood" }],
  openGraph: {
    title: "MAVY SEAFOOD | Tinh Hoa Hải Sản Biển Sạch Cho Gian Bếp Việt",
    description:
      "Khám phá bộ 3 hải sản Thượng Hạng Cua Cà Mau - Tôm Sú - Mực Một Nắng và trải nghiệm Bếp Trưởng AI MAVY gợi ý món ngon tức thì!",
    url: "https://mavyseafood.vn",
    siteName: "MAVY Seafood",
    images: [
      {
        url: "/assets/image/hero-3-products.png",
        width: 1200,
        height: 630,
        alt: "Bộ 3 sản phẩm hải sản thượng hạng MAVY",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/assets/image/logo.png" />
      </head>
      <body className="min-h-screen bg-[#00153d] text-white antialiased selection:bg-[#F2A900] selection:text-[#00153d]">
        {children}
      </body>
    </html>
  );
}
