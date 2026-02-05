"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { usePhotoPosition } from "@/hooks/usePhotoPosition";

const HOLD_DURATION_MS = 2000;
const VIBRATE_INTERVAL_MS = 500;
const VIBRATE_PULSE_MS = 30;

function useVibrate() {
  const vibrate = useCallback((pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(pattern);
    }
  }, []);
  return vibrate;
}

type IntroGateProps = {
  children: React.ReactNode;
};

export default function IntroGate({ children }: IntroGateProps) {
  const { positionString, scale, mounted: photoMounted } = usePhotoPosition();
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const lastVibrateRef = useRef<number>(0);
  const vibrate = useVibrate();

  // On mount: only set mounted so we don't flash gate during SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const unlock = useCallback(() => {
    setIsPressing(false);
    setProgress(0);
    setUnlocked(true);
    vibrate(200);
  }, [vibrate]);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const p = Math.min(1, elapsed / HOLD_DURATION_MS);
    setProgress(p);

    // Vibration during hold (every VIBRATE_INTERVAL_MS)
    if (elapsed - lastVibrateRef.current >= VIBRATE_INTERVAL_MS) {
      lastVibrateRef.current = elapsed;
      vibrate(VIBRATE_PULSE_MS);
    }

    if (p >= 1) {
      unlock();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [unlock, vibrate]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      if (unlocked) return;
      startTimeRef.current = Date.now();
      lastVibrateRef.current = 0;
      setIsPressing(true);
      setProgress(0);
      e.currentTarget.setPointerCapture(e.pointerId);
      rafRef.current = requestAnimationFrame(tick);
    },
    [unlocked, tick]
  );

  const cancelHold = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    setIsPressing(false);
    setProgress(0);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      if (unlocked) return;
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      cancelHold();
    },
    [unlocked, cancelHold]
  );

  const handlePointerLeave = useCallback(
    () => {
      if (unlocked) return;
      cancelHold();
    },
    [unlocked, cancelHold]
  );

  const handlePointerCancel = useCallback(
    () => {
      if (unlocked) return;
      cancelHold();
    },
    [unlocked, cancelHold]
  );

  const handleSkip = useCallback(() => {
    setUnlocked(true);
  }, []);

  // SSR: show full content so no flash of gate then switch
  if (!mounted) {
    return <>{children}</>;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  // Gate view: only avatar + progress ring + hint
  const avatarSize = 200;
  const stroke = 6;
  const ringGap = 8;
  const ringSize = avatarSize + ringGap * 2 + stroke * 2;
  const ringCenter = ringSize / 2;
  const ringR = ringCenter - stroke / 2 - ringGap;
  const circumference = 2 * Math.PI * ringR;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-neutral-900 px-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 text-center max-w-[260px]">
       Hold the avatar to learn more about me.
      </p>

      <div
        className="relative select-none touch-manipulation flex items-center justify-center cursor-pointer"
        style={{ width: ringSize, height: ringSize }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
        onContextMenu={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        aria-label="长按 3 秒展开介绍"
      >
        {/* Progress ring (around avatar) */}
        <svg
          width={ringSize}
          height={ringSize}
          className="absolute inset-0 pointer-events-none transition-opacity duration-150"
          style={{ opacity: isPressing ? 1 : 0 }}
          aria-hidden
        >
          <circle
            cx={ringCenter}
            cy={ringCenter}
            r={ringR}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-neutral-200 dark:text-neutral-700"
          />
          <circle
            cx={ringCenter}
            cy={ringCenter}
            r={ringR}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="text-neutral-600 dark:text-neutral-300 transition-none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              transform: `rotate(-90deg)`,
              transformOrigin: `${ringCenter}px ${ringCenter}px`,
            }}
          />
        </svg>

        {/* Avatar */}
        <div
          className="relative rounded-full overflow-hidden border-4 border-neutral-200 dark:border-neutral-600 shadow-xl animate__animated animate__fadeIn animate__slower"
          style={{ 
            width: avatarSize, 
            height: avatarSize,
            "--animate-duration": "1s"
          } as React.CSSProperties & { "--animate-duration": string }}
        >
          <Image
            src="/photo.png"
            alt="Feiyang Chen"
            fill
            sizes="200px"
            className="object-cover pointer-events-none"
            style={{
              objectPosition: photoMounted ? positionString : "50% 50%",
              transform: photoMounted ? `scale(${scale})` : "scale(1)",
              transformOrigin: photoMounted ? positionString : "50% 50%",
            }}
            priority
            draggable={false}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="mt-8 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 underline underline-offset-2 transition-colors touch-manipulation min-h-[44px]"
      >
        Skip
      </button>
    </div>
  );
}
