import { useEffect, useRef, useState } from 'react'
import { signIn } from '../lib/storage.js'
import './Dialog.css'
import './SignInModal.css'

// Mock sign-in: email → pretend magic link → signed in. Nothing is sent anywhere.
function SignInModal({ open, onClose, onSetUpProfile }) {
  const ref = useRef(null)
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const close = () => ref.current.close()

  const handleClose = () => {
    setStep('email')
    onClose()
  }

  return (
    <dialog
      ref={ref}
      className="app-dialog sign-in-modal"
      aria-labelledby="sign-in-title"
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && close()}
    >
      {open && (
        <div className="sign-in-panel">
          <p className="demo-tag">Demo</p>

          {step === 'email' && (
            <form
              className="sign-in-step"
              onSubmit={(e) => {
                e.preventDefault()
                setEmail(email.trim())
                setStep('sent')
              }}
            >
              <h2 id="sign-in-title">Sign in to save your story</h2>
              <p className="sign-in-lead">Keep your progress across every story in the library.</p>
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-primary sign-in-submit">
                Send magic link
              </button>
              <p className="demo-note">Demo: no email is sent. Everything is stored on this device only.</p>
            </form>
          )}

          {step === 'sent' && (
            <div className="sign-in-step">
              <MailIcon />
              <h2 id="sign-in-title">Check your inbox</h2>
              <p className="sign-in-lead">
                We would send a sign-in link to <strong>{email}</strong>. In this demo, open it here instead.
              </p>
              <button
                type="button"
                className="btn btn-primary sign-in-submit"
                autoFocus
                onClick={() => {
                  signIn(email)
                  setStep('done')
                }}
              >
                Open magic link (demo)
              </button>
              <button type="button" className="text-btn" onClick={() => setStep('email')}>
                Use a different email
              </button>
            </div>
          )}

          {step === 'done' && (
            <div className="sign-in-step">
              <h2 id="sign-in-title">You are signed in</h2>
              <p className="sign-in-lead">
                Your progress will now be saved on this device as <strong>{email}</strong>.
              </p>
              <button
                type="button"
                className="btn btn-primary sign-in-submit"
                autoFocus
                onClick={() => {
                  close()
                  onSetUpProfile()
                }}
              >
                Set up your profile
              </button>
              <button type="button" className="text-btn" onClick={close}>
                Skip for now
              </button>
            </div>
          )}
          {/* Last in DOM so the dialog focuses the main field/action first */}
          <button type="button" className="dialog-close" aria-label="Close" onClick={close}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  )
}

function MailIcon() {
  return (
    <svg className="mail-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="12" width="36" height="26" rx="3" stroke="var(--paper-dim)" strokeWidth="2" />
      <path d="M7 14l17 13 17-13" stroke="var(--signal)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export default SignInModal
