"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIAssistantPage() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm NexusAI Assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

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

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to get AI response."
        );
      }

      if (!data.content) {
        throw new Error("AI did not return any response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `⚠️ ${error.message}`
              : "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm NexusAI Assistant. How can I help you today?",
      },
    ]);

    setInput("");
    setCopiedIndex(null);
  };

  const copyMessage = async (
    content: string,
    index: number
  ) => {
    try {
      await navigator.clipboard.writeText(content);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  const useSuggestion = (text: string) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  return (
    <main
      className={
        dark
          ? "relative min-h-screen overflow-hidden bg-[#05060a] text-white transition-colors duration-500"
          : "relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500"
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
              ? "absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]"
              : "absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[150px]"
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="mb-6 flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl" />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 text-xl text-white shadow-xl">
                ✦
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1
                  className={
                    dark
                      ? "text-xl font-black tracking-tight text-white sm:text-2xl"
                      : "text-xl font-black tracking-tight text-slate-900 sm:text-2xl"
                  }
                >
                  NexusAI
                </h1>

                <span
                  className={
                    dark
                      ? "rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300"
                      : "rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600"
                  }
                >
                  Assistant
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Your intelligent AI workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearChat}
            className={
              dark
                ? "rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
                : "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            }
          >
            + New Chat
          </button>
        </header>

        <section
          className={
            dark
              ? "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0a0c12]/85 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-xl"
              : "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,.07)]"
          }
        >
          <div
            className={
              dark
                ? "flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-5 py-4 sm:px-6"
                : "flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6"
            }
          >
            <div className="flex items-center gap-3">
              <div
                className={
                  dark
                    ? "relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-lg text-blue-300"
                    : "relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 text-lg text-blue-600"
                }
              >
                ✦

                <span
                  className={
                    dark
                      ? "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0c12] bg-emerald-400"
                      : "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
                  }
                />
              </div>

              <div>
                <p
                  className={
                    dark
                      ? "text-sm font-bold text-white"
                      : "text-sm font-bold text-slate-900"
                  }
                >
                  NexusAI Assistant
                </p>

                <p className="text-[11px] text-emerald-500">
                  Online • Ready to help
                </p>
              </div>
            </div>

            <div
              className={
                dark
                  ? "hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:block"
                  : "hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:block"
              }
            >
              AI Workspace
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-4xl space-y-6">
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[90%] gap-3 sm:max-w-[80%] ${
                      message.role === "user"
                        ? "flex-row-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm ${
                        message.role === "user"
                          ? dark
                            ? "border-blue-400/20 bg-blue-500/10 text-blue-300"
                            : "border-blue-200 bg-blue-50 text-blue-600"
                          : dark
                          ? "border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-blue-500/15 text-violet-300"
                          : "border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 text-violet-600"
                      }`}
                    >
                      {message.role === "user" ? "You" : "✦"}
                    </div>

                    <div>
                      <div
                        className={`rounded-2xl border px-4 py-3.5 shadow-lg ${
                          message.role === "user"
                            ? dark
                              ? "rounded-tr-md border-blue-400/20 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"
                              : "rounded-tr-md border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50"
                            : dark
                            ? "rounded-tl-md border-white/10 bg-[#090f20]/90"
                            : "rounded-tl-md border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div
                          className={
                            dark
                              ? "whitespace-pre-wrap text-sm leading-7 text-slate-200"
                              : "whitespace-pre-wrap text-sm leading-7 text-slate-700"
                          }
                        >
                          {message.content}
                        </div>
                      </div>

                      {message.role === "assistant" && (
                        <button
                          type="button"
                          onClick={() =>
                            copyMessage(
                              message.content,
                              index
                            )
                          }
                          className={
                            dark
                              ? "mt-2 px-1 text-xs text-slate-600 transition hover:text-slate-300"
                              : "mt-2 px-1 text-xs text-slate-400 transition hover:text-slate-700"
                          }
                        >
                          {copiedIndex === index
                            ? "✓ Copied"
                            : "⧉ Copy"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div
                      className={
                        dark
                          ? "flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300"
                          : "flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600"
                      }
                    >
                      ✦
                    </div>

                    <div
                      className={
                        dark
                          ? "rounded-2xl rounded-tl-md border border-white/10 bg-[#090f20]/90 px-5 py-4"
                          : "rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-5 py-4"
                      }
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {messages.length <= 1 && !loading && (
            <div
              className={
                dark
                  ? "border-t border-white/5 px-4 py-4 sm:px-8"
                  : "border-t border-slate-200 px-4 py-4 sm:px-8"
              }
            >
              <div className="mx-auto max-w-4xl">
                <p
                  className={
                    dark
                      ? "mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600"
                      : "mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
                  }
                >
                  Try asking
                </p>

                <div className="grid gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() =>
                      useSuggestion(
                        "Explain artificial intelligence in simple words."
                      )
                    }
                    className={
                      dark
                        ? "rounded-xl border border-white/10 bg-white/[0.025] p-3 text-left text-xs text-slate-400 transition hover:border-blue-400/20 hover:bg-blue-500/5 hover:text-slate-200"
                        : "rounded-xl border border-slate-200 bg-white p-3 text-left text-xs text-slate-500 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-slate-800"
                    }
                  >
                    <span className="mb-1 block text-sm">
                      💡
                    </span>
                    Explain AI simply
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      useSuggestion(
                        "Give me 5 creative ideas for my website."
                      )
                    }
                    className={
                      dark
                        ? "rounded-xl border border-white/10 bg-white/[0.025] p-3 text-left text-xs text-slate-400 transition hover:border-violet-400/20 hover:bg-violet-500/5 hover:text-slate-200"
                        : "rounded-xl border border-slate-200 bg-white p-3 text-left text-xs text-slate-500 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-slate-800"
                    }
                  >
                    <span className="mb-1 block text-sm">
                      ✨
                    </span>
                    Generate ideas
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      useSuggestion(
                        "Help me write a professional email."
                      )
                    }
                    className={
                      dark
                        ? "rounded-xl border border-white/10 bg-white/[0.025] p-3 text-left text-xs text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-500/5 hover:text-slate-200"
                        : "rounded-xl border border-slate-200 bg-white p-3 text-left text-xs text-slate-500 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-800"
                    }
                  >
                    <span className="mb-1 block text-sm">
                      ✉
                    </span>
                    Write something
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            className={
              dark
                ? "border-t border-white/10 bg-[#050918]/80 px-4 py-4 sm:px-8"
                : "border-t border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-8"
            }
          >
            <div className="mx-auto max-w-4xl">
              <div
                className={
                  dark
                    ? "relative rounded-2xl border border-white/10 bg-[#080d1d] p-2 shadow-2xl transition focus-within:border-blue-500/40 focus-within:ring-4 focus-within:ring-blue-500/5"
                    : "relative rounded-2xl border border-slate-200 bg-white p-2 shadow-lg transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/5"
                }
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={2}
                  placeholder="Message NexusAI Assistant..."
                  className={
                    dark
                      ? "w-full resize-none bg-transparent px-3 py-2 pr-14 text-sm leading-6 text-white outline-none placeholder:text-slate-600 disabled:opacity-50"
                      : "w-full resize-none bg-transparent px-3 py-2 pr-14 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-50"
                  }
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg text-white shadow-lg shadow-blue-600/20 transition hover:scale-105 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  ↑
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between px-1">
                <p
                  className={
                    dark
                      ? "text-[10px] text-slate-700"
                      : "text-[10px] text-slate-400"
                  }
                >
                  Enter to send • Shift + Enter for new line
                </p>

                <p
                  className={
                    dark
                      ? "text-[10px] text-slate-700"
                      : "text-[10px] text-slate-400"
                  }
                >
                  NexusAI
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}