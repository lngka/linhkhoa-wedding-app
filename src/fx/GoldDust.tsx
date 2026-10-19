import { useEffect, useImperativeHandle, useRef, type Ref } from 'react'
export type GoldDustHandle = { burst: (x: number, y: number, count?: number) => void }

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  life: number
  max: number
  tw: number
  burst: boolean
}

const COLORS = ['255,236,190', '230,196,128', '255,255,240', '217,183,121']

/** Canvas of drifting, twinkling gold specks. Fills its positioned parent. */
export function GoldDust({
  count = 40,
  className = '',
  ref,
}: {
  count?: number
  className?: string
  ref?: Ref<GoldDustHandle>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const wake = useRef<() => void>(() => {})

  useImperativeHandle(ref, () => ({
    burst(x, y, n = 60) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        const s = 1.5 + Math.random() * 5
        particles.current.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 1.5,
          r: 0.8 + Math.random() * 2.4,
          life: 0,
          max: 50 + Math.random() * 50,
          tw: Math.random() * 6,
          burst: true,
        })
      }
      wake.current()
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const spawn = (anywhere: boolean): Particle => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.15 + Math.random() * 0.45),
      r: 0.5 + Math.random() * 1.6,
      life: 0,
      max: 400 + Math.random() * 500,
      tw: Math.random() * 6,
      burst: false,
    })

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    particles.current = Array.from({ length: count }, () => spawn(true))

    const frame = () => {
      raf = 0
      ctx.clearRect(0, 0, w, h)
      const ps = particles.current
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        if (p.burst) {
          p.vx *= 0.95
          p.vy = p.vy * 0.95 + 0.06
        } else {
          p.x += Math.sin((p.life + p.tw * 50) / 60) * 0.15
        }
        if (p.life > p.max || p.y < -10) {
          if (p.burst) ps.splice(i, 1)
          else ps[i] = spawn(false)
          continue
        }
        const fade = Math.min(1, p.life / 30, (p.max - p.life) / 40)
        const twinkle = 0.55 + 0.45 * Math.sin(p.life / 9 + p.tw)
        const a = Math.max(0, fade * twinkle)
        const c = COLORS[i % COLORS.length]
        ctx.beginPath()
        ctx.fillStyle = `rgba(${c},${a})`
        ctx.shadowColor = `rgba(255,220,150,${a})`
        ctx.shadowBlur = p.r * 5
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        if (p.r > 1.6 && twinkle > 0.9) {
          ctx.strokeStyle = `rgba(255,245,215,${a * 0.7})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(p.x - p.r * 3, p.y)
          ctx.lineTo(p.x + p.r * 3, p.y)
          ctx.moveTo(p.x, p.y - p.r * 3)
          ctx.lineTo(p.x, p.y + p.r * 3)
          ctx.stroke()
        }
      }
      if (visible && ps.length) raf = requestAnimationFrame(frame)
    }
    wake.current = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) wake.current()
    })
    io.observe(canvas)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    wake.current()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [count])

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
