"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild;
    if (!track || !first) return;
    let frame = 0;
    let period = first.getBoundingClientRect().width || 1;
    const paint = () => {
      frame = 0;
      const offset = -window.scrollY * 1.5;
      const wrapped = ((offset % period) + period) % period;
      track.style.transform = "translate3d(" + (wrapped - period) + "px, 0, 0)";
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const resize = new ResizeObserver(() => {
      period = first.getBoundingClientRect().width || 1;
      paint();
    });
    resize.observe(first);
    paint();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      el.classList.toggle("offscreen", !entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section className="hero" id="title" ref={ref}>
      <div className="hero-top container">
        <span className="eyebrow">
          <i className="status-dot" /> BENGALURU, INDIA
        </span>
        <span className="mono">CURIOUS BY NATURE. BUILDER BY CHOICE.</span>
      </div>
      <h1 className="sr-only">Arnav Goyal — Building things that matter</h1>
      <div className="hero-visual">
        <div className="hero-grid" aria-hidden="true" />
        <div className="name-marquee" aria-hidden="true">
          <div className="name-track" ref={trackRef}>
            <span>ARNAV GOYAL · </span>
            <span>ARNAV GOYAL · </span>
            <span>ARNAV GOYAL · </span>
          </div>
        </div>
        <div className="portrait-shell">
          <Image
            src="/assets/profile/arnav-goyal-portrait-cutout.png"
            alt="Arnav Goyal"
            width={1337}
            height={1176}
            priority
            sizes="(max-width: 600px) 100vw, 600px"
            className="hero-portrait"
          />
        </div>
        <div className="hero-side left">
          <span className="crosshair">+</span>
          <p>
            A LITTLE CURIOSITY.
            <br />A LOT OF POSSIBILITIES.
          </p>
        </div>
        <div className="hero-side right">
          <span className="tiny-orbit" aria-hidden="true" />
          <p>
            FROM IDEAS ON EARTH
            <br />
            TO A FUTURE BEYOND IT.
          </p>
        </div>
        <div className="hero-signature">
          <Image
            src="/assets/profile/arnav-goyal-signature.png"
            alt="Arnav Goyal's signature"
            width={1774}
            height={887}
            sizes="(max-width: 600px) 145px, 210px"
          />
        </div>
        <span className="hero-caption mono">
          ARNAV GOYAL / A PERSONAL EXPLORATION
        </span>
      </div>
      <div className="hero-bottom container">
        <div>
          <p className="eyebrow">HELLO, I’M ARNAV</p>
          <h2>
            Building things
            <br />
            that <em>matter.</em>
          </h2>
        </div>
        <div className="hero-copy">
          <div className="actions">
            <Link href="/projects" className="button primary">
              Explore my work <span>↗</span>
            </Link>
            <Link href="/about/story" className="text-link">
              Read my story <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
