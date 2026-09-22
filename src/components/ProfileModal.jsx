import { useEffect, useRef, useState } from 'react'
import { saveProfile } from '../lib/storage.js'
import { AGE_OPTIONS, COUNTRY_OPTIONS, GENDER_OPTIONS, LANGUAGE_OPTIONS } from '../data/profileOptions.js'
import './Dialog.css'
import './SignInModal.css'
import './ProfileModal.css'

const EMPTY = { nickname: '', age: '', gender: '', language: '', country: '' }

// Edit the shared profile. Every field is optional; stories skip questions answered here.
function ProfileModal({ open, profile, firstTime, onClose }) {
  const ref = useRef(null)
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Start from the saved profile each time the dialog opens (not on every re-read)
  const [wasOpen, setWasOpen] = useState(false)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setForm({ ...EMPTY, ...profile })
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const close = () => ref.current.close()

  return (
    <dialog
      ref={ref}
      className="app-dialog profile-modal"
      aria-labelledby="profile-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
    >
      {open && (
        <form
          className="sign-in-panel profile-form"
          onSubmit={(e) => {
            e.preventDefault()
            saveProfile(form)
            close()
          }}
        >
          <p className="demo-tag">Demo</p>
          <h2 id="profile-title">{firstTime ? 'Tell us a little about you' : 'Your profile'}</h2>
          <p className="sign-in-lead">
            All optional. Stories use this to skip questions you have already answered.
          </p>

          <label className="field">
            <span>Nickname</span>
            <input
              type="text"
              name="nickname"
              maxLength={30}
              autoComplete="nickname"
              placeholder="What should we call you?"
              value={form.nickname}
              onChange={set('nickname')}
            />
          </label>

          <div className="field-row">
            <Select label="Age group" name="age" value={form.age} options={AGE_OPTIONS} onChange={set('age')} />
            <Select label="Gender" name="gender" value={form.gender} options={GENDER_OPTIONS} onChange={set('gender')} />
          </div>
          <div className="field-row">
            <Select
              label="Language"
              name="language"
              value={form.language}
              options={LANGUAGE_OPTIONS}
              onChange={set('language')}
            />
            <Select
              label="Country or region"
              name="country"
              value={form.country}
              options={[['prefer_not_say', 'Prefer not to say'], ...COUNTRY_OPTIONS]}
              onChange={set('country')}
            />
          </div>

          <p className="demo-note">
            Stored on this device only. Your nickname is only used to greet you, never in research data.
          </p>

          <div className="profile-actions">
            <button type="submit" className="btn btn-primary">
              Save profile
            </button>
            <button type="button" className="btn btn-ghost" onClick={close}>
              {firstTime ? 'Skip for now' : 'Cancel'}
            </button>
          </div>

          {/* Last in DOM so the dialog focuses the first field */}
          <button type="button" className="dialog-close" aria-label="Close" onClick={close}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      )}
    </dialog>
  )
}

function Select({ label, name, value, options, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Not set</option>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  )
}

export default ProfileModal
