"use client";

import Link from "next/link";
import { Fragment, useState, useMemo, useTransition } from "react";
import { LogoMark } from "@/components/ui/logo";
import { logout } from "../login/actions";
import { updateSubmissionStatus } from "./actions";
import { useLocale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: string | null;
  created_at: string | null;
  context: {
    profession?: string;
    clients?: number;
    weeklyHours?: number;
    hoursSaved?: number;
    monthlySavings?: number;
    demosViewed?: string[];
    demosCompleted?: string[];
    demoProgress?: number;
    timeSpent?: number;
    [key: string]: unknown;
  } | null;
}

const STATUSES = ["new", "contacted", "qualified", "converted", "archived"];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 ring-blue-600/20",
  contacted: "bg-amber-100 text-amber-800 ring-amber-600/20",
  qualified: "bg-purple-100 text-purple-800 ring-purple-600/20",
  converted: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  archived: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

/* ------------------------------------------------------------------ */
/*  Inline keyframes                                                   */
/* ------------------------------------------------------------------ */

const adminKeyframes = `
@keyframes adminFadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes adminPulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.6; }
}
`;

/* ------------------------------------------------------------------ */
/*  Status dropdown                                                    */
/* ------------------------------------------------------------------ */

function StatusSelect({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const { t } = useLocale();
  const [isPending, startTransition] = useTransition();

  const statusLabels: Record<string, string> = {
    new: t.admin.statusNew,
    contacted: t.admin.statusContacted,
    qualified: t.admin.statusQualified,
    converted: t.admin.statusConverted,
    archived: t.admin.statusArchived,
  };

  return (
    <select
      value={currentStatus}
      disabled={isPending}
      onChange={(e) => {
        startTransition(async () => {
          await updateSubmissionStatus(id, e.target.value);
        });
      }}
      className={`text-xs font-sans font-semibold rounded-full px-3 py-2 min-h-[36px] ring-1 ring-inset border-0 cursor-pointer transition-all duration-200 ${STATUS_COLORS[currentStatus] ?? "bg-gray-100 text-gray-600 ring-gray-500/20"} ${isPending ? "opacity-40 animate-pulse" : "hover:shadow-sm"}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {statusLabels[s] ?? s}
        </option>
      ))}
    </select>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat card with icon                                                */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  icon,
  accent,
  delay,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
  delay: number;
}) {
  return (
    <div
      className="card-base flex items-start gap-4 group hover:shadow-soft-md transition-shadow duration-300"
      style={{
        opacity: 0,
        animation: `adminFadeUp 0.5s ease-out ${delay}s forwards`,
      }}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          accent
            ? "bg-navy-light/10 text-navy-light"
            : "bg-navy/[0.06] text-navy/50"
        } transition-colors duration-300 group-hover:bg-navy-light/15 group-hover:text-navy-light`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[11px] font-sans font-medium text-navy-muted/70 uppercase tracking-wider truncate">
          {label}
        </span>
        <span
          className={`text-2xl font-sans font-bold leading-tight ${accent ? "text-navy-light" : "text-navy"}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Expandable row detail                                              */
/* ------------------------------------------------------------------ */

function RowDetail({ submission }: { submission: Submission }) {
  const { t } = useLocale();
  const ctx = submission.context;

  return (
    <tr>
      <td
        colSpan={8}
        className="px-4 py-5 bg-gradient-to-b from-surface-light to-white border-b border-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {/* Message */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg border border-border p-4">
              <p className="text-sm font-sans text-navy/80 whitespace-pre-wrap leading-relaxed">
                {submission.message}
              </p>
            </div>
          </div>

          {ctx && (
            <>
              {/* Profiling context */}
              <div className="bg-white rounded-lg border border-border p-4">
                <h4 className="text-[11px] font-sans font-semibold text-silver uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {t.admin.profilingContext}
                </h4>
                <dl className="space-y-2 text-sm font-sans">
                  {ctx.profession && (
                    <div className="flex justify-between items-center">
                      <dt className="text-silver">{t.admin.profession}</dt>
                      <dd className="text-navy font-medium bg-navy/[0.04] px-2 py-0.5 rounded">
                        {ctx.profession}
                      </dd>
                    </div>
                  )}
                  {ctx.clients != null && (
                    <div className="flex justify-between">
                      <dt className="text-silver">{t.admin.clients}</dt>
                      <dd className="text-navy font-medium tabular-nums">{ctx.clients}</dd>
                    </div>
                  )}
                  {ctx.weeklyHours != null && (
                    <div className="flex justify-between">
                      <dt className="text-silver">{t.admin.weeklyHours}</dt>
                      <dd className="text-navy font-medium tabular-nums">{ctx.weeklyHours}h</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* ROI */}
              <div className="bg-white rounded-lg border border-border p-4">
                <h4 className="text-[11px] font-sans font-semibold text-silver uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  ROI
                </h4>
                <dl className="space-y-2 text-sm font-sans">
                  {ctx.hoursSaved != null && (
                    <div className="flex justify-between">
                      <dt className="text-silver">{t.admin.hoursSaved}</dt>
                      <dd className="text-navy font-medium tabular-nums">{ctx.hoursSaved}h</dd>
                    </div>
                  )}
                  {ctx.monthlySavings != null && (
                    <div className="flex justify-between">
                      <dt className="text-silver">{t.admin.monthlySavings}</dt>
                      <dd className="text-emerald-700 font-bold tabular-nums">
                        &euro;{ctx.monthlySavings.toLocaleString()}
                        <span className="text-silver font-normal">{t.admin.perMonth}</span>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Demo engagement */}
              <div className="bg-white rounded-lg border border-border p-4">
                <h4 className="text-[11px] font-sans font-semibold text-silver uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  {t.admin.demoEngagement}
                </h4>
                <dl className="space-y-2 text-sm font-sans">
                  {ctx.demosViewed && (
                    <div className="flex justify-between">
                      <dt className="text-silver">{t.admin.demosViewed}</dt>
                      <dd className="text-navy font-medium tabular-nums">{ctx.demosViewed.length}</dd>
                    </div>
                  )}
                  {ctx.demosCompleted && (
                    <div className="flex justify-between">
                      <dt className="text-silver">{t.admin.demosCompleted}</dt>
                      <dd className="text-navy font-medium tabular-nums">{ctx.demosCompleted.length}</dd>
                    </div>
                  )}
                  {ctx.demoProgress != null && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <dt className="text-silver">{t.admin.demoProgress}</dt>
                        <dd className="text-navy font-medium tabular-nums">{ctx.demoProgress}%</dd>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-navy/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-navy-light transition-all duration-500"
                          style={{ width: `${ctx.demoProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {ctx.timeSpent != null && (
                    <div className="flex justify-between">
                      <dt className="text-silver">{t.admin.timeSpent}</dt>
                      <dd className="text-navy font-medium tabular-nums">{Math.round(ctx.timeSpent / 60)}m</dd>
                    </div>
                  )}
                </dl>
                {ctx.demosViewed && ctx.demosViewed.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {ctx.demosViewed.map((d) => (
                        <span
                          key={d}
                          className={`text-[10px] font-sans font-medium px-2 py-0.5 rounded-full ${
                            ctx.demosCompleted?.includes(d)
                              ? "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                              : "bg-navy/[0.05] text-silver ring-1 ring-inset ring-navy/[0.08]"
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Sort helpers                                                       */
/* ------------------------------------------------------------------ */

type SortKey = "name" | "profession" | "savings" | "date";
type SortDir = "asc" | "desc";

function getSortValue(s: Submission, key: SortKey): string | number {
  switch (key) {
    case "name":
      return s.name.toLowerCase();
    case "profession":
      return (s.context?.profession ?? "").toLowerCase();
    case "savings":
      return s.context?.monthlySavings ?? 0;
    case "date":
      return s.created_at ?? "";
  }
}

/* ------------------------------------------------------------------ */
/*  Main dashboard                                                     */
/* ------------------------------------------------------------------ */

export function AdminDashboard({
  submissions,
  userEmail,
}: {
  submissions: Submission[];
  userEmail: string;
}) {
  const { t } = useLocale();

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("");

  /* Sort */
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  /* Expanded row */
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* Unique professions for filter dropdown */
  const professions = useMemo(() => {
    const set = new Set<string>();
    submissions.forEach((s) => {
      if (s.context?.profession) set.add(s.context.profession);
    });
    return Array.from(set).sort();
  }, [submissions]);

  /* Filtered + sorted list */
  const filtered = useMemo(() => {
    let list = submissions;

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          (s.company ?? "").toLowerCase().includes(q),
      );
    }

    if (statusFilter) {
      list = list.filter((s) => (s.status ?? "new") === statusFilter);
    }

    if (professionFilter) {
      list = list.filter((s) => s.context?.profession === professionFilter);
    }

    list = [...list].sort((a, b) => {
      const aVal = getSortValue(a, sortKey);
      const bVal = getSortValue(b, sortKey);
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [submissions, search, statusFilter, professionFilter, sortKey, sortDir]);

  const hasActiveFilters = search !== "" || statusFilter !== "" || professionFilter !== "";

  /* Stats */
  const totalNew = submissions.filter(
    (s) => (s.status ?? "new") === "new",
  ).length;

  const avgSavings = useMemo(() => {
    const vals = submissions
      .map((s) => s.context?.monthlySavings)
      .filter((v): v is number => v != null);
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [submissions]);

  const avgDemos = useMemo(() => {
    const vals = submissions
      .map((s) => s.context?.demosCompleted?.length)
      .filter((v): v is number => v != null);
    if (vals.length === 0) return 0;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [submissions]);

  /* Sort toggle */
  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "date" ? "desc" : "asc");
    }
  }

  function SortIndicator({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return (
      <span className="ml-1 text-navy-light">
        {sortDir === "asc" ? "\u2191" : "\u2193"}
      </span>
    );
  }

  /* Status filter labels */
  const statusLabels: Record<string, string> = {
    new: t.admin.statusNew,
    contacted: t.admin.statusContacted,
    qualified: t.admin.statusQualified,
    converted: t.admin.statusConverted,
    archived: t.admin.statusArchived,
  };

  return (
    <div className="min-h-screen bg-ice flex flex-col font-sans">
      <style dangerouslySetInnerHTML={{ __html: adminKeyframes }} />

      {/* ---- Header ---- */}
      <header className="sticky top-0 z-50 bg-ice/95 backdrop-blur-sm border-b border-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="transition-all duration-300 group-hover:opacity-80"
              style={{ animation: "spin 20s linear infinite" }}
            >
              <LogoMark className="w-8 h-8 text-accent" />
            </div>
            <span className="text-lg font-sans font-semibold text-navy">
              <span className="font-[family-name:var(--font-caveat)] text-xl">
                Praxis
              </span>{" "}
              AI
            </span>
            <span className="ml-2 text-[10px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-navy-light text-white select-none">
              {t.demoHub.admin}
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-sm font-sans text-silver hidden sm:inline">
              {userEmail}
            </span>
            <Link
              href="/demo"
              className="text-sm font-sans font-medium text-navy-light hover:text-navy transition-colors py-2 px-1"
            >
              {t.admin.demosLabel}
            </Link>
            <div className="h-4 w-px bg-navy/10" />
            <form action={logout}>
              <button
                type="submit"
                className="text-sm font-sans font-medium text-navy-light hover:text-navy transition-colors py-2 px-1"
              >
                {t.demoHub.signOut}
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ---- Main ---- */}
      <main className="section-container py-8 md:py-12 flex-1">
        <h1
          className="text-2xl md:text-3xl font-sans font-bold text-navy mb-8"
          style={{ opacity: 0, animation: "adminFadeUp 0.4s ease-out forwards" }}
        >
          {t.admin.title}
        </h1>

        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label={t.admin.totalSubmissions}
            value={submissions.length}
            delay={0.05}
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            label={t.admin.newSubmissions}
            value={totalNew}
            accent
            delay={0.1}
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            }
          />
          <StatCard
            label={t.admin.avgSavings}
            value={avgSavings ? `\u20AC${avgSavings.toLocaleString()}` : "\u2014"}
            delay={0.15}
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <StatCard
            label={t.admin.avgDemos}
            value={avgDemos}
            delay={0.2}
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            }
          />
        </div>

        {/* Filter bar */}
        <div
          className="flex flex-col sm:flex-row gap-3 mb-6"
          style={{ opacity: 0, animation: "adminFadeUp 0.5s ease-out 0.25s forwards" }}
        >
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/50 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={t.admin.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm font-sans pl-9 pr-3 py-2.5 rounded-lg border border-border bg-white text-navy placeholder:text-silver/50 focus:outline-none focus:ring-2 focus:ring-navy-light/30 focus:border-navy-light/30 transition-shadow"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm font-sans px-3 py-2.5 rounded-lg border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-navy-light/30 focus:border-navy-light/30 transition-shadow"
          >
            <option value="">{t.admin.allStatuses}</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
          <select
            value={professionFilter}
            onChange={(e) => setProfessionFilter(e.target.value)}
            className="text-sm font-sans px-3 py-2.5 rounded-lg border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-navy-light/30 focus:border-navy-light/30 transition-shadow"
          >
            <option value="">{t.admin.allProfessions}</option>
            {professions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Result count when filtered */}
        {hasActiveFilters && (
          <p className="text-xs font-sans text-silver mb-3">
            {t.admin.showing}{" "}
            <span className="font-semibold text-navy">{filtered.length}</span>{" "}
            {t.admin.of}{" "}
            <span className="font-semibold text-navy">{submissions.length}</span>
          </p>
        )}

        {/* Table */}
        {filtered.length === 0 ? (
          <div
            className="card-base text-center py-16"
            style={{ opacity: 0, animation: "adminFadeUp 0.4s ease-out 0.3s forwards" }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-navy/[0.04] flex items-center justify-center">
              <svg
                className="w-7 h-7 text-silver/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <p className="text-sm font-sans text-silver">{t.admin.noResults}</p>
          </div>
        ) : (
          <div
            className="card-base p-0 overflow-x-auto"
            style={{ opacity: 0, animation: "adminFadeUp 0.5s ease-out 0.3s forwards" }}
          >
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-border text-left bg-surface-light/30">
                  <th
                    className="px-4 py-3.5 text-[11px] font-semibold text-navy-muted/60 uppercase tracking-wider cursor-pointer select-none hover:text-navy transition-colors"
                    onClick={() => toggleSort("name")}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSort("name"); } }}
                    tabIndex={0}
                    aria-sort={sortKey === "name" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    {t.admin.name}
                    <SortIndicator col="name" />
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold text-navy-muted/60 uppercase tracking-wider">
                    {t.admin.email}
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold text-silver uppercase tracking-wider hidden md:table-cell">
                    {t.admin.company}
                  </th>
                  <th
                    className="px-4 py-3.5 text-[11px] font-semibold text-navy-muted/60 uppercase tracking-wider cursor-pointer select-none hover:text-navy transition-colors hidden lg:table-cell"
                    onClick={() => toggleSort("profession")}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSort("profession"); } }}
                    tabIndex={0}
                    aria-sort={sortKey === "profession" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    {t.admin.profession}
                    <SortIndicator col="profession" />
                  </th>
                  <th
                    className="px-4 py-3.5 text-[11px] font-semibold text-navy-muted/60 uppercase tracking-wider cursor-pointer select-none hover:text-navy transition-colors hidden lg:table-cell"
                    onClick={() => toggleSort("savings")}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSort("savings"); } }}
                    tabIndex={0}
                    aria-sort={sortKey === "savings" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    {t.admin.estSavings}
                    <SortIndicator col="savings" />
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold text-navy-muted/60 uppercase tracking-wider">
                    {t.admin.status}
                  </th>
                  <th
                    className="px-4 py-3.5 text-[11px] font-semibold text-navy-muted/60 uppercase tracking-wider cursor-pointer select-none hover:text-navy transition-colors hidden sm:table-cell"
                    onClick={() => toggleSort("date")}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSort("date"); } }}
                    tabIndex={0}
                    aria-sort={sortKey === "date" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    {t.admin.date}
                    <SortIndicator col="date" />
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold text-silver uppercase tracking-wider w-16">
                    {t.admin.expand}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const isExpanded = expandedId === s.id;
                  const status = s.status ?? "new";
                  return (
                    <Fragment key={s.id}>
                      <tr
                        className={`border-b border-border transition-colors duration-150 ${
                          isExpanded
                            ? "bg-surface-light/70"
                            : "hover:bg-surface-light/40"
                        }`}
                      >
                        <td className="px-4 py-3.5 text-navy font-medium whitespace-nowrap max-w-[140px] truncate">
                          {s.name}
                        </td>
                        <td className="px-4 py-3.5 text-silver whitespace-nowrap max-w-[180px] truncate">
                          <a
                            href={`mailto:${s.email}`}
                            className="hover:text-navy-light transition-colors"
                            title={s.email}
                          >
                            {s.email}
                          </a>
                        </td>
                        <td className="px-4 py-3.5 text-silver hidden md:table-cell whitespace-nowrap">
                          {s.company ?? "\u2014"}
                        </td>
                        <td className="px-4 py-3.5 text-silver hidden lg:table-cell whitespace-nowrap">
                          {s.context?.profession ?? "\u2014"}
                        </td>
                        <td className="px-4 py-3.5 text-navy font-medium hidden lg:table-cell whitespace-nowrap tabular-nums">
                          {s.context?.monthlySavings != null
                            ? `\u20AC${s.context.monthlySavings.toLocaleString()}`
                            : "\u2014"}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusSelect id={s.id} currentStatus={status} />
                        </td>
                        <td className="px-4 py-3.5 text-silver whitespace-nowrap tabular-nums hidden sm:table-cell">
                          {s.created_at
                            ? new Date(s.created_at).toLocaleDateString()
                            : "\u2014"}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : s.id)
                            }
                            className="text-navy-light/60 hover:text-navy-light hover:bg-navy/[0.04] rounded-md p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center transition-all duration-200"
                            aria-label={
                              isExpanded ? t.admin.collapse : t.admin.expand
                            }
                          >
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {isExpanded && <RowDetail submission={s} />}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
