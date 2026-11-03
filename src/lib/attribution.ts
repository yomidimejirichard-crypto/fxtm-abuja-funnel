const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const
const STORAGE_KEY = 'fxtm_attribution'

export type Attribution = Record<(typeof KEYS)[number], string>

function empty(): Attribution {
  return { utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: '', fbclid: '' }
}

function readStored(): Partial<Attribution> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Partial<Attribution>) : {}
  } catch {
    return {}
  }
}

let cached: Attribution | null = null

/** Read UTM and fbclid from the URL on load, falling back to values saved earlier in the session. */
export function captureAttribution(): Attribution {
  if (cached) return cached
  const stored = readStored()
  const params = new URLSearchParams(window.location.search)
  const result = empty()
  let fromUrl = false
  for (const key of KEYS) {
    const value = params.get(key)
    if (value) fromUrl = true
    result[key] = value ?? stored[key] ?? ''
  }
  if (fromUrl) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    } catch {
      // Storage can be blocked (private mode, in app browsers). Attribution still works for this page view.
    }
  }
  cached = result
  return result
}
