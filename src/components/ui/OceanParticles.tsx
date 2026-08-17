"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, random } from "animejs";

export default function OceanParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create small glowing particle elements
    const particlesCount = 18;
    const container = containerRef.current;
    container.innerHTML = "";

    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div");
      const isGold = i % 3 === 0;
      const size = isGold ? Math.random() * 6 + 4 : Math.random() * 8 + 6;

      particle.className = "absolute rounded-full pointer-events-none";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 95}%`;
      particle.style.top = `${Math.random() * 90 + 10}%`;
      particle.style.backgroundColor = isGold ? "#F2A900" : "#164082";
      particle.style.opacity = isGold ? "0.4" : "0.3";
      particle.style.filter = `blur(${isGold ? 1 : 2}px)`;

      container.appendChild(particle);
    }

    // Anime.js v4 organic floating movement
    animate(container.children, {
      translateY: () => random(-60, -140),
      translateX: () => random(-30, 30),
      scale: [
        { to: 1.2, duration: 2000, ease: "inOutQuad" },
        { to: 0.8, duration: 2500, ease: "inOutQuad" },
      ],
      opacity: [
        { to: 0.7, duration: 1500 },
        { to: 0.1, duration: 2000 },
      ],
      delay: stagger(200),
      duration: () => random(4000, 7000),
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
}
