import CheckIcon from './CheckIcon.jsx'
import { endingsWord, isBranching, isCompleted } from '../lib/stories.js'
import './PosterCard.css'

// One story on a shelf. Click opens details (pop-up arrives in step 8).
function PosterCard({ story, progress, onOpen }) {
  const endings = progress?.endingsReached.length ?? 0
  const soon = story.status === 'coming_soon'

  return (
    <button type="button" className="poster-card" onClick={() => onOpen(story)}>
      <span className="poster-frame">
        <img src={story.poster} alt="" width="800" height="1200" loading="lazy" />
        <span className="poster-badges">
          {soon && <span className="badge badge-soon">Coming soon</span>}
          {!soon && story.isNew && !progress && <span className="badge badge-new">New</span>}
        </span>
        {isBranching(story) && endings > 0 && (
          <span className="badge badge-endings">
            {endings} of {story.endingsTotal} {endingsWord(story)}
          </span>
        )}
        {!isBranching(story) && isCompleted(progress) && (
          <span className="badge badge-endings">
            Completed <CheckIcon />
          </span>
        )}
      </span>
      <span className="poster-title">{story.title}</span>
      {story.tagline && <span className="poster-tagline">{story.tagline}</span>}
      {story.skills?.length > 0 && <span className="poster-skills">{story.skills.join(' · ')}</span>}
    </button>
  )
}

export default PosterCard
