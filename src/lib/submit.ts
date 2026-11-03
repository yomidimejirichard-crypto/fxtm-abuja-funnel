import { captureAttribution } from './attribution'

export interface Registration {
  fullName: string
  email: string
  phone: string
  experienceLevel: string
  consent: true
  consentText: string
  consentTimestamp: string
}

const TIMEOUT_MS = 6000

async function postOnce(url: string, body: string, attempt: number): Promise<void> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
  console.info(`Webhook attempt ${attempt}.`)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      signal: controller.signal,
    })
    console.info(`Webhook status ${res.status} on attempt ${attempt}.`)
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
  } catch (error) {
    console.info(`Webhook failure on attempt ${attempt}.`, error)
    throw error
  } finally {
    window.clearTimeout(timer)
  }
}

/** Sends the lead to n8n. Never throws: the user always moves on to the confirmation view. */
export async function submitRegistration(data: Registration): Promise<void> {
  const url = import.meta.env.VITE_N8N_WEBHOOK_URL
  if (!url) {
    console.warn('VITE_N8N_WEBHOOK_URL is not set. Skipping the registration POST.')
    return
  }

  const body = JSON.stringify({
    timestamp: new Date().toISOString(),
    ...data,
    source: 'fxtm-portharcourt-traders-hangout',
    event: 'Traders Hangout with FXTM, Port Harcourt',
    eventDate: '2026-11-21',
    ...captureAttribution(),
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
  })

  try {
    await postOnce(url, body, 1)
  } catch (firstError) {
    try {
      await postOnce(url, body, 2)
    } catch (retryError) {
      console.error('Registration POST failed after retry.', { firstError, retryError })
    }
  }
}
