import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactInvite } from "@/components/contact/contact-invite";
import { ProjectGrid } from "@/components/projects/project-grid";
export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};
export default function Projects() {
  return (
    <>
      <div className="container">
        <PageIntro
          eyebrow="EXPERIMENTS / SYSTEMS / THINGS MADE"
          title="Ideas, made tangible."
          description="A collection of work across intelligence, infrastructure, and trust. Each project is a different way of asking: what if?"
        />
        <ProjectGrid />
      </div>
      <ContactInvite />
    </>
  );
}
