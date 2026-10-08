import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactForm } from "@/components/contact/contact-form";
export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <div className="container contact-page">
      <PageIntro
        eyebrow="THE NEXT CONVERSATION"
        title="Let’s make a connection."
        description="An idea worth exploring. A question worth asking. Or simply a hello. There’s always room for a thoughtful conversation."
      />
      <div className="contact-layout">
        <div className="contact-info">
          <span className="eyebrow">FIND ME HERE</span>
          <h2>My inbox is open.</h2>
          <a className="email-link" href="mailto:arnavgoyal.work@gmail.com">
            arnavgoyal.work@gmail.com ↗
          </a>
          <p>
            I’m based in Bengaluru, India, and interested in conversations from
            anywhere.
          </p>
          <div className="footer-links">
            <a
              href="https://www.linkedin.com/in/arnav2580/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Arnav2580"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://x.com/ArnavGoyal_X"
              target="_blank"
              rel="noreferrer"
            >
              X ↗
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
