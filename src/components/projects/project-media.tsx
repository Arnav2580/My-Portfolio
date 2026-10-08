"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/content/data/projects";

export function ProjectMedia({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(0);
  const gallery = project.gallery || [];
  const shot = gallery[selected];
  if (!project.youtubeId && !project.liveUrl && !gallery.length) return null;
  return (
    <section
      className="project-media"
      aria-label={`${project.title} walkthrough and live website`}
    >
      {shot && (
        <div
          className="project-gallery"
          aria-label={`${project.title} screenshots`}
        >
          <figure>
            <a
              className="project-gallery-image"
              href={shot.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open full-size image: ${shot.caption}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 700px) 90vw, 900px"
              />
            </a>
            <figcaption>
              <div aria-live="polite">
                <span className="mono">
                  {String(selected + 1).padStart(2, "0")} / {gallery.length}
                </span>
                <strong>{shot.caption}</strong>
              </div>
              <div className="project-gallery-controls">
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={() =>
                    setSelected(
                      (selected + gallery.length - 1) % gallery.length,
                    )
                  }
                >
                  &larr;
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={() => setSelected((selected + 1) % gallery.length)}
                >
                  &rarr;
                </button>
              </div>
            </figcaption>
          </figure>
          <div
            className="project-gallery-thumbnails"
            aria-label="Choose a screenshot"
          >
            {gallery.map((item, index) => (
              <button
                type="button"
                key={item.src}
                aria-label={`Show screenshot ${index + 1}: ${item.caption}`}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <Image src={item.src} alt="" fill sizes="100px" />
              </button>
            ))}
          </div>
          <p className="project-gallery-hint">
            Select an image to view it full size.
          </p>
        </div>
      )}
      {project.youtubeId && (
        <div className="project-video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1`}
              title={`${project.title} video walkthrough`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              className="project-video-start"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${project.title} walkthrough`}
            >
              <span className="video-play-icon" aria-hidden="true">
                ▶
              </span>
              <span className="eyebrow">PROJECT WALKTHROUGH</span>
              <strong>{project.title}</strong>
              <span>Watch the project in action</span>
            </button>
          )}
        </div>
      )}
      <div className="project-media-links">
        {project.liveUrl && (
          <a
            className="button primary"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Explore live website ↗
          </a>
        )}
        {project.youtubeId && (
          <a
            className="text-link"
            href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube ↗
          </a>
        )}
      </div>
    </section>
  );
}
