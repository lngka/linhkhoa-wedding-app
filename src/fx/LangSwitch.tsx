import type { Lang } from '../content'
import { useContent, useLang } from '../i18n'

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: 'vi', label: 'VN' },
  { lang: 'en', label: 'EN' },
]

/** VN / EN pill pinned to the top-right of the page column; stays above the gate so guests can switch before opening. */
export function LangSwitch() {
  const { lang, setLang } = useLang()
  const c = useContent()
  return (
    <div className="pointer-events-none fixed inset-x-0 z-[60] flex justify-center" style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }}>
      <div className="flex w-full max-w-[480px] justify-end px-2">
        <div
          role="group"
          aria-label={c.ui.language}
          className="pointer-events-auto flex rounded-full border border-gold/60 bg-cream/90 p-0.5 shadow-[0_8px_20px_-12px_rgb(31_47_107/0.7)] backdrop-blur-md"
        >
          {OPTIONS.map((o) => (
            <button
              key={o.lang}
              type="button"
              onClick={() => setLang(o.lang)}
              aria-pressed={lang === o.lang}
              className={`rounded-full px-2.5 py-1 font-sc text-[12px] tracking-[0.12em] transition-colors ${lang === o.lang ? 'bg-navy text-cream' : 'text-navy/70'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
