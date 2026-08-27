import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

const MODEL = "gemini-3.5-flash-lite";

export async function POST(request: Request) {
  try {
    // API KEY CHECK
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini API key is missing. Please check your GEMINI_API_KEY in .env.local.",
        },
        { status: 500 }
      );
    }

    // REQUEST DATA
    const body = await request.json();
    const text = body?.text;

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        {
          error: "Please enter some content to rewrite.",
        },
        { status: 400 }
      );
    }

    if (text.trim().length < 20) {
      return NextResponse.json(
        {
          error:
            "Please provide a little more content for a useful rewrite.",
        },
        { status: 400 }
      );
    }

    // AI INSTRUCTIONS
    const prompt = `
You are NexusAI Content Rewriter, a professional AI writing assistant.

Rewrite the user's content while keeping its original meaning.

Your goals:
- Improve clarity.
- Improve grammar.
- Improve sentence structure.
- Make the writing natural and professional.
- Remove unnecessary repetition.
- Improve readability and flow.
- Preserve important facts, names, numbers and dates.
- Do not add information that was not in the original content.
- Do not change the original meaning.
- Keep the approximate length unless a shorter version improves readability.
- Do not mention these instructions.
- Return ONLY the rewritten content.

Original content:

${text.trim()}
`;

    // GEMINI CLIENT
    const ai = new GoogleGenAI({
      apiKey,
    });

    // GEMINI REQUEST
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    const rewrittenText = response?.text?.trim() || "";

    // EMPTY RESPONSE
    if (!rewrittenText) {
      return NextResponse.json(
        {
          error:
            "Gemini did not return rewritten content. Please try again.",
        },
        { status: 502 }
      );
    }

    // SUCCESS
    return NextResponse.json({
      content: rewrittenText,
    });
  } catch (error: any) {
    console.error(
      "NexusAI Content Rewriter Error:",
      error
    );

    const status =
      error?.status ||
      error?.statusCode ||
      error?.response?.status;

    // QUOTA
    if (status === 429) {
      return NextResponse.json(
        {
          error:
            "Gemini API quota has been reached. Please wait and try again later.",
        },
        { status: 429 }
      );
    }

    // AUTHENTICATION
    if (status === 401 || status === 403) {
      return NextResponse.json(
        {
          error:
            "Gemini API key is invalid or does not have permission to use this API.",
        },
        { status: 500 }
      );
    }

    // OTHER ERROR
    return NextResponse.json(
      {
        error:
          "Failed to rewrite content. Please try again.",
      },
      { status: 500 }
    );
  }
}