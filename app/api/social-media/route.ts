import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const MODEL = "gemini-3.5-flash-lite";

export async function POST(request: Request) {
  try {
    const {
      topic,
      platform,
      tone,
      length,
      prompt: customPrompt,
    } = await request.json();

    // -----------------------------
    // Validation
    // -----------------------------

    if (!topic?.trim()) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    // -----------------------------
    // API Key
    // -----------------------------

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // -----------------------------
    // Gemini
    // -----------------------------

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // -----------------------------
    // Prompt
    // -----------------------------

    const prompt =
      customPrompt ||
      `
Create a high-quality social media post.

Topic:
${topic}

Platform:
${platform}

Tone:
${tone}

Content Length:
${length}

Requirements:
- Write an engaging social media post.
- Match the selected platform.
- Match the requested tone.
- Follow the requested content length.
- Include suitable emojis where appropriate.
- Include relevant hashtags.
- Make the post natural and engaging.
- Do not explain your process.
- Return only the final social media post.
`;

    // -----------------------------
    // Gemini Request
    // -----------------------------

    console.log(
      `Social Media Gemini request started - Model: ${MODEL}`
    );

    let response;

    try {
      response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      });
    } catch (error: any) {
      console.error(
        "Social Media Gemini request failed:",
        error
      );

      const status = error?.status;

      if (status === 429) {
        return NextResponse.json(
          {
            error:
              "Gemini API quota has been reached. Please try again later.",
          },
          { status: 429 }
        );
      }

      if (
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
      ) {
        return NextResponse.json(
          {
            error:
              "Gemini service is temporarily unavailable. Please try again later.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Gemini API request failed. Please check your API key and model configuration.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Generated Content
    // -----------------------------

    const content = response?.text || "";

    if (!content.trim()) {
      return NextResponse.json(
        {
          error:
            "Gemini did not return any content. Please try again.",
        },
        { status: 502 }
      );
    }

    // -----------------------------
    // Success
    // -----------------------------

    return NextResponse.json({
      content,
    });
  } catch (error) {
    console.error("Social Media API Error:", error);

    return NextResponse.json(
      {
        error:
          "Failed to generate social media content. Please try again.",
      },
      { status: 500 }
    );
  }
}