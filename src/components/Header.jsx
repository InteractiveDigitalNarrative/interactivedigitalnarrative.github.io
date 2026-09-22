import { useEffect, useState } from 'react'
import BranchMark from './BranchMark.jsx'
import './Header.css'

function Header({ onSignIn }) {
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
      <button type="button" className="btn btn-ghost header-signin" onClick={onSignIn}>
        Sign in
      </button>
    </header>
  )
}

export default Header
