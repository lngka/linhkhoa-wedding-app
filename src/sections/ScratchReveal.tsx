import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { asset } from '../content'
import { useContent } from '../i18n'
import { GlassShimmer } from '../fx/GlassShimmer'
import { GoldDust, type GoldDustHandle } from '../fx/GoldDust'
import { useReveal } from '../fx/useScrollAnim'

const FRAME = asset('frame-wide.webp')
// Transparent inner hole of frame-wide.webp as % of the image box, grown slightly to tuck under the gold rim.
const INNER = { left: 5.8, top: 7.8, width: 88.3, height: 84.8 }
const REVEAL_AT = 0.5

export function ScratchReveal() {
  const content = useContent()
  const root = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const dust = useRef<GoldDustHandle>(null)
  const [revealed, setRevealed] = useState(false)
  const repaint = useRef<(hint: string) => void>(null)
  const hint = content.scratch.hint
  useReveal(root)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let drawing = false
    let last: { x: number; y: number } | null = null
    let strokes = 0
    let done = false
    let text = ''

    const paint = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      const g = ctx.createRadialGradient(w * 0.4, h * 0.3, 10, w / 2, h / 2, h * 0.7)
      g.addColorStop(0, '#fffaf0')
      g.addColorStop(0.6, '#f1e7d4')
      g.addColorStop(1, '#dccaa6')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
      // Frosted glass speckle.
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '184,137,74'},${Math.random() * 0.18})`
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5)
      }
      ctx.fillStyle = '#b8894a'
      ctx.textAlign = 'center'
      ctx.font = `38px "Great Vibes", cursive`
      ctx.fillText(text, w / 2, h / 2)
      ctx.font = `18px "Cormorant Garamond", serif`
      ctx.fillText('♡', w / 2, h / 2 + 30)
    }
    document.fonts.ready.then(paint)
    // Language switch repaints the cover, but never wipes a guest's scratching.
    repaint.current = (next) => {
      text = next
      if (!strokes && !done) paint()
    }

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const k = canvas.offsetWidth / r.width
      return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k }
    }
    const scratch = (p: { x: number; y: number }) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 42
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo((last ?? p).x, (last ?? p).y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
      last = p
      if (++strokes % 12 === 0) check()
    }
    const check = () => {
      if (done) return
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let clear = 0
      let total = 0
      for (let i = 3; i < data.length; i += 4 * 16) {
        total++
        if (data[i] < 40) clear++
      }
      // The canvas is clipped to a rounded rect (~90% of its box).
      if (clear / total > REVEAL_AT * 0.9) finish()
    }
    const finish = () => {
      done = true
      setRevealed(true)
      gsap.to(canvas, { opacity: 0, duration: 0.9, ease: 'power2.out' })
      const f = frameRef.current!.getBoundingClientRect()
      const s = root.current!.getBoundingClientRect()
      dust.current?.burst(f.left - s.left + f.width / 2, f.top - s.top + f.height / 2, 120)
    }

    const down = (e: PointerEvent) => {
      drawing = true
      last = null
      try {
        canvas.setPointerCapture(e.pointerId)
      } catch {
        /* pointer already released */
      }
      scratch(pos(e))
    }
    const move = (e: PointerEvent) => drawing && scratch(pos(e))
    const up = () => {
      drawing = false
      check()
    }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)
    return () => {
      repaint.current = null
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
    }
  }, [])

  useEffect(() => repaint.current?.(hint), [hint])

  return (
    <section ref={root} className="relative overflow-hidden rounded-t-[200px] bg-navy px-6 pt-20 pb-20 text-center text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_40%_at_50%_0%,rgb(94_158_168/0.35),transparent_70%)]" />
      <GoldDust count={45} ref={dust} />
      <div className="relative">
        <h2 data-reveal="blur" className="script mx-auto max-w-[340px] text-[40px] text-cream">
          {content.scratch.title}
        </h2>
        {content.scratch.text.map((line, i) => (
          <p key={i} data-reveal="fade" data-delay={0.15 * i} className="mt-2 font-serif text-[17px] text-cream/80 italic">
            {line}
          </p>
        ))}

        <div ref={frameRef} data-reveal="scale" className="relative mx-auto mt-10 w-[94%] max-w-[460px]" style={{ aspectRatio: '1087 / 781' }}>
          <div
            className="absolute overflow-hidden rounded-[17%/25%]"
            style={{ left: `${INNER.left}%`, top: `${INNER.top}%`, width: `${INNER.width}%`, height: `${INNER.height}%` }}
          >
            <img
              src={content.scratch.photo}
              alt={`${content.groom.short} & ${content.bride.short}`}
              loading="lazy"
              className={`h-full w-full origin-top object-cover object-[center_12%] transition-transform duration-[2500ms] ease-out ${revealed ? 'scale-100' : 'scale-105'}`}
            />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-crosshair touch-none" aria-label={content.scratch.hint} />
          </div>
          <img src={FRAME} alt="" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_18px_30px_rgb(0_0_0/0.45)]" />
          <GlassShimmer src={FRAME} />
        </div>
        <p className={`eyebrow mt-6 text-[11px] text-gold-light transition-opacity duration-700 ${revealed ? 'opacity-0' : 'opacity-100'}`}>
          {content.scratch.help}
        </p>
      </div>
    </section>
  )
}
