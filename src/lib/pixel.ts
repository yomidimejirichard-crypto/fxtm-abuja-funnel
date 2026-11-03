type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: Fbq
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

/**
 * Standard Meta Pixel base code, PageView only.
 * The Lead event is configured in Meta's Event Setup Tool on #fxtm-register-submit, so it is never fired here.
 */
function loadPixel(pixelId: string): void {
  if (window.fbq) return
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  fbq('init', pixelId)
  fbq('track', 'PageView')
}

/** Loads the pixel after first paint so it never blocks rendering. */
export function schedulePixel(): void {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID
  if (!pixelId) return
  const start = () => loadPixel(pixelId)
  const afterPaint = () => {
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(start, { timeout: 3000 })
    else setTimeout(start, 1)
  }
  if (document.readyState === 'complete') afterPaint()
  else window.addEventListener('load', afterPaint, { once: true })
}
