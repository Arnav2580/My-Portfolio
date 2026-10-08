"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { chapters } from "@/content/data/story-chapters";
export function ResumeReading() {
  const [href, setHref] = useState("/about/story/" + chapters[0].slug);
  const [resume, setResume] = useState(false);
  useEffect(() => {
    try {
      const x = JSON.parse(localStorage.getItem("story-position") || "null");
      if (x && chapters.some((c) => c.slug === x.slug)) {
        setHref("/about/story/" + x.slug + "#" + x.anchor);
        setResume(true);
      }
    } catch {}
  }, []);
  return (
    <Link className="button primary" href={href}>
      {resume ? "Continue reading" : "Begin chapter one"} <span>↗</span>
    </Link>
  );
}
export function Reader({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const [size, setSize] = useState(1);
  const [plain, setPlain] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      setSize(Number(localStorage.getItem("story-size")) || 1);
    } catch {}
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paragraphs = Array.from(el.querySelectorAll(".prose p"));
    paragraphs.forEach((p, i) => (p.id = "p-" + i));
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView();
    }
    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el!.getBoundingClientRect();
        setProgress(
          Math.min(
            100,
            Math.max(
              0,
              ((innerHeight - rect.top) / (rect.height + innerHeight)) * 100,
            ),
          ),
        );
        const current = paragraphs.find(
          (p) => p.getBoundingClientRect().bottom > 120,
        );
        if (current)
          try {
            localStorage.setItem(
              "story-position",
              JSON.stringify({ slug, anchor: current.id }),
            );
          } catch {}
      });
    }
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [slug]);
  return (
    <div className={plain ? "reader plain-reader" : "reader"}>
      <div
        className="reading-progress"
        role="progressbar"
        aria-label="Chapter reading progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <i style={{ width: progress + "%" }} />
      </div>
      <div className="reader-controls">
        <Link href="/about/story">← Contents</Link>
        <div>
          <button
            aria-label="Decrease text size"
            disabled={size <= 0.9}
            onClick={() => {
              const n = Math.max(0.9, size - 0.1);
              setSize(n);
              try {
                localStorage.setItem("story-size", String(n));
              } catch {}
            }}
          >
            A−
          </button>
          <button
            aria-label="Increase text size"
            disabled={size >= 1.4}
            onClick={() => {
              const n = Math.min(1.4, size + 0.1);
              setSize(n);
              try {
                localStorage.setItem("story-size", String(n));
              } catch {}
            }}
          >
            A+
          </button>
          <button aria-pressed={plain} onClick={() => setPlain(!plain)}>
            {plain ? "Book view" : "Plain view"}
          </button>
        </div>
      </div>
      <div ref={ref} style={{ "--reader-scale": size } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}
