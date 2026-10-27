import type { Portfolio } from "./types";

const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:3000";

export async function fetchPortfolio(): Promise<Portfolio | null> {
  try {
    const response = await fetch(`${backendUrl}/portfolio`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return (await response.json()) as Portfolio;
  } catch {
    return null;
  }
}
