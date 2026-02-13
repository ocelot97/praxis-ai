"use client";

import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer className="bg-charcoal text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-charcoal-light">
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
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-base font-sans font-semibold mb-4">{t.footer.solutionsHeading}</h3>
            <ul className="space-y-3">
              {t.footer.solutionLinks.map((link) => (
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

          <div>
            <h3 className="text-base font-sans font-semibold mb-4">{t.footer.companyHeading}</h3>
            <ul className="space-y-3">
              {t.footer.companyLinks.map((link) => (
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

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-sans text-gray-400">
            &copy; {currentYear} {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm font-sans text-gray-400 hover:text-terracotta transition-colors duration-300"
            >
              {t.footer.privacyPolicy}
            </Link>
            <Link
              href="/terms"
              className="text-sm font-sans text-gray-400 hover:text-terracotta transition-colors duration-300"
            >
              {t.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
