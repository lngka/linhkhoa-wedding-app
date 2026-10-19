import type { ReactNode, SVGProps } from 'react'
import type { ProgramIcon } from '../content'

type P = SVGProps<SVGSVGElement>

const HEART = 'M0 3.2C-1.6 0.6-5.6 1-5.6 4.2c0 2.6 3.2 4.6 5.6 6.8 2.4-2.2 5.6-4.2 5.6-6.8C5.6 1 1.6 0.6 0 3.2Z'

export function Heart(props: P) {
  return (
    <svg viewBox="-7 0 14 12" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path d={HEART} />
    </svg>
  )
}

/** Thin gold line — heart — line, as on the printed card. */
export function HeartDivider({ className = '', width = 180 }: { className?: string; width?: number }) {
  return (
    <svg viewBox="0 0 180 14" width={width} className={`mx-auto text-gold ${className}`} fill="none" stroke="currentColor">
      <path d="M8 7H76M104 7H172" strokeWidth={0.8} />
      <circle cx="80" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="100" cy="7" r="1" fill="currentColor" stroke="none" />
      <path d={HEART} transform="translate(90 1)" strokeWidth={1} />
    </svg>
  )
}

/** Fine gold leaf branch like the corners of the invitation card. */
export function Sprig({ className = '', ...props }: P) {
  const leaves = [
    [30, 150, -40], [44, 128, 30], [46, 112, -50], [62, 92, 25], [62, 74, -55], [80, 56, 20], [82, 40, -60], [98, 24, 10],
  ]
  return (
    <svg viewBox="0 0 130 180" fill="none" stroke="currentColor" strokeWidth={0.9} className={`text-gold ${className}`} {...props}>
      <path d="M8 178C30 140 50 100 70 70S104 20 118 6" />
      {leaves.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0C6 -6 18 -6 24 0C18 6 6 6 0 0Z" />
          <path d="M0 0H22" strokeWidth={0.5} />
        </g>
      ))}
      <circle cx="120" cy="4" r="1.6" fill="currentColor" />
      <circle cx="108" cy="46" r="1.2" fill="currentColor" />
    </svg>
  )
}

// Great Vibes ink sits right of and above its advance box; measured offsets that optically centre "K&L".
const MONO_DX = -5
const MONO_DY = 5

/** Wax-seal style monogram for the gate. */
export function Seal({ left, right, className = '' }: { left: string; right: string; className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5)
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <radialGradient id="seal-glass" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="0.55" stopColor="#f2e6cf" />
          <stop offset="1" stopColor="#d9c39a" />
        </radialGradient>
        <linearGradient id="seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dfae" />
          <stop offset="0.45" stopColor="#b8894a" />
          <stop offset="1" stopColor="#7d5726" />
        </linearGradient>
      </defs>
      {petals.map((a) => (
        <ellipse key={a} cx="100" cy="22" rx="15" ry="22" transform={`rotate(${a} 100 100)`} fill="#1f2f6b" stroke="url(#seal-gold)" strokeWidth="2.5" />
      ))}
      {petals.map((a) => (
        <ellipse key={`a${a}`} cx="100" cy="34" rx="8" ry="12" transform={`rotate(${a + 11.25} 100 100)`} fill="#a9d3d0" stroke="url(#seal-gold)" strokeWidth="1.5" />
      ))}
      <circle cx="100" cy="100" r="60" fill="url(#seal-glass)" stroke="url(#seal-gold)" strokeWidth="5" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="#b8894a" strokeWidth="1" />
      <text x={100 + MONO_DX} y={100 + MONO_DY} textAnchor="middle" dominantBaseline="central" fontFamily="Great Vibes, cursive" fontSize="44" fill="#1f2f6b">
        {left}
        <tspan fill="#b8894a" fontSize="32">&amp;</tspan>
        {right}
      </text>
    </svg>
  )
}

/** Gold hourglass with sand that drains and flips. */
export function Hourglass({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" className={className} fill="none">
      <defs>
        <clipPath id="hg-top"><path d="M20 18H60C60 40 44 50 41 60H39C36 50 20 40 20 18Z" /></clipPath>
        <clipPath id="hg-bot"><path d="M39 60H41C44 70 60 80 60 102H20C20 80 36 70 39 60Z" /></clipPath>
      </defs>
      <g className="hg-spin" style={{ transformOrigin: '40px 60px' }}>
        <g clipPath="url(#hg-top)">
          <rect className="hg-sand-top" x="18" y="18" width="44" height="42" fill="#d9b779" />
        </g>
        <g clipPath="url(#hg-bot)">
          <rect className="hg-sand-bot" x="18" y="60" width="44" height="42" fill="#d9b779" />
        </g>
        <line className="hg-stream" x1="40" y1="58" x2="40" y2="100" stroke="#d9b779" strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M20 18H60C60 40 44 50 41 60C44 70 60 80 60 102H20C20 80 36 70 39 60C36 50 20 40 20 18Z" stroke="#b8894a" strokeWidth="1.6" fill="rgb(169 211 208 / 0.18)" />
        <path d="M12 12H68M12 108H68" stroke="#b8894a" strokeWidth="3" strokeLinecap="round" />
        <path d="M16 12V108M64 12V108" stroke="#b8894a" strokeWidth="1.4" />
        <circle cx="16" cy="60" r="2.2" fill="#b8894a" />
        <circle cx="64" cy="60" r="2.2" fill="#b8894a" />
      </g>
    </svg>
  )
}

const ICONS: Record<ProgramIcon | 'map' | 'calendar' | 'gift' | 'car' | 'hotel' | 'shirt' | 'speaker' | 'speaker-low' | 'speaker-off', ReactNode> = {
  welcome: (
    <>
      <path d="M5 11h22v15H5z" />
      <path d="M5 11l11 8 11-8" />
      <path d="M16 6.5c-1-1.6-3.6-1.3-3.6.8 0 1.6 2 2.8 3.6 4.2 1.6-1.4 3.6-2.6 3.6-4.2 0-2.1-2.6-2.4-3.6-.8z" />
    </>
  ),
  rings: (
    <>
      <circle cx="12" cy="19" r="7" />
      <circle cx="20" cy="19" r="7" />
      <path d="M10 9l2-3 2 3-2 2.5z" />
    </>
  ),
  dinner: (
    <>
      <circle cx="16" cy="18" r="8" />
      <circle cx="16" cy="18" r="5" />
      <path d="M4 8v6a2 2 0 0 0 2 2v10M6 8v5M8 8v6a2 2 0 0 1-2 2M28 8c-2 1-3 4-3 7h3v11" />
    </>
  ),
  music: (
    <>
      <path d="M12 23V8l14-3v15" />
      <circle cx="9" cy="23" r="3" />
      <circle cx="23" cy="20" r="3" />
    </>
  ),
  map: (
    <>
      <path d="M16 28s-8-8-8-14a8 8 0 0 1 16 0c0 6-8 14-8 14z" />
      <circle cx="16" cy="14" r="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="5" y="7" width="22" height="20" rx="2" />
      <path d="M5 13h22M11 4v6M21 4v6" />
      <path d="M16 18c-.8-1.2-2.8-1-2.8.6 0 1.2 1.6 2.2 2.8 3.2 1.2-1 2.8-2 2.8-3.2 0-1.6-2-1.8-2.8-.6z" />
    </>
  ),
  gift: (
    <>
      <rect x="5" y="12" width="22" height="6" />
      <path d="M7 18v9h18v-9M16 12v15" />
      <path d="M16 12c-2-4-7-6-7-2.5S14 12 16 12c2 0 7-.5 7-2.5S18 8 16 12z" />
    </>
  ),
  car: (
    <>
      <path d="M5 20l2.5-7h17l2.5 7v5H5z" />
      <circle cx="10" cy="25" r="2.5" />
      <circle cx="22" cy="25" r="2.5" />
      <path d="M5 20h22" />
    </>
  ),
  hotel: (
    <>
      <path d="M6 27V9h20v18M4 27h24M13 27v-5h6v5" />
      <path d="M10 13h3M19 13h3M10 18h3M19 18h3" />
      <path d="M16 4l-2 3h4z" />
    </>
  ),
  shirt: (
    <>
      <path d="M11 5l5 4 5-4 7 4-3 6-3-1.5V27H10V13.5L7 15 4 9z" />
      <path d="M16 9v5" />
    </>
  ),
  speaker: (
    <>
      <path d="M6 12.5h4.2L17 6.5v19l-6.8-6H6z" />
      <path d="M21 12.2c1.7 1.2 1.7 6.4 0 7.6" />
      <path d="M24.2 9c3 2.3 3 11.7 0 14" />
    </>
  ),
  'speaker-low': (
    <>
      <path d="M6 12.5h4.2L17 6.5v19l-6.8-6H6z" />
      <path d="M21 12.2c1.7 1.2 1.7 6.4 0 7.6" />
    </>
  ),
  'speaker-off': (
    <>
      <path d="M6 12.5h4.2L17 6.5v19l-6.8-6H6z" />
      <path d="M21 13l7 7M28 13l-7 7" />
    </>
  ),
}

export function Icon({ name, className = '', ...props }: { name: keyof typeof ICONS } & P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {ICONS[name]}
    </svg>
  )
}

/** Section heading: script title, optional small-caps subtitle, heart divider. */
export function Heading({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center">
      <h2 data-reveal="blur" className={`script text-[52px] text-balance ${light ? 'text-cream' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p data-reveal="fade" data-delay="0.15" className={`eyebrow mt-1 text-balance ${light ? 'text-gold-light' : 'text-gold'}`}>
          {subtitle}
        </p>
      )}
      <div data-reveal="fade" data-delay="0.25" className="mt-4">
        <HeartDivider />
      </div>
    </div>
  )
}
