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
    <article className="container article-page">
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
        <p>By Arnav Goyal</p>
      </header>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: await markdown(p.content) }}
      />
    </article>
  );
}
