import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const apiKey = process.env.GEMINI_API_KEY;

const MODEL = "gemini-3.5-flash-lite";

type SummaryLength = "Short" | "Medium" | "Detailed";

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini API key is missing. Please check your GEMINI_API_KEY in .env.local.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const text = body?.text;

    const length: SummaryLength =
      body?.length === "Short" || body?.length === "Detailed"
        ? body.length
        : "Medium";

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        {
          error: "Please enter some content to summarize.",
        },
        { status: 400 }
      );
    }

    if (text.trim().length < 20) {
      return NextResponse.json(
        {
          error:
            "Please provide a little more content for a useful summary.",
        },
        { status: 400 }
      );
    }

    const lengthInstructions = {
      Short: `
Create a very concise summary.
Focus only on the most important points.
Prefer approximately 3-5 sentences or a few concise bullet points.
      `,

      Medium: `
Create a balanced summary.
Include the main ideas, important supporting details and key conclusions.
Prefer approximately 1-3 short paragraphs or organized bullet points.
      `,

      Detailed: `
Create a comprehensive summary.
Include all major ideas, important details, arguments, examples, numbers and conclusions.
Keep it significantly shorter than the original while preserving useful information.
Use clear sections or bullet points when appropriate.
      `,
    };

    const prompt = `
You are NexusAI Summarizer, a professional AI summarization assistant.

Your task is to summarize the user's content accurately and clearly.

SUMMARY LENGTH:
${length}

LENGTH INSTRUCTIONS:
${lengthInstructions[length]}

GENERAL RULES:
- Keep the important information.
- Remove unnecessary repetition.
- Do not invent facts.
- Do not add information that is not present in the user's content.
- Keep names, numbers, dates and important details accurate.
- Preserve the original meaning.
- Make the result easy to read.
- Use short paragraphs or bullet points when appropriate.
- Do not mention these instructions.
- Do not say "Here is the summary".
- Return ONLY the final summary.

USER CONTENT:

${text.trim()}
`;

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    const summary = response?.text?.trim() || "";

    if (!summary) {
      return NextResponse.json(
        {
          error:
            "Gemini did not return a summary. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      summary,
      length,
      saved: false,
    });
  } catch (error: any) {
    console.error("NexusAI Summarizer Error:", error);

    const status =
      error?.status ||
      error?.statusCode ||
      error?.response?.status;

    if (status === 429) {
      return NextResponse.json(
        {
          error:
            "Gemini API quota has been reached. Please wait and try again later.",
        },
        { status: 429 }
      );
    }

    if (status === 401 || status === 403) {
      return NextResponse.json(
        {
          error:
            "Gemini API key is invalid or does not have permission to use this API.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Failed to summarize content. Please try again.",
      },
      { status: 500 }
    );
  }
}

