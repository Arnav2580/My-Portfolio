import Link from "next/link";
export function ContactInvite() {
  return (
    <section className="contact-invite container">
      <span className="eyebrow">THE NEXT CONVERSATION</span>
      <div>
        <h2>
          Interesting things begin
          <br />
          with a <em>conversation.</em>
        </h2>
        <Link href="/contact" className="round-link" aria-label="Get in touch">
          ↗
        </Link>
      </div>
      <p>
        Ideas, questions, or a different way of seeing the world. I’m listening.
      </p>
    </section>
  );
}
