import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "portfolio-hero-photo-position";
const DEFAULT_POSITION = { x: 50, y: 50 };
const DEFAULT_SCALE = 1;

type SavedPhoto = { x: number; y: number; scale?: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Shared hook to read/write photo position and scale from localStorage.
 * Works in both dev and production - reads saved values on mount, saves when updated.
 */
export function usePhotoPosition() {
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [mounted, setMounted] = useState(false);

  // On mount: read saved position/scale from localStorage (dev or prod)
  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedPhoto;
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          setPosition({
            x: clamp(parsed.x, 0, 100),
            y: clamp(parsed.y, 0, 100),
          });
        }
        if (typeof parsed.scale === "number") {
          setScale(clamp(parsed.scale, 1, 2.5));
        }
      }
    } catch {
      // ignore, use defaults
    }
  }, []);

  // Save to localStorage whenever position or scale changes (after mounted)
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...position, scale }));
    } catch {
      // ignore
    }
  }, [mounted, position, scale]);

  // Manual save function (for explicit saves, e.g. in dev mode after drag)
  const savePosition = useCallback(
    (pos: { x: number; y: number }, s: number) => {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...pos, scale: s }));
      } catch {
        // ignore
      }
    },
    []
  );

  return {
    position,
    setPosition,
    scale,
    setScale,
    mounted,
    savePosition,
    positionString: `${position.x}% ${position.y}%`,
  };
}
