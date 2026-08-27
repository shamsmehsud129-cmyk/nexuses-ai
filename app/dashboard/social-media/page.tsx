"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";

export default function SocialMediaPage() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Friendly");
  const [length, setLength] = useState("Medium");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      </main>
    );
  }

  const dark = theme === "dark";

  const generateContent = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setContent("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Create a high-quality social media post.

Topic:
${topic}

Platform:
${platform}

Tone:
${tone}

Length:
${length}

Requirements:
- Make it engaging and natural.
- Make it ready to publish.
- Match the selected platform.
- Use an appropriate structure.
- Include suitable hashtags where appropriate.
- Do not add unnecessary explanations.
          `,
        }),
      });

      const data = await response.json();

      if (data?.content) {
        setContent(data.content);
      } else if (data?.text) {
        setContent(data.text);
      } else {
        setContent(
          "Sorry, I could not generate the content. Please try again."
        );
      }
    } catch (error) {
      console.error(error);

      setContent(
        "Something went wrong while generating content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyContent = async () => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      className={
        dark
          ? "min-h-screen overflow-hidden bg-[#05060a] text-white transition-colors duration-500"
          : "min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500"
      }
    >
      {/* Background Glow */}
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
              ? "absolute right-[-120px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]"
              : "absolute right-[-120px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[150px]"
          }
        />

        <div
          className={
            dark
              ? "absolute bottom-[-180px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[150px]"
              : "absolute bottom-[-180px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-300/10 blur-[150px]"
          }
        />
      </div>

      {/* Background Grid */}
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

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8">
          <div
            className={
              dark
                ? "mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-blue-300"
                : "mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-blue-600"
            }
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.9)]" />
            AI Social Studio
          </div>

          <h1
            className={
              dark
                ? "text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl"
                : "text-4xl font-black tracking-[-0.04em] text-slate-900 sm:text-5xl"
            }
          >
            Create content that
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              gets attention.
            </span>
          </h1>

          <p
            className={
              dark
                ? "mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
                : "mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
            }
          >
            Create scroll-stopping social media content with the power of AI.
            Choose your platform, tone and content length.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          {/* Create Content */}
          <section
            className={
              dark
                ? "relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0a0c12]/85 p-7 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-xl"
                : "relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,.07)]"
            }
          >
            <div
              className={
                dark
                  ? "absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl"
                  : "absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-400/15 blur-3xl"
              }
            />

            <div className="relative">
              {/* Section Heading */}
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">
                    Content Engine
                  </p>

                  <h2
                    className={
                      dark
                        ? "mt-1 text-xl font-black text-white"
                        : "mt-1 text-xl font-black text-slate-900"
                    }
                  >
                    Create Content
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg">
                  AI
                </div>
              </div>

              {/* Topic */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    className={
                      dark
                        ? "text-sm font-bold text-slate-200"
                        : "text-sm font-bold text-slate-700"
                    }
                  >
                    What should we write about?
                  </label>

                  <span className="text-[9px] text-slate-400">
                    {topic.length}/1000
                  </span>
                </div>

                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  maxLength={1000}
                  rows={7}
                  placeholder="Example: Launching our new AI product..."
                  className={
                    dark
                      ? "w-full resize-none rounded-2xl border border-white/[0.08] bg-[#06070b] p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                      : "w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  }
                />
              </div>

              {/* Options */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Platform */}
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Platform
                  </label>

                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className={
                      dark
                        ? "w-full rounded-xl border border-white/[0.08] bg-[#06070b] px-3 py-3 text-xs font-bold text-white outline-none focus:border-blue-500/50"
                        : "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-bold text-slate-700 outline-none focus:border-blue-400"
                    }
                  >
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>LinkedIn</option>
                    <option>X / Twitter</option>
                    <option>TikTok</option>
                  </select>
                </div>

                {/* Tone */}
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Tone
                  </label>

                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className={
                      dark
                        ? "w-full rounded-xl border border-white/[0.08] bg-[#06070b] px-3 py-3 text-xs font-bold text-white outline-none focus:border-violet-500/50"
                        : "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-bold text-slate-700 outline-none focus:border-violet-400"
                    }
                  >
                    <option>Friendly</option>
                    <option>Professional</option>
                    <option>Funny</option>
                    <option>Inspirational</option>
                    <option>Bold</option>
                  </select>
                </div>

                {/* Length */}
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Length
                  </label>

                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className={
                      dark
                        ? "w-full rounded-xl border border-white/[0.08] bg-[#06070b] px-3 py-3 text-xs font-bold text-white outline-none focus:border-cyan-500/50"
                        : "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-bold text-slate-700 outline-none focus:border-cyan-400"
                    }
                  >
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={generateContent}
                disabled={loading || !topic.trim()}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 py-4 text-sm font-black text-white shadow-[0_15px_40px_rgba(59,130,246,.25)] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Content...
                  </>
                ) : (
                  <>
                    Generate Social Content
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Generated Content */}
          <section
            className={
              dark
                ? "relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0a0c12]/85 p-7 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-xl"
                : "relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,.07)]"
            }
          >
            <div
              className={
                dark
                  ? "absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/10 blur-3xl"
                  : "absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl"
              }
            />

            <div className="relative">
              {/* Output Heading */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={
                      dark
                        ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-violet-400"
                        : "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-violet-500"
                    }
                  >
                    AI
                  </div>

                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                      AI Output
                    </p>

                    <h2
                      className={
                        dark
                          ? "text-xl font-black text-white"
                          : "text-xl font-black text-slate-900"
                      }
                    >
                      Generated Content
                    </h2>
                  </div>
                </div>

                {content && (
                  <button
                    type="button"
                    onClick={copyContent}
                    className={
                      dark
                        ? "rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[10px] font-black text-slate-300 transition hover:bg-white/[0.08]"
                        : "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black text-slate-600 transition hover:bg-slate-100"
                    }
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </div>

              {/* Output Box */}
              <div
                className={
                  dark
                    ? "min-h-[500px] rounded-2xl border border-white/[0.06] bg-[#06070b] p-6"
                    : "min-h-[500px] rounded-2xl border border-slate-200 bg-slate-50 p-6"
                }
              >
                {content ? (
                  <div
                    className={
                      dark
                        ? "prose prose-invert max-w-none text-sm leading-7"
                        : "prose max-w-none text-sm leading-7"
                    }
                  >
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-violet-500/10 text-2xl font-black text-blue-500">
                      AI
                    </div>

                    <h3
                      className={
                        dark
                          ? "mt-6 text-xl font-black text-slate-200"
                          : "mt-6 text-xl font-black text-slate-900"
                      }
                    >
                      Your content starts here
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                      Enter your idea, choose your platform and let AI create
                      engaging social content for you.
                    </p>

                    <div className="mt-7 flex flex-wrap justify-center gap-2">
                      <span
                        className={
                          dark
                            ? "rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[9px] font-bold text-slate-400"
                            : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-bold text-slate-500"
                        }
                      >
                        AI Writing
                      </span>

                      <span
                        className={
                          dark
                            ? "rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[9px] font-bold text-slate-400"
                            : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-bold text-slate-500"
                        }
                      >
                        Hashtags
                      </span>

                      <span
                        className={
                          dark
                            ? "rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[9px] font-bold text-slate-400"
                            : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-bold text-slate-500"
                        }
                      >
                        Platform Ready
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Features */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div
            className={
              dark
                ? "rounded-2xl border border-white/[0.07] bg-[#0a0c12]/70 p-5 backdrop-blur-xl"
                : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            }
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-black text-blue-500">
              AI
            </div>

            <p
              className={
                dark
                  ? "text-sm font-black text-slate-200"
                  : "text-sm font-black text-slate-900"
              }
            >
              AI-Powered Writing
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Generate engaging posts with intelligent AI writing.
            </p>
          </div>

          <div
            className={
              dark
                ? "rounded-2xl border border-white/[0.07] bg-[#0a0c12]/70 p-5 backdrop-blur-xl"
                : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            }
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-black text-violet-500">
              PRO
            </div>

            <p
              className={
                dark
                  ? "text-sm font-black text-slate-200"
                  : "text-sm font-black text-slate-900"
              }
            >
              Platform Optimized
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Content is tailored for your selected social platform.
            </p>
          </div>

          <div
            className={
              dark
                ? "rounded-2xl border border-white/[0.07] bg-[#0a0c12]/70 p-5 backdrop-blur-xl"
                : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            }
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-sm font-black text-cyan-500">
              +
            </div>

            <p
              className={
                dark
                  ? "text-sm font-black text-slate-200"
                  : "text-sm font-black text-slate-900"
              }
            >
              Unlimited Ideas
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Turn every idea into polished social media content.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={
            dark
              ? "mt-8 border-t border-white/[0.06] pt-6"
              : "mt-8 border-t border-slate-200 pt-6"
          }
        >
          <div className="flex flex-col justify-between gap-3 text-[10px] font-semibold text-slate-400 sm:flex-row">
            <p>© 2026 Nexuses AI. Built for creators.</p>

            <div className="flex gap-5">
              <span>AI Social Studio</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}