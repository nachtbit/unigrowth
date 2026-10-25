import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { createSeed } from './seed.js'

// Mock data layer. All reads and writes go through this store, persisted in
// localStorage. To move to a real backend, replace the internals of this file
// (keep the exposed API) and the UI does not need to change.

const STORAGE_KEY = 'unigrowth:data:v1'
const COLLECTIONS = ['countries', 'universities', 'programs', 'agencies', 'inquiries', 'partnerRequests']

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (COLLECTIONS.every((c) => Array.isArray(parsed[c]))) return parsed
    }
  } catch {
    /* fall through to seed */
  }
  return createSeed()
}

function reducer(state, action) {
  switch (action.type) {
    case 'upsert': {
      const list = state[action.col]
      const exists = list.some((i) => i.id === action.item.id)
      return {
        ...state,
        [action.col]: exists
          ? list.map((i) => (i.id === action.item.id ? action.item : i))
          : [action.item, ...list],
      }
    }
    case 'remove':
      return { ...state, [action.col]: state[action.col].filter((i) => i.id !== action.id) }
    case 'removeWhere':
      return { ...state, [action.col]: state[action.col].filter((i) => !action.test(i)) }
    case 'replace':
      return action.state
    default:
      return state
  }
}

const uid = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const today = () => new Date().toISOString().slice(0, 10)

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const upsert = useCallback((col, item) => {
    const saved = { ...item, id: item.id || uid(col.slice(0, 2)) }
    if (!saved.createdAt) saved.createdAt = today()
    dispatch({ type: 'upsert', col, item: saved })
    return saved
  }, [])

  // Returns an error message when removal is not allowed, otherwise null.
  const remove = useCallback(
    (col, id) => {
      if (col === 'countries') {
        const used =
          data.universities.some((u) => u.countryId === id) ||
          data.agencies.some((a) => a.countryIds.includes(id))
        if (used) return 'This country is used by universities or agencies. Remove or move them first.'
      }
      if (col === 'universities') dispatch({ type: 'removeWhere', col: 'programs', test: (p) => p.universityId === id })
      dispatch({ type: 'remove', col, id })
      return null
    },
    [data],
  )

  const approvePartnerRequest = useCallback(
    (request, countryId) => {
      const base = {
        name: request.orgName,
        email: request.email,
        phone: request.phone,
        website: request.website,
        status: 'verified',
        description: { en: request.message, az: request.message, ru: request.message },
      }
      if (request.kind === 'agency') {
        upsert('agencies', {
          ...base,
          city: '',
          countryIds: [countryId],
          languages: ['EN'],
          services: ['counseling'],
          rating: 0,
          studentsHelped: 0,
        })
      } else {
        upsert('universities', {
          ...base,
          countryId,
          city: '',
          founded: new Date().getFullYear(),
          students: 0,
          tuitionFrom: 0,
          ranking: 0,
        })
      }
      upsert('partnerRequests', { ...request, countryId, status: 'approved' })
    },
    [upsert],
  )

  const reset = useCallback(() => dispatch({ type: 'replace', state: createSeed() }), [])
  const importData = useCallback((state) => dispatch({ type: 'replace', state }), [])

  const value = useMemo(
    () => ({ data, upsert, remove, approvePartnerRequest, reset, importData }),
    [data, upsert, remove, approvePartnerRequest, reset, importData],
  )
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}

// Public-site selectors: only verified organizations are visible to students.
export function usePublicData() {
  const { data } = useStore()
  return useMemo(() => {
    const universities = data.universities.filter((u) => u.status === 'verified')
    const agencies = data.agencies.filter((a) => a.status === 'verified')
    const uniIds = new Set(universities.map((u) => u.id))
    const programs = data.programs.filter((p) => uniIds.has(p.universityId))
    const countryById = Object.fromEntries(data.countries.map((c) => [c.id, c]))
    const universityById = Object.fromEntries(data.universities.map((u) => [u.id, u]))
    const usedCountryIds = new Set([...universities.map((u) => u.countryId), ...agencies.flatMap((a) => a.countryIds)])
    const countries = data.countries.filter((c) => usedCountryIds.has(c.id))
    return { universities, agencies, programs, countries, countryById, universityById }
  }, [data])
}
