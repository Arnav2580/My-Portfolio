"use client";
import { useState } from "react";
import { honors, type Honor } from "@/content/data/honors";
import { HonorPoster } from "./honor-poster";
import { HonorDialog } from "./honor-dialog";

export function HonorsFeed() {
  const [active, setActive] = useState<Honor | null>(null);
  const entries = honors.filter((h) => h.id !== "big-brainer-award");
  const [year, setYear] = useState("All");
  const years = [...new Set(entries.map((h) => h.date.slice(0, 4)))];
  const visible = entries.filter(
    (h) => year === "All" || h.date.startsWith(year),
  );
  return (
    <section
      className="honors-archive"
      id="honors-archive"
      aria-labelledby="archive-heading"
    >
      <aside className="honors-archive-index">
        <span className="eyebrow">THE ARCHIVE</span>
        <h2 id="archive-heading">
          The work.
          <br />
          The people.
          <br />
          <em>The milestones.</em>
        </h2>
        <p>
          A record of competitions, conversations and the moments that stayed
          with me.
        </p>
        <nav aria-label="Filter honors by year">
          {["All", ...years].map((y) => (
            <button
              key={y}
              aria-pressed={year === y}
              onClick={() => setYear(y)}
            >
              {y === "All" ? "All years" : y}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </nav>
        <p className="mono" role="status">
          {visible.length} moments · newest first
        </p>
      </aside>
      <div className="honors-feed">
        {visible.map((h) => (
          <article className="award-post" id={h.id} key={h.id}>
            <HonorPoster honor={h} onOpen={() => setActive(h)} />
          </article>
        ))}
      </div>
      <HonorDialog honor={active} onClose={() => setActive(null)} />
    </section>
  );
}
