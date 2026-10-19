import { useRef } from 'react'
import { Heading, Heart, Icon } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'
import { useContent } from '../i18n'

export function Travel() {
  const content = useContent()
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const t = content.travel

  return (
    <section ref={root} className="relative px-6 pt-16 pb-16 text-center">
      <div data-reveal="scale" className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-[radial-gradient(circle,#fffaf0,var(--color-cream-deep))]">
        <Icon name="car" className="h-10 w-10 text-gold" />
      </div>
      <Heading title={t.title} />

      <div className="mx-auto mt-8 max-w-[360px] space-y-5 text-left">
        {t.route.map((r, i) => (
          <div key={i} data-reveal="up" className="flex gap-3">
            <Heart className="mt-1.5 h-3 shrink-0 text-gold" />
            <div>
              <p className="eyebrow text-navy">{r.label}</p>
              <p className="font-serif text-[16px] leading-relaxed text-navy/80">{r.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div data-reveal="up" className="glass-frame mx-auto mt-10 max-w-[360px]">
        <div className="glass-inner px-5 py-7">
          <Icon name="hotel" className="mx-auto h-9 w-9 text-gold" />
          <p className="eyebrow mt-3 text-[11px] text-gold">{t.stay.label}</p>
          <p className="script text-[36px] leading-tight text-navy">{t.stay.name}</p>
          <ul className="mt-3 space-y-1 font-serif text-[16px] text-navy/80">
            {t.stay.lines.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
          <p className="eyebrow mt-5 text-[11px] text-gold">{t.stay.datesLabel}</p>
          <p className="font-serif text-[20px] text-navy">{t.stay.dates}</p>
          <a href={content.venue.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-navy mt-6">
            <Icon name="map" className="h-4 w-4" /> Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
