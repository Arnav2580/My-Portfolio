import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content-loader";
import { PageIntro } from "@/components/ui/page-intro";
export const metadata: Metadata = {
  title: "Journal",
  alternates: { canonical: "/blog" },
};
export default function Blog() {
  const posts = getPosts();
  return (
    <div className="container journal-page">
      <PageIntro
        eyebrow="NOTES FROM THE PROCESS"
        title="Thinking out loud."
        description="A place for ideas that need more than a headline. Building, learning, and making sense of things along the way."
      />
      {posts.length > 0 &&
        posts.map((p) => (
          <article className="journal-entry" key={p.slug}>
            <time className="mono">{p.date}</time>
            <Link href={"/blog/" + p.slug}>
              <h2>{p.title} ↗</h2>
            </Link>
            <p>{p.excerpt}</p>
          </article>
        ))}
      <section className="journal-empty">
        <div className="journal-mark" aria-hidden="true">
          “
        </div>
        <span className="eyebrow">THE NOTEBOOK IS OPEN</span>
        <h2>
          Good things take
          <br />
          <em>a little thought.</em>
        </h2>
        <p>
          {posts.length
            ? "More observations and essays will find their way here. For the longer personal thread, my story is waiting to be read."
            : "The first essays will live here. In the meantime, my story is already waiting to be read."}
        </p>
        <Link className="text-link" href="/about/story">
          Read the story so far ↗
        </Link>
      </section>
      <div className="journal-topics mono">
        <span>BUILDING COMPANIES</span>
        <span>INTELLIGENCE & SYSTEMS</span>
        <span>PERSONAL REFLECTIONS</span>
        <span>THE LONGER HORIZON</span>
      </div>
    </div>
  );
}
