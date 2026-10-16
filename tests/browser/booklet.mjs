import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
const browser = await chromium.launch();
const slug = "evolutionary-psychology-minds-in-a-changing-world";
fs.mkdirSync("test-results", { recursive: true });
try {
  for (const width of [375, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto("http://127.0.0.1:3000/blog");
    await page
      .getByRole("link", {
        name: "Evolutionary Psychology: Minds in a Changing World",
      })
      .click();
    await expect(page).toHaveURL(new RegExp(slug));
    await expect(page.locator(".prose h2")).toHaveCount(39);
    await expect(
      page.locator(".prose h4").filter({ hasText: /^Example \d+/ }),
    ).toHaveCount(128);
    await expect(page.locator(".prose img")).toHaveCount(2);
    expect(await page.locator(".prose").innerText()).not.toMatch(
      /\[@|\[\[figure:/,
    );
    await page.locator(".booklet-contents summary").click();
    await page
      .getByRole("navigation", { name: "Booklet contents" })
      .getByRole("link", {
        name: "32. Using evolutionary psychology responsibly",
        exact: true,
      })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "32. Using evolutionary psychology responsibly",
        exact: true,
      }),
    ).toBeInViewport();
    const brokenAnchors = await page
      .locator('a[href^="#section-"]')
      .evaluateAll(
        (links) =>
          links.filter(
            (a) => !document.getElementById(a.getAttribute("href").slice(1)),
          ).length,
      );
    expect(brokenAnchors).toBe(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const pdf = await page.request.get(
      `http://127.0.0.1:3000/assets/journal/${slug}/booklet.pdf`,
    );
    expect(pdf.ok()).toBe(true);
    expect(
      (await pdf.body()).equals(
        fs.readFileSync(`public/assets/journal/${slug}/booklet.pdf`),
      ),
    ).toBe(true);
    await page.locator(".prose img").first().scrollIntoViewIfNeeded();
    await expect(page.locator(".prose img").first()).toBeVisible();
    await page.screenshot({ path: `test-results/booklet-figure-${width}.png` });
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator(".booklet-contents summary").click();
    await page.screenshot({ path: `test-results/booklet-top-${width}.png` });
    await page.close();
    console.log(
      `${width}px: complete booklet, chapter navigation, example links, figures and PDF passed`,
    );
  }
} finally {
  await browser.close();
}
