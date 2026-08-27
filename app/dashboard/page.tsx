"use client";

import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  PenLine,
  Mail,
  Share2,
  FolderKanban,
  FileText,
  History,
  Settings,
  CreditCard,
  MessageCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  BarChart3,
} from "lucide-react";

type Tool = {
  href: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  gradient: string;
};

type Stat = {
  name: string;
  value: string;
  growth: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const tools: Tool[] = [
  {
    href: "/dashboard/ai-writer",
    name: "AI Writer",
    description:
      "Create articles, blogs, emails and powerful written content.",
    icon: PenLine,
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    href: "/dashboard/email-writer",
    name: "Email Writer",
    description: "Craft polished professional emails in seconds.",
    icon: Mail,
    gradient: "from-violet-400 to-purple-600",
  },
  {
    href: "/dashboard/social-media",
    name: "Social Media",
    description:
      "Generate captions, posts and engaging social content.",
    icon: Share2,
    gradient: "from-pink-400 to-rose-600",
  },
  {
    href: "/dashboard/ai-assistant",
    name: "AI Assistant",
    description:
      "Brainstorm ideas, solve problems and ask anything.",
    icon: MessageCircle,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    href: "/dashboard/ai-summarizer",
    name: "AI Summarizer",
    description:
      "Turn long content into clear, concise and useful summaries.",
    icon: FileText,
    gradient: "from-yellow-400 to-orange-600",
  },
  {
    href: "/dashboard/content-rewriter",
    name: "Content Rewriter",
    description:
      "Rewrite content with better clarity, grammar and professional flow.",
    icon: RefreshCw,
    gradient: "from-fuchsia-400 to-violet-600",
  },
];

const stats: Stat[] = [
  {
    name: "AI Generations",
    value: "128",
    growth: "+12.4%",
    icon: Sparkles,
  },
  {
    name: "Words Created",
    value: "24.8K",
    growth: "+18.2%",
    icon: FileText,
  },
  {
    name: "Active Tools",
    value: "6 / 6",
    growth: "100%",
    icon: BarChart3,
  },
  {
    name: "Saved Projects",
    value: "42",
    growth: "+8.1%",
    icon: FolderKanban,
  },
];

function NavItem({
  href,
  icon: Icon,
  children,
  dark,
  active = false,
}: {
  href: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
  children: React.ReactNode;
  dark: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? dark
            ? "border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-white"
            : "border border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50 text-slate-900"
          : dark
            ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {active && (
        <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500" />
      )}

      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          active
            ? "bg-blue-500/15 text-blue-400"
            : dark
              ? "bg-white/[0.04] text-slate-400"
              : "bg-slate-100 text-slate-500"
        }`}
      >
        <Icon size={18} strokeWidth={2} />
      </span>

      <span>{children}</span>

      {active && (
        <ArrowRight
          size={16}
          className="ml-auto text-blue-400 transition group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

function Logo() {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_30px_rgba(59,130,246,0.35)]">
      <div className="absolute inset-[1px] rounded-2xl bg-black/20" />
      <span className="relative text-lg font-black text-white">
        N
      </span>
    </div>
  );
}

export default function Dashboard() {
  const { resolvedTheme, setTheme } = useTheme();

  const [dark, setDark] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(resolvedTheme !== "light");

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [resolvedTheme]);

  const toggleTheme = () => {
    setTheme(dark ? "light" : "dark");
    setDark(!dark);
  };

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Creator";

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050816]" />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? "bg-[#050816] text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside
          className={`hidden w-[270px] shrink-0 border-r lg:flex lg:flex-col ${
            dark
              ? "border-white/[0.07] bg-[#070b18]"
              : "border-slate-200 bg-white"
          }`}
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 px-6 py-6">
            <Logo />

            <div>
              <div className="text-lg font-black tracking-tight">
                Nexuses AI
              </div>

              <div
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  dark
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                AI Workspace
              </div>
            </div>
          </div>

          {/* WORKSPACE */}
          <div className="px-4">
            <div
              className={`mb-3 px-3 text-[10px] font-black uppercase tracking-[0.18em] ${
                dark
                  ? "text-slate-600"
                  : "text-slate-400"
              }`}
            >
              Workspace
            </div>

            <nav className="space-y-1">

              <NavItem
                href="/dashboard"
                icon={LayoutDashboard}
                dark={dark}
                active
              >
                Dashboard
              </NavItem>

              <NavItem
                href="/dashboard/ai-writer"
                icon={PenLine}
                dark={dark}
              >
                AI Writer
              </NavItem>

              <NavItem
                href="/dashboard/email-writer"
                icon={Mail}
                dark={dark}
              >
                Email Writer
              </NavItem>

              <NavItem
                href="/dashboard/social-media"
                icon={Share2}
                dark={dark}
              >
                Social Media
              </NavItem>

              <NavItem
                href="/dashboard/ai-assistant"
                icon={MessageCircle}
                dark={dark}
              >
                AI Assistant
              </NavItem>

              {/* ADDED */}
              <NavItem
                href="/dashboard/ai-summarizer"
                icon={FileText}
                dark={dark}
              >
                AI Summarizer
              </NavItem>

              {/* ADDED */}
              <NavItem
                href="/dashboard/content-rewriter"
                icon={RefreshCw}
                dark={dark}
              >
                Content Rewriter
              </NavItem>

            </nav>
          </div>

          {/* MANAGE */}
          <div className="mt-7 px-4">
            <div
              className={`mb-3 px-3 text-[10px] font-black uppercase tracking-[0.18em] ${
                dark
                  ? "text-slate-600"
                  : "text-slate-400"
              }`}
            >
              Manage
            </div>

            <nav className="space-y-1">

              <NavItem
                href="/dashboard/projects"
                icon={FolderKanban}
                dark={dark}
              >
                Projects
              </NavItem>

              <NavItem
                href="/dashboard/history"
                icon={History}
                dark={dark}
              >
                History
              </NavItem>

              <NavItem
                href="/dashboard/analytics"
                icon={BarChart3}
                dark={dark}
              >
                Analytics
              </NavItem>

              <NavItem
                href="/dashboard/billing"
                icon={CreditCard}
                dark={dark}
              >
                Billing
              </NavItem>

              <NavItem
                href="/dashboard/settings"
                icon={Settings}
                dark={dark}
              >
                Settings
              </NavItem>

            </nav>
          </div>

          {/* FREE PLAN */}
          <div className="mt-auto p-4">
            <div
              className={`rounded-2xl border p-4 ${
                dark
                  ? "border-white/[0.07] bg-white/[0.03]"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="text-cyan-400"
                />

                <span className="text-xs font-bold">
                  Free Plan
                </span>
              </div>

              <div
                className={`mb-3 text-[11px] ${
                  dark
                    ? "text-slate-500"
                    : "text-slate-500"
                }`}
              >
                24 generations remaining
              </div>

              <div
                className={`h-1.5 overflow-hidden rounded-full ${
                  dark
                    ? "bg-white/[0.08]"
                    : "bg-slate-200"
                }`}
              >
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1 overflow-hidden">

          {/* TOP BAR */}
          <header
            className={`flex h-[76px] items-center justify-between border-b px-5 sm:px-8 ${
              dark
                ? "border-white/[0.07]"
                : "border-slate-200 bg-white/70"
            }`}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <Logo />

              <span className="font-black">
                Nexuses AI
              </span>
            </div>

            <div className="hidden lg:block">
              <p
                className={`text-xs font-semibold ${
                  dark
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                AI WORKSPACE
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* THEME */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex h-10 items-center gap-2 rounded-xl border px-3 transition ${
                  dark
                    ? "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {dark ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}

                <span className="hidden text-xs font-bold sm:block">
                  {dark ? "Light" : "Dark"}
                </span>
              </button>

              {/* USER */}
              <div
                className={`hidden items-center gap-3 rounded-xl border px-3 py-2 sm:flex ${
                  dark
                    ? "border-white/[0.07] bg-white/[0.03]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-black text-white">
                  {displayName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="max-w-[150px]">
                  <div className="truncate text-xs font-bold">
                    {displayName}
                  </div>

                  <div
                    className={`truncate text-[10px] ${
                      dark
                        ? "text-slate-500"
                        : "text-slate-400"
                    }`}
                  >
                    {user?.email || "Free Plan"}
                  </div>
                </div>
              </div>

            </div>
          </header>

          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">

            {/* HERO */}
            <section
              className={`relative overflow-hidden rounded-[28px] border p-7 sm:p-9 ${
                dark
                  ? "border-white/[0.08] bg-gradient-to-br from-blue-950/60 via-[#0a1024] to-violet-950/40"
                  : "border-slate-200 bg-gradient-to-br from-white via-blue-50 to-violet-50"
              }`}
            >
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative max-w-3xl">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-400">
                  <Sparkles size={13} />
                  AI-powered workspace
                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                    {displayName}
                  </span>
                </h1>

                <p
                  className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${
                    dark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Turn your ideas into high-quality content
                  with powerful AI tools built for modern
                  creators.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <Link
                    href="/dashboard/ai-writer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                  >
                    Start Creating
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/dashboard/projects"
                    className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition ${
                      dark
                        ? "border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    View Projects
                  </Link>

                </div>
              </div>
            </section>

            {/* STATS */}
            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.name}
                    className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 ${
                      dark
                        ? "border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04]"
                        : "border-slate-200 bg-white shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          dark
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <span className="text-xs font-bold text-emerald-400">
                        {stat.growth}
                      </span>

                    </div>

                    <div className="mt-5">

                      <div
                        className={`text-xs font-semibold ${
                          dark
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {stat.name}
                      </div>

                      <div className="mt-1 text-2xl font-black">
                        {stat.value}
                      </div>

                    </div>
                  </div>
                );
              })}
            </section>

            {/* TOOLS */}
            <section className="mt-10">

              <div className="mb-5 flex items-end justify-between">

                <div>
                  <p
                    className={`text-[10px] font-black uppercase tracking-[0.18em] ${
                      dark
                        ? "text-cyan-400"
                        : "text-blue-600"
                    }`}
                  >
                    Your toolkit
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    AI Tools
                  </h2>
                </div>

                <span
                  className={`hidden text-xs font-semibold sm:block ${
                    dark
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                >
                  6 powerful tools
                </span>

              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {tools.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`group relative overflow-hidden rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1 ${
                        dark
                          ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.13] hover:bg-white/[0.045]"
                          : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-lg"
                      }`}
                    >

                      <div
                        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${tool.gradient} opacity-10 blur-2xl transition duration-500 group-hover:opacity-20`}
                      />

                      <div className="relative">

                        <div className="flex items-start justify-between">

                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg`}
                          >
                            <Icon
                              size={21}
                              strokeWidth={2}
                            />
                          </div>

                          <ArrowRight
                            size={18}
                            className="text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
                          />

                        </div>

                        <h3 className="mt-6 text-lg font-black">
                          {tool.name}
                        </h3>

                        <p
                          className={`mt-2 min-h-[48px] text-sm leading-6 ${
                            dark
                              ? "text-slate-500"
                              : "text-slate-500"
                          }`}
                        >
                          {tool.description}
                        </p>

                        <div
                          className={`mt-5 h-px ${
                            dark
                              ? "bg-white/[0.06]"
                              : "bg-slate-100"
                          }`}
                        />

                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-400">
                          Open tool

                          <ArrowRight
                            size={14}
                            className="transition group-hover:translate-x-1"
                          />
                        </div>

                      </div>
                    </Link>
                  );
                })}

              </div>
            </section>

            {/* BOTTOM USAGE */}
            <section className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">

              <div
                className={`rounded-[24px] border p-6 ${
                  dark
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="font-black">
                      Monthly Usage
                    </h3>

                    <p
                      className={`mt-1 text-xs ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      Track your AI generation activity.
                    </p>
                  </div>

                  <span className="text-sm font-black text-cyan-400">
                    68%
                  </span>

                </div>

                <div
                  className={`mt-6 h-3 overflow-hidden rounded-full ${
                    dark
                      ? "bg-white/[0.07]"
                      : "bg-slate-100"
                  }`}
                >
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
                </div>

                <div className="mt-3 flex justify-between text-[11px]">

                  <span
                    className={
                      dark
                        ? "text-slate-500"
                        : "text-slate-400"
                    }
                  >
                    76 of 100 generations
                  </span>

                  <span className="font-bold text-slate-400">
                    Free Plan
                  </span>

                </div>

              </div>

              <div
                className={`rounded-[24px] border p-6 ${
                  dark
                    ? "border-white/[0.07] bg-gradient-to-br from-violet-500/10 to-blue-500/5"
                    : "border-slate-200 bg-gradient-to-br from-violet-50 to-blue-50"
                }`}
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white">
                  <Sparkles size={18} />
                </div>

                <h3 className="mt-4 font-black">
                  Create something amazing
                </h3>

                <p
                  className={`mt-2 text-xs leading-5 ${
                    dark
                      ? "text-slate-500"
                      : "text-slate-500"
                  }`}
                >
                  Choose an AI tool and start turning your
                  ideas into polished content.
                </p>

              </div>

            </section>

            {/* FOOTER */}
            <footer
              className={`mt-12 border-t py-6 text-center text-xs ${
                dark
                  ? "border-white/[0.06] text-slate-600"
                  : "border-slate-200 text-slate-400"
              }`}
            >
              © 2026 Nexuses AI. All rights reserved.
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}