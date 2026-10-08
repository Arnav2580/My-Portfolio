"use client";
import { useState } from "react";
import type { Project } from "@/content/data/projects";
export function ProjectVideo({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  if (!project.youtubeId) return null;
  return (
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
          <img
            className="project-video-poster"
            src={`https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
          />
          <span className="video-play-icon" aria-hidden="true">
            ▶
          </span>
          <span className="eyebrow">PROJECT WALKTHROUGH</span>
          <strong>{project.title}</strong>
          <span>Watch the project in action</span>
        </button>
      )}
    </div>
  );
}
