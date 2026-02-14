"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";
import { VideoBackground } from "@/components/ui/video-background";
import { useLocale } from "@/lib/i18n";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  const { t } = useLocale();

  return (
    <main>
      <Section
        variant="cream"
        background={
          <VideoBackground
            webm="/videos/neural-flow.webm"
            mp4="/videos/neural-flow.mp4"
            poster="/videos/neural-flow-poster.jpeg"
            overlay="bg-cream/30"
          />
        }
      >
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-caveat)] font-bold text-charcoal mb-6">
            {t.contactPage.title}
          </h1>
          <p className="text-xl md:text-2xl font-sans text-mid leading-relaxed">
            {t.contactPage.subtitle}
          </p>
        </motion.div>
      </Section>

      <Section variant="white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </Section>
    </main>
  );
}
