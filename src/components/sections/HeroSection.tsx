"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IoArrowDownOutline, IoShieldCheckmarkOutline, IoSparklesOutline } from "react-icons/io5";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified Scroll Progress across the 220vh sticky canvas
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth Spring physics to eliminate mousewheel stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
    restDelta: 0.001,
  });

  // 1. Hero Brand Text Fade & Lift (0% -> 20% scroll)
  const heroOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.18], [0, -35]);
  const heroScale = useTransform(smoothProgress, [0, 0.18], [1, 0.95]);

  // 2. Product Camera Journey ("Dive Into Ocean" & Shift to Left)
  // Scale: 1.0 (Hero) -> 1.15 (Begin Dive) -> 1.35 (Peak Hero Moment) -> 1.35 (Dossier Spotlight) -> 0.85 (Transition into Grid)
  const productScale = useTransform(
    smoothProgress,
    [0, 0.18, 0.45, 0.68, 0.88, 1.0],
    [1.0, 1.15, 1.35, 1.32, 1.05, 0.82]
  );

  // Product Desktop X translation (Centers initially, shifts to Left at 45% -> 68%)
  const productX = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.68, 0.88, 1.0],
    ["0%", "0%", "0%", "-26%", "-26%", "-26%"]
  );

  const productY = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.68, 0.88, 1.0],
    ["0px", "-15px", "-25px", "0px", "0px", "45px"]
  );

  // Subtle Y-axis perspective rotation during the Hero Moment
  const productRotateY = useTransform(
    smoothProgress,
    [0.35, 0.5, 0.65],
    [0, -6, 0]
  );

  // 3. Golden Light Sweep Beam across Product (Sweeps across at 42% -> 62%)
  const lightSweepX = useTransform(smoothProgress, [0.42, 0.64], ["-160%", "260%"]);
  const lightSweepOpacity = useTransform(
    smoothProgress,
    [0.42, 0.46, 0.58, 0.64],
    [0, 0.9, 0.9, 0]
  );

  // 4. Product Spotlight Dossier Reveal on the Right (58% -> 92%)
  const dossierOpacity = useTransform(
    smoothProgress,
    [0.55, 0.68, 0.88, 0.98],
    [0, 1, 1, 0]
  );
  const dossierX = useTransform(
    smoothProgress,
    [0.55, 0.68, 0.88, 0.98],
    ["40px", "0px", "0px", "0px"]
  );

  // 5. Vertical Depth Indicator dynamic filling (0% -> 100%)
  const depthBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-navy-950">
      {/* Sticky Fullscreen Camera Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Underwater Caustic Ambient Light Background */}
        <div className="absolute inset-0 caustic-ambient pointer-events-none" />
        <div className="ocean-beam pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-navy-950 pointer-events-none" />

        {/* Right-Side Vertical Depth Progress Indicator */}
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 select-none pointer-events-none">
          <span className="text-[10px] font-mono font-bold tracking-widest text-gold/80">
            01
          </span>
          <div className="w-[2px] h-24 bg-navy-800 rounded-full relative overflow-hidden">
            <motion.div
              style={{ height: depthBarHeight }}
              className="w-full bg-gold rounded-full"
            />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-ink-light/40">
            03
          </span>
        </div>

        {/* Main Stage Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex items-center justify-center">
          
          {/* Phase 1: Initial Hero Brand & Value Proposition (Fades out smoothly on scroll) */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
              scale: heroScale,
            }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-4 pointer-events-auto"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/80 border border-navy-800 text-xs font-semibold text-gold mb-6 shadow-md backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>Nguồn Hải Sản Tự Nhiên Tuyển Chọn Trực Tiếp Tại Bến</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Hải Sản Tự Nhiên <br />
              <span className="text-gold">Chuẩn Vị Ngọt Nguyên Bản</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-ink-light/80 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
              Đánh bắt tự nhiên tại bến Năm Căn và Phú Quốc. Cấp đông siêu tốc <strong>IQF -40°C</strong> trong 12 phút, giữ trọn vị giòn ngọt nguyên bản.
            </p>

            {/* Scroll Indicator Prompt */}
            <div className="flex flex-col items-center gap-2 text-xs text-ink-light/50 pt-2">
              <span className="font-medium tracking-wider uppercase text-[11px] text-gold">Cuộn để lặn vào trải nghiệm</span>
              <IoArrowDownOutline className="w-4 h-4 text-gold animate-bounce" />
            </div>
          </motion.div>

          {/* Phase 2, 3, 5: The Centerpiece Hero Product Visual (Scroll-Driven Camera Zoom, Tilt & Shift) */}
          <motion.div
            style={{
              scale: productScale,
              x: productX,
              y: productY,
              rotateY: productRotateY,
            }}
            className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center pointer-events-none z-20"
          >
            {/* Product Photo with Rich Depth Shadow */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl">
              <Image
                src="/assets/image/hero-3-products.png"
                alt="Bộ ba hải sản thượng hạng MAVY: Cua Cà Mau, Tôm Sú Biển, Mực Một Nắng"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
                priority
                unoptimized
              />

              {/* Scroll-Driven Golden Light Sweep Beam */}
              <motion.div
                style={{
                  x: lightSweepX,
                  opacity: lightSweepOpacity,
                }}
                className="light-sweep-beam"
              />
            </div>
          </motion.div>

          {/* Phase 4: Product Spotlight Dossier (Reveals on the Right as Product Shifts to Left) */}
          <motion.div
            style={{
              opacity: dossierOpacity,
              x: dossierX,
            }}
            className="hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-full max-w-md flex-col justify-center space-y-6 z-20 pointer-events-auto"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-xs font-semibold text-gold">
                <IoSparklesOutline className="w-3.5 h-3.5" />
                <span>BỘ 3 SIGNATURE TỰ NHIÊN</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Tuyển Chọn Khắt Khe <br />
                <span className="text-gold">Từ Lòng Đại Dương</span>
              </h2>

              <p className="text-xs sm:text-sm text-ink-light/80 leading-relaxed font-normal">
                Bộ ba sản phẩm chủ lực: <strong>Cua Gạch Năm Căn</strong>, <strong>Tôm Sú Biển Phú Quốc</strong> và <strong>Mực Một Nắng Cô Tô</strong> được chọn lọc từng cá thể sống khỏe, nói không với dây trói ngâm nước.
              </p>
            </div>

            {/* Sourcing Specifications Hairline Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-navy-800/80 text-xs text-ink-light">
              <div className="space-y-1">
                <div className="font-bold text-gold flex items-center gap-1.5">
                  <IoShieldCheckmarkOutline className="w-3.5 h-3.5" />
                  <span>IQF -40°C</span>
                </div>
                <div className="text-[11px] text-ink-light/60">Cấp đông nhanh trong 12 phút</div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-gold flex items-center gap-1.5">
                  <IoShieldCheckmarkOutline className="w-3.5 h-3.5" />
                  <span>Dây Trói &lt; 20g</span>
                </div>
                <div className="text-[11px] text-ink-light/60">Không gian lận trọng lượng</div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="pt-2">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-navy-950 font-bold text-xs hover:bg-gold-hover transition-colors shadow-lg"
              >
                <span>Xem Bảng Giá & Quy Cách Chi Tiết</span>
                <IoArrowDownOutline className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
