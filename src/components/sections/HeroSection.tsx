"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll, type Variants } from "framer-motion";
import { IoArrowDownOutline, IoShieldCheckmarkOutline, IoBagCheckOutline, IoChatboxEllipsesOutline, IoStar } from "react-icons/io5";
import AnimeCounter from "@/components/ui/AnimeCounter";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------
  // 1. Scroll-Down Parallax Motion (Smoothly responds as user scrolls)
  // -------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.15,
  });

  // Parallax shifts on scroll down
  const scrollTextY = useTransform(smoothScroll, [0, 1], ["0px", "-70px"]);
  const scrollTextOpacity = useTransform(smoothScroll, [0, 0.75], [1, 0.1]);

  const scrollProductY = useTransform(smoothScroll, [0, 1], ["0px", "45px"]);
  const scrollProductScale = useTransform(smoothScroll, [0, 1], [1, 0.92]);
  const scrollProductOpacity = useTransform(smoothScroll, [0, 0.85], [1, 0.3]);

  const scrollBgY = useTransform(smoothScroll, [0, 1], ["0%", "15%"]);

  // -------------------------------------------------------------
  // 2. Clean 3D Mouse Parallax Tilt (On-Hover)
  // -------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 20, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // -------------------------------------------------------------
  // 3. Initial Entrance Stagger & Emergence Animations (On Page Load)
  // -------------------------------------------------------------
  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const productRevealVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.88,
      y: 60,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 md:pt-36 md:pb-24 bg-navy-950 border-b border-navy-800 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-navy-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline & Editorial Value Proposition (Entrance Reveal + Scroll Parallax) */}
          <motion.div
            style={{
              y: scrollTextY,
              opacity: scrollTextOpacity,
            }}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left will-change-transform"
          >
            {/* Eyebrow */}
            <motion.div variants={textItemVariants}>
              <span className="text-xs uppercase tracking-[0.2em] text-teal font-bold block">
                MAVY SEAFOOD • HẢI SẢN TỰ NHIÊN
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={textItemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight pb-2"
            >
              <span className="block leading-tight">Hải Sản Tươi Sạch</span>
              <span className="block text-teal leading-tight mt-2 sm:mt-3">
                Chuẩn Vị Ngọt Nguyên Bản
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              variants={textItemVariants}
              className="text-sm sm:text-base md:text-lg text-ink-light/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              MAVY phân phối 3 dòng hải sản chủ lực: Cua gạch Năm Căn, Tôm sú & Mực trứng đông lạnh chuẩn cấp đông siêu tốc <strong>IQF -40°C</strong>. Dây trói dưới 20g, bao ăn 1 đổi 1 và giao hỏa tốc 2 giờ tại TP.HCM.
            </motion.p>

            {/* Sourcing Trust Strip */}
            <motion.div
              variants={textItemVariants}
              className="pt-1 pb-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-ink-light/75"
            >
              <div className="flex items-center gap-1.5">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-coral shrink-0" />
                <span>Nguồn gốc Năm Căn, Cà Mau</span>
              </div>
              <span className="hidden sm:inline text-white/20 select-none">|</span>
              <div className="flex items-center gap-1.5">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-coral shrink-0" />
                <span>Cấp đông IQF -40°C</span>
              </div>
              <span className="hidden sm:inline text-white/20 select-none">|</span>
              <div className="flex items-center gap-1.5">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-coral shrink-0" />
                <span>Dây trói siêu mỏng &lt; 20g</span>
              </div>
            </motion.div>

            {/* Action Buttons (Solid Warm Accent - Not Glass) */}
            <motion.div
              variants={textItemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-coral text-navy-950 font-bold text-sm hover:bg-coral-hover transition-colors shadow text-center"
              >
                Khám Phá 3 Sản Phẩm Chủ Lực
              </a>

              <a
                href="https://zalo.me/0901325178"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.04] text-ink-light border border-white/10 font-semibold text-sm hover:bg-white/10 hover:text-white transition-colors text-center"
              >
                Zalo Đặt Hàng: 090 132 5178
              </a>
            </motion.div>

            {/* Clean Editorial Corporate Metrics */}
            <motion.div
              variants={textItemVariants}
              className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-center lg:text-left"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display">
                  <AnimeCounter targetValue={128450} suffix="+" />
                </div>
                <p className="text-xs text-ink-light/70 mt-1">Đơn hàng đã giao</p>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display">
                  <AnimeCounter targetValue={15820} suffix="+" />
                </div>
                <p className="text-xs text-ink-light/70 mt-1">Đánh giá 5 sao</p>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-coral font-display">
                  99.4%
                </div>
                <p className="text-xs text-ink-light/70 mt-1">Khách hàng hài lòng</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Cinematic Product Entrance & Scroll Parallax */}
          <div className="lg:col-span-5 relative flex flex-col items-center select-none">

            {/* Outer Parallax Container on Scroll Down */}
            <motion.div
              style={{
                y: scrollProductY,
                scale: scrollProductScale,
                opacity: scrollProductOpacity,
              }}
              className="w-full flex flex-col items-center will-change-transform"
            >
              {/* 3D Perspective Wrapper & Initial Emergence Reveal */}
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                variants={productRevealVariants}
                initial="hidden"
                animate="visible"
                style={{
                  perspective: 1200,
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center cursor-pointer group"
              >
                {/* Hydrodynamic Ocean Buoyancy Float Motion */}
                <motion.div
                  animate={{
                    y: isHovered ? 0 : [-5, 5, -5],
                    rotate: isHovered ? 0 : [-0.5, 0.5, -0.5],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Main Seafood Visual (100% Crisp & High-Res) */}
                  <Image
                    src="/assets/image/hero-3-products.png"
                    alt="Bộ ba hải sản thượng hạng MAVY: Cua Gạch, Tôm Sú Đông Lạnh, Mực Trứng Đông Lạnh"
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                </motion.div>
              </motion.div>

              {/* Minimal Editorial Caption */}
              <div className="mt-4 text-center">
                <div className="text-xs font-semibold text-gold tracking-widest uppercase">
                  Bộ Ba Signature
                </div>
                <div className="text-xs text-ink-light/60 mt-0.5">
                  Cua Gạch • Tôm Sú Đông Lạnh • Mực Trứng Đông Lạnh
                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Natural Smooth Scroll Indicator */}
        <div className="mt-16 pt-4 flex flex-col items-center justify-center">
          <a
            href="#video-showcase"
            className="group flex flex-col items-center gap-1.5 text-xs text-ink-light/50 hover:text-gold transition-colors cursor-pointer"
          >
            <span className="font-medium tracking-wide">Khám phá quy trình thực địa</span>
            <IoArrowDownOutline className="w-4 h-4 text-gold animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
