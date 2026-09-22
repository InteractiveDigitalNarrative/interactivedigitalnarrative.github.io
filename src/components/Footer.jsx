import BranchMark from './BranchMark.jsx'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <BranchMark size={22} />
        <p>
          <strong>IDN Library</strong> — interactive digital narratives. Every choice opens a different path.
        </p>
      </div>
      <p className="footer-note">
        Demo build. Sign-in and progress are stored on this device only; nothing is sent anywhere.
      </p>
    </footer>
  )
}

export default Footer
