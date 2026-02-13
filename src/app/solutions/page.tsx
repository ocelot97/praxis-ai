"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Solution {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  pricing: string;
}

const standardizedSolutions: Solution[] = [
  {
    id: "customer-agents",
    title: "AI Customer Agents",
    tagline: "24/7 intelligent customer service",
    description:
      "Deploy AI-powered customer service agents that understand context, speak 50+ languages, and integrate seamlessly with your existing systems.",
    features: [
      "Multi-language support (50+ languages)",
      "CRM integration",
      "Self-learning from interactions",
      "Sentiment analysis",
      "Voice and text support",
    ],
    useCases: [
      "E-commerce support",
      "Appointment scheduling",
      "FAQ automation",
      "Order tracking",
    ],
    pricing: "From $499/month",
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence",
    tagline: "Automated data extraction",
    description:
      "Extract structured data from unstructured documents with industry-leading accuracy. Process invoices, contracts, forms, and more at scale.",
    features: [
      "95%+ accuracy guarantee",
      "Supports PDFs, images, and scans",
      "Custom field extraction",
      "Validation rules",
      "API and batch processing",
    ],
    useCases: [
      "Invoice processing",
      "Contract analysis",
      "Form digitization",
      "Compliance checks",
    ],
    pricing: "From $299/month",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    tagline: "No-code AI-powered processes",
    description:
      "Build intelligent workflows that automate repetitive tasks, route decisions, and orchestrate complex business processes without writing code.",
    features: [
      "Visual workflow builder",
      "Pre-built templates",
      "1000+ app integrations",
      "AI decision nodes",
      "Real-time monitoring",
    ],
    useCases: [
      "Lead routing",
      "Data synchronization",
      "Report generation",
      "Approval workflows",
    ],
    pricing: "From $399/month",
  },
  {
    id: "knowledge-systems",
    title: "Knowledge Systems",
    tagline: "AI-powered internal search",
    description:
      "Transform your organization's knowledge base into an intelligent search system. Get instant answers from documents, wikis, and internal resources.",
    features: [
      "Semantic search across all sources",
      "Auto-generated FAQs",
      "Multi-source ingestion",
      "Access control",
      "Query analytics",
    ],
    useCases: [
      "Internal wiki",
      "Support documentation",
      "Onboarding assistant",
      "Policy lookup",
    ],
    pricing: "From $599/month",
  },
];

interface CustomSolution {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const customSolutions: CustomSolution[] = [
  {
    title: "Custom AI Agents",
    icon: (
      <div className="w-12 h-12 text-terracotta mb-4">
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
        </svg>
      </div>
    ),
    description: "Autonomous agents designed for your specific business processes and workflows",
  },
  {
    title: "Predictive Analytics",
    icon: (
      <div className="w-12 h-12 text-terracotta mb-4">
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      </div>
    ),
    description: "Machine learning models for forecasting, anomaly detection, and business intelligence",
  },
  {
    title: "System Integration",
    icon: (
      <div className="w-12 h-12 text-terracotta mb-4">
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </div>
    ),
    description: "Add an intelligent AI layer on top of your existing ERP, CRM, or custom systems",
  },
  {
    title: "Industry-Specific AI",
    icon: (
      <div className="w-12 h-12 text-terracotta mb-4">
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M12 3v3" />
        </svg>
      </div>
    ),
    description: "Specialized solutions for healthcare, finance, retail, manufacturing, and more",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="cream">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-caveat)] font-bold text-charcoal mb-6">
            AI Solutions for Every Business
          </h1>
          <p className="text-xl md:text-2xl font-sans text-mid leading-relaxed">
            From ready-to-deploy standardized solutions to fully custom AI systems,
            we help businesses of all sizes leverage artificial intelligence.
          </p>
        </motion.div>
      </Section>

      {/* Standardized Solutions Section */}
      <Section variant="white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-charcoal mb-4">
              Standardized Solutions
            </h2>
            <p className="text-lg md:text-xl font-sans text-mid max-w-3xl mx-auto">
              Production-ready AI solutions that can be deployed in days, not months
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {standardizedSolutions.map((solution) => (
              <motion.div key={solution.id} variants={fadeInUp} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="mb-2">{solution.title}</CardTitle>
                    <p className="text-lg font-sans italic text-terracotta">
                      {solution.tagline}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-6">
                    <CardDescription className="text-base">
                      {solution.description}
                    </CardDescription>

                    <div>
                      <h4 className="text-sm font-sans font-semibold text-charcoal mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm font-sans text-mid"
                          >
                            <svg
                              className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-sans font-semibold text-charcoal mb-3">
                        Use Cases
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {solution.useCases.map((useCase, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 rounded-full bg-cream text-sm font-sans text-charcoal"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-lg font-sans font-semibold text-terracotta">
                        {solution.pricing}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/contact" className="w-full">
                      <Button className="w-full">Request Demo</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Custom Solutions Section */}
      <Section variant="cream">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-charcoal mb-4">
              Custom Solutions
            </h2>
            <p className="text-lg md:text-xl font-sans text-mid max-w-3xl mx-auto">
              Tailored AI systems designed specifically for your unique business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {customSolutions.map((solution, idx) => (
              <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full">
                  <CardHeader>
                    {solution.icon}
                    <CardTitle>{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {solution.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center" variants={fadeInUp}>
            <Link href="/contact">
              <Button size="lg">Talk to Our Team</Button>
            </Link>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  );
}
