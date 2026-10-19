import { useRef, useState } from 'react'
import { asset, content } from '../content'
import { downloadIcs, googleCalendarUrl } from '../lib/calendar'
import { GlassShimmer } from '../fx/GlassShimmer'
import { Heading, HeartDivider, Icon } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'

const VENUE = asset('venue.webp')

export function Venue() {
  const root = useRef<HTMLElement>(null)
  const [calOpen, setCalOpen] = useState(false)
  useReveal(root)
  const [arrival, ceremony] = content.program.items
  const [nameFirst, ...nameRest] = content.venue.name.split(' ')

  return (
    <section ref={root} className="relative px-6 pt-16 pb-20 text-center">
      <Heading title="Lễ cưới & Tiệc" subtitle="Nơi hẹn ước trăm năm" />

      <div data-reveal="up" className="glass-frame mx-auto mt-10 max-w-[360px]">
        <div className="glass-inner px-5 pt-8 pb-7">
          <p className="script text-[44px] leading-none text-navy">{nameFirst}</p>
          <p className="eyebrow mt-2 text-navy">{nameRest.join(' ')}</p>
          <p className="mt-1 font-serif text-[15px] text-navy/70 italic">
            {content.venue.area} · {content.venue.city}
          </p>
          <div className="my-5">
            <HeartDivider width={150} />
          </div>
          <p className="font-serif text-[17px] text-navy">{content.date.long}</p>
          <div className="mt-4 grid grid-cols-2 divide-x divide-gold/40">
            {[arrival, ceremony].map((it) => (
              <div key={it.time}>
                <p className="eyebrow text-[11px] text-gold">{it.title}</p>
                <p className="font-serif text-[30px] leading-tight text-gold">{it.time}</p>
              </div>
            ))}
          </div>

          <div data-reveal="scale" className="relative mt-6 overflow-hidden rounded-sm">
            <img src={VENUE} alt={content.venue.name} loading="lazy" className="w-full" />
            <GlassShimmer src={VENUE} delay={2} />
          </div>
        </div>
      </div>

      <div data-reveal="up" className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href={content.venue.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-navy">
          <Icon name="map" className="h-4 w-4" /> Chỉ đường
        </a>
        <div className="relative">
          <button type="button" onClick={() => setCalOpen((v) => !v)} className="btn btn-outline" aria-expanded={calOpen}>
            <Icon name="calendar" className="h-4 w-4" /> Thêm vào lịch
          </button>
          {calOpen && (
            <div className="absolute top-full right-0 z-10 mt-2 w-52 overflow-hidden rounded-xl border border-gold/40 bg-cream text-left shadow-xl">
              <a
                href={googleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setCalOpen(false)}
                className="block px-4 py-3 font-serif text-[16px] text-navy hover:bg-cream-deep"
              >
                Google Calendar
              </a>
              <button
                type="button"
                onClick={() => {
                  downloadIcs()
                  setCalOpen(false)
                }}
                className="block w-full border-t border-gold/30 px-4 py-3 text-left font-serif text-[16px] text-navy hover:bg-cream-deep"
              >
                Apple / Outlook (.ics)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
