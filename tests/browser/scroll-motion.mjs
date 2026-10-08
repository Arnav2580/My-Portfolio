import fs from "node:fs";
import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
fs.mkdirSync("test-results", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  reducedMotion: "reduce",
  viewport: { width: 1440, height: 900 },
});
await page.addInitScript(() => localStorage.setItem("motion-paused", "true"));
await page.goto("http://127.0.0.1:3000");
await page.evaluate(() => document.fonts.ready);
await expect(page.locator("html")).toHaveAttribute("data-motion", "active");
assert.equal(
  await page.getByRole("button", { name: /animations|motion/i }).count(),
  0,
);
const position = () =>
  page.locator(".name-track").evaluate((el) => ({
    x: new DOMMatrixReadOnly(getComputedStyle(el).transform).m41,
    period: el.firstElementChild.getBoundingClientRect().width,
  }));
await page.waitForTimeout(200);
const before = await position();
await page.mouse.move(200, 200);
await page.mouse.move(500, 350, { steps: 10 });
await page.waitForTimeout(350);
assert.equal(
  (await position()).x,
  before.x,
  "Idle and pointer movement leave text still",
);
await page.evaluate(() => window.scrollTo({ top: 150, behavior: "instant" }));
await page.waitForTimeout(150);
const down = await position();
const delta =
  ((down.x - before.x + before.period * 1.5) % before.period) -
  before.period / 2;
assert.ok(Math.abs(delta + 225) < 1, "Scroll down moves name left");
await page.waitForTimeout(300);
assert.equal((await position()).x, down.x, "Stopping scroll stops name");
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(150);
assert.ok(
  Math.abs((await position()).x - before.x) < 1,
  "Scroll up restores position",
);
await page.locator(".stellar-vision").first().scrollIntoViewIfNeeded();
const ring = page.locator(".stellar-vision canvas").first();
await page.waitForTimeout(250);
const first = await ring.evaluate((el) => el.toDataURL());
await page.waitForTimeout(350);
assert.notEqual(
  await ring.evaluate((el) => el.toDataURL()),
  first,
  "Horizon signal animation runs by default despite old pause setting",
);
await browser.close();
console.log(
  "Scroll-only name, direction, idle, no toggle, and default 3D animation checks passed.",
);
