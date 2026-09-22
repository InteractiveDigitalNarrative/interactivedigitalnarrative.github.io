import { useEffect, useState } from 'react'
import BranchMark from './BranchMark.jsx'
import './Header.css'

function Header({ session, profile, onSignIn, onProfile, onSignOut }) {
  const name = profile?.nickname || session?.email

  const [scrolled, setScrolled] = useState(false)

  // Transparent over the hero, solid once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="/" aria-label="IDN Library home">
        <BranchMark />
        <span className="brand-name">
          IDN <em>Library</em>
        </span>
      </a>
      <nav className="header-nav" aria-label="Main">
        <a href="#stories">Stories</a>
      </nav>
      {session ? (
        <>
          <button type="button" className="account-btn" popoverTarget="account-menu" aria-label="Account menu">
            <span className="avatar" aria-hidden="true">
              {name?.[0]?.toUpperCase() ?? '?'}
            </span>
          </button>
          <div id="account-menu" className="account-menu" popover="auto">
            {profile?.nickname && <p className="account-hello">Hi, {profile.nickname}</p>}
            <p className="account-label">Signed in as</p>
            <p className="account-email">{session.email}</p>
            <button
              type="button"
              className="btn btn-ghost account-action"
              onClick={() => {
                document.getElementById('account-menu').hidePopover()
                onProfile()
              }}
            >
              Edit profile
            </button>
            <button
              type="button"
              className="btn btn-ghost account-action"
              onClick={() => {
                document.getElementById('account-menu').hidePopover()
                onSignOut()
              }}
            >
              Sign out
            </button>
            <p className="account-note">Signing out clears your demo progress on this device.</p>
          </div>
        </>
      ) : (
        <button type="button" className="btn btn-ghost header-signin" onClick={onSignIn}>
          Sign in
        </button>
      )}
    </header>
  )
}

export default Header
