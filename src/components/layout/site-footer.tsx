import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link href="/" className="brand">
          ag<span>.</span>
        </Link>
        <p className="small">Curiosity is the through line.</p>
      </div>
      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/arnav2580/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
        <a href="https://github.com/Arnav2580" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href="https://x.com/ArnavGoyal_X" target="_blank" rel="noreferrer">
          X ↗
        </a>
      </div>
      <p className="mono fine">© {new Date().getFullYear()} Arnav Goyal</p>
    </footer>
  );
}
