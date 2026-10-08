import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { validateContact } from "../../src/lib/contact/validation.mjs";
const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  subject: "Hello",
  message: "A thoughtful test message.",
  requestId: "12345678-1234-4123-8123-123456789abc",
};
test("Story chapters preserve the supplied autobiography exactly", () => {
  const slugs = [
    "the-architecture-of-becoming",
    "the-weight-of-gravity",
    "the-horizon-keeps-moving",
  ];
  const joined = slugs
    .map((s) => fs.readFileSync("src/content/story/" + s + ".md", "utf8"))
    .join("");
  assert.equal(
    createHash("sha256").update(joined).digest("hex"),
    "62130a0fad7aa734ab0cb316583e74594a73c3c39698db34c8f8d73564eb1a74",
  );
});
test("Valid contact input is normalized", () => {
  assert.equal(
    validateContact({ ...valid, name: "  Arnav  " }).data.name,
    "Arnav",
  );
});
test("Malformed contact input, header injection and oversized messages are rejected", () => {
  for (const input of [
    null,
    [],
    { ...valid, name: {} },
    { ...valid, email: "a@b.com\r\nBcc: x@y.com" },
    { ...valid, message: "x".repeat(5001) },
    { ...valid, subject: "Hello\nOther" },
    { ...valid, requestId: "not-an-id" },
  ])
    assert.ok(validateContact(input).error);
});
test("Honeypot is identified", () => {
  assert.equal(
    validateContact({ ...valid, website: "spam.example" }).spam,
    true,
  );
});
