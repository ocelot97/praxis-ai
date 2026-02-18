export interface Profession {
  slug: string;
  demoSlug: string;
  /** SVG path data for a 24x24 viewBox icon */
  iconPaths: string[];
}

export const PROFESSIONS: Profession[] = [
  {
    slug: "avvocati",
    demoSlug: "customer-agents",
    // Scale of justice: balance beam with two pans and a center pillar
    iconPaths: [
      "M12 3v18",
      "M3 21h18",
      "M8 21v-2",
      "M16 21v-2",
      "M12 3l-6 5",
      "M12 3l6 5",
      "M6 8a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2z",
      "M22 8a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2z",
    ],
  },
  {
    slug: "commercialisti",
    demoSlug: "document-intelligence",
    // Ledger / accounting document with ruled lines and a column of numbers
    iconPaths: [
      "M4 2h12l4 4v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z",
      "M14 2v4h4",
      "M7 10h10",
      "M7 14h10",
      "M7 18h6",
    ],
  },
  {
    slug: "consulenti-del-lavoro",
    demoSlug: "workflow-automation",
    // Briefcase with a centered latch — employment / HR consulting
    iconPaths: [
      "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z",
      "M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
      "M12 12v4",
      "M10 14h4",
    ],
  },
  {
    slug: "odontoiatri",
    demoSlug: "knowledge-systems",
    // Tooth: rounded crown with two roots
    iconPaths: [
      "M12 2C9 2 7 4 7 7c0 2 1 4 1 6 0 3 1 6 2 7 .5 1 1.5 1 2 0 .5-1 1-3 1-3s.5 3 1 3c.5 0 1.5 0 2-1 1-1 2-4 2-7 0-2 1-4 1-6 0-3-2-5-5-5z",
    ],
  },
  {
    slug: "architetti-ingegneri",
    demoSlug: "email-strategist",
    // Blueprint / building elevation: ground line, structure with a gabled roof, interior window
    iconPaths: [
      "M2 22h20",
      "M6 22V10l6-7 6 7v12",
      "M10 22v-5h4v5",
      "M10 13h4",
    ],
  },
  {
    slug: "geometri",
    demoSlug: "email-designer",
    // Surveyor's theodolite / total station: tripod legs, instrument head, sight line
    iconPaths: [
      "M12 4a3 3 0 100 6 3 3 0 000-6z",
      "M12 10v2",
      "M9 13l-4 8",
      "M15 13l4 8",
      "M7 21h10",
      "M12 7h5",
    ],
  },
];

export function getProfession(slug: string): Profession | undefined {
  return PROFESSIONS.find((p) => p.slug === slug);
}

export function getProfessionByDemoSlug(
  demoSlug: string
): Profession | undefined {
  return PROFESSIONS.find((p) => p.demoSlug === demoSlug);
}

export const PROFESSION_SLUGS = PROFESSIONS.map((p) => p.slug);
