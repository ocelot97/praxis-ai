"use client";

import { useLocale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "it" ? "en" : "it")}
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm font-sans font-medium text-navy hover:bg-navy/5 transition-colors duration-200"
      aria-label={locale === "it" ? "Switch to English" : "Passa all'italiano"}
    >
      <span className={locale === "it" ? "opacity-100" : "opacity-40"}>IT</span>
      <span className="text-navy/30">/</span>
      <span className={locale === "en" ? "opacity-100" : "opacity-40"}>EN</span>
    </button>
  );
}
