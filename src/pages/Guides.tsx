const topics = [
  'What to do first',
  'Who to call',
  'Make a temporary shelter',
  'Food and water',
  'Signs of an emergency',
]

export default function Guides() {
  return (
    <main className="page">
      <h1 className="title">Guides</h1>
      <p className="lead">These guides are being written. Here is what is planned.</p>
      <ul className="plain-list">
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </main>
  )
}
