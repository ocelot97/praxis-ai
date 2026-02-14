"use client";

import * as React from "react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default function DemoLoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 mb-8 group"
        >
          <div
            className="transition-all duration-300 group-hover:opacity-80"
            style={{ animation: "spin 20s linear infinite" }}
          >
            <LogoMark className="text-terracotta" />
          </div>
          <span className="text-xl font-sans font-semibold text-charcoal">
            <span className="font-[family-name:var(--font-caveat)] text-2xl">
              Praxis
            </span>{" "}
            AI
          </span>
        </Link>

        <div className="card-base">
          <div className="text-center mb-6">
            <h1 className="text-xl font-sans font-semibold text-charcoal mb-1">
              Demo Access
            </h1>
            <p className="text-sm font-sans text-mid">
              Sign in to view interactive demos
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-sans">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@company.com"
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center text-xs font-sans text-mid mt-6">
          For client meeting access only
        </p>
      </div>
    </div>
  );
}
