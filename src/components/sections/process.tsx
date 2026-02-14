"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { VideoBackground } from "@/components/ui/video-background";
import { useLocale } from "@/lib/i18n";

const stepNumbers = ["01", "02", "03"];

function TimelineCurve() {
  return (
    <svg
      className="absolute left-[39px] md:left-[47px] top-0 h-full w-16 pointer-events-none"
      viewBox="0 0 64 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <motion.path
        d="M32 40 C32 80, 52 120, 52 170 C52 220, 12 260, 12 310 C12 360, 52 400, 52 450 C52 500, 32 540, 32 570"
        stroke="#C15F3C"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <circle cx="32" cy="40" r="2.5" fill="#C15F3C" opacity="0.3" />
      <circle cx="48" cy="130" r="1.5" fill="#C15F3C" opacity="0.2" />
      <circle cx="52" cy="170" r="2" fill="#C15F3C" opacity="0.15" />
      <circle cx="30" cy="240" r="1.5" fill="#C15F3C" opacity="0.2" />
      <circle cx="12" cy="310" r="2" fill="#C15F3C" opacity="0.15" />
      <circle cx="35" cy="380" r="1.5" fill="#C15F3C" opacity="0.2" />
      <circle cx="52" cy="450" r="2" fill="#C15F3C" opacity="0.15" />
      <circle cx="40" cy="520" r="1.5" fill="#C15F3C" opacity="0.2" />
      <circle cx="32" cy="570" r="2.5" fill="#C15F3C" opacity="0.3" />
    </svg>
  );
}

export function Process() {
  const { t } = useLocale();

  return (
    <Section variant="cream" className="relative overflow-hidden">
      <VideoBackground
        webm="/videos/process-weave.webm"
        mp4="/videos/process-weave.mp4"
        poster="/videos/process-weave-poster.jpeg"
        overlay="bg-cream/40"
        className="z-0"
      />
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-charcoal"
        >
          {t.process.heading}
        </motion.h2>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <TimelineCurve />

        {t.process.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative"
          >
            <div className="flex gap-8 items-start pb-16 last:pb-0">
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-terracotta/10" />
                <span className="relative font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold text-terracotta">
                  {stepNumbers[index]}
                </span>
              </div>

              <div className="flex-1 pt-2 md:pt-4">
                <h3 className="text-2xl md:text-3xl font-sans font-semibold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-lg font-sans text-mid leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
