import { expect, test } from "@playwright/test";

test("frontend foundation loads", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Neon Mint workspace" }),
  ).toBeVisible();
});
