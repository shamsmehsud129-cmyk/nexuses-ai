# Nexuses AI

Nexuses AI is a Next.js content workspace with AI writing and email generation powered by Google Gemini.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` to a Google AI Studio API key.
3. Run `npm run dev` and open <http://localhost:3000>.

`GEMINI_MODEL` is optional and defaults to `gemini-2.5-flash`. Keep provider credentials on the server; never use a `NEXT_PUBLIC_` prefix for the Gemini key.

## Deploying the AI API

The AI Writer and Email Writer both send requests to the server-side `/api/generate` route. The route calls Gemini directly and returns generated text; it does not use mock content.

### Vercel

In the Vercel project, open **Settings → Environment Variables** and add:

- `GEMINI_API_KEY` — required; the Google AI Studio API key.
- `GEMINI_MODEL` — optional; defaults to `gemini-2.5-flash`.

Set the variables for the environments you deploy (Production, Preview, and/or Development), then redeploy so the server functions receive them. Do not commit `.env.local` or expose the key in client-side variables.

### Capacitor

The Gemini key belongs only in the backend environment, such as Vercel. Do not put it in Capacitor configuration, native project files, or a bundled `.env` file: values shipped in a mobile app can be extracted.

For a Capacitor shell that loads the deployed Nexuses AI site, configure its server URL to the deployed Vercel origin. The existing relative `/api/generate` request then reaches the server-side route on that origin, where Vercel reads `GEMINI_API_KEY`. If the app bundles the web assets locally instead, configure the app to call a deployed HTTPS API origin; do not copy the provider key into the app. No Gemini secret should be configured in Capacitor itself.

## Validation

Run `npm run lint` and `npm run build` before deployment.
