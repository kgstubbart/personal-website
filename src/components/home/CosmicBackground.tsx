import { useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeContext";
import styles from "./CosmicBackground.module.css";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftSpeed: number;
  tint: string;
};

// Dark mode reads as a real night sky: dense, with a little color variety.
const DARK_DENSITY = 0.00034;
const DARK_MAX_STARS = 780;
const DARK_TINTS = ["255,255,255", "255,255,255", "255,255,255", "214,224,255", "255,238,214"];

// Light mode reads as first light — a handful of stars still visible, not a field.
const LIGHT_DENSITY = 0.00009;
const LIGHT_MAX_STARS = 190;
const LIGHT_TINTS = ["64,70,110"];

function createStars(width: number, height: number, theme: "light" | "dark"): Star[] {
  const density = theme === "dark" ? DARK_DENSITY : LIGHT_DENSITY;
  const maxStars = theme === "dark" ? DARK_MAX_STARS : LIGHT_MAX_STARS;
  const tints = theme === "dark" ? DARK_TINTS : LIGHT_TINTS;
  const count = Math.min(maxStars, Math.round(width * height * density));
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const big = Math.random() > 0.88;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: big ? Math.random() * 1.1 + 1 : Math.random() * 0.9 + 0.2,
      baseAlpha:
        theme === "dark" ? Math.random() * 0.6 + 0.28 : Math.random() * 0.32 + 0.12,
      twinkleSpeed: Math.random() * 0.6 + 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 3 + 1.5,
      tint: tints[Math.floor(Math.random() * tints.length)],
    });
  }
  return stars;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let start = performance.now();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height, theme);
    };

    const draw = (elapsedMs: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = elapsedMs / 1000;
      for (const star of stars) {
        const twinkle = reduceMotion
          ? star.baseAlpha
          : star.baseAlpha + Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.22;
        const y = reduceMotion
          ? star.y
          : (star.y + t * star.driftSpeed) % (height + 20);
        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.tint}, ${Math.max(0, Math.min(1, twinkle))})`;
        ctx.fill();
      }
    };

    resize();
    draw(0);

    const loop = (now: number) => {
      draw(now - start);
      animationFrame = requestAnimationFrame(loop);
    };

    if (!reduceMotion) {
      start = performance.now();
      animationFrame = requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resize();
      draw(performance.now() - start);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [theme]);

  return (
    <div className={styles.cosmos} aria-hidden="true">
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
    </div>
  );
}
