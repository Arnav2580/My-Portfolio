import { chromium, firefox, webkit } from "@playwright/test";
import fs from "node:fs";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
fs.mkdirSync("test-results", { recursive: true });
const browser = await chromium.launch({
  ...(process.env.BROWSER_CHANNEL
    ? { channel: process.env.BROWSER_CHANNEL }
    : {}),
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "light",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const paths = [
  "/",
  "/about",
  "/projects",
  "/experience",
  "/blog",
  "/contact",
  "/about/story",
  "/about/story/the-architecture-of-becoming",
  "/projects/crowdcast",
];
for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920, 2560]) {
  await page.setViewportSize({ width, height: 900 });
  for (const path of paths) {
    const response = await page.goto(base + path);
    assert.equal(response.status(), 200, path);
    await page.locator("main").waitFor();
    const overflow = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    assert.ok(
      overflow.scroll <= overflow.client + 1,
      JSON.stringify({ width, path, ...overflow }),
    );
  }
  console.log("Responsive routes passed:", width);
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({
  path: "test-results/home-desktop.png",
  fullPage: true,
});
await page
  .getByRole("button", { name: "Switch to dark theme", exact: true })
  .click();
await page.screenshot({ path: "test-results/home-dark.png", fullPage: true });
await page
  .getByRole("button", { name: "Switch to light theme", exact: true })
  .click();
await page.goto(base + "/projects");
await page.getByRole("button", { name: "Research", exact: true }).click();
assert.equal(await page.locator(".project-card").count(), 2);
await page.getByRole("button", { name: "All", exact: true }).click();
const projectButton = page.getByRole("button", {
  name: "View CrowdCast",
  exact: true,
});
await projectButton.click();
await page.getByRole("dialog").waitFor({ state: "visible" });
await page.screenshot({ path: "test-results/project-dialog.png" });
await page.keyboard.press("Escape");
assert.equal(await page.getByRole("dialog").isVisible(), false);
assert.equal(
  await projectButton.evaluate((el) => el === document.activeElement),
  true,
);
await page.goto(base + "/about/story/the-architecture-of-becoming");
await page
  .getByRole("button", { name: "Increase text size", exact: true })
  .click();
assert.ok(
  await page
    .locator(".story-prose")
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize) > 19),
);
await page.getByRole("button", { name: "Plain view", exact: true }).click();
assert.equal(await page.locator(".plain-reader").count(), 1);
await page.getByRole("button", { name: "Book view", exact: true }).click();
await page.screenshot({ path: "test-results/story-desktop.png" });
await page.locator(".story-prose p").nth(12).scrollIntoViewIfNeeded();
await page.waitForFunction(
  () =>
    JSON.parse(localStorage.getItem("story-position") || "null")?.anchor !==
    "p-0",
);
await page.goto(base + "/about/story");
assert.equal(
  await page
    .getByRole("link", { name: "Continue reading", exact: false })
    .count(),
  1,
);
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base);
await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });
await page
  .getByRole("button", { name: "Open navigation", exact: true })
  .click();
await page
  .getByRole("navigation", { name: "Mobile navigation", exact: true })
  .getByRole("link", { name: "Contact", exact: true })
  .click();
await page.waitForURL("**/contact");
await page.locator("#mobile-nav").waitFor({ state: "detached" });
await page.getByLabel("Your name", { exact: true }).fill("Website Test");
// Exercise the failure UI without delivering real email in any environment.
await page.route("**/api/contact", (route) =>
  route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({
      message:
        "Messaging is temporarily unavailable. Please email me directly.",
    }),
  }),
);
await page
  .getByLabel("Email address", { exact: true })
  .fill("visitor@example.com");
await page
  .getByLabel("Your message", { exact: true })
  .fill(
    "This is a local validation test. No delivery credentials are configured.",
  );
await page
  .getByRole("button", { name: "Send a message", exact: false })
  .click();
await page
  .getByRole("status")
  .filter({ hasText: "temporarily unavailable" })
  .waitFor();
assert.ok(
  (
    await page.getByLabel("Your message", { exact: true }).inputValue()
  ).includes("local validation"),
);
await page.screenshot({
  path: "test-results/contact-mobile.png",
  fullPage: true,
});
await page.unroute("**/api/contact");
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(base);
assert.equal(
  await page
    .locator(".name-track")
    .evaluate((el) => getComputedStyle(el).animationName),
  "none",
);
const response = await page.goto(base + "/not-a-real-page");
assert.equal(response.status(), 404);
assert.deepEqual(errors, []);
for (const path of [
  "/",
  "/projects",
  "/about",
  "/experience",
  "/blog",
  "/contact",
  "/about/story/the-architecture-of-becoming",
]) {
  await page.goto(base + path);
  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  fs.writeFileSync(
    "test-results/axe-" + (path.replaceAll("/", "-") || "home") + ".json",
    JSON.stringify(report.violations, null, 2),
  );
  assert.deepEqual(
    report.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
    [],
    "Accessibility: " + path,
  );
}
const headers = { "Content-Type": "application/json", Origin: base };
const valid = {
  name: "Test",
  email: "test@example.com",
  message: "Local test without delivery credentials.",
  requestId: "12345678-1234-4123-8123-123456789abc",
};
assert.equal(
  (
    await page.request.post(base + "/api/contact", {
      headers: { ...headers, Origin: "https://untrusted.example" },
      data: valid,
    })
  ).status(),
  403,
);
assert.equal(
  (
    await page.request.post(base + "/api/contact", {
      headers,
      data: { ...valid, email: "invalid" },
    })
  ).status(),
  400,
);
assert.equal(
  (
    await page.request.post(base + "/api/contact", {
      headers,
      data: { ...valid, message: "x".repeat(25000) },
    })
  ).status(),
  413,
);
assert.equal(
  (
    await page.request.post(base + "/api/contact", {
      headers,
      data: { ...valid, website: "spam.example" },
    })
  ).status(),
  200,
);
await browser.close();
console.log("Interaction, motion, route and contact-failure checks passed.");
if (process.env.TEST_ALL_BROWSERS === "1" || process.argv.includes("--all")) {
  for (const [name, engine] of [
    ["firefox", firefox],
    ["webkit", webkit],
  ]) {
    const b = await engine.launch();
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    for (const path of [
      "/",
      "/projects",
      "/about/story/the-weight-of-gravity",
      "/contact",
    ]) {
      const r = await p.goto(base + path);
      assert.equal(r.status(), 200);
      assert.ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
    }
    await p.goto(base + "/projects");
    await p
      .getByRole("button", { name: "View CrowdCast", exact: true })
      .click();
    assert.ok(await p.getByRole("dialog").isVisible());
    await p.keyboard.press("Escape");
    await b.close();
    console.log(name + " route and dialog checks passed.");
  }
}
