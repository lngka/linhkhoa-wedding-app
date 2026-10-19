import { useRef } from 'react'
import { asset } from '../content'
import { GlassShimmer } from '../fx/GlassShimmer'
import { GoldDust } from '../fx/GoldDust'
import { HeartDivider } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'
import { useContent } from '../i18n'

const BAY = asset('bay.webp')

export function Footer() {
  const content = useContent()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <footer ref={root} className="relative overflow-hidden pt-16 text-center">
      <GoldDust count={24} />
      <div className="relative px-6">
        <p data-reveal="blur" className="script text-[56px] leading-none text-navy">
          {content.groom.short}
        </p>
        <p data-reveal="fade" className="script text-[36px] text-gold">
          &amp;
        </p>
        <p data-reveal="blur" className="script text-[56px] leading-none text-navy">
          {content.bride.short}
        </p>
        <p data-reveal="fade" className="eyebrow mt-4 text-gold">
          {content.date.display}
        </p>
        <div data-reveal="fade" className="mt-4">
          <HeartDivider />
        </div>
        <p data-reveal="up" className="script gold-text mt-4 text-[34px]">
          {content.footer.closing}
        </p>
        <p data-reveal="fade" className="mx-auto mt-2 max-w-[320px] font-serif text-[16px] text-navy/70 italic">
          {content.footer.thanks}
        </p>
      </div>
      <div data-reveal="up" className="relative mt-10 px-3">
        <div className="relative">
          <img src={BAY} alt={content.footer.bayAlt} loading="lazy" className="w-full" />
          <GlassShimmer src={BAY} delay={0.5} />
        </div>
      </div>
      <div className="bg-navy py-5">
        <p className="eyebrow text-[10px] text-cream/70">
          {content.monogram.left} &amp; {content.monogram.right} · {content.venue.name}
        </p>
      </div>
    </footer>
  )
}
