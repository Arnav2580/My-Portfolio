import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { validateContact } from "@/lib/contact/validation.mjs";
export const runtime = "nodejs";
const reply = (message: string, status: number) =>
  NextResponse.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function POST(request: Request) {
  const allowed = new Set(
    [
      "https://arnavgoyal.com",
      "https://www.arnavgoyal.com",
      process.env.CONTACT_ALLOWED_ORIGIN,
      ...(process.env.VERCEL_URL ? ["https://" + process.env.VERCEL_URL] : []),
    ].filter(Boolean),
  );
  if (!allowed.has(request.headers.get("origin") || ""))
    return reply("This request is not allowed.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply("Please send the contact form as JSON.", 415);
  let input;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply("The message is empty.", 400);
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 24000) {
        await reader.cancel();
        return reply("Your message is too large.", 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply("We couldn’t read the message. Please try again.", 400);
  }
  const result = validateContact(input);
  if ("spam" in result) return reply("Message accepted.", 200);
  if ("error" in result)
    return reply(result.error || "Please check the form.", 400);
  if (!result.data) return reply("Please check the form.", 400);
  const { name, email, subject, message, requestId } = result.data;
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_FROM ||
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  )
    return reply(
      "Message delivery is temporarily unavailable. Please email arnavgoyal.work@gmail.com directly.",
      503,
    );
  try {
    const redis = Redis.fromEnv();
    // The deployment proxy provides the client address; hash it so raw addresses are not stored.
    const ip =
      request.headers.get("x-vercel-forwarded-for") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";
    const key =
      "contact:" +
      createHash("sha256").update(ip.split(",")[0].trim()).digest("hex");
    const count = await redis.eval(
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n",
      [key],
      [],
    );
    if (typeof count !== "number")
      throw new Error("Invalid rate-limit response");
    if (count > 5)
      return reply(
        "Too many attempts. Please wait a few minutes or email me directly.",
        429,
      );
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
        "Idempotency-Key": requestId,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: ["arnavgoyal.work@gmail.com"],
        reply_to: email,
        subject: "Portfolio: " + (subject || "New conversation"),
        text: "From: " + name + " <" + email + ">\n\n" + message,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return reply(
        "The message couldn’t be sent. Your text is still here; please try again or email me directly.",
        502,
      );
    return reply(
      "Your message has been accepted for delivery. Thank you for reaching out.",
      200,
    );
  } catch {
    return reply(
      "Delivery is temporarily unavailable. Please try again or email me directly.",
      503,
    );
  }
}
