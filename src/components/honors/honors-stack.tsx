"use client";
import { useState } from "react";
import { honors } from "@/content/data/honors";
import { HonorPoster } from "./honor-poster";
import { HonorDialog } from "./honor-dialog";

export function HonorsStack() {
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const entries = honors.filter((h) => h.id !== "big-brainer-award");
  const honor = entries[index];
  if (!honor) return null;
  return (
    <div
      className="honors-browser"
      role="region"
      aria-label="Honors and awards posts"
      aria-roledescription="carousel"
    >
      <div className="honors-order">
        <span className="mono">LATEST TO EARLIEST</span>
        <span role="status" aria-live="polite">
          {index + 1} / {entries.length}
          <span className="sr-only"> · {honor.title}</span>
        </span>
      </div>
      <div className="honors-stage">
        <div className="honor-stack">
          <article className="honor-post">
            <HonorPoster honor={honor} onOpen={() => setOpened(true)} />
          </article>
        </div>
        <div className="honors-arrows">
          <button
            type="button"
            className="honor-next"
            aria-label="Next honor, older event"
            disabled={index === entries.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            →
          </button>
          <button
            type="button"
            className="honor-previous"
            aria-label="Previous honor, newer event"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            ←
          </button>
        </div>
      </div>
      <p className="honors-hint">Tap a card to open its story.</p>
      <HonorDialog
        honor={opened ? honor : null}
        onClose={() => setOpened(false)}
      />
    </div>
  );
}
