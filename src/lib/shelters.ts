export type Coords = { lat: number; lon: number }

export type Shelter = {
  id: string
  name: string
  address: string | null
  phone: string | null
  website: string | null
  hours: string | null
  lat: number
  lon: number
  miles: number
}

type OsmElement = {
  type: string
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

const RADIUS_MILES = 25
const MAX_RESULTS = 25

async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function firstSuccess<T>(tasks: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    let failed = 0
    let lastError: unknown = null
    tasks.forEach((task) => {
      task.then(resolve).catch((err) => {
        lastError = err
        failed += 1
        if (failed === tasks.length) reject(lastError)
      })
    })
  })
}

export async function geocodeZip(zip: string): Promise<Coords> {
  // First choice: a simple free ZIP lookup.
  try {
    const res = await fetchWithTimeout('https://api.zippopotam.us/us/' + encodeURIComponent(zip), {}, 8000)
    if (res.status === 404) throw new Error('zip-not-found')
    if (res.ok) {
      const data = (await res.json()) as { places?: { latitude: string; longitude: string }[] }
      const place = data.places?.[0]
      if (place) return { lat: parseFloat(place.latitude), lon: parseFloat(place.longitude) }
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'zip-not-found') throw err
  }

  // Backup: OpenStreetMap's Nominatim.
  try {
    const url =
      'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&postalcode=' +
      encodeURIComponent(zip)
    const res = await fetchWithTimeout(url, { headers: { Accept: 'application/json' } }, 8000)
    if (!res.ok) throw new Error('geocode-failed')
    const data = (await res.json()) as { lat: string; lon: string }[]
    if (data.length === 0) throw new Error('zip-not-found')
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
  } catch (err) {
    if (err instanceof Error && err.message === 'zip-not-found') throw err
    throw new Error('geocode-failed')
  }
}

function haversineMiles(a: Coords, b: Coords): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const earthMiles = 3958.8
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * earthMiles * Math.asin(Math.sqrt(h))
}

function buildAddress(tags: Record<string, string>): string | null {
  if (tags['addr:full']) return tags['addr:full']
  const street = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ')
  const cityState = [tags['addr:city'], tags['addr:state']].filter(Boolean).join(', ')
  const parts = [street, cityState].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : null
}

function cleanWebsite(raw: string | undefined): string | null {
  if (!raw) return null
  const first = raw.split(';')[0].trim()
  if (!first) return null
  return /^https?:\/\//i.test(first) ? first : 'https://' + first
}

function cleanPhone(raw: string | undefined): string | null {
  if (!raw) return null
  const first = raw.split(';')[0].trim()
  return first || null
}

async function queryOneEndpoint(endpoint: string, query: string): Promise<OsmElement[]> {
  const res = await fetchWithTimeout(
    endpoint,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(query),
    },
    15000,
  )
  if (!res.ok) throw new Error('overpass-' + res.status)
  const json = (await res.json()) as { elements?: OsmElement[] }
  return json.elements ?? []
}

export async function findShelters(origin: Coords): Promise<Shelter[]> {
  const dLat = RADIUS_MILES / 69
  const dLon = RADIUS_MILES / (69 * Math.cos((origin.lat * Math.PI) / 180))
  const south = (origin.lat - dLat).toFixed(5)
  const north = (origin.lat + dLat).toFixed(5)
  const west = (origin.lon - dLon).toFixed(5)
  const east = (origin.lon + dLon).toFixed(5)

  const query =
    '[out:json][timeout:20];' +
    `nwr["amenity"="animal_shelter"](${south},${west},${north},${east});` +
    'out center tags;'

  let elements: OsmElement[]
  try {
    // Ask every server at once and use whichever answers first.
    elements = await firstSuccess(OVERPASS_ENDPOINTS.map((endpoint) => queryOneEndpoint(endpoint, query)))
  } catch {
    throw new Error('search-failed')
  }

  const seen = new Set<string>()
  const shelters: Shelter[] = []

  for (const el of elements) {
    const lat = el.lat ?? el.center?.lat
    const lon = el.lon ?? el.center?.lon
    if (lat === undefined || lon === undefined) continue
    const id = el.type + '/' + el.id
    if (seen.has(id)) continue
    seen.add(id)

    const miles = haversineMiles(origin, { lat, lon })
    if (miles > RADIUS_MILES) continue

    const tags = el.tags ?? {}
    shelters.push({
      id,
      name: tags.name ?? tags.operator ?? 'Animal shelter (name not listed)',
      address: buildAddress(tags),
      phone: cleanPhone(tags.phone ?? tags['contact:phone']),
      website: cleanWebsite(tags.website ?? tags['contact:website']),
      hours: tags.opening_hours ?? null,
      lat,
      lon,
      miles,
    })
  }

  shelters.sort((a, b) => a.miles - b.miles)
  return shelters.slice(0, MAX_RESULTS)
}
