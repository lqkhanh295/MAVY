"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenuOutline, IoCloseOutline, IoCallOutline } from "react-icons/io5";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Phim Tài Liệu", href: "#video-showcase" },
    { name: "Sản Phẩm", href: "#products" },
    { name: "Xưởng Ẩm Thực", href: "#culinary-studio" },
    { name: "Về MAVY", href: "#about" },
    { name: "Tiêu Chuẩn & So Sánh", href: "#standards" },
    { name: "Liên Hệ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-[#00153d]/95 backdrop-blur-md border-b border-[#073372] py-3 shadow-lg"
          : "bg-[#00153d] border-b border-[#073372]/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-10 h-10 rounded-lg bg-[#073372] border border-[#164082] p-1.5 flex items-center justify-center">
              <Image
                src="/assets/image/logo.png"
                alt="Logo MAVY Seafood"
                width={32}
                height={32}
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-none">
                MAVY <span className="text-[#F2A900]">SEAFOOD</span>
              </span>
              <span className="text-[10px] text-[#E8EEF9]/70 font-medium tracking-wider uppercase block mt-1">
                Hải Sản Tự Nhiên Tuyển Chọn
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links in Logical Sequence */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs lg:text-sm font-semibold text-[#E8EEF9]/90 hover:text-[#F2A900] transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="tel:19008899"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#073372] border border-[#164082] text-xs font-bold text-[#F2A900] hover:bg-[#0c4494] transition-colors whitespace-nowrap"
            >
              <IoCallOutline className="w-4 h-4 text-[#F2A900]" />
              <span>1900 8899</span>
            </a>

            <a
              href="#products"
              className="px-4 py-2 rounded-lg bg-[#F2A900] text-[#00153d] text-xs font-bold hover:bg-[#d99700] transition-colors whitespace-nowrap shadow-sm"
            >
              Bảng Giá Hải Sản
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#E8EEF9] hover:bg-[#073372] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <IoCloseOutline className="w-6 h-6" />
            ) : (
              <IoMenuOutline className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#073372] space-y-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[#E8EEF9] hover:bg-[#073372] hover:text-[#F2A900] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:19008899"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#073372] text-[#F2A900] text-xs font-bold border border-[#164082]"
              >
                <IoCallOutline className="w-4 h-4" />
                <span>Hotline 1900 8899 (Giao 2 Giờ)</span>
              </a>
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-lg bg-[#F2A900] text-[#00153d] text-xs font-bold"
              >
                Xem Bảng Giá Hải Sản
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
