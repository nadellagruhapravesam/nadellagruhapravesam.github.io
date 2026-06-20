import { useEffect, useState } from 'react'
import { ceremonialHeader, templePillars } from '../assets.js'

const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT

const createEmptyRsvpForm = () => ({
  name: '',
  phone: '',
  attending: '',
  message: '',
  website: '',
})

const NAME_ERROR = 'Please enter your name.'

const ATTENDING_OPTIONS = [
  'Will attend',
  'Maybe',
  'Unable to attend',
]

const SUBMISSION_MESSAGES = {
  success: 'Thank you! Your RSVP has been received.',
  error: 'We couldn’t submit your RSVP. Please check your connection and try again.',
}

const readRsvpFormData = (formElement, attending) => {
  const submittedForm = new FormData(formElement)

  return {
    name: String(submittedForm.get('name') ?? ''),
    phone: String(submittedForm.get('phone') ?? ''),
    attending,
    message: String(submittedForm.get('message') ?? ''),
    website: String(submittedForm.get('website') ?? ''),
  }
}

export default function RSVP() {
  const [form, setForm] = useState(createEmptyRsvpForm)
  const [status, setStatus] = useState('idle')
  const [nameError, setNameError] = useState('')

  useEffect(() => {
    setForm(createEmptyRsvpForm())
    setStatus('idle')
    setNameError('')
  }, [])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setStatus('idle')
    if (field === 'name' && nameError) {
      setNameError('')
    }
  }

  const validateName = (formData) => {
    if (!formData.name.trim()) {
      setNameError(NAME_ERROR)
      return false
    }

    return true
  }

  const submit = async (submitEvent) => {
    submitEvent.preventDefault()
    if (status === 'submitting') return

    const formData = readRsvpFormData(submitEvent.currentTarget, form.attending)

    if (!validateName(formData)) return

    if (!RSVP_ENDPOINT) {
      console.error('Missing VITE_RSVP_ENDPOINT. RSVP submission was not attempted.')
      setStatus('error')
      return
    }

    const payload = new URLSearchParams({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      attending: formData.attending,
      message: formData.message.trim(),
      website: formData.website,
    })

    try {
      setStatus('submitting')
      await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: payload,
      })
      // no-cors makes the Apps Script response opaque; a resolved request only confirms the browser sent it.
      setForm(createEmptyRsvpForm())
      setNameError('')
      setStatus('success')
    } catch (error) {
      console.error('RSVP submission failed.', error)
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'
  const nameErrorId = nameError ? 'rsvp-name-error' : undefined

  return (
    <section id="rsvp" className="rsvp-section section-shell">
      <div className="content-width rsvp-wrap">
        <img src={templePillars} alt="" className="rsvp-pillars" aria-hidden="true" />
        <div className="rsvp-card">
          <img src={ceremonialHeader} alt="" className="rsvp-ornament" aria-hidden="true" />
          <div className="section-heading rsvp-heading">
            <p className="eyebrow">RSVP</p>
            <h2>Will you join us?</h2>
            <p>Your response helps us prepare to welcome everyone comfortably.</p>
          </div>
          <form onSubmit={submit} className="rsvp-form" autoComplete="off" noValidate>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(inputEvent) => updateField('name', inputEvent.target.value)}
                onInvalid={(invalidEvent) => {
                  invalidEvent.preventDefault()
                  setNameError(NAME_ERROR)
                }}
                placeholder="Your name"
                required
                maxLength={100}
                autoComplete="name"
                aria-invalid={nameError ? 'true' : 'false'}
                aria-describedby={nameErrorId}
              />
              {nameError && (
                <span className="rsvp-field-error" id="rsvp-name-error">
                  {nameError}
                </span>
              )}
            </label>

            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(inputEvent) => updateField('phone', inputEvent.target.value)}
                placeholder="Phone number"
                autoComplete="tel"
              />
            </label>

            <fieldset className="attendance-group">
              <legend>Attending</legend>
              <div className="attendance-options">
                {ATTENDING_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={form.attending === option ? 'is-selected' : ''}
                    onClick={() => updateField('attending', option)}
                    aria-pressed={form.attending === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="full-field">
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={(textEvent) => updateField('message', textEvent.target.value)}
                placeholder="Share a message or blessing"
                rows="4"
                autoComplete="off"
              />
            </label>

            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(inputEvent) => updateField('website', inputEvent.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="rsvp-honeypot"
            />

            <button
              type="submit"
              className="ceremonial-button submit-button"
              disabled={isSubmitting}
              formNoValidate
              onClick={(clickEvent) => {
                const clickedForm = clickEvent.currentTarget.form
                if (clickedForm && !validateName(readRsvpFormData(clickedForm, form.attending))) {
                  clickEvent.preventDefault()
                }
              }}
            >
              {isSubmitting ? 'Sending RSVP…' : 'Send RSVP'}
            </button>
            {status === 'success' && (
              <p className="form-note rsvp-status-message" role="status" aria-live="polite">
                {SUBMISSION_MESSAGES.success}
              </p>
            )}
            {status === 'error' && (
              <p className="form-note rsvp-status-message is-error" role="alert">
                {SUBMISSION_MESSAGES.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
