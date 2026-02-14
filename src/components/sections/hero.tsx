"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroAmbientBg } from "@/components/ui/animated-background";
import { useLocale } from "@/lib/i18n";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, motionVal]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function HeroIllustration({ parallaxY }: { parallaxY: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ y: parallaxY }}
    >
      <svg
        viewBox="0 0 600 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[-5%] top-[5%] w-[50vw] max-w-[600px] h-auto opacity-100 md:opacity-100"
      >
        <motion.path
          d="M100 600 C150 400, 350 200, 500 50"
          stroke="#C15F3C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M50 500 C200 350, 300 300, 550 150"
          stroke="#C15F3C"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M200 650 C250 500, 400 350, 520 250"
          stroke="#C15F3C"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.path
          d="M450 80 C500 120, 520 200, 480 280 C440 360, 350 380, 300 340 C250 300, 260 230, 310 200 C360 170, 400 190, 410 230"
          stroke="#C15F3C"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.circle cx="480" cy="80" r="4" fill="#C15F3C" opacity="0.3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.2 }} />
        <motion.circle cx="520" cy="120" r="2.5" fill="#C15F3C" opacity="0.2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.4 }} />
        <motion.circle cx="440" cy="140" r="3" fill="#C15F3C" opacity="0.25" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.3 }} />
        <motion.circle cx="350" cy="280" r="5" fill="#C15F3C" opacity="0.15" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.5 }} />
        <motion.circle cx="400" cy="320" r="2" fill="#C15F3C" opacity="0.2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.6 }} />
        <motion.circle cx="300" cy="350" r="3.5" fill="#C15F3C" opacity="0.18" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.7 }} />
        <motion.circle cx="150" cy="500" r="2" fill="#C15F3C" opacity="0.15" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.8 }} />
        <motion.circle cx="250" cy="450" r="3" fill="#C15F3C" opacity="0.12" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.9 }} />
        <motion.circle cx="500" cy="200" r="6" fill="#C15F3C" opacity="0.08" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 2 }} />
        <circle cx="460" cy="100" r="1" fill="#C15F3C" opacity="0.3" />
        <circle cx="380" cy="250" r="1.5" fill="#C15F3C" opacity="0.15" />
        <circle cx="530" cy="180" r="1" fill="#C15F3C" opacity="0.2" />
        <circle cx="200" cy="550" r="1.5" fill="#C15F3C" opacity="0.1" />
        <circle cx="320" cy="400" r="1" fill="#C15F3C" opacity="0.12" />
        <line x1="480" y1="80" x2="520" y2="120" stroke="#C15F3C" strokeWidth="0.5" opacity="0.12" />
        <line x1="520" y1="120" x2="440" y2="140" stroke="#C15F3C" strokeWidth="0.5" opacity="0.1" />
        <line x1="350" y1="280" x2="400" y2="320" stroke="#C15F3C" strokeWidth="0.5" opacity="0.1" />
        <line x1="400" y1="320" x2="300" y2="350" stroke="#C15F3C" strokeWidth="0.5" opacity="0.08" />
        <line x1="440" y1="140" x2="350" y2="280" stroke="#C15F3C" strokeWidth="0.4" opacity="0.06" />
      </svg>

      <motion.div
        className="absolute right-[15%] top-[20%] w-3 h-3 rounded-full bg-terracotta/20"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[25%] top-[60%] w-2 h-2 rounded-full bg-terracotta/15"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-[45%] w-4 h-4 rounded-full bg-terracotta/10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const { t } = useLocale();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-light to-white min-h-[90vh] flex items-center"
    >
      <HeroAmbientBg className="z-0" />

      <div className="absolute top-20 left-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl z-[1]" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-terracotta-light/5 rounded-full blur-3xl z-[1]" />

      <div className="hidden lg:block">
        <HeroIllustration parallaxY={illustrationY} />
      </div>

      <div className="section-container relative z-10 py-20 md:py-28 lg:py-32 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-caveat)] font-bold text-charcoal leading-[1.1]"
            >
              {t.hero.title}{" "}
              <span className="text-terracotta">{t.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg md:text-xl font-sans text-mid max-w-xl leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button size="lg">{t.hero.getStarted}</Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" size="lg">
                  {t.hero.exploreSolutions}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full"
            >
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl font-[family-name:var(--font-caveat)] font-bold text-terracotta">
                  <CountUp target={50} suffix="+" />
                </div>
                <div className="mt-1 text-sm font-sans text-mid">{t.hero.stats.clients}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl font-[family-name:var(--font-caveat)] font-bold text-terracotta">
                  <CountUp target={120} suffix="+" />
                </div>
                <div className="mt-1 text-sm font-sans text-mid">{t.hero.stats.aiProjects}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl font-[family-name:var(--font-caveat)] font-bold text-terracotta">
                  <CountUp target={98} suffix="%" />
                </div>
                <div className="mt-1 text-sm font-sans text-mid">{t.hero.stats.successRate}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl font-[family-name:var(--font-caveat)] font-bold text-terracotta">
                  <CountUp target={10} suffix="K+" />
                </div>
                <div className="mt-1 text-sm font-sans text-mid">{t.hero.stats.hoursSaved}</div>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block flex-1" />
        </div>
      </div>
    </section>
  );
}
