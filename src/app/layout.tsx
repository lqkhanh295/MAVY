import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import DevToolsGuard from "@/components/security/DevToolsGuard";
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
  title: "MAVY SEAFOOD | Hải Sản Tự Nhiên - Cua Gạch, Tôm Sú Đông Lạnh, Mực Trứng Đông Lạnh",
  description:
    "Công ty cổ phần Mavy Seafood chuyên cung cấp Cua gạch Cà Mau, Tôm sú đông lạnh và Mực trứng đông lạnh chuẩn xuất khẩu. Cấp đông tiêu chuẩn ≤ -18°C, bao ăn 1 đổi 1 và giao nhanh trong 2 giờ.",
  keywords: [
    "hải sản tự nhiên",
    "cua gạch",
    "tôm sú đông lạnh",
    "mực trứng đông lạnh",
    "mavy seafood",
    "công ty cổ phần mavy seafood",
    "cấp đông iqf",
    "bếp trưởng ai",
  ],
  authors: [
    { name: "khanhlq", url: "https://github.com/lqkhanh295" },
    { name: "Công ty cổ phần Mavy Seafood" },
  ],
  creator: "khanhlq",
  publisher: "khanhlq",
  other: {
    "developer": "khanhlq",
    "crafted-by": "khanhlq (https://github.com/lqkhanh295)",
  },
  openGraph: {
    title: "MAVY SEAFOOD | Hải Sản Tự Nhiên Chuẩn Vị Ngọt Nguyên Bản",
    description:
      "Khám phá bộ 3 hải sản tự nhiên Cua Gạch - Tôm Sú Đông Lạnh - Mực Trứng Đông Lạnh và trải nghiệm Bếp Trưởng AI MAVY gợi ý món ngon tức thì!",
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
      <body className="min-h-screen bg-navy-950 text-white antialiased selection:bg-gold selection:text-navy-950">
        <DevToolsGuard />
        {children}
      </body>
    </html>
  );
}
