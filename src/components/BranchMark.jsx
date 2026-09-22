// Brand mark: an orange signal badge holding one path that splits in two —
// the chosen branch solid, the other faded.
function BranchMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="var(--signal)" />
      <path d="M5 16h8" stroke="var(--on-signal)" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M13 16c4.5 0 5.5-7 12-7" stroke="var(--on-signal)" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M13 16c4.5 0 5.5 7 12 7" stroke="var(--on-signal)" strokeWidth="2.75" strokeLinecap="round" opacity="0.35" />
      <circle cx="25" cy="9" r="2.75" fill="var(--on-signal)" />
    </svg>
  )
}

export default BranchMark
