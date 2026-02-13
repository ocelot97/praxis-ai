"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

/**
 * Floating decorative shapes that drift slowly within the CTA card.
 * White shapes at low opacity over the terracotta gradient background.
 */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large slow-drifting circle - top right */}
      <motion.div
        className="absolute top-8 right-12 w-24 h-24 rounded-full border border-white/10"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Medium filled circle - bottom left */}
      <motion.div
        className="absolute bottom-12 left-16 w-16 h-16 rounded-full bg-white/10"
        animate={{
          y: [0, 12, 0],
          x: [0, -6, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Small diamond (rotated square) - mid left */}
      <motion.div
        className="absolute top-1/3 left-[10%] w-6 h-6 bg-white/[0.12] rotate-45"
        animate={{
          y: [0, -10, 0],
          rotate: [45, 55, 45],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Tiny circle - top left */}
      <motion.div
        className="absolute top-16 left-[30%] w-3 h-3 rounded-full bg-white/[0.15]"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Medium diamond - bottom right */}
      <motion.div
        className="absolute bottom-20 right-[20%] w-5 h-5 bg-white/10 rotate-45"
        animate={{
          y: [0, -12, 0],
          rotate: [45, 35, 45],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Large ring - center offset */}
      <motion.div
        className="absolute top-1/2 right-[35%] w-32 h-32 rounded-full border border-white/[0.06]"
        animate={{
          y: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Small dot cluster */}
      <motion.div
        className="absolute top-12 left-[55%] w-2 h-2 rounded-full bg-white/[0.15]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div
        className="absolute top-20 left-[58%] w-1.5 h-1.5 rounded-full bg-white/[0.12]"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      {/* Soft blurred background circles for depth */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
    </div>
  );
}

export function CTA() {
  return (
    <Section variant="white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta to-terracotta-light p-12 md:p-16 lg:p-20"
      >
        {/* Animated floating decorative shapes */}
        <FloatingShapes />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl font-sans text-white/90 mb-8">
            Let&apos;s discuss how AI can drive efficiency and innovation in your
            organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="relative inline-block">
              {/* Pulsing glow ring behind the button */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.15, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Button variant="secondary" size="lg" className="relative z-10">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-terracotta"
              >
                Browse Solutions
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
