"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { roles } from "@/content/data/experience";

export function ExperienceList({ full = false }: { full?: boolean }) {
  const [expanded, setExpanded] = useState(full);
  const [openDescriptions, setOpenDescriptions] = useState<string[]>([]);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const revealHash = () => {
      const id = window.location.hash.slice(1);
      if (roles.some((r) => r.name.toLowerCase().split(" ")[0] === id)) {
        setExpanded(true);
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            document.getElementById(id)?.scrollIntoView({ block: "start" }),
          ),
        );
      }
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, []);
  return (
    <div
      className={`experience-list ${expanded ? "is-expanded" : "is-preview"}`}
      ref={root}
    >
      <div id="experience-entries" className="experience-entries">
        {roles.map((role, index) => (
          <article
            className="experience-row"
            id={role.name.toLowerCase().split(" ")[0]}
            key={role.name}
            hidden={!expanded && index > 1}
          >
            <div
              className={`experience-logo${role.image ? " has-logo" : ""}`}
              aria-hidden="true"
            >
              {role.image ? (
                <Image src={role.image} alt="" width={52} height={52} />
              ) : (
                role.initial
              )}
            </div>
            <div className="experience-copy">
              <h3>{role.role}</h3>
              <p className="experience-company">{role.name}</p>
              <p className="experience-date">{role.date}</p>
              <p className="experience-status">{role.status}</p>
              <div
                id={`experience-description-${index}`}
                className={`experience-description ${!full && !openDescriptions.includes(role.name) ? "is-collapsed" : ""}`}
              >
                {role.name === "Aerospacizm" && (
                  <p className="experience-date">
                    Description from the time of this role:
                  </p>
                )}
                {role.name === "The New York Academy of Sciences" ? (
                  <ul>
                    {role.body.split("\n\n").map((paragraph) => (
                      <li key={paragraph}>{paragraph}</li>
                    ))}
                  </ul>
                ) : (
                  role.body
                    .split("\n\n")
                    .map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                )}
                {role.note && <p>{role.note}</p>}
              </div>
              {!full && (
                <button
                  type="button"
                  className="experience-description-toggle"
                  aria-expanded={openDescriptions.includes(role.name)}
                  aria-controls={`experience-description-${index}`}
                  aria-label={`${openDescriptions.includes(role.name) ? "Show less" : "Show more"} about ${role.name}`}
                  onClick={() =>
                    setOpenDescriptions((current) =>
                      current.includes(role.name)
                        ? current.filter((name) => name !== role.name)
                        : [...current, role.name],
                    )
                  }
                >
                  {openDescriptions.includes(role.name)
                    ? "Show less"
                    : "Show more"}{" "}
                  <span aria-hidden="true">
                    {openDescriptions.includes(role.name) ? "↑" : "↓"}
                  </span>
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {!full && (
        <div className="experience-expand">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="experience-entries"
            onClick={() => {
              if (
                expanded &&
                root.current &&
                root.current.getBoundingClientRect().top < 0
              )
                root.current.scrollIntoView({ block: "start" });
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Show less experience" : "Show all experience"}{" "}
            <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
