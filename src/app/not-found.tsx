import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 / UNCHARTED TERRITORY</p>
      <h1>
        A little off
        <br />
        <em>the map.</em>
      </h1>
      <p>This page doesn’t exist. There is plenty to explore back home.</p>
      <Link className="button primary" href="/">
        Back to familiar ground ↗
      </Link>
    </div>
  );
}
