"use client";

import * as React from "react";

const TAU = Math.PI * 2;

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function lerp(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = clamp((x - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${r},${g},${b},${a})`;
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) => void;

function useCanvasAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  draw: DrawFn,
  duration: number
) {
  const reduced = useReducedMotion();
  const frameRef = React.useRef(0);
  const lastRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf: number;
    let cw = 0;
    let ch = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tick = (now: number) => {
      if (now - lastRef.current >= 33.33) {
        lastRef.current = now;
        frameRef.current = (frameRef.current + 1) % duration;
        ctx.clearRect(0, 0, cw, ch);
        draw(ctx, cw, ch, frameRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasRef, draw, duration, reduced]);
}

function AnimatedBg({
  children,
  overlay,
  className = "",
}: {
  children: React.ReactNode;
  overlay?: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {children}
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 1. HeroAmbient — soft drifting orbs via radial gradients
// ═══════════════════════════════════════════════════════════════

const HERO_DUR = 600;

interface Orb {
  cx: number;
  cy: number;
  r: number;
  rgb: readonly [number, number, number];
  opacity: number;
  xPeriod: number;
  yPeriod: number;
  xAmp: number;
  yAmp: number;
  phase: number;
  breatheAmp: number;
  breathePeriod: number;
}

const NC = [30, 58, 95] as const;
const SC = [148, 163, 184] as const;

const heroOrbs: Orb[] = [
  { cx: 0.18, cy: 0.25, r: 0.22, rgb: [203, 213, 225], opacity: 0.28, xPeriod: 600, yPeriod: 300, xAmp: 0.05, yAmp: 0.04, phase: 0, breatheAmp: 0.04, breathePeriod: 200 },
  { cx: 0.75, cy: 0.70, r: 0.24, rgb: [210, 218, 230], opacity: 0.22, xPeriod: 300, yPeriod: 600, xAmp: 0.04, yAmp: 0.05, phase: 0.25, breatheAmp: 0.03, breathePeriod: 150 },
  { cx: 0.50, cy: 0.12, r: 0.20, rgb: [196, 208, 222], opacity: 0.25, xPeriod: 200, yPeriod: 150, xAmp: 0.04, yAmp: 0.03, phase: 0.5, breatheAmp: 0.04, breathePeriod: 300 },
  { cx: 0.88, cy: 0.35, r: 0.18, rgb: [215, 223, 235], opacity: 0.20, xPeriod: 150, yPeriod: 200, xAmp: 0.03, yAmp: 0.04, phase: 0.7, breatheAmp: 0.03, breathePeriod: 200 },
  { cx: 0.30, cy: 0.55, r: 0.15, rgb: SC, opacity: 0.12, xPeriod: 150, yPeriod: 200, xAmp: 0.06, yAmp: 0.04, phase: 0.1, breatheAmp: 0.03, breathePeriod: 150 },
  { cx: 0.65, cy: 0.22, r: 0.13, rgb: SC, opacity: 0.10, xPeriod: 200, yPeriod: 300, xAmp: 0.05, yAmp: 0.03, phase: 0.4, breatheAmp: 0.03, breathePeriod: 200 },
  { cx: 0.82, cy: 0.60, r: 0.16, rgb: SC, opacity: 0.09, xPeriod: 300, yPeriod: 150, xAmp: 0.04, yAmp: 0.05, phase: 0.6, breatheAmp: 0.02, breathePeriod: 300 },
  { cx: 0.42, cy: 0.82, r: 0.12, rgb: SC, opacity: 0.11, xPeriod: 200, yPeriod: 600, xAmp: 0.05, yAmp: 0.03, phase: 0.85, breatheAmp: 0.03, breathePeriod: 150 },
  { cx: 0.08, cy: 0.72, r: 0.11, rgb: [218, 226, 238], opacity: 0.22, xPeriod: 150, yPeriod: 300, xAmp: 0.03, yAmp: 0.04, phase: 0.3, breatheAmp: 0.04, breathePeriod: 200 },
  { cx: 0.55, cy: 0.45, r: 0.09, rgb: SC, opacity: 0.08, xPeriod: 300, yPeriod: 200, xAmp: 0.03, yAmp: 0.03, phase: 0.15, breatheAmp: 0.02, breathePeriod: 150 },
  { cx: 0.92, cy: 0.88, r: 0.12, rgb: [225, 231, 240], opacity: 0.18, xPeriod: 200, yPeriod: 150, xAmp: 0.03, yAmp: 0.03, phase: 0.55, breatheAmp: 0.03, breathePeriod: 300 },
];

const drawHero: DrawFn = (ctx, w, h, frame) => {
  const dim = Math.min(w, h);
  for (const o of heroOrbs) {
    const t = frame + o.phase * o.xPeriod;
    const x = o.cx * w + o.xAmp * w * Math.sin((t * TAU) / o.xPeriod);
    const y = o.cy * h + o.yAmp * h * Math.cos((t * TAU) / o.yPeriod);
    const breathe = o.breatheAmp * Math.sin((frame * TAU) / o.breathePeriod);
    const scale = 1 + 0.06 * Math.sin((frame * TAU) / (o.breathePeriod * 1.5));
    const op = clamp(o.opacity + breathe, 0, 1);
    const r = o.r * dim * scale;

    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(o.rgb[0], o.rgb[1], o.rgb[2], op));
    g.addColorStop(0.4, rgba(o.rgb[0], o.rgb[1], o.rgb[2], op * 0.6));
    g.addColorStop(1, rgba(o.rgb[0], o.rgb[1], o.rgb[2], 0));
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
};

function HeroAmbientCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  useCanvasAnimation(ref, drawHero, HERO_DUR);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export function HeroAmbientBg({ overlay, className }: { overlay?: string; className?: string }) {
  return (
    <AnimatedBg overlay={overlay} className={className}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(203,213,225,0.18) 0%, transparent 70%), " +
            "radial-gradient(ellipse 50% 60% at 75% 70%, rgba(148,163,184,0.08) 0%, transparent 70%)",
        }}
      />
      <HeroAmbientCanvas />
    </AnimatedBg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2. ProcessWeave — tracing bezier curves with glow
// ═══════════════════════════════════════════════════════════════

const PROCESS_DUR = 450;

interface CurveDef {
  pts: [number, number][];
  width: number;
  delay: number;
  drawDur: number;
  holdDur: number;
  fadeDur: number;
}

const weaveCurves: CurveDef[] = [
  { pts: [[-0.03, 0.79], [0.13, 0.60], [0.26, 0.32], [0.44, 0.26], [0.68, 0.20], [0.83, 0.17], [1.03, 0.11]], width: 2, delay: 0, drawDur: 180, holdDur: 60, fadeDur: 100 },
  { pts: [[-0.02, 0.88], [0.10, 0.69], [0.23, 0.51], [0.39, 0.44], [0.57, 0.35], [0.73, 0.30], [1.03, 0.22]], width: 1.5, delay: 90, drawDur: 160, holdDur: 70, fadeDur: 90 },
  { pts: [[-0.01, 0.72], [0.16, 0.56], [0.31, 0.39], [0.49, 0.34], [0.65, 0.28], [0.81, 0.21], [1.03, 0.15]], width: 1.2, delay: 190, drawDur: 170, holdDur: 50, fadeDur: 100 },
  { pts: [[-0.02, 0.93], [0.09, 0.74], [0.22, 0.56], [0.36, 0.50], [0.55, 0.41], [0.70, 0.35], [1.03, 0.26]], width: 1, delay: 300, drawDur: 140, holdDur: 60, fadeDur: 90 },
];

const weaveParticles = Array.from({ length: 20 }, (_, i) => {
  const seed = i * 137.5;
  return {
    bx: (seed * 7.3 % 100) / 100,
    by: (10 + seed * 3.7 % 80) / 100,
    r: 1.5 + (i % 4) * 0.6,
    xP: [150, 225, 450, 300][i % 4],
    yP: [225, 150, 300, 450][i % 4],
    xA: (12 + (i * 7) % 18) / 1920,
    yA: (8 + (i * 11) % 15) / 1080,
    phase: (i * 0.15) % 1,
    opacity: 0.10 + (i % 5) * 0.03,
  };
});

function getCurveAlpha(frame: number, c: CurveDef) {
  const loopFrame = frame % PROCESS_DUR;
  const life = c.drawDur + c.holdDur + c.fadeDur;
  let eff = loopFrame - c.delay;
  if (eff < 0) eff += PROCESS_DUR;

  const progress = eff <= c.drawDur
    ? eff / c.drawDur
    : eff <= c.drawDur + c.holdDur
      ? 1
      : eff <= life
        ? 1
        : 0;

  const alpha = eff <= 0
    ? 0
    : eff <= 20
      ? lerp(eff, 0, 20, 0, 0.4)
      : eff <= c.drawDur
        ? 0.4
        : eff <= c.drawDur + c.holdDur
          ? 0.35
          : eff <= life
            ? lerp(eff, c.drawDur + c.holdDur, life, 0.35, 0)
            : 0;

  return { progress, alpha };
}

function buildCurvePath(ctx: CanvasRenderingContext2D, pts: [number, number][], w: number, h: number) {
  const px = pts.map(p => [p[0] * w, p[1] * h] as const);
  ctx.beginPath();
  ctx.moveTo(px[0][0], px[0][1]);
  for (let i = 1; i < px.length - 1; i++) {
    const xc = (px[i][0] + px[i + 1][0]) / 2;
    const yc = (px[i][1] + px[i + 1][1]) / 2;
    ctx.quadraticCurveTo(px[i][0], px[i][1], xc, yc);
  }
  ctx.lineTo(px[px.length - 1][0], px[px.length - 1][1]);
}

function getTip(pts: [number, number][], t: number, w: number, h: number): [number, number] {
  const n = pts.length - 1;
  const idx = t * n;
  const i = Math.min(Math.floor(idx), n - 1);
  const frac = idx - i;
  return [
    (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * frac) * w,
    (pts[i][1] + (pts[i + 1][1] - pts[i][1]) * frac) * h,
  ];
}

const drawProcess: DrawFn = (ctx, w, h, frame) => {
  const maxLen = w * 1.5;

  for (const curve of weaveCurves) {
    const { progress, alpha } = getCurveAlpha(frame, curve);
    if (alpha <= 0 || progress <= 0) continue;

    ctx.lineCap = "round";
    ctx.setLineDash([maxLen]);
    ctx.lineDashOffset = maxLen * (1 - progress);

    buildCurvePath(ctx, curve.pts, w, h);
    ctx.strokeStyle = rgba(NC[0], NC[1], NC[2], alpha * 0.25);
    ctx.lineWidth = curve.width * 6;
    ctx.stroke();

    buildCurvePath(ctx, curve.pts, w, h);
    ctx.strokeStyle = rgba(NC[0], NC[1], NC[2], alpha);
    ctx.lineWidth = curve.width;
    ctx.stroke();

    ctx.setLineDash([]);

    if (progress > 0.02) {
      const [tx, ty] = getTip(curve.pts, progress, w, h);
      const pulse = 1 + 0.4 * Math.sin((frame * TAU) / 30);
      const dotR = 3 * pulse;

      const dg = ctx.createRadialGradient(tx, ty, 0, tx, ty, dotR * 4);
      dg.addColorStop(0, rgba(NC[0], NC[1], NC[2], alpha * 0.35));
      dg.addColorStop(1, rgba(NC[0], NC[1], NC[2], 0));
      ctx.fillStyle = dg;
      ctx.fillRect(tx - dotR * 4, ty - dotR * 4, dotR * 8, dotR * 8);

      ctx.beginPath();
      ctx.arc(tx, ty, dotR, 0, TAU);
      ctx.fillStyle = rgba(NC[0], NC[1], NC[2], alpha * 0.8);
      ctx.fill();
    }
  }

  for (let i = 0; i < weaveParticles.length; i++) {
    const p = weaveParticles[i];
    const t = frame + p.phase * p.xP;
    const px = p.bx * w + p.xA * w * Math.sin((t * TAU) / p.xP);
    const py = p.by * h + p.yA * h * Math.cos((t * TAU) / p.yP);
    const flicker = 0.7 + 0.3 * Math.sin((frame * TAU) / (90 + i * 7));
    ctx.beginPath();
    ctx.arc(px, py, p.r, 0, TAU);
    ctx.fillStyle = rgba(SC[0], SC[1], SC[2], p.opacity * flicker);
    ctx.fill();
  }
};

function ProcessWeaveCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  useCanvasAnimation(ref, drawProcess, PROCESS_DUR);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export function ProcessWeaveBg({ overlay, className }: { overlay?: string; className?: string }) {
  return (
    <AnimatedBg overlay={overlay} className={className}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(148,163,184,0.06) 0%, transparent 70%)",
        }}
      />
      <ProcessWeaveCanvas />
    </AnimatedBg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3. NeuralFlow — orbiting nodes with connections & pulse waves
// ═══════════════════════════════════════════════════════════════

const NEURAL_DUR = 600;
const CONN_FRAC = 0.15;

interface NNode {
  bx: number;
  by: number;
  oR: number;
  oP: number;
  oPh: number;
  o2R: number;
  o2P: number;
  o2Ph: number;
  r: number;
  glowR: number;
  imp: number;
}

const neuralNodes: NNode[] = (() => {
  const result: NNode[] = [];
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 38; i++) {
    const rad = Math.sqrt(i / 38) * 0.45;
    const theta = i * GA;
    const cx = clamp(0.5 + rad * Math.cos(theta) + ((i * 73) % 80 - 40) / 1920, 0.05, 0.95);
    const cy = clamp(0.5 + rad * Math.sin(theta) + ((i * 47) % 60 - 30) / 1080, 0.08, 0.92);
    const distC = Math.sqrt((cx - 0.5) ** 2 + (cy - 0.5) ** 2);
    const imp = clamp(1 - distC / 0.5, 0.3, 1);
    const periods = [100, 120, 150, 200, 300, 600];
    result.push({
      bx: cx,
      by: cy,
      oR: (6 + imp * 16 + (i * 13) % 10) / 960,
      oP: periods[i % 6],
      oPh: (i * 0.137) % 1,
      o2R: (3 + (i * 7) % 8) / 960,
      o2P: periods[(i + 3) % 6],
      o2Ph: (i * 0.293) % 1,
      r: 2 + imp * 2.5 + (i % 3) * 0.4,
      glowR: 8 + imp * 14,
      imp,
    });
  }
  return result;
})();

const drawNeural: DrawFn = (ctx, w, h, frame) => {
  const scale = Math.min(w, h);
  const connDist = CONN_FRAC * scale;

  const positions = neuralNodes.map((n) => {
    const a1 = TAU * (frame / n.oP + n.oPh);
    const a2 = TAU * (frame / n.o2P + n.o2Ph);
    return {
      x: n.bx * w + n.oR * scale * Math.cos(a1) + n.o2R * scale * Math.sin(a2),
      y: n.by * h + n.oR * scale * Math.sin(a1) + n.o2R * scale * Math.cos(a2),
    };
  });

  const p1f = (frame % (NEURAL_DUR / 2)) / (NEURAL_DUR / 2);
  const p2f = ((frame + NEURAL_DUR / 4) % (NEURAL_DUR / 2)) / (NEURAL_DUR / 2);
  const pr1 = p1f * scale * 0.8;
  const pr2 = p2f * scale * 0.8;

  const boost = (x: number, y: number) => {
    const d = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2);
    const band = scale * 0.12;
    return (
      clamp((band - Math.abs(d - pr1)) / band, 0, 1) * 0.25 +
      clamp((band - Math.abs(d - pr2)) / band, 0, 1) * 0.25
    );
  };

  for (let i = 0; i < neuralNodes.length; i++) {
    for (let j = i + 1; j < neuralNodes.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connDist) {
        const mx = (positions[i].x + positions[j].x) / 2;
        const my = (positions[i].y + positions[j].y) / 2;
        const b = boost(mx, my);
        const alpha = lerp(dist, 0, connDist, 0.2, 0) + b * 0.12;
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[j].x, positions[j].y);
        ctx.strokeStyle = rgba(NC[0], NC[1], NC[2], alpha);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < neuralNodes.length; i++) {
    const n = neuralNodes[i];
    const p = positions[i];
    const b = boost(p.x, p.y);
    const gr = n.glowR + b * 8;
    const alpha = 0.07 + n.imp * 0.1 + b * 0.15;

    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
    g.addColorStop(0, rgba(NC[0], NC[1], NC[2], alpha));
    g.addColorStop(1, rgba(NC[0], NC[1], NC[2], 0));
    ctx.fillStyle = g;
    ctx.fillRect(p.x - gr, p.y - gr, gr * 2, gr * 2);
  }

  for (let i = 0; i < neuralNodes.length; i++) {
    const n = neuralNodes[i];
    const p = positions[i];
    const b = boost(p.x, p.y);
    const alpha = 0.25 + n.imp * 0.25 + b * 0.3;

    ctx.beginPath();
    ctx.arc(p.x, p.y, n.r + b * 1.5, 0, TAU);
    ctx.fillStyle = rgba(NC[0], NC[1], NC[2], alpha);
    ctx.fill();
  }

  for (const radius of [pr1, pr2]) {
    const alpha =
      radius < scale * 0.2
        ? lerp(radius, 0, scale * 0.2, 0, 0.06)
        : lerp(radius, scale * 0.2, scale * 0.8, 0.06, 0);
    if (alpha > 0.001) {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, radius, 0, TAU);
      ctx.strokeStyle = rgba(NC[0], NC[1], NC[2], alpha);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
};

function NeuralFlowCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  useCanvasAnimation(ref, drawNeural, NEURAL_DUR);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export function NeuralFlowBg({ overlay, className }: { overlay?: string; className?: string }) {
  return (
    <AnimatedBg overlay={overlay} className={className}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(30,58,95,0.06) 0%, transparent 60%), " +
            "radial-gradient(circle at 20% 30%, rgba(30,58,95,0.03) 0%, transparent 40%), " +
            "radial-gradient(circle at 80% 70%, rgba(30,58,95,0.03) 0%, transparent 40%)",
        }}
      />
      <NeuralFlowCanvas />
    </AnimatedBg>
  );
}
