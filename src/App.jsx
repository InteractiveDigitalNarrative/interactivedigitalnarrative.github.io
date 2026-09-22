import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Shelf from './components/Shelf.jsx'
import PosterCard from './components/PosterCard.jsx'
import StoryModal from './components/StoryModal.jsx'
import SignInModal from './components/SignInModal.jsx'
import ProfileModal from './components/ProfileModal.jsx'
import stories from './data/stories.json'
import themes from './data/themes.json'
import { signOut, useLibrary } from './lib/storage.js'
import { isCompleted } from './lib/stories.js'
import './App.css'

const ids = stories.map((s) => s.id)
const featured = stories.find((s) => s.hero)
const themeIds = Object.keys(themes).filter((t) => stories.some((s) => s.themes.includes(t)))

function App() {
  const { session, profile, progress } = useLibrary(ids)
  const [theme, setTheme] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [signingIn, setSigningIn] = useState(false)
  // null = closed, 'first' = offered right after sign-in, 'edit' = from the account menu
  const [profileMode, setProfileMode] = useState(null)

  const openStory = (story) => setOpenId(story.id)
  const openedStory = stories.find((s) => s.id === openId) ?? null

  // Progress only counts when signed in (games write it only then)
  const mine = session ? stories.filter((s) => progress[s.id]) : []
  const continuing = mine
    .filter((s) => progress[s.id].status === 'in_progress')
    .sort((a, b) => progress[b.id].lastPlayedAt.localeCompare(progress[a.id].lastPlayedAt))
  const completed = mine.filter((s) => isCompleted(progress[s.id]))
  const fresh = stories.filter((s) => s.isNew)
  const byTheme = theme ? stories.filter((s) => s.themes.includes(theme)) : stories

  const cards = (list) =>
    list.map((s) => (
      <li key={s.id}>
        <PosterCard story={s} progress={session ? progress[s.id] : null} onOpen={openStory} />
      </li>
    ))

  return (
    <>
      <a className="skip-link" href="#main">Skip to stories</a>
      <Header
        session={session}
        profile={profile}
        onSignIn={() => setSigningIn(true)}
        onProfile={() => setProfileMode('edit')}
        onSignOut={signOut}
      />
      <main id="main">
        <Hero
          story={featured}
          themeLabel={themes[featured.themes[0]]}
          progress={session ? progress[featured.id] : null}
          onMoreInfo={openStory}
        />
        <div className="shelves" id="stories">
          {continuing.length > 0 && (
            <Shelf id="shelf-continue" title="Continue your story">
              {cards(continuing)}
            </Shelf>
          )}
          <Shelf id="shelf-new" title="New & coming soon">
            {cards(fresh)}
          </Shelf>
          <Shelf
            id="shelf-theme"
            title="Browse by crisis"
            controls={
              <div className="chip-row" role="group" aria-label="Filter by crisis type">
                <button type="button" className="chip" aria-pressed={theme === null} onClick={() => setTheme(null)}>
                  All
                </button>
                {themeIds.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="chip"
                    aria-pressed={theme === t}
                    onClick={() => setTheme(t)}
                  >
                    {themes[t]}
                  </button>
                ))}
              </div>
            }
          >
            {cards(byTheme)}
          </Shelf>
          {completed.length > 0 && (
            <Shelf id="shelf-completed" title="Completed">
              {cards(completed)}
            </Shelf>
          )}
        </div>
      </main>
      <Footer />
      <StoryModal
        story={openedStory}
        themes={themes}
        progress={session && openedStory ? progress[openedStory.id] : null}
        signedIn={Boolean(session)}
        onSignIn={() => {
          setOpenId(null)
          setSigningIn(true)
        }}
        onClose={() => setOpenId(null)}
      />
      <SignInModal
        open={signingIn}
        onClose={() => setSigningIn(false)}
        onSetUpProfile={() => setProfileMode('first')}
      />
      <ProfileModal
        open={profileMode !== null}
        profile={profile}
        firstTime={profileMode === 'first'}
        onClose={() => setProfileMode(null)}
      />
    </>
  )
}

export default App
