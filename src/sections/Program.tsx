import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { content } from '../content'
import { Heading, Heart, Icon } from '../fx/Ornaments'
import { reducedMotion, useReveal } from '../fx/useScrollAnim'

const ROW = 150
const AMP = 22

function wavePath(rows: number, cx: number) {
  let d = `M${cx} 0`
  for (let i = 0; i < rows; i++) {
    const y = i * ROW
    d += ` Q${cx + AMP * 2} ${y + ROW / 4} ${cx} ${y + ROW / 2} Q${cx - AMP * 2} ${y + (ROW * 3) / 4} ${cx} ${y + ROW}`
  }
  return d
}

export function Program() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const items = content.program.items
  const height = items.length * ROW
  const [width, setWidth] = useState(360)
  useReveal(root)

  useLayoutEffect(() => {
    const el = track.current!
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wave-draw',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: track.current, start: 'top 58%', end: 'bottom 58%', scrub: 0.6 },
        },
      )
      gsap.utils.toArray<HTMLElement>('.wave-node').forEach((el) => {
        gsap.from(el, {
          scale: 0,
          duration: 0.6,
          ease: 'back.out(2.5)',
          scrollTrigger: { trigger: el, start: 'top 60%', toggleActions: 'play none none reverse' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative px-5 pt-16 pb-16">
      <Heading title={content.program.title} subtitle={content.program.subtitle} />

      <div ref={track} className="relative mx-auto mt-10 max-w-[380px]" style={{ height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="wave-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9b779" />
              <stop offset="0.5" stopColor="#b8894a" />
              <stop offset="1" stopColor="#5e9ea8" />
            </linearGradient>
          </defs>
          <path d={wavePath(items.length, width / 2)} stroke="#b8894a" strokeOpacity={0.18} strokeWidth={6} />
          <path
            className="wave-draw"
            d={wavePath(items.length, width / 2)}
            stroke="url(#wave-gold)"
            strokeWidth={3}
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray="1000 1000"
          />
        </svg>

        {items.map((it, i) => {
          const left = i % 2 === 0
          return (
            <div key={it.time} className="absolute inset-x-0 grid grid-cols-[1fr_44px_1fr] items-center" style={{ top: i * ROW + ROW / 2 - 40, height: 80 }}>
              <div data-reveal={left ? 'left' : 'fade'} className={`pr-3 text-right ${left ? '' : 'flex justify-end'}`}>
                {left ? <Item {...it} align="right" /> : <Icon name={it.icon} className="h-11 w-11 text-gold" />}
              </div>
              <div className="flex justify-center">
                <span className="wave-node flex h-6 w-6 items-center justify-center rounded-full border border-gold bg-cream shadow-[0_0_0_4px_var(--color-cream)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-navy" />
                </span>
              </div>
              <div data-reveal={left ? 'fade' : 'right'} className="pl-3">
                {left ? <Icon name={it.icon} className="h-11 w-11 text-gold" /> : <Item {...it} align="left" />}
              </div>
            </div>
          )
        })}
      </div>
      <Heart data-reveal="scale" className="mx-auto mt-2 h-5 text-sea" />
    </section>
  )
}

function Item({ time, title, note, align }: { time: string; title: string; note: string; align: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="font-serif text-[26px] leading-none font-medium text-gold">{time}</p>
      <p className="mt-1 font-serif text-[18px] leading-tight font-semibold text-balance text-navy">{title}</p>
      <p className="font-serif text-[14px] leading-snug text-navy/65 italic">{note}</p>
    </div>
  )
}
