import { Hero } from "@/components/sections/hero";
import { AISimulation } from "@/components/sections/ai-simulation";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { Divider } from "@/components/ui/divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Divider className="text-white bg-surface-light -mt-px" />
      <section id="ai-simulation">
        <AISimulation />
      </section>
      <Divider className="text-surface bg-white" />
      <ROICalculator />
      <Divider className="text-white bg-surface" flip />
      <Process />
      <Divider className="text-white bg-white" flip />
      <CTA />
    </>
  );
}
