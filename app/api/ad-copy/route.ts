import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      product,
      audience,
      platform,
      tone,
      length,
    } = await request.json();

    // -----------------------------
    // Validation
    // -----------------------------

    if (!product?.trim()) {
      return NextResponse.json(
        {
          error: "Product or service is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // API Key Check
    // -----------------------------

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured.",
        },
        {
          status: 500,
        }
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

    const prompt = `
You are a professional advertising copywriter.

Create high-quality advertising copy for the following product or service.

Product / Service:
${product}

Target Audience:
${audience || "General audience"}

Platform:
${platform || "Facebook"}

Tone:
${tone || "Persuasive"}

Length:
${length || "Medium"}

Requirements:

- Create persuasive and engaging advertising copy.
- Clearly communicate the main benefit of the product.
- Focus on the target audience.
- Match the selected platform.
- Match the selected tone.
- Create a strong headline.
- Include a compelling main message.
- Include a clear call-to-action.
- Use emojis only when appropriate.
- Keep the copy natural and professional.
- Do not make unrealistic claims.
- Do not explain your process.
- Do not say "Here is your ad copy".
- Return ONLY the final advertising copy.
- Return the result in Markdown format.

Length guide:

Short:
80–150 words.

Medium:
150–300 words.

Long:
300–500 words.
`;

    console.log(
      "Ad Copy Gemini request started..."
    );

    // -----------------------------
    // Gemini Request
    // -----------------------------

    let response;

    try {
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
    } catch (error: any) {
      console.error(
        "Ad Copy Gemini request failed:",
        error
      );

      const status = error?.status;

      if (status === 429) {
        return NextResponse.json(
          {
            error:
              "Gemini API quota has been reached. Please try again later.",
          },
          {
            status: 429,
          }
        );
      }

      if (
        status === 404
      ) {
        return NextResponse.json(
          {
            error:
              "Gemini model was not found. Please check the selected model.",
          },
          {
            status: 404,
          }
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
          {
            status: 503,
          }
        );
      }

      return NextResponse.json(
        {
          error:
            "Gemini API request failed. Please check your API key and configuration.",
        },
        {
          status: 500,
        }
      );
    }

    // -----------------------------
    // Get Content
    // -----------------------------

    const content = response?.text || "";

    if (!content.trim()) {
      return NextResponse.json(
        {
          error:
            "Gemini did not return any content. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    // -----------------------------
    // Success
    // -----------------------------

    return NextResponse.json({
      content,
    });

  } catch (error) {
    console.error(
      "Ad Copy API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to generate ad copy. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}