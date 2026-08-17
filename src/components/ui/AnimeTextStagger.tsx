"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface AnimeTextStaggerProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  delay?: number;
}

export default function AnimeTextStagger({
  text,
  highlightWords = [],
  className = "",
  delay = 200,
}: AnimeTextStaggerProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".anime-word");
    animate(words, {
      translateY: [25, 0],
      opacity: [0, 1],
      ease: "outExpo",
      duration: 1000,
      delay: stagger(60, { start: delay }),
    });
  }, [text, delay]);

  const words = text.split(" ");

  return (
    <h1 ref={containerRef} className={`${className} flex flex-wrap gap-x-2 gap-y-1`}>
      {words.map((word, idx) => {
        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span
            key={idx}
            className={`anime-word inline-block opacity-0 ${
              isHighlight ? "text-[#F2A900]" : "text-white"
            }`}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
}
