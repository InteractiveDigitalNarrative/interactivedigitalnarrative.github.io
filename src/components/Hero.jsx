import { endingsWord, isBranching } from '../lib/stories.js'
import './Hero.css'

// Featured story: full-bleed key art with a slow zoom, title and actions.
function Hero({ story, themeLabel, progress, onMoreInfo }) {
  const meta = [
    story.durationMin && `${story.durationMin} min`,
    isBranching(story) && `${story.endingsTotal} ${endingsWord(story)}`,
    themeLabel,
  ].filter(Boolean)

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <img
          className="hero-art"
          src={story.hero}
          alt=""
          width="1920"
          height="1080"
          fetchPriority="high"
        />
      </div>
      <div className="hero-content">
        <h1 id="hero-title">{story.title}</h1>
        <p className="hero-tagline">{story.tagline}</p>
        <p className="hero-meta">{meta.join(' · ')}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={story.url}>
            <PlayIcon />
            {progress?.status === 'in_progress' ? 'Continue' : 'Play'}
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => onMoreInfo(story)}>
            More info
          </button>
        </div>
      </div>
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
    </svg>
  )
}

export default Hero
