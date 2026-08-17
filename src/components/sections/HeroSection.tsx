"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { IoSparkles, IoPlay, IoRibbonOutline } from "react-icons/io5";
import OceanParticles from "@/components/ui/OceanParticles";
import AnimeTextStagger from "@/components/ui/AnimeTextStagger";

interface HeroSectionProps {
  onOpenChat: () => void;
  onSelectProduct: (productId: string) => void;
}

export default function HeroSection({ onOpenChat, onSelectProduct }: HeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#00153d]">
      {/* Anime.js Ocean Particles & Ambient Lighting */}
      <OceanParticles />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] bg-[#073372]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#F2A900]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Copy & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073372] border border-[#164082] text-xs font-semibold text-[#E8EEF9]">
              <IoRibbonOutline className="w-4 h-4 text-[#F2A900]" />
              <span>Tiêu Chuẩn Hải Sản Xuất Khẩu IQF -40°C</span>
            </motion.div>

            {/* Main Headline with Anime.js Kinetic Text Stagger */}
            <AnimeTextStagger
              text="Tinh Hoa Đại Dương Cho Gian Bếp Việt"
              highlightWords={["Đại", "Dương"]}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.15] tracking-tight justify-center lg:justify-start"
              delay={300}
            />

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#E8EEF9]/90 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              MAVY tự hào mang đến bộ 3 hải sản Thượng Hạng:{" "}
              <strong className="text-white">Cua Biển Cà Mau gạch son</strong>,{" "}
              <strong className="text-white">Tôm Sú biển size VIP</strong> và{" "}
              <strong className="text-white">Mực một nắng Cô Tô</strong>. Tươi ngon tự nhiên, bảo hành 1 đổi 1.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* AI Chef CTA */}
              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F2A900] text-[#00153d] font-bold text-base hover:bg-[#d99700] transition-colors shadow-lg shadow-black/25 active:scale-95"
              >
                <IoSparkles className="w-5 h-5 text-[#00153d]" />
                <span>Hỏi Bếp Trưởng AI Nấu Gì?</span>
              </button>

              {/* View Video Showcase CTA */}
              <a
                href="#video-showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#073372] border border-[#164082] text-white font-semibold text-base hover:bg-[#0c4494] transition-colors"
              >
                <IoPlay className="w-4 h-4 text-[#F2A900]" />
                <span>Thước Phim MAVY</span>
              </a>
            </motion.div>

            {/* Quick Trust Highlights */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-[#073372]/80 grid grid-cols-3 gap-3 text-left"
            >
              <div className="bg-[#051e48]/60 p-3 rounded-lg border border-[#073372]">
                <div className="text-xl sm:text-2xl font-extrabold text-[#F2A900]">100%</div>
                <div className="text-xs text-[#E8EEF9]/80 mt-0.5">Biển sạch tự nhiên</div>
              </div>
              <div className="bg-[#051e48]/60 p-3 rounded-lg border border-[#073372]">
                <div className="text-xl sm:text-2xl font-extrabold text-[#F2A900]">-40°C</div>
                <div className="text-xs text-[#E8EEF9]/80 mt-0.5">Cấp đông IQF tức thì</div>
              </div>
              <div className="bg-[#051e48]/60 p-3 rounded-lg border border-[#073372]">
                <div className="text-xl sm:text-2xl font-extrabold text-[#F2A900]">2 Giờ</div>
                <div className="text-xs text-[#E8EEF9]/80 mt-0.5">Giao nhanh tận bếp</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Signature 3D Floating Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Signature Showcase Container */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-square flex items-center justify-center">
              {/* Circular Ambient Aura Backdrop */}
              <div className="absolute inset-4 rounded-full bg-[#073372] border-2 border-[#164082] opacity-70 shadow-2xl" />
              <div className="absolute inset-8 rounded-full border border-[#F2A900]/30 animate-pulse" />

              {/* Main 3 Products Hero Image */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-[92%] h-[92%] flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
              >
                <Image
                  src="/assets/image/hero-3-products.png"
                  alt="Bộ 3 hải sản signature MAVY: Cua Cà Mau, Tôm Sú Biển, Mực Một Nắng"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Interactive Floating Product Badges */}
              {/* 1. Cua Cà Mau Pin */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelectProduct("cua-ca-mau")}
                className="absolute -top-2 left-4 z-20 px-3 py-1.5 rounded-lg bg-[#073372] border border-[#F2A900]/70 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 hover:bg-[#0c4494] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#F2A900]" />
                <span>Cua Cà Mau Gạch Son</span>
              </motion.button>

              {/* 2. Tôm Sú Pin */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelectProduct("tom-su-bien")}
                className="absolute bottom-4 left-2 z-20 px-3 py-1.5 rounded-lg bg-[#073372] border border-[#F2A900]/70 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 hover:bg-[#0c4494] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#F2A900]" />
                <span>Tôm Sú Biển VIP</span>
              </motion.button>

              {/* 3. Mực Một Nắng Pin */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelectProduct("muc-mot-nang")}
                className="absolute top-1/2 -right-3 z-20 px-3 py-1.5 rounded-lg bg-[#073372] border border-[#F2A900]/70 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 hover:bg-[#0c4494] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#F2A900]" />
                <span>Mực Một Nắng Cô Tô</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
