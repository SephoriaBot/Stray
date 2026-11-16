import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { APP_NAME } from '../config'
import '../flyer.css'

type Mode = 'found' | 'lost'

function todayValue() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return d.getFullYear() + '-' + month + '-' + day
}

function prettyDate(value: string) {
  if (!value) return ''
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return ''
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    const words = paragraph.split(' ')
    let line = ''
    for (const word of words) {
      const test = line ? line + ' ' + word : word
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line)
        line = word
      } else {
        line = test
      }
    }
    lines.push(line)
  }
  return lines
}

// Shrinks a big photo so it stays light in memory.
function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the photo.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not open that photo.'))
      img.onload = () => {
        const max = 1200
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not open that photo.'))
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export default function Flyer() {
  const [mode, setMode] = useState<Mode>('found')
  const [animal, setAnimal] = useState('Dog')
  const [petName, setPetName] = useState('')
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState(todayValue())
  const [phone, setPhone] = useState('')
  const [contactName, setContactName] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState('')
  const photoInput = useRef<HTMLInputElement>(null)

  const animalLabel = animal.trim() || 'Pet'
  const heading = (mode === 'found' ? 'FOUND ' : 'LOST ') + animalLabel.toUpperCase()
  const whenText = prettyDate(date)
  const whereLine =
    (mode === 'found' ? 'Found' : 'Last seen') +
    (place.trim() ? ' near ' + place.trim() : '') +
    (whenText ? ' on ' + whenText : '')
  const callLine =
    mode === 'found'
      ? 'Is this your pet? Call or text to describe it and claim it.'
      : 'Please call or text if you have seen this pet.'
  const contactLine = [contactName.trim(), phone.trim()].filter(Boolean).join('  ')
  const nameLine = mode === 'lost' && petName.trim() ? 'Answers to "' + petName.trim() + '"' : ''

  async function onPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    try {
      setPhoto(await readPhoto(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not open that photo.')
    }
  }

  function removePhoto() {
    setPhoto('')
    if (photoInput.current) photoInput.current.value = ''
  }

  function saveImage() {
    setError('')
    const width = 1080
    const height = 1350
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setError('Your browser could not make the image. Try the print button instead.')
      return
    }

    const draw = (img: HTMLImageElement | null) => {
      const font = "'Nunito', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      const accent = mode === 'found' ? '#2f7a68' : '#c0332b'

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = accent
      ctx.fillRect(0, 0, width, 220)

      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      let size = 130
      ctx.font = '900 ' + size + 'px ' + font
      while (ctx.measureText(heading).width > width - 100 && size > 50) {
        size -= 4
        ctx.font = '900 ' + size + 'px ' + font
      }
      ctx.fillText(heading, width / 2, 110)

      let y = 250
      if (img) {
        const boxW = 920
        const boxH = 520
        const boxX = (width - boxW) / 2
        const scale = Math.max(boxW / img.width, boxH / img.height)
        const drawW = img.width * scale
        const drawH = img.height * scale
        ctx.save()
        ctx.beginPath()
        ctx.roundRect(boxX, y, boxW, boxH, 28)
        ctx.clip()
        ctx.drawImage(img, boxX + (boxW - drawW) / 2, y + (boxH - drawH) / 2, drawW, drawH)
        ctx.restore()
        y += boxH + 40
      } else {
        y += 20
      }

      ctx.fillStyle = '#3b2a24'
      ctx.textBaseline = 'top'
      const blocks: { text: string; size: number; weight: number; color: string; gap: number }[] = []
      if (nameLine) blocks.push({ text: nameLine, size: 46, weight: 800, color: '#3b2a24', gap: 18 })
      blocks.push({ text: whereLine, size: 42, weight: 800, color: '#3b2a24', gap: 18 })
      if (description.trim()) {
        blocks.push({ text: description.trim(), size: 38, weight: 600, color: '#6f5b52', gap: 24 })
      }
      blocks.push({ text: callLine, size: 38, weight: 800, color: '#3b2a24', gap: 0 })

      for (const block of blocks) {
        ctx.font = block.weight + ' ' + block.size + 'px ' + font
        ctx.fillStyle = block.color
        for (const line of wrapLines(ctx, block.text, width - 140)) {
          ctx.fillText(line, width / 2, y)
          y += block.size * 1.3
        }
        y += block.gap
      }

      const barH = 150
      ctx.fillStyle = '#ffe8d6'
      ctx.fillRect(0, height - barH, width, barH)
      ctx.fillStyle = '#3b2a24'
      ctx.textBaseline = 'middle'
      let contactSize = 72
      const contactText = contactLine || 'Add a phone number'
      ctx.font = '900 ' + contactSize + 'px ' + font
      while (ctx.measureText(contactText).width > width - 100 && contactSize > 30) {
        contactSize -= 4
        ctx.font = '900 ' + contactSize + 'px ' + font
      }
      ctx.fillText(contactText, width / 2, height - barH / 2)

      canvas.toBlob((blob) => {
        if (!blob) {
          setError('Your browser could not make the image. Try the print button instead.')
          return
        }
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = mode + '-' + animalLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-flyer.png'
        link.click()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }, 'image/png')
    }

    if (photo) {
      const img = new Image()
      img.onload = () => draw(img)
      img.onerror = () => draw(null)
      img.src = photo
    } else {
      draw(null)
    }
  }

  return (
    <main className="page flyer-page">
      <h1 className="title">Flyer maker</h1>
      <p className="lead">
        Make a flyer to print or share. Everything stays on your phone. Nothing is uploaded.
      </p>

      <div className="flyer-form">
        <div className="flyer-toggle" role="group" aria-label="Flyer type">
          <button
            type="button"
            className={mode === 'found' ? 'active' : ''}
            aria-pressed={mode === 'found'}
            onClick={() => setMode('found')}
          >
            I found a pet
          </button>
          <button
            type="button"
            className={mode === 'lost' ? 'active' : ''}
            aria-pressed={mode === 'lost'}
            onClick={() => setMode('lost')}
          >
            I lost a pet
          </button>
        </div>

        <label className="field-label" htmlFor="flyer-animal">Type of animal</label>
        <input
          id="flyer-animal"
          className="field"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          placeholder="Dog, cat, rabbit..."
        />

        {mode === 'lost' && (
          <>
            <label className="field-label" htmlFor="flyer-name">Pet name</label>
            <input
              id="flyer-name"
              className="field"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Optional"
            />
          </>
        )}

        <label className="field-label" htmlFor="flyer-desc">Description</label>
        <textarea
          id="flyer-desc"
          className="field flyer-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Size, color, collar, friendly or shy"
          rows={3}
        />
        {mode === 'found' && (
          <p className="note">
            Leave one detail off, like a marking or a toy. Ask the caller to tell you, so you know
            they are the real owner.
          </p>
        )}

        <label className="field-label" htmlFor="flyer-place">
          {mode === 'found' ? 'Where you found it' : 'Where it was last seen'}
        </label>
        <input
          id="flyer-place"
          className="field"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Cross streets or a landmark"
        />

        <label className="field-label" htmlFor="flyer-date">Date</label>
        <input
          id="flyer-date"
          className="field"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="field-label" htmlFor="flyer-contact">Your name</label>
        <input
          id="flyer-contact"
          className="field"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Optional, first name is fine"
        />

        <label className="field-label" htmlFor="flyer-phone">Phone number</label>
        <input
          id="flyer-phone"
          className="field"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 555-5555"
        />
        <p className="note">Only share a number you are comfortable putting on a public flyer.</p>

        <label className="field-label" htmlFor="flyer-photo">Photo</label>
        <input
          id="flyer-photo"
          ref={photoInput}
          className="field"
          type="file"
          accept="image/*"
          onChange={onPhoto}
        />
        {photo && (
          <button type="button" className="button-secondary flyer-remove" onClick={removePhoto}>
            Remove photo
          </button>
        )}
      </div>

      {error && <p className="notice notice-error">{error}</p>}

      <h2 className="section-title">Preview</h2>
      <div className={'flyer flyer-' + mode}>
        <div className="flyer-head">{heading}</div>
        {photo && <img className="flyer-photo" src={photo} alt="" />}
        <div className="flyer-body">
          {nameLine && <p className="flyer-name">{nameLine}</p>}
          <p className="flyer-where">{whereLine}</p>
          {description.trim() && <p className="flyer-desc">{description.trim()}</p>}
          <p className="flyer-call">{callLine}</p>
        </div>
        <div className="flyer-contact">{contactLine || 'Add a phone number'}</div>
        <div className="flyer-foot">Made with {APP_NAME}</div>
      </div>

      <div className="flyer-actions">
        <button type="button" className="button" onClick={() => window.print()}>
          Print or save as PDF
        </button>
        <button type="button" className="button-secondary" onClick={saveImage}>
          Save as image
        </button>
      </div>
      {!phone.trim() && (
        <p className="note">Add a phone number so people can reach you.</p>
      )}
    </main>
  )
}