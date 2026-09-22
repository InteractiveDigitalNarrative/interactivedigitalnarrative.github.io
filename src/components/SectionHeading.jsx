import './SectionHeading.css'

// Heading with a book-style rule under it: small diamond, then a hairline
// that ends where the heading text ends (matches the footer ornament).
function SectionHeading({ id, children }) {
  return (
    <div className="section-heading">
      <h2 id={id}>{children}</h2>
      <span className="heading-rule" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 1 9 5 5 9 1 5z" />
        </svg>
        <span className="heading-rule-line" />
      </span>
    </div>
  )
}

export default SectionHeading
