import { content } from '../content'
import { CalendarIcon, ClockIcon, PinIcon } from './Icons'
import { RegistrationForm } from './RegistrationForm'

const CHIP_ICONS = [CalendarIcon, ClockIcon, PinIcon]

export const REGISTER_SECTION_ID = 'register'

interface Props {
  onRegistered: (firstName: string) => void
}

export function Hero({ onRegistered }: Props) {
  const { hero, form } = content
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Very subtle radial glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 20% 0%, rgba(255, 69, 33, 0.07) 0%, rgba(255, 69, 33, 0) 70%), radial-gradient(50% 50% at 85% 30%, rgba(255, 255, 255, 0.025) 0%, rgba(255, 255, 255, 0) 70%)',
        }}
      />
      <div className="container-page relative grid gap-10 pb-16 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pb-24 lg:pt-24">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <div aria-hidden="true" className="mt-4 h-px w-12 bg-brand-orange" />
          <h1 id="hero-heading" className="h1 mt-5 text-white">
            {hero.h1}
          </h1>
          <p className="mt-5 max-w-xl text-base text-text-muted sm:text-lg">{hero.subheadline}</p>
          <ul className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            {hero.chips.map((chip, i) => {
              const Icon = CHIP_ICONS[i]
              return (
                <li
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-control border border-border bg-surface-1 px-3 py-2 text-sm font-medium text-text-primary"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand-orange" />
                  {chip}
                </li>
              )
            })}
          </ul>
        </div>

        <div
          id={REGISTER_SECTION_ID}
          className="relative scroll-mt-6 overflow-hidden rounded-card bg-white p-5 [color-scheme:light] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.65)] sm:p-8"
        >
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" />
          <h2 className="text-2xl font-semibold text-ink">{form.heading}</h2>
          <p id="form-subtext" className="mt-1 text-sm text-ink-muted">
            {form.subtext}
          </p>
          <div aria-hidden="true" className="my-5 h-px bg-light-border" />
          <RegistrationForm onRegistered={onRegistered} />
        </div>
      </div>
    </section>
  )
}
