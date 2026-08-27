"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* ================= TOP NAVBAR ================= */}
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            NexusAI
          </a>


          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden items-center gap-8 md:flex">

            <a
              href="/"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Home
            </a>

            <a
              href="/#features"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Features
            </a>

            <a
              href="/#pricing"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Pricing
            </a>

            <a
              href="/#faq"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              FAQ
            </a>

          </nav>


          {/* ================= DESKTOP BUTTONS ================= */}
          <div className="hidden items-center gap-3 md:flex">

            <a
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Login
            </a>

            <a
              href="/signup"
              className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Get Started
            </a>

          </div>


          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="border-t border-gray-200 py-5 md:hidden">

            <nav className="flex flex-col gap-2">

              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </a>

              <a
                href="/#features"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Features
              </a>

              <a
                href="/#pricing"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Pricing
              </a>

              <a
                href="/#faq"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                FAQ
              </a>


              {/* Mobile Login */}
              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                Login
              </a>


              {/* Mobile Signup */}
              <a
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
              >
                Get Started
              </a>

            </nav>

          </div>
        )}

      </div>
    </header>
  );
}