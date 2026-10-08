"use client";

import { useId, useState, type ReactNode } from "react";

export function ExpandableParagraph({
  children,
  topic,
}: {
  children: ReactNode;
  topic: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return (
    <div className="beyond-paragraph">
      <p id={id} className={expanded ? "" : "is-collapsed"}>
        {children}
      </p>
      <button
        type="button"
        aria-controls={id}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Read less" : "Read more"} about ${topic}`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less" : "Read more"}{" "}
        <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
      </button>
    </div>
  );
}
