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

/** Parses a comma separated list of pixel IDs: trims, drops empty entries, de-duplicates. */
function parsePixelIds(raw: string | undefined): string[] {
  if (!raw) return []
  const ids = raw.split(',').map((id) => id.trim()).filter((id) => id.length > 0)
  return Array.from(new Set(ids))
}

/**
 * Standard Meta Pixel base code, PageView only.
 * fbevents.js loads once; each ID is initialised, then a single PageView fires on every initialised pixel.
 * The Lead event is configured in Meta's Event Setup Tool on #fxtm-register-submit, so it is never fired here.
 */
function loadPixel(pixelIds: string[]): void {
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

  for (const id of pixelIds) fbq('init', id)
  fbq('track', 'PageView')
}

/** Loads the pixel after first paint so it never blocks rendering. */
export function schedulePixel(): void {
  const pixelIds = parsePixelIds(import.meta.env.VITE_META_PIXEL_ID)
  if (pixelIds.length === 0) return
  const start = () => loadPixel(pixelIds)
  const afterPaint = () => {
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(start, { timeout: 3000 })
    else setTimeout(start, 1)
  }
  if (document.readyState === 'complete') afterPaint()
  else window.addEventListener('load', afterPaint, { once: true })
}
