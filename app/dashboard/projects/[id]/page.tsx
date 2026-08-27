"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useTheme } from "next-themes";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!params?.id) return;

    const loadProject = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.id as string)
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Project loading error:", error);
        setProject(null);
      } else {
        setProject(data);
      }

      setLoading(false);
    };

    loadProject();
  }, [params, router]);

  const handleDelete = async () => {
    if (!project) return;

    const confirmed = window.confirm(
      `Delete "${project.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setDeleting(true);

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (error) {
      console.error("Project delete error:", error);
      alert("Project could not be deleted.");
      setDeleting(false);
      return;
    }

    router.push("/dashboard/projects");
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#050816]" />
    );
  }

  const dark = resolvedTheme !== "light";

  if (loading) {
    return (
      <main
        className={`min-h-screen p-6 sm:p-10 ${
          dark
            ? "bg-[#050816] text-white"
            : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <div
            className={`rounded-3xl border p-8 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div
              className={`h-6 w-40 animate-pulse rounded-lg ${
                dark ? "bg-white/10" : "bg-slate-200"
              }`}
            />

            <div
              className={`mt-4 h-4 w-72 animate-pulse rounded-lg ${
                dark ? "bg-white/10" : "bg-slate-200"
              }`}
            />
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main
        className={`min-h-screen p-6 sm:p-10 ${
          dark
            ? "bg-[#050816] text-white"
            : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <Link
            href="/dashboard/projects"
            className={`mb-6 inline-flex items-center gap-2 text-sm font-semibold ${
              dark
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            ← Back to Projects
          </Link>

          <div
            className={`rounded-3xl border p-10 text-center ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="text-5xl">📁</div>

            <h1 className="mt-5 text-2xl font-bold">
              Project not found
            </h1>

            <p
              className={`mt-2 ${
                dark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              This project may have been deleted or you may not
              have access to it.
            </p>

            <Link
              href="/dashboard/projects"
              className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen p-6 transition-colors duration-300 sm:p-10 ${
        dark
          ? "bg-[#050816] text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <Link
          href="/dashboard/projects"
          className={`mb-6 inline-flex items-center gap-2 text-sm font-semibold transition ${
            dark
              ? "text-slate-400 hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          ← Back to Projects
        </Link>

        {/* HEADER */}
        <div
          className={`rounded-3xl border p-6 shadow-sm transition-colors duration-300 sm:p-8 ${
            dark
              ? "border-white/[0.07] bg-white/[0.025]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                  dark
                    ? "bg-violet-500/10"
                    : "bg-violet-50"
                }`}
              >
                📁
              </div>

              <div>
                <div
                  className={`mb-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    project.status === "active"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : dark
                      ? "bg-white/10 text-slate-400"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {project.status}
                </div>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  {project.name}
                </h1>

                <p
                  className={`mt-2 max-w-2xl ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {project.description ||
                    "No description added for this project."}
                </p>
              </div>
            </div>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
                dark
                  ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                  : "border-red-200 text-red-600 hover:bg-red-50"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {deleting ? "Deleting..." : "Delete Project"}
            </button>

          </div>
        </div>

        {/* TOOLS */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">
            Project Tools
          </h2>

          <p
            className={`mt-1 text-sm ${
              dark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            Create and manage AI content for this project.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* AI WRITER */}
            <Link
              href="/dashboard/ai-writer"
              className={`group rounded-3xl border p-6 transition ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025] hover:border-violet-500/30 hover:bg-white/[0.04]"
                  : "border-slate-200 bg-white hover:border-violet-200 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                  dark
                    ? "bg-violet-500/10"
                    : "bg-violet-50"
                }`}
              >
                ✍️
              </div>

              <h3 className="mt-5 font-bold">
                AI Writer
              </h3>

              <p
                className={`mt-2 text-sm ${
                  dark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Generate high-quality AI content.
              </p>

              <div className="mt-5 text-sm font-bold text-violet-500">
                Open Writer →
              </div>
            </Link>

            {/* SOCIAL MEDIA */}
            <Link
              href="/dashboard/social-media"
              className={`group rounded-3xl border p-6 transition ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025] hover:border-violet-500/30 hover:bg-white/[0.04]"
                  : "border-slate-200 bg-white hover:border-violet-200 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                  dark
                    ? "bg-pink-500/10"
                    : "bg-pink-50"
                }`}
              >
                📱
              </div>

              <h3 className="mt-5 font-bold">
                Social Media Writer
              </h3>

              <p
                className={`mt-2 text-sm ${
                  dark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Create posts for your social platforms.
              </p>

              <div className="mt-5 text-sm font-bold text-violet-500">
                Open Writer →
              </div>
            </Link>

            {/* EMAIL */}
            <Link
              href="/dashboard/email-writer"
              className={`group rounded-3xl border p-6 transition ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025] hover:border-violet-500/30 hover:bg-white/[0.04]"
                  : "border-slate-200 bg-white hover:border-violet-200 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                  dark
                    ? "bg-blue-500/10"
                    : "bg-blue-50"
                }`}
              >
                ✉️
              </div>

              <h3 className="mt-5 font-bold">
                Email Writer
              </h3>

              <p
                className={`mt-2 text-sm ${
                  dark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Write professional emails with AI.
              </p>

              <div className="mt-5 text-sm font-bold text-violet-500">
                Open Writer →
              </div>
            </Link>

          </div>
        </div>

        {/* PROJECT INFORMATION */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">
            Project Information
          </h2>

          <div
            className={`mt-5 grid gap-4 sm:grid-cols-3`}
          >
            <div
              className={`rounded-2xl border p-5 ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  dark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Status
              </p>

              <p className="mt-2 font-bold capitalize">
                {project.status}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-5 ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  dark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Created
              </p>

              <p className="mt-2 font-bold">
                {new Date(project.created_at).toLocaleDateString()}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-5 ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  dark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Last Updated
              </p>

              <p className="mt-2 font-bold">
                {new Date(project.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}