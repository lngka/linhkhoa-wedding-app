import { useEffect, useState } from 'react'

/** Chromium's deferred install prompt. Missing from lib.dom in some TS versions. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallListener = () => void

let deferred: BeforeInstallPromptEvent | null = null
const listeners = new Set<InstallListener>()

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))

const notify = () => {
  for (const fn of listeners) fn()
}

const clearDeferred = () => {
  deferred = null
  notify()
}

/** Capture the install prompt as early as the module loads so React does not miss it. */
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as BeforeInstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', clearDeferred)
}

export function canInstall() {
  return deferred !== null && !isStandalone()
}

export async function promptInstall() {
  if (!deferred) return false
  const event = deferred
  deferred = null
  notify()
  await event.prompt()
  const { outcome } = await event.userChoice
  if (outcome !== 'accepted') return false
  return true
}

/** True while Chromium has a deferred install prompt and the page is not already an installed app. */
export function useCanInstall() {
  const [ok, setOk] = useState(canInstall)
  useEffect(() => {
    const sync = () => setOk(canInstall())
    listeners.add(sync)
    sync()
    return () => {
      listeners.delete(sync)
    }
  }, [])
  return ok
}

/** Register a network-only service worker in production so the invite is installable. */
export function registerPWA() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

  const swUrl = `${import.meta.env.BASE_URL}sw.js`

  const register = () => {
    void navigator.serviceWorker.register(swUrl, { updateViaCache: 'none' }).then((reg) => {
      const ping = () => {
        void reg.update()
      }
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') ping()
      })
    })
  }

  if (document.readyState === 'complete') register()
  else window.addEventListener('load', register)
}
