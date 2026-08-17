"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoMenuOutline, IoCloseOutline, IoCallOutline, IoSparkles } from "react-icons/io5";

interface NavbarProps {
  onOpenChat: () => void;
  onOpenConsultModal?: () => void;
}

export default function Navbar({ onOpenChat, onOpenConsultModal }: NavbarProps) {
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
    { name: "Sản Phẩm Signature", href: "#products" },
    { name: "Thước Phim MAVY", href: "#video-showcase" },
    { name: "Gợi Ý Món Ngon", href: "#recipes" },
    { name: "Về MAVY & IQF", href: "#about" },
    { name: "Cam Kết & Chứng Nhận", href: "#certifications" },
    { name: "Liên Hệ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#00153d]/95 backdrop-blur-md border-b border-[#073372] py-3 shadow-lg shadow-black/20"
          : "bg-[#00153d]/70 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#F2A900] bg-[#073372] p-1 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <Image
              src="/assets/image/logo.png"
              alt="Logo MAVY Seafood"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="shrink-0">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white block whitespace-nowrap leading-none">
              MAVY <span className="text-[#F2A900]">SEAFOOD</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[#E8EEF9]/70 block font-medium whitespace-nowrap mt-1">
              Hải Sản Chuẩn Thượng Hạng
            </span>
          </div>
        </a>

        {/* Desktop Nav Links (Always on a single line, whitespace-nowrap) */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs 2xl:text-sm font-semibold text-[#E8EEF9] hover:text-[#F2A900] transition-colors py-1 whitespace-nowrap shrink-0"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* AI Chef Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#073372] border border-[#164082] text-[#F2A900] text-xs sm:text-sm font-semibold hover:bg-[#0c4494] transition-colors whitespace-nowrap shrink-0"
            title="Mở Bếp Trưởng AI Gợi Ý Món Ăn"
          >
            <IoSparkles className="w-4 h-4 text-[#F2A900] shrink-0" />
            <span className="whitespace-nowrap">Bếp Trưởng AI</span>
          </button>

          {/* Hotline / Order Button */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F2A900] text-[#00153d] text-xs sm:text-sm font-extrabold hover:bg-[#d99700] transition-all transform active:scale-95 whitespace-nowrap shrink-0 shadow-md"
          >
            <IoCallOutline className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">1900 8899</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-[#E8EEF9] bg-[#073372] hover:bg-[#0c4494] transition-colors shrink-0"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <IoCloseOutline className="w-5 h-5" /> : <IoMenuOutline className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#00153d] border-b border-[#073372] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#E8EEF9] hover:text-[#F2A900] py-2 px-3 rounded-md hover:bg-[#073372] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#073372] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#073372] border border-[#164082] text-[#F2A900] font-semibold text-sm"
            >
              <IoSparkles className="w-4 h-4" />
              <span>Hỏi Bếp Trưởng AI Gợi Ý Món</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#F2A900] text-[#00153d] font-bold text-center text-sm"
            >
              <IoCallOutline className="w-4 h-4" />
              <span>Hotline Đặt Hàng: 1900 8899</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
