import { useEffect, useRef } from 'react'
import CheckIcon from './CheckIcon.jsx'
import { endingsWord, isBranching, isCompleted, playLabel } from '../lib/stories.js'
import './Dialog.css'
import './StoryModal.css'

// Story details. Native <dialog> gives Esc-to-close, a focus trap and an inert page.
function StoryModal({ story, themes, progress, signedIn, onSignIn, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (story && !dialog.open) dialog.showModal()
    if (!story && dialog.open) dialog.close()
  }, [story])

  const soon = story?.status === 'coming_soon'
  const found = progress?.endingsReached.length ?? 0
  const branching = story ? isBranching(story) : false

  return (
    <dialog
      ref={ref}
      className="app-dialog story-modal"
      aria-labelledby="story-modal-title"
      onClose={onClose}
      // Click on the backdrop (the dialog itself, outside the panel) closes
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      {story && (
        <div className="modal-panel">

          <div className="modal-poster">
            <img src={story.poster} alt="" width="800" height="1200" />
          </div>

          <div className="modal-body">
            <h2 id="story-modal-title">{story.title}</h2>
            <p className="modal-tagline">{story.tagline}</p>
            <p className="modal-synopsis">{story.synopsis}</p>

            <ul className="modal-facts">
              <li className={soon ? '' : 'is-playable'}>{soon ? 'Coming soon' : 'Playable now'}</li>
              {story.durationMin && <li>{story.durationMin} min</li>}
              {branching && (
                <li>
                  {story.endingsTotal} {endingsWord(story)}
                </li>
              )}
              {story.themes.map((t) => (
                <li key={t}>{themes[t]}</li>
              ))}
            </ul>

            {branching && found > 0 && (
              <div className="modal-endings">
                <span className="ending-dots" aria-hidden="true">
                  {Array.from({ length: story.endingsTotal }, (_, i) => (
                    <span key={i} className={i < found ? 'is-found' : ''} />
                  ))}
                </span>
                You have found {found} of {story.endingsTotal} {endingsWord(story)}
              </div>
            )}

            {!branching && isCompleted(progress) && (
              <div className="modal-endings">
                Completed <CheckIcon />
              </div>
            )}

            <div className="modal-actions">
              {soon ? (
                <button type="button" className="btn btn-ghost" disabled>
                  Coming soon
                </button>
              ) : (
                <a className="btn btn-primary" href={story.url} autoFocus>
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
                  </svg>
                  {playLabel(progress)}
                </a>
              )}
            </div>

            {!soon && !signedIn && (
              <p className="modal-guest">
                Playing as a guest.{' '}
                <button type="button" className="link-btn" onClick={onSignIn}>
                  Sign in
                </button>{' '}
                to save your progress.
              </p>
            )}
          </div>
          {/* Last in DOM so the dialog focuses the main field/action first */}
          <button type="button" className="dialog-close" aria-label="Close" onClick={() => ref.current.close()}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  )
}

export default StoryModal
