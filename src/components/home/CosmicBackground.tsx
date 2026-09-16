import { useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeContext";
import styles from "./CosmicBackground.module.css";

type Particle = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftSpeed: number;
  tint: string;
};

// Dark mode reads as a real night sky: dense, with a little color variety,
// drifting gently downward.
const DARK_DENSITY = 0.00034;
const DARK_MAX_PARTICLES = 780;
const DARK_TINTS = ["255,255,255", "255,255,255", "255,255,255", "214,224,255", "255,238,214"];

// Light mode swaps stars for sunlit dust motes rising slowly through the
// scene, like light catching particles in the air.
const LIGHT_DENSITY = 0.00006;
const LIGHT_MAX_PARTICLES = 110;
const LIGHT_TINTS = ["255,236,196", "255,255,255", "255,224,168"];

function createParticles(width: number, height: number, theme: "light" | "dark"): Particle[] {
  const density = theme === "dark" ? DARK_DENSITY : LIGHT_DENSITY;
  const maxParticles = theme === "dark" ? DARK_MAX_PARTICLES : LIGHT_MAX_PARTICLES;
  const tints = theme === "dark" ? DARK_TINTS : LIGHT_TINTS;
  const count = Math.min(maxParticles, Math.round(width * height * density));
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const big = Math.random() > 0.88;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius:
        theme === "dark"
          ? big
            ? Math.random() * 1.1 + 1
            : Math.random() * 0.9 + 0.2
          : Math.random() * 1.6 + 0.6,
      baseAlpha:
        theme === "dark" ? Math.random() * 0.6 + 0.28 : Math.random() * 0.4 + 0.18,
      twinkleSpeed: Math.random() * 0.6 + 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
      driftSpeed: theme === "dark" ? Math.random() * 3 + 1.5 : Math.random() * 5 + 2.5,
      tint: tints[Math.floor(Math.random() * tints.length)],
    });
  }
  return particles;
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
    // Dark-mode stars drift down; light-mode motes rise, like dust in a sunbeam.
    const verticalDirection = theme === "dark" ? 1 : -1;

    let particles: Particle[] = [];
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
      particles = createParticles(width, height, theme);
    };

    const draw = (elapsedMs: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = elapsedMs / 1000;
      const span = height + 20;
      for (const particle of particles) {
        const twinkle = reduceMotion
          ? particle.baseAlpha
          : particle.baseAlpha + Math.sin(t * particle.twinkleSpeed + particle.twinklePhase) * 0.22;
        const rawY = reduceMotion
          ? particle.y
          : particle.y + verticalDirection * t * particle.driftSpeed;
        const y = ((rawY % span) + span) % span;
        ctx.beginPath();
        ctx.arc(particle.x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.tint}, ${Math.max(0, Math.min(1, twinkle))})`;
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
      <div className={styles.sunRays} />
      <div className={styles.sun} />
      <div className={styles.cloudOne} />
      <div className={styles.cloudTwo} />
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
    </div>
  );
}
