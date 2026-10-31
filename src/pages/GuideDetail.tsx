import { Link, useParams } from 'react-router-dom'
import { guides } from '../data/guides'

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>()
  const guide = guides.find((item) => item.slug === slug && item.ready)

  if (!guide) {
    return (
      <main className="page">
        <h1 className="title">Guide not found</h1>
        <p className="lead">This guide is not available yet.</p>
        <Link to="/guides" className="text-link">See all guides</Link>
      </main>
    )
  }

  return (
    <main className="page">
      <h1 className="title">{guide.title}</h1>
      <p className="lead">{guide.intro}</p>
      <p className="note">
        Hurt or in danger? <Link to="/emergency" className="text-link">Open the emergency steps</Link>
      </p>

      {guide.sections.map((section, index) => (
        <section key={index}>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          {section.steps && (
            <ol className="steps">
              {section.steps.map((step) => (
                <li key={step.title}>
                  <span className="step-title">{step.title}</span>
                  <span className="step-text">{step.text}</span>
                </li>
              ))}
            </ol>
          )}
          {section.bullets && (
            <ul className="check-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
          {section.note && <p className="note">{section.note}</p>}
        </section>
      ))}

      <p className="note">
        Rules differ by city and county. Call your local shelter if you are not sure.{' '}
        <Link to="/guides" className="text-link">All guides</Link>
      </p>
    </main>
  )
}
