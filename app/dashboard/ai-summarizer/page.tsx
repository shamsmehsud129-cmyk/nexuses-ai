"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type SummaryLength = "Short" | "Medium" | "Detailed";

export default function AISummarizerPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState<SummaryLength>("Medium");

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && theme === "dark";

  const summarize = async () => {
    if (!content.trim() || loading) return;

    setLoading(true);
    setSummary("");
    setCopied(false);

    try {
      const response = await fetch("/api/ai-summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: content,
          length: length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to summarize content.");
      }

      if (!data.summary) {
        throw new Error("AI did not return a summary.");
      }

      setSummary(data.summary);
    } catch (error) {
      setSummary(
        error instanceof Error
          ? `⚠️ ${error.message}`
          : "⚠️ Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async () => {
    if (!summary || summary.startsWith("⚠️")) return;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const clearAll = () => {
    setContent("");
    setSummary("");
    setCopied(false);
    setLength("Medium");
  };

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  return (
    <main
      className={
        dark
          ? "relative min-h-screen overflow-hidden bg-[#05060a] text-white transition-colors duration-500"
          : "relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500"
      }
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={
            dark
              ? "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[140px]"
              : "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[140px]"
          }
        />

        <div
          className={
            dark
              ? "absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[150px]"
              : "absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-orange-400/10 blur-[150px]"
          }
        />

        <div
          className={
            dark
              ? "absolute bottom-[-180px] left-[35%] h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[140px]"
              : "absolute bottom-[-180px] left-[35%] h-[450px] w-[450px] rounded-full bg-amber-300/10 blur-[140px]"
          }
        />
      </div>

      {/* GRID */}
      <div
        className={
          dark
            ? "pointer-events-none fixed inset-0 opacity-[0.035]"
            : "pointer-events-none fixed inset-0 opacity-[0.025]"
        }
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: dark
              ? "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)"
              : "linear-gradient(rgba(15,23,42,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">

            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-orange-500/30 blur-xl" />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-xl font-black text-white shadow-xl shadow-orange-500/20">
                ▤
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">

                <h1
                  className={
                    dark
                      ? "text-2xl font-black tracking-tight text-white"
                      : "text-2xl font-black tracking-tight text-slate-900"
                  }
                >
                  AI Summarizer
                </h1>

                <span
                  className={
                    dark
                      ? "rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-400"
                      : "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600"
                  }
                >
                  Online
                </span>

              </div>

              <p
                className={
                  dark
                    ? "mt-1 text-sm text-slate-400"
                    : "mt-1 text-sm text-slate-500"
                }
              >
                Turn long content into clear, powerful summaries.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearAll}
            className={
              dark
                ? "w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-orange-400/30 hover:bg-orange-500/10 hover:text-orange-300"
                : "w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
            }
          >
            + New Summary
          </button>
        </header>

        {/* MAIN */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* INPUT PANEL */}
          <div
            className={
              dark
                ? "relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0c12]/85 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
                : "relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-7"
            }
          >

            <div
              className={
                dark
                  ? "absolute -right-20 -top-20 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl"
                  : "absolute -right-20 -top-20 h-44 w-44 rounded-full bg-orange-400/10 blur-3xl"
              }
            />

            <div className="relative">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500">
                    Input
                  </p>

                  <h2
                    className={
                      dark
                        ? "mt-1 text-lg font-black text-white"
                        : "mt-1 text-lg font-black text-slate-900"
                    }
                  >
                    Your Content
                  </h2>
                </div>

                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-400">
                    {content.length} characters
                  </p>

                  <p className="mt-1 text-[9px] font-bold text-slate-400">
                    {wordCount} words
                  </p>
                </div>

              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your article, document, notes or any long content here..."
                className={
                  dark
                    ? "min-h-[390px] w-full resize-none rounded-2xl border border-white/10 bg-[#05060a] p-5 text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-[#070910] focus:ring-4 focus:ring-orange-500/10"
                    : "min-h-[390px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                }
              />

              {/* SUMMARY LENGTH */}
              <div className="mt-5">

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Summary Length
                  </p>

                  <span className="text-[9px] font-bold text-orange-500">
                    {length}
                  </span>

                </div>

                <div className="grid grid-cols-3 gap-2">

                  {(["Short", "Medium", "Detailed"] as SummaryLength[]).map(
                    (item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setLength(item)}
                        className={
                          length === item
                            ? dark
                              ? "rounded-xl border border-orange-400/30 bg-orange-500/15 px-3 py-2.5 text-xs font-bold text-orange-300 shadow-[0_0_25px_rgba(249,115,22,0.08)]"
                              : "rounded-xl border border-orange-300 bg-orange-50 px-3 py-2.5 text-xs font-bold text-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.08)]"
                            : dark
                              ? "rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-bold text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                              : "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        }
                      >
                        {item}
                      </button>
                    )
                  )}

                </div>
              </div>

              {/* GENERATE */}
              <button
                type="button"
                onClick={summarize}
                disabled={!content.trim() || loading}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analyzing Content...
                  </>
                ) : (
                  <>✦ Generate Summary</>
                )}
              </button>

            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div
            className={
              dark
                ? "relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0c12]/85 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
                : "relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-7"
            }
          >

            <div
              className={
                dark
                  ? "absolute -left-20 -top-20 h-44 w-44 rounded-full bg-yellow-500/10 blur-3xl"
                  : "absolute -left-20 -top-20 h-44 w-44 rounded-full bg-yellow-400/10 blur-3xl"
              }
            />

            <div className="relative">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500">
                    AI Output
                  </p>

                  <h2
                    className={
                      dark
                        ? "mt-1 text-lg font-black text-white"
                        : "mt-1 text-lg font-black text-slate-900"
                    }
                  >
                    Your Summary
                  </h2>
                </div>

                {summary && !summary.startsWith("⚠️") && (
                  <button
                    type="button"
                    onClick={copySummary}
                    className={
                      dark
                        ? "rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                        : "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    }
                  >
                    {copied ? "✓ Copied" : "⧉ Copy"}
                  </button>
                )}

              </div>

              {/* OUTPUT */}
              <div
                className={
                  dark
                    ? "min-h-[390px] rounded-2xl border border-white/10 bg-[#05060a] p-5"
                    : "min-h-[390px] rounded-2xl border border-slate-200 bg-slate-50 p-5"
                }
              >

                {loading ? (
                  <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                    <div className="relative mb-6">

                      <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-2xl" />

                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 text-2xl text-orange-400">
                        ▤
                      </div>

                    </div>

                    <p
                      className={
                        dark
                          ? "text-sm font-bold text-white"
                          : "text-sm font-bold text-slate-700"
                      }
                    >
                      Analyzing your content...
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Creating your {length.toLowerCase()} summary
                    </p>

                  </div>
                ) : summary ? (

                  <div
                    className={
                      dark
                        ? "whitespace-pre-wrap text-sm leading-7 text-slate-300"
                        : "whitespace-pre-wrap text-sm leading-7 text-slate-700"
                    }
                  >
                    {summary}
                  </div>

                ) : (

                  <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                    <div
                      className={
                        dark
                          ? "mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-2xl text-slate-600"
                          : "mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-2xl text-slate-300"
                      }
                    >
                      ✦
                    </div>

                    <p
                      className={
                        dark
                          ? "text-sm font-bold text-slate-400"
                          : "text-sm font-bold text-slate-500"
                      }
                    >
                      Your summary will appear here
                    </p>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                      Paste your content and choose your preferred summary
                      length.
                    </p>

                  </div>
                )}

              </div>

              {/* OUTPUT INFO */}
              {summary && !summary.startsWith("⚠️") && (
                <div
                  className={
                    dark
                      ? "mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      : "mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  }
                >

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">
                      Summary Mode
                    </p>

                    <p
                      className={
                        dark
                          ? "mt-1 text-[10px] font-bold text-slate-300"
                          : "mt-1 text-[10px] font-bold text-slate-600"
                      }
                    >
                      {length}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">
                      Output
                    </p>

                    <p
                      className={
                        dark
                          ? "mt-1 text-[10px] font-bold text-slate-300"
                          : "mt-1 text-[10px] font-bold text-slate-600"
                      }
                    >
                      {summary.length} characters
                    </p>
                  </div>

                </div>
              )}

            </div>
          </div>

        </section>

        {/* FOOTER */}
        <div
          className={
            dark
              ? "mt-6 flex flex-col justify-between gap-2 border-t border-white/[0.06] px-1 pt-5 text-[10px] text-slate-500 sm:flex-row"
              : "mt-6 flex flex-col justify-between gap-2 border-t border-slate-200 px-1 pt-5 text-[10px] text-slate-400 sm:flex-row"
          }
        >
          <p>Powered by NexusAI</p>
          <p>AI Summarization Workspace</p>
        </div>

      </div>
    </main>
  );
}