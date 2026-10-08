import { visionSummary } from "@/content/data/vision";
import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/portrait-hero";
import { CivilizationScene } from "@/components/vision/civilization-scene";
import { ExperienceList } from "@/components/experience/experience-list";
import { FeaturedSpeech } from "@/components/honors/featured-speech";
import { HonorsStack } from "@/components/honors/honors-stack";
import { BookCover } from "@/components/story/book-cover";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactInvite } from "@/components/contact/contact-invite";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <Hero />
      <section className="story-feature container">
        <div>
          <span className="eyebrow">01 / THE PERSON BEHIND THE PROJECTS</span>
          <h2>
            Every beginning
            <br />
            has a <em>before.</em>
          </h2>
          <p className="serif-lead">
            An old laptop. A fascination with space. A science competition where
            I came last.
          </p>
          <p>
            My story is still being written. These are the chapters that brought
            me here — the things that worked, the things that didn’t, and what
            stayed with me.
          </p>
          <Link href="/about/story" className="button">
            Open my story <span>↗</span>
          </Link>
          <span className="mono fine story-meta">
            3 CHAPTERS · AN UNFINISHED JOURNEY
          </span>
        </div>
        <Link
          href="/about/story"
          className="book-link"
          aria-label="Open Arnav's autobiography"
        >
          <BookCover />
        </Link>
      </section>
      <section className="home-experience container section">
        <SectionHeading
          number="02"
          title="What’s on my desk."
          href="/experience"
          label="The full journey"
        />
        <ExperienceList />
      </section>
      <section className="container section" id="honors">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / HONORS AND AWARDS</span>
            <h2>Honors &amp; awards.</h2>
          </div>
          <Link className="text-link" href="/honors">
            All honors <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <FeaturedSpeech compact />
        <HonorsStack />
      </section>
      <section className="container section project-invite" id="project">
        <SectionHeading
          number="04"
          title="Ideas, made tangible."
          href="/projects"
          label="Explore all projects"
        />
        <p className="section-description">
          Experiments in intelligence, trust, and the systems around us.
        </p>
      </section>

      <section className="vision-section container">
        <CivilizationScene />
        <div className="vision-copy">
          <span className="eyebrow">05 / THE LONGER HORIZON</span>
          <h2>
            One world.
            <br />
            <em>A Type II civilization.</em>
          </h2>
          {visionSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="text-link" href="/about#vision">
            The direction I’m working toward ↗
          </Link>
        </div>
      </section>
      <ContactInvite />
    </>
  );
}
