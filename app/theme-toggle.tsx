"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-[130px] rounded-xl border border-white/10 bg-white/5" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group relative flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition-all duration-300 ${
        isDark
          ? "border-white/10 bg-white/[0.05] text-slate-300 hover:border-blue-400/30 hover:bg-white/[0.08]"
          : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:shadow-md"
      }`}
      aria-label="Toggle theme"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 ${
          isDark
            ? "bg-blue-500/15 text-blue-300"
            : "bg-amber-100 text-amber-600"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>

      <span>{isDark ? "Dark" : "Light"}</span>

      <span
        className={`ml-1 h-1.5 w-1.5 rounded-full transition-colors ${
          isDark ? "bg-blue-400" : "bg-amber-500"
        }`}
      />
    </button>
  );
}