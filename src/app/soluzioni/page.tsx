"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { NeuralFlowBg } from "@/components/ui/animated-background";
import { PROFESSIONS } from "@/lib/professions";
import { useLocale } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function SoluzioniPage() {
  const { t } = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface min-h-[40vh] flex items-center">
        <NeuralFlowBg overlay="bg-surface/30" />
        <div className="section-container relative z-10 py-20 md:py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-caveat)] font-bold text-navy leading-tight"
          >
            {t.soluzioniHub.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl font-sans text-silver max-w-2xl mx-auto leading-relaxed"
          >
            {t.soluzioniHub.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Profession Cards Grid */}
      <Section variant="white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROFESSIONS.map((profession, index) => {
            const card = t.simulation.cards[index];
            return (
              <motion.div key={profession.slug} variants={cardVariants}>
                <Link href={`/soluzioni/${profession.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-white rounded-xl shadow-soft p-8 border border-border hover:shadow-soft-lg hover:border-navy-light/30 transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-12 h-12 text-navy-light mb-4 flex-shrink-0"
                      aria-hidden="true"
                    >
                      {profession.iconPaths.map((d, pathIndex) => (
                        <path key={pathIndex} d={d} />
                      ))}
                    </svg>

                    {/* Text */}
                    <div className="flex-1">
                      <h2 className="text-xl font-sans font-semibold text-navy mb-2">
                        {card.title}
                      </h2>
                      <p className="text-base font-sans text-silver leading-relaxed">
                        {card.tagline}
                      </p>
                    </div>

                    {/* Link indicator */}
                    <div className="mt-6 flex justify-end">
                      <span className="text-sm font-sans text-navy-light/70 group-hover:text-navy-light transition-colors duration-200">
                        Scopri di piu &rarr;
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>
    </>
  );
}
