"use client";
import { useEffect, useRef, useState } from "react";

import { drawJourney } from "@/components/vision/draw-space-journey";
const chapters = [
  {
    label: "Earth",
    title: "One world.",
    subtitle: "Our shared home.",
    detail: "Humanity, nature, and the place we begin.",
  },
  {
    label: "Mining",
    title: "Beyond Earth.",
    subtitle: "Resources for the journey.",
    detail: "Asteroid mining, robotic probes, and cargo routes.",
  },
  {
    label: "Station",
    title: "Built by humanity.",
    subtitle: "Powered beyond Earth.",
    detail: "Orbital industry, solar arrays, and satellite fleets.",
  },
  {
    label: "Habitat",
    title: "Progress, in harmony.",
    subtitle: "Room for life to thrive.",
    detail: "Recycling, robotic operations, and green habitats.",
  },
];
export function CivilizationScene() {
  const [chapter, setChapter] = useState(0);
  const seek = useRef<number | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = canvas.current,
      host = stage.current;
    const ctx = el?.getContext("2d", { alpha: false });
    if (!el || !host || !ctx) return;
    let width = 550,
      height = 650,
      frame = 0,
      visible = false,
      last = 0,
      time = 3,
      previousChapter = 0;
    let mx = 0,
      my = 0,
      px = 0,
      py = 0;
    // Deterministic stars keep the composition stable across visits.
    let seed = 2580;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const stars = Array.from({ length: 210 }, () => ({
      x: random(),
      y: random(),
      z: random(),
      phase: random() * 6.28,
    }));

    const texture = document.createElement("canvas");
    texture.width = 512;
    texture.height = 256;
    const tc = texture.getContext("2d")!;
    tc.fillStyle = "#123b62";
    tc.fillRect(0, 0, 512, 256);
    // A stylized Earth map, projected onto a lit sphere below.
    const continents = [
      [
        [-168, 70],
        [-125, 72],
        [-105, 55],
        [-80, 52],
        [-53, 48],
        [-65, 30],
        [-82, 24],
        [-97, 18],
        [-110, 30],
        [-125, 48],
        [-160, 58],
      ],
      [
        [-81, 12],
        [-62, 10],
        [-35, -6],
        [-43, -24],
        [-65, -55],
        [-75, -37],
        [-78, -5],
      ],
      [
        [-17, 35],
        [10, 37],
        [34, 30],
        [51, 12],
        [40, -14],
        [20, -35],
        [10, -25],
        [-3, 6],
        [-17, 16],
      ],
      [
        [-10, 36],
        [-8, 58],
        [20, 72],
        [60, 70],
        [95, 78],
        [140, 65],
        [175, 60],
        [145, 40],
        [120, 20],
        [106, 0],
        [80, 8],
        [68, 25],
        [40, 30],
        [25, 40],
      ],
      [
        [112, -11],
        [135, -10],
        [154, -23],
        [146, -39],
        [115, -34],
      ],
      [
        [-55, 60],
        [-25, 72],
        [-40, 83],
        [-65, 78],
      ],
    ];
    for (const polygon of continents) {
      tc.beginPath();
      polygon.forEach(([lon, lat], i) => {
        const x = ((lon + 180) / 360) * 512,
          y = ((90 - lat) / 180) * 256;
        if (i) tc.lineTo(x, y);
        else tc.moveTo(x, y);
      });
      tc.closePath();
      tc.fillStyle = "#648c7e";
      tc.fill();
    }
    for (let i = 0; i < 170; i++) {
      tc.fillStyle = `rgba(211,235,236,${random() * 0.35})`;
      tc.beginPath();
      tc.ellipse(
        random() * 512,
        random() * 256,
        8 + random() * 25,
        1 + random() * 3,
        -0.2,
        0,
        Math.PI * 2,
      );
      tc.fill();
    }
    let map = tc.getImageData(0, 0, 512, 256).data;
    let mapWidth = 512,
      mapHeight = 256;
    let night: Uint8ClampedArray | null = null;
    let disposed = false;
    const miningImage = new Image();
    const cargoImage = new Image();
    miningImage.onload = () => {
      if (!disposed) host.dataset.miningTexture = "ready";
    };
    cargoImage.onload = () => {
      if (!disposed) host.dataset.cargoTexture = "ready";
    };
    miningImage.src = "/assets/vision/asteroid-mining.png";
    cargoImage.src = "/assets/vision/ore-transporter.png";
    const stationImage = new Image();
    stationImage.onload = () => {
      if (!disposed) host.dataset.stationTexture = "ready";
    };
    stationImage.src = "/assets/vision/orbital-station.png";
    const dayImage = new Image();
    const nightImage = new Image();
    const loadPixels = (image: HTMLImageElement) => {
      const surface = document.createElement("canvas");
      surface.width = 2048;
      surface.height = 1024;
      const context = surface.getContext("2d")!;
      context.drawImage(image, 0, 0, 2048, 1024);
      return context.getImageData(0, 0, 2048, 1024).data;
    };
    dayImage.onload = () => {
      if (disposed) return;
      map = loadPixels(dayImage);
      mapWidth = 2048;
      mapHeight = 1024;
      host.dataset.earthTexture = "ready";
    };
    nightImage.onload = () => {
      if (!disposed) night = loadPixels(nightImage);
    };
    dayImage.src = "/assets/vision/earth-day.jpg";
    nightImage.src = "/assets/vision/earth-night.png";
    const globe = document.createElement("canvas");
    globe.width = 384;
    globe.height = 384;
    const gc = globe.getContext("2d")!;
    const pixels = gc.createImageData(384, 384);
    const samples: {
      i: number;
      u: number;
      v: number;
      light: number;
      rim: number;
      shine: number;
    }[] = [];
    for (let y = 0; y < 384; y++)
      for (let x = 0; x < 384; x++) {
        const nx = (x - 192) / 190,
          ny = (192 - y) / 190,
          d = nx * nx + ny * ny;
        if (d > 1) continue;
        const nz = Math.sqrt(1 - d);
        samples.push({
          i: (y * 384 + x) * 4,
          u: Math.atan2(nx, nz) / (Math.PI * 2) + 0.5,
          v: 0.5 - Math.asin(ny) / Math.PI,
          light: 0.09 + 0.91 * Math.max(0, nx * 0.45 + ny * 0.3 + nz * 0.65),
          rim: Math.pow(1 - nz, 4),
          shine: Math.pow(Math.max(0, nx * 0.25 + ny * 0.16 + nz * 0.955), 48),
        });
      }
    const drawGlobe = (t: number) => {
      for (const s of samples) {
        const u = (((s.u + t * 0.009) % 1) + 1) % 1;
        const idx =
          (Math.min(mapHeight - 1, Math.floor(s.v * mapHeight)) * mapWidth +
            Math.floor(u * mapWidth)) *
          4;
        const ni =
          (Math.min(1023, Math.floor(s.v * 1024)) * 2048 +
            Math.floor(u * 2048)) *
          4;
        const darkness = Math.max(0, 1 - s.light * 3.8);
        const ocean =
          map[idx + 2] > map[idx] * 1.3 && map[idx + 2] > map[idx + 1] * 1.1;
        const shine = ocean ? s.shine * 32 : 0;
        pixels.data[s.i] =
          map[idx] * s.light +
          s.rim * 16 +
          shine +
          (night ? night[ni] * darkness * 1.6 : 0);
        pixels.data[s.i + 1] =
          map[idx + 1] * s.light +
          s.rim * 67 +
          shine +
          (night ? night[ni + 1] * darkness * 1.35 : 0);
        pixels.data[s.i + 2] =
          map[idx + 2] * s.light +
          s.rim * 125 +
          shine +
          (night ? night[ni + 2] * darkness : 0);
        pixels.data[s.i + 3] = 255;
      }
      gc.putImageData(pixels, 0, 0);
    };
    const glow = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };
    const render = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (now - last < 32) {
        frame = requestAnimationFrame(render);
        return;
      }
      time += Math.min((now - last) / 1000, 0.05);
      last = now;
      px += (mx - px) * 0.05;
      py += (my - py) * 0.05;
      const rect = host.getBoundingClientRect();
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (innerHeight * 0.5 - rect.top - rect.height * 0.5) / innerHeight,
        ),
      );
      ctx.fillStyle = "#050b18";
      ctx.fillRect(0, 0, width, height);
      glow(width * 0.2, height * 0.7, width * 0.7, "#15355765");
      glow(width * 0.8, height * 0.25, width * 0.65, "#53351b50");
      for (const s of stars) {
        const x =
            (((s.x * width + px * s.z * 13 + time * s.z * 1.3) % width) +
              width) %
            width,
          y = s.y * height + py * s.z * 12;
        ctx.fillStyle = `rgba(211,227,255,${0.2 + s.z * 0.5 + Math.sin(time * 0.7 + s.phase) * 0.1})`;
        ctx.beginPath();
        ctx.arc(x, y, 0.35 + s.z * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      if (seek.current !== null) {
        time = seek.current * 9 + 3;
        seek.current = null;
      }
      const step = Math.floor(time / 9) % 4,
        local = time % 9;
      if (step !== previousChapter) {
        previousChapter = step;
        setChapter(step);
      }
      host.dataset.journeyStage = String(step);
      const smooth = Math.min(1, local / 3);
      const blend = smooth * smooth * (3 - 2 * smooth);
      const positions = [200, 1000, 1800, 1800],
        zooms = [1, 1, 1, 1.8];
      const previous = (step + 3) % 4;
      const camera =
        positions[previous] + (positions[step] - positions[previous]) * blend;
      const zoom = zooms[previous] + (zooms[step] - zooms[previous]) * blend;
      const scale = (width / 620) * zoom;
      ctx.save();
      ctx.translate(
        width * 0.5 + px * 9,
        height * 0.46 + py * 7 - progress * 10,
      );
      ctx.scale(scale, scale);
      ctx.translate(-camera, 0);
      ctx.strokeStyle = "#8cacbf25";
      ctx.setLineDash([3, 12]);
      ctx.beginPath();
      ctx.moveTo(200, 0);
      ctx.bezierCurveTo(700, -170, 1100, 140, 1800, 0);
      ctx.stroke();
      ctx.setLineDash([]);
      for (let i = 0; i < 8; i++) {
        const x = 250 + ((time * 24 + i * 205) % 1450);
        glow(
          x,
          Math.sin(((x - 200) / 1600) * Math.PI * 2) * 35,
          7,
          "#addcff80",
        );
      }
      if (camera < 650) {
        glow(200, 0, 175, "#4385b838");
        drawGlobe(time);
        ctx.drawImage(globe, 45, -155, 310, 310);
        ctx.strokeStyle = "#73c5ee65";
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.arc(200, 0, 153, Math.PI * 1.02, Math.PI * 1.9);
        ctx.stroke();
      }
      drawJourney(ctx, time, stationImage, miningImage, cargoImage);
      ctx.restore();
      frame = requestAnimationFrame(render);
    };
    const resize = new ResizeObserver(() => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.75);
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    resize.observe(host);
    const start = () => {
      if (visible && !document.hidden && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "80px" },
    );
    observer.observe(host);
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      mx = (event.clientX - r.left) / r.width - 0.5;
      my = (event.clientY - r.top) / r.height - 0.5;
    };
    const reset = () => {
      mx = 0;
      my = 0;
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      start();
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      miningImage.onload = null;
      cargoImage.onload = null;
      stationImage.onload = null;
      dayImage.onload = null;
      nightImage.onload = null;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <figure ref={stage} className="stellar-vision">
      <canvas
        ref={canvas}
        role="img"
        aria-label="A journey from Earth to robotic asteroid mining, a circular solar-powered industrial station, and green habitats for humans and animals."
      />
      <div className="stellar-top mono">
        <span>THE LONGER HORIZON</span>
        <span>II</span>
      </div>
      <figcaption>
        <span className="mono">
          {String(chapter + 1).padStart(2, "0")} /{" "}
          {chapters[chapter].label.toUpperCase()}
        </span>
        <strong>
          {chapters[chapter].title}
          <br />
          <em>{chapters[chapter].subtitle}</em>
        </strong>
        <span className="journey-detail">{chapters[chapter].detail}</span>
      </figcaption>
      <div
        className="journey-controls"
        role="group"
        aria-label="Explore the space journey"
      >
        {chapters.map((item, i) => (
          <button
            type="button"
            key={item.label}
            aria-pressed={chapter === i}
            onClick={() => {
              seek.current = i;
              setChapter(i);
            }}
          >
            <span className="journey-progress" aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>
    </figure>
  );
}
