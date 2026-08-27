"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SettingsPage() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && resolvedTheme !== "light";

  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Logout failed. Please try again.");
      setLoggingOut(false);
      return;
    }

    window.location.href = "/login";
  };

  if (!mounted) {
    return <main className="min-h-screen bg-[#050816]" />;
  }

  return (
    <main
      className={`min-h-screen p-6 transition-colors duration-300 sm:p-10 ${
        dark
          ? "bg-[#050816] text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-5xl">

        {/* BACK */}
        <Link
          href="/dashboard"
          className={`mb-6 inline-flex items-center gap-2 text-sm font-semibold transition ${
            dark
              ? "text-slate-400 hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          ← Back to Dashboard
        </Link>

        {/* HEADER */}
        <div className="mb-8">
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
              dark
                ? "border-white/10 bg-white/[0.04] text-slate-400"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Account preferences
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Settings
          </h1>

          <p
            className={`mt-2 ${
              dark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            Manage your Nexuses AI account and preferences.
          </p>
        </div>

        <div className="space-y-6">

          {/* PROFILE */}
          <section
            className={`rounded-3xl border p-6 shadow-sm transition-colors duration-300 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-bold">
              Profile
            </h2>

            <p
              className={`mt-1 text-sm ${
                dark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Manage your profile information.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label
                  className={`mb-2 block text-sm font-semibold ${
                    dark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    dark
                      ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-violet-500"
                      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
                  }`}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  className={`mb-2 block text-sm font-semibold ${
                    dark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    dark
                      ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-violet-500"
                      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
                  }`}
                />
              </div>

            </div>

            <button
              className={`mt-6 rounded-xl px-5 py-3 text-sm font-bold transition ${
                dark
                  ? "bg-white text-black hover:bg-slate-200"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              Save Changes
            </button>
          </section>

          {/* PREFERENCES */}
          <section
            className={`rounded-3xl border p-6 shadow-sm transition-colors duration-300 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-bold">
              Preferences
            </h2>

            <p
              className={`mt-1 text-sm ${
                dark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Customize your dashboard experience.
            </p>

            <div className="mt-6 space-y-4">

              {/* EMAIL NOTIFICATIONS */}
              <div
                className={`flex items-center justify-between rounded-2xl border p-4 ${
                  dark
                    ? "border-white/[0.06] bg-white/[0.025]"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <div>
                  <p className="font-semibold">
                    Email Notifications
                  </p>

                  <p
                    className={`text-xs ${
                      dark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Receive important account updates.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-violet-600"
                />
              </div>

              {/* AI SUGGESTIONS */}
              <div
                className={`flex items-center justify-between rounded-2xl border p-4 ${
                  dark
                    ? "border-white/[0.06] bg-white/[0.025]"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <div>
                  <p className="font-semibold">
                    AI Suggestions
                  </p>

                  <p
                    className={`text-xs ${
                      dark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Show helpful AI suggestions while creating.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-violet-600"
                />
              </div>

            </div>
          </section>

          {/* ACCOUNT / LOGOUT */}
          <section
            className={`rounded-3xl border p-6 shadow-sm ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-bold">
              Account
            </h2>

            <p
              className={`mt-1 text-sm ${
                dark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Sign out of your Nexuses AI account on this device.
            </p>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className={`mt-5 rounded-xl border px-5 py-3 text-sm font-bold transition ${
                loggingOut
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } ${
                dark
                  ? "border-white/10 text-white hover:bg-white/10"
                  : "border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </section>

        </div>
      </div>
    </main>
  );
}