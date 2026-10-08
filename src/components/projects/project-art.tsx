import Image from "next/image";
import type { Project } from "@/content/data/projects";
export function ProjectArt({ project }: { project: Project }) {
  if (project.image)
    return (
      <div className="project-art uploaded-art">
        <Image
          src={project.image}
          alt={project.imageAlt || project.title}
          fill
          sizes="(max-width: 700px) 90vw, 600px"
        />
      </div>
    );
  return (
    <div className={"project-art art-" + project.art} aria-hidden="true">
      <span className="art-label mono">{project.category.toUpperCase()}</span>
      {project.art === "map" ? (
        <svg viewBox="0 0 500 270">
          <g stroke="currentColor" fill="none" opacity=".2">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M${i * 65 - 70} 0  ${i * 65 + 100} 270 M0 ${i * 40} 500 ${i * 40 - 100}`}
              />
            ))}
          </g>
          {[
            [130, 120, 45],
            [300, 80, 32],
            [250, 195, 50],
            [380, 170, 25],
          ].map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill="currentColor" opacity=".09" />
              <circle
                cx={x}
                cy={y}
                r={r * 0.6}
                fill="currentColor"
                opacity=".12"
              />
              <circle cx={x} cy={y} r="4" fill="currentColor" />
            </g>
          ))}
          <path
            d="M130 120 300 80 250 195 380 170"
            fill="none"
            stroke="currentColor"
            strokeDasharray="3 6"
          />
          <text x="25" y="246" fill="currentColor" fontSize="10">
            12.9716° N 77.5946° E
          </text>
        </svg>
      ) : project.art === "wave" || project.art === "voice" ? (
        <svg viewBox="0 0 500 270">
          <path d="M30 220H470M60 235V35" stroke="currentColor" opacity=".2" />
          {Array.from({ length: project.art === "voice" ? 45 : 5 }, (_, i) =>
            project.art === "voice" ? (
              <rect
                key={i}
                x={65 + i * 8.5}
                y={135 - (Math.sin(i * 0.6) * 0.5 + 0.5) * 65 - 5}
                width="3"
                height={(Math.sin(i * 0.6) * 0.5 + 0.5) * 130 + 10}
                rx="2"
                fill="currentColor"
                opacity={0.3 + i / 100}
              />
            ) : (
              <path
                key={i}
                d={`M40 ${190 + i * 8} C130 ${210 - i * 10},140 ${25 + i * 12},220 ${80 + i * 18} S350 ${240 - i * 12},465 ${40 + i * 12}`}
                fill="none"
                stroke="currentColor"
                opacity={0.15 + i * 0.17}
                strokeWidth={i === 4 ? 2 : 1}
              />
            ),
          )}
        </svg>
      ) : project.art === "network" ? (
        <svg viewBox="0 0 500 270">
          {[0, 1, 2, 3].flatMap((col) =>
            [0, 1, 2].flatMap((row) =>
              [0, 1, 2].map((next) => (
                <line
                  key={col + "-" + row + "-" + next}
                  x1={85 + col * 105}
                  y1={60 + row * 75}
                  x2={190 + col * 105}
                  y2={60 + next * 75}
                  stroke="currentColor"
                  opacity={col < 3 ? ".15" : "0"}
                />
              )),
            ),
          )}
          {[0, 1, 2, 3].flatMap((col) =>
            [0, 1, 2].map((row) => (
              <circle
                key={col + "-" + row}
                cx={85 + col * 105}
                cy={60 + row * 75}
                r="9"
                fill="var(--card)"
                stroke="currentColor"
              />
            )),
          )}
        </svg>
      ) : (
        <div
          className={
            "object-stage " + (project.art === "ball" ? "sphere-art" : "")
          }
        >
          <div className="cube">
            <i className="cube-front" />
            <i className="cube-top" />
            <i className="cube-side" />
            <span>
              {project.art === "cloud"
                ? "S3"
                : project.art === "ball"
                  ? "◉"
                  : "∞"}
            </span>
          </div>
          <div className="object-line" />
          <span className="object-caption mono">
            {project.art === "cloud"
              ? "INGEST → PROCESS → STORE"
              : project.art === "ball"
                ? "PLAY / CONNECT / EXPLORE"
                : "TRUST, BY DESIGN"}
          </span>
        </div>
      )}
      <span className="art-index">↗</span>
    </div>
  );
}
