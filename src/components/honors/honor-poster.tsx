"use client";
import Image from "next/image";
import type { Honor } from "@/content/data/honors";
import { honorDate } from "@/content/data/honors";

export function HonorPoster({
  honor,
  onOpen,
}: {
  honor: Honor;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="honor-poster"
      onClick={onOpen}
      aria-label={`Read ${honor.title}`}
      aria-haspopup="dialog"
    >
      <span className="honor-author">
        <Image
          src="/assets/profile/arnav-goyal-portrait.png"
          alt=""
          width={40}
          height={40}
        />
        <span>
          <strong>Arnav Goyal</strong>
          <span>
            {honorDate(honor.date)} · {honor.category}
          </span>
        </span>
      </span>
      <span className="honor-poster-title">{honor.title}</span>
      <span className="honor-poster-summary">{honor.details[0]}</span>
      <span className="honor-poster-read">
        Read the story behind this moment <span aria-hidden="true">↗</span>
      </span>
    </button>
  );
}
