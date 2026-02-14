import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Solutions - Praxis AI",
  description:
    "Explore our standardized and custom AI solutions: customer agents, document intelligence, workflow automation, and knowledge systems.",
  openGraph: {
    title: "AI Solutions - Praxis AI",
    description:
      "Explore our standardized and custom AI solutions for every business need.",
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
