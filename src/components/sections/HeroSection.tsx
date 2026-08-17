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

  // 1. Initial Hero Left Column Text Fade & Lift (0% -> 22% scroll)
  const heroOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.18], [0, -35]);

  // 2. Product Camera Journey ("Dive Into Ocean" & Center-to-Left Shift)
  // On desktop: Starts in right column (offset), centers during dive, shifts left for dossier, settles into collection
  const productScale = useTransform(
    smoothProgress,
    [0, 0.18, 0.45, 0.68, 0.88, 1.0],
    [1.0, 1.18, 1.35, 1.3, 1.05, 0.82]
  );

  // Desktop X Translation: Starts in right column, moves to center (0%), then left (-26%)
  const productX = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.68, 0.88, 1.0],
    ["25%", "0%", "0%", "-26%", "-26%", "-26%"]
  );

  const productY = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.68, 0.88, 1.0],
    ["0px", "-10px", "-20px", "0px", "0px", "40px"]
  );

  // Subtle Y-axis perspective rotation during the Hero Moment
  const productRotateY = useTransform(
    smoothProgress,
    [0.35, 0.5, 0.65],
    [0, -6, 0]
  );

  // 3. Golden Light Sweep Beam across Product (Sweeps across at 42% -> 64%)
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex items-center">
          
          {/* Phase 1: Initial Hero Left Column Brand & Value Proposition (Clear, Spacious, Zero Overlap) */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
            }}
            className="w-full lg:w-7/12 space-y-6 text-center lg:text-left z-20 pointer-events-auto pr-0 lg:pr-8"
          >
            {/* Tag Badge */}
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-navy-800 text-xs font-semibold text-gold shadow-md backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span>Nguồn Hải Sản Tự Nhiên Tuyển Chọn Trực Tiếp Tại Bến</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.12] tracking-tight">
              Hải Sản Tự Nhiên <br />
              <span className="text-gold">Chuẩn Vị Ngọt Nguyên Bản</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-ink-light/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Đánh bắt tự nhiên tại bến Năm Căn và Phú Quốc. Cấp đông siêu tốc <strong>IQF -40°C</strong> trong 12 phút, giữ trọn vị giòn ngọt nguyên bản.
            </p>

            {/* Sourcing Feature Strip */}
            <div className="pt-1 pb-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-ink-light/70">
              <div className="flex items-center gap-1.5">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span>Năm Căn & Phú Quốc</span>
              </div>
              <span className="hidden sm:inline text-navy-800 select-none">|</span>
              <div className="flex items-center gap-1.5">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span>Cấp đông IQF -40°C</span>
              </div>
              <span className="hidden sm:inline text-navy-800 select-none">|</span>
              <div className="flex items-center gap-1.5">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span>Dây trói &lt; 20g</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold text-navy-950 font-bold text-sm hover:bg-gold-hover transition-colors shadow-lg text-center"
              >
                Khám Phá 3 Sản Phẩm Signature
              </a>

              <a
                href="#standards"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-900 text-ink-light border border-navy-800 font-semibold text-sm hover:bg-navy-800 hover:text-white transition-colors text-center"
              >
                So Sánh Với Hải Sản Chợ
              </a>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-ink-light/50">
              <span className="font-medium tracking-wider uppercase text-[11px] text-gold/80">Cuộn để lặn vào trải nghiệm</span>
              <IoArrowDownOutline className="w-3.5 h-3.5 text-gold animate-bounce" />
            </div>
          </motion.div>

          {/* Phase 2, 3, 5: The Centerpiece Hero Product Visual (Camera Zoom, Tilt & Shift on Scroll) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              style={{
                scale: productScale,
                x: productX,
                y: productY,
                rotateY: productRotateY,
              }}
              className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] flex items-center justify-center z-10"
            >
              {/* Product Photo with Soft Rich Depth Shadow */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl">
                <Image
                  src="/assets/image/hero-3-products.png"
                  alt="Bộ ba hải sản thượng hạng MAVY: Cua Cà Mau, Tôm Sú Biển, Mực Một Nắng"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
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
          </div>

          {/* Phase 4: Product Spotlight Dossier (Reveals on the Right as Product Shifts to Left on Scroll) */}
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
