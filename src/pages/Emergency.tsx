import { Link } from 'react-router-dom'

export default function Emergency() {
  return (
    <main className="page">
      <h1 className="title">Emergency steps</h1>
      <p className="lead">
        The step-by-step emergency guide is coming next. If a person is in danger, call 911.
      </p>
      <Link to="/" className="text-link">Back to home</Link>
    </main>
  )
}
