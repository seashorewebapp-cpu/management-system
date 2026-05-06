"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks";

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: login, isPending, error, data } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    login(formData);
  }

  const serverError = data?.error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest px-4">
      <div className="w-full max-w-md bg-white border border-outline-variant shadow-sm p-8 rounded">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif text-primary-navy mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-on-surface-variant">
            Sign in to Seashore Site Management
          </p>
        </div>

        {/* Error banner */}
        {serverError && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {serverError}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full border border-outline-variant rounded px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border border-outline-variant rounded px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy transition-all"
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-navy text-white py-3 rounded text-sm font-semibold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary-navy font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
