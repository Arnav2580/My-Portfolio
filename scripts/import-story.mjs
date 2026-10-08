import fs from "node:fs";
import path from "node:path";
const source = process.argv[2];
if (!source)
  throw new Error("Usage: npm run import:story -- <path-to-manuscript.txt>");
const original = fs.readFileSync(source, "utf8");
const chunks = original
  .split(/(?=^# Chapter (?:One|Two|Three)\s*$)/m)
  .filter((x) => x.trim());
const slugs = [
  "the-architecture-of-becoming",
  "the-weight-of-gravity",
  "the-horizon-keeps-moving",
];
if (chunks.length !== 3)
  throw new Error("Expected exactly three source chapters.");
fs.mkdirSync("src/content/story", { recursive: true });
chunks.forEach((c, i) =>
  fs.writeFileSync(path.join("src/content/story", slugs[i] + ".md"), c),
);
if (
  slugs
    .map((s) => fs.readFileSync("src/content/story/" + s + ".md", "utf8"))
    .join("") !== original
)
  throw new Error("Story copy differs from source.");
console.log(
  "All three chapters copied verbatim; byte-for-byte reconstruction verified.",
);
