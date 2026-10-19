import { useEffect, useState, type ReactNode } from 'react'
import type { Lang } from './content'
import { LangContext } from './i18n'

const KEY = 'lang'

// `?lang=en` wins (so a link can be sent to foreign guests), then the guest's last choice, then Vietnamese.
function initialLang(): Lang {
  const q = new URLSearchParams(location.search).get('lang')
  if (q === 'en' || q === 'vi') return q
  return localStorage.getItem(KEY) === 'en' ? 'en' : 'vi'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem(KEY, lang)
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
