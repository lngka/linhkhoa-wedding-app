import { useRef } from 'react'
import { asset } from '../content'
import { GlassShimmer } from '../fx/GlassShimmer'
import { Heading, HeartDivider, Icon } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'
import { useContent } from '../i18n'

const VENUE = asset('venue.webp')

export function Venue() {
  const content = useContent()
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const { stay } = content.venue
  const [nameFirst, ...nameRest] = content.venue.name.split(' ')

  return (
    <section ref={root} className="relative px-6 pt-16 pb-20 text-center">
      <Heading title={content.venue.title} subtitle={content.venue.subtitle} />

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

          <div data-reveal="scale" className="relative overflow-hidden rounded-sm">
            <img src={VENUE} alt={content.venue.name} loading="lazy" className="w-full" />
            <GlassShimmer src={VENUE} delay={2} />
          </div>
        </div>
      </div>

      <div data-reveal="up" className="mt-8 flex justify-center">
        <a href={content.venue.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-navy">
          <Icon name="map" className="h-4 w-4" /> {content.ui.directions}
        </a>
      </div>

      <div data-reveal="up" className="glass-frame mx-auto mt-12 max-w-[360px]">
        <div className="glass-inner px-5 pt-8 pb-7 text-left">
          <p className="script text-center text-[36px] leading-tight text-navy">{stay.title}</p>
          <p className="mt-2 text-center font-serif text-[14px] leading-relaxed text-navy/65 italic">{stay.intro}</p>

          <ul className="mt-7 space-y-5">
            {stay.gifts.map((g, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream-deep/60">
                  <Icon name={g.icon} className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <p className="eyebrow text-[11px] text-gold">{g.title}</p>
                  <p className="mt-0.5 font-serif text-[15px] leading-snug text-navy/80">{g.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="my-6">
            <HeartDivider width={140} />
          </div>

          <p className="eyebrow text-center text-[11px] text-gold">{stay.includedLabel}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5">
            {stay.included.map((it, i) => (
              <li key={i} className="flex items-start gap-2">
                <Icon name={it.icon} className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="font-serif text-[13px] leading-snug text-navy/75">{it.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gold/30 pt-5">
            <p className="eyebrow text-center text-[11px] text-gold">{stay.perksLabel}</p>
            <ul className="mt-3 space-y-2">
              {stay.perks.map((p, i) => (
                <li key={i} className="font-serif text-[13px] leading-snug text-navy/60">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
