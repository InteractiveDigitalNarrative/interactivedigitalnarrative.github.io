import './SectionHeading.css'

// Heading with a short signal bar above it, like a sign header.
function SectionHeading({ id, children }) {
  return (
    <div className="section-heading">
      <span className="heading-bar" aria-hidden="true" />
      <h2 id={id}>{children}</h2>
    </div>
  )
}

export default SectionHeading
