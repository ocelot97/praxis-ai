"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { NeuralFlowBg } from "@/components/ui/animated-background";
import { useLocale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface PainPoint {
  title: string;
  description: string;
}

interface Solution {
  title: string;
  description: string;
  features: string[];
}

interface ProfessionData {
  title: string;
  headline: string;
  subtitle: string;
  painPoints: PainPoint[];
  solutions: Solution[];
  demoIntro: string;
  demoCta: string;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ProfessionPage({ slug }: { slug: string }) {
  const { t } = useLocale();

  // Type-safe bracket access — translations are keyed by slug at runtime
  const professionData = (t.professions as Record<string, ProfessionData>)[slug];

  // Graceful fallback if the slug is somehow missing from translations
  if (!professionData) {
    return null;
  }

  const {
    headline,
    subtitle,
    painPoints,
    solutions,
    demoIntro,
    demoCta,
  } = professionData;

  return (
    <main>
      {/* ============================================================ */}
      {/* 1. Hero                                                        */}
      {/* ============================================================ */}
      <Section
        variant="default"
        background={<NeuralFlowBg overlay="bg-surface/60" />}
      >
        <motion.div
          className="text-center max-w-4xl mx-auto py-8 md:py-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-caveat)] font-bold text-navy mb-6 leading-tight"
          >
            {headline}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl font-sans text-navy-muted leading-relaxed max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="/demo/login">
              <Button size="lg" variant="default">
                Prova la Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contattaci
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Section>

      {/* Divider: surface → white */}
      <Divider className="text-white bg-surface" />

      {/* ============================================================ */}
      {/* 2. Pain Points                                                 */}
      {/* ============================================================ */}
      <Section variant="white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Section heading */}
          <motion.div className="text-center mb-14" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy mb-4">
              Le Sfide del Tuo Studio
            </h2>
            <p className="text-lg md:text-xl font-sans text-silver max-w-3xl mx-auto">
              Riconosciamo le difficolta quotidiane che rallentano il tuo lavoro
              professionale.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {painPoints.map((point, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <Card className="h-full flex flex-col border-border hover:border-navy-muted/30 hover:shadow-soft-md transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-dark flex items-center justify-center">
                        <WarningIcon className="w-5 h-5 text-navy-muted" />
                      </div>
                      <CardTitle className="text-xl leading-snug">
                        {point.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-base leading-relaxed">
                      {point.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Divider: white → surface */}
      <Divider className="text-surface bg-white" flip />

      {/* ============================================================ */}
      {/* 3. AI Solutions                                                */}
      {/* ============================================================ */}
      <Section variant="default">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Section heading */}
          <motion.div className="text-center mb-14" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy mb-4">
              Le Nostre Soluzioni AI
            </h2>
            <p className="text-lg md:text-xl font-sans text-silver max-w-3xl mx-auto">
              Strumenti intelligenti costruiti specificamente per le esigenze del
              tuo studio professionale.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <Card className="h-full flex flex-col bg-white border-border hover:border-navy-light/30 hover:shadow-soft-md transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center">
                        <SparkleIcon className="w-5 h-5 text-navy-light" />
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-snug">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 flex-1 flex flex-col gap-4">
                    <CardDescription className="text-base leading-relaxed">
                      {solution.description}
                    </CardDescription>

                    {/* Features checklist */}
                    <ul className="space-y-2 mt-auto pt-2">
                      {solution.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-sm font-sans text-navy-muted"
                        >
                          <CheckIcon className="w-4 h-4 text-navy-light flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Divider: surface → white */}
      <Divider className="text-white bg-surface" />

      {/* ============================================================ */}
      {/* 4. Demo CTA                                                    */}
      {/* ============================================================ */}
      <Section variant="white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-dark flex items-center justify-center">
              <SparkleIcon className="w-6 h-6 text-navy-light" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-sans font-bold text-navy mb-6 leading-tight"
          >
            {demoCta}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl font-sans text-silver leading-relaxed mb-10"
          >
            {demoIntro}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/demo/login">
              <Button size="lg" variant="default">
                Prova la Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contattaci
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  );
}
