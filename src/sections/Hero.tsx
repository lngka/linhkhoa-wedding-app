import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { asset } from '../content'
import { useContent } from '../i18n'
import { GlassShimmer } from '../fx/GlassShimmer'
import { GoldDust } from '../fx/GoldDust'
import { HeartDivider, Sprig } from '../fx/Ornaments'
import { scrollToEl } from '../fx/useScrollAnim'

const ARCH = asset('arch.webp')

export function Hero({ opened }: { opened: boolean }) {
  const content = useContent()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-arch', { scale: 1.08, opacity: 0 })
      gsap.set('.hero-fade', { opacity: 0, y: 14 })
      gsap.set('.hero-write', { clipPath: 'inset(-20% 100% -20% 0)' })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!opened) {
      const ctx = gsap.context(() => {
        gsap.set('.hero-arch', { scale: 1.08, opacity: 0 })
        gsap.set('.hero-fade', { opacity: 0, y: 14 })
        gsap.set('.hero-write', { clipPath: 'inset(-20% 100% -20% 0)' })
      }, root)
      return () => ctx.revert()
    }
    const ctx = gsap.context(() => {
      gsap.set('.hero-arch', { scale: 1.08, opacity: 0 })
      gsap.set('.hero-fade', { opacity: 0, y: 14 })
      gsap.set('.hero-write', { clipPath: 'inset(-20% 100% -20% 0)' })
      gsap
        .timeline({ delay: 0.9 })
        .to('.hero-arch', { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' })
        .to('.hero-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, 0.6)
        .to('.hero-write', { clipPath: 'inset(-20% 0% -20% 0)', duration: 1.6, stagger: 0.7, ease: 'power1.inOut' }, 1)
    }, root)
    return () => ctx.kill()
  }, [opened])

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-6">
      <GoldDust count={30} />
      <Sprig className="absolute -top-2 -left-6 w-28 rotate-[100deg] opacity-60" />
      <Sprig className="absolute -right-6 -bottom-2 w-28 -rotate-[80deg] opacity-60" />

      <div
        className="hero-arch relative"
        style={{ width: 'min(92vw, 440px, calc((100svh - 32px) * 0.5625))', aspectRatio: '720 / 1280' }}
      >
        <img src={ARCH} alt="" className="absolute inset-0 h-full w-full drop-shadow-[0_20px_30px_rgb(31_47_107/0.25)]" />
        <GlassShimmer src={ARCH} delay={1} />

        <div className="absolute inset-x-[19%] top-[17%] bottom-[25%] flex flex-col items-center justify-center text-center">
          <h1 className="text-navy">
            <span className="hero-write script block text-[clamp(34px,10vw,46px)]">{content.bride.short}</span>
            <span className="hero-fade script block text-[30px] text-gold">&amp;</span>
            <span className="hero-write script block text-[clamp(34px,10vw,46px)]">{content.groom.short}</span>
          </h1>
          <p className="hero-fade mt-2 font-serif text-[14px] italic text-navy/80">{content.invitationLines[0]}</p>

          <div className="hero-fade mt-3 w-full">
            <HeartDivider width={140} />
          </div>
          <p className="hero-fade mt-2 font-sc text-[22px] tracking-[0.18em] text-gold">{content.date.display}</p>
          <p className="hero-fade eyebrow text-[10px] text-navy/70">{content.date.weekday}</p>
          <p className="hero-fade mt-2 font-serif text-[14px] leading-snug text-navy/85">
            {content.venue.name}
            <br />
            <span className="text-[12px] text-navy/60">{content.venue.city}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => scrollToEl(document.getElementById('countdown') ?? document.getElementById('families'))}
          className="hero-fade absolute bottom-[10.5%] left-1/2 flex -translate-x-1/2 flex-col items-center text-navy"
        >
          <span className="eyebrow rounded-full bg-cream/85 px-3 py-1 text-[11px] backdrop-blur-sm">{content.hero.button}</span>
          <svg viewBox="0 0 24 24" className="float-y mt-1 h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.4}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
