"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { PROFESSIONS } from "@/lib/professions";
import { useLocale } from "@/lib/i18n";

/* ---------- animation variants ---------- */

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
};

/* ---------- per-profession simulation components ---------- */

const LOOP_DURATION = 5; // seconds per loop

/** Avvocati: document slides in, clause lines highlight, risk badge appears */
function AvvocatiAnimation() {
  return (
    <motion.svg
      viewBox="0 0 400 280"
      className="w-full h-full"
      fill="none"
      initial="hidden"
      animate="visible"
    >
      {/* Document rectangle */}
      <motion.rect
        x={40} y={20} width={160} height={220} rx={8}
        stroke="var(--color-navy-light)"
        strokeWidth={2}
        fill="var(--color-surface)"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 40, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", repeat: Infinity, repeatDelay: LOOP_DURATION - 0.6, repeatType: "loop" }}
      />
      {/* Document header line */}
      <motion.rect
        x={60} y={40} width={100} height={6} rx={3}
        fill="var(--color-navy-light)"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
        style={{ transformOrigin: "60px 43px" }}
      />
      {/* Clause lines with highlight sweep */}
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          {/* Highlight bar */}
          <motion.rect
            x={60} y={70 + i * 36} width={120} height={16} rx={4}
            fill="var(--color-navy-light)"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.15, 0.15, 0], scaleX: [0, 1, 1, 1] }}
            transition={{
              delay: 1.0 + i * 0.5,
              duration: 1.2,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity,
              repeatDelay: LOOP_DURATION - 1.2,
              repeatType: "loop",
            }}
            style={{ transformOrigin: `60px ${78 + i * 36}px` }}
          />
          {/* Text line */}
          <motion.rect
            x={60} y={73 + i * 36} width={120 - i * 10} height={4} rx={2}
            fill="var(--color-silver)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 + i * 0.5, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
          />
          <motion.rect
            x={60} y={81 + i * 36} width={90 - i * 5} height={3} rx={1.5}
            fill="var(--color-border)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 + i * 0.5, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
          />
        </React.Fragment>
      ))}
      {/* Risk analysis badge */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.2, duration: 0.5, type: "spring", repeat: Infinity, repeatDelay: LOOP_DURATION - 0.5, repeatType: "loop" }}
        style={{ transformOrigin: "310px 210px" }}
      >
        <rect x={240} y={190} width={140} height={44} rx={10} fill="var(--color-navy-light)" opacity={0.12} />
        <rect x={256} y={204} width={60} height={6} rx={3} fill="var(--color-navy-light)" />
        <rect x={256} y={216} width={40} height={4} rx={2} fill="var(--color-silver)" />
        <circle cx={356} cy={212} r={10} fill="var(--color-navy-light)" opacity={0.2} />
        {/* Checkmark in badge */}
        <motion.path
          d="M352 212l3 3 6-6"
          stroke="var(--color-navy-light)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.5, duration: 0.4, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.4, repeatType: "loop" }}
        />
      </motion.g>
    </motion.svg>
  );
}

/** Commercialisti: invoices cascade, extracted data table appears */
function CommercialistiAnimation() {
  return (
    <motion.svg viewBox="0 0 400 280" className="w-full h-full" fill="none">
      {/* Invoice rectangles cascading */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g key={i}>
          <motion.rect
            x={260} y={20 + i * 48} width={80} height={36} rx={6}
            fill="var(--color-surface)"
            stroke="var(--color-border)"
            strokeWidth={1.5}
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 260, opacity: 1 }}
            transition={{
              delay: 0.3 + i * 0.35,
              duration: 0.5,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: LOOP_DURATION - 0.5,
              repeatType: "loop",
            }}
          />
          {/* Small lines on each invoice */}
          <motion.rect
            x={272} y={30 + i * 48} width={40} height={4} rx={2}
            fill="var(--color-silver)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.35, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
          <motion.rect
            x={272} y={38 + i * 48} width={28} height={3} rx={1.5}
            fill="var(--color-border)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 + i * 0.35, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
          {/* Extracted data row */}
          <motion.rect
            x={30} y={24 + i * 48} width={200} height={32} rx={6}
            fill="var(--color-navy-light)"
            opacity={0.06}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.06, scaleX: 1 }}
            transition={{
              delay: 0.9 + i * 0.35,
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: LOOP_DURATION - 0.4,
              repeatType: "loop",
            }}
            style={{ transformOrigin: `130px ${40 + i * 48}px` }}
          />
          {/* Data fields */}
          <motion.rect
            x={42} y={33 + i * 48} width={60} height={5} rx={2.5}
            fill="var(--color-navy-light)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.0 + i * 0.35, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
          />
          <motion.rect
            x={112} y={33 + i * 48} width={40} height={5} rx={2.5}
            fill="var(--color-silver)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 + i * 0.35, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
          />
          <motion.rect
            x={162} y={33 + i * 48} width={50} height={5} rx={2.5}
            fill="var(--color-navy-light)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.15 + i * 0.35, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
          />
          {/* Arrow connecting invoice to data */}
          <motion.line
            x1={258} y1={38 + i * 48} x2={232} y2={38 + i * 48}
            stroke="var(--color-silver)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 + i * 0.35, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

/** Odontoiatri: calendar grid, appointments fill in, notifications slide in */
function OdontoiatriAnimation() {
  const dots: { row: number; col: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      dots.push({ row: r, col: c });
    }
  }

  const appointments = [
    { col: 0, row: 0, h: 1.5 },
    { col: 1, row: 1, h: 1 },
    { col: 2, row: 0, h: 2 },
    { col: 0, row: 2, h: 1 },
    { col: 1, row: 2.5, h: 1.5 },
    { col: 2, row: 2.5, h: 1 },
  ];

  return (
    <motion.svg viewBox="0 0 400 280" className="w-full h-full" fill="none">
      {/* Calendar grid dots */}
      {dots.map((d, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={60 + d.col * 70}
          cy={40 + d.row * 56}
          r={3}
          fill="var(--color-silver)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{
            delay: 0.1 + i * 0.04,
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: LOOP_DURATION - 0.3,
            repeatType: "loop",
          }}
        />
      ))}
      {/* Calendar grid lines */}
      {[0, 1, 2].map((c) => (
        <motion.line
          key={`vline-${c}`}
          x1={60 + c * 70}
          y1={30}
          x2={60 + c * 70}
          y2={220}
          stroke="var(--color-border)"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
        />
      ))}
      {/* Appointment blocks */}
      {appointments.map((a, i) => (
        <motion.rect
          key={`apt-${i}`}
          x={40 + a.col * 70}
          y={40 + a.row * 56}
          width={40}
          height={a.h * 36}
          rx={6}
          fill="var(--color-navy-light)"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.2, scaleY: 1 }}
          transition={{
            delay: 1.0 + i * 0.3,
            duration: 0.4,
            repeat: Infinity,
            repeatDelay: LOOP_DURATION - 0.4,
            repeatType: "loop",
          }}
          style={{ transformOrigin: `${60 + a.col * 70}px ${40 + a.row * 56}px` }}
        />
      ))}
      {/* Notification toasts */}
      {[0, 1, 2].map((i) => (
        <motion.g key={`toast-${i}`}>
          <motion.rect
            x={280}
            y={50 + i * 60}
            width={110}
            height={40}
            rx={8}
            fill="var(--color-surface)"
            stroke="var(--color-border)"
            strokeWidth={1}
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 280, opacity: 1 }}
            transition={{
              delay: 3.0 + i * 0.35,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              repeat: Infinity,
              repeatDelay: LOOP_DURATION - 0.5,
              repeatType: "loop",
            }}
          />
          <motion.rect
            x={292} y={60 + i * 60} width={50} height={5} rx={2.5}
            fill="var(--color-navy-light)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 3.3 + i * 0.35, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
          <motion.rect
            x={292} y={70 + i * 60} width={70} height={3} rx={1.5}
            fill="var(--color-silver)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.35 + i * 0.35, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

/** Consulenti del Lavoro: form draws, fields fill, checkmarks appear */
function ConsulentiAnimation() {
  const fields = [
    { y: 70, w: 200 },
    { y: 110, w: 180 },
    { y: 150, w: 210 },
    { y: 190, w: 160 },
  ];

  return (
    <motion.svg viewBox="0 0 400 280" className="w-full h-full" fill="none">
      {/* Form outline draws */}
      <motion.rect
        x={60} y={20} width={280} height={240} rx={12}
        stroke="var(--color-border)"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", repeat: Infinity, repeatDelay: LOOP_DURATION - 1.0, repeatType: "loop" }}
      />
      {/* Form title */}
      <motion.rect
        x={90} y={36} width={120} height={8} rx={4}
        fill="var(--color-navy-light)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
      />
      {/* Fields */}
      {fields.map((f, i) => (
        <React.Fragment key={i}>
          {/* Field label */}
          <motion.rect
            x={90} y={f.y} width={60} height={5} rx={2.5}
            fill="var(--color-silver)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.4, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
          {/* Field box */}
          <motion.rect
            x={90} y={f.y + 10} width={f.w} height={24} rx={6}
            stroke="var(--color-border)"
            strokeWidth={1.5}
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.4, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
          {/* Fill bar */}
          <motion.rect
            x={94} y={f.y + 14} width={f.w - 8} height={16} rx={4}
            fill="var(--color-navy-light)"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.12, scaleX: 1 }}
            transition={{
              delay: 1.5 + i * 0.4,
              duration: 0.5,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: LOOP_DURATION - 0.5,
              repeatType: "loop",
            }}
            style={{ transformOrigin: `94px ${f.y + 22}px` }}
          />
          {/* Checkmark */}
          <motion.path
            d={`M${90 + f.w + 16} ${f.y + 20}l4 4 8-8`}
            stroke="var(--color-navy-light)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: 2.2 + i * 0.4,
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: LOOP_DURATION - 0.4,
              repeatType: "loop",
            }}
          />
        </React.Fragment>
      ))}
    </motion.svg>
  );
}

/** Architetti/Ingegneri: blueprint draws, dimension lines extend, permit stamp scales in */
function ArchitettiAnimation() {
  return (
    <motion.svg viewBox="0 0 400 280" className="w-full h-full" fill="none">
      {/* Blueprint rectangle outline */}
      <motion.rect
        x={40} y={30} width={220} height={200} rx={4}
        stroke="var(--color-navy-light)"
        strokeWidth={2}
        fill="none"
        strokeDasharray="6 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: LOOP_DURATION - 1.2, repeatType: "loop" }}
      />
      {/* Inner structure lines */}
      <motion.line
        x1={40} y1={130} x2={260} y2={130}
        stroke="var(--color-silver)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.0, duration: 0.5, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.5, repeatType: "loop" }}
      />
      <motion.line
        x1={150} y1={30} x2={150} y2={230}
        stroke="var(--color-silver)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 0.5, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.5, repeatType: "loop" }}
      />
      {/* Dimension line: horizontal top */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.4, repeatType: "loop" }}
      >
        <line x1={40} y1={16} x2={260} y2={16} stroke="var(--color-navy-light)" strokeWidth={1} />
        <line x1={40} y1={12} x2={40} y2={20} stroke="var(--color-navy-light)" strokeWidth={1} />
        <line x1={260} y1={12} x2={260} y2={20} stroke="var(--color-navy-light)" strokeWidth={1} />
        <rect x={125} y={8} width={50} height={14} rx={3} fill="var(--color-surface)" />
        <rect x={133} y={12} width={34} height={5} rx={2.5} fill="var(--color-navy-light)" opacity={0.5} />
      </motion.g>
      {/* Dimension line: vertical right */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.4, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.4, repeatType: "loop" }}
      >
        <line x1={274} y1={30} x2={274} y2={230} stroke="var(--color-navy-light)" strokeWidth={1} />
        <line x1={270} y1={30} x2={278} y2={30} stroke="var(--color-navy-light)" strokeWidth={1} />
        <line x1={270} y1={230} x2={278} y2={230} stroke="var(--color-navy-light)" strokeWidth={1} />
        <rect x={266} y={120} width={16} height={24} rx={3} fill="var(--color-surface)" />
        <rect x={269} y={128} width={10} height={5} rx={2.5} fill="var(--color-navy-light)" opacity={0.5} />
      </motion.g>
      {/* Permit stamp circle */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.2, duration: 0.6, type: "spring", stiffness: 200, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.6, repeatType: "loop" }}
        style={{ transformOrigin: "340px 200px" }}
      >
        <circle cx={340} cy={200} r={36} stroke="var(--color-navy-light)" strokeWidth={2.5} fill="var(--color-surface)" opacity={0.9} />
        <circle cx={340} cy={200} r={28} stroke="var(--color-navy-light)" strokeWidth={1} fill="none" opacity={0.4} />
        <rect x={320} y={193} width={40} height={5} rx={2.5} fill="var(--color-navy-light)" opacity={0.6} />
        <rect x={326} y={203} width={28} height={4} rx={2} fill="var(--color-silver)" />
      </motion.g>
    </motion.svg>
  );
}

/** Geometri: map outline, pins drop, connection lines draw */
function GeometriAnimation() {
  const pins = [
    { x: 100, y: 80 },
    { x: 220, y: 60 },
    { x: 260, y: 180 },
    { x: 120, y: 200 },
  ];

  return (
    <motion.svg viewBox="0 0 400 280" className="w-full h-full" fill="none">
      {/* Map shape outline */}
      <motion.path
        d="M60 40 L300 30 L320 240 L80 250 Z"
        stroke="var(--color-border)"
        strokeWidth={2}
        fill="var(--color-surface)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: LOOP_DURATION - 1.2, repeatType: "loop" }}
      />
      {/* Subtle inner contour lines */}
      <motion.path
        d="M100 100 Q180 80 240 120 Q280 150 260 200"
        stroke="var(--color-silver)"
        strokeWidth={1}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ delay: 1.0, duration: 0.6, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.6, repeatType: "loop" }}
      />
      <motion.path
        d="M90 160 Q140 140 200 160 Q260 180 280 220"
        stroke="var(--color-silver)"
        strokeWidth={1}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.25 }}
        transition={{ delay: 1.2, duration: 0.6, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.6, repeatType: "loop" }}
      />
      {/* Pins dropping */}
      {pins.map((p, i) => (
        <motion.g key={`pin-${i}`}>
          {/* Pin body */}
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={8}
            fill="var(--color-navy-light)"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{
              delay: 1.6 + i * 0.4,
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 15,
              repeat: Infinity,
              repeatDelay: LOOP_DURATION - 0.5,
              repeatType: "loop",
            }}
          />
          {/* Pin inner dot */}
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={3}
            fill="var(--color-surface)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.4, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
        </motion.g>
      ))}
      {/* Connection lines between pins */}
      {[
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
      ].map(([a, b], i) => (
        <motion.line
          key={`conn-${i}`}
          x1={pins[a].x}
          y1={pins[a].y}
          x2={pins[b].x}
          y2={pins[b].y}
          stroke="var(--color-navy-light)"
          strokeWidth={1.5}
          strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{
            delay: 3.4 + i * 0.25,
            duration: 0.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: LOOP_DURATION - 0.5,
            repeatType: "loop",
          }}
        />
      ))}
      {/* Label boxes near some pins */}
      {[0, 2].map((idx) => (
        <motion.g key={`label-${idx}`}>
          <motion.rect
            x={pins[idx].x + 14}
            y={pins[idx].y - 10}
            width={44}
            height={18}
            rx={4}
            fill="var(--color-surface)"
            stroke="var(--color-border)"
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 + idx * 0.15, duration: 0.3, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.3, repeatType: "loop" }}
          />
          <motion.rect
            x={pins[idx].x + 20}
            y={pins[idx].y - 4}
            width={28}
            height={4}
            rx={2}
            fill="var(--color-navy-light)"
            opacity={0.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.9 + idx * 0.15, duration: 0.2, repeat: Infinity, repeatDelay: LOOP_DURATION - 0.2, repeatType: "loop" }}
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

/* ---------- Animation map ---------- */

const SIMULATION_ANIMATIONS: Record<string, React.FC> = {
  avvocati: AvvocatiAnimation,
  commercialisti: CommercialistiAnimation,
  odontoiatri: OdontoiatriAnimation,
  "consulenti-del-lavoro": ConsulentiAnimation,
  "architetti-ingegneri": ArchitettiAnimation,
  geometri: GeometriAnimation,
};

/* ---------- Main component ---------- */

export function AISimulation() {
  const { t } = useLocale();
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const selectedProfession =
    selectedIndex !== null ? PROFESSIONS[selectedIndex] : null;

  const SimulationComponent = selectedProfession
    ? SIMULATION_ANIMATIONS[selectedProfession.slug]
    : null;

  const simulationLabel = selectedProfession
    ? (t.simulation.simulationLabels as Record<string, string>)[
        selectedProfession.slug
      ]
    : null;

  return (
    <Section variant="cream">
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-navy"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.simulation.heading}
        </motion.h2>
        <motion.p
          className="mt-3 text-lg text-silver"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.simulation.selectProfession}
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {selectedIndex === null ? (
          /* ---------- Phase A: Profession selector ---------- */
          <motion.div
            key="phase-a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {PROFESSIONS.map((profession, index) => {
                const card = t.simulation.cards[index];
                return (
                  <motion.button
                    key={profession.slug}
                    variants={gridItem}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setSelectedIndex(index)}
                    className="card-base text-left flex items-start gap-4 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy-light/[0.08] flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-navy-light"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {profession.iconPaths.map((d, pi) => (
                          <path key={pi} d={d} />
                        ))}
                      </svg>
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <span className="block text-base font-semibold text-navy group-hover:text-navy-light transition-colors">
                        {card?.title}
                      </span>
                      <span className="block mt-1 text-sm text-silver leading-snug">
                        {card?.tagline}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          /* ---------- Phase B: Simulation panel ---------- */
          <motion.div
            key="phase-b"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Back button */}
            <motion.button
              onClick={() => setSelectedIndex(null)}
              className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-navy-muted hover:text-navy transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-md px-2 py-1 -ml-2"
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              <span>
                {t.simulation.selectProfession}
              </span>
            </motion.button>

            {/* Selected profession title + label */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-navy-light/[0.08] flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-navy-light"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {selectedProfession!.iconPaths.map((d, pi) => (
                      <path key={pi} d={d} />
                    ))}
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-navy">
                  {t.simulation.cards[selectedIndex]?.title}
                </h3>
              </div>
              {simulationLabel && (
                <p className="text-sm text-silver max-w-2xl leading-relaxed">
                  {simulationLabel}
                </p>
              )}
            </div>

            {/* Simulation visualization panel */}
            <div className="rounded-xl bg-navy/[0.03] border border-border min-h-[400px] flex items-center justify-center overflow-hidden">
              {SimulationComponent && (
                <div className="w-full max-w-lg p-6">
                  <SimulationComponent />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
