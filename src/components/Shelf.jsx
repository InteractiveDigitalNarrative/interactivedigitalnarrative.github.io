import { Children, useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import './Shelf.css'

// Horizontal row of cards: swipe on touch, arrow buttons with a mouse.
function Shelf({ id, title, controls, children }) {
  const rowRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })
  const count = Children.count(children)

  useEffect(() => {
    const row = rowRef.current
    const update = () =>
      setEdges({
        start: row.scrollLeft <= 4,
        end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 4,
      })
    update()
    row.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(row)
    return () => {
      row.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [count])

  const scroll = (dir) =>
    rowRef.current.scrollBy({ left: dir * rowRef.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section className="shelf" aria-labelledby={id}>
      <div className="shelf-head">
        <SectionHeading id={id}>{title}</SectionHeading>
        {!(edges.start && edges.end) && (
          <div className="shelf-arrows">
            <button type="button" aria-label={`Scroll ${title} back`} disabled={edges.start} onClick={() => scroll(-1)}>
              <Chevron dir="left" />
            </button>
            <button type="button" aria-label={`Scroll ${title} forward`} disabled={edges.end} onClick={() => scroll(1)}>
              <Chevron dir="right" />
            </button>
          </div>
        )}
      </div>
      {controls}
      <ul className="shelf-row" ref={rowRef}>
        {children}
      </ul>
    </section>
  )
}

function Chevron({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M11 3.5 5.5 9l5.5 5.5' : 'M7 3.5 12.5 9 7 14.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Shelf
