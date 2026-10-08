import type { Metadata } from "next";
import { FeaturedSpeech } from "@/components/honors/featured-speech";
import { HonorsFeed } from "@/components/honors/honors-feed";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactInvite } from "@/components/contact/contact-invite";
export const metadata: Metadata = {
  title: "Honors",
  alternates: { canonical: "/honors" },
};
export default function Honors() {
  return (
    <>
      <div className="container honors-page">
        <PageIntro
          eyebrow="HONORS / AWARDS / MILESTONES"
          title="Honors and awards."
          description="The competitions, conversations, and shared achievements that have shaped my journey. One moment at a time."
        />
        <FeaturedSpeech />
        <HonorsFeed />
      </div>
      <ContactInvite />
    </>
  );
}
