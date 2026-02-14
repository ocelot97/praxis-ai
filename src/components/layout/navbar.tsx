"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLocale } from "@/lib/i18n";

const navLinkHrefs = ["/", "/solutions", "/contact"] as const;

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useLocale();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: navLinkHrefs[0], label: t.nav.home },
    { href: navLinkHrefs[1], label: t.nav.solutions },
    { href: navLinkHrefs[2], label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/95 backdrop-blur-sm border-b border-border">
      <nav className="section-container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div
              className="transition-all duration-300 group-hover:opacity-80 group-hover:shadow-soft-md rounded-2xl"
              style={{ animation: "spin 20s linear infinite" }}
            >
              <LogoMark className="text-terracotta" />
            </div>
            <span className="text-xl font-sans font-semibold text-charcoal">
              <span className="font-[family-name:var(--font-caveat)] text-2xl">Praxis</span>{" "}
              AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-base transition-colors duration-300 hover:text-terracotta",
                  pathname === link.href
                    ? "text-terracotta font-medium"
                    : "text-charcoal"
                )}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link href="/contact">
              <Button size="sm">{t.nav.getStarted}</Button>
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 p-3"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block h-0.5 w-6 bg-charcoal transition-all duration-300",
                isMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-charcoal transition-all duration-300",
                isMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-charcoal transition-all duration-300",
                isMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-72 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "font-sans text-base transition-colors duration-300 hover:text-terracotta",
                  pathname === link.href
                    ? "text-terracotta font-medium"
                    : "text-charcoal"
                )}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link href="/contact" onClick={closeMenu} className="w-full">
              <Button size="sm" className="w-full">{t.nav.getStarted}</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
