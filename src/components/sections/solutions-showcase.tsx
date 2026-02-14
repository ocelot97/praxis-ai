"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useLocale } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function SolutionsShowcase() {
  const { t } = useLocale();

  return (
    <Section variant="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-charcoal">
          {t.solutionsShowcase.heading}
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {t.solutionsShowcase.items.map((solution, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full hover:shadow-soft-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription>{solution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {solution.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-sans text-mid">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <Link href="/solutions">
          <Button variant="outline" size="lg">
            {t.solutionsShowcase.viewAll}
          </Button>
        </Link>
      </div>
    </Section>
  );
}
