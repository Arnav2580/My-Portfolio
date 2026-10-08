"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/content/data/projects";
import { ProjectArt } from "./project-art";
import { ProjectDetails } from "./project-details";
export function ProjectGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("selected");
  const [active, setActive] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (active) {
      dialog.current?.showModal();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [active]);
  function close() {
    dialog.current?.close();
    setActive(null);
    origin.current?.focus();
  }
  let items = projects.filter((p) => filter === "All" || p.category === filter);
  if (sort === "recent") items = [...items].sort((a, b) => b.year - a.year);
  if (limit) items = items.slice(0, limit);
  return (
    <>
      {!limit && (
        <div className="project-toolbar">
          <div className="filter-group" aria-label="Filter projects">
            {[
              "All",
              "AI & systems",
              "Research",
              "Cloud & engineering",
              "Spatial systems",
              "Blockchain",
              "Hardware & prototypes",
            ].map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="sort-label">
            Order{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="selected">Selected order</option>
              <option value="recent">Newest year</option>
            </select>
          </label>
        </div>
      )}
      <div className="project-grid">
        {items.map((p, i) => (
          <article className="project-card" key={p.slug}>
            <button
              className="project-open"
              aria-label={"View " + p.title}
              onClick={(e) => {
                origin.current = e.currentTarget;
                setActive(p);
              }}
            >
              <ProjectArt project={p} />
              <div className="project-card-body">
                <div className="card-meta mono">
                  <span>
                    {String(i + 1).padStart(2, "0")} / {p.category}
                  </span>
                  <span>{p.date}</span>
                </div>
                <h3>
                  {p.title}
                  <span>↗</span>
                </h3>
                <p>{p.summary}</p>
                <span className="card-reveal mono">EXPLORE THE PROJECT →</span>
              </div>
            </button>
            <Link className="project-permalink" href={"/projects/" + p.slug}>
              Full project page <span>↗</span>
            </Link>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="dialog-inner">
          <div className="dialog-top">
            <span className="eyebrow" id="project-dialog-title">
              PROJECT EXPLORER
            </span>
            <button
              onClick={close}
              className="icon-button"
              aria-label="Close project"
            >
              ✕
            </button>
          </div>
          {active && (
            <>
              <ProjectArt project={active} />
              <ProjectDetails project={active} />
              <Link
                className="button"
                href={"/projects/" + active.slug}
                onClick={close}
              >
                Open standalone page ↗
              </Link>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
