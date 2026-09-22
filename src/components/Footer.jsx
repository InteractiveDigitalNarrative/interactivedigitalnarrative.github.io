import BranchMark from './BranchMark.jsx'
import './Footer.css'

const EXPLORE = [
  ['Featured story', '#main'],
  ['New & coming soon', '#shelf-new'],
  ['Browse by theme', '#shelf-theme'],
]

function Footer() {
  return (
    <footer className="site-footer">
      {/* Chapter-end ornament: hairline, small diamond, hairline */}
      <div className="footer-ornament" aria-hidden="true">
        <span />
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M7 1.5 12.5 7 7 12.5 1.5 7z" fill="none" stroke="var(--thread-gold)" strokeWidth="1.25" />
        </svg>
        <span />
      </div>

      <div className="footer-main">
        <div className="footer-statement">
          <p className="footer-line">
            Stories you <em>step into.</em>
          </p>
          <p className="footer-about">
            IDN Library gathers interactive digital narratives: short stories you take part in, not just read.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <p className="footer-nav-title">Explore</p>
          <ul>
            {EXPLORE.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-base">
        <a className="footer-brand" href="/" aria-label="IDN Library home">
          <BranchMark size={20} />
          <span>
            IDN <em>Library</em>
          </span>
        </a>
        <p className="footer-demo">
          <span className="demo-dot" aria-hidden="true" />
          Demo build · sign-in and progress stay on this device
        </p>
        <p className="footer-copy">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
