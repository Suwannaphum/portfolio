import { expect, test } from "@playwright/test";

test("public portfolio renders its main sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1").filter({ hasText: "Full Stack Developer" })).toBeVisible();
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator("#work")).toBeVisible();
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
  await expect(page.getByText("Draft Project Demo")).toHaveCount(0);
});

test("mobile navigation and gallery are keyboard usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.getByRole("link", { name: "Work" }).last().click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("button", { name: /View gallery/ }).click();
  await expect(page.getByRole("dialog", { name: "Project gallery" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Project gallery" })).toBeHidden();
});

test("owner can sign in to admin", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill("owner@example.com");
  await page.getByLabel("Password").fill("change-me");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByText("Published")).toBeVisible();
});
