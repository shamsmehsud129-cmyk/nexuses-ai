"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finishAuth = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error("Auth session error:", error);
            router.replace("/login");
            return;
          }

          if (data.session) {
            window.history.replaceState({}, document.title, "/auth/callback");
            router.replace("/dashboard");
            return;
          }
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Callback error:", error);
        router.replace("/login");
      }
    };

    finishAuth();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#05060a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <h1 className="text-xl font-semibold">Signing you in...</h1>
        <p className="mt-2 text-sm text-gray-400">Please wait while we securely sign you in.</p>
      </div>
    </main>
  );
}
