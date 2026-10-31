import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="page">
      <h1 className="title">Found an animal that needs help?</h1>
      <p className="lead">
        Tell us what is happening and we will walk you through the next step.
      </p>

      <Link to="/emergency" className="emergency-button">
        <span className="emergency-title">It is hurt or in danger</span>
        <span className="emergency-sub">Open the emergency steps</span>
      </Link>

      <h2 className="section-title">If it is not an emergency</h2>
      <ul className="link-list">
        <li>
          <Link to="/guides/what-to-do-first">
            <span className="link-title">What to do first</span>
            <span className="link-desc">Approach safely, look for a collar, and decide your next step.</span>
          </Link>
        </li>
        <li>
          <Link to="/guides">
            <span className="link-title">All guides</span>
            <span className="link-desc">Shelters, food, who to call, and more as they are added.</span>
          </Link>
        </li>
        <li>
          <Link to="/shelters">
            <span className="link-title">Find shelters near you</span>
            <span className="link-desc">Phone numbers, addresses, and hours.</span>
          </Link>
        </li>
      </ul>
    </main>
  )
}
