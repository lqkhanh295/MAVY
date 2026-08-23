"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
  IoPlay,
} from "react-icons/io5";

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMutedByVideo, setIsMutedByVideo] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);

  // Keep synchronous refs to prevent race conditions during async event callbacks
  const isUserPausedRef = useRef(false);
  const isMutedByVideoRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35; // Âm lượng nền dễ chịu chuẩn 35%

    // 1. Cố gắng phát tự động khi tải trang (Autoplay)
    const tryAutoplay = () => {
      if (isUserPausedRef.current) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!isUserPausedRef.current) {
              setIsPlaying(true);
            } else {
              audio.pause();
            }
          })
          .catch(() => {
            // Trình duyệt chặn autoplay chưa tương tác -> Chờ tương tác đầu tiên
            setIsPlaying(false);
          });
      }
    };

    tryAutoplay();

    // 2. Mở khóa phát nhạc ngay ở cử chỉ click/chạm đầu tiên trên trang (trừ khi user bấm nút tắt)
    const handleFirstUserGesture = (e: Event) => {
      if (isUserPausedRef.current) return;

      const target = e.target as HTMLElement;
      // Nếu click trực tiếp vào nút điều khiển nhạc thì để toggleMusic xử lý riêng
      if (target && target.closest("#bgm-toggle-btn")) return;

      if (audio && audio.paused && !isUserPausedRef.current) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("pointerdown", handleFirstUserGesture, { once: true });
    window.addEventListener("click", handleFirstUserGesture, { once: true });
    window.addEventListener("keydown", handleFirstUserGesture, { once: true });

    // 3. Tự động nhận biết khi có Video phát trên web để tạm dừng nhạc nền
    const handleVideoPlay = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "VIDEO" && target !== audio) {
        isMutedByVideoRef.current = true;
        setIsMutedByVideo(true);
        if (audio && !audio.paused) {
          audio.pause();
          setIsPlaying(false);
        }
      }
    };

    // Khi video dừng hoặc kết thúc, nếu user chưa bấm tắt thì tự bật lại nhạc nền
    const handleVideoPauseOrEnded = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "VIDEO" && target !== audio) {
        isMutedByVideoRef.current = false;
        setIsMutedByVideo(false);

        if (audio && !isUserPausedRef.current) {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {});
        }
      }
    };

    // Lắng nghe sự kiện video trên toàn bộ DOM (capture phase)
    window.addEventListener("play", handleVideoPlay, true);
    window.addEventListener("pause", handleVideoPauseOrEnded, true);
    window.addEventListener("ended", handleVideoPauseOrEnded, true);

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserGesture);
      window.removeEventListener("click", handleFirstUserGesture);
      window.removeEventListener("keydown", handleFirstUserGesture);
      window.removeEventListener("play", handleVideoPlay, true);
      window.removeEventListener("pause", handleVideoPauseOrEnded, true);
      window.removeEventListener("ended", handleVideoPauseOrEnded, true);
    };
  }, []);

  // Hàm bật/tắt dứt khoát 100% khi người dùng click
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Dừng dứt khoát ngay lập tức
      isUserPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
      setIsUserPaused(true);
    } else {
      // Bật lại
      isUserPausedRef.current = false;
      audio.muted = false;
      audio.volume = 0.35;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsUserPaused(false);
          setIsMutedByVideo(false);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Thẻ Audio HTML5 chuẩn */}
      <audio
        ref={audioRef}
        src="/assets/sound/bgm.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Nút điều khiển âm thanh nổi góc dưới bên trái */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-6 left-6 z-40 select-none"
      >
        <button
          id="bgm-toggle-btn"
          type="button"
          onClick={toggleMusic}
          className={`glass-dark-card rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 border transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer shadow-xl group outline-none ${
            isPlaying && !isMutedByVideo
              ? "border-coral/50 bg-[#00153d]/95 text-white hover:border-coral"
              : "border-white/10 bg-[#00153d]/85 text-ink-light/70 hover:border-white/20 hover:text-white"
          }`}
          title={
            isMutedByVideo
              ? "Đang tạm dừng vì video phóng sự đang phát"
              : isPlaying
              ? "Nhấn để tắt nhạc nền"
              : "Nhấn để bật nhạc nền Hello Vietnam"
          }
          aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        >
          {/* Cột sóng Equalizer động hoặc Icon Play */}
          <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-coral shrink-0">
            {isMutedByVideo ? (
              <IoVolumeMuteOutline className="w-3.5 h-3.5 text-amber-400" />
            ) : isPlaying ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-coral rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate]" style={{ height: "60%" }} />
                <span className="w-0.5 bg-coral rounded-full animate-[equalizer_1.1s_ease-in-out_infinite_alternate_0.2s]" style={{ height: "100%" }} />
                <span className="w-0.5 bg-coral rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_alternate_0.4s]" style={{ height: "75%" }} />
                <span className="w-0.5 bg-coral rounded-full animate-[equalizer_1.2s_ease-in-out_infinite_alternate_0.1s]" style={{ height: "45%" }} />
              </div>
            ) : (
              <IoPlay className="w-3 h-3 text-ink-light ml-0.5" />
            )}
          </div>

          {/* Thông tin bài nhạc */}
          <div className="hidden sm:flex flex-col text-left pr-1 leading-tight">
            <span className="text-[11px] font-bold text-white group-hover:text-coral transition-colors flex items-center gap-1.5">
              <span>Nhạc Nền</span>
              {isMutedByVideo ? (
                <span className="text-[9px] font-normal text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">Tạm dừng theo video</span>
              ) : isPlaying ? (
                <span className="text-[9px] font-normal text-coral bg-coral/10 px-1.5 py-0.2 rounded">Đang phát</span>
              ) : (
                <span className="text-[9px] font-normal text-ink-light/50 bg-white/[0.04] px-1.5 py-0.2 rounded">Đã tắt</span>
              )}
            </span>
            <span className="text-[9px] text-ink-light/60 truncate max-w-[140px]">
              Hello Vietnam (Orchestra)
            </span>
          </div>

          {/* Biểu tượng trạng thái loa */}
          <div className="text-ink-light/60 group-hover:text-white transition-colors">
            {isMutedByVideo ? (
              <span className="text-[10px] text-amber-400 font-medium">Tạm dừng</span>
            ) : isPlaying ? (
              <IoVolumeHighOutline className="w-4 h-4 text-coral" />
            ) : (
              <IoVolumeMuteOutline className="w-4 h-4 text-ink-light/40" />
            )}
          </div>
        </button>
      </motion.div>
    </>
  );
}
