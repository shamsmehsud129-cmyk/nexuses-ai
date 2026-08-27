"use client";

import { useState } from "react";

export default function ProductDescriptionPage() {
  const [productName, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const generateDescription = async (isRegenerate = false) => {
    if (!productName.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!details.trim()) {
      setError("Please enter product details.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const prompt = isRegenerate
        ? `
Create a completely NEW and DIFFERENT product description.

Product Name:
${productName}

Product Details:
${details}

Target Audience:
${audience || "General customers"}

Tone:
${tone}

Length:
${length}

Previous Description:
${content}

Requirements:
- Create a new version.
- Do not copy the previous description.
- Use different wording and sentence structure.
- Keep all important product information.
- Make the description persuasive and natural.
- Focus on customer benefits.
- Highlight important features.
- Match the selected tone.
- Match the requested length.
- Make it suitable for an online store.
- Return ONLY the final product description.
`
        : `
Write a high-quality product description.

Product Name:
${productName}

Product Details:
${details}

Target Audience:
${audience || "General customers"}

Tone:
${tone}

Length:
${length}

Requirements:
- Create an attractive and persuasive product description.
- Clearly explain the product.
- Highlight important features.
- Explain customer benefits.
- Match the target audience.
- Match the selected tone.
- Match the requested length.
- Use natural and convincing language.
- Make it suitable for an online store.
- Avoid unnecessary repetition.
- Return ONLY the final product description.
`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: productName,
          contentType: "Product Description",
          tone,
          contentLength: length,
          action: "generate",
          templatePrompt: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to generate product description."
        );
      }

      if (!data?.content) {
        throw new Error("AI did not return any content.");
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
    } catch (err) {
      console.error("Copy error:", err);
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
    link.download = `${productName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-description.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const toggleEdit = () => {
    setEditing(!editing);
    setCopied(false);
  };

  const clearContent = () => {
    setProductName("");
    setDetails("");
    setAudience("");
    setTone("Professional");
    setLength("Medium");
    setContent("");
    setCopied(false);
    setEditing(false);
    setError("");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-600">
            NEXUSES AI
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Product Description Generator
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Create persuasive product descriptions with AI.
          </p>
        </div>

        {/* Generator Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Product Name */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-slate-800">
              Product Name
            </label>

            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Example: Wireless Bluetooth Headphones"
              className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-slate-800">
              Product Details
            </label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter features, specifications, materials, benefits, price range, etc."
              rows={6}
              className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Target Audience */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-slate-800">
              Target Audience
            </label>

            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Example: Students, professionals, gamers..."
              className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Tone */}
            <div>
              <label className="mb-2 block text-lg font-semibold text-slate-800">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-orange-500"
              >
                <option>Professional</option>
                <option>Persuasive</option>
                <option>Friendly</option>
                <option>Luxury</option>
                <option>Simple</option>
                <option>Exciting</option>
              </select>
            </div>

            {/* Length */}
            <div>
              <label className="mb-2 block text-lg font-semibold text-slate-800">
                Description Length
              </label>

              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none focus:border-orange-500"
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
            onClick={() => generateDescription(false)}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-orange-500 px-6 py-4 text-lg font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "✨ AI is generating..."
              : "✨ Generate Description"}
          </button>

        </div>

        {/* Generated Content */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Generated Description
            </h2>

            <p className="mt-2 text-slate-600">
              Your AI-generated product description will appear here.
            </p>
          </div>

          {!content ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-6 py-20 text-center">

              <div className="text-5xl">
                🛍️
              </div>

              <h3 className="mt-4 text-xl font-semibold text-slate-800">
                No description generated yet.
              </h3>

              <p className="mt-2 text-slate-500">
                Enter your product information above and generate a description.
              </p>

            </div>
          ) : (
            <div>

              {/* Description */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">

                {/* Product Info */}
                <div className="mb-5 flex flex-wrap gap-2">

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                    {productName}
                  </span>

                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                    {tone}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {length}
                  </span>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    ✨ Gemini AI
                  </span>

                </div>

                {/* Editable Content */}
                {editing ? (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] w-full rounded-xl border border-orange-300 bg-white p-5 text-lg leading-8 text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                ) : (
                  <div className="whitespace-pre-wrap text-lg leading-8 text-slate-800">
                    {content}
                  </div>
                )}

              </div>

              {/* Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

                {/* Regenerate */}
                <button
                  onClick={() => generateDescription(true)}
                  disabled={loading}
                  className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Generating..." : "🔄 Regenerate"}
                </button>

                {/* Edit */}
                <button
                  onClick={toggleEdit}
                  className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
                >
                  {editing ? "✓ Save Edit" : "✏️ Edit"}
                </button>

                {/* Copy */}
                <button
                  onClick={copyContent}
                  className="rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>

                {/* Download */}
                <button
                  onClick={downloadContent}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  ⬇️ Download
                </button>

                {/* Clear */}
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