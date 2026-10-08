"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { featuredSpeech, honorDate } from "@/content/data/honors";

export function FeaturedSpeech({ compact = false }: { compact?: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section
      className={`featured-speech ${compact ? "is-compact" : ""}`}
      id="big-brainer-speech"
      aria-labelledby="speech-heading"
    >
      <div className="speech-heading">
        <span className="eyebrow">ON STAGE / A MOMENT THAT MATTERED</span>
        <span className="mono">{honorDate(featuredSpeech.date)}</span>
      </div>
      <div className="speech-layout">
        <div className="speech-recording">
          <div className="speech-player">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${featuredSpeech.videoId}?autoplay=1`}
                title="Arnav Goyal's speech on technology and entrepreneurship"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                aria-label="Watch Arnav's Big Brainer award speech"
              >
                <Image
                  src={featuredSpeech.poster}
                  alt="Arnav receiving his award at his college"
                  fill
                  sizes="(max-width: 800px) 90vw, 720px"
                  priority={!compact}
                />
                <span className="speech-play">
                  <span aria-hidden="true">▶</span> Watch the speech
                </span>
              </button>
            )}
          </div>
          <div className="speech-caption">
            <span>THE RECORDING</span>
            <a
              href={`https://www.youtube.com/watch?v=${featuredSpeech.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              Open on YouTube ↗
            </a>
          </div>
          <blockquote>
            “{featuredSpeech.quote}”<cite>Arnav Goyal</cite>
          </blockquote>
        </div>
        <div className="speech-copy">
          <span className="speech-award">{featuredSpeech.award}</span>
          <h2 id="speech-heading">
            Engineering ideas.
            <br />
            <em>Entrepreneurial impact.</em>
          </h2>
          <p>{featuredSpeech.introduction}</p>
          {!compact && (
            <>
              <p className="speech-topic">{featuredSpeech.topic}</p>
              {featuredSpeech.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </>
          )}
          {compact && (
            <Link href="/honors#big-brainer-speech" className="text-link">
              The story behind the speech ↗
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
