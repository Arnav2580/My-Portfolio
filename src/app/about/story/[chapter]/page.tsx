import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, getChapter, markdown } from "@/lib/content-loader";
import { Reader } from "@/components/story/story-reader";
import { StoryRecordings } from "@/components/story/story-recordings";
export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter } = await params;
  const c = getChapter(chapter);
  return {
    title: c?.title || "Chapter not found",
    alternates: { canonical: "/about/story/" + chapter },
  };
}
export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const c = getChapter(chapter);
  if (!c) notFound();
  const content = await markdown(c.content);
  const index = chapters.findIndex((x) => x.slug === chapter);
  return (
    <div className="container chapter-page">
      <Reader slug={chapter}>
        <div className="book-spread">
          <aside className="chapter-sidebar">
            <span className="eyebrow">THE STORY SO FAR</span>
            <p>Arnav Goyal</p>
            <nav aria-label="Story chapters">
              {chapters.map((x) => (
                <Link
                  aria-current={x.slug === chapter ? "page" : undefined}
                  key={x.slug}
                  href={"/about/story/" + x.slug}
                >
                  <span>{x.number}</span>
                  {x.title}
                </Link>
              ))}
            </nav>
            <span className="mono fine">{c.minutes} MIN READ</span>
            {index === 0 && (
              <a className="chapter-recordings-link" href="#chapter-recordings">
                Watch the chapter recordings ↗
              </a>
            )}
          </aside>
          <article className="chapter-paper">
            <div
              className="prose story-prose"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {index === 0 && <StoryRecordings />}
            <div className="chapter-end">
              <span className="eyebrow">END OF CHAPTER {c.number}</span>
            </div>
            <nav className="chapter-pagination" aria-label="Chapter pagination">
              {index > 0 ? (
                <Link href={"/about/story/" + chapters[index - 1].slug}>
                  ← Previous chapter
                </Link>
              ) : (
                <Link href="/about/story">← Contents</Link>
              )}
              {index < chapters.length - 1 ? (
                <Link href={"/about/story/" + chapters[index + 1].slug}>
                  Next chapter →
                </Link>
              ) : (
                <Link href="/contact">Start a conversation ↗</Link>
              )}
            </nav>
          </article>
        </div>
      </Reader>
    </div>
  );
}
