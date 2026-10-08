// Code-native concept art, drawn in world coordinates for the traveling camera.
const rocks = new Map<number, HTMLCanvasElement>();
function rockTexture(seed: number) {
  if (rocks.has(seed)) return rocks.get(seed)!;
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 160;
  const c = canvas.getContext("2d")!;
  const image = c.createImageData(160, 160);
  const noise = (x: number, y: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7 + seed * 53.3) * 43758.5453;
    return n - Math.floor(n);
  };
  for (let y = 0; y < 160; y++)
    for (let x = 0; x < 160; x++) {
      const nx = (x - 80) / 70,
        ny = (y - 80) / 70,
        a = Math.atan2(ny, nx);
      const edge =
        0.88 + 0.055 * Math.sin(a * 5 + seed) + 0.04 * Math.sin(a * 9 - seed);
      const d = (nx * nx + ny * ny) / (edge * edge);
      if (d > 1) continue;
      const z = Math.sqrt(1 - d);
      const light =
        0.14 + 0.86 * Math.max(0, -nx * 0.48 - ny * 0.48 + z * 0.66);
      const grain =
        0.72 +
        noise(x, y) * 0.35 +
        Math.sin(x * 0.17 + Math.sin(y * 0.13) * 3) * 0.1;
      const i = (y * 160 + x) * 4;
      image.data[i] = 149 * light * grain;
      image.data[i + 1] = 140 * light * grain;
      image.data[i + 2] = 126 * light * grain;
      image.data[i + 3] = Math.min(255, (1 - d) * 5000);
    }
  c.putImageData(image, 0, 0);
  c.globalCompositeOperation = "source-atop";
  for (let i = 0; i < 18; i++) {
    const x = 30 + noise(i, 8) * 100,
      y = 30 + noise(i, 4) * 100,
      r = 2 + noise(i, 3) * 10;
    const g = c.createRadialGradient(x - r * 0.25, y - r * 0.3, 0, x, y, r);
    g.addColorStop(0, "#12151bb0");
    g.addColorStop(0.72, "#24272a60");
    g.addColorStop(0.9, "#d6c8a94a");
    g.addColorStop(1, "transparent");
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, r, 0, 7);
    c.fill();
  }
  rocks.set(seed, canvas);
  return canvas;
}
export function drawJourney(
  ctx: CanvasRenderingContext2D,
  t: number,
  station?: HTMLImageElement,
  mining?: HTMLImageElement,
  cargo?: HTMLImageElement,
) {
  const panel = (x: number, y: number, w: number, h: number) => {
    ctx.fillStyle = "#163657";
    ctx.strokeStyle = "#74a2be";
    ctx.lineWidth = 0.8;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.strokeStyle = "#6ab5dc66";
    for (let i = 1; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(x + (w * i) / 8, y);
      ctx.lineTo(x + (w * i) / 8, y + h);
      ctx.stroke();
    }
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x, y + (h * i) / 4);
      ctx.lineTo(x + w, y + (h * i) / 4);
      ctx.stroke();
    }
  };
  const probe = (x: number, y: number, angle: number, size = 1) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(size, size);
    panel(-31, -8, 22, 16);
    panel(9, -8, 22, 16);
    const hull = ctx.createLinearGradient(-8, 0, 8, 0);
    hull.addColorStop(0, "#334653");
    hull.addColorStop(0.45, "#c6c9bc");
    hull.addColorStop(1, "#566674");
    ctx.fillStyle = hull;
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(7, -7);
    ctx.lineTo(8, 12);
    ctx.lineTo(-8, 12);
    ctx.lineTo(-7, -7);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#b4c8d0";
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.fillStyle = "#172d3b";
    ctx.fillRect(-3, -9, 6, 5);
    ctx.fillStyle = "#afa38b";
    ctx.fillRect(-5, 0, 10, 7);
    ctx.strokeStyle = "#aab8bc";
    ctx.beginPath();
    ctx.moveTo(-5, 8);
    ctx.lineTo(-12, 18);
    ctx.lineTo(-8, 25);
    ctx.moveTo(5, 8);
    ctx.lineTo(12, 18);
    ctx.lineTo(8, 25);
    ctx.stroke();
    ctx.fillStyle = "#d6efff";
    ctx.fillRect(-4, 12, 3, 3);
    ctx.fillRect(1, 12, 3, 3);
    const plume = ctx.createLinearGradient(0, 14, 0, 27);
    plume.addColorStop(0, "#72cdffb0");
    plume.addColorStop(1, "transparent");
    ctx.fillStyle = plume;
    ctx.fillRect(-5, 15, 10, 10 + Math.sin(t * 5) * 2);
    ctx.restore();
  };
  // Asteroid belt: individually shaded rocks, autonomous extraction probes and cargo.
  for (let i = 0; i < 37; i++) {
    const a = i * 2.399 + t * 0.016,
      r = 65 + (i % 7) * 20,
      x = 1000 + Math.cos(a) * r * 1.45,
      y = Math.sin(a) * r * 0.73;
    const size = 12 + (i % 5) * 6;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(i + t * 0.015);
    ctx.drawImage(rockTexture(i % 9), -size, -size, size * 2, size * 2);
    ctx.restore();
  }
  if (mining?.complete && mining.naturalWidth) {
    ctx.save();
    ctx.translate(1000, -15);
    ctx.rotate(Math.sin(t * 0.12) * 0.015);
    ctx.drawImage(mining, -205, -137, 410, 274);
    // Small rock fragments depart the drill contact; no flames or atmospheric smoke.
    for (let i = 0; i < 16; i++) {
      const p = (t * 0.8 + i / 16) % 1;
      ctx.globalAlpha = (1 - p) * 0.65;
      ctx.fillStyle = "#b9b5a9";
      ctx.fillRect(
        55 + p * (12 + Math.sin(i) * 12),
        -42 - p * (6 + Math.cos(i) * 10),
        0.7 + (i % 2),
        0.7 + (i % 2),
      );
    }
    ctx.restore();
  }
  for (let i = 0; i < 4; i++) {
    const phase = (t * 0.035 + i * 0.25) % 1,
      x = 1090 + phase * 650,
      y = -70 + Math.sin(phase * Math.PI) * 45 + i * 23;
    if (cargo?.complete && cargo.naturalWidth) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.cos(phase * Math.PI) * 0.06);
      ctx.drawImage(cargo, -42, -28, 84, 56);
      ctx.restore();
    } else probe(x, y, Math.PI / 2, 0.7);
  }
  if (station?.complete && station.naturalWidth) {
    ctx.save();
    ctx.translate(1800, 0);
    ctx.rotate(Math.sin(t * 0.08) * 0.018);
    ctx.drawImage(station, -310, -207, 620, 414);
    for (let i = 0; i < 18; i++) {
      const a = (i * 6.28) / 18 + t * (0.1 + i * 0.002);
      probe(Math.cos(a) * 280, Math.sin(a) * 175, a + Math.PI / 2, 0.36);
    }
    ctx.restore();
    return;
  }
  // Human-made circular station: a thick metallic torus with radial spokes.
  ctx.save();
  ctx.translate(1800, 0);
  const glow = ctx.createRadialGradient(0, 0, 30, 0, 0, 280);
  glow.addColorStop(0, "#458c9d30");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(-300, -300, 600, 600);
  ctx.save();
  ctx.rotate(-0.16);
  // Solar power trusses reach well beyond the main station.
  ctx.strokeStyle = "#8795a2";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-320, -70);
  ctx.lineTo(320, -70);
  ctx.stroke();
  for (const sign of [-1, 1])
    for (let i = 0; i < 3; i++)
      panel(sign < 0 ? -355 + i * 43 : 229 + i * 43, -150, 38, 160);
  for (let layer = 18; layer >= 0; layer -= 3) {
    ctx.strokeStyle = layer === 0 ? "#8296a3" : "#253642";
    ctx.lineWidth = 24;
    ctx.beginPath();
    ctx.ellipse(0, layer, 197, 110, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.strokeStyle = "#abc7cd";
  ctx.lineWidth = 1;
  for (const radius of [182, 211]) {
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 0.56, 0, 0, 7);
    ctx.stroke();
  }
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const x = Math.cos(a) * 190,
      y = Math.sin(a) * 106;
    ctx.strokeStyle = "#516a79";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = "#b2cfdb";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Industrial modules on the external rim; green sectors inside it.
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.fillStyle = i % 3 === 0 ? "#598a73" : "#647782";
    ctx.fillRect(-15, -11, 30, 22);
    ctx.strokeStyle = "#b9ced4";
    ctx.strokeRect(-15, -11, 30, 22);
    ctx.fillStyle = "#f4cf8e";
    for (let w = 0; w < 4; w++) ctx.fillRect(-11 + w * 6, 3, 3, 2);
    ctx.restore();
  }
  // Enclosed habitats and ecological gardens, separated from industrial sectors.
  ctx.fillStyle = "#244a42";
  ctx.beginPath();
  ctx.ellipse(0, 5, 108, 63, 0, 0, 7);
  ctx.fill();
  ctx.strokeStyle = "#86b89d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 5, 87, 48, 0, 0, 7);
  ctx.stroke();
  for (let i = 0; i < 24; i++) {
    const a = i * 2.4,
      r = 18 + (i % 5) * 15,
      x = Math.cos(a) * r,
      y = Math.sin(a) * r * 0.48;
    ctx.fillStyle = i % 2 ? "#61997c" : "#39765d";
    ctx.beginPath();
    ctx.arc(x, y, 4 + (i % 3), 0, 7);
    ctx.fill();
  }
  const dome = ctx.createRadialGradient(-12, -20, 1, 0, 0, 66);
  dome.addColorStop(0, "#b9e9f359");
  dome.addColorStop(1, "#245b7c25");
  ctx.fillStyle = dome;
  ctx.beginPath();
  ctx.ellipse(0, -4, 70, 46, 0, 0, 7);
  ctx.fill();
  ctx.strokeStyle = "#acdce177";
  ctx.lineWidth = 1;
  ctx.stroke();
  // Small inhabitants and maintenance robots in the park, visible during close approach.
  for (let i = 0; i < 7; i++) {
    const x = -55 + i * 17,
      y = 18 + Math.sin(t * 0.3 + i) * 8;
    ctx.fillStyle = i % 2 ? "#e5dbc0" : "#80c8d9";
    ctx.beginPath();
    ctx.arc(x, y - 5, 1.7, 0, 7);
    ctx.fill();
    ctx.fillRect(x - 1.2, y - 3, 2.4, 6);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.moveTo(x, y + 2);
    ctx.lineTo(x - 2, y + 6);
    ctx.moveTo(x, y + 2);
    ctx.lineTo(x + 2, y + 6);
    ctx.stroke();
  }
  for (let i = 0; i < 3; i++) {
    const x = -34 + i * 32,
      y = 37;
    ctx.fillStyle = "#d1bc98";
    ctx.fillRect(x, y, 7, 3);
    ctx.fillRect(x + 6, y - 2, 3, 3);
    ctx.fillRect(x, y + 3, 1, 3);
    ctx.fillRect(x + 5, y + 3, 1, 3);
  }
  // Recycling bays and service robotics outside the inhabited park.
  for (let i = 0; i < 4; i++) {
    const x = -50 + i * 34,
      y = -78;
    ctx.fillStyle = "#435761";
    ctx.fillRect(x, y, 24, 15);
    ctx.fillStyle = "#86d6bb";
    ctx.fillRect(x + 3, y + 5, 18, 2);
    ctx.strokeStyle = "#b4cdd1";
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 15 + Math.sin(t + i) * 5, y - 12);
    ctx.lineTo(x + 23, y - 16);
    ctx.stroke();
  }
  ctx.restore();
  for (let i = 0; i < 14; i++) {
    const a = (i * 6.28) / 14 + t * (0.12 + i * 0.002);
    probe(Math.cos(a) * 265, Math.sin(a) * 153, a + Math.PI / 2, 0.38);
  }
  ctx.restore();
}
