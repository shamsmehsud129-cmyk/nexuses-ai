"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { createClient } from "@supabase/supabase-js";

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

function FolderIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path
        strokeLinecap="round"
        d="m16 16 4.5 4.5"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12H5m7 7-7-7 7-7"
      />
    </svg>
  );
}

export default function ProjectsPage() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    loadProjects();
  }, [mounted]);

  const loadProjects = async () => {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Projects loading error:", error);
      setProjects([]);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  };

  const createProject = async () => {
    const name = newProjectName.trim();

    if (!name) {
      return;
    }

    setCreating(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      setCreating(false);
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        name,
        description:
          newProjectDescription.trim() || "New Nexuses AI project.",
        status: "Draft",
      })
      .select()
      .single();

    if (error) {
      console.error("Project creation error:", error);
      alert("Project could not be created.");
      setCreating(false);
      return;
    }

    if (data) {
      setProjects((current) => [data, ...current]);
    }

    setNewProjectName("");
    setNewProjectDescription("");
    setShowNewProject(false);
    setCreating(false);
  };

  const deleteProject = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Project deletion error:", error);
      alert("Project could not be deleted.");
      return;
    }

    setProjects((current) =>
      current.filter((project) => project.id !== id)
    );
  };

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        (project.description || "").toLowerCase().includes(query)
    );
  }, [projects, search]);

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length;

  const draftProjects = projects.filter(
    (project) => project.status === "Draft"
  ).length;

  const dark = mounted && resolvedTheme !== "light";

  if (!mounted) {
    return <main className="min-h-screen bg-[#050816]" />;
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
          href="/dashboard"
          className={`mb-6 inline-flex items-center gap-2 text-sm font-semibold transition ${
            dark
              ? "text-slate-400 hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <ArrowLeftIcon />
          Back to Dashboard
        </Link>

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                dark
                  ? "border-white/10 bg-white/[0.04] text-slate-400"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Workspace
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Projects
            </h1>

            <p className="mt-2 text-slate-500">
              Organize your AI content and keep your work in one place.
            </p>
          </div>

          <button
            onClick={() => setShowNewProject(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
          >
            <span className="text-lg leading-none">+</span>
            New Project
          </button>
        </div>

        {/* STATS */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div
            className={`rounded-2xl border p-5 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-sm text-slate-500">
              Total Projects
            </p>

            <p className="mt-2 text-2xl font-bold">
              {projects.length}
            </p>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-sm text-slate-500">
              Active
            </p>

            <p className="mt-2 text-2xl font-bold">
              {activeProjects}
            </p>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-sm text-slate-500">
              Drafts
            </p>

            <p className="mt-2 text-2xl font-bold">
              {draftProjects}
            </p>
          </div>

        </div>

        {/* SEARCH */}
        <div
          className={`mb-6 rounded-2xl border p-4 ${
            dark
              ? "border-white/[0.07] bg-white/[0.025]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="relative">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <SearchIcon />
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className={`w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition ${
                dark
                  ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-violet-500"
                  : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
              }`}
            />

          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div
            className={`rounded-3xl border p-12 text-center ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />

            <p className="mt-4 text-sm text-slate-500">
              Loading your projects...
            </p>
          </div>

        ) : filteredProjects.length > 0 ? (

          /* PROJECT CARDS */
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`group rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 ${
                  dark
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-violet-500/30 hover:bg-white/[0.04]"
                    : "border-slate-200 bg-white hover:border-violet-200 hover:shadow-md"
                }`}
              >

                {/* ICON */}
                <div className="mb-5 flex items-center justify-between">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      dark
                        ? "bg-violet-500/10 text-violet-400"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    <FolderIcon />
                  </div>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      dark
                        ? "text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                        : "text-slate-400 hover:bg-red-50 hover:text-red-600"
                    }`}
                    title="Delete project"
                  >
                    Delete
                  </button>

                </div>

                {/* NAME */}
                <h2 className="text-lg font-bold">
                  {project.name}
                </h2>

                {/* DESCRIPTION */}
                <p
                  className={`mt-2 min-h-[48px] text-sm leading-6 ${
                    dark ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  {project.description || "No description added."}
                </p>

                {/* FOOTER */}
                <div
                  className={`mt-6 flex items-center justify-between border-t pt-4 ${
                    dark
                      ? "border-white/[0.06]"
                      : "border-slate-100"
                  }`}
                >

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      project.status === "Active"
                        ? dark
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-emerald-50 text-emerald-600"
                        : dark
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {project.status}
                  </span>

                  <span
                    className={`text-xs ${
                      dark ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {new Date(
                      project.created_at
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>
            ))}

          </div>

        ) : (

          /* EMPTY */
          <div
            className={`rounded-3xl border p-12 text-center ${
              dark
                ? "border-white/[0.07] bg-white/[0.025]"
                : "border-slate-200 bg-white"
            }`}
          >

            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                dark
                  ? "bg-violet-500/10 text-violet-400"
                  : "bg-violet-50 text-violet-600"
              }`}
            >
              <FolderIcon />
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {search ? "No projects found" : "No projects yet"}
            </h2>

            <p
              className="mt-2 text-sm text-slate-500"
            >
              {search
                ? "Try a different search."
                : "Create your first project to get started."}
            </p>

            {!search && (
              <button
                onClick={() => setShowNewProject(true)}
                className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
              >
                Create Project
              </button>
            )}

          </div>
        )}

      </div>

      {/* NEW PROJECT MODAL */}
      {showNewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">

          <div
            className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl ${
              dark
                ? "border-white/10 bg-[#0b1020]"
                : "border-slate-200 bg-white"
            }`}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Create New Project
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Start a new workspace for your AI content.
                </p>
              </div>

              <button
                onClick={() => setShowNewProject(false)}
                className={`rounded-lg px-2 py-1 text-xl ${
                  dark
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-400 hover:text-slate-900"
                }`}
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* NAME */}
            <div className="mt-6">

              <label
                className={`mb-2 block text-sm font-semibold ${
                  dark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Project Name
              </label>

              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="e.g. My New Campaign"
                autoFocus
                className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                  dark
                    ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-violet-500"
                    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
                }`}
              />

            </div>

            {/* DESCRIPTION */}
            <div className="mt-5">

              <label
                className={`mb-2 block text-sm font-semibold ${
                  dark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Description
              </label>

              <textarea
                value={newProjectDescription}
                onChange={(e) =>
                  setNewProjectDescription(e.target.value)
                }
                placeholder="What is this project about?"
                rows={4}
                className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition ${
                  dark
                    ? "border-white/10 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-violet-500"
                    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
                }`}
              />

            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => setShowNewProject(false)}
                disabled={creating}
                className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                  dark
                    ? "text-slate-400 hover:bg-white/5 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={createProject}
                disabled={creating || !newProjectName.trim()}
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {creating ? "Creating..." : "Create Project"}
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}