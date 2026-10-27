"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await adminFetch("auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      router.push("/admin");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in");
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7" noValidate><p className="eyebrow">Owner access</p><h1 className="mt-3 font-display text-4xl font-bold">Sign in</h1><p className="mt-3 text-sm text-[var(--text-secondary)]">Manage the portfolio from the same-origin admin workspace.</p><div className="mt-7 space-y-5"><div><Label htmlFor="email">Email</Label><Input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div><div><Label htmlFor="password">Password</Label><Input id="password" type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></div></div>{error ? <p role="alert" className="mt-5 rounded-xl border border-[var(--danger)]/50 bg-[var(--danger)]/10 p-3 text-sm text-[var(--danger)]">{error}</p> : null}<Button type="submit" disabled={busy} className="mt-7 w-full">{busy ? "Signing in…" : "Sign in"}</Button></form>;
}
