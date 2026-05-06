"use client";

import Link from "next/link";
import { useRegister } from "@/hooks";

export default function SignupPage() {
  const { mutate: register, isPending, data } = useRegister();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    register(formData);
  }

  const serverError = data?.error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest px-4">
      <div className="w-full max-w-md bg-white border border-outline-variant shadow-sm p-8 rounded">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif text-primary-navy mb-1">
            Create account
          </h1>
          <p className="text-sm text-on-surface-variant">
            Join Seashore Site Management
          </p>
        </div>

        {/* Error banner */}
        {serverError && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-name"
              className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Full name
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Smith"
              className="w-full border border-outline-variant rounded px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-email"
              className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Email
            </label>
            <input
              id="signup-email"
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
              htmlFor="signup-password"
              className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              minLength={8}
              className="w-full border border-outline-variant rounded px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy transition-all"
            />
          </div>

          <button
            id="signup-submit"
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-navy text-white py-3 rounded text-sm font-semibold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary-navy font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
