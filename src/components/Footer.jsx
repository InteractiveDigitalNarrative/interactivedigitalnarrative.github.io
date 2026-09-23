import BranchMark from './BranchMark.jsx'
import './Footer.css'

const EXPLORE = [
  ['Featured story', '#main'],
  ['New & coming soon', '#shelf-new'],
  ['Browse by crisis', '#shelf-theme'],
]

function Footer() {
  return (
    <footer className="site-footer">
      {/* Signage rule: short orange bar, then a hairline */}
      <div className="footer-ornament" aria-hidden="true">
        <span className="footer-bar" />
        <span />
      </div>

      <div className="footer-main">
        <div className="footer-statement">
          <p className="footer-line">
            Prepare for the crisis <em>before it comes.</em>
          </p>
          <p className="footer-about">
            Short interactive stories where you rehearse what to do in an emergency, so you are prepared when it
            really happens.
          </p>
          <p className="footer-112">
            In an emergency, call <a href="tel:112">112</a>
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
        <a className="footer-brand" href="/" aria-label="Crisis Preparedness Library home">
          <BranchMark size={20} />
          <span>
            Crisis Preparedness <em>Library</em>
          </span>
        </a>
        <p className="footer-demo">
          <span className="demo-dot" aria-hidden="true" />
          Demo build · sign-in and progress stay on this device
        </p>
        <a className="footer-site" href="https://designstudio.ardin.online" target="_blank" rel="noopener">
          designstudio.ardin.online
        </a>
        <p className="footer-copy">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
