import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'
import { asset } from '../content'
import { useContent } from '../i18n'
import { GlassShimmer } from '../fx/GlassShimmer'
import { GoldDust, type GoldDustHandle } from '../fx/GoldDust'
import { Seal } from '../fx/Ornaments'
import { scrollLock } from '../fx/useScrollAnim'

export type GateHandle = { close: () => Promise<void> }

/** Full-screen stained-glass doors with a monogram seal. Tap to open; can close again from the footer. */
export const Gate = forwardRef<GateHandle, { onOpen: () => void }>(function Gate({ onOpen }, ref) {
  const content = useContent()
  const root = useRef<HTMLDivElement>(null)
  const dust = useRef<GoldDustHandle>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const busy = useRef(false)
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    scrollLock(true)
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.gate-seal', { opacity: 0, y: 8, duration: 1.2, ease: 'power2.out', delay: 0.3 })
      gsap.from('.gate-hint', { opacity: 0, y: 10, duration: 1, delay: 1.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  const openDoors = () => {
    if (busy.current || open) return
    busy.current = true
    onOpen()
    const el = root.current!
    const rect = el.getBoundingClientRect()
    dust.current?.burst(rect.width / 2, rect.height / 2, 60)

    tl.current?.kill()
    tl.current = gsap
      .timeline({
        onComplete: () => {
          scrollLock(false)
          setOpen(true)
          busy.current = false
        },
      })
      .to(['.gate-seal', '.gate-hint'], { opacity: 0, duration: 0.5, ease: 'power1.out' }, 0)
      .to('.gate-left', { rotateY: -105, duration: 1.8, ease: 'power3.inOut' }, 0.2)
      .to('.gate-right', { rotateY: 105, duration: 1.8, ease: 'power3.inOut' }, 0.2)
      .to(el, { opacity: 0, duration: 0.8, ease: 'power1.out' }, 1.2)
  }

  useImperativeHandle(ref, () => ({
    close() {
      if (busy.current || !open) return Promise.resolve()
      busy.current = true
      setClosing(true)
      scrollLock(true)
      const el = root.current!
      // Start from the post-open pose so the reverse reads cleanly.
      gsap.set(el, { opacity: 0 })
      gsap.set('.gate-left', { rotateY: -105 })
      gsap.set('.gate-right', { rotateY: 105 })
      gsap.set(['.gate-seal', '.gate-hint'], { opacity: 0, y: 0 })

      return new Promise<void>((resolve) => {
        tl.current?.kill()
        tl.current = gsap
          .timeline({
            onComplete: () => {
              setOpen(false)
              setClosing(false)
              busy.current = false
              resolve()
            },
          })
          .to(el, { opacity: 1, duration: 0.55, ease: 'power1.out' }, 0)
          .to('.gate-left', { rotateY: 0, duration: 1.8, ease: 'power3.inOut' }, 0.15)
          .to('.gate-right', { rotateY: 0, duration: 1.8, ease: 'power3.inOut' }, 0.15)
          .to(['.gate-seal', '.gate-hint'], { opacity: 1, duration: 0.7, ease: 'power2.out' }, 1.15)
      })
    },
  }), [open])

  const inert = open && !closing

  return (
    <div
      ref={root}
      role="button"
      tabIndex={inert ? -1 : 0}
      aria-hidden={inert}
      aria-label={content.gate.hint}
      onClick={openDoors}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openDoors()}
      className={`fixed inset-0 z-50 flex justify-center ${inert ? 'pointer-events-none' : 'cursor-pointer'}`}
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
})
