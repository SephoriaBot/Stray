import { Link } from 'react-router-dom'

const signs = [
  'Hit by a car, or fell from a height',
  'Bleeding that does not stop',
  'Struggling to breathe, gasping, or breathing with its mouth open (cats)',
  'Unconscious, or cannot be woken',
  'Having a seizure, or has collapsed',
  'Cannot stand or walk, or is dragging a leg',
  'A hard, swollen belly, or vomiting again and again',
  'Heavy panting, drooling, or collapse in the heat',
  'Drooling, shaking, or vomiting after it may have eaten poison',
  'A visible broken bone or a deep wound',
  'A puppy or kitten that is cold and limp',
  'Trapped or stuck',
]

const steps = [
  {
    title: 'Keep yourself safe',
    text: 'Hurt and scared animals can bite or scratch, even gentle ones. Do not corner it. If it is in traffic, make sure you are safe first. If it is acting aggressive or strange, or is a wild animal, stay back and call animal control.',
  },
  {
    title: 'Call for help',
    text: 'Call animal control, the police non-emergency line, or an emergency vet. Tell them exactly where the animal is, what it looks like, and what is wrong. Stay nearby if it is safe.',
  },
  {
    title: 'Move it only if you can do so safely',
    text: 'Wrap it in a towel or blanket and lower it into a box or carrier. Support its whole body and move it as little as you can. If it may have a neck or back injury, slide it flat onto a board or blanket.',
  },
  {
    title: 'Slow heavy bleeding',
    text: 'Press a clean cloth gently on the wound. Do not pull out anything stuck in it.',
  },
  {
    title: 'Keep it warm and calm',
    text: 'Cover it with a blanket and keep it somewhere quiet and dim. If it is overheated, move it to shade and cool it with cool water, not ice-cold water.',
  },
  {
    title: 'Get it to a vet',
    text: 'Call ahead so the clinic is ready, and ask what they do for stray animals.',
  },
]

const donts = [
  'Do not give human medicine.',
  'Do not give food or water to a badly hurt animal. It may need surgery.',
  'Do not try to make it vomit.',
  'Do not chase or grab it.',
  'Do not leave it in a hot car.',
]

export default function Emergency() {
  return (
    <main className="page">
      <h1 className="title">Emergency steps</h1>
      <p className="lead">Stay calm. Your safety comes first, then the animal's.</p>

      <p className="callout">If a person is hurt or in danger, call 911.</p>

      <h2 className="section-heading">It is an emergency if the animal is:</h2>
      <ul className="check-list">
        {signs.map((sign) => (
          <li key={sign}>{sign}</li>
        ))}
      </ul>
      <p className="note">Not sure? Treat it as an emergency and call a vet.</p>

      <h2 className="section-heading">What to do</h2>
      <ol className="steps">
        {steps.map((step) => (
          <li key={step.title}>
            <span className="step-title">{step.title}</span>
            <span className="step-text">{step.text}</span>
          </li>
        ))}
      </ol>

      <h2 className="section-heading">Please do not</h2>
      <ul className="check-list">
        {donts.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="section-heading">Think it was poisoned?</h2>
      <p className="note">Both lines are open 24 hours. A fee may apply.</p>
      <ul className="link-list">
        <li>
          <a href="tel:+18884264435">
            <span className="link-title">ASPCA Animal Poison Control Center</span>
            <span className="link-desc">(888) 426-4435</span>
          </a>
        </li>
        <li>
          <a href="tel:+18557647661">
            <span className="link-title">Pet Poison Helpline</span>
            <span className="link-desc">(855) 764-7661</span>
          </a>
        </li>
      </ul>

      <p className="note">
        This is general guidance and does not replace a vet.{' '}
        <Link to="/shelters" className="text-link">Find shelters near you</Link>
      </p>
    </main>
  )
}
