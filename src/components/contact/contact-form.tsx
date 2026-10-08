"use client";
import { useRef, useState } from "react";
export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const id = useRef("");
  const status = useRef<HTMLParagraphElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    setMessage("");
    if (!id.current) id.current = crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, requestId: id.current }),
        signal: AbortSignal.timeout(18000),
      });
      const body = await response.json();
      setMessage(
        body.message || "Something went wrong. Please email me directly.",
      );
      setState(response.ok ? "success" : "error");
      if (response.ok) {
        form.reset();
        id.current = "";
      }
    } catch {
      setState("error");
      setMessage(
        "Couldn’t connect. Your message is still here. Please try again or email me directly.",
      );
    }
    requestAnimationFrame(() => status.current?.focus());
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => {
        if (state !== "sending") id.current = "";
      }}
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="How should I call you?"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        What’s on your mind? <span>(optional)</span>
        <input
          name="subject"
          maxLength={150}
          placeholder="An idea, a collaboration, a hello…"
        />
      </label>
      <label>
        Your message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Tell me a little about it."
        />
      </label>
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        className="button primary"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending…" : "Send a message"} <span>↗</span>
      </button>
      <p
        ref={status}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={"form-status " + state}
      >
        {message}
      </p>
      <p className="form-note">
        Your name, email, and message are used to respond to this conversation.
        Messages are private and are not published on this website.
      </p>
      <button
        type="button"
        className="text-link"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText("arnavgoyal.work@gmail.com");
            setCopied(true);
          } catch {
            setCopied(false);
            setMessage("Email: arnavgoyal.work@gmail.com");
          }
        }}
      >
        {copied ? "Email copied" : "Copy my email address"} <span>↗</span>
      </button>
    </form>
  );
}
