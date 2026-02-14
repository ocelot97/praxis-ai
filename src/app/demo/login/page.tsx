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
  const emailRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (error) {
      emailRef.current?.focus();
    }
  }, [error]);

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
    <>
      <style jsx global>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shakeIn {
          0% {
            opacity: 0;
            transform: translateX(0);
          }
          20% {
            opacity: 1;
            transform: translateX(-2px);
          }
          40% {
            transform: translateX(2px);
          }
          60% {
            transform: translateX(-2px);
          }
          80% {
            transform: translateX(2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes subtlePulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .login-bg {
          background: radial-gradient(
            ellipse at 30% 20%,
            rgba(194, 121, 91, 0.06) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 70% 80%,
            rgba(194, 121, 91, 0.04) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 50% 50%,
            rgba(194, 121, 91, 0.02) 0%,
            transparent 70%
          );
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }

        .login-logo {
          animation: fadeIn 0.6s ease-out both;
          animation-delay: 200ms;
        }

        .login-card {
          animation: fadeInUp 0.5s ease-out both;
          animation-delay: 400ms;
        }

        .login-footer {
          animation: fadeIn 0.4s ease-out both;
          animation-delay: 600ms;
        }

        .login-error {
          animation: shakeIn 0.4s ease-out both;
        }

        .login-btn-loading {
          animation: subtlePulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative">
        {/* Animated gradient background */}
        <div className="login-bg fixed inset-0 pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          <Link
            href="/"
            className="login-logo flex items-center justify-center gap-3 mb-8 group"
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

          <div className="login-card card-base">
            <div className="text-center mb-6">
              <h1 className="text-xl font-sans font-semibold text-charcoal mb-1">
                Demo Access
              </h1>
              <p className="text-sm font-sans text-mid">
                Sign in to view interactive demos
              </p>
            </div>

            {error && (
              <div className="login-error mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-sans">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              <Input
                ref={emailRef}
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
              <Button
                type="submit"
                className={`w-full ${loading ? "login-btn-loading" : ""}`}
                loading={loading}
              >
                {loading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </div>

          <div className="login-footer text-center mt-6">
            <p className="text-xs font-sans text-mid">
              For client meeting access only
            </p>
            <p className="text-[10px] font-sans text-mid/30 uppercase tracking-widest mt-2">
              Praxis AI Demo Platform
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
