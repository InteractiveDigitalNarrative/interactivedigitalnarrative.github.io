import './SectionHeading.css'

// Heading with the "branching path" rule under it: a line that forks,
// the gold branch taken, the teal one left behind.
function SectionHeading({ id, children }) {
  return (
    <div className="section-heading">
      <h2 id={id}>{children}</h2>
      <svg className="branch-rule" viewBox="0 0 240 24" fill="none" aria-hidden="true">
        <path className="branch-rule-trunk" d="M1 12h150" />
        <path className="branch-rule-taken" d="M150 12c24 0 28-9 52-9h36" />
        <path className="branch-rule-other" d="M150 12c24 0 28 9 52 9h14" />
        <circle className="branch-rule-knot" cx="150" cy="12" r="3" />
      </svg>
    </div>
  )
}

export default SectionHeading
