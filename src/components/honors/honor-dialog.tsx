"use client";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { honorDate, type Honor } from "@/content/data/honors";
import { HonorGallery } from "./honor-gallery";

export function HonorDialog({
  honor,
  onClose,
}: {
  honor: Honor | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!honor || !dialog.current) return;
    const element = dialog.current;
    const origin = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      origin?.focus({ preventScroll: true });
    };
  }, [honor]);
  return (
    <dialog
      ref={dialog}
      className="honor-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {honor && (
        <div className="honor-dialog-inner">
          <header className="honor-dialog-top">
            <span className="eyebrow">THE STORY BEHIND THE MOMENT</span>
            <button
              type="button"
              className="icon-button"
              aria-label="Close award story"
              onClick={onClose}
              autoFocus
            >
              ×
            </button>
          </header>
          <div className="honor-dialog-layout">
            <aside className="honor-dialog-media">
              {honor.media.length ? (
                <HonorGallery
                  key={honor.id}
                  media={honor.media}
                  title={honor.title}
                  compact
                />
              ) : (
                <figure className="honor-dialog-portrait">
                  <Image
                    src="/assets/profile/arnav-goyal-portrait.png"
                    alt="Arnav Goyal"
                    width={260}
                    height={229}
                    sizes="260px"
                  />
                  <figcaption>Arnav Goyal</figcaption>
                </figure>
              )}
              <p className="honor-dialog-context">{honor.organization}</p>
            </aside>
            <article className="honor-dialog-story">
              <span className="eyebrow">
                {honorDate(honor.date)} · {honor.category}
              </span>
              <h2 id={titleId}>{honor.title}</h2>
              <p className="honor-dialog-distinction">{honor.distinction}</p>
              {honor.details.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </article>
          </div>
        </div>
      )}
    </dialog>
  );
}
