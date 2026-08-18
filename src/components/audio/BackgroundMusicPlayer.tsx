"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  IoMusicalNotes,
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
  IoPlay,
  IoPause,
} from "react-icons/io5";

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMutedByVideo, setIsMutedByVideo] = useState(false);
  const [isUserMuted, setIsUserMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth Volume Fade In / Out Helper
  const fadeVolume = (targetVolume: number, durationMs = 600, callback?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const stepMs = 50;
    const steps = durationMs / stepMs;
    const initialVolume = audioRef.current.volume;
    const volumeStep = (targetVolume - initialVolume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      currentStep++;
      const nextVolume = Math.min(1, Math.max(0, audioRef.current.volume + volumeStep));
      audioRef.current.volume = nextVolume;

      if (currentStep >= steps || Math.abs(nextVolume - targetVolume) < 0.02) {
        audioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        callback?.();
      }
    }, stepMs);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35; // Comfortable background music volume

    // 1. Initial Attempt to Autoplay
    const tryAutoplay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Browser blocked unprompted autoplay - wait for first touch/click/scroll
            setIsPlaying(false);
          });
      }
    };

    tryAutoplay();

    // 2. Unlock Autoplay on First User Interaction Anywhere on Page
    const handleFirstUserGesture = () => {
      if (!hasInteracted && audio) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          fadeVolume(0.35, 800);
        }).catch(() => {});
      }
    };

    window.addEventListener("pointerdown", handleFirstUserGesture, { once: true });
    window.addEventListener("keydown", handleFirstUserGesture, { once: true });
    window.addEventListener("scroll", handleFirstUserGesture, { once: true });

    // 3. Smart Video Auto-Mute / Pause Integration
    // When ANY video on the entire website plays, mute / pause background music
    const handleVideoPlay = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "VIDEO" && target !== audio) {
        setIsMutedByVideo(true);
        if (audio && !audio.paused) {
          fadeVolume(0, 400, () => {
            audio.pause();
          });
        }
      }
    };

    // When video pauses or finishes, resume background music
    const handleVideoPauseOrEnded = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "VIDEO" && target !== audio) {
        setIsMutedByVideo(false);
        // Only resume if user has not manually muted
        if (audio && !isUserMuted) {
          audio.play().then(() => {
            setIsPlaying(true);
            fadeVolume(0.35, 800);
          }).catch(() => {});
        }
      }
    };

    // Capture phase listeners catch all native HTML5 video events across document
    window.addEventListener("play", handleVideoPlay, true);
    window.addEventListener("pause", handleVideoPauseOrEnded, true);
    window.addEventListener("ended", handleVideoPauseOrEnded, true);

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserGesture);
      window.removeEventListener("keydown", handleFirstUserGesture);
      window.removeEventListener("scroll", handleFirstUserGesture);
      window.removeEventListener("play", handleVideoPlay, true);
      window.removeEventListener("pause", handleVideoPauseOrEnded, true);
      window.removeEventListener("ended", handleVideoPauseOrEnded, true);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [hasInteracted, isUserMuted]);

  // Toggle user playback / mute
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !isUserMuted) {
      fadeVolume(0, 300, () => {
        audio.pause();
        setIsPlaying(false);
        setIsUserMuted(true);
      });
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsUserMuted(false);
        fadeVolume(0.35, 500);
      }).catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/sound/bgm.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Floating Ambient Music Control Capsule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed bottom-6 left-6 z-40 select-none"
      >
        <div
          onClick={toggleMusic}
          className={`glass-dark-card rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 border transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer shadow-xl group ${
            isPlaying && !isMutedByVideo && !isUserMuted
              ? "border-coral/40 bg-[#00153d]/90 hover:border-coral"
              : "border-white/10 bg-[#00153d]/80 hover:border-white/20 opacity-80 hover:opacity-100"
          }`}
          title={
            isMutedByVideo
              ? "Tự động tắt tiếng khi đang phát video phóng sự"
              : isPlaying
              ? "Bấm để tạm dừng nhạc nền"
              : "Bấm để bật nhạc nền Hello Vietnam"
          }
        >
          {/* Animated Equalizer Sound Bars or Icon */}
          <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-coral shrink-0">
            {isMutedByVideo ? (
              <IoVolumeMuteOutline className="w-3.5 h-3.5 text-ink-light/50" />
            ) : isPlaying && !isUserMuted ? (
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

          {/* Typography info */}
          <div className="hidden sm:flex flex-col text-left pr-1 leading-tight">
            <span className="text-[11px] font-bold text-white group-hover:text-coral transition-colors flex items-center gap-1.5">
              <span>Nhạc Nền</span>
              {isMutedByVideo ? (
                <span className="text-[9px] font-normal text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">Tạm dừng theo video</span>
              ) : isPlaying && !isUserMuted ? (
                <span className="text-[9px] font-normal text-coral bg-coral/10 px-1.5 py-0.2 rounded">Đang phát</span>
              ) : (
                <span className="text-[9px] font-normal text-ink-light/50 bg-white/[0.04] px-1.5 py-0.2 rounded">Tắt</span>
              )}
            </span>
            <span className="text-[9px] text-ink-light/60 truncate max-w-[140px]">
              Hello Vietnam (Orchestra)
            </span>
          </div>

          {/* Icon state indicator */}
          <div className="text-ink-light/60 group-hover:text-white transition-colors">
            {isMutedByVideo ? (
              <span className="text-[10px] text-ink-light/50">Muted</span>
            ) : isPlaying && !isUserMuted ? (
              <IoVolumeHighOutline className="w-4 h-4 text-coral" />
            ) : (
              <IoVolumeMuteOutline className="w-4 h-4 text-ink-light/40" />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
