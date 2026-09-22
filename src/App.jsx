import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SectionHeading from './components/SectionHeading.jsx'
import './App.css'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to stories</a>
      <Header onSignIn={() => {}} />
      <main id="main" className="page-main">
        {/* Hero (step 7) goes here */}
        <section className="shelf-placeholder" aria-labelledby="stories">
          <SectionHeading id="stories">Stories where you choose</SectionHeading>
          <p className="placeholder-note">Shelves arrive in step 7.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
