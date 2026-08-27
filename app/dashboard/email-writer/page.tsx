"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

export default function EmailWriter() {
  const { theme } = useTheme();

  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Professional");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);

  const dark = theme === "dark";

  const generateEmail = async (isRegenerate = false) => {
    if (!purpose.trim()) return;

    setLoading(true);
    setCopied(false);

    try {
      const prompt = isRegenerate
        ? `
Generate a NEW and DIFFERENT version of the email below.

Original request:
${purpose}

Previous email:
${content}

Requirements:
- Keep the same purpose.
- Keep the same tone: ${tone}.
- Use completely different wording.
- Do not copy the previous email.
- Make it natural and professional.
- Include a clear subject line.
- Return only the email.
`
        : `
Write a high-quality email based on this request:

${purpose}

Requirements:
- Include a clear subject line.
- Match the tone: ${tone}.
- Make it natural and professional.
- Make it ready to copy and send.
- Use proper paragraphs.
- Return only the email.
`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: purpose,
          contentType: "Email",
          tone,
          contentLength: "Medium",
          action: "generate",
          templatePrompt: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setContent(
          data?.error || "Unable to generate email. Please try again."
        );
        return;
      }

      if (data?.content) {
        setContent(data.content);
        setEditing(false);
      } else {
        setContent("Unable to generate email. Please try again.");
      }
    } catch (error) {
      console.error("Email generation error:", error);
      setContent("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = async () => {
    if (!content.trim()) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  const downloadEmail = () => {
    if (!content.trim()) return;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "generated-email.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearEmail = () => {
    setPurpose("");
    setContent("");
    setCopied(false);
    setEditing(false);
  };

  const toggleEdit = () => {
    setEditing(!editing);
    setCopied(false);
  };

  return (
    <main
      className={
        dark
          ? "min-h-screen overflow-hidden bg-[#05060a] text-white transition-colors duration-500"
          : "min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500"
      }
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={
            dark
              ? "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]"
              : "absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[140px]"
          }
        />

        <div
          className={
            dark
              ? "absolute right-[-120px] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]"
              : "absolute right-[-120px] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[150px]"
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

      <div className="relative z-10 mx-auto max-w-[1450px] px-5 pb-12 pt-8 sm:px-8 lg:px-10">
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div
              className={
                dark
                  ? "mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/10 bg-violet-500/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-violet-300"
                  : "mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-violet-600"
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,.9)]" />
              AI Communication Studio
            </div>

            <h1
              className={
                dark
                  ? "text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl"
                  : "text-4xl font-black tracking-[-0.04em] text-slate-900 sm:text-5xl"
              }
            >
              Email
              <span className="ml-3 bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Writer.
              </span>
            </h1>

            <p
              className={
                dark
                  ? "mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
                  : "mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
              }
            >
              Create polished, professional emails in seconds with your
              intelligent AI workspace.
            </p>
          </div>

          <div
            className={
              dark
                ? "flex h-12 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 backdrop-blur-xl"
                : "flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm"
            }
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-violet-500/20">
              ✦
            </div>

            <div>
              <p
                className={
                  dark
                    ? "text-[10px] font-black text-white"
                    : "text-[10px] font-black text-slate-900"
                }
              >
                AI Email Engine
              </p>

              <p
                className={
                  dark
                    ? "text-[9px] text-slate-600"
                    : "text-[9px] text-slate-400"
                }
              >
                Ready to create
              </p>
            </div>

            <span className="ml-2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <section
            className={
              dark
                ? "relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0a0c12]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:p-8"
                : "relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,.08)] sm:p-8"
            }
          >
            <div
              className={
                dark
                  ? "absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl"
                  : "absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl"
              }
            />

            <div className="relative">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
                    Step 01
                  </p>

                  <h2
                    className={
                      dark
                        ? "mt-1 text-xl font-black text-white"
                        : "mt-1 text-xl font-black text-slate-900"
                    }
                  >
                    Describe your email
                  </h2>
                </div>

                <div
                  className={
                    dark
                      ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-violet-400"
                      : "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-violet-50 text-violet-500"
                  }
                >
                  ✉
                </div>
              </div>

              <label
                className={
                  dark
                    ? "mb-3 block text-[10px] font-black uppercase tracking-wider text-slate-500"
                    : "mb-3 block text-[10px] font-black uppercase tracking-wider text-slate-500"
                }
              >
                Email Purpose
              </label>

              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Example: Write an email asking my manager for 3 days leave..."
                className={
                  dark
                    ? "min-h-[210px] w-full resize-none rounded-2xl border border-white/[0.08] bg-[#06080d] p-5 text-sm leading-7 text-white outline-none transition placeholder:text-slate-700 focus:border-violet-500/40 focus:bg-[#080a10] focus:ring-4 focus:ring-violet-500/5"
                    : "min-h-[210px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                }
              />

              <div className="mt-6">
                <label className="mb-3 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Email Tone
                </label>

                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className={
                      dark
                        ? "w-full appearance-none rounded-2xl border border-white/[0.08] bg-[#06080d] px-4 py-3.5 text-sm font-semibold text-slate-300 outline-none transition focus:border-violet-500/40 focus:ring-4 focus:ring-violet-500/5"
                        : "w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    }
                  >
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Formal</option>
                    <option>Casual</option>
                    <option>Apologetic</option>
                    <option>Persuasive</option>
                  </select>

                  <span
                    className={
                      dark
                        ? "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
                        : "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    }
                  >
                    ↓
                  </span>
                </div>
              </div>

              <button
                onClick={() => generateEmail(false)}
                disabled={loading || !purpose.trim()}
                className="group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 px-6 py-4 text-sm font-black text-white shadow-[0_12px_40px_rgba(124,58,237,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(124,58,237,.35)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="text-lg">✦</span>
                {loading ? "Generating your email..." : "Generate Email"}
                <span className="transition group-hover:translate-x-1">→</span>
              </button>

              <p
                className={
                  dark
                    ? "mt-4 text-center text-[9px] font-semibold uppercase tracking-widest text-slate-700"
                    : "mt-4 text-center text-[9px] font-semibold uppercase tracking-widest text-slate-400"
                }
              >
                Powered by NexusAI
              </p>
            </div>
          </section>

          <section
            className={
              dark
                ? "relative min-h-[600px] overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0a0c12]/90 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl"
                : "relative min-h-[600px] overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,.08)]"
            }
          >
            <div
              className={
                dark
                  ? "absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl"
                  : "absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl"
              }
            />

            <div className="relative flex h-full flex-col">
              <div
                className={
                  dark
                    ? "flex flex-col justify-between gap-4 border-b border-white/[0.06] p-6 sm:flex-row sm:items-center sm:p-7"
                    : "flex flex-col justify-between gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:p-7"
                }
              >
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">
                    Step 02
                  </p>

                  <h2
                    className={
                      dark
                        ? "mt-1 text-xl font-black text-white"
                        : "mt-1 text-xl font-black text-slate-900"
                    }
                  >
                    Generated Email
                  </h2>
                </div>

                {content && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => generateEmail(true)}
                      disabled={loading}
                      className="rounded-xl border border-blue-400/10 bg-blue-500/10 px-3 py-2 text-[10px] font-black text-blue-500 transition hover:bg-blue-500/20 disabled:opacity-40"
                    >
                      ↻ Regenerate
                    </button>

                    <button
                      onClick={toggleEdit}
                      className="rounded-xl border border-violet-400/10 bg-violet-500/10 px-3 py-2 text-[10px] font-black text-violet-500 transition hover:bg-violet-500/20"
                    >
                      {editing ? "✓ Save" : "✎ Edit"}
                    </button>

                    <button
                      onClick={copyEmail}
                      className="rounded-xl border border-emerald-400/10 bg-emerald-500/10 px-3 py-2 text-[10px] font-black text-emerald-500 transition hover:bg-emerald-500/20"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>

                    <button
                      onClick={downloadEmail}
                      className="rounded-xl border border-orange-400/10 bg-orange-500/10 px-3 py-2 text-[10px] font-black text-orange-500 transition hover:bg-orange-500/20"
                    >
                      ↓ Download
                    </button>

                    <button
                      onClick={clearEmail}
                      className={
                        dark
                          ? "rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-black text-slate-400 transition hover:bg-white/[0.07] hover:text-white"
                          : "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      }
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 p-6 sm:p-7">
                {!content && !loading && (
                  <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                    <div
                      className={
                        dark
                          ? "relative mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-400/10 bg-gradient-to-br from-violet-500/10 to-blue-500/10"
                          : "relative mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50"
                      }
                    >
                      <div
                        className={
                          dark
                            ? "absolute inset-3 rounded-2xl border border-white/[0.05]"
                            : "absolute inset-3 rounded-2xl border border-violet-100"
                        }
                      />

                      <span className="text-3xl text-violet-500">✉</span>
                    </div>

                    <h3
                      className={
                        dark
                          ? "text-lg font-black text-slate-300"
                          : "text-lg font-black text-slate-800"
                      }
                    >
                      Your email will appear here
                    </h3>

                    <p
                      className={
                        dark
                          ? "mt-2 max-w-sm text-sm leading-6 text-slate-600"
                          : "mt-2 max-w-sm text-sm leading-6 text-slate-500"
                      }
                    >
                      Describe what you want to write, choose a tone, and let
                      NexusAI handle the rest.
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 animate-ping rounded-full bg-violet-500/10" />

                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 text-2xl text-white shadow-[0_0_50px_rgba(124,58,237,.3)]">
                        ✦
                      </div>
                    </div>

                    <p
                      className={
                        dark
                          ? "mt-6 text-sm font-black text-slate-300"
                          : "mt-6 text-sm font-black text-slate-800"
                      }
                    >
                      Writing your email...
                    </p>

                    <p
                      className={
                        dark
                          ? "mt-2 text-[10px] uppercase tracking-widest text-slate-700"
                          : "mt-2 text-[10px] uppercase tracking-widest text-slate-400"
                      }
                    >
                      NexusAI is thinking
                    </p>
                  </div>
                )}

                {content && !loading && (
                  <>
                    {editing ? (
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={
                          dark
                            ? "min-h-[500px] w-full resize-none rounded-2xl border border-violet-500/20 bg-[#06080d] p-6 text-sm leading-8 text-slate-200 outline-none focus:border-violet-500/40 focus:ring-4 focus:ring-violet-500/5"
                            : "min-h-[500px] w-full resize-none rounded-2xl border border-violet-200 bg-slate-50 p-6 text-sm leading-8 text-slate-800 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                        }
                      />
                    ) : (
                      <div
                        className={
                          dark
                            ? "min-h-[500px] rounded-2xl border border-white/[0.06] bg-[#06080d] p-6 text-sm leading-8 text-slate-300 shadow-inner sm:p-7"
                            : "min-h-[500px] rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-8 text-slate-700 shadow-inner sm:p-7"
                        }
                      >
                        <div
                          className={
                            dark
                              ? "mb-6 flex items-center gap-3 border-b border-white/[0.06] pb-5"
                              : "mb-6 flex items-center gap-3 border-b border-slate-200 pb-5"
                          }
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                            ✉
                          </div>

                          <div>
                            <p
                              className={
                                dark
                                  ? "text-[9px] font-black uppercase tracking-widest text-slate-600"
                                  : "text-[9px] font-black uppercase tracking-widest text-slate-400"
                              }
                            >
                              AI Generated
                            </p>

                            <p
                              className={
                                dark
                                  ? "text-xs font-bold text-slate-300"
                                  : "text-xs font-bold text-slate-700"
                              }
                            >
                              {tone} tone
                            </p>
                          </div>
                        </div>

                        <div className="whitespace-pre-wrap">{content}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["✦", "Professional", "Polished writing ready to send."],
            ["↻", "Regenerate", "Create a completely different version."],
            ["✎", "Fully Editable", "Fine-tune every word yourself."],
          ].map(([icon, title, description]) => (
            <div
              key={title}
              className={
                dark
                  ? "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl"
                  : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              }
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  {icon}
                </span>

                <div>
                  <p
                    className={
                      dark
                        ? "text-xs font-black text-slate-300"
                        : "text-xs font-black text-slate-800"
                    }
                  >
                    {title}
                  </p>

                  <p
                    className={
                      dark
                        ? "mt-1 text-[10px] leading-5 text-slate-600"
                        : "mt-1 text-[10px] leading-5 text-slate-500"
                    }
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}