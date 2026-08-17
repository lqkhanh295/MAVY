"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { IoArrowDownOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [triggerEntranceSweep, setTriggerEntranceSweep] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Trigger single golden light sweep right as the product ascends and becomes sharp (~900ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerEntranceSweep(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Clean 3D Mouse Parallax Tilt (Without any ugly cursor blobs)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 20, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    mouseX.set((clientX / rect.width) - 0.5);
    mouseY.set((clientY / rect.height) - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typography Stagger Reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Cinematic Product Emergence Sequence
  const productRevealVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.82,
      y: 80,
      filter: "blur(16px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // Smooth luxury deceleration
        delay: 0.25,
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 md:pt-36 md:pb-24 bg-navy-950 border-b border-navy-800 overflow-hidden">
      {/* Underwater Caustic Atmosphere with Volumetric Depth */}
      <div className="absolute inset-0 caustic-ambient pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-navy-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Editorial Value Proposition */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Sourcing Tag Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900 border border-gold/40 text-xs font-semibold text-gold shadow-md backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span>Nguồn Hải Sản Tự Nhiên Tuyển Chọn Trực Tiếp Tại Bến</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.12] tracking-tight"
            >
              Hải Sản Tự Nhiên <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#FFD066] to-gold">
                Chuẩn Vị Ngọt Nguyên Bản
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-ink-light/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              MAVY tuyển chọn trực tiếp tại bến Năm Căn và Phú Quốc, cấp đông siêu tốc <strong>IQF -40°C</strong> trong 12 phút. Cam kết dây trói &lt;20g, 0% hóa chất, bảo hành 1 đổi 1 và giao nhanh trong 2 giờ.
            </motion.p>

            {/* Sourcing Trust Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-1 pb-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-ink-light/75"
            >
              <div className="flex items-center gap-1.5">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gold shrink-0" />
                <span>Xuất xứ Năm Căn & Phú Quốc</span>
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
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gold text-navy-950 font-bold text-sm hover:bg-gold-hover transition-colors shadow-lg text-center"
              >
                Khám Phá 3 Sản Phẩm Signature
              </a>

              <a
                href="#standards"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-900 text-ink-light border border-navy-800 font-semibold text-sm hover:bg-navy-800 hover:text-white transition-colors text-center"
              >
                So Sánh Với Hải Sản Chợ
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Cinematic Product Entrance & 3D Stage */}
          <div className="lg:col-span-5 relative flex flex-col items-center select-none">
            
            {/* 3D Perspective Wrapper */}
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
              {/* Dynamic Backlight Halo (Breathing Ocean Aura) */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: isHovered ? [0.6, 0.75, 0.6] : [0.35, 0.5, 0.35],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-navy-700/60 via-gold/20 to-cyan-500/15 filter blur-3xl pointer-events-none"
              />

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
                {/* Main Seafood Visual */}
                <Image
                  src="/assets/image/hero-3-products.png"
                  alt="Bộ ba hải sản thượng hạng MAVY: Cua Cà Mau, Tôm Sú Biển, Mực Một Nắng"
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
                Cua Gạch Năm Căn • Tôm Sú Phú Quốc • Mực Một Nắng
              </div>
            </div>
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
