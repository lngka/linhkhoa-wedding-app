import { useEffect, useRef, useState } from 'react'
import { contents } from '../content'
import { Hourglass } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'
import { useContent } from '../i18n'

const target = new Date(contents.vi.date.start).getTime()

function remaining() {
  const diff = Math.max(0, target - Date.now())
  return [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1e3) % 60]
}

export function Countdown() {
  const content = useContent()
  const root = useRef<HTMLElement>(null)
  const [t, setT] = useState(remaining)
  useReveal(root)

  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" ref={root} className="relative px-6 pt-16 pb-24 text-center">
      <div data-reveal="scale" className="flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
        <Hourglass className="h-24 w-16" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
      </div>
      <h2 data-reveal="blur" className="script mt-4 text-[52px] text-navy">
        {content.countdown.title}
      </h2>
      <p data-reveal="fade" className="eyebrow text-gold">
        {content.countdown.subtitle}
      </p>

      <div data-reveal="up" className="mx-auto mt-8 grid max-w-[340px] grid-cols-4">
        {t.map((value, i) => (
          <div key={i} className={`flex flex-col items-center ${i ? 'border-l border-gold/40' : ''}`}>
            <span className="font-serif text-[38px] leading-none font-medium tabular-nums text-navy">
              {String(value).padStart(2, '0')}
            </span>
            <span className="eyebrow mt-2 text-[10px] text-gold">{content.countdown.units[i]}</span>
          </div>
        ))}
      </div>

      <p data-reveal="fade" className="mt-8 font-serif text-[17px] italic text-navy/75">
        {content.date.long}
      </p>
    </section>
  )
}
