import type { Project } from "@/content/data/projects";
import { ProjectMedia } from "./project-media";
export function ProjectDetails({ project: p }: { project: Project }) {
  return (
    <div className="project-details">
      <p className="eyebrow">
        {p.category} / {p.date}
      </p>
      <h2>{p.title}</h2>
      <p className="lead">{p.description}</p>
      <ProjectMedia key={p.slug} project={p} />
      <h3>My contribution</h3>
      <p>{p.contribution}</p>
      <h3>The approach</h3>
      <ul>
        {p.approach.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <h3>Scope & perspective</h3>
      <p>{p.takeaway}</p>
      {p.credit && <p className="credit">{p.credit}</p>}
      <div className="tags">
        {p.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {p.github && (
        <a
          className="text-link"
          href={p.github}
          target="_blank"
          rel="noreferrer"
        >
          Explore the repository ↗
        </a>
      )}
    </div>
  );
}
