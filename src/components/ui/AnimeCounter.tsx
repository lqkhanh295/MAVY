"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface AnimeCounterProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimeCounter({ targetValue, prefix = "", suffix = "", decimals = 0 }: AnimeCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const obj = { val: 0 };
          animate(obj, {
            val: targetValue,
            duration: 2200,
            ease: "outExpo",
            onUpdate: () => {
              if (el) {
                const formatted = decimals > 0
                  ? obj.val.toFixed(decimals)
                  : Math.round(obj.val).toLocaleString("vi-VN");
                el.innerText = `${prefix}${formatted}${suffix}`;
              }
            },
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetValue, prefix, suffix, decimals]);

  return <span ref={countRef}>{prefix}0{suffix}</span>;
}
