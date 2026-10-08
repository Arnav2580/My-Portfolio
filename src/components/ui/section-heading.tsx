import Link from "next/link";
import { Arrow } from "./arrow";
export function SectionHeading({
  number,
  title,
  href,
  label,
}: {
  number: string;
  title: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{number} / EXPLORE</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label || "Explore"} <Arrow />
        </Link>
      )}
    </div>
  );
}
