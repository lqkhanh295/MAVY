"use client";

import { useRef, useState, useEffect } from "react";
import {
  IoPlay,
  IoPause,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
  IoExpandOutline,
  IoFilmOutline,
} from "react-icons/io5";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-pause video when scrolled out of view
  useEffect(() => {
    const target = containerRef.current || videoRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the video section leaves the viewport (less than 25% visible)
          if (!entry.isIntersecting || entry.intersectionRatio < 0.25) {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section id="video-showcase" className="py-20 bg-navy-900 border-y border-navy-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-navy-950 border border-navy-800 text-xs font-semibold text-gold">
            <IoFilmOutline className="w-3.5 h-3.5" />
            <span>THƯỚC PHIM THỰC ĐỊA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight pb-2">
            <span className="block leading-tight">Quy Trình Đánh Bắt &</span>
            <span className="block text-gold leading-tight mt-2 sm:mt-3">Cấp Đông Trên Tàu</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-light/80 leading-relaxed max-w-2xl mx-auto pt-2">
            Xem thực tế quy trình kiểm định chất lượng và công nghệ cấp đông tiêu chuẩn ≤ -18°C giúp giữ trọn vẹn độ tươi giòn nguyên bản của hải sản MAVY.
          </p>
        </div>

        {/* Clean Video Player Card */}
        <div
          ref={containerRef}
          className="rounded-2xl overflow-hidden bg-navy-950 border-2 border-navy-800 shadow-xl"
        >
          {/* Main Video Element */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              poster="/assets/video/poster.jpg"
              playsInline
              preload="metadata"
              muted={isMuted}
              loop
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/assets/video/FINAL3_light.mp4" type="video/mp4" />
              Trình duyệt không hỗ trợ phát video HTML5.
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-navy-950/40 flex flex-col items-center justify-center cursor-pointer z-10 transition-opacity"
              >
                <div className="w-16 h-16 rounded-full bg-gold text-navy-950 flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 active:scale-95">
                  <IoPlay className="w-8 h-8 text-navy-950 ml-1" />
                </div>
                <span className="mt-3 text-xs font-semibold text-white bg-navy-800/90 px-3.5 py-1 rounded-full border border-navy-600">
                  Nhấn để xem phim tài liệu MAVY
                </span>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="px-6 py-3.5 bg-navy-950 border-t border-navy-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-lg bg-navy-800 text-white hover:bg-navy-700 transition-colors"
                aria-label={isPlaying ? "Tạm dừng" : "Phát"}
              >
                {isPlaying ? <IoPause className="w-4 h-4 text-gold" /> : <IoPlay className="w-4 h-4 text-gold" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-navy-800 text-white hover:bg-navy-700 transition-colors"
                aria-label={isMuted ? "Bật tiếng" : "Tắt tiếng"}
              >
                {isMuted ? <IoVolumeMuteOutline className="w-4 h-4 text-ink-light" /> : <IoVolumeHighOutline className="w-4 h-4 text-gold" />}
              </button>

              <span className="text-xs text-ink-light/80 font-medium">
                Thước Phim Tài Liệu Chuỗi Cung Ứng MAVY
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs text-gold bg-navy-900 px-3 py-1 rounded border border-navy-800">
                Chuẩn Cấp Đông ≤ -18°C
              </span>

              <button
                onClick={handleFullscreen}
                className="p-2 rounded-lg bg-navy-800 text-white hover:bg-navy-700 transition-colors"
                aria-label="Toàn màn hình"
              >
                <IoExpandOutline className="w-4 h-4 text-ink-light" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
