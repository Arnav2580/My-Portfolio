import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { createServer } from "node:net";

await new Promise((resolve, reject) => {
  const probe = createServer();
  probe.once("error", () =>
    reject(
      new Error(
        "Stop the local server before running test:ci; port 3000 must be free.",
      ),
    ),
  );
  probe.listen(3000, "127.0.0.1", () => probe.close(resolve));
});

const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3000",
  ],
  { stdio: "inherit" },
);
let serverError;
server.on("error", (error) => {
  serverError = error;
});

try {
  const deadline = Date.now() + 60000;
  let ready = false;
  while (Date.now() < deadline) {
    if (serverError) throw serverError;
    if (server.exitCode !== null)
      throw new Error(
        "Preview server exited before checks; port 3000 must be free.",
      );
    try {
      ready = (
        await fetch("http://127.0.0.1:3000", {
          signal: AbortSignal.timeout(2000),
        })
      ).ok;
    } catch {}
    if (ready) break;
    await delay(300);
  }
  if (!ready) throw new Error("Preview server did not become ready.");
  for (const file of [
    "site",
    "honors",
    "project-media",
    "experience-and-vision",
    "scroll-motion",
  ]) {
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [`tests/browser/${file}.mjs`], {
        stdio: "inherit",
      });
      child.on("error", reject);
      child.on("exit", (code) =>
        code === 0 ? resolve() : reject(new Error(`${file} failed (${code})`)),
      );
    });
  }
} finally {
  server.kill();
}
