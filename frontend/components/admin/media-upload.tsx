"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import type { MediaUpload } from "@/lib/types";

export function MediaUploadField({ kind, projectId, accept, disabled = false, onUploaded }: { kind: "AVATAR" | "RESUME" | "COVER" | "GALLERY"; projectId?: string; accept: string; disabled?: boolean; onUploaded: (media: MediaUpload) => void }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function upload(file: File) {
    setBusy(true);
    setMessage("");
    const form = new FormData();
    form.set("file", file);
    form.set("kind", kind);
    if (projectId) form.set("projectId", projectId);
    try {
      const result = await adminFetch<{ data: MediaUpload }>("media/upload", { method: "POST", body: form });
      onUploaded(result.data);
      setMessage("Uploaded");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }
  return <div><label className={`inline-flex min-h-11 items-center rounded-xl border border-[var(--border)] px-4 py-2 text-sm ${disabled || busy ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[var(--mint)]"}`}><span>{busy ? "Uploading…" : `Upload ${kind.toLowerCase()}`}</span><input className="sr-only" type="file" accept={accept} disabled={disabled || busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.currentTarget.value = ""; }} /></label>{message ? <span className="ml-3 text-xs text-[var(--text-secondary)]">{message}</span> : null}</div>;
}
