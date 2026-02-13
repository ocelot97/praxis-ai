import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";

const footerLinks = {
  solutions: [
    { label: "AI Customer Agents", href: "/solutions#customer-agents" },
    { label: "Document Intelligence", href: "/solutions#document-intelligence" },
    { label: "Workflow Automation", href: "/solutions#workflow-automation" },
    { label: "Knowledge Systems", href: "/solutions#knowledge-systems" },
  ],
  company: [
    { label: "All Solutions", href: "/solutions" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="section-container py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-charcoal-light">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="transition-all duration-300 group-hover:opacity-80 rounded-2xl">
                <LogoMark className="text-terracotta" />
              </div>
              <span className="text-xl font-sans font-semibold">
                <span className="font-[family-name:var(--font-caveat)] text-2xl">Praxis</span>{" "}
                AI
              </span>
            </Link>
            <p className="text-sm font-sans text-gray-400 max-w-xs">
              Transforming businesses through intelligent AI solutions. From strategy to implementation, we bring your AI vision to life.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-base font-sans font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-gray-400 hover:text-terracotta transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-sans font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-gray-400 hover:text-terracotta transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-sans text-gray-400">
            &copy; {currentYear} Praxis AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm font-sans text-gray-400 hover:text-terracotta transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm font-sans text-gray-400 hover:text-terracotta transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
