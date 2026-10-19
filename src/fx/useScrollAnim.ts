import { useEffect, useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export const scrollLock = (locked: boolean) => {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) lenis?.stop()
  else lenis?.start()
}

export const scrollToEl = (el: Element | null) => {
  if (!el) return
  if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function useSmoothScroll() {
  // Lazy images change the page height; keep trigger positions in sync.
  useEffect(() => {
    let t = 0
    let lastH = 0
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight
      if (h === lastH) return
      lastH = h
      clearTimeout(t)
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis?.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

/**
 * Reveals children with a `data-reveal` attribute as they scroll into view.
 * Values: "up" (default), "fade", "scale", "left", "right", "blur".
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const kind = el.dataset.reveal || 'up'
        const from: gsap.TweenVars = { opacity: 0 }
        if (kind === 'up') from.y = 32
        if (kind === 'scale') from.scale = 0.9
        if (kind === 'left') from.x = -40
        if (kind === 'right') from.x = 40
        if (kind === 'blur') from.filter = 'blur(10px)'
        gsap.from(el, {
          ...from,
          duration: 1.1,
          delay: Number(el.dataset.delay || 0),
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [scope])
}
