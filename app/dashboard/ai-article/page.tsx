"use client";

import { useState } from "react";

export default function AIArticlePage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const generateArticle = async (isRegenerate = false) => {
    if (!topic.trim() || loading) {
      if (!topic.trim()) {
        setError("Please enter an article topic.");
      }
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    const prompt = isRegenerate
      ? `
Create a completely NEW and DIFFERENT article.

Topic:
${topic}

Keywords:
${keywords || "Use relevant keywords naturally."}

Tone:
${tone}

Length:
${length}

Previous Article:
${content}

Requirements:
- Create a completely new version.
- Do not copy the previous article.
- Use different wording and sentence structure.
- Keep the same main topic.
- Use the provided keywords naturally.
- Do not keyword stuff.
- Create a strong title.
- Use clear headings and subheadings.
- Include useful paragraphs.
- Use bullet points where appropriate.
- Keep the article informative and engaging.
- Match the selected tone.
- Match the requested length.
- Do not explain your process.
- Return ONLY the final article in Markdown format.
`
      : `
Write a high-quality informative article.

Topic:
${topic}

Keywords:
${keywords || "Use relevant keywords naturally."}

Tone:
${tone}

Length:
${length}

Requirements:
- Write an original and useful article.
- Create a strong title.
- Use clear headings and subheadings.
- Use the provided keywords naturally.
- Do not keyword stuff.
- Explain the topic clearly.
- Include useful examples where appropriate.
- Use paragraphs and bullet points where useful.
- Make the article engaging and easy to read.
- Match the selected tone.
- Match the requested length.
- Do not explain your process.
- Return ONLY the final article in Markdown format.
`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          contentType: "AI Article",
          tone,
          contentLength: length,
          action: "generate",
          templatePrompt: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to generate article."
        );
      }

      if (!data?.content) {
        throw new Error("AI did not return any article.");
      }

      setContent(data.content);
      setEditing(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyContent = async () => {
    if (!content.trim()) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy content.");
    }
  };

  const downloadContent = () => {
    if (!content.trim()) return;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${topic
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-article.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setTopic("");
    setKeywords("");
    setTone("Professional");
    setLength("Medium");
    setContent("");
    setCopied(false);
    setEditing(false);
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="absolute right-[-180px] top-[80px] h-[520px] w-[520px] rounded-full bg-purple-600/20 blur-[160px]" />

        <div className="absolute bottom-[-220px] left-[35%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      {/* Grid */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/40 blur-xl" />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-black shadow-xl shadow-blue-500/20">
                ✦
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                  AI Article Generator
                </h1>

                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-blue-300">
                  AI Writer
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Create intelligent, engaging and professional articles with AI.
              </p>
            </div>
          </div>

          <button
            onClick={clearAll}
            className="w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
          >
            + New Article
          </button>
        </header>

        {/* Workspace */}
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30 backdrop-blur-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <span className="text-lg">✦</span>

                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0f20] bg-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  NexusAI Article Workspace
                </p>

                <p className="mt-0.5 text-[11px] text-emerald-400">
                  Online • Ready to generate
                </p>
              </div>
            </div>

            <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:block">
              Gemini AI
            </span>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
            {/* Left */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080d1d]/90 p-5 sm:p-6">
              <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">
                      Configure
                    </p>

                    <h2 className="mt-1 text-lg font-black">
                      Article Settings
                    </h2>

                    <p className="mt-1 text-xs text-slate-600">
                      Tell NexusAI what you want to create.
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] font-bold text-slate-600">
                    AI
                  </span>
                </div>

                {/* Topic */}
                <div className="mb-5">
                  <label className="mb-2 block text-xs font-bold text-slate-300">
                    Article Topic
                  </label>

                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. How Artificial Intelligence is changing education"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5"
                  />
                </div>

                {/* Keywords */}
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Keywords
                    </label>

                    <span className="text-[9px] text-slate-700">
                      Optional
                    </span>
                  </div>

                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="AI, education, technology, learning"
                    className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/5"
                  />

                  <p className="mt-2 text-[10px] text-slate-700">
                    Separate multiple keywords with commas.
                  </p>
                </div>

                {/* Options */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-300">
                      Tone
                    </label>

                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-3 text-sm text-slate-200 outline-none focus:border-blue-500/40"
                    >
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Educational</option>
                      <option>Informative</option>
                      <option>Conversational</option>
                      <option>Persuasive</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-300">
                      Article Length
                    </label>

                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-3 text-sm text-slate-200 outline-none focus:border-purple-500/40"
                    >
                      <option>Short</option>
                      <option>Medium</option>
                      <option>Long</option>
                    </select>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-300">
                    ⚠️ {error}
                  </div>
                )}

                {/* Generate */}
                <button
                  onClick={() => generateArticle(false)}
                  disabled={!topic.trim() || loading}
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating Article...
                    </>
                  ) : (
                    <>✦ Generate Article</>
                  )}
                </button>

                <p className="mt-3 text-center text-[9px] text-slate-700">
                  Powered by NexusAI • Intelligent content generation
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080d1d]/90 p-5 sm:p-6">
              <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">
                      AI Output
                    </p>

                    <h2 className="mt-1 text-lg font-black">
                      Generated Article
                    </h2>

                    <p className="mt-1 text-xs text-slate-600">
                      Your AI-generated article appears here.
                    </p>
                  </div>

                  {content && (
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold text-blue-300">
                        {tone}
                      </span>

                      <span className="rounded-full border border-purple-400/20 bg-purple-500/10 px-2.5 py-1 text-[9px] font-bold text-purple-300">
                        {length}
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-h-[560px] rounded-2xl border border-white/10 bg-[#050816] p-5 sm:p-6">
                  {loading ? (
                    <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl" />

                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-2xl">
                          ✦
                        </div>
                      </div>

                      <p className="text-sm font-bold text-slate-300">
                        NexusAI is writing...
                      </p>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-slate-600">
                        Creating a high-quality {tone.toLowerCase()} article
                        with a {length.toLowerCase()} length.
                      </p>

                      <div className="mt-5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                      </div>
                    </div>
                  ) : content ? (
                    <div>
                      {/* Toolbar */}
                      <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                        <button
                          onClick={() => generateArticle(true)}
                          disabled={loading}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:border-blue-400/20 hover:bg-blue-500/10 hover:text-blue-300 disabled:opacity-40"
                        >
                          ↻ Regenerate
                        </button>

                        <button
                          onClick={() => {
                            setEditing(!editing);
                            setCopied(false);
                          }}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                        >
                          {editing ? "✓ Save Edit" : "✎ Edit"}
                        </button>

                        <button
                          onClick={copyContent}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                        >
                          {copied ? "✓ Copied" : "⧉ Copy"}
                        </button>

                        <button
                          onClick={downloadContent}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                        >
                          ↓ Download
                        </button>
                      </div>

                      {editing ? (
                        <textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="min-h-[460px] w-full resize-none rounded-xl border border-blue-500/30 bg-[#080d1d] p-5 text-sm leading-7 text-slate-200 outline-none focus:ring-4 focus:ring-blue-500/5"
                        />
                      ) : (
                        <article className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                          {content}
                        </article>
                      )}
                    </div>
                  ) : (
                    <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-2xl text-slate-600">
                        ✦
                      </div>

                      <p className="text-sm font-bold text-slate-500">
                        Your article will appear here
                      </p>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-slate-700">
                        Enter a topic, choose your settings and let NexusAI
                        create your article.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="flex flex-col gap-2 border-t border-white/10 bg-white/[0.02] px-5 py-4 text-[10px] text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p>✦ NexusAI Article Generator</p>
            <p>Generate • Edit • Regenerate • Copy • Download</p>
          </div>
        </section>
      </div>
    </main>
  );
}