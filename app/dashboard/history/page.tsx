"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type HistoryItem = {
  id: number;
  tool: string;
  title: string;
  preview: string;
  date: string;
  credits: number;
  icon: string;
};

const historyItems: HistoryItem[] = [
  {
    id: 1,
    tool: "AI Writer",
    title: "Blog Article About Artificial Intelligence",
    preview:
      "Artificial intelligence is transforming the way businesses create, communicate and grow...",
    date: "Today, 12:42 PM",
    credits: 3,
    icon: "✦",
  },
  {
    id: 2,
    tool: "Social Media",
    title: "Instagram Campaign Content",
    preview:
      "Created engaging social media content with a professional and modern tone...",
    date: "Today, 11:18 AM",
    credits: 2,
    icon: "◎",
  },
  {
    id: 3,
    tool: "Email Writer",
    title: "Professional Client Email",
    preview:
      "A polished professional email prepared for client communication...",
    date: "Yesterday, 6:34 PM",
    credits: 2,
    icon: "✉",
  },
  {
    id: 4,
    tool: "AI Assistant",
    title: "Product Strategy Discussion",
    preview:
      "Discussion about product positioning, growth strategy and AI-powered workflows...",
    date: "Yesterday, 3:21 PM",
    credits: 1,
    icon: "◈",
  },
  {
    id: 5,
    tool: "Content Rewriter",
    title: "Website Landing Page Rewrite",
    preview:
      "Rewritten landing page copy with a clearer, more conversion-focused structure...",
    date: "Aug 25, 2026",
    credits: 2,
    icon: "↻",
  },
];

export default function HistoryPage() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && resolvedTheme !== "light";

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tool.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.tool === filter;

    return matchesSearch && matchesFilter;
  });

  if (!mounted) {
    return <main className="min-h-screen bg-[#050816]" />;
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? "bg-[#050816] text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className={`pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full blur-3xl ${
            dark ? "bg-violet-600/10" : "bg-violet-300/20"
          }`}
        />

        <div
          className={`pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full blur-3xl ${
            dark ? "bg-cyan-600/10" : "bg-cyan-300/20"
          }`}
        />

        <div className="relative mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10">
          {/* HEADER */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div
                className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                  dark
                    ? "border-white/10 bg-white/[0.04] text-slate-400"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                Generation history
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                History
              </h1>

              <p
                className={`mt-2 max-w-2xl text-sm leading-6 sm:text-base ${
                  dark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                View and manage everything you have generated with Nexuses AI.
              </p>
            </div>

            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                dark
                  ? "border-white/10 bg-white/[0.04] text-slate-300"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              <span className="font-semibold">{historyItems.length}</span>{" "}
              generations
            </div>
          </div>

          {/* SEARCH + FILTERS */}
          <div
            className={`mb-6 rounded-2xl border p-4 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <span
                  className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
                    dark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your generations..."
                  className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition ${
                    dark
                      ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-violet-500/50"
                      : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-violet-400"
                  }`}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {[
                  "All",
                  "AI Writer",
                  "Social Media",
                  "Email Writer",
                  "AI Assistant",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`whitespace-nowrap rounded-xl px-4 py-3 text-xs font-semibold transition ${
                      filter === item
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                        : dark
                          ? "border border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07]"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* HISTORY LIST */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div
                className={`rounded-2xl border p-12 text-center ${
                  dark
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="text-3xl">⌕</div>

                <h3 className="mt-4 text-lg font-semibold">
                  No generations found
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    dark ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  Try a different search term or filter.
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  dark={dark}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function HistoryCard({
  item,
  dark,
}: {
  item: HistoryItem;
  dark: boolean;
}) {
  return (
    <div
      className={`group rounded-2xl border p-5 transition duration-300 hover:-translate-y-0.5 ${
        dark
          ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.13] hover:bg-white/[0.04]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* ICON */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-lg ${
            dark
              ? "border-white/10 bg-white/[0.04] text-violet-300"
              : "border-slate-200 bg-violet-50 text-violet-600"
          }`}
        >
          {item.icon}
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider ${
                dark ? "text-violet-300" : "text-violet-600"
              }`}
            >
              {item.tool}
            </span>

            <span
              className={`h-1 w-1 rounded-full ${
                dark ? "bg-slate-700" : "bg-slate-300"
              }`}
            />

            <span
              className={`text-[11px] ${
                dark ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {item.date}
            </span>
          </div>

          <h3 className="mt-2 truncate text-base font-semibold">
            {item.title}
          </h3>

          <p
            className={`mt-1 line-clamp-2 text-sm leading-6 ${
              dark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            {item.preview}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-lg border px-3 py-2 text-[11px] font-medium ${
              dark
                ? "border-white/10 bg-white/[0.03] text-slate-500"
                : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            -{item.credits} credits
          </span>

          <button
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              dark
                ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            View
          </button>

          <button
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              dark
                ? "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                : "border-slate-200 bg-white text-slate-500 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}