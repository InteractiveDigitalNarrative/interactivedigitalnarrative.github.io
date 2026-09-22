// Brand mark: one path that splits in two — the chosen branch lit, the other dim.
function BranchMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 16h9" stroke="var(--paper)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M13 16c5 0 6-8 13-8" stroke="var(--thread-gold)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M13 16c5 0 6 8 13 8" stroke="var(--thread-teal)" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <circle cx="26" cy="8" r="2.5" fill="var(--thread-gold)" />
    </svg>
  )
}

export default BranchMark
