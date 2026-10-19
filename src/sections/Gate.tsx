import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { asset, content } from '../content'
import { GlassShimmer } from '../fx/GlassShimmer'
import { GoldDust, type GoldDustHandle } from '../fx/GoldDust'
import { Seal } from '../fx/Ornaments'
import { scrollLock } from '../fx/useScrollAnim'

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
      gsap.from('.gate-seal', { opacity: 0, y: 8, duration: 1.2, ease: 'power2.out', delay: 0.3 })
      gsap.from('.gate-hint', { opacity: 0, y: 10, duration: 1, delay: 1.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  const open = () => {
    if (opening.current) return
    opening.current = true
    onOpen()
    const el = root.current!
    const rect = el.getBoundingClientRect()
    dust.current?.burst(rect.width / 2, rect.height / 2, 60)

    const done = () => {
      scrollLock(false)
      setGone(true)
    }
    gsap
      .timeline({ onComplete: done })
      .to(['.gate-seal', '.gate-hint'], { opacity: 0, duration: 0.5, ease: 'power1.out' }, 0)
      .to('.gate-left', { rotateY: -105, duration: 1.8, ease: 'power3.inOut' }, 0.2)
      .to('.gate-right', { rotateY: 105, duration: 1.8, ease: 'power3.inOut' }, 0.2)
      .to(el, { opacity: 0, duration: 0.8, ease: 'power1.out' }, 1.2)
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
      className="fixed inset-0 z-50 flex cursor-pointer justify-center"
    >
      <div className="relative h-full w-full max-w-[480px]">
        {/* Doors only. Firefox drops filtered descendants of a perspective box
            (seal drop-shadow) and any element that has both a transform and
            backdrop-filter (the hint, once GSAP moves it). */}
        <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1400px' }}>
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
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="gate-seal relative">
            <div className="glow-pulse absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgb(255_240_200/0.8),transparent_70%)]" />
            <Seal left={content.monogram.left} right={content.monogram.right} className="relative w-36 drop-shadow-[0_8px_18px_rgb(0_0_0/0.35)]" />
          </div>
          <p className="gate-hint relative mt-6">
            <span className="absolute inset-0 rounded-full bg-navy/75 backdrop-blur-sm" />
            <span className="eyebrow relative block rounded-full px-4 py-1.5 text-cream">{content.gate.hint}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
