"use client";

import { useState } from "react";
import Link from "next/link";

const recordings = [
  {
    year: "2019",
    title: "The loss that changed my direction",
    description:
      "The science competition I describe at the beginning of this chapter. Coming last taught me that building an idea and explaining it were two different skills.",
    videoId: "28LwfRu0His",
    label: "A turning point",
  },
  {
    year: "2020",
    title: "An idea at the front door",
    description:
      "My automatic doorbell: an early attempt to build a practical response to a problem around me. A small prototype, and a reason to keep experimenting.",
    videoId: "KIIR4S1xlYc",
    label: "An early experiment",
  },
];

export function StoryRecordings() {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <section
      className="story-recordings"
      id="chapter-recordings"
      aria-labelledby="recordings-heading"
    >
      <span className="eyebrow">FROM MY PERSONAL ARCHIVE</span>
      <h2 id="recordings-heading">The moments behind the words.</h2>
      <p className="recordings-intro">
        Two recordings to accompany this chapter. A setback, then another reason
        to build.
      </p>
      <div className="story-recording-list">
        {recordings.map((recording) => (
          <article className="story-recording" key={recording.videoId}>
            <span className="recording-year mono">{recording.year}</span>
            <div className="recording-copy">
              <span className="eyebrow">{recording.label}</span>
              <h3>{recording.title}</h3>
              <p>{recording.description}</p>
              <div className="recording-actions">
                <button
                  aria-expanded={playing === recording.videoId}
                  aria-controls={`recording-${recording.videoId}`}
                  onClick={() =>
                    setPlaying(
                      playing === recording.videoId ? null : recording.videoId,
                    )
                  }
                >
                  {playing === recording.videoId
                    ? "Close recording"
                    : "Watch recording"}
                  <span className="sr-only">: {recording.title}</span>
                  <span aria-hidden="true"> ↗</span>
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${recording.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube ↗<span className="sr-only">: {recording.title}</span>
                </a>
              </div>
              <div
                id={`recording-${recording.videoId}`}
                hidden={playing !== recording.videoId}
              >
                {playing === recording.videoId && (
                  <iframe
                    className="story-recording-player"
                    src={`https://www.youtube-nocookie.com/embed/${recording.videoId}?autoplay=1`}
                    title={recording.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              {recording.year === "2020" && (
                <Link
                  className="recording-project-link"
                  href="/projects/automatic-doorbell"
                >
                  See the prototype in Projects →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
