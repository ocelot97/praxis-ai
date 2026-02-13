import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { SolutionsShowcase } from "@/components/sections/solutions-showcase";
import { CTA } from "@/components/sections/cta";
import { Divider } from "@/components/ui/divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Divider className="text-white bg-cream-light -mt-px" />
      <Services />
      <Divider className="text-cream bg-white" />
      <Process />
      <Divider className="text-white bg-cream" flip />
      <SolutionsShowcase />
      <Divider className="text-white bg-white" flip />
      <CTA />
    </>
  );
}
