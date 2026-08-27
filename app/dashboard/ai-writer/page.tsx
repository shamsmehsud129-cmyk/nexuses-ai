"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

export default function AIWriter() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [contentLength, setContentLength] = useState("Medium");
  const [contentType, setContentType] = useState("Blog Post");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generateContent = async (action = "generate") => {
    if (!topic.trim() && !content.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          contentType,
          tone,
          contentLength,
          action,
          content,
          templatePrompt:
            "You are an expert AI content writer. Create polished, useful, engaging and original content for the user.",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate content.");
      }

      if (!data?.content) {
        throw new Error("AI did not return any content.");
      }

      setContent(data.content);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyContent = async () => {
    if (!content.trim()) return;

    await navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadContent = () => {
    if (!content.trim()) return;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "nexuses-ai-content.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const clearContent = () => {
    setContent("");
    setError("");
  };

  const panel = dark
    ? "border-white/[0.08] bg-[#0a0c12]/85 shadow-[0_25px_100px_rgba(0,0,0,.35)]"
    : "border-slate-200 bg-white/90 shadow-[0_25px_100px_rgba(15,23,42,.08)]";

  const input = dark
    ? "border-white/[0.08] bg-[#07090e] text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-[#080b11] focus:ring-blue-500/10"
    : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-blue-500/10";

  const secondaryButton = dark
    ? "border-white/[0.08] bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white hover:text-slate-900";

  return (
    <main
      className={
        dark
          ? "min-h-screen overflow-hidden bg-[#05060a] text-white transition-colors duration-500"
          : "min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-900 transition-colors duration-500"
      }
    >
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {dark ? (
          <>
            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
            <div className="absolute right-[-100px] top-[15%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />
            <div className="absolute bottom-[-150px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
          </>
        ) : (
          <>
            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[140px]" />
            <div className="absolute right-[-100px] top-[15%] h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[150px]" />
            <div className="absolute bottom-[-150px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-300/10 blur-[150px]" />
          </>
        )}
      </div>

      {/* Grid Background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          opacity: dark ? 0.035 : 0.045,
          backgroundImage: dark
            ? "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)"
            : "linear-gradient(rgba(15,23,42,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />

              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-500">
                AI Writer Online
              </span>
            </div>

            <h1
              className={
                dark
                  ? "text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl"
                  : "text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl"
              }
            >
              AI Writer
            </h1>

            <p
              className={
                dark
                  ? "mt-2 max-w-xl text-sm leading-6 text-slate-400"
                  : "mt-2 max-w-xl text-sm leading-6 text-slate-500"
              }
            >
              Create high-quality articles, blogs, emails and ideas with
              powerful AI.
            </p>
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 backdrop-blur-xl ${panel}`}
          >
            <p
              className={
                dark
                  ? "text-[9px] font-bold uppercase tracking-widest text-slate-500"
                  : "text-[9px] font-bold uppercase tracking-widest text-slate-400"
              }
            >
              Plan
            </p>

            <p
              className={
                dark
                  ? "mt-1 text-xs font-black text-white"
                  : "mt-1 text-xs font-black text-slate-900"
              }
            >
              Free Workspace
            </p>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[430px_1fr]">
          {/* Create Panel */}
          <section
            className={`rounded-[30px] border p-5 backdrop-blur-2xl sm:p-6 ${panel}`}
          >
            <div className="mb-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">
                Create
              </p>

              <h2
                className={
                  dark
                    ? "mt-1 text-xl font-black text-white"
                    : "mt-1 text-xl font-black text-slate-900"
                }
              >
                What do you want to write?
              </h2>
            </div>

            <label
              className={
                dark
                  ? "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400"
                  : "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500"
              }
            >
              Topic or idea
            </label>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: How artificial intelligence is changing modern businesses..."
              className={`h-40 w-full resize-none rounded-2xl border p-4 text-sm leading-6 outline-none transition focus:ring-4 ${input}`}
            />

            {/* Content Type */}
            <div className="mt-5">
              <label
                className={
                  dark
                    ? "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400"
                    : "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500"
                }
              >
                Content type
              </label>

              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className={`w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold outline-none transition focus:border-blue-500/60 ${input}`}
              >
                <option>Blog Post</option>
                <option>Article</option>
                <option>Email</option>
                <option>Marketing Copy</option>
                <option>Social Media Post</option>
                <option>Website Content</option>
              </select>
            </div>

            {/* Tone */}
            <div className="mt-5">
              <label
                className={
                  dark
                    ? "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400"
                    : "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500"
                }
              >
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={`w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold outline-none transition focus:border-blue-500/60 ${input}`}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Casual</option>
                <option>Creative</option>
                <option>Persuasive</option>
                <option>Formal</option>
                <option>Confident</option>
              </select>
            </div>

            {/* Content Length */}
            <div className="mt-5">
              <label
                className={
                  dark
                    ? "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400"
                    : "mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500"
                }
              >
                Content length
              </label>

              <div className="grid grid-cols-3 gap-2">
                {["Short", "Medium", "Long"].map((length) => (
                  <button
                    key={length}
                    type="button"
                    onClick={() => setContentLength(length)}
                    className={`rounded-xl border px-3 py-3 text-xs font-black transition ${
                      contentLength === length
                        ? dark
                          ? "border-blue-500/50 bg-blue-500/15 text-blue-300 shadow-[0_0_25px_rgba(59,130,246,.12)]"
                          : "border-blue-300 bg-blue-50 text-blue-600 shadow-[0_0_25px_rgba(59,130,246,.08)]"
                        : dark
                          ? "border-white/10 bg-white/[0.025] text-slate-500 hover:border-white/20 hover:text-white"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-200 hover:text-slate-900"
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold leading-5 text-red-500">
                {error}
              </div>
            )}

            {/* Generate */}
            <button
              type="button"
              onClick={() => generateContent("generate")}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 py-4 text-sm font-black text-white shadow-[0_15px_40px_rgba(59,130,246,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(59,130,246,.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating with AI...
                </>
              ) : (
                <>
                  <span className="text-base">✦</span>
                  Generate Content
                </>
              )}
            </button>
          </section>

          {/* Output Panel */}
          <section
            className={`min-h-[650px] rounded-[30px] border backdrop-blur-2xl ${panel}`}
          >
            <div
              className={
                dark
                  ? "flex flex-col gap-4 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  : "flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              }
            >
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
                  AI Output
                </p>

                <h2
                  className={
                    dark
                      ? "mt-1 text-xl font-black text-white"
                      : "mt-1 text-xl font-black text-slate-900"
                  }
                >
                  Generated Content
                </h2>
              </div>

              {content && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => generateContent("regenerate")}
                    disabled={loading}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold transition disabled:opacity-50 ${secondaryButton}`}
                  >
                    ↻ Regenerate
                  </button>

                  <button
                    type="button"
                    onClick={copyContent}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${secondaryButton}`}
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>

                  <button
                    type="button"
                    onClick={downloadContent}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${secondaryButton}`}
                  >
                    Download
                  </button>

                  <button
                    type="button"
                    onClick={clearContent}
                    className="rounded-xl border border-red-500/10 bg-red-500/5 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-500/10"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-7">
              {/* Empty State */}
              {!content && !loading ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-[30px] bg-blue-500/20 blur-2xl" />

                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-blue-400/20 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-violet-500/10 text-4xl shadow-[0_0_50px_rgba(59,130,246,.15)]">
                      ✦
                    </div>
                  </div>

                  <h3
                    className={
                      dark
                        ? "text-lg font-black text-white"
                        : "text-lg font-black text-slate-900"
                    }
                  >
                    Your AI content will appear here
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Enter a topic, choose your preferences and let Nexuses AI
                    create polished content for you.
                  </p>
                </div>
              ) : loading ? (
                /* Loading State */
                <div className="flex min-h-[500px] flex-col items-center justify-center">
                  <div className="relative">
                    <div
                      className={
                        dark
                          ? "h-20 w-20 animate-spin rounded-full border-2 border-white/10 border-t-blue-500 border-r-violet-500"
                          : "h-20 w-20 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500 border-r-violet-500"
                      }
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl">✦</span>
                    </div>
                  </div>

                  <p
                    className={
                      dark
                        ? "mt-6 text-sm font-black text-white"
                        : "mt-6 text-sm font-black text-slate-900"
                    }
                  >
                    Nexuses AI is writing...
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Generating high-quality content for you
                  </p>
                </div>
              ) : (
                /* Generated Content */
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-500">
                      AI Generated
                    </span>

                    <span
                      className={
                        dark
                          ? "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-bold text-slate-500"
                          : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold text-slate-500"
                      }
                    >
                      {contentType}
                    </span>

                    <span
                      className={
                        dark
                          ? "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-bold text-slate-500"
                          : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold text-slate-500"
                      }
                    >
                      {tone}
                    </span>
                  </div>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`min-h-[500px] w-full resize-y rounded-2xl border p-6 text-sm leading-7 outline-none transition focus:border-blue-500/40 ${input}`}
                  />

                  <div
                    className={
                      dark
                        ? "mt-4 flex items-center justify-between text-[10px] font-semibold text-slate-600"
                        : "mt-4 flex items-center justify-between text-[10px] font-semibold text-slate-400"
                    }
                  >
                    <span>Editable content</span>

                    <span>
                      {content.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Bottom Features */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["✦", "Powered by Gemini", "Advanced AI generation"],
            ["⚡", "Fast generation", "Create content in seconds"],
            ["◈", "Creator focused", "Built for modern workflows"],
          ].map(([icon, title, description]) => (
            <div
              key={title}
              className={`rounded-2xl border p-4 backdrop-blur-xl ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025]"
                  : "border-slate-200 bg-white/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  {icon}
                </div>

                <div>
                  <p
                    className={
                      dark
                        ? "text-xs font-black text-slate-200"
                        : "text-xs font-black text-slate-800"
                    }
                  >
                    {title}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}