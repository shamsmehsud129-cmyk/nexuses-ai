"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type RewriteTone = "Professional" | "Friendly" | "Simple" | "Creative";

export default function ContentRewriterPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [content, setContent] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<RewriteTone>("Professional");

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && theme === "dark";

  const rewriteContent = async () => {
    if (!content.trim() || loading) return;

    setLoading(true);
    setRewritten("");
    setCopied(false);

    try {
      const response = await fetch("/api/content-rewriter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: content,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to rewrite content."
        );
      }

      if (!data.rewritten) {
        throw new Error("AI did not return rewritten content.");
      }

      setRewritten(data.rewritten);
    } catch (error) {
      setRewritten(
        error instanceof Error
          ? `⚠️ ${error.message}`
          : "⚠️ Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyRewritten = async () => {
    if (!rewritten || rewritten.startsWith("⚠️")) return;

    try {
      await navigator.clipboard.writeText(rewritten);
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
    setRewritten("");
    setCopied(false);
    setTone("Professional");
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
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={
            dark
              ? "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]"
              : "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-fuchsia-400/10 blur-[140px]"
          }
        />

        <div
          className={
            dark
              ? "absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]"
              : "absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[150px]"
          }
        />

        <div
          className={
            dark
              ? "absolute bottom-[-180px] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[140px]"
              : "absolute bottom-[-180px] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-300/10 blur-[140px]"
          }
        />
      </div>

      {/* Grid */}
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

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">

            <div className="relative">
              <div
                className={
                  dark
                    ? "absolute inset-0 rounded-2xl bg-fuchsia-500/20 blur-xl"
                    : "absolute inset-0 rounded-2xl bg-fuchsia-400/20 blur-xl"
                }
              />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-400 via-violet-500 to-purple-600 text-xl font-black text-white shadow-xl shadow-fuchsia-500/20">
                ✎
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
                  Content Rewriter
                </h1>

                <span
                  className={
                    dark
                      ? "rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-400"
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
                Rewrite your content with better clarity, flow and style.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearAll}
            className={
              dark
                ? "w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-300 shadow-sm transition hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
                : "w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-fuchsia-200 hover:bg-fuchsia-50 hover:text-fuchsia-600"
            }
          >
            + New Rewrite
          </button>
        </header>

        {/* Main */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* Input Panel */}
          <div
            className={
              dark
                ? "relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0c12]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
                : "relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-7"
            }
          >
            <div
              className={
                dark
                  ? "absolute -right-20 -top-20 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl"
                  : "absolute -right-20 -top-20 h-44 w-44 rounded-full bg-fuchsia-400/10 blur-3xl"
              }
            />

            <div className="relative">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-fuchsia-500">
                    Input
                  </p>

                  <h2
                    className={
                      dark
                        ? "mt-1 text-lg font-black text-white"
                        : "mt-1 text-lg font-black text-slate-900"
                    }
                  >
                    Original Content
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
                placeholder="Paste your article, paragraph, email or any content you want to rewrite..."
                className={
                  dark
                    ? "min-h-[390px] w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-fuchsia-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-fuchsia-500/10"
                    : "min-h-[390px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-500/10"
                }
              />

              {/* Rewrite Tone */}
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Rewrite Style
                  </p>

                  <span className="text-[9px] font-bold text-fuchsia-500">
                    {tone}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      "Professional",
                      "Friendly",
                      "Simple",
                      "Creative",
                    ] as RewriteTone[]
                  ).map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setTone(item)}
                      className={
                        tone === item
                          ? dark
                            ? "rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-2.5 text-xs font-bold text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.08)]"
                            : "rounded-xl border border-fuchsia-300 bg-fuchsia-50 px-3 py-2.5 text-xs font-bold text-fuchsia-600 shadow-[0_0_20px_rgba(217,70,239,0.08)]"
                          : dark
                            ? "rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-300"
                            : "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate */}
              <button
                type="button"
                onClick={rewriteContent}
                disabled={!content.trim() || loading}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-purple-600 py-4 text-sm font-black text-white shadow-xl shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Rewriting Content...
                  </>
                ) : (
                  <>
                    ✦ Rewrite Content
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div
            className={
              dark
                ? "relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0c12]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
                : "relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-7"
            }
          >
            <div
              className={
                dark
                  ? "absolute -left-20 -top-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl"
                  : "absolute -left-20 -top-20 h-44 w-44 rounded-full bg-violet-400/10 blur-3xl"
              }
            />

            <div className="relative">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
                    AI Output
                  </p>

                  <h2
                    className={
                      dark
                        ? "mt-1 text-lg font-black text-white"
                        : "mt-1 text-lg font-black text-slate-900"
                    }
                  >
                    Rewritten Content
                  </h2>
                </div>

                {rewritten && !rewritten.startsWith("⚠️") && (
                  <button
                    type="button"
                    onClick={copyRewritten}
                    className={
                      dark
                        ? "rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                        : "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    }
                  >
                    {copied ? "✓ Copied" : "⧉ Copy"}
                  </button>
                )}
              </div>

              {/* Output */}
              <div
                className={
                  dark
                    ? "min-h-[390px] rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
                    : "min-h-[390px] rounded-2xl border border-slate-200 bg-slate-50 p-5"
                }
              >
                {loading ? (
                  <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-2xl bg-fuchsia-500/20 blur-2xl" />

                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 text-2xl text-fuchsia-400">
                        ✎
                      </div>
                    </div>

                    <p
                      className={
                        dark
                          ? "text-sm font-bold text-slate-200"
                          : "text-sm font-bold text-slate-700"
                      }
                    >
                      Rewriting your content...
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Applying {tone.toLowerCase()} writing style
                    </p>
                  </div>
                ) : rewritten ? (
                  <div
                    className={
                      dark
                        ? "whitespace-pre-wrap text-sm leading-7 text-slate-300"
                        : "whitespace-pre-wrap text-sm leading-7 text-slate-700"
                    }
                  >
                    {rewritten}
                  </div>
                ) : (
                  <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                    <div
                      className={
                        dark
                          ? "mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-2xl text-slate-600"
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
                      Your rewritten content will appear here
                    </p>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                      Paste your content, choose a writing style and let AI
                      transform it.
                    </p>
                  </div>
                )}
              </div>

              {/* Output Info */}
              {rewritten && !rewritten.startsWith("⚠️") && (
                <div
                  className={
                    dark
                      ? "mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"
                      : "mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  }
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">
                      Rewrite Style
                    </p>

                    <p
                      className={
                        dark
                          ? "mt-1 text-[10px] font-bold text-slate-300"
                          : "mt-1 text-[10px] font-bold text-slate-600"
                      }
                    >
                      {tone}
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
                      {rewritten.length} characters
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div
          className={
            dark
              ? "mt-6 flex flex-col justify-between gap-2 border-t border-white/[0.06] px-1 pt-5 text-[10px] text-slate-600 sm:flex-row"
              : "mt-6 flex flex-col justify-between gap-2 border-t border-slate-200 px-1 pt-5 text-[10px] text-slate-400 sm:flex-row"
          }
        >
          <p>Powered by NexusAI</p>
          <p>AI Content Rewriting Workspace</p>
        </div>

      </div>
    </main>
  );
}