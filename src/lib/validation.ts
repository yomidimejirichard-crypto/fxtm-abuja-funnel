const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// 070, 080, 081, 090 or 091 with 11 digits, or 234 / +234 followed by the 10 digits without the leading 0.
const NG_PHONE_RE = /^(?:0|\+?234)((?:70|80|81|90|91)\d{8})$/

export function isValidFullName(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.length >= 3 && trimmed.split(/\s+/).length >= 2
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

/** Returns +234XXXXXXXXXX, or null when the number is not a valid Nigerian mobile. */
export function normaliseNigerianPhone(value: string): string | null {
  const compact = value.replace(/[\s\-().]/g, '')
  const match = NG_PHONE_RE.exec(compact)
  return match ? `+234${match[1]}` : null
}

export function firstNameOf(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? ''
}
