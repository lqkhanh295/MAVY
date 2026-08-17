"use client";

import { useRef, useState } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasError(false);
            })
            .catch((err) => {
              console.warn("Video play caught safely:", err);
              setIsPlaying(false);
            });
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
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  return (
    <section id="video-showcase" className="py-20 bg-[#051e48] border-y border-[#073372] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#073372]/50 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073372] border border-[#164082] text-xs font-semibold text-[#F2A900]">
            <IoFilmOutline className="w-3.5 h-3.5" />
            <span>Thước Phim Tài Liệu Thương Hiệu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Hành Trình Tinh Hoa Từ <span className="text-[#F2A900]">Biển Khơi Đến Bàn Ăn</span>
          </h2>
          <p className="text-sm sm:text-base text-[#E8EEF9]/80">
            Khám phá quy trình đánh bắt nghiêm ngặt, chọn lọc khắt khe và công nghệ cấp đông IQF -40°C giúp hải sản MAVY giữ trọn hương vị tươi giòn nguyên bản.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative rounded-2xl overflow-hidden bg-[#00153d] border-2 border-[#073372] shadow-2xl group">
          {/* Main Video */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              poster="/assets/video/poster.jpg"
              playsInline
              preload="auto"
              muted={isMuted}
              loop
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={(e) => {
                console.warn("Video element load notice handled gracefully");
              }}
            >
              <source src="/assets/video/FINAL3_light.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ phát video HTML5.
            </video>

            {/* Overlay Play Button when Paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-[#00153d]/50 flex flex-col items-center justify-center cursor-pointer transition-opacity z-20"
              >
                <div className="w-20 h-20 rounded-full bg-[#F2A900] text-[#00153d] flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110 active:scale-95">
                  <IoPlay className="w-9 h-9 text-[#00153d] ml-1" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white tracking-wide uppercase bg-[#073372]/80 px-4 py-1.5 rounded-full border border-[#164082]">
                  Nhấn để xem thước phim MAVY
                </p>
              </div>
            )}
          </div>

          {/* Video Control Bar */}
          <div className="px-6 py-4 bg-[#00153d] border-t border-[#073372] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-lg bg-[#073372] text-white hover:bg-[#0c4494] transition-colors"
                aria-label={isPlaying ? "Tạm dừng" : "Phát"}
              >
                {isPlaying ? <IoPause className="w-5 h-5 text-[#F2A900]" /> : <IoPlay className="w-5 h-5 text-[#F2A900]" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-lg bg-[#073372] text-white hover:bg-[#0c4494] transition-colors"
                aria-label={isMuted ? "Bật tiếng" : "Tắt tiếng"}
              >
                {isMuted ? <IoVolumeMuteOutline className="w-5 h-5 text-[#E8EEF9]" /> : <IoVolumeHighOutline className="w-5 h-5 text-[#F2A900]" />}
              </button>

              <span className="text-xs sm:text-sm text-[#E8EEF9]/80 font-medium">
                MAVY SEAFOOD • Official Brand Film
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs text-[#F2A900] bg-[#073372] px-3 py-1 rounded-md border border-[#164082]">
                Full HD 1080p • Chuẩn IQF -40°C
              </span>

              <button
                onClick={handleFullscreen}
                className="p-2.5 rounded-lg bg-[#073372] text-white hover:bg-[#0c4494] transition-colors"
                aria-label="Toàn màn hình"
              >
                <IoExpandOutline className="w-5 h-5 text-[#E8EEF9]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
