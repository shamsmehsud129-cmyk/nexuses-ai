"use client";

import { useState } from "react";

export default function AdCopyPage() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [tone, setTone] = useState("Persuasive");
  const [length, setLength] = useState("Medium");

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generateAd = async () => {
    if (!product.trim()) {
      setError("Please enter your product or service first.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/ad-copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          audience,
          platform,
          tone,
          length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate ad copy."
        );
      }

      setContent(data.content || "");
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
    if (!content) return;

    await navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadContent = () => {
    if (!content) return;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "nexuses-ai-ad-copy.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const clearContent = () => {
    setProduct("");
    setAudience("");
    setContent("");
    setError("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold text-pink-600">
            NEXUSES AI
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Ad Copy Generator
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Create persuasive advertising copy for your campaigns
            with AI.
          </p>

        </div>

        {/* Generator Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Product */}
          <div className="mb-6">

            <label className="mb-2 block text-lg font-semibold text-slate-800">
              Product or Service
            </label>

            <textarea
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Example: Premium wireless headphones with noise cancellation..."
              rows={5}
              className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />

          </div>

          {/* Audience */}
          <div className="mb-6">

            <label className="mb-2 block text-lg font-semibold text-slate-800">
              Target Audience
            </label>

            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Example: Students, professionals, business owners..."
              className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />

          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* Platform */}
            <div>

              <label className="mb-2 block text-lg font-semibold text-slate-800">
                Platform
              </label>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-pink-500"
              >
                <option>Facebook</option>
                <option>Instagram</option>
                <option>LinkedIn</option>
                <option>Google Ads</option>
                <option>Twitter / X</option>
              </select>

            </div>

            {/* Tone */}
            <div>

              <label className="mb-2 block text-lg font-semibold text-slate-800">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-pink-500"
              >
                <option>Persuasive</option>
                <option>Professional</option>
                <option>Friendly</option>
                <option>Urgent</option>
                <option>Creative</option>
                <option>Luxury</option>
              </select>

            </div>

            {/* Length */}
            <div>

              <label className="mb-2 block text-lg font-semibold text-slate-800">
                Ad Length
              </label>

              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-pink-500"
              >
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </select>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              ❌ {error}
            </div>
          )}

          {/* Generate */}
          <button
            onClick={generateAd}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-pink-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "✨ AI is creating your ad..."
              : "✨ Generate Ad Copy"}
          </button>

        </div>

        {/* Generated Content */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-slate-900">
              Generated Ad Copy
            </h2>

            <p className="mt-2 text-slate-600">
              Your AI-generated advertising copy will appear here.
            </p>

          </div>

          {!content ? (

            <div className="rounded-xl border border-dashed border-slate-300 px-6 py-20 text-center">

              <div className="text-5xl">
                📢
              </div>

              <h3 className="mt-4 text-xl font-semibold text-slate-800">
                No ad copy generated yet.
              </h3>

              <p className="mt-2 text-slate-500">
                Enter your product above and click Generate Ad Copy.
              </p>

            </div>

          ) : (

            <div>

              {/* Content */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">

                {/* Tags */}
                <div className="mb-5 flex flex-wrap gap-2">

                  <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
                    {platform}
                  </span>

                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                    {tone}
                  </span>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    {length}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    ✨ Gemini AI
                  </span>

                </div>

                {/* Ad */}
                <div className="whitespace-pre-wrap text-lg leading-8 text-slate-800">
                  {content}
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <button
                  onClick={generateAd}
                  disabled={loading}
                  className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:opacity-70"
                >
                  {loading
                    ? "Generating..."
                    : "🔄 Regenerate"}
                </button>

                <button
                  onClick={copyContent}
                  className="rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>

                <button
                  onClick={downloadContent}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  ⬇️ Download
                </button>

                <button
                  onClick={clearContent}
                  className="rounded-xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  🗑️ Clear
                </button>

              </div>

            </div>

          )}

        </div>

      </div>
    </main>
  );
}