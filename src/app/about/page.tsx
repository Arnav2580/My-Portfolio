import { ExpandableParagraph } from "@/components/ui/expandable-paragraph";
import { visionDetails, interests } from "@/content/data/vision";
import { CivilizationScene } from "@/components/vision/civilization-scene";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookCover } from "@/components/story/book-cover";
import { ContactInvite } from "@/components/contact/contact-invite";
export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <div className="container">
        <section className="about-intro" aria-label="About Arnav">
          <div className="about-photo">
            <Image
              src="/assets/profile/arnav-goyal-portrait.png"
              alt="Arnav Goyal"
              width={1086}
              height={955}
              sizes="(max-width: 800px) 90vw, 460px"
              priority
            />
          </div>
          <div className="prose about-description">
            <header className="about-heading">
              <p className="eyebrow">ABOUT ME</p>
              <h1>Hi, I am Arnav,</h1>
            </header>
            <p>
              Incredibly passionate about building practical solutions at the
              intersection of healthtech, artificial intelligence, and
              blockchain that can improve real lives at scale.
            </p>
            <p>
              My underlying motivation has always been a deep commitment to
              solving problems that actually matter, rather than creating things
              that merely look impressive. This drive has taken me from early
              experiments in aerospace research and community building to
              currently developing appointment-less healthcare systems and
              real-estate tokenization infrastructure, always guided by the
              pursuit of long-term, meaningful impact.
            </p>
            <p>
              I value relentless curiosity, continuous self-learning, and quiet
              discipline. I strive to stay open to learning from the people and
              systems around me while putting in consistent work with the right
              mindset. I believe in improving a little every day and approaching
              every challenge as an observer first.
            </p>
            <p>
              Beyond my professional work, I have a strong interest in immersing
              myself in different cultures through backpacking, maintaining
              strict personal discipline around health and fitness, and engaging
              in continuous introspection and philosophical learning.
            </p>
            <div className="about-signature">
              <Image
                src="/assets/profile/arnav-goyal-signature.png"
                alt="Arnav Goyal's signature"
                width={1774}
                height={887}
                sizes="240px"
              />
              <span className="mono">ARNAV GOYAL</span>
            </div>
          </div>
        </section>
        <section className="story-feature about-story">
          <div>
            <span className="eyebrow">MY STORY / IN THREE CHAPTERS</span>
            <h2>
              The less linear
              <br />
              <em>version.</em>
            </h2>
            <p>
              Behind the titles and projects are setbacks, unlikely
              opportunities, and a lot of starting again. I wrote them down.
            </p>
            <Link className="button primary" href="/about/story">
              Read my story ↗
            </Link>
          </div>
          <Link
            href="/about/story"
            className="book-link"
            aria-label="Read the autobiography"
          >
            <BookCover />
          </Link>
        </section>
        <section className="vision-manifesto section" id="vision">
          <div className="vision-heading-scene">
            <span className="eyebrow">THE GOAL THAT CONNECTS MY WORK</span>
            <h2>
              One world.
              <br />
              <em>A Type II civilization.</em>
            </h2>
            <CivilizationScene />
          </div>
          <div className="vision-manifesto-copy">
            {visionDetails.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="section" aria-labelledby="interests-heading">
          <span className="eyebrow">
            WORK / EXPLORATION / PERSONAL INTERESTS
          </span>
          <h2 id="interests-heading">The questions I keep returning to.</h2>
          <p className="interests-intro">
            Some of these fields are part of my current work. Others are areas I
            am studying, exploring, or working toward.
          </p>
          <div className="interest-grid">
            {interests.map(([title, description], index) => (
              <div key={title}>
                <span className="mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          className="about-beyond section"
          id="beyond-the-work"
          aria-labelledby="beyond-title"
        >
          <div className="beyond-intro">
            <span className="eyebrow">BEYOND THE WORK</span>
            <h2 id="beyond-title">
              Curiosity.
              <br />
              Discipline.
              <br />
              <em>Perspective.</em>
            </h2>
            <blockquote className="beyond-principle">
              <p>“Discipline = Consistency + Hard Work.”</p>
              <cite>Arnav Goyal</cite>
            </blockquote>
          </div>
          <div className="beyond-prose">
            <ExpandableParagraph topic="health and fitness">
              Winning a HYROX race, completing a full Ironman, and building the
              most muscular physique my body can achieve are ambitions I work
              toward every time I step into the gym. Strength and conditioning
              are always my focus. I love working out, and training has been a
              consistent part of my life for the past two to three years. My
              journey has looked like a sine wave: I lose fat, build muscle,
              gain some fat along the way, get heavier, and work through another
              cut. Through every rise and dip, I keep showing up. “0.1% better
              every day” is the commitment I carry into that work. Looking back
              at myself ten years ago, I can see a huge difference, and so can
              the people around me. The progress has never been a straight line,
              but the effort continues. That is why the word that represents me
              is relentless.
            </ExpandableParagraph>
            <ExpandableParagraph topic="philosophy and psychology">
              Philosophy and psychology give me ways to examine both my inner
              life and my relationships with others. I am drawn to questions
              about identity, awareness, purpose, and the influences behind our
              decisions. Reading and introspection help me ask where my beliefs
              come from, why I react in certain ways, and whether my ambitions
              reflect what I actually value. Psychology extends that curiosity
              to habits, motivation, and the different ways people interpret the
              same experience. I try to approach situations as an observer
              first: listen carefully, notice my assumptions, and leave room to
              change my mind. This is a continuing practice that shapes how I
              want to learn, work with people, and make decisions.
            </ExpandableParagraph>
            <ExpandableParagraph topic="backpacking and cultures">
              Backpacking and exploring different cultures appeal to my desire
              to understand life beyond my own surroundings. I want to spend
              time with unfamiliar ways of living: everyday routines, local
              traditions, conversations, and the relationship people have with
              the places they call home. I am interested in what changes from
              one community to another and what people share despite those
              differences. Travelling with curiosity means being willing to
              listen, adapt, and question what I have taken for granted. I want
              to bring that broader perspective into my life and work,
              especially when thinking about problems experienced by people
              whose circumstances are different from mine.
            </ExpandableParagraph>
          </div>
        </section>
      </div>
      <ContactInvite />
    </>
  );
}
