import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useContent } from '../i18n'
import { Heading } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'

const SPAN = 148
const BLADE = { w: 34, h: 148, bottom: 22 }

function fanAngles(n: number) {
  if (n < 2) return [0]
  return Array.from({ length: n }, (_, i) => -SPAN / 2 + (SPAN / (n - 1)) * i)
}

function fineHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function shuffle<T>(arr: T[]) {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function shuffleDifferent(arr: number[]) {
  if (arr.length < 2) return arr
  let next = shuffle(arr)
  while (next.every((v, i) => v === arr[i])) next = shuffle(arr)
  return next
}

export function DressCode() {
  const content = useContent()
  const d = content.dressCode
  const root = useRef<HTMLElement>(null)
  const fan = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [opened, setOpened] = useState(false)
  const [canReplay, setCanReplay] = useState(false)
  const [order, setOrder] = useState(() => d.swatches.map((_, i) => i))
  const played = useRef(false)
  const pendingShuffle = useRef(false)
  useReveal(root)

  useLayoutEffect(() => {
    const el = fan.current
    const blades = el?.querySelectorAll<HTMLElement>('.dc-blade')
    if (!el || !blades?.length) return
    const angles = fanAngles(blades.length)
    gsap.set(blades, { rotate: 0, transformOrigin: '50% 100%' })

    const spread = (animate: boolean) => {
      if (animate) {
        gsap.to(blades, {
          rotate: (i: number) => angles[i],
          duration: 0.8,
          ease: 'power2.out',
          stagger: { each: 0.012, from: 'center' },
          overwrite: true,
          onComplete: () => setOpened(true),
        })
      } else {
        gsap.set(blades, { rotate: (i: number) => angles[i] })
        setOpened(true)
      }
    }

    const play = () => {
      if (played.current) return
      played.current = true
      const animate = !reducedMotion()
      setCanReplay(animate)
      spread(animate)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) play()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      gsap.killTweensOf(blades)
    }
  }, [])

  useLayoutEffect(() => {
    if (!pendingShuffle.current) return
    pendingShuffle.current = false
    const blades = fan.current?.querySelectorAll<HTMLElement>('.dc-blade')
    if (!blades?.length) return
    const angles = fanAngles(blades.length)
    gsap.set(blades, { rotate: 0, transformOrigin: '50% 100%' })
    gsap.to(blades, {
      rotate: (i: number) => angles[i],
      duration: 0.8,
      ease: 'power2.out',
      stagger: { each: 0.012, from: 'center' },
      overwrite: true,
      onComplete: () => setOpened(true),
    })
  }, [order])

  const replay = () => {
    const blades = fan.current?.querySelectorAll<HTMLElement>('.dc-blade')
    if (!blades?.length || reducedMotion()) return
    setOpened(false)
    setActive(null)
    gsap.to(blades, {
      rotate: 0,
      duration: 0.28,
      ease: 'power1.in',
      overwrite: true,
      onComplete: () => {
        pendingShuffle.current = true
        setOrder((prev) => shuffleDifferent(prev))
      },
    })
  }

  const onEnter = (i: number) => {
    if (fineHover()) setActive(i)
  }
  const onLeave = () => {
    if (fineHover()) setActive(null)
  }
  const onToggle = (i: number) => {
    if (fineHover()) {
      setActive(i)
      return
    }
    setActive((cur) => (cur === i ? null : i))
  }

  return (
    <section ref={root} className="relative px-6 pt-14 pb-16 text-center">
      <Heading title={d.title} />
      <p data-reveal="up" className="mx-auto mt-6 max-w-[340px] font-serif text-[17px] leading-relaxed text-navy/80">
        {d.body}
      </p>
      <p data-reveal="up" data-delay="0.08" className="mx-auto mt-3 max-w-[340px] font-serif text-[26px] leading-snug font-medium text-gold">
        {d.highlight}
      </p>

      <div
        ref={fan}
        className="relative mx-auto mt-8 w-full max-w-[380px]"
        style={{ height: BLADE.h + BLADE.bottom + 16 }}
      >
        {order.map((si, i) => {
          const s = d.swatches[si]
          return (
            <div
              key={si}
              className="dc-blade absolute left-1/2"
              style={{
                width: BLADE.w,
                height: BLADE.h,
                bottom: BLADE.bottom,
                marginLeft: -BLADE.w / 2,
                zIndex: active === si ? 20 : i + 1,
              }}
            >
              <button
                type="button"
                aria-label={s.name}
                aria-pressed={active === si}
                onPointerEnter={() => onEnter(si)}
                onPointerLeave={onLeave}
                onClick={() => onToggle(si)}
                className={`fabric-chip h-full w-full cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${active === si ? '-translate-y-3 motion-reduce:translate-y-0' : ''}`}
                style={{ '--chip': s.hex } as CSSProperties}
              />
            </div>
          )
        })}
        <span
          aria-hidden
          className="absolute left-1/2 z-30 block h-3 w-3 -translate-x-1/2 rounded-full border border-gold bg-navy shadow-[0_1px_4px_rgb(31_47_107/0.35)]"
          style={{ bottom: BLADE.bottom - 6 }}
        />
      </div>

      <p aria-live="polite" className="mt-1 h-6 font-sc text-[12px] tracking-[0.22em] text-gold uppercase">
        {active !== null ? d.swatches[active].name : '\u00a0'}
      </p>
      <p data-reveal="fade" className="mx-auto max-w-[300px] font-serif text-[14px] leading-relaxed text-navy/55 italic">
        {d.hint}
      </p>
      {canReplay && opened && (
        <button
          type="button"
          onClick={replay}
          className="mt-5 font-serif text-[16px] text-gold underline decoration-gold/50 underline-offset-4 transition hover:text-navy"
        >
          {d.replay}
        </button>
      )}
    </section>
  )
}
