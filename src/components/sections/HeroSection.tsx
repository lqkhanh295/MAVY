"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IoArrowDownOutline, IoShieldCheckmarkOutline, IoSparklesOutline } from "react-icons/io5";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified Scroll Controller across the 300vh sticky canvas
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

  // -------------------------------------------------------------
  // Phase 01: Hero Introduction (0 -> 0.15)
  // -------------------------------------------------------------
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -35]);

  // -------------------------------------------------------------
  // Phase 02, 06, 08: Product Scaling & Positioning
  // -------------------------------------------------------------
  // Scale: 0.92 (Intro) -> 1.0 -> 1.18 (Phase 2 Zoom) -> 1.18 (Phase 3-5 Ice) -> 1.05 (Phase 6 Reveal) -> 1.05 (Dossier) -> 0.75 (Phase 8 Next)
  const productScale = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.65, 0.75, 0.85, 0.95, 1.0],
    [0.92, 1.0, 1.18, 1.18, 1.18, 1.05, 1.05, 0.75]
  );

  // Desktop Translation: Right column at 0, Centered (0%) for Ice & Reveal, Left (-28%) for Dossier
  const productX = useTransform(
    smoothProgress,
    [0, 0.15, 0.82, 0.92, 1.0],
    ["28%", "0%", "0%", "-28%", "-28%"]
  );

  const productY = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.85, 0.95, 1.0],
    ["30px", "0px", "-10px", "0px", "0px", "40px"]
  );

  // -------------------------------------------------------------
  // Phase 03: Ice Formation (0.35 -> 0.50)
  // -------------------------------------------------------------
  const iceOpacity = useTransform(
    smoothProgress,
    [0.35, 0.48, 0.66, 0.75],
    [0, 1, 1, 0]
  );
  const iceScale = useTransform(smoothProgress, [0.35, 0.48], [0.85, 1.0]);

  // -------------------------------------------------------------
  // Phase 04: Ice Crack Vector Growth (0.50 -> 0.65)
  // -------------------------------------------------------------
  const crackPathLength = useTransform(smoothProgress, [0.50, 0.65], [0, 1]);
  const crackOpacity = useTransform(
    smoothProgress,
    [0.48, 0.52, 0.65, 0.72],
    [0, 1, 1, 0]
  );

  // -------------------------------------------------------------
  // Phase 05: Ice Separation Motion (0.65 -> 0.75)
  // "ICE moves, PRODUCT stays"
  // -------------------------------------------------------------
  const iceLeftX = useTransform(smoothProgress, [0.65, 0.75], ["0%", "-35vw"]);
  const iceLeftRotate = useTransform(smoothProgress, [0.65, 0.75], [0, -8]);

  const iceRightX = useTransform(smoothProgress, [0.65, 0.75], ["0%", "35vw"]);
  const iceRightRotate = useTransform(smoothProgress, [0.65, 0.75], [0, 8]);

  const iceTopY = useTransform(smoothProgress, [0.65, 0.75], ["0%", "-25vh"]);
  const iceBottomY = useTransform(smoothProgress, [0.65, 0.75], ["0%", "25vh"]);

  // -------------------------------------------------------------
  // Phase 06: Product Reveal Golden Light Sweep (0.75 -> 0.85)
  // -------------------------------------------------------------
  const lightSweepX = useTransform(smoothProgress, [0.75, 0.85], ["-180%", "280%"]);
  const lightSweepOpacity = useTransform(
    smoothProgress,
    [0.75, 0.78, 0.83, 0.85],
    [0, 0.95, 0.95, 0]
  );

  // -------------------------------------------------------------
  // Phase 07: Product Information Dossier (0.85 -> 0.95)
  // -------------------------------------------------------------
  const dossierOpacity = useTransform(
    smoothProgress,
    [0.85, 0.92, 0.97, 1.0],
    [0, 1, 1, 0]
  );
  const dossierX = useTransform(
    smoothProgress,
    [0.85, 0.92, 0.97, 1.0],
    ["50px", "0px", "0px", "0px"]
  );

  // Vertical Depth Indicator
  const depthBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-navy-950">
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
          
          {/* Phase 01: Initial Hero Brand Typography (0 -> 0.15) */}
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

            {/* Scroll Prompt */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-ink-light/60">
              <span className="font-bold tracking-widest uppercase text-[11px] text-gold">Cuộn để giải phóng độ tươi nguyên bản</span>
              <IoArrowDownOutline className="w-4 h-4 text-gold animate-bounce" />
            </div>
          </motion.div>

          {/* Centerpiece Hero Product Visual + Ice Layer Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              style={{
                scale: productScale,
                x: productX,
                y: productY,
              }}
              className="relative w-[520px] sm:w-[620px] lg:w-[740px] xl:w-[840px] aspect-[4/3] flex items-center justify-center z-10"
            >
              {/* Radiant Ambient Spotlight Halo behind Seafood */}
              <div className="product-halo-ambient" />

              {/* Product Photo */}
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

                {/* Phase 06: Golden Light Sweep Shimmer Beam */}
                <motion.div
                  style={{
                    x: lightSweepX,
                    opacity: lightSweepOpacity,
                  }}
                  className="light-sweep-beam"
                />

                {/* ------------------------------------------------------------- */}
                {/* Phases 03, 04, 05: The Physical 4-Quadrant Frosted Ice Layers */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                  style={{
                    opacity: iceOpacity,
                    scale: iceScale,
                  }}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  {/* Ice Top Quadrant */}
                  <motion.div
                    style={{ y: iceTopY }}
                    className="absolute top-0 left-0 right-0 h-1/2 frost-ice-panel rounded-t-3xl [clip-path:polygon(0_0,100%_0,100%_80%,65%_100%,40%_85%,0_95%)]"
                  />

                  {/* Ice Bottom Quadrant */}
                  <motion.div
                    style={{ y: iceBottomY }}
                    className="absolute bottom-0 left-0 right-0 h-1/2 frost-ice-panel rounded-b-3xl [clip-path:polygon(0_20%,40%_0%,65%_15%,100%_5%,100%_100%,0_100%)]"
                  />

                  {/* Ice Left Quadrant */}
                  <motion.div
                    style={{ x: iceLeftX, rotate: iceLeftRotate }}
                    className="absolute top-0 bottom-0 left-0 w-1/2 frost-ice-panel rounded-l-3xl [clip-path:polygon(0_0,85%_0,100%_45%,80%_75%,95%_100%,0_100%)]"
                  />

                  {/* Ice Right Quadrant */}
                  <motion.div
                    style={{ x: iceRightX, rotate: iceRightRotate }}
                    className="absolute top-0 bottom-0 right-0 w-1/2 frost-ice-panel rounded-r-3xl [clip-path:polygon(15%_0,100%_0,100%_100%,5%_100%,20%_75%,0%_45%)]"
                  />

                  {/* Phase 04: Crystalline Ice Crack Vector Network */}
                  <motion.svg
                    style={{ opacity: crackOpacity }}
                    viewBox="0 0 800 600"
                    fill="none"
                    className="absolute inset-0 w-full h-full z-30"
                  >
                    {/* Primary Nexus Fracture Lines */}
                    <motion.path
                      d="M 400 300 L 260 140 L 180 90 M 400 300 L 540 160 L 680 80 M 400 300 L 410 80 M 400 300 L 320 450 L 220 540 M 400 300 L 520 440 L 640 520 M 400 300 L 620 310 L 760 290 M 400 300 L 160 310 L 40 330"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ pathLength: crackPathLength }}
                      className="filter drop-shadow-[0_0_8px_rgba(220,235,250,0.9)]"
                    />

                    {/* Secondary Branching Micro-Fractures */}
                    <motion.path
                      d="M 260 140 L 310 110 M 540 160 L 590 190 M 320 450 L 370 490 M 520 440 L 490 490 M 160 310 L 190 260 M 620 310 L 650 360"
                      stroke="#DCEBFA"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ pathLength: crackPathLength }}
                      className="filter drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                    />
                  </motion.svg>
                </motion.div>

              </div>
            </motion.div>
          </div>

          {/* Phase 07: Product Information Dossier (Grand Editorial Showcase on the Right) */}
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
                Giải Phóng Vị Ngọt <br />
                <span className="text-gold">Nguyên Bản Từ Băng Lạnh</span>
              </h2>

              <p className="text-xs sm:text-sm text-ink-light/85 leading-relaxed font-normal">
                Công nghệ cấp đông siêu tốc <strong>IQF -40°C</strong> khoá chặt từng tinh thể nước ngọt trong thịt tôm, cua và mực ngay khi vừa rời bến.
              </p>
            </div>

            {/* Sourcing Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-navy-800 text-xs text-ink-light">
              <div className="space-y-1.5">
                <div className="font-extrabold text-gold text-sm flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="w-4 h-4" />
                  <span>IQF -40°C</span>
                </div>
                <div className="text-xs text-ink-light/70 leading-snug">Khoá độ tươi trong 12 phút</div>
              </div>

              <div className="space-y-1.5">
                <div className="font-extrabold text-gold text-sm flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                  <span>Dây Trói &lt; 20g</span>
                </div>
                <div className="text-xs text-ink-light/70 leading-snug">Trọng lượng thật 100%</div>
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
