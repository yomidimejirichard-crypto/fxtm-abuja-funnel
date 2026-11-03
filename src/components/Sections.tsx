import { content } from '../content'
import { FULL_NAME_INPUT_ID } from './RegistrationForm'
import { REGISTER_SECTION_ID } from './Hero'
import { CalendarIcon, ClockIcon, PinIcon, UsersIcon } from './Icons'

const DETAIL_ICONS = [CalendarIcon, ClockIcon, PinIcon, UsersIcon]

export function DetailStrip() {
  return (
    <section aria-label="Event details" className="border-y border-border bg-surface-1">
      <dl className="container-page grid grid-cols-2 gap-x-4 gap-y-8 py-10 md:grid-cols-4 md:gap-8 lg:py-12">
        {content.details.map((item, i) => {
          const Icon = DETAIL_ICONS[i]
          return (
            <div key={item.label} className="flex min-w-0 flex-col gap-3 md:border-l md:border-border md:pl-6 md:first:border-l-0 md:first:pl-0">
              <Icon className="h-5 w-5 text-brand-orange" />
              <div className="min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">{item.label}</dt>
                <dd className="mt-1 text-base font-medium text-white">{item.value}</dd>
              </div>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

interface SectionHeaderProps {
  id: string
  eyebrow: string
  heading: string
  intro?: string
  tone?: 'dark' | 'light'
}

function SectionHeader({ id, eyebrow, heading, intro, tone = 'dark' }: SectionHeaderProps) {
  const light = tone === 'light'
  return (
    <div className="max-w-2xl">
      <p className={light ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</p>
      <h2 id={id} className={`h2 mt-3 ${light ? 'text-ink' : ''}`}>
        {heading}
      </h2>
      {intro && <p className={`mt-4 text-base sm:text-lg ${light ? 'text-ink-muted' : 'text-text-muted'}`}>{intro}</p>}
    </div>
  )
}

export function WhatToExpect() {
  const { expect } = content
  return (
    <section aria-labelledby="expect-heading" className="section bg-light-1">
      <div className="container-page">
        <SectionHeader id="expect-heading" eyebrow={expect.eyebrow} heading={expect.heading} tone="light" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {expect.cards.map((card) => (
            <li key={card.title} className="card-light p-6 shadow-[0_1px_2px_rgba(22,23,31,0.04)] lg:p-7">
              <div aria-hidden="true" className="h-[2px] w-8 bg-brand-orange" />
              <h3 className="mt-5 text-lg text-ink">{card.title}</h3>
              <p className="mt-2 text-ink-muted">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function BeyondTheCharts() {
  const { beyond } = content
  return (
    <section aria-labelledby="beyond-heading" className="section bg-brand-black">
      <div className="container-page">
        <SectionHeader id="beyond-heading" eyebrow={beyond.eyebrow} heading={beyond.heading} intro={beyond.intro} />
        <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {beyond.items.map((item) => (
            <li key={item.title} className="border-l-2 border-brand-orange pl-4">
              <h3 className="text-base">{item.title}</h3>
              <p className="mt-1.5 text-sm text-text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function WhoItsFor() {
  const { audience } = content
  return (
    <section aria-labelledby="audience-heading" className="section bg-white">
      <div className="container-page">
        <SectionHeader id="audience-heading" eyebrow={audience.eyebrow} heading={audience.heading} tone="light" />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {audience.cards.map((card) => (
            <li key={card.title} className="rounded-card border border-light-border bg-light-1 p-6 sm:p-8">
              <h3 className="text-xl text-ink">{card.title}</h3>
              <p className="mt-3 text-ink-muted">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Prizes() {
  const { prizes } = content
  return (
    <section aria-labelledby="prizes-heading" className="bg-white pb-16 lg:pb-24">
      <div className="container-page">
        <div className="rounded-card border-l-brand-orange bg-brand-black px-6 py-8 [border-left-width:3px] sm:px-10 sm:py-10">
          <h2 id="prizes-heading" className="text-2xl sm:text-3xl">
            {prizes.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-text-muted sm:text-lg">{prizes.text}</p>
        </div>
      </div>
    </section>
  )
}

function scrollToForm() {
  const target = document.getElementById(REGISTER_SECTION_ID)
  const input = document.getElementById(FULL_NAME_INPUT_ID)
  if (!target || !input) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  input.focus({ preventScroll: true })
}

export function FinalPush() {
  const { finalPush } = content
  return (
    <section aria-labelledby="final-heading" className="section bg-surface-1">
      <div className="container-page flex flex-col items-center text-center">
        <div aria-hidden="true" className="h-px w-12 bg-brand-orange" />
        <h2 id="final-heading" className="h2 mt-6 max-w-3xl">
          {finalPush.heading}
        </h2>
        <p className="mt-4 max-w-xl text-text-muted sm:text-lg">{finalPush.text}</p>
        <button type="button" onClick={scrollToForm} className="btn-primary mt-8 w-full sm:w-auto sm:px-10">
          {finalPush.button}
        </button>
      </div>
    </section>
  )
}

export function Footer() {
  const { footer } = content
  return (
    <footer className="border-t border-border">
      <div className="container-page py-10">
        <p className="text-sm font-semibold text-white">{footer.line1}</p>
        <p className="mt-3 max-w-3xl text-xs text-text-muted">{footer.line2}</p>
        <a href="/privacy.html" className="mt-3 inline-block text-xs text-brand-orange underline underline-offset-2 hover:text-brand-orange-hover">
          {footer.privacyLink}
        </a>
      </div>
    </footer>
  )
}
