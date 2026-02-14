"use client";

import * as React from "react";

const TAU = Math.PI * 2;
const FPS = 30;
const FRAME_MS = 1000 / FPS;

const COLORS = {
  terracotta: "#C15F3C",
  cream: "#F4F3EE",
  creamDark: "#E8E6DF",
  charcoal: "#141413",
} as const;

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function lerp(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = clamp((x - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

// ═══════════════════════════════════════════════════════════════
// useLoopFrame — provides a frame counter at 30fps via rAF
// ═══════════════════════════════════════════════════════════════
function useLoopFrame(duration: number) {
  const frameRef = React.useRef(0);
  const [, forceRender] = React.useReducer((x: number) => x + 1, 0);
  const lastTimeRef = React.useRef(0);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;
    let raf: number;
    const tick = (now: number) => {
      if (now - lastTimeRef.current >= FRAME_MS) {
        lastTimeRef.current = now - ((now - lastTimeRef.current) % FRAME_MS);
        frameRef.current = (frameRef.current + 1) % duration;
        forceRender();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, reducedMotion]);

  return frameRef.current;
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

function useMobile() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return mobile;
}

// ═══════════════════════════════════════════════════════════════
// Wrapper — handles reduced motion / mobile fallback
// ═══════════════════════════════════════════════════════════════
function AnimatedBg({
  children,
  overlay,
  className = "",
}: {
  children: React.ReactNode;
  overlay?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const mobile = useMobile();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {!reduced && !mobile ? children : (
        <div className="absolute inset-0 bg-cream" />
      )}
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 1. HeroAmbient — drifting blurred orbs
// ═══════════════════════════════════════════════════════════════

interface Orb {
  cx: number; cy: number; r: number; color: string; opacity: number; blur: number;
  xPeriod: number; yPeriod: number; xAmp: number; yAmp: number;
  phase: number; breatheAmp: number; breathePeriod: number;
}

const heroOrbs: Orb[] = [
  { cx: 18, cy: 25, r: 250, color: COLORS.creamDark, opacity: 0.6, blur: 50, xPeriod: 600, yPeriod: 300, xAmp: 100, yAmp: 70, phase: 0, breatheAmp: 0.08, breathePeriod: 200 },
  { cx: 75, cy: 70, r: 280, color: COLORS.creamDark, opacity: 0.55, blur: 55, xPeriod: 300, yPeriod: 600, xAmp: 80, yAmp: 90, phase: 0.25, breatheAmp: 0.06, breathePeriod: 150 },
  { cx: 50, cy: 12, r: 220, color: COLORS.creamDark, opacity: 0.5, blur: 45, xPeriod: 200, yPeriod: 150, xAmp: 70, yAmp: 55, phase: 0.5, breatheAmp: 0.07, breathePeriod: 300 },
  { cx: 88, cy: 35, r: 200, color: COLORS.creamDark, opacity: 0.45, blur: 40, xPeriod: 150, yPeriod: 200, xAmp: 60, yAmp: 75, phase: 0.7, breatheAmp: 0.05, breathePeriod: 200 },
  { cx: 30, cy: 55, r: 180, color: COLORS.terracotta, opacity: 0.18, blur: 45, xPeriod: 150, yPeriod: 200, xAmp: 120, yAmp: 80, phase: 0.1, breatheAmp: 0.05, breathePeriod: 150 },
  { cx: 65, cy: 22, r: 160, color: COLORS.terracotta, opacity: 0.2, blur: 40, xPeriod: 200, yPeriod: 300, xAmp: 90, yAmp: 65, phase: 0.4, breatheAmp: 0.06, breathePeriod: 200 },
  { cx: 82, cy: 60, r: 200, color: COLORS.terracotta, opacity: 0.15, blur: 50, xPeriod: 300, yPeriod: 150, xAmp: 70, yAmp: 95, phase: 0.6, breatheAmp: 0.04, breathePeriod: 300 },
  { cx: 42, cy: 82, r: 150, color: COLORS.terracotta, opacity: 0.17, blur: 35, xPeriod: 200, yPeriod: 600, xAmp: 95, yAmp: 55, phase: 0.85, breatheAmp: 0.05, breathePeriod: 150 },
  { cx: 8, cy: 72, r: 120, color: COLORS.creamDark, opacity: 0.4, blur: 30, xPeriod: 150, yPeriod: 300, xAmp: 55, yAmp: 70, phase: 0.3, breatheAmp: 0.08, breathePeriod: 200 },
  { cx: 55, cy: 45, r: 100, color: COLORS.terracotta, opacity: 0.12, blur: 28, xPeriod: 300, yPeriod: 200, xAmp: 65, yAmp: 60, phase: 0.15, breatheAmp: 0.04, breathePeriod: 150 },
  { cx: 92, cy: 88, r: 140, color: COLORS.creamDark, opacity: 0.35, blur: 32, xPeriod: 200, yPeriod: 150, xAmp: 50, yAmp: 65, phase: 0.55, breatheAmp: 0.06, breathePeriod: 300 },
];

function HeroAmbientCanvas() {
  const frame = useLoopFrame(600);

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <rect width="1920" height="1080" fill={COLORS.cream} />
      <defs>
        {heroOrbs.map((orb, i) => (
          <filter key={i} id={`ha-blur-${i}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={orb.blur} />
          </filter>
        ))}
      </defs>
      {heroOrbs.map((orb, i) => {
        const t = frame + orb.phase * orb.xPeriod;
        const x = (orb.cx / 100) * 1920 + orb.xAmp * Math.sin((t * TAU) / orb.xPeriod);
        const y = (orb.cy / 100) * 1080 + orb.yAmp * Math.cos((t * TAU) / orb.yPeriod);
        const breathe = orb.breatheAmp * Math.sin((frame * TAU) / orb.breathePeriod);
        const opacity = clamp(orb.opacity + breathe, 0, 1);
        const scale = 1 + 0.06 * Math.sin((frame * TAU) / (orb.breathePeriod * 1.5));
        return (
          <circle key={i} cx={x} cy={y} r={orb.r * scale} fill={orb.color} opacity={opacity} filter={`url(#ha-blur-${i})`} />
        );
      })}
    </svg>
  );
}

export function HeroAmbientBg({ overlay, className }: { overlay?: string; className?: string }) {
  return (
    <AnimatedBg overlay={overlay} className={className}>
      <HeroAmbientCanvas />
    </AnimatedBg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2. ProcessWeave — tracing bezier curves
// ═══════════════════════════════════════════════════════════════

const PROCESS_DURATION = 450;

interface CurveDef {
  d: string; width: number; delay: number;
  drawDuration: number; holdDuration: number; fadeDuration: number; glowWidth: number;
}

const weaveCurves: CurveDef[] = [
  { d: "M -50 850 C 250 650, 500 350, 850 280 S 1300 220, 1600 180 S 1850 140, 1970 120", width: 1.8, delay: 0, drawDuration: 180, holdDuration: 60, fadeDuration: 100, glowWidth: 8 },
  { d: "M -30 950 C 200 750, 450 550, 750 480 S 1100 380, 1400 320 S 1700 260, 1970 240", width: 1.4, delay: 90, drawDuration: 160, holdDuration: 70, fadeDuration: 90, glowWidth: 6 },
  { d: "M -20 780 C 300 600, 600 420, 950 370 S 1250 300, 1550 230 S 1800 180, 1970 160", width: 1.2, delay: 190, drawDuration: 170, holdDuration: 50, fadeDuration: 100, glowWidth: 5 },
  { d: "M -40 1000 C 180 800, 420 600, 700 540 S 1050 440, 1350 380 S 1650 300, 1970 280", width: 1.0, delay: 300, drawDuration: 140, holdDuration: 60, fadeDuration: 90, glowWidth: 4 },
];

const weaveParticles = Array.from({ length: 20 }, (_, i) => {
  const seed = i * 137.5;
  return {
    baseX: (seed * 7.3) % 1920, baseY: 100 + (seed * 3.7) % 880,
    r: 1.5 + (i % 4) * 0.8,
    xPeriod: [150, 225, 450, 300][i % 4], yPeriod: [225, 150, 300, 450][i % 4],
    xAmp: 12 + (i * 7) % 18, yAmp: 8 + (i * 11) % 15,
    phase: (i * 0.15) % 1, opacity: 0.06 + (i % 6) * 0.02,
  };
});

function getCurveProgress(frame: number, curve: CurveDef) {
  const loopFrame = frame % PROCESS_DURATION;
  const totalLife = curve.drawDuration + curve.holdDuration + curve.fadeDuration;
  let effective = loopFrame - curve.delay;
  if (effective < 0) effective += PROCESS_DURATION;

  const pathLength = effective <= curve.drawDuration
    ? lerp(effective, 0, curve.drawDuration, 0, 1)
    : effective <= curve.drawDuration + curve.holdDuration
    ? 1
    : effective <= totalLife
    ? 1
    : 0;

  const opacity = effective <= 0 ? 0
    : effective <= 20 ? lerp(effective, 0, 20, 0, 0.25)
    : effective <= curve.drawDuration ? 0.25
    : effective <= curve.drawDuration + curve.holdDuration ? 0.2
    : effective <= totalLife ? lerp(effective, curve.drawDuration + curve.holdDuration, totalLife, 0.2, 0)
    : 0;

  const glowOpacity = effective <= 0 ? 0
    : effective <= 20 ? lerp(effective, 0, 20, 0, 0.08)
    : effective <= curve.drawDuration ? 0.1
    : effective <= curve.drawDuration + curve.holdDuration ? 0.06
    : effective <= totalLife ? lerp(effective, curve.drawDuration + curve.holdDuration, totalLife, 0.06, 0)
    : 0;

  return { pathLength, opacity, glowOpacity };
}

const curveStarts = [{ x: -50, y: 850 }, { x: -30, y: 950 }, { x: -20, y: 780 }, { x: -40, y: 1000 }];
const curveEnds = [{ x: 1970, y: 120 }, { x: 1970, y: 240 }, { x: 1970, y: 160 }, { x: 1970, y: 280 }];

function ProcessWeaveCanvas() {
  const frame = useLoopFrame(PROCESS_DURATION);

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <rect width="1920" height="1080" fill={COLORS.cream} />
      <defs>
        <filter id="pw-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12" /></filter>
        <filter id="pw-dot" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      {weaveCurves.map((curve, i) => {
        const { pathLength, glowOpacity } = getCurveProgress(frame, curve);
        return (
          <path key={`g-${i}`} d={curve.d} stroke={COLORS.terracotta} strokeWidth={curve.glowWidth}
            strokeLinecap="round" fill="none" opacity={glowOpacity}
            strokeDasharray="1" strokeDashoffset={1 - pathLength} pathLength={1} filter="url(#pw-glow)" />
        );
      })}

      {weaveCurves.map((curve, i) => {
        const { pathLength, opacity } = getCurveProgress(frame, curve);
        return (
          <path key={`c-${i}`} d={curve.d} stroke={COLORS.terracotta} strokeWidth={curve.width}
            strokeLinecap="round" fill="none" opacity={opacity}
            strokeDasharray="1" strokeDashoffset={1 - pathLength} pathLength={1} />
        );
      })}

      {weaveCurves.map((curve, i) => {
        const { pathLength, opacity } = getCurveProgress(frame, curve);
        if (pathLength < 0.02 || opacity < 0.02) return null;
        const tipX = curveStarts[i].x + (curveEnds[i].x - curveStarts[i].x) * pathLength;
        const tipY = curveStarts[i].y + (curveEnds[i].y - curveStarts[i].y) * pathLength;
        const pulse = 1 + 0.4 * Math.sin((frame * TAU) / 30);
        const dotR = 3 * pulse;
        return (
          <g key={`t-${i}`}>
            <circle cx={tipX} cy={tipY} r={dotR * 3} fill={COLORS.terracotta} opacity={opacity * 0.15} filter="url(#pw-dot)" />
            <circle cx={tipX} cy={tipY} r={dotR} fill={COLORS.terracotta} opacity={opacity * 0.6} />
          </g>
        );
      })}

      {weaveParticles.map((p, i) => {
        const t = frame + p.phase * p.xPeriod;
        const px = p.baseX + p.xAmp * Math.sin((t * TAU) / p.xPeriod);
        const py = p.baseY + p.yAmp * Math.cos((t * TAU) / p.yPeriod);
        const flicker = 0.7 + 0.3 * Math.sin((frame * TAU) / (90 + i * 7));
        return <circle key={`p-${i}`} cx={px} cy={py} r={p.r} fill={COLORS.terracotta} opacity={p.opacity * flicker} />;
      })}
    </svg>
  );
}

export function ProcessWeaveBg({ overlay, className }: { overlay?: string; className?: string }) {
  return (
    <AnimatedBg overlay={overlay} className={className}>
      <ProcessWeaveCanvas />
    </AnimatedBg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3. NeuralFlow — orbiting nodes with connections
// ═══════════════════════════════════════════════════════════════

const NEURAL_DURATION = 600;
const CONNECTION_DISTANCE = 250;

interface NNode {
  baseX: number; baseY: number;
  orbitR: number; orbitPeriod: number; orbitPhase: number;
  orbit2R: number; orbit2Period: number; orbit2Phase: number;
  r: number; glowR: number; importance: number;
}

const neuralNodes: NNode[] = (() => {
  const result: NNode[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 38; i++) {
    const rad = Math.sqrt(i / 38) * 480;
    const theta = i * goldenAngle;
    const cx = clamp(960 + rad * Math.cos(theta) + ((i * 73) % 80 - 40), 80, 1840);
    const cy = clamp(540 + rad * Math.sin(theta) + ((i * 47) % 60 - 30), 80, 1000);
    const distFromCenter = Math.sqrt((cx - 960) ** 2 + (cy - 540) ** 2);
    const importance = clamp(1 - distFromCenter / 500, 0.3, 1);
    const periods = [100, 120, 150, 200, 300, 600];
    result.push({
      baseX: cx, baseY: cy,
      orbitR: 6 + importance * 16 + (i * 13) % 10,
      orbitPeriod: periods[i % 6], orbitPhase: (i * 0.137) % 1,
      orbit2R: 3 + (i * 7) % 8,
      orbit2Period: periods[(i + 3) % 6], orbit2Phase: (i * 0.293) % 1,
      r: 2 + importance * 2.5 + (i % 3) * 0.4,
      glowR: 8 + importance * 14, importance,
    });
  }
  return result;
})();

function getNPos(n: NNode, frame: number) {
  const a1 = TAU * (frame / n.orbitPeriod + n.orbitPhase);
  const a2 = TAU * (frame / n.orbit2Period + n.orbit2Phase);
  return { x: n.baseX + n.orbitR * Math.cos(a1) + n.orbit2R * Math.sin(a2), y: n.baseY + n.orbitR * Math.sin(a1) + n.orbit2R * Math.cos(a2) };
}

function NeuralFlowCanvas() {
  const frame = useLoopFrame(NEURAL_DURATION);
  const positions = neuralNodes.map((n) => getNPos(n, frame));

  const connections: { i: number; j: number; dist: number }[] = [];
  for (let i = 0; i < neuralNodes.length; i++) {
    for (let j = i + 1; j < neuralNodes.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DISTANCE) connections.push({ i, j, dist });
    }
  }

  const p1 = (frame % (NEURAL_DURATION / 2)) / (NEURAL_DURATION / 2);
  const p2 = ((frame + NEURAL_DURATION / 4) % (NEURAL_DURATION / 2)) / (NEURAL_DURATION / 2);
  const pr1 = p1 * 800, pr2 = p2 * 800;

  function boost(x: number, y: number) {
    const d = Math.sqrt((x - 960) ** 2 + (y - 540) ** 2);
    return clamp((120 - Math.abs(d - pr1)) / 120, 0, 1) * 0.2 + clamp((120 - Math.abs(d - pr2)) / 120, 0, 1) * 0.2;
  }

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <rect width="1920" height="1080" fill={COLORS.cream} />
      <defs>
        <filter id="nf-ng" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="nf-lg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {connections.map(({ i, j, dist }, idx) => {
        const op = lerp(dist, 0, CONNECTION_DISTANCE, 0.06, 0);
        const mx = (positions[i].x + positions[j].x) / 2, my = (positions[i].y + positions[j].y) / 2;
        const b = boost(mx, my);
        return <line key={`cg-${idx}`} x1={positions[i].x} y1={positions[i].y} x2={positions[j].x} y2={positions[j].y}
          stroke={COLORS.terracotta} strokeWidth={2.5} opacity={op + b * 0.04} filter="url(#nf-lg)" />;
      })}

      {connections.map(({ i, j, dist }, idx) => {
        const op = lerp(dist, 0, CONNECTION_DISTANCE, 0.14, 0);
        const mx = (positions[i].x + positions[j].x) / 2, my = (positions[i].y + positions[j].y) / 2;
        const b = boost(mx, my);
        return <line key={`c-${idx}`} x1={positions[i].x} y1={positions[i].y} x2={positions[j].x} y2={positions[j].y}
          stroke={COLORS.terracotta} strokeWidth={0.7} opacity={op + b * 0.08} />;
      })}

      {neuralNodes.map((node, i) => {
        const pos = positions[i];
        const b = boost(pos.x, pos.y);
        return <circle key={`ng-${i}`} cx={pos.x} cy={pos.y} r={node.glowR + b * 8}
          fill={COLORS.terracotta} opacity={0.04 + node.importance * 0.06 + b * 0.1} filter="url(#nf-ng)" />;
      })}

      {neuralNodes.map((node, i) => {
        const pos = positions[i];
        const b = boost(pos.x, pos.y);
        return <circle key={`n-${i}`} cx={pos.x} cy={pos.y} r={node.r + b * 1.5}
          fill={COLORS.terracotta} opacity={0.15 + node.importance * 0.15 + b * 0.2} />;
      })}

      {[pr1, pr2].map((radius, i) => (
        <circle key={`pr-${i}`} cx={960} cy={540} r={radius} fill="none"
          stroke={COLORS.terracotta} strokeWidth={1} opacity={radius < 200 ? lerp(radius, 0, 200, 0, 0.04) : lerp(radius, 200, 800, 0.04, 0)} />
      ))}
    </svg>
  );
}

export function NeuralFlowBg({ overlay, className }: { overlay?: string; className?: string }) {
  return (
    <AnimatedBg overlay={overlay} className={className}>
      <NeuralFlowCanvas />
    </AnimatedBg>
  );
}
