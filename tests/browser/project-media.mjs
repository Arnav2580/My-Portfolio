import fs from "node:fs";
import { chromium, expect } from "@playwright/test";
fs.mkdirSync("test-results", { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto("http://127.0.0.1:3000/projects");
    await expect(page.locator(".project-card > .project-video")).toHaveCount(4);
    const bhuCard = page.locator(".project-card").filter({
      has: page.getByRole("button", {
        name: "View Bhu_dhrishti",
        exact: true,
      }),
    });
    await expect(bhuCard.locator(".project-art, .project-gallery")).toHaveCount(
      0,
    );
    await bhuCard
      .getByRole("button", { name: "Play Bhu_dhrishti walkthrough" })
      .click();
    await expect(bhuCard.locator("iframe")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/nq5pvwIKaYo?autoplay=1",
    );
    await bhuCard
      .getByRole("button", { name: "View Bhu_dhrishti", exact: true })
      .click();
    await expect(bhuCard.locator("iframe")).toHaveCount(0);
    await expect(
      page.getByRole("dialog").locator(".project-gallery img").first(),
    ).toHaveAttribute("alt", /city explorer/);
    await page.keyboard.press("Escape");
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const slug of [
      "bhu-dhrishti",
      "necklink",
      "coinplay",
      "probabilistic-ml",
      "neuro-symbolic-reasoning",
      "automatic-doorbell",
      "secure-data-pipeline",
    ]) {
      await page.goto("http://127.0.0.1:3000/projects/" + slug);
      await expect(page.locator(".project-demo")).toHaveCount(0);
      if (["bhu-dhrishti", "necklink", "coinplay"].includes(slug)) {
        const video = await page.locator(".project-video").boundingBox();
        const gallery = await page.locator(".project-gallery").boundingBox();
        expect(video.y + video.height).toBeLessThan(gallery.y);
      }
      if (slug === "secure-data-pipeline") {
        await expect(
          page.locator(".project-gallery-thumbnails button"),
        ).toHaveCount(7);
      }
      if (slug === "bhu-dhrishti") {
        await page
          .getByRole("button", { name: "Play Bhu_dhrishti walkthrough" })
          .click();
        await expect(page.locator(".project-video iframe")).toHaveAttribute(
          "src",
          "https://www.youtube-nocookie.com/embed/nq5pvwIKaYo?autoplay=1",
        );
      }
      if (slug === "automatic-doorbell") {
        await page.locator(".project-video button").click();
        await expect(page.locator(".project-video iframe")).toHaveAttribute(
          "src",
          "https://www.youtube-nocookie.com/embed/EYC0nVegbFI?autoplay=1",
        );
      }
      if (slug === "bhu-dhrishti" || slug === "necklink") {
        await expect(
          page.getByRole("link", { name: "Explore live website" }),
        ).toHaveAttribute(
          "href",
          slug === "necklink"
            ? "https://necklink.onrender.com/"
            : "https://bhudrishti-4d.onrender.com/",
        );
      }
      if (slug === "necklink") {
        await expect(page.locator(".project-video iframe")).toHaveCount(0);
        await page
          .getByRole("button", { name: "Play NeckLink walkthrough" })
          .click();
        await expect(page.locator(".project-video iframe")).toHaveAttribute(
          "src",
          "https://www.youtube-nocookie.com/embed/8bmRGq05lz8?autoplay=1",
        );
      }
      if (slug === "coinplay") {
        await expect(
          page.locator(".project-gallery-thumbnails button"),
        ).toHaveCount(12);
        await page
          .getByRole("button", { name: "Next screenshot", exact: true })
          .click();
        await expect(page.locator(".project-gallery figcaption")).toContainText(
          "Player statistics",
        );
        await page
          .getByRole("button", { name: "Previous screenshot", exact: true })
          .click();
        await expect(page.locator(".project-gallery figcaption")).toContainText(
          "Gameweek dream team",
        );
        await page
          .getByRole("button", {
            name: "Show screenshot 12: Network selection",
            exact: true,
          })
          .click();
        await expect(page.locator(".project-gallery-image")).toHaveAttribute(
          "href",
          "/assets/projects/coinplay/wallet-networks.png",
        );
        await expect(page.locator(".project-gallery-image img")).toBeVisible();
        await expect
          .poll(() =>
            page
              .locator(".project-gallery-image img")
              .evaluate((img) => img.complete && img.naturalWidth > 0),
          )
          .toBe(true);
        await page
          .getByRole("button", {
            name: "Play CoinPlay walkthrough",
            exact: true,
          })
          .click();
        await expect(page.locator(".project-video iframe")).toHaveAttribute(
          "src",
          "https://www.youtube-nocookie.com/embed/Yzdlr-dC4uk?autoplay=1",
        );
        await page
          .locator(".project-gallery")
          .screenshot({ path: `test-results/coinplay-gallery-${width}.png` });
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
    await page.close();
    console.log(width + "px project media checks passed");
  }
} finally {
  await browser.close();
}
