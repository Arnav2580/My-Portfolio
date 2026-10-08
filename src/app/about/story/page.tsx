import type { Metadata } from "next";
import Link from "next/link";
import { BookCover } from "@/components/story/book-cover";
import { chapters, getChapter } from "@/lib/content-loader";
import { ResumeReading } from "@/components/story/story-reader";
export const metadata: Metadata = {
  title: "My Story",
  description: "Arnav Goyal's autobiography, in three chapters.",
  alternates: { canonical: "/about/story" },
};
export default function Story() {
  return (
    <div className="container story-landing">
      <Link href="/about" className="text-link">
        ← About Arnav
      </Link>
      <div className="story-opening">
        <div>
          <p className="eyebrow">AN AUTOBIOGRAPHY / ARNAV GOYAL</p>
          <h1>
            The story
            <br />
            <em>so far.</em>
          </h1>
          <p className="serif-lead">
            “The boy who once wanted to reach space has not disappeared. He has
            simply accumulated more questions.”
          </p>
          <p>
            A story of curiosity, uncomfortable lessons, and learning how to
            begin again. Told in my own words.
          </p>
          <ResumeReading />
        </div>
        <BookCover />
      </div>
      <section className="chapter-list">
        <p className="eyebrow">CONTENTS</p>
        {chapters.map((c) => (
          <Link href={"/about/story/" + c.slug} key={c.slug}>
            <span className="chapter-number">{c.number}</span>
            <div>
              <h2>{c.title}</h2>
              <p>{c.description}</p>
            </div>
            <span className="mono">
              {getChapter(c.slug)?.minutes} MIN{" "}
              <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </section>
      <p className="story-note">
        The manuscript is presented in full. The story continues.
      </p>
    </div>
  );
}
