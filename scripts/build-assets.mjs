// Converts the AI-generated art in /art into optimized WebP files in /public/assets.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'art'
const OUT = 'public/assets'
await mkdir(OUT, { recursive: true })

const webp = (img, name, q = 82) => img.webp({ quality: q, effort: 6 }).toFile(`${OUT}/${name}.webp`)

// Doors: split into two leaves at the central seam.
{
  const { width, height } = await sharp(`${SRC}/doors.jpg`).metadata()
  const half = Math.round(width / 2)
  await webp(sharp(`${SRC}/doors.jpg`).extract({ left: 0, top: 0, width: half, height }), 'door-left')
  await webp(sharp(`${SRC}/doors.jpg`).extract({ left: half, top: 0, width: width - half, height }), 'door-right')
}

// Arch: keep only the arch silhouette.
{
  const { width, height } = await sharp(`${SRC}/arch.jpg`).metadata()
  const l = 24, r = width - 24, top = 20, bottom = height - 28
  const rad = (r - l) / 2
  const cy = top + rad
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <path d="M${l},${bottom} L${l},${cy} A${rad},${rad} 0 0 1 ${r},${cy} L${r},${bottom} Z" fill="#fff"/>
    </svg>`,
  )
  await webp(
    sharp(`${SRC}/arch.jpg`).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]),
    'arch',
  )
}

// Flood fill from the image edges (and optionally from the center) and make the filled area transparent.
async function keyOut(file, name, isBg, q = 82, isHole = null) {
  const { data, info } = await sharp(`${SRC}/${file}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const bg = new Uint8Array(w * h)
  const fill = (seeds, pred) => {
    const stack = [...seeds]
    while (stack.length) {
      const i = stack.pop()
      if (bg[i] || !pred(data[i * 4], data[i * 4 + 1], data[i * 4 + 2])) continue
      bg[i] = 1
      const x = i % w
      if (x > 0) stack.push(i - 1)
      if (x < w - 1) stack.push(i + 1)
      if (i >= w) stack.push(i - w)
      if (i < w * (h - 1)) stack.push(i + w)
    }
  }
  const edges = []
  for (let x = 0; x < w; x++) edges.push(x, (h - 1) * w + x)
  for (let y = 0; y < h; y++) edges.push(y * w, y * w + w - 1)
  fill(edges, isBg)
  if (isHole) fill([Math.floor(h / 2) * w + Math.floor(w / 2)], isHole)
  // Soft edge: alpha = share of non-background pixels in a 5x5 window.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let n = 0, c = 0
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const xx = x + dx, yy = y + dy
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue
          n++
          if (!bg[yy * w + xx]) c++
        }
      }
      data[(y * w + x) * 4 + 3] = Math.round((255 * c) / n)
    }
  }
  await webp(sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim(), name, q)
}

await keyOut(
  'oval.jpg',
  'oval',
  (r, g, b) => r < 48 && b > r + 12 && g < 80,
  82,
  (r, g, b) => r > 195 && g > 190 && b > 160 && r - b < 70,
)
await keyOut('bay.jpg', 'bay', (r, g, b) => Math.abs(r - 253) + Math.abs(g - 247) + Math.abs(b - 232) < 34)

await webp(sharp(`${SRC}/venue.jpg`), 'venue')
await webp(sharp(`${SRC}/couple.jpg`).resize({ width: 640 }), 'couple', 80)

// Open Graph preview: bay panel on cream, 1200x630.
{
  const bay = await sharp(`${OUT}/bay.webp`).resize({ height: 560 }).png().toBuffer()
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#F7F1E8' } })
    .composite([{ input: bay, gravity: 'center' }])
    .jpeg({ quality: 85 })
    .toFile(`${OUT}/og.jpg`)
}

console.log('assets done')
