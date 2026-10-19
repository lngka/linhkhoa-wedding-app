import { useRef } from 'react'
import { content } from '../content'
import { Heart, HeartDivider, Sprig } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'

export function Families() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const { groom, bride } = content.families

  return (
    <section id="families" ref={root} className="relative overflow-hidden px-6 pt-20 pb-20 text-center">
      <Sprig data-reveal="left" className="absolute top-4 -left-4 w-24 rotate-[95deg]" />
      <Sprig data-reveal="right" className="absolute top-4 -right-4 w-24 -scale-x-100 -rotate-[95deg]" />

      <h2 data-reveal="blur" className="script text-[52px] text-navy">
        {content.welcome.title}
      </h2>
      <div className="mt-2 space-y-0.5">
        {content.invitationLines.map((l, i) => (
          <p key={l} data-reveal="fade" data-delay={0.1 * i} className="font-serif text-[17px] text-navy/85">
            {l}
          </p>
        ))}
      </div>

      <div data-reveal="fade" className="mt-6">
        <HeartDivider />
      </div>
      <p data-reveal="blur" className="script mt-3 text-[38px] text-navy">
        {content.groom.full}
      </p>
      <p data-reveal="fade" className="script text-[34px] text-gold">
        &amp;
      </p>
      <p data-reveal="blur" className="script text-[38px] text-navy">
        {content.bride.full}
      </p>
      <div data-reveal="fade" className="mt-3">
        <HeartDivider />
      </div>

      <p data-reveal="up" className="mx-auto mt-6 max-w-[340px] font-serif text-[17px] leading-relaxed text-navy/80 italic">
        {content.welcome.body}
      </p>

      <div data-reveal="up" className="mx-auto mt-10 grid max-w-[360px] grid-cols-[1fr_auto_1fr] items-start gap-3">
        {[groom, null, bride].map((fam, i) =>
          fam ? (
            <div key={fam.label}>
              <p className="eyebrow text-navy">{fam.label}</p>
              <Heart className="mx-auto my-2 h-2.5 text-gold" />
              {fam.parents.map((p) => (
                <p key={p} className="font-serif text-[16px] leading-snug text-navy/85">
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <div key={i} className="flex h-full flex-col items-center">
              <span className="w-px flex-1 bg-gold/50" />
              <Heart className="my-1 h-3 text-gold" />
              <span className="w-px flex-1 bg-gold/50" />
            </div>
          ),
        )}
      </div>
    </section>
  )
}
