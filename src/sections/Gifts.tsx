import { useRef, useState } from 'react'
import { GoldDust } from '../fx/GoldDust'
import { Heading, Icon } from '../fx/Ornaments'
import { useReveal } from '../fx/useScrollAnim'
import { useContent } from '../i18n'

export function Gifts() {
  const content = useContent()
  const root = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState<string | null>(null)
  useReveal(root)
  const g = content.gifts

  const copy = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num.replace(/\s/g, ''))
      setCopied(num)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section ref={root} className="relative overflow-hidden bg-cream-deep/60 px-6 pt-16 pb-16 text-center">
      <GoldDust count={18} />
      <div className="relative">
        <div data-reveal="scale" className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-cream">
          <Icon name="gift" className="h-10 w-10 text-gold" />
        </div>
        <Heading title={g.title} subtitle={g.subtitle} />
        <p data-reveal="up" className="mx-auto mt-6 max-w-[340px] font-serif text-[17px] leading-relaxed text-navy/80">
          {g.body}
        </p>

        <div className="mx-auto mt-8 grid max-w-[360px] gap-4">
          {g.accounts.map((a, i) => (
            <div key={a.owner} data-reveal="up" data-delay={0.1 * i} className="glass-frame">
              <div className="glass-inner px-4 py-5">
                {a.qr && <img src={a.qr} alt={`QR ${a.owner}`} loading="lazy" className="mx-auto mb-3 w-36 rounded" />}
                <p className="eyebrow text-[11px] text-gold">{g.roles[i]}</p>
                <p className="script mt-1 text-[30px] leading-none text-navy">{a.owner}</p>
                <p className="mt-2 font-serif text-[15px] text-navy/70">{a.bank}</p>
                <button type="button" onClick={() => copy(a.number)} className="mt-1 font-serif text-[20px] tracking-wider text-navy">
                  {a.number}
                </button>
                <p className="eyebrow mt-1 text-[10px] text-gold">{copied === a.number ? g.copied : g.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
