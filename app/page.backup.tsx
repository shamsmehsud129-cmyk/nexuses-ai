"use client";

import Link from "next/link";

const features = [
  {
    icon: "✦",
    title: "AI Writer",
    description:
      "Create blogs, articles, emails and professional content in seconds.",
    href: "/dashboard/ai-writer",
  },
  {
    icon: "✉",
    title: "Email Writer",
    description:
      "Write polished professional emails with the right tone instantly.",
    href: "/dashboard/email-writer",
  },
  {
    icon: "◈",
    title: "Social Media",
    description:
      "Generate engaging captions and social posts for your audience.",
    href: "/dashboard/social-media",
  },
  {
    icon: "⌁",
    title: "AI Articles",
    description:
      "Turn ideas into structured, detailed and high-quality articles.",
    href: "/dashboard/ai-article",
  },
  {
    icon: "◇",
    title: "Product Copy",
    description:
      "Create persuasive product descriptions that convert visitors.",
    href: "/dashboard/product-description",
  },
  {
    icon: "◎",
    title: "More AI Tools",
    description:
      "A growing collection of intelligent tools for modern creators.",
    href: "/dashboard",
  },
];

const stats = [
  ["10x", "Faster content creation"],
  ["24/7", "AI workspace"],
  ["6+", "Powerful AI tools"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white">

      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[160px]" />
        <div className="absolute bottom-[-200px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <header className="relative z-20 border-b border-white/[0.07] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-[0_0_35px_rgba(99,102,241,0.35)]">

              <div className="absolute inset-[1px] rounded-2xl bg-black/20" />

              <span className="relative text-lg font-black">
                N
              </span>

            </div>

            <div>
              <p className="text-[17px] font-black tracking-tight">
                Nexuses AI
              </p>

              <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/40">
                Intelligent Workspace
              </p>
            </div>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">

            <a
              href="#features"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Pricing
            </a>

          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            <Link
              href="/dashboard"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white sm:block"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Get Started
            </Link>

          </div>

        </div>
      </header>

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative z-10">

        <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:pb-32 lg:pt-36">

          <div className="mx-auto max-w-5xl text-center">

            {/* BADGE */}
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">

              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                AI Workspace • Now Available
              </span>

            </div>

            {/* HEADING */}
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[92px]">

              Create smarter.

              <span className="block bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                Create faster.
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
              Nexuses AI gives you one powerful workspace to write,
              create, improve and transform content with intelligent AI tools.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/dashboard"
                className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-[0_15px_50px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
              >
                Start Creating Free

                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <a
                href="#features"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white/80 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
              >
                Explore AI Tools
              </a>

            </div>

            <p className="mt-5 text-[11px] text-white/30">
              No credit card required • Start instantly
            </p>

          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto mt-20 max-w-5xl">

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-cyan-500/20 blur-[70px]" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0c0c10]/90 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

              {/* TOP BAR */}
              <div className="flex h-12 items-center gap-2 border-b border-white/[0.06] px-4">

                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />

                <div className="ml-4 h-7 flex-1 rounded-lg bg-white/[0.035]" />

              </div>

              {/* DASHBOARD MOCKUP */}
              <div className="grid min-h-[330px] grid-cols-[170px_1fr]">

                {/* SIDEBAR */}
                <div className="border-r border-white/[0.06] p-5">

                  <div className="mb-8 flex items-center gap-2">

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-black">
                      N
                    </div>

                    <span className="text-[10px] font-bold">
                      Nexuses
                    </span>

                  </div>

                  <div className="space-y-2">

                    {["Dashboard", "AI Writer", "Email", "Social"].map(
                      (item, i) => (
                        <div
                          key={item}
                          className={`rounded-xl px-3 py-2.5 text-[9px] font-semibold ${
                            i === 0
                              ? "bg-white/10 text-white"
                              : "text-white/30"
                          }`}
                        >
                          {item}
                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* MAIN */}
                <div className="p-6 sm:p-8">

                  <div className="flex items-center justify-between">

                    <div>
                      <div className="h-3 w-24 rounded bg-white/10" />
                      <div className="mt-2 h-2 w-40 rounded bg-white/[0.05]" />
                    </div>

                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500" />

                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">

                    {[
                      "AI Writer",
                      "Email Writer",
                      "Social Media",
                    ].map((item, i) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
                      >

                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs ${
                            i === 0
                              ? "bg-violet-500/15 text-violet-300"
                              : i === 1
                              ? "bg-blue-500/15 text-blue-300"
                              : "bg-cyan-500/15 text-cyan-300"
                          }`}
                        >
                          {i === 0 ? "✦" : i === 1 ? "✉" : "◈"}
                        </div>

                        <div className="mt-4 h-2 w-16 rounded bg-white/10" />

                        <div className="mt-2 h-1.5 w-24 rounded bg-white/[0.05]" />

                      </div>
                    ))}

                  </div>

                  <div className="mt-4 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-violet-500/[0.07] to-blue-500/[0.03] p-5">

                    <div className="flex gap-3">

                      <div className="h-8 w-8 shrink-0 rounded-xl bg-violet-500/20" />

                      <div className="flex-1">

                        <div className="h-2 w-32 rounded bg-white/10" />

                        <div className="mt-3 space-y-2">

                          <div className="h-1.5 w-full rounded bg-white/[0.06]" />
                          <div className="h-1.5 w-[90%] rounded bg-white/[0.06]" />
                          <div className="h-1.5 w-[70%] rounded bg-white/[0.06]" />

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* STATS */}
      {/* ===================================================== */}

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015]">

        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          {stats.map(([value, label]) => (
            <div
              key={label}
              className="px-8 py-8 text-center"
            >
              <p className="text-3xl font-black tracking-tight">
                {value}
              </p>

              <p className="mt-1 text-[11px] font-semibold text-white/35">
                {label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* ===================================================== */}
      {/* FEATURES */}
      {/* ===================================================== */}

      <section
        id="features"
        className="relative z-10 px-5 py-24 sm:px-8 lg:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-violet-400">
              Powerful AI tools
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Everything you need.
              <span className="block text-white/35">
                One intelligent workspace.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40">
              From the first idea to the final piece of content,
              Nexuses AI helps you move faster.
            </p>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.045]"
              >

                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                <div className="relative">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg text-violet-300">
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-lg font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-white/35">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white/50 transition group-hover:text-white">
                    Open tool
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================== */}

      <section
        id="how-it-works"
        className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] px-5 py-24 sm:px-8 lg:py-32"
      >

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-400">
              Simple workflow
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              From idea to finished content.
            </h2>

          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">

            {[
              [
                "01",
                "Choose a tool",
                "Pick the AI tool that matches what you want to create.",
              ],
              [
                "02",
                "Describe your idea",
                "Give Nexuses AI your topic, instructions and preferred tone.",
              ],
              [
                "03",
                "Create & refine",
                "Generate your content, improve it and make it yours.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b0b0f] p-7"
              >

                <span className="text-xs font-black text-violet-400">
                  {number}
                </span>

                <h3 className="mt-7 text-xl font-black">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/35">
                  {description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* CTA */}
      {/* ===================================================== */}

      <section
        id="pricing"
        className="relative z-10 px-5 py-24 sm:px-8 lg:py-32"
      >

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-cyan-500/10 px-6 py-16 text-center sm:px-12">

          <div className="absolute left-1/2 top-[-150px] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl">
              ✦
            </div>

            <h2 className="mx-auto mt-7 max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Your next great idea starts here.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
              Start creating with Nexuses AI and experience a faster,
              smarter way to build professional content.
            </p>

            <Link
              href="/dashboard"
              className="mt-9 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-black transition hover:-translate-y-1 hover:bg-white/90"
            >
              Start Creating Free
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="relative z-10 border-t border-white/[0.07]">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-black">
              N
            </div>

            <div>

              <p className="text-sm font-black">
                Nexuses AI
              </p>

              <p className="text-[9px] text-white/25">
                Intelligent workspace for creators
              </p>

            </div>

          </div>

          <p className="text-[10px] text-white/25">
            © 2026 Nexuses AI. Built for creators.
          </p>

          <div className="flex gap-5 text-[10px] font-semibold text-white/30">

            <Link
              href="/dashboard"
              className="transition hover:text-white"
            >
              Dashboard
            </Link>

            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <Link
              href="/dashboard/settings"
              className="transition hover:text-white"
            >
              Settings
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}