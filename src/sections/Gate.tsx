import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { asset, content } from '../content'
import { GlassShimmer } from '../fx/GlassShimmer'
import { GoldDust, type GoldDustHandle } from '../fx/GoldDust'
import { Seal } from '../fx/Ornaments'
import { reducedMotion, scrollLock } from '../fx/useScrollAnim'

/** Full-screen stained-glass doors with a monogram seal. Tap to open. */
export function Gate({ onOpen }: { onOpen: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const dust = useRef<GoldDustHandle>(null)
  const [gone, setGone] = useState(false)
  const opening = useRef(false)

  useEffect(() => {
    scrollLock(true)
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.gate-seal', { scale: 0.6, opacity: 0, duration: 1.4, ease: 'back.out(1.6)', delay: 0.3 })
      gsap.from('.gate-hint', { opacity: 0, y: 10, duration: 1, delay: 1.2 })
    }, root)
    return () => ctx.revert()
  }, [])

  const open = () => {
    if (opening.current) return
    opening.current = true
    onOpen()
    const el = root.current!
    const rect = el.getBoundingClientRect()
    dust.current?.burst(rect.width / 2, rect.height / 2, 90)

    const done = () => {
      scrollLock(false)
      setGone(true)
    }
    if (reducedMotion()) {
      gsap.to(el, { opacity: 0, duration: 0.4, onComplete: done })
      return
    }
    gsap
      .timeline({ onComplete: done })
      .to('.gate-seal', { scale: 1.25, duration: 0.25, ease: 'power2.out' }, 0)
      .to('.gate-seal', { scale: 0.2, opacity: 0, rotate: 90, duration: 0.5, ease: 'power3.in' }, 0.25)
      .to('.gate-hint', { opacity: 0, duration: 0.3 }, 0)
      .fromTo('.gate-light', { opacity: 0, scaleX: 0.02 }, { opacity: 1, scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.45)
      .to('.gate-left', { rotateY: -105, duration: 2, ease: 'power3.inOut' }, 0.6)
      .to('.gate-right', { rotateY: 105, duration: 2, ease: 'power3.inOut' }, 0.6)
      .to('.gate-light', { opacity: 0, duration: 1 }, 1.6)
      .to(el, { opacity: 0, duration: 0.7 }, 2.1)
  }

  if (gone) return null

  return (
    <div
      ref={root}
      role="button"
      tabIndex={0}
      aria-label={content.gate.hint}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
      className="fixed inset-0 z-50 flex cursor-pointer justify-center bg-navy-deep"
    >
      <div className="relative h-full w-full max-w-[480px] overflow-hidden" style={{ perspective: '1400px' }}>
        <div className="gate-light absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,#fffaf0_0%,#f3dfae_45%,transparent_80%)]" />
        {(['left', 'right'] as const).map((side) => (
          <div
            key={side}
            className={`gate-${side} absolute top-0 h-full w-1/2 ${side === 'left' ? 'left-0' : 'right-0'}`}
            style={{ transformOrigin: side === 'left' ? 'left center' : 'right center', backfaceVisibility: 'hidden' }}
          >
            <img src={asset(`door-${side}.webp`)} alt="" className="h-full w-full object-cover" draggable={false} />
            <GlassShimmer src={asset(`door-${side}.webp`)} delay={side === 'left' ? 0 : 0.4} />
            <div className={`absolute inset-y-0 w-3 ${side === 'left' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/25 to-transparent`} />
          </div>
        ))}
        <GoldDust count={36} ref={dust} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="gate-seal relative">
            <div className="glow-pulse absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgb(255_240_200/0.8),transparent_70%)]" />
            <Seal left={content.monogram.left} right={content.monogram.right} className="relative w-36 drop-shadow-[0_8px_18px_rgb(0_0_0/0.35)]" />
          </div>
          <p className="gate-hint eyebrow mt-6 rounded-full bg-navy/70 px-4 py-1.5 text-cream backdrop-blur-sm">
            {content.gate.hint}
          </p>
        </div>
      </div>
    </div>
  )
}
