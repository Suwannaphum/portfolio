"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import type { Summary } from "@/lib/types";

export function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { void adminFetch<{ data: Summary }>("portfolio/admin/summary").then((result) => setSummary(result.data)).catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load summary")); }, []);
  if (error) return <div role="alert" className="rounded-2xl border border-[var(--danger)]/50 p-6 text-[var(--danger)]">{error}. <Link className="underline" href="/admin/login">Sign in</Link></div>;
  return <div><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Workspace</p><h1 className="mt-2 font-display text-4xl font-bold">Dashboard</h1><p className="mt-2 text-[var(--text-secondary)]">A focused summary of your public portfolio content.</p></div><Link href="/" target="_blank" className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm hover:border-[var(--mint)]">View public site ↗</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[["Published", summary?.publishedProjects], ["Drafts", summary?.draftProjects], ["Skills", summary?.skills], ["Experience", summary?.experiences], ["Profile", summary ? `${Math.round(summary.profileCompleteness * 100)}%` : "—"]].map(([label, value]) => <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><p className="text-sm text-[var(--text-secondary)]">{label}</p><p className="mt-3 font-display text-3xl font-bold">{value ?? "—"}</p></div>)}</div><div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"><p className="eyebrow">Quick actions</p><div className="mt-4 flex flex-wrap gap-3">{[["Update profile", "/admin/profile"], ["Add a skill", "/admin/skills"], ["Manage projects", "/admin/projects"]].map(([label, href]) => <Link key={href} href={href} className="rounded-xl bg-[var(--mint)] px-4 py-3 text-sm font-bold text-[var(--background)]">{label}</Link>)}</div></div></div>;
}
