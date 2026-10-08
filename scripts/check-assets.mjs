import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? files(filename) : [filename];
  });
}

// Keep asset URLs literal so this check can validate references before deployment.
const references = new Set();
for (const file of files("src")) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/\/assets\/[a-zA-Z0-9_./-]+/g)) {
    references.add(match[0]);
    assert.ok(
      fs.existsSync(path.join("public", match[0])),
      `${file}: missing ${match[0]}`,
    );
  }
  assert.ok(!/['"`]\/images\//.test(content), `${file}: obsolete asset path`);
}
const assets = files("public");
for (const file of assets) {
  const url = "/" + path.relative("public", file).split(path.sep).join("/");
  assert.ok(url.startsWith("/assets/"), `Move ${file} under public/assets`);
  assert.ok(references.has(url), `Unreferenced public asset: ${file}`);
}
console.log(`Verified ${assets.length} assets and all local asset references.`);
