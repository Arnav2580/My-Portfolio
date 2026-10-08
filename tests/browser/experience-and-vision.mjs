import fs from "node:fs";
import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
fs.mkdirSync("test-results", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://127.0.0.1:3000/experience");
  await expect(page.locator(".experience-row:visible")).toHaveCount(6);
  await expect(
    page.getByRole("button", {
      name: /Show all experience|Show less experience/,
    }),
  ).toHaveCount(0);
  await expect(page.locator(".recognition-list")).toHaveCount(0);
  await expect(page.locator(".experience-logo")).toHaveCount(6);
  const logos = page.locator(".experience-logo img");
  await expect(logos).toHaveCount(6);
  for (const logo of await logos.all()) {
    await logo.scrollIntoViewIfNeeded();
    await expect
      .poll(() => logo.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  }
  await page.screenshot({
    path: `test-results/experience-${width}.png`,
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:3000");
  await expect(
    page.getByRole("button", { name: "Show all experience" }),
  ).toBeVisible();
  await expect(page.locator(".header-note")).toHaveText(
    "RELENTLESS. AUTODIDACT.",
  );
  const scene = page.locator(".stellar-vision");
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-mining-texture", "ready");
  await expect(scene).toHaveAttribute("data-cargo-texture", "ready");
  await scene.getByRole("button", { name: "Mining", exact: true }).click();
  await expect(scene).toHaveAttribute("data-journey-stage", "1");
  await page.waitForTimeout(300);
  const first = await scene.locator("canvas").evaluate((c) => c.toDataURL());
  await page.waitForTimeout(300);
  assert.notEqual(
    await scene.locator("canvas").evaluate((c) => c.toDataURL()),
    first,
  );
  await scene.screenshot({ path: `test-results/mining-enhanced-${width}.png` });
  await page.goto("http://127.0.0.1:3000/honors");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Honors and awards.",
  );
  await page.locator("#speaking-sharing .honor-poster").click();
  await expect(page.getByRole("dialog")).toContainText("pitch deck");
  await page.keyboard.press("Escape");
  await expect(page.locator(".featured-speech")).toBeVisible();
  await page.goto("http://127.0.0.1:3000/about");
  await expect(page.locator(".beyond-principle")).toContainText(
    "Discipline = Consistency + Hard Work.",
  );
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  );
  console.log(
    width + "px experience, branding, mining, honors and vision passed",
  );
}
assert.deepEqual(errors, []);
await browser.close();
