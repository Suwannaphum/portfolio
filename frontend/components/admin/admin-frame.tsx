"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { adminFetch } from "@/lib/admin-api";

const links = [
  ["Dashboard", "/admin"],
  ["Profile", "/admin/profile"],
  ["Skills", "/admin/skills"],
  ["Experience", "/admin/experience"],
  ["Projects", "/admin/projects"],
] as const;

export function AdminFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const isLogin = pathname === "/admin/login";

  async function logout() {
    setBusy(true);
    try {
      await adminFetch("auth/logout", { method: "POST" });
    } finally {
      setBusy(false);
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <a href="#admin-main" className="skip-link">Skip to content</a>
      {!isLogin ? <header className="border-b border-[var(--border)] bg-[var(--surface)]"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8"><Link href="/admin" className="font-display text-xl font-bold">Admin<span className="text-[var(--mint)]">.</span></Link><nav aria-label="Admin navigation" className="flex flex-wrap gap-2">{links.map(([label, href]) => <Link key={href} href={href} className={`rounded-lg px-3 py-2 text-sm ${pathname === href ? "bg-[var(--mint)] font-bold text-[var(--background)]" : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"}`}>{label}</Link>)}<button type="button" disabled={busy} onClick={logout} className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)]">Log out</button></nav></div></header> : null}
      <main id="admin-main" className="mx-auto max-w-7xl px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
