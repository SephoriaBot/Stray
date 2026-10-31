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

export class SearchError extends Error {
  details: string
  constructor(message: string, details: string) {
    super(message)
    this.details = details
  }
}

type OsmElement = {
  type: string
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

type NominatimItem = {
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  name?: string
  display_name: string
  extratags?: Record<string, string>
  address?: Record<string, string>
}

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

const RADIUS_MILES = 25
const MAX_RESULTS = 25

// How long to wait on each server before giving up on it.
const GEOCODE_TIMEOUT_MS = 5000
const OVERPASS_TIMEOUT_MS = 12000
const NOMINATIM_TIMEOUT_MS = 10000

// How long saved results stay fresh on the phone.
const SHELTER_CACHE_MS = 12 * 60 * 60 * 1000
const ZIP_CACHE_MS = 30 * 24 * 60 * 60 * 1000
const CACHE_PREFIX = 'stray:'

type CacheEntry<T> = { savedAt: number; value: T }

function readCache<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CacheEntry<T>
    if (typeof parsed.savedAt !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

function writeCache<T>(key: string, value: T): void {
  try {
    const entry: CacheEntry<T> = { savedAt: Date.now(), value }
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry))
  } catch {
    // Saving is optional. If the phone blocks it, the app still works.
  }
}

function isFresh(entry: CacheEntry<unknown>, maxAgeMs: number): boolean {
  return Date.now() - entry.savedAt < maxAgeMs
}

function describeError(err: unknown): string {
  return err instanceof Error ? err.message : 'unknown error'
}

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
    const errors: string[] = []
    tasks.forEach((task) => {
      task.then(resolve).catch((err) => {
        errors.push(describeError(err))
        if (errors.length === tasks.length) reject(new Error(errors.join('; ')))
      })
    })
  })
}

// Runs searches at the same time and returns the first one that finds shelters.
// An empty answer only wins if every search finished and none found anything.
function firstWithResults(tasks: { name: string; run: Promise<Shelter[]> }[]): Promise<Shelter[]> {
  return new Promise((resolve, reject) => {
    let pending = tasks.length
    let sawEmpty = false
    const problems: string[] = []
    tasks.forEach(({ name, run }) => {
      run
        .then((list) => {
          if (list.length > 0) resolve(list)
          else sawEmpty = true
        })
        .catch((err) => {
          problems.push(name + ': ' + describeError(err))
        })
        .finally(() => {
          pending -= 1
          if (pending === 0) {
            if (sawEmpty) resolve([])
            else reject(new SearchError('search-failed', problems.join(' | ')))
          }
        })
    })
  })
}

async function lookupZip(zip: string): Promise<Coords> {
  // First choice: a simple free ZIP lookup.
  try {
    const res = await fetchWithTimeout(
      'https://api.zippopotam.us/us/' + encodeURIComponent(zip),
      {},
      GEOCODE_TIMEOUT_MS,
    )
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
    const res = await fetchWithTimeout(url, { headers: { Accept: 'application/json' } }, GEOCODE_TIMEOUT_MS)
    if (!res.ok) throw new Error('geocode-failed')
    const data = (await res.json()) as { lat: string; lon: string }[]
    if (data.length === 0) throw new Error('zip-not-found')
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
  } catch (err) {
    if (err instanceof Error && err.message === 'zip-not-found') throw err
    throw new Error('geocode-failed')
  }
}

export async function geocodeZip(zip: string): Promise<Coords> {
  const key = 'zip:' + zip
  const cached = readCache<Coords>(key)
  if (cached && isFresh(cached, ZIP_CACHE_MS)) return cached.value

  const coords = await lookupZip(zip)
  writeCache(key, coords)
  return coords
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

function finish(shelters: Shelter[]): Shelter[] {
  shelters.sort((a, b) => a.miles - b.miles)
  return shelters.slice(0, MAX_RESULTS)
}

function boundingBox(origin: Coords) {
  const dLat = RADIUS_MILES / 69
  const dLon = RADIUS_MILES / (69 * Math.cos((origin.lat * Math.PI) / 180))
  return {
    south: origin.lat - dLat,
    north: origin.lat + dLat,
    west: origin.lon - dLon,
    east: origin.lon + dLon,
  }
}

async function queryOneEndpoint(endpoint: string, query: string): Promise<OsmElement[]> {
  const host = new URL(endpoint).host
  try {
    const res = await fetchWithTimeout(
      endpoint,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query),
      },
      OVERPASS_TIMEOUT_MS,
    )
    if (!res.ok) throw new Error('error ' + res.status)
    const json = (await res.json()) as { elements?: OsmElement[] }
    return json.elements ?? []
  } catch (err) {
    throw new Error(host + ' ' + describeError(err))
  }
}

async function searchOverpass(origin: Coords): Promise<Shelter[]> {
  const box = boundingBox(origin)
  const query =
    '[out:json][timeout:10];' +
    `nwr["amenity"="animal_shelter"](${box.south.toFixed(5)},${box.west.toFixed(5)},${box.north.toFixed(5)},${box.east.toFixed(5)});` +
    'out center tags;'

  // Ask every server at once and use whichever answers first.
  const elements = await firstSuccess(OVERPASS_ENDPOINTS.map((endpoint) => queryOneEndpoint(endpoint, query)))

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
  return finish(shelters)
}

// A second search on a different server, run at the same time as the first.
async function searchNominatim(origin: Coords): Promise<Shelter[]> {
  const box = boundingBox(origin)
  const url =
    'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=40&bounded=1&extratags=1&addressdetails=1' +
    `&q=${encodeURIComponent('animal shelter')}` +
    `&viewbox=${box.west},${box.north},${box.east},${box.south}`
  const res = await fetchWithTimeout(url, { headers: { Accept: 'application/json' } }, NOMINATIM_TIMEOUT_MS)
  if (!res.ok) throw new Error('error ' + res.status)
  const items = (await res.json()) as NominatimItem[]

  const shelters: Shelter[] = []
  for (const item of items) {
    const lat = parseFloat(item.lat)
    const lon = parseFloat(item.lon)
    const miles = haversineMiles(origin, { lat, lon })
    if (miles > RADIUS_MILES) continue

    const extra = item.extratags ?? {}
    const addr = item.address ?? {}
    const street = [addr.house_number, addr.road].filter(Boolean).join(' ')
    const town = addr.city ?? addr.town ?? addr.village ?? addr.hamlet
    const cityState = [town, addr.state].filter(Boolean).join(', ')
    const address = [street, cityState].filter(Boolean).join(', ')

    shelters.push({
      id: item.osm_type + '/' + item.osm_id,
      name: item.name || item.display_name.split(',')[0] || 'Animal shelter (name not listed)',
      address: address || null,
      phone: cleanPhone(extra.phone ?? extra['contact:phone']),
      website: cleanWebsite(extra.website ?? extra['contact:website']),
      hours: extra.opening_hours ?? null,
      lat,
      lon,
      miles,
    })
  }
  return finish(shelters)
}

// Saved results were measured from a nearby point, so measure again from here.
function remeasure(list: Shelter[], origin: Coords): Shelter[] {
  return finish(list.map((shelter) => ({ ...shelter, miles: haversineMiles(origin, shelter) })))
}

export async function findShelters(origin: Coords): Promise<Shelter[]> {
  const key = 'shelters:' + origin.lat.toFixed(2) + ',' + origin.lon.toFixed(2)
  const cached = readCache<Shelter[]>(key)

  // A recent search for this area shows up instantly.
  if (cached && isFresh(cached, SHELTER_CACHE_MS)) return remeasure(cached.value, origin)

  try {
    const found = await firstWithResults([
      { name: 'Overpass', run: searchOverpass(origin) },
      { name: 'Nominatim', run: searchNominatim(origin) },
    ])
    if (found.length > 0) writeCache(key, found)
    return found
  } catch (err) {
    // If the servers are down, an older saved list is better than nothing.
    if (cached && cached.value.length > 0) return remeasure(cached.value, origin)
    throw err
  }
}
