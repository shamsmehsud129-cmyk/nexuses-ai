"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

type Activity = {
  tool: string;
  description: string;
  time: string;
  credits: number;
  icon: string;
};

const monthlyData = [
  { month: "Mar", value: 42 },
  { month: "Apr", value: 58 },
  { month: "May", value: 47 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 64 },
  { month: "Aug", value: 86 },
];

const activities: Activity[] = [
  {
    tool: "AI Writer",
    description: "Generated a blog article",
    time: "12 min ago",
    credits: 3,
    icon: "✦",
  },
  {
    tool: "Social Media",
    description: "Created Instagram content",
    time: "48 min ago",
    credits: 2,
    icon: "◎",
  },
  {
    tool: "Email Writer",
    description: "Generated a professional email",
    time: "2 hours ago",
    credits: 2,
    icon: "✉",
  },
  {
    tool: "AI Assistant",
    description: "Started a new conversation",
    time: "4 hours ago",
    credits: 1,
    icon: "◈",
  },
];

const tools = [
  { name: "AI Writer", usage: 82, generations: 38, icon: "✦" },
  { name: "Social Media", usage: 67, generations: 24, icon: "◎" },
  { name: "Email Writer", usage: 54, generations: 18, icon: "✉" },
  { name: "AI Assistant", usage: 41, generations: 12, icon: "◈" },
];

export default function AnalyticsPage() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState("Last 6 months");

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && resolvedTheme !== "light";

  const totalGenerations = useMemo(
    () => monthlyData.reduce((sum, item) => sum + item.value, 0),
    []
  );

  const page = dark
    ? "bg-[#050816] text-white"
    : "bg-slate-50 text-slate-900";

  const card = dark
    ? "border-white/[0.07] bg-white/[0.025]"
    : "border-slate-200 bg-white";

  const muted = dark ? "text-slate-500" : "text-slate-500";
  const secondary = dark ? "text-slate-400" : "text-slate-600";
  const border = dark ? "border-white/[0.07]" : "border-slate-200";

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#050816]" />
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-300 ${page}`}>
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className={`pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full blur-3xl ${
            dark ? "bg-violet-600/10" : "bg-violet-300/20"
          }`}
        />

        <div
          className={`pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full blur-3xl ${
            dark ? "bg-blue-600/10" : "bg-blue-300/20"
          }`}
        />

        <div className="relative mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10">
          {/* HEADER */}
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div
                className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                  dark
                    ? "border-white/10 bg-white/[0.04] text-slate-400"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Workspace analytics
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Analytics
              </h1>

              <p className={`mt-2 max-w-2xl text-sm leading-6 ${muted} sm:text-base`}>
                Track your AI activity, generation volume, credit usage and
                overall workspace performance.
              </p>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className={`appearance-none rounded-xl border px-4 py-3 text-sm font-medium outline-none transition ${
                dark
                  ? "border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.08]"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          </div>

          {/* STATS */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total generations"
              value="286"
              change="+18.4%"
              icon="✦"
              dark={dark}
            />

            <StatCard
              label="Credits used"
              value="74"
              change="+12.8%"
              icon="◉"
              dark={dark}
            />

            <StatCard
              label="Active projects"
              value="8"
              change="+2"
              icon="▣"
              dark={dark}
            />

            <StatCard
              label="Avg. daily usage"
              value="9.5"
              change="+6.2%"
              icon="⌁"
              dark={dark}
            />
          </section>

          {/* CHART + CREDITS */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
            {/* CHART */}
            <div
              className={`rounded-2xl border p-5 shadow-xl transition-colors duration-300 sm:p-6 ${card}`}
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    Generation activity
                  </h2>

                  <p className={`mt-1 text-sm ${muted}`}>
                    AI generations across your workspace
                  </p>
                </div>

                <div
                  className={`rounded-lg border px-3 py-2 text-xs ${border} ${
                    dark
                      ? "bg-white/[0.03] text-slate-400"
                      : "bg-slate-50 text-slate-500"
                  }`}
                >
                  {totalGenerations} total
                </div>
              </div>

              <div className="mt-8 h-72">
                <div className="flex h-full gap-4">
                  <div
                    className={`flex flex-col justify-between pb-7 text-[11px] ${muted}`}
                  >
                    <span>100</span>
                    <span>75</span>
                    <span>50</span>
                    <span>25</span>
                    <span>0</span>
                  </div>

                  <div
                    className={`relative flex flex-1 items-end justify-around gap-3 border-b border-l px-2 pb-0 ${border}`}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
                      {[0, 25, 50, 75].map((position) => (
                        <div
                          key={position}
                          className={`absolute left-0 right-0 border-t ${
                            dark
                              ? "border-white/[0.045]"
                              : "border-slate-100"
                          }`}
                          style={{ top: `${position}%` }}
                        />
                      ))}
                    </div>

                    {monthlyData.map((item) => (
                      <div
                        key={item.month}
                        className="relative z-10 flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <div
                          className={`mb-2 text-xs font-medium ${
                            dark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {item.value}
                        </div>

                        <div
                          className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-violet-600 to-fuchsia-500 transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-400"
                          style={{
                            height: `${Math.max(item.value, 8)}%`,
                          }}
                        />

                        <span
                          className={`mt-3 text-[11px] ${muted}`}
                        >
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CREDIT USAGE */}
            <div
              className={`rounded-2xl border p-5 shadow-xl transition-colors duration-300 sm:p-6 ${card}`}
            >
              <h2 className="text-lg font-semibold">Credit usage</h2>

              <p className={`mt-1 text-sm ${muted}`}>
                Your current plan consumption
              </p>

              <div className="mx-auto mt-8 flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#8b5cf6_0deg,#c026d3_266deg,#d1d5db_266deg,#d1d5db_360deg)] p-[14px]">
                <div
                  className={`flex h-full w-full flex-col items-center justify-center rounded-full ${
                    dark ? "bg-[#050816]" : "bg-white"
                  }`}
                >
                  <span className="text-4xl font-bold">74</span>

                  <span className={`mt-1 text-xs ${muted}`}>
                    of 100 credits
                  </span>
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between text-sm">
                  <span className={secondary}>Used</span>
                  <span className="font-medium">74%</span>
                </div>

                <div
                  className={`mt-3 h-2 overflow-hidden rounded-full ${
                    dark ? "bg-white/[0.07]" : "bg-slate-200"
                  }`}
                >
                  <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                </div>

                <div className={`mt-2 flex justify-between text-xs ${muted}`}>
                  <span>0 credits</span>
                  <span>100 credits</span>
                </div>
              </div>

              <button
                className={`mt-6 w-full rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  dark
                    ? "border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Upgrade plan
              </button>
            </div>
          </section>

          {/* TOOL PERFORMANCE */}
          <section
            className={`mt-6 rounded-2xl border p-5 shadow-xl transition-colors duration-300 sm:p-6 ${card}`}
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  AI tool performance
                </h2>

                <p className={`mt-1 text-sm ${muted}`}>
                  See which tools are driving the most activity.
                </p>
              </div>

              <span className={`text-xs ${muted}`}>{period}</span>
            </div>

            <div className="mt-7 space-y-6">
              {tools.map((tool) => (
                <div key={tool.name}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm ${
                          dark
                            ? "border-white/10 bg-white/[0.04] text-violet-300"
                            : "border-slate-200 bg-slate-50 text-violet-600"
                        }`}
                      >
                        {tool.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {tool.name}
                        </p>

                        <p className={`text-xs ${muted}`}>
                          {tool.generations} generations
                        </p>
                      </div>
                    </div>

                    <span className={`text-sm font-medium ${secondary}`}>
                      {tool.usage}%
                    </span>
                  </div>

                  <div
                    className={`h-2 overflow-hidden rounded-full ${
                      dark ? "bg-white/[0.06]" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                      style={{ width: `${tool.usage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM */}
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* ACTIVITY */}
            <div
              className={`rounded-2xl border p-5 shadow-xl transition-colors duration-300 sm:p-6 ${card}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Recent activity</h2>

                  <p className={`mt-1 text-sm ${muted}`}>
                    Your latest AI activity
                  </p>
                </div>

                <button className="text-xs font-medium text-violet-500 transition hover:text-violet-600">
                  View history
                </button>
              </div>

              <div className={`mt-6 divide-y ${border}`}>
                {activities.map((activity) => (
                  <div
                    key={`${activity.tool}-${activity.time}`}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                        dark
                          ? "border-white/10 bg-white/[0.04] text-violet-300"
                          : "border-slate-200 bg-slate-50 text-violet-600"
                      }`}
                    >
                      {activity.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {activity.tool}
                      </p>

                      <p className={`truncate text-xs ${muted}`}>
                        {activity.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className={`text-xs font-medium ${secondary}`}>
                        -{activity.credits} credits
                      </p>

                      <p className={`mt-1 text-[11px] ${muted}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INSIGHT */}
            <div
              className={`relative overflow-hidden rounded-2xl border p-6 ${
                dark
                  ? "border-violet-500/20 bg-gradient-to-br from-violet-500/[0.12] via-fuchsia-500/[0.06] to-transparent"
                  : "border-violet-200 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                  dark
                    ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
                    : "border-violet-200 bg-violet-100 text-violet-600"
                }`}
              >
                ✨
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Your workspace is growing
              </h2>

              <p className={`mt-3 text-sm leading-6 ${secondary}`}>
                Your AI generation activity increased by{" "}
                <span className="font-semibold">18.4%</span> compared with
                the previous period. AI Writer is currently your most-used
                tool.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div
                  className={`rounded-xl border p-4 ${
                    dark
                      ? "border-white/10 bg-black/20"
                      : "border-slate-200 bg-white/70"
                  }`}
                >
                  <p className={`text-xs ${muted}`}>Top tool</p>

                  <p className="mt-2 text-sm font-semibold">
                    AI Writer
                  </p>
                </div>

                <div
                  className={`rounded-xl border p-4 ${
                    dark
                      ? "border-white/10 bg-black/20"
                      : "border-slate-200 bg-white/70"
                  }`}
                >
                  <p className={`text-xs ${muted}`}>Growth</p>

                  <p className="mt-2 text-sm font-semibold text-emerald-500">
                    +18.4%
                  </p>
                </div>
              </div>

              <button
                className={`mt-6 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  dark
                    ? "bg-white text-black hover:bg-slate-200"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                Explore AI Writer
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  change,
  icon,
  dark,
}: {
  label: string;
  value: string;
  change: string;
  icon: string;
  dark: boolean;
}) {
  return (
    <div
      className={`group rounded-2xl border p-5 shadow-xl transition duration-300 hover:-translate-y-0.5 ${
        dark
          ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:bg-white/[0.04]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
            dark
              ? "border-white/10 bg-white/[0.04] text-violet-300"
              : "border-slate-200 bg-slate-50 text-violet-600"
          }`}
        >
          {icon}
        </div>

        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-500">
          {change}
        </span>
      </div>

      <div className="mt-5">
        <p className={`text-sm ${dark ? "text-slate-500" : "text-slate-500"}`}>
          {label}
        </p>

        <p className="mt-1 text-3xl font-semibold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}