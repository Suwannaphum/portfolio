import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: process.env.FRONTEND_URL ?? "http://127.0.0.1:3001",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm --prefix ../frontend run dev",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: !process.env.CI,
  },
});
