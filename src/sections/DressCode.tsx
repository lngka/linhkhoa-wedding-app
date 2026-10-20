import { useRef } from 'react'
import { useContent } from '../i18n'
import { Heading, Icon } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'

export function DressCode() {
  const content = useContent()
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const d = content.dressCode

  return (
    <section ref={root} className="relative px-6 pt-14 pb-16 text-center">
      <div data-reveal="scale" className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-[radial-gradient(circle,#fffaf0,var(--color-cream-deep))]">
        <Icon name="shirt" className="h-10 w-10 text-gold" />
      </div>
      <Heading title={d.title} subtitle={d.style} />
      <p data-reveal="up" className="mx-auto mt-6 max-w-[340px] font-serif text-[17px] leading-relaxed text-navy/80">
        {d.body}
      </p>
      <div className="mt-7 flex flex-col items-center gap-3">
        {d.swatches.map((row, r) => (
          <div key={r} className="flex justify-center gap-3">
            {row.map((c, i) => (
              <span
                key={`${r}-${i}`}
                data-reveal="scale"
                data-delay={0.08 * (r * row.length + i)}
                className="h-11 w-11 rounded-full border-2 border-gold/70 shadow-[inset_0_-6px_10px_rgb(0_0_0/0.12),0_6px_12px_-6px_rgb(31_47_107/0.5)]"
                style={{ background: `radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.55), transparent 45%), ${c}` }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
