import { useState } from 'react'
import type { FormEvent } from 'react'
import { findShelters, geocodeZip } from '../lib/shelters'
import type { Coords, Shelter } from '../lib/shelters'

type Status = 'idle' | 'loading' | 'done' | 'error'

function errorText(err: unknown): string {
  const code = err instanceof Error ? err.message : ''
  if (code === 'zip-not-found') return 'We could not find that ZIP code. Check it and try again.'
  if (code === 'location-denied') return 'We could not get your location. Enter a ZIP code instead.'
  if (code === 'no-geolocation') return 'Your browser cannot share its location. Enter a ZIP code instead.'
  if (code === 'geocode-failed') return 'We could not look up that ZIP code right now. Try again in a minute.'
  return 'The shelter database is busy right now. Try again in a minute.'
}

function phoneHref(phone: string): string {
  return 'tel:' + phone.replace(/[^\d+]/g, '')
}

function directionsHref(shelter: Shelter): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${shelter.lat},${shelter.lon}`
}

export default function Shelters() {
  const [zip, setZip] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [message, setMessage] = useState('')

  async function run(getCoords: () => Promise<Coords>) {
    setStatus('loading')
    setMessage('')
    try {
      const coords = await getCoords()
      const found = await findShelters(coords)
      setShelters(found)
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setMessage(errorText(err))
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const clean = zip.trim()
    if (!/^\d{5}$/.test(clean)) {
      setStatus('error')
      setMessage('Enter a 5-digit ZIP code.')
      return
    }
    void run(() => geocodeZip(clean))
  }

  function useMyLocation() {
    void run(
      () =>
        new Promise<Coords>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('no-geolocation'))
            return
          }
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => reject(new Error('location-denied')),
            { timeout: 10000 },
          )
        }),
    )
  }

  const loading = status === 'loading'

  return (
    <main className="page">
      <h1 className="title">Find shelters near you</h1>
      <p className="lead">Search by ZIP code to see animal shelters within about 25 miles.</p>

      <form onSubmit={onSubmit}>
        <label className="field-label" htmlFor="zip">ZIP code</label>
        <div className="field-row">
          <input
            id="zip"
            className="field"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="23220"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button className="button" type="submit" disabled={loading}>
            Search
          </button>
        </div>
      </form>
      <button className="button-secondary" type="button" onClick={useMyLocation} disabled={loading}>
        Use my location
      </button>

      <div aria-live="polite">
        {loading && <p className="notice">Searching for shelters...</p>}
        {status === 'error' && <p className="notice notice-error">{message}</p>}
        {status === 'done' && shelters.length === 0 && (
          <p className="notice">
            No shelters found within 25 miles. Try a nearby ZIP code, or call your local animal control.
          </p>
        )}
      </div>

      {status === 'done' && shelters.length > 0 && (
        <>
          <p className="notice">
            Listings can be out of date. Call before you go.
          </p>
          <ul className="shelter-list">
            {shelters.map((shelter) => (
              <li key={shelter.id}>
                <h2 className="shelter-name">{shelter.name}</h2>
                <p className="shelter-meta">
                  {shelter.miles.toFixed(1)} miles away
                  {shelter.address ? ', ' + shelter.address : ''}
                </p>
                {shelter.hours && <p className="shelter-meta">Hours: {shelter.hours}</p>}
                <div className="shelter-actions">
                  {shelter.phone && <a href={phoneHref(shelter.phone)}>Call {shelter.phone}</a>}
                  {shelter.website && (
                    <a href={shelter.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  )}
                  <a href={directionsHref(shelter)} target="_blank" rel="noopener noreferrer">
                    Directions
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="attribution">Shelter data from OpenStreetMap contributors.</p>
    </main>
  )
}
