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
  demoCompletionRate?: number;
  interactedSteps?: string[];
}

interface ProfilingContextType {
  data: ProfilingData;
  update: (partial: Partial<ProfilingData>) => void;
  addDemoViewed: (slug: string) => void;
  addInteractedStep: (step: string) => void;
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

  const addInteractedStep = React.useCallback((step: string) => {
    setData((prev) => {
      const existing = prev.interactedSteps ?? [];
      if (existing.includes(step)) return prev;
      return { ...prev, interactedSteps: [...existing, step] };
    });
  }, []);

  const toJSON = React.useCallback(() => {
    return JSON.stringify(data);
  }, [data]);

  const value = React.useMemo<ProfilingContextType>(
    () => ({ data, update, addDemoViewed, addInteractedStep, toJSON }),
    [data, update, addDemoViewed, addInteractedStep, toJSON]
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
