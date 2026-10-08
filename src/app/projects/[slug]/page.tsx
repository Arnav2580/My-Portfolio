import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/data/projects";
import { ProjectVideo } from "@/components/projects/project-video";
import { ProjectArt } from "@/components/projects/project-art";
import { ProjectDetails } from "@/components/projects/project-details";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return {
    title: p?.title || "Project not found",
    description: p?.summary,
    alternates: { canonical: "/projects/" + slug },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <div className="container project-page">
      <Link href="/projects" className="text-link">
        ← All projects
      </Link>
      <h1 className="sr-only">{p.title}</h1>
      {p.youtubeId ? <ProjectVideo project={p} /> : <ProjectArt project={p} />}
      <ProjectDetails project={p} />
      <Link href="/contact" className="button primary">
        Let’s talk about it ↗
      </Link>
    </div>
  );
}
