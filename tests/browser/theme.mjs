import { chromium, expect } from "@playwright/test";

const browser = await chromium.launch();
try {
  for (const colorScheme of ["light", "dark"]) {
    const context = await browser.newContext({
      colorScheme,
      viewport: { width: 320, height: 780 },
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3000/about");
    await expect(page.locator("html")).toHaveClass(new RegExp(colorScheme));
    await expect(
      page.getByRole("button", { name: "Dismiss theme tip" }),
    ).toBeVisible();
    const bounds = await page.locator(".theme-hint").boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
    await page.getByRole("button", { name: "Dismiss theme tip" }).focus();
    await page.keyboard.press("Escape");
    await expect(page.locator(".theme-control > button")).toBeFocused();
    await expect(page.locator(".theme-hint")).toHaveCount(0);
    const opposite = colorScheme === "light" ? "dark" : "light";
    await page.emulateMedia({ colorScheme: opposite });
    await expect(page.locator("html")).toHaveClass(new RegExp(opposite));
    await page.locator(".theme-control > button").click();
    await expect(page.locator("html")).toHaveClass(new RegExp(colorScheme));
    await page.emulateMedia({ colorScheme });
    await page.emulateMedia({ colorScheme: opposite });
    await expect(page.locator("html")).toHaveClass(new RegExp(colorScheme));
    await page.goto("http://127.0.0.1:3000/projects");
    await expect(page.locator("html")).toHaveClass(new RegExp(colorScheme));
    await page.reload();
    await expect(page.locator("html")).toHaveClass(new RegExp(colorScheme));
    await page.waitForTimeout(1500);
    await expect(page.locator(".theme-hint")).toHaveCount(0);
    await context.close();
  }
  const context = await browser.newContext({ colorScheme: "light" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/about");
  await page.locator(".theme-control > button").click();
  await page.waitForTimeout(1600);
  await expect(page.locator(".theme-hint")).toHaveCount(0);
  await context.close();
  console.log(
    "Theme checks passed: system preference, persistent override, hint dismissal, early interaction, and mobile placement.",
  );
} finally {
  await browser.close();
}
