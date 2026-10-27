"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/types";

export function GalleryDialog({ gallery }: { gallery: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % gallery.length);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gallery.length, open]);

  if (!gallery.length) return null;
  const current = gallery[index];
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--mint)] focus-visible:outline-2 focus-visible:outline-[var(--mint)]"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
      >
        <Images size={16} aria-hidden="true" /> View gallery ({gallery.length})
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Project gallery"
        className="w-[min(94vw,900px)] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-0 text-[var(--foreground)] backdrop:bg-black/80"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="relative p-4 sm:p-6">
          <button type="button" aria-label="Close gallery" className="absolute right-4 top-4 z-10 rounded-lg bg-black/60 p-2 focus-visible:outline-2 focus-visible:outline-[var(--mint)]" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
          <img src={current.imageUrl} alt={current.alt} className="max-h-[70vh] w-full rounded-xl object-contain" />
          <div className="mt-4 flex items-center justify-between gap-4">
            <button type="button" aria-label="Previous image" className="min-h-11 min-w-11 rounded-xl border border-[var(--border)] focus-visible:outline-2 focus-visible:outline-[var(--mint)]" onClick={() => setIndex((value) => (value - 1 + gallery.length) % gallery.length)}>
              <ChevronLeft className="mx-auto" size={20} />
            </button>
            <p className="text-center text-sm text-[var(--text-secondary)]">{index + 1} / {gallery.length}</p>
            <button type="button" aria-label="Next image" className="min-h-11 min-w-11 rounded-xl border border-[var(--border)] focus-visible:outline-2 focus-visible:outline-[var(--mint)]" onClick={() => setIndex((value) => (value + 1) % gallery.length)}>
              <ChevronRight className="mx-auto" size={20} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
