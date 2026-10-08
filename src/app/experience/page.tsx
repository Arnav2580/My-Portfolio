import type { Metadata } from "next";
import { ExperienceList } from "@/components/experience/experience-list";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactInvite } from "@/components/contact/contact-invite";
export const metadata: Metadata = {
  title: "Experience",
  alternates: { canonical: "/experience" },
};
export default function Experience() {
  return (
    <>
      <div className="container">
        <PageIntro
          eyebrow="BUILDING / LEARNING / STARTING AGAIN"
          title="A path of my own."
          description="Companies, communities, and experiences that have shaped the way I build."
        />
        <section aria-label="Professional experience">
          <ExperienceList full />
        </section>
      </div>
      <ContactInvite />
    </>
  );
}
