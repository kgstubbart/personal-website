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

type Crater = {
  x: number;
  y: number;
  radius: number;
};

type Glint = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

// Dark mode reads as a real night sky: dense, with a little color variety,
// drifting gently downward.
const STAR_DENSITY = 0.00034;
const MAX_STARS = 780;
const STAR_TINTS = ["255,255,255", "255,255,255", "255,255,255", "214,224,255", "255,238,214"];

function createStars(width: number, height: number): Star[] {
  const count = Math.min(MAX_STARS, Math.round(width * height * STAR_DENSITY));
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const big = Math.random() > 0.88;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: big ? Math.random() * 1.1 + 1 : Math.random() * 0.9 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.28,
      twinkleSpeed: Math.random() * 0.6 + 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 3 + 1.5,
      tint: STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)],
    });
  }
  return stars;
}

// Light mode: an up-close lunar surface. Craters are lit from a fixed
// top-left "sun" so every shadow agrees, plus a scatter of tiny mineral
// grains that catch the light — the moon's version of a star twinkling.
const CRATER_DENSITY = 0.00022;
const MAX_CRATERS = 220;
const GLINT_DENSITY = 0.00006;
const MAX_GLINTS = 110;

function createCraters(width: number, height: number): Crater[] {
  const count = Math.min(MAX_CRATERS, Math.round(width * height * CRATER_DENSITY));
  const craters: Crater[] = [];
  for (let i = 0; i < count; i++) {
    const bias = Math.pow(Math.random(), 3.2); // mostly small pockmarks, rare large ones
    craters.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 3 + bias * 40,
    });
  }
  // Largest first so small craters can overlap and read as sitting on top.
  craters.sort((a, b) => b.radius - a.radius);
  return craters;
}

function createGlints(width: number, height: number): Glint[] {
  const count = Math.min(MAX_GLINTS, Math.round(width * height * GLINT_DENSITY));
  const glints: Glint[] = [];
  for (let i = 0; i < count; i++) {
    glints.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.1 + 0.4,
      baseAlpha: Math.random() * 0.4 + 0.25,
      twinkleSpeed: Math.random() * 0.5 + 0.12,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }
  return glints;
}

function drawCrater(ctx: CanvasRenderingContext2D, crater: Crater) {
  const { x, y, radius: r } = crater;
  // No hard outline — a crisp circular edge reads as a sticker on top of
  // the surface, not a pit in it. Two soft, feathered radial blobs (dark
  // near the light source, bright on the far interior wall) fade to
  // nothing at the rim, so pits blend into the surrounding terrain the
  // way an unlit depression actually would.
  const shadowCx = x - r * 0.22;
  const shadowCy = y - r * 0.22;
  const shadow = ctx.createRadialGradient(shadowCx, shadowCy, 0, shadowCx, shadowCy, r * 0.95);
  shadow.addColorStop(0, "rgba(26,22,17,0.36)");
  shadow.addColorStop(1, "rgba(26,22,17,0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  const hiCx = x + r * 0.3;
  const hiCy = y + r * 0.3;
  const highlight = ctx.createRadialGradient(hiCx, hiCy, 0, hiCx, hiCy, r * 0.75);
  highlight.addColorStop(0, "rgba(255,250,240,0.32)");
  highlight.addColorStop(1, "rgba(255,250,240,0)");
  ctx.fillStyle = highlight;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
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

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let start = performance.now();

    let stars: Star[] = [];
    let craters: Crater[] = [];
    let glints: Glint[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (theme === "dark") {
        stars = createStars(width, height);
      } else {
        craters = createCraters(width, height);
        glints = createGlints(width, height);
      }
    };

    const drawDark = (elapsedMs: number) => {
      const t = elapsedMs / 1000;
      const span = height + 20;
      for (const star of stars) {
        const twinkle = reduceMotion
          ? star.baseAlpha
          : star.baseAlpha + Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.22;
        const y = reduceMotion ? star.y : ((star.y + t * star.driftSpeed) % span + span) % span;
        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.tint}, ${Math.max(0, Math.min(1, twinkle))})`;
        ctx.fill();
      }
    };

    const drawLight = (elapsedMs: number) => {
      const t = elapsedMs / 1000;
      for (const crater of craters) drawCrater(ctx, crater);
      for (const glint of glints) {
        // A sharper curve than a star's twinkle: mostly dim, with a brief
        // bright flash, like sunlight catching a grain of glassy regolith.
        const wave = reduceMotion
          ? 1
          : Math.pow(Math.max(0, Math.sin(t * glint.twinkleSpeed + glint.twinklePhase)), 6);
        const alpha = glint.baseAlpha * (reduceMotion ? 1 : 0.3 + wave * 0.9);
        ctx.beginPath();
        ctx.arc(glint.x, glint.y, glint.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,252,240, ${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();
      }
    };

    const draw = (elapsedMs: number) => {
      ctx.clearRect(0, 0, width, height);
      if (theme === "dark") drawDark(elapsedMs);
      else drawLight(elapsedMs);
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
      {theme === "dark" && (
        <>
          <div className={styles.glowOne} />
          <div className={styles.glowTwo} />
        </>
      )}
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
    </div>
  );
}
