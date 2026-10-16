import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, markdown } from "@/lib/content-loader";
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  return {
    title: post?.title || "Article not found",
    alternates: { canonical: "/blog/" + slug },
  };
}
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPosts().find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <article
      className={`container article-page${p.booklet ? " booklet-article" : ""}`}
    >
      <Link href="/blog" className="text-link">
        ← Journal
      </Link>
      <header className="page-intro">
        <div className="eyebrow">
          <time dateTime={p.date}>{p.date}</time>
          {p.updated && (
            <>
              {" "}
              · Updated <time dateTime={p.updated}>{p.updated}</time>
            </>
          )}
        </div>
        <h1>{p.title}</h1>
        <p>{p.byline}</p>
      </header>
      {p.booklet && (
        <div className="booklet-download">
          <span className="mono">COMPLETE BOOKLET · 250 PAGES</span>
          <a className="button" href={p.booklet} download>
            Download the original PDF ↗
          </a>
        </div>
      )}
      {p.contents.length > 0 && (
        <details className="booklet-contents" id="booklet-contents">
          <summary>Contents — choose a chapter</summary>
          <nav aria-label="Booklet contents">
            <ul>
              {p.contents.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      )}
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: await markdown(p.content, p.contents.length > 0),
        }}
      />
      {p.contents.length > 0 && (
        <a className="booklet-back" href="#booklet-contents">
          ↑ Contents
        </a>
      )}
    </article>
  );
}
