export default function Shelters() {
  return (
    <main className="page">
      <h1 className="title">Find shelters near you</h1>
      <p className="lead">
        Search by ZIP code to see nearby shelters with their phone numbers and hours. Search is coming next.
      </p>
      <label className="field-label" htmlFor="zip">ZIP code</label>
      <div className="field-row">
        <input id="zip" className="field" inputMode="numeric" placeholder="23220" disabled />
        <button className="button" disabled>Search</button>
      </div>
    </main>
  )
}
