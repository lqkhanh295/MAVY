"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IoArrowDownOutline, IoShieldCheckmarkOutline, IoSparklesOutline } from "react-icons/io5";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified Scroll Progress across the 240vh sticky canvas
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth Spring physics with tuned damping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.25,
    restDelta: 0.001,
  });

  // 1. Initial Hero Left Column Brand & Value Proposition (0% -> 20% scroll)
  const heroOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.18], [0, -40]);

  // 2. Product Camera Journey ("Dive Into Ocean" & Center-to-Left Shift)
  // Scale: 1.0 (Hero) -> 1.45 (Monumental Dive) -> 1.35 (Dossier Spotlight) -> 0.85 (Transition into Grid)
  const productScale = useTransform(
    smoothProgress,
    [0, 0.18, 0.45, 0.68, 0.88, 1.0],
    [1.0, 1.22, 1.45, 1.35, 1.05, 0.8]
  );

  // Desktop X Translation: Starts in right column (32%), moves to center (0%), then left (-28%)
  const productX = useTransform(
    smoothProgress,
    [0, 0.22, 0.45, 0.68, 0.88, 1.0],
    ["30%", "0%", "0%", "-28%", "-28%", "-28%"]
  );

  const productY = useTransform(
    smoothProgress,
    [0, 0.22, 0.45, 0.68, 0.88, 1.0],
    ["0px", "-15px", "-30px", "0px", "0px", "50px"]
  );

  // 3D Perspective Rotation during the Hero Moment
  const productRotateY = useTransform(
    smoothProgress,
    [0.35, 0.5, 0.65],
    [0, -8, 0]
  );

  const productRotateX = useTransform(
    smoothProgress,
    [0.35, 0.5, 0.65],
    [0, 4, 0]
  );

  // 3. Golden Light Sweep Beam across Product (Sweeps across at 42% -> 65%)
  const lightSweepX = useTransform(smoothProgress, [0.42, 0.65], ["-180%", "280%"]);
  const lightSweepOpacity = useTransform(
    smoothProgress,
    [0.42, 0.46, 0.58, 0.65],
    [0, 1, 1, 0]
  );

  // 4. Product Spotlight Dossier Reveal on the Right (58% -> 92%)
  const dossierOpacity = useTransform(
    smoothProgress,
    [0.56, 0.68, 0.88, 0.98],
    [0, 1, 1, 0]
  );
  const dossierX = useTransform(
    smoothProgress,
    [0.56, 0.68, 0.88, 0.98],
    ["50px", "0px", "0px", "0px"]
  );

  // 5. Vertical Depth Indicator dynamic filling (0% -> 100%)
  const depthBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[240vh] bg-navy-950">
      {/* Sticky Fullscreen Camera Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Volumetric Sunlight & Underwater Caustic Atmosphere */}
        <div className="absolute inset-0 caustic-ambient pointer-events-none" />
        <div className="ocean-beam pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-navy-950 pointer-events-none" />

        {/* Right-Side Vertical Depth Progress Indicator */}
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 select-none pointer-events-none">
          <span className="text-[10px] font-mono font-bold tracking-widest text-gold/90">
            01
          </span>
          <div className="w-[2px] h-28 bg-navy-800 rounded-full relative overflow-hidden">
            <motion.div
              style={{ height: depthBarHeight }}
              className="w-full bg-gold rounded-full shadow-[0_0_8px_rgba(242,169,0,0.8)]"
            />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-ink-light/40">
            03
          </span>
        </div>

        {/* Main Stage Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex items-center">
          
          {/* Phase 1: Initial Hero Left Column Brand & Value Proposition (Clear, High-Impact) */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
            }}
            className="w-full lg:w-6/12 space-y-7 text-center lg:text-left z-20 pointer-events-auto pr-0 lg:pr-6"
          >
            {/* Tag Badge */}
            <div className="inline-block">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-900/90 border border-gold/40 text-xs font-semibold text-gold shadow-lg backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                <span>Nguồn Hải Sản Tự Nhiên Tuyển Chọn Trực Tiếp Tại Bến</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight">
              Hải Sản Tự Nhiên <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#FFD066] to-gold">
                Chuẩn Vị Ngọt Nguyên Bản
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-ink-light/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Đánh bắt tự nhiên tại bến Năm Căn và Phú Quốc. Cấp đông siêu tốc <strong>IQF -40°C</strong> trong 12 phút, bảo toàn 99% màng tế bào và độ giòn ngọt mọng nước.
            </p>

            {/* Sourcing Feature Strip */}
            <div className="pt-1 pb-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-ink-light/80">
              <div className="flex items-center gap-2">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span className="font-medium">Năm Căn & Phú Quốc</span>
              </div>
              <span className="hidden sm:inline text-navy-800 select-none">|</span>
              <div className="flex items-center gap-2">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span className="font-medium">Cấp đông IQF -40°C</span>
              </div>
              <span className="hidden sm:inline text-navy-800 select-none">|</span>
              <div className="flex items-center gap-2">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span className="font-medium">Dây trói &lt; 20g</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold text-navy-950 font-extrabold text-sm hover:bg-gold-hover transition-all duration-200 shadow-[0_4px_20px_rgba(242,169,0,0.35)] text-center hover:scale-105"
              >
                Khám Phá 3 Sản Phẩm Signature
              </a>

              <a
                href="#standards"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-navy-900/90 text-ink-light border border-navy-700 font-semibold text-sm hover:bg-navy-800 hover:text-white transition-all text-center"
              >
                So Sánh Với Hải Sản Chợ
              </a>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-ink-light/60">
              <span className="font-bold tracking-widest uppercase text-[11px] text-gold">Cuộn để lặn vào trải nghiệm</span>
              <IoArrowDownOutline className="w-4 h-4 text-gold animate-bounce" />
            </div>
          </motion.div>

          {/* Phase 2, 3, 5: The Monumental Hero Product Visual (Massive 750px Scale + 3D Tilt + Halo) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              style={{
                scale: productScale,
                x: productX,
                y: productY,
                rotateY: productRotateY,
                rotateX: productRotateX,
              }}
              className="relative w-[520px] sm:w-[620px] lg:w-[740px] xl:w-[840px] aspect-[4/3] flex items-center justify-center z-10"
            >
              {/* Radiant Ambient Spotlight Halo behind Seafood */}
              <div className="product-halo-ambient" />

              {/* Product Photo with Dramatic Drop Shadow */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl z-10">
                <Image
                  src="/assets/image/hero-3-products.png"
                  alt="Bộ ba hải sản thượng hạng MAVY: Cua Cà Mau, Tôm Sú Biển, Mực Một Nắng"
                  fill
                  sizes="(max-width: 1024px) 100vw, 840px"
                  className="object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                  priority
                  unoptimized
                />

                {/* Scroll-Driven Golden Light Sweep Shimmer Beam */}
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

          {/* Phase 4: Product Spotlight Dossier (Grand Editorial Showcase on the Right) */}
          <motion.div
            style={{
              opacity: dossierOpacity,
              x: dossierX,
            }}
            className="hidden md:flex absolute right-4 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 w-full max-w-lg flex-col justify-center space-y-7 z-20 pointer-events-auto p-8 rounded-3xl bg-navy-950/80 border border-navy-700/80 backdrop-blur-xl shadow-2xl"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold/40 text-xs font-semibold text-gold">
                <IoSparklesOutline className="w-4 h-4" />
                <span>BỘ 3 SIGNATURE TỰ NHIÊN</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Tuyển Chọn Khắt Khe <br />
                <span className="text-gold">Từ Lòng Đại Dương</span>
              </h2>

              <p className="text-xs sm:text-sm text-ink-light/85 leading-relaxed font-normal">
                Bộ ba sản phẩm chủ lực: <strong>Cua Gạch Năm Căn</strong>, <strong>Tôm Sú Biển Phú Quốc</strong> và <strong>Mực Một Nắng Cô Tô</strong> được chọn lọc từng cá thể sống khỏe, nói không với hóa chất và dây trói ngâm nước.
              </p>
            </div>

            {/* Sourcing Specifications Hairline Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-navy-800 text-xs text-ink-light">
              <div className="space-y-1.5">
                <div className="font-extrabold text-gold text-sm flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="w-4 h-4" />
                  <span>IQF -40°C</span>
                </div>
                <div className="text-xs text-ink-light/70 leading-snug">Cấp đông siêu tốc trong 12 phút</div>
              </div>

              <div className="space-y-1.5">
                <div className="font-extrabold text-gold text-sm flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="w-4 h-4" />
                  <span>Dây Trói &lt; 20g</span>
                </div>
                <div className="text-xs text-ink-light/70 leading-snug">Không gian lận trọng lượng</div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="pt-2">
              <a
                href="#products"
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gold text-navy-950 font-bold text-xs hover:bg-gold-hover transition-colors shadow-lg"
              >
                <span>Xem Bảng Giá & Quy Cách Chi Tiết</span>
                <IoArrowDownOutline className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
