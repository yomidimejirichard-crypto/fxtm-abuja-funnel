import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { content, EXPERIENCE_OPTIONS } from '../content'
import { submitRegistration } from '../lib/submit'
import { firstNameOf, isValidEmail, isValidFullName, normaliseNigerianPhone } from '../lib/validation'

type TextField = 'fullName' | 'email' | 'phone' | 'experience'
type Field = TextField | 'terms'
type Values = Record<TextField, string> & { terms: boolean; hp_website_confirm: string }
type Errors = Partial<Record<Field, string>>

const FIELD_ORDER: Field[] = ['fullName', 'email', 'phone', 'experience', 'terms']
// A filled honeypot only counts as a bot when the submit lands this soon after page load.
const HONEYPOT_WINDOW_MS = 2000
const copy = content.form

export const FULL_NAME_INPUT_ID = 'fullName'

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (!isValidFullName(values.fullName)) errors.fullName = copy.errors.fullName
  if (!isValidEmail(values.email)) errors.email = copy.errors.email
  if (!normaliseNigerianPhone(values.phone)) errors.phone = copy.errors.phone
  if (!(EXPERIENCE_OPTIONS as readonly string[]).includes(values.experience)) errors.experience = copy.errors.experience
  if (!values.terms) errors.terms = copy.errors.terms
  return errors
}

interface Props {
  onRegistered: (firstName: string) => void
}

export function RegistrationForm({ onRegistered }: Props) {
  const [values, setValues] = useState<Values>({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    terms: false,
    hp_website_confirm: '',
  })
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const inFlight = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  const errors = validate(values)
  const visibleError = (field: Field) => (touched[field] || submitAttempted ? errors[field] : undefined)

  const update = (field: TextField | 'hp_website_confirm') => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const blur = (field: Field) => () => setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inFlight.current) return
    setSubmitAttempted(true)

    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    inFlight.current = true
    setSubmitting(true)
    const firstName = firstNameOf(values.fullName)
    const consentTimestamp = new Date().toISOString()

    // Honeypot: browser autofill can fill the hidden field for real people, so it only counts as an
    // automated submission when the form is also submitted too fast. Fake success, send nothing.
    const msSinceLoad = Math.round(performance.now())
    if (values.hp_website_confirm.trim() !== '' && msSinceLoad < HONEYPOT_WINDOW_MS) {
      console.info('Honeypot triggered. Registration not sent.', { msSinceLoad })
      onRegistered(firstName)
      return
    }

    await submitRegistration({
      fullName: values.fullName.trim().replace(/\s+/g, ' '),
      email: values.email.trim(),
      phone: normaliseNigerianPhone(values.phone) as string,
      experienceLevel: values.experience,
      consent: true,
      consentText: copy.terms,
      consentTimestamp,
    })
    onRegistered(firstName)
  }

  const termsError = visibleError('terms')

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-5" aria-describedby="form-subtext">
      <Field id={FULL_NAME_INPUT_ID} label={copy.fullName.label} error={visibleError('fullName')}>
        {(a11y) => (
          <input
            {...a11y}
            name="fullName"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            placeholder={copy.fullName.placeholder}
            value={values.fullName}
            onChange={update('fullName')}
            onBlur={blur('fullName')}
            className="field-input"
          />
        )}
      </Field>

      <Field id="email" label={copy.email.label} error={visibleError('email')}>
        {(a11y) => (
          <input
            {...a11y}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={copy.email.placeholder}
            value={values.email}
            onChange={update('email')}
            onBlur={blur('email')}
            className="field-input"
          />
        )}
      </Field>

      <Field id="phone" label={copy.phone.label} error={visibleError('phone')}>
        {(a11y) => (
          <input
            {...a11y}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={copy.phone.placeholder}
            value={values.phone}
            onChange={update('phone')}
            onBlur={blur('phone')}
            className="field-input"
          />
        )}
      </Field>

      <Field id="experience" label={copy.experience.label} error={visibleError('experience')}>
        {(a11y) => (
          <div className="relative">
            <select
              {...a11y}
              name="experience"
              value={values.experience}
              onChange={update('experience')}
              onBlur={blur('experience')}
              className={`field-input cursor-pointer appearance-none pr-11 ${values.experience ? '' : 'text-ink-placeholder'}`}
            >
              <option value="" disabled>
                {copy.experience.placeholder}
              </option>
              {EXPERIENCE_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-white text-ink">
                  {option}
                </option>
              ))}
            </select>
            {/* CSS chevron, not an icon file */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-3/4 rotate-45 border-b-[1.75px] border-r-[1.75px] border-ink-muted"
            />
          </div>
        )}
      </Field>

      {/* Honeypot. Hidden from people and assistive tech; automated submitters tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="hp_website_confirm">Leave this field empty</label>
        <input
          id="hp_website_confirm"
          name="hp_website_confirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={values.hp_website_confirm}
          onChange={update('hp_website_confirm')}
        />
      </div>

      <div>
        {/* The whole label is the tap target (min 44px tall). */}
        <label htmlFor="terms" className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm text-ink-muted">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            checked={values.terms}
            onChange={(e) => {
              const checked = e.target.checked
              setValues((prev) => ({ ...prev, terms: checked }))
              setTouched((prev) => ({ ...prev, terms: true }))
            }}
            aria-invalid={Boolean(termsError)}
            aria-describedby={termsError ? 'terms-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-brand-orange"
          />
          <span>{copy.terms}</span>
        </label>
        {termsError && (
          <p id="terms-error" className="mt-1 text-sm text-error-light">
            {termsError}
          </p>
        )}
        <a
          href="/privacy.html"
          target="_blank"
          rel="noopener"
          className="ml-8 inline-flex min-h-11 items-center text-sm text-brand-orange-deep underline underline-offset-2"
        >
          {copy.privacyLink}
        </a>
      </div>

      <div>
        <button id="fxtm-register-submit" type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? copy.buttonBusy : copy.button}
        </button>
        <p className="mt-3 text-sm text-ink-muted">{copy.belowButton}</p>
      </div>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  error?: string
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string; required: true }) => ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': error ? errorId : undefined, required: true })}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-error-light">
          {error}
        </p>
      )}
    </div>
  )
}
