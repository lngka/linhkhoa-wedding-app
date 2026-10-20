// Rasterize the navy/gold L&K badge into PWA icons.
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const ICONS = 'public/icons'
await mkdir(ICONS, { recursive: true })

function badgeSvg(size) {
  const c = size / 2
  const font = size * 0.31
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${c}" cy="${c}" r="${size * 0.47}" fill="#1F2F6B" stroke="#B8894A" stroke-width="${size * 0.047}"/>
    <circle cx="${c}" cy="${c}" r="${size * 0.375}" fill="none" stroke="#B8894A" stroke-width="${size * 0.016}"/>
    <text x="${c}" y="${c + font * 0.36}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${font}" fill="#F7F1E8">L&amp;K</text>
  </svg>`
}

async function writeAny(size, dest) {
  await sharp(Buffer.from(badgeSvg(size))).png().toFile(dest)
}

async function writePadded(size, dest, pad = 0.22) {
  const inner = Math.round(size * (1 - pad * 2))
  const badge = await sharp(Buffer.from(badgeSvg(inner))).png().toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: '#1F2F6B' } })
    .composite([{ input: badge, gravity: 'center' }])
    .png()
    .toFile(dest)
}

await writeAny(192, `${ICONS}/icon-192.png`)
await writeAny(512, `${ICONS}/icon-512.png`)
await writePadded(192, `${ICONS}/icon-maskable-192.png`)
await writePadded(512, `${ICONS}/icon-maskable-512.png`)
await writePadded(180, 'public/apple-touch-icon.png', 0.08)

console.log('icons done')
