import { useEffect, useRef, useState } from 'react'
import { content, summaryDetails } from '../content'
import { CalendarIcon, CheckIcon, ClockIcon, PinIcon } from './Icons'

const FALLBACK_TELEGRAM_URL = 'https://t.me/PLACEHOLDER_SUPPORT_HANDLE'
const REDIRECT_SECONDS = 4
const SUMMARY_ICONS = [CalendarIcon, ClockIcon, PinIcon]

function telegramUrl(): string {
  const url = import.meta.env.VITE_TELEGRAM_BOT_URL
  if (url) return url
  console.warn(`VITE_TELEGRAM_BOT_URL is not set. Falling back to ${FALLBACK_TELEGRAM_URL}.`)
  return FALLBACK_TELEGRAM_URL
}

export function Confirmation({ firstName }: { firstName: string }) {
  const copy = content.confirmation
  const [url] = useState(telegramUrl)
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) {
      window.location.href = url
      return
    }
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [secondsLeft, url])

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(55% 45% at 50% 0%, rgba(255, 69, 33, 0.07) 0%, rgba(255, 69, 33, 0) 70%)' }}
      />
      <div className="container-page relative py-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center">
          <CheckIcon className="mx-auto h-10 w-10 text-brand-orange" />
          <p className="eyebrow mt-6">{copy.eyebrow}</p>
          <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-3xl font-bold outline-none sm:text-4xl">
            {copy.heading(firstName)}
          </h1>
          <p className="mt-5 text-text-muted sm:text-lg">{copy.text}</p>

          <a href={url} rel="noopener" className="btn-primary mt-8 w-full sm:w-auto sm:px-10">
            {copy.button}
          </a>
          {secondsLeft > 0 && (
            <p className="mt-4 text-sm text-text-primary" aria-live="off">
              {copy.countdown(secondsLeft)}
            </p>
          )}
          <p className="mt-2 text-sm text-text-muted">{copy.fallback}</p>

          <dl className="mt-10 grid gap-5 rounded-card bg-white p-6 text-left shadow-[0_30px_80px_-24px_rgba(0,0,0,0.65)] sm:grid-cols-3 sm:gap-4">
            {summaryDetails.map((item, i) => {
              const Icon = SUMMARY_ICONS[i]
              return (
                <div key={item.label} className="flex items-start gap-3 sm:flex-col sm:gap-2">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange sm:mt-0" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">{item.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </main>
  )
}
