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
  'https://overpass.kumi.systems/api/interpreter',
]

const SEARCH_RADIUS_METERS = 40000 // about 25 miles
const MAX_RESULTS = 25

export async function geocodeZip(zip: string): Promise<Coords> {
  const url =
    'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&postalcode=' +
    encodeURIComponent(zip)
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error('lookup-failed')
  const data = (await res.json()) as { lat: string; lon: string }[]
  if (data.length === 0) throw new Error('zip-not-found')
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
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

async function queryOverpass(query: string): Promise<OsmElement[]> {
  let lastError: unknown = null
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query),
      })
      if (!res.ok) throw new Error('overpass-' + res.status)
      const json = (await res.json()) as { elements?: OsmElement[] }
      return json.elements ?? []
    } catch (err) {
      lastError = err
    }
  }
  throw lastError instanceof Error ? lastError : new Error('overpass-failed')
}

export async function findShelters(origin: Coords): Promise<Shelter[]> {
  const around = `(around:${SEARCH_RADIUS_METERS},${origin.lat},${origin.lon})`
  const query =
    '[out:json][timeout:25];(' +
    `node["amenity"="animal_shelter"]${around};` +
    `way["amenity"="animal_shelter"]${around};` +
    `relation["amenity"="animal_shelter"]${around};` +
    ');out center tags;'

  const elements = await queryOverpass(query)
  const seen = new Set<string>()
  const shelters: Shelter[] = []

  for (const el of elements) {
    const lat = el.lat ?? el.center?.lat
    const lon = el.lon ?? el.center?.lon
    if (lat === undefined || lon === undefined) continue
    const id = el.type + '/' + el.id
    if (seen.has(id)) continue
    seen.add(id)

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
      miles: haversineMiles(origin, { lat, lon }),
    })
  }

  shelters.sort((a, b) => a.miles - b.miles)
  return shelters.slice(0, MAX_RESULTS)
}
