"use client";

import * as React from "react";

interface ProfilingData {
  // Touchpoint 1: AI Simulation
  profession?: string;
  // Touchpoint 2: ROI Calculator
  clients?: number;
  weeklyHours?: number;
  estimatedSavingsHours?: number;
  estimatedSavingsEur?: number;
  savingsBreakdown?: { area: string; hours: number }[];
  // Touchpoint 3: Demo Viewer
  demosViewed?: string[];
  demosCompleted?: string[];
  demoMaxProgress?: Record<string, number>; // slug -> max % reached
  demoTimeSpentMs?: Record<string, number>; // slug -> total ms spent
}

interface ProfilingContextType {
  data: ProfilingData;
  update: (partial: Partial<ProfilingData>) => void;
  addDemoViewed: (slug: string) => void;
  addDemoCompleted: (slug: string) => void;
  updateDemoProgress: (slug: string, pct: number) => void;
  addDemoTime: (slug: string, ms: number) => void;
  toJSON: () => string;
}

const STORAGE_KEY = "praxis-profiling";

const ProfilingContext = React.createContext<ProfilingContextType | null>(null);

function readFromStorage(): ProfilingData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ProfilingData;
    }
  } catch {
    // sessionStorage unavailable or JSON parse failed — fall back silently
  }
  return {};
}

function writeToStorage(data: ProfilingData): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage unavailable — fail silently
  }
}

export function ProfilingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<ProfilingData>(() => readFromStorage());

  React.useEffect(() => {
    writeToStorage(data);
  }, [data]);

  const update = React.useCallback((partial: Partial<ProfilingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const addDemoViewed = React.useCallback((slug: string) => {
    setData((prev) => {
      const existing = prev.demosViewed ?? [];
      if (existing.includes(slug)) return prev;
      return { ...prev, demosViewed: [...existing, slug] };
    });
  }, []);

  const addDemoCompleted = React.useCallback((slug: string) => {
    setData((prev) => {
      const existing = prev.demosCompleted ?? [];
      if (existing.includes(slug)) return prev;
      return { ...prev, demosCompleted: [...existing, slug] };
    });
  }, []);

  const updateDemoProgress = React.useCallback((slug: string, pct: number) => {
    setData((prev) => {
      const existing = prev.demoMaxProgress ?? {};
      const current = existing[slug] ?? 0;
      if (pct <= current) return prev;
      return { ...prev, demoMaxProgress: { ...existing, [slug]: pct } };
    });
  }, []);

  const addDemoTime = React.useCallback((slug: string, ms: number) => {
    setData((prev) => {
      const existing = prev.demoTimeSpentMs ?? {};
      return { ...prev, demoTimeSpentMs: { ...existing, [slug]: (existing[slug] ?? 0) + ms } };
    });
  }, []);

  const toJSON = React.useCallback(() => {
    return JSON.stringify(data);
  }, [data]);

  const value = React.useMemo<ProfilingContextType>(
    () => ({ data, update, addDemoViewed, addDemoCompleted, updateDemoProgress, addDemoTime, toJSON }),
    [data, update, addDemoViewed, addDemoCompleted, updateDemoProgress, addDemoTime, toJSON]
  );

  return (
    <ProfilingContext.Provider value={value}>
      {children}
    </ProfilingContext.Provider>
  );
}

export function useProfilingContext(): ProfilingContextType {
  const ctx = React.useContext(ProfilingContext);
  if (!ctx) {
    throw new Error(
      "useProfilingContext must be used within a <ProfilingProvider>. " +
        "Wrap your component tree with <ProfilingProvider> before calling this hook."
    );
  }
  return ctx;
}
