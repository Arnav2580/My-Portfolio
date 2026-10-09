import fs from "node:fs";
import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
fs.mkdirSync("test-results", { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:3000");
    const heights = [],
      positions = [];
    for (let i = 0; i < 11; i++) {
      const box = await page.locator(".honor-poster").boundingBox();
      heights.push(box.height);
      positions.push(
        (await page.locator(".honors-arrows").boundingBox()).y - box.y,
      );
      await expect(page.locator(".honor-poster .award-gallery")).toHaveCount(0);
      if (i < 10)
        await page
          .getByRole("button", { name: "Next honor, older event", exact: true })
          .click();
    }
    assert.ok(
      Math.max(...heights) - Math.min(...heights) < 1,
      "Uniform card heights",
    );
    assert.ok(
      Math.max(...positions) - Math.min(...positions) < 4,
      "Stable arrow positions",
    );
    await page.locator(".honor-poster").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page
      .getByRole("button", { name: "Close award story", exact: true })
      .click();
    await expect(page.locator(".honor-poster")).toBeFocused();
    await page.goto("http://127.0.0.1:3000/honors");
    await expect(page.locator(".award-post")).toHaveCount(11);
    await expect(page.locator(".award-post .award-gallery")).toHaveCount(0);
    const poster = page.locator("#bis-science-quiz .honor-poster");
    await poster.click();
    const modal = page.getByRole("dialog");
    await expect(modal).toContainText("Sudheer Bishnoi");
    assert.ok(
      (await modal.locator(".honor-dialog-media").boundingBox()).width <= 281,
    );
    await expect(modal.locator("a[aria-label^='Open full-size']")).toHaveCount(
      0,
    );
    await modal
      .getByRole("button", {
        name: "Next photo in BIS Quiz on Science & Standards",
        exact: true,
      })
      .click();
    await expect(modal.locator(".award-gallery-frame img")).toHaveAttribute(
      "alt",
      /certificate/,
    );
    await modal.screenshot({ path: `test-results/honor-dialog-${width}.png` });
    if (width === 1440) {
      const violations = (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations;
      assert.deepEqual(
        violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        [],
      );
    }
    await page.keyboard.press("Escape");
    await expect(poster).toBeFocused();
    await page
      .getByRole("navigation", { name: "Filter honors by year" })
      .getByRole("button", { name: "2020", exact: false })
      .click();
    await expect(page.locator(".award-post")).toHaveCount(1);
    await page.locator("#automatic-doorbell .honor-poster").click();
    await modal
      .getByRole("button", {
        name: "Next item in A touch-free doorbell, and my first local coverage",
        exact: true,
      })
      .click();
    await modal
      .getByRole("button", {
        name: "Play A touch-free doorbell, and my first local coverage video",
        exact: true,
      })
      .click();
    await expect(modal.locator("iframe")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/KIIR4S1xlYc?autoplay=1",
    );
    await page.keyboard.press("Escape");
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    await page.goto(
      "http://127.0.0.1:3000/about/story/the-architecture-of-becoming",
    );
    await page
      .getByRole("button", {
        name: /Watch recording.*The loss that changed my direction/,
        exact: false,
      })
      .click();
    await expect(page.locator(".story-recording-player")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/RgXFAr22Cmk?autoplay=1",
    );
    await page
      .getByRole("button", {
        name: /Watch recording.*An idea at the front door/,
        exact: false,
      })
      .click();
    await expect(page.locator(".story-recording-player")).toHaveCount(1);
    await expect(page.locator(".story-recording-player")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/KIIR4S1xlYc?autoplay=1",
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    assert.deepEqual(errors, []);
    await context.close();
    console.log(
      `${width}px: uniform posters, modal, photo sizing, keyboard and story recordings passed`,
    );
  }
} finally {
  await browser.close();
}
