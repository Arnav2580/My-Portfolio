"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import type { HonorMedia } from "@/content/data/honors";

export function HonorGallery({
  media,
  title,
  compact = false,
}: {
  media: HonorMedia[];
  title: string;
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touch = useRef<number | null>(null);
  if (!media.length) return null;
  const item = media[index];
  const itemLabel = media.some((item) => item.type !== "image")
    ? "item"
    : "photo";
  const select = (next: number) => {
    setIndex((next + media.length) % media.length);
    setPlaying(false);
  };
  return (
    <div
      className="award-gallery"
      role="region"
      aria-label={`${title} gallery`}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          select(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          select(index - 1);
        }
      }}
    >
      <div
        className="award-gallery-frame"
        onTouchStart={(event) => {
          touch.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touch.current !== null) {
            const delta = event.changedTouches[0].clientX - touch.current;
            if (Math.abs(delta) > 60) select(index + (delta < 0 ? 1 : -1));
          }
          touch.current = null;
        }}
      >
        {item.type === "image" && compact ? (
          <Image src={item.src} alt={item.alt} fill sizes="300px" />
        ) : item.type === "image" ? (
          <a
            href={item.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size image: ${item.alt}`}
          >
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 800px) 90vw, 800px"
            />
          </a>
        ) : item.type === "video" ? (
          <video
            key={item.src}
            controls
            playsInline
            preload="none"
            src={item.src}
            poster={item.poster}
            aria-label={title}
          />
        ) : playing ? (
          <iframe
            title={`${title} recording`}
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            className="award-video-start"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title} video`}
          >
            {item.poster && (
              <Image src={item.poster} alt="" fill sizes="90vw" />
            )}
            <span>▶ Watch the recording</span>
          </button>
        )}
      </div>
      <div className="award-gallery-footer">
        <p aria-live="polite">{item.caption || title}</p>
        <div className="award-gallery-controls">
          {media.length > 1 && (
            <button
              aria-label={`Previous ${itemLabel} in ${title}`}
              onClick={() => select(index - 1)}
            >
              ←
            </button>
          )}
          <span className="mono" aria-live="polite">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(media.length).padStart(2, "0")}
          </span>
          {media.length > 1 && (
            <button
              aria-label={`Next ${itemLabel} in ${title}`}
              onClick={() => select(index + 1)}
            >
              →
            </button>
          )}
        </div>
      </div>
      {media.length > 1 && (
        <div className="award-gallery-dots">
          {media.map((_, i) => (
            <button
              key={i}
              aria-label={`Show ${itemLabel} ${i + 1} in ${title}`}
              aria-pressed={i === index}
              onClick={() => select(i)}
            />
          ))}
        </div>
      )}
      {item.type === "youtube" && (
        <a
          className="award-recording-link"
          href={`https://www.youtube.com/watch?v=${item.videoId}`}
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube ↗
        </a>
      )}
    </div>
  );
}
