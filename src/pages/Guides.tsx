import { Link } from 'react-router-dom'
import { guides } from '../data/guides'

const readyGuides = guides.filter((guide) => guide.ready)
const plannedGuides = guides.filter((guide) => !guide.ready)

export default function Guides() {
  return (
    <main className="page">
      <h1 className="title">Guides</h1>
      <p className="lead">Plain steps for helping an animal that is not in an emergency.</p>

      <ul className="link-list">
        {readyGuides.map((guide) => (
          <li key={guide.slug}>
            <Link to={'/guides/' + guide.slug}>
              <span className="link-title">{guide.title}</span>
              <span className="link-desc">{guide.summary}</span>
            </Link>
          </li>
        ))}
      </ul>

      {plannedGuides.length > 0 && (
        <>
          <h2 className="section-title">Coming soon</h2>
          <ul className="plain-list">
            {plannedGuides.map((guide) => (
              <li key={guide.slug}>{guide.title}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
