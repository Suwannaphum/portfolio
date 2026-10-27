import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--mint)] px-4 py-2 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--mint-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mint)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
