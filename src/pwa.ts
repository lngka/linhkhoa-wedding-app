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
