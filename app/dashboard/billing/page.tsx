"use client";

import Link from "next/link";

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Billing & Plans
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your Nexuses AI subscription and usage.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Free */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <p className="text-sm font-bold text-slate-500">
              FREE
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              $0
              <span className="text-sm font-medium text-slate-400">
                /month
              </span>
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Perfect for getting started.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>✓ 200 AI generations</li>
              <li>✓ AI Writer</li>
              <li>✓ Email Writer</li>
              <li>✓ Social Media</li>
            </ul>

            <button className="mt-8 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-500">
              Current Plan
            </button>

          </div>

          {/* Pro */}
          <div className="relative rounded-3xl border-2 border-blue-500 bg-white p-7 shadow-xl">

            <div className="absolute right-5 top-5 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase text-white">
              Popular
            </div>

            <p className="text-sm font-bold text-blue-600">
              PRO
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              $19
              <span className="text-sm font-medium text-slate-400">
                /month
              </span>
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              For creators who need more power.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>✓ Unlimited AI generations</li>
              <li>✓ All AI writing tools</li>
              <li>✓ AI Assistant</li>
              <li>✓ Priority generation</li>
              <li>✓ Premium support</li>
            </ul>

            <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90">
              Upgrade to Pro
            </button>

          </div>

          {/* Business */}
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-xl">

            <p className="text-sm font-bold text-slate-300">
              BUSINESS
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              $49
              <span className="text-sm font-medium text-slate-400">
                /month
              </span>
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Advanced AI workspace for teams.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Everything in Pro</li>
              <li>✓ Team workspace</li>
              <li>✓ Advanced tools</li>
              <li>✓ Higher limits</li>
              <li>✓ Priority support</li>
            </ul>

            <button className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100">
              Choose Business
            </button>

          </div>

        </div>

        {/* Usage */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-lg font-bold">
            Current Usage
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your AI generation usage this month.
          </p>

          <div className="mt-6">

            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">
                Generations
              </span>

              <span className="font-bold">
                128 / 200
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}