import './SkillTags.css'

// What a story trains, e.g. "Water · Light & radio". Plain list for screen readers.
function SkillTags({ skills, label = 'Skills you practise' }) {
  if (!skills?.length) return null
  return (
    <ul className="skill-tags" aria-label={label}>
      {skills.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  )
}

export default SkillTags
