"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Tool = {
  href: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
};

type Stat = {
  name: string;
  value: string;
  growth: string;
  icon: string;
};

const tools: Tool[] = [
  {
    href: "/dashboard/ai-writer",
    name: "AI Writer",
    description:
      "Create articles, blogs, emails and powerful written content.",
    icon: "✦",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    href: "/dashboard/email-writer",
    name: "Email Writer",
    description: "Craft polished professional emails in seconds.",
    icon: "✉",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    href: "/dashboard/social-media",
    name: "Social Media",
    description: "Generate captions, posts and engaging social content.",
    icon: "◎",
    gradient: "from-pink-400 to-rose-600",
  },
  {
    href: "/dashboard/ai-assistant",
    name: "AI Assistant",
    description: "Brainstorm ideas, solve problems and ask anything.",
    icon: "✧",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    href: "/dashboard/ai-summarizer",
    name: "AI Summarizer",
    description:
      "Turn long content into clear, concise and useful summaries.",
    icon: "▤",
    gradient: "from-yellow-400 to-orange-600",
  },
  {
    href: "/dashboard/content-rewriter",
    name: "Content Rewriter",
    description:
      "Rewrite content with better clarity, grammar and professional flow.",
    icon: "✎",
    gradient: "from-fuchsia-400 to-violet-600",
  },
];

const stats: Stat[] = [
  {
    name: "AI Generations",
    value: "128",
    growth: "+12.4%",
    icon: "✦",
  },
  {
    name: "Words Created",
    value: "24.8K",
    growth: "+18.2%",
    icon: "Aa",
  },
  {
    name: "Active Tools",
    value: "6 / 6",
    growth: "100%",
    icon: "◈",
  },
  {
    name: "Saved Projects",
    value: "42",
    growth: "+8.1%",
    icon: "▣",
  },
];

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
      <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-lg font-black text-white shadow-[0_0_30px_rgba(59,130,246,0.35)]">
      <div className="absolute inset-[1px] rounded-2xl bg-black/20" />
      <span className="relative">N</span>
    </div>
  );
}

function ThemeButton({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className={
        dark
          ? "group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
          : "group flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-700 transition hover:border-blue-300 hover:bg-slate-50"
      }
    >
      <span className="text-sm">{dark ? "☀" : "☾"}</span>

      <span className="hidden text-[10px] font-black uppercase tracking-wider sm:block">
        {dark ? "Light" : "Dark"}
      </span>
    </button>
  );
}

function NavLink({
  href,
  icon,
  children,
  dark,
  active = false,
  indicator,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
  dark: boolean;
  active?: boolean;
  indicator?: string;
}) {
  let className = "";

  if (active) {
    className = dark
      ? "group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-violet-600/20 px-4 py-3.5 text-sm font-bold text-white"
      : "group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50 px-4 py-3.5 text-sm font-bold text-slate-900";
  } else {
    className = dark
      ? "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
      : "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900";
  }

  return (
    <Link href={href} className={className}>
      {active && (
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500" />
      )}

      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
        {icon}
      </span>

      {children}

      {active && (
        <span className="ml-auto text-blue-400">
          <Arrow />
        </span>
      )}

      {indicator && (
        <span
          className={`ml-auto h-1.5 w-1.5 rounded-full ${indicator}`}
        />
      )}
    </Link>
  );
}

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#05060a] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      </main>
    );
  }

  const dark = theme === "dark";

  const toggleTheme = () => {
    setTheme(dark ? "light" : "dark");
  };

  const statGlow = [
    "bg-blue-500/10",
    "bg-violet-500/10",
    "bg-emerald-500/10",
    "bg-pink-500/10",
  ];

  const statIconStyle = [
    "bg-blue-500/10 text-blue-500",
    "bg-violet-500/10 text-violet-500",
    "bg-emerald-500/10 text-emerald-500",
    "bg-pink-500/10 text-pink-500",
  ];

  const activity = [
    {
      icon: "✦",
      title: "AI Writer",
      description: "Generated an article",
      iconClass: "bg-cyan-500/10 text-cyan-500",
    },
    {
      icon: "✉",
      title: "Email Writer",
      description: "Created professional email",
      iconClass: "bg-violet-500/10 text-violet-500",
    },
    {
      icon: "◎",
      title: "Social Media",
      description: "Generated social captions",
      iconClass: "bg-pink-500/10 text-pink-500",
    },
  ];

  return (
    <main
      className={
        dark
          ? "min-h-screen overflow-hidden bg-[#05060a] text-white transition-colors duration-500"
          : "min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-500"
      }
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={
            dark
              ? "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]"
              : "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[140px]"
          }
        />

        <div
          className={
            dark
              ? "absolute right-[-100px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]"
              : "absolute right-[-100px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[150px]"
          }
        />

        <div
          className={
            dark
              ? "absolute bottom-[-150px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[150px]"
              : "absolute bottom-[-150px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-300/10 blur-[150px]"
          }
        />
      </div>

      <div
        className={
          dark
            ? "pointer-events-none fixed inset-0 opacity-[0.035]"
            : "pointer-events-none fixed inset-0 opacity-[0.025]"
        }
        style={{
          backgroundImage: dark
            ? "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)"
            : "linear-gradient(rgba(15,23,42,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden w-[280px] shrink-0 p-4 lg:block">
          <div
            className={
              dark
                ? "sticky top-4 flex h-[calc(100vh-32px)] flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0d13]/90 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                : "sticky top-4 flex h-[calc(100vh-32px)] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)]"
            }
          >
            <div className="flex items-center gap-3 px-6 py-6">
              <Logo />

              <div>
                <h1
                  className={
                    dark
                      ? "text-[17px] font-black tracking-tight text-white"
                      : "text-[17px] font-black tracking-tight text-slate-900"
                  }
                >
                  Nexuses AI
                </h1>

                <p
                  className={
                    dark
                      ? "text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500"
                      : "text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400"
                  }
                >
                  AI Workspace
                </p>
              </div>
            </div>

            <div
              className={
                dark
                  ? "mx-5 h-px bg-white/[0.06]"
                  : "mx-5 h-px bg-slate-100"
              }
            />

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <p
                className={
                  dark
                    ? "mb-3 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600"
                    : "mb-3 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                }
              >
                Workspace
              </p>

              <nav className="space-y-1.5">
                <NavLink href="/dashboard" icon="◈" dark={dark} active>
                  Dashboard
                </NavLink>

                <NavLink href="/dashboard/ai-writer" icon="✦" dark={dark}>
                  AI Writer
                </NavLink>

                <NavLink
                  href="/dashboard/email-writer"
                  icon="✉"
                  dark={dark}
                >
                  Email Writer
                </NavLink>

                <NavLink
                  href="/dashboard/social-media"
                  icon="◎"
                  dark={dark}
                >
                  Social Media
                </NavLink>
              </nav>

              <p
                className={
                  dark
                    ? "mb-3 mt-9 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600"
                    : "mb-3 mt-9 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                }
              >
                AI Intelligence
              </p>

              <div className="space-y-1">
                <NavLink
                  href="/dashboard/ai-assistant"
                  icon="✧"
                  dark={dark}
                  indicator="bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]"
                >
                  AI Assistant
                </NavLink>

                <NavLink
                  href="/dashboard/ai-summarizer"
                  icon="▤"
                  dark={dark}
                  indicator="bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,.8)]"
                >
                  AI Summarizer
                </NavLink>

                <NavLink
                  href="/dashboard/content-rewriter"
                  icon="✎"
                  dark={dark}
                  indicator="bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,.8)]"
                >
                  Content Rewriter
                </NavLink>
              </div>

              <p
                className={
                  dark
                    ? "mb-3 mt-9 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600"
                    : "mb-3 mt-9 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                }
              >
                Account
              </p>

              <div className="space-y-1">
                <NavLink href="/dashboard/settings" icon="⚙" dark={dark}>
                  Settings
                </NavLink>

                <NavLink href="/dashboard/billing" icon="◇" dark={dark}>
                  Billing
                </NavLink>
              </div>
            </div>

            <div className="p-4">
              <div
                className={
                  dark
                    ? "relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-blue-600/20 via-violet-600/15 to-transparent p-5"
                    : "relative overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 via-violet-50 to-white p-5"
                }
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-500">
                    <Sparkle />
                  </div>

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-500">
                    Premium
                  </p>

                  <h3
                    className={
                      dark
                        ? "mt-1 text-sm font-black text-white"
                        : "mt-1 text-sm font-black text-slate-900"
                    }
                  >
                    Unlock full power
                  </h3>

                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    Unlimited AI generations and advanced tools.
                  </p>

                  <Link
                    href="/dashboard/billing"
                    className="mt-4 block rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 py-2.5 text-center text-[10px] font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                  >
                    Upgrade Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header
            className={
              dark
                ? "flex h-[82px] items-center justify-between border-b border-white/[0.06] px-5 sm:px-8 lg:px-10"
                : "flex h-[82px] items-center justify-between border-b border-slate-200 bg-white/80 px-5 sm:px-8 lg:px-10"
            }
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-500">
                Command Center
              </p>

              <h2
                className={
                  dark
                    ? "mt-1 text-xl font-black tracking-tight text-white"
                    : "mt-1 text-xl font-black tracking-tight text-slate-900"
                }
              >
                Welcome back, Creator.
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <ThemeButton dark={dark} onToggle={toggleTheme} />

              <button
                type="button"
                aria-label="Notifications"
                className={
                  dark
                    ? "hidden h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-500 transition hover:text-white sm:flex"
                    : "hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900 sm:flex"
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>
              </button>

              <div
                className={
                  dark
                    ? "flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1.5 pr-3"
                    : "flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 shadow-sm"
                }
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 text-xs font-black text-white">
                  Y
                </div>

                <div className="hidden sm:block">
                  <p
                    className={
                      dark
                        ? "text-[10px] font-black text-white"
                        : "text-[10px] font-black text-slate-900"
                    }
                  >
                    AI Creator
                  </p>

                  <p className="text-[9px] text-slate-400">Free Plan</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 px-5 pb-10 pt-7 sm:px-8 lg:px-10">
            <section
              className={
                dark
                  ? "relative min-h-[390px] overflow-hidden rounded-[34px] border border-white/[0.08] bg-gradient-to-br from-[#0c1220] via-[#090b12] to-[#100b1c] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-10 lg:p-12"
                  : "relative min-h-[390px] overflow-hidden rounded-[34px] border border-slate-200 bg-gradient-to-br from-white via-blue-50/70 to-violet-50/70 p-7 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12"
              }
            >
              <div className="absolute -right-20 -top-32 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[110px]" />
              <div className="absolute bottom-[-120px] right-[15%] h-[330px] w-[330px] rounded-full bg-violet-600/10 blur-[100px]" />
              <div className="absolute left-[45%] top-[20%] h-[180px] w-[180px] rounded-full bg-cyan-500/10 blur-[90px]" />

              <div className="absolute right-[-20px] top-5 hidden h-[360px] w-[360px] items-center justify-center lg:flex">
                <div className="absolute h-[300px] w-[300px] rounded-full border border-blue-400/10" />
                <div className="absolute h-[230px] w-[230px] rounded-full border border-violet-400/15" />
                <div className="absolute h-[165px] w-[165px] rounded-full border border-cyan-400/10" />

                <div className="absolute h-[110px] w-[110px] rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_80px_rgba(59,130,246,0.55)]" />

                <div className="relative text-white">
                  <Sparkle />
                </div>
              </div>

              <div className="relative z-10 max-w-[650px]">
                <div
                  className={
                    dark
                      ? "mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.17em] text-slate-300 backdrop-blur-xl"
                      : "mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.17em] text-slate-600 backdrop-blur-xl"
                  }
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                  Neural Workspace Online
                </div>

                <h1
                  className={
                    dark
                      ? "text-4xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-[58px]"
                      : "text-4xl font-black leading-[1.03] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-[58px]"
                  }
                >
                  Your ideas.

                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                    Supercharged by AI.
                  </span>
                </h1>

                <p
                  className={
                    dark
                      ? "mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
                      : "mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base"
                  }
                >
                  Create, write and transform anything with your intelligent
                  AI workspace. One place for every idea.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/dashboard/ai-writer"
                    className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 py-3.5 text-sm font-black text-white shadow-[0_10px_40px_rgba(59,130,246,0.25)] transition hover:-translate-y-1"
                  >
                    Start Creating

                    <span className="transition group-hover:translate-x-1">
                      <Arrow />
                    </span>
                  </Link>

                  <a
                    href="#ai-tools"
                    className={
                      dark
                        ? "rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-slate-300 backdrop-blur transition hover:bg-white/[0.07] hover:text-white"
                        : "rounded-2xl border border-slate-200 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-600 backdrop-blur transition hover:bg-white hover:text-slate-900"
                    }
                  >
                    Explore AI Tools
                  </a>
                </div>
              </div>

              <div className="absolute bottom-7 right-8 hidden items-center gap-8 text-right lg:flex">
                <div>
                  <p
                    className={
                      dark
                        ? "text-lg font-black text-white"
                        : "text-lg font-black text-slate-900"
                    }
                  >
                    24.8K
                  </p>

                  <p className="text-[8px] uppercase tracking-widest text-slate-400">
                    Words
                  </p>
                </div>

                <div
                  className={
                    dark
                      ? "h-8 w-px bg-white/10"
                      : "h-8 w-px bg-slate-200"
                  }
                />

                <div>
                  <p
                    className={
                      dark
                        ? "text-lg font-black text-white"
                        : "text-lg font-black text-slate-900"
                    }
                  >
                    128
                  </p>

                  <p className="text-[8px] uppercase tracking-widest text-slate-400">
                    Generations
                  </p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.name}
                  className={
                    dark
                      ? "group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0a0c12]/80 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1"
                      : "group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_15px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1"
                  }
                >
                  <div
                    className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${statGlow[index]}`}
                  />

                  <div className="relative flex justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {stat.name}
                      </p>

                      <p
                        className={
                          dark
                            ? "mt-2 text-2xl font-black text-white"
                            : "mt-2 text-2xl font-black text-slate-900"
                        }
                      >
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[9px] font-bold text-emerald-500">
                        {stat.growth}

                        <span className="ml-1 font-normal text-slate-400">
                          growth
                        </span>
                      </p>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                        dark ? "border-white/[0.06]" : "border-slate-100"
                      } text-sm font-black ${statIconStyle[index]}`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section id="ai-tools">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2
                      className={
                        dark
                          ? "text-2xl font-black tracking-tight text-white"
                          : "text-2xl font-black tracking-tight text-slate-900"
                      }
                    >
                      AI Studio
                    </h2>

                    <span className="rounded-full border border-blue-400/10 bg-blue-500/10 px-2.5 py-1 text-[8px] font-black uppercase tracking-wider text-blue-500">
                      06 Tools
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm text-slate-500">
                    Your intelligent toolkit for creation.
                  </p>
                </div>

                <span className="hidden text-[9px] font-bold uppercase tracking-widest text-slate-400 sm:block">
                  All systems operational
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <Link key={tool.name} href={tool.href} className="group">
                    <div
                      className={
                        dark
                          ? "relative h-full overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0a0c12]/80 p-6 shadow-[0_15px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15]"
                          : "relative h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-200"
                      }
                    >
                      <div
                        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${tool.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-15`}
                      />

                      <div className="relative">
                        <div className="flex justify-between">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br ${tool.gradient} text-xl font-black text-white shadow-lg transition duration-500 group-hover:scale-110`}
                          >
                            {tool.icon}
                          </div>

                          <span className="flex h-6 items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-500/5 px-2 text-[8px] font-bold text-emerald-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />
                            Online
                          </span>
                        </div>

                        <h3
                          className={
                            dark
                              ? "mt-6 text-lg font-black text-white"
                              : "mt-6 text-lg font-black text-slate-900"
                          }
                        >
                          {tool.name}
                        </h3>

                        <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                          {tool.description}
                        </p>

                        <div
                          className={
                            dark
                              ? "mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5"
                              : "mt-6 flex items-center justify-between border-t border-slate-100 pt-5"
                          }
                        >
                          <span className="text-xs font-black text-slate-400">
                            Launch workspace
                          </span>

                          <span
                            className={
                              dark
                                ? "flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500 transition group-hover:bg-white/10 group-hover:text-white"
                                : "flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition group-hover:bg-blue-50 group-hover:text-blue-500"
                            }
                          >
                            <Arrow />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
              <div
                className={
                  dark
                    ? "relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0a0c12]/80 p-7 shadow-[0_15px_50px_rgba(0,0,0,0.25)]"
                    : "relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_15px_50px_rgba(15,23,42,0.06)]"
                }
              >
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">
                    Usage Intelligence
                  </p>

                  <h3
                    className={
                      dark
                        ? "mt-1 text-lg font-black text-white"
                        : "mt-1 text-lg font-black text-slate-900"
                    }
                  >
                    Monthly AI usage
                  </h3>

                  <div className="mt-8">
                    <div className="mb-3 flex justify-between">
                      <span className="text-xs text-slate-500">
                        Generations
                      </span>

                      <span
                        className={
                          dark
                            ? "text-xs font-black text-white"
                            : "text-xs font-black text-slate-900"
                        }
                      >
                        128 / 200
                      </span>
                    </div>

                    <div
                      className={
                        dark
                          ? "h-3 overflow-hidden rounded-full bg-white/[0.04]"
                          : "h-3 overflow-hidden rounded-full bg-slate-100"
                      }
                    >
                      <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600" />
                    </div>

                    <div className="mt-4 flex justify-between">
                      <span className="text-[10px] text-slate-400">
                        72 generations remaining
                      </span>

                      <Link
                        href="/dashboard/billing"
                        className="flex items-center gap-1 text-[10px] font-black text-blue-500"
                      >
                        Upgrade
                        <Arrow />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  dark
                    ? "rounded-[28px] border border-white/[0.07] bg-[#0a0c12]/80 p-7"
                    : "rounded-[28px] border border-slate-200 bg-white p-7"
                }
              >
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
                  Activity
                </p>

                <h3
                  className={
                    dark
                      ? "mt-1 text-lg font-black text-white"
                      : "mt-1 text-lg font-black text-slate-900"
                  }
                >
                  Recent work
                </h3>

                <div className="mt-6 space-y-4">
                  {activity.map((item) => (
                    <div key={item.title} className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${item.iconClass}`}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p
                          className={
                            dark
                              ? "truncate text-xs font-black text-white"
                              : "truncate text-xs font-black text-slate-900"
                          }
                        >
                          {item.title}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer
              className={
                dark
                  ? "border-t border-white/[0.06] pt-6"
                  : "border-t border-slate-200 pt-6"
              }
            >
              <div
                className={
                  dark
                    ? "flex flex-col justify-between gap-3 text-[10px] font-semibold text-slate-600 sm:flex-row"
                    : "flex flex-col justify-between gap-3 text-[10px] font-semibold text-slate-400 sm:flex-row"
                }
              >
                <p>© 2026 Nexuses AI. Built for creators.</p>

                <div className="flex gap-5">
                  <Link href="/dashboard/settings">Settings</Link>

                  <Link href="/dashboard/billing">Billing</Link>

                  <button type="button">Help</button>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}