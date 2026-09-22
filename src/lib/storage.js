import { useEffect, useState } from 'react'
import { cleanProfile } from '../data/profileOptions.js'

// Shared browser store described in docs/platform/data-contract.md.
// The landing page writes session + profile; games write progress.
const PREFIX = 'idn.v1.'
// The 'storage' event only fires in other tabs, so this tab announces its own writes
const LOCAL_CHANGE = 'idn:change'

// Bad or missing JSON = absent (contract rule 4)
function readJSON(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const value = JSON.parse(raw)
    return value && typeof value === 'object' ? value : null
  } catch {
    return null
  }
}

function readProgress(id) {
  const p = readJSON(`${PREFIX}progress.${id}`)
  if (!p) return null
  return {
    status: p.status === 'finished' ? 'finished' : 'in_progress',
    lastPlayedAt: typeof p.lastPlayedAt === 'string' ? p.lastPlayedAt : '',
    endingsReached: Array.isArray(p.endingsReached) ? [...new Set(p.endingsReached)] : [],
  }
}

function readLibrary(ids) {
  const progress = {}
  for (const id of ids) {
    const p = readProgress(id)
    if (p) progress[id] = p
  }
  return { session: readJSON(`${PREFIX}session`), profile: cleanProfile(readJSON(`${PREFIX}profile`)), progress }
}

export function signIn(email) {
  try {
    localStorage.setItem(`${PREFIX}session`, JSON.stringify({ email, signedInAt: new Date().toISOString() }))
  } finally {
    window.dispatchEvent(new Event(LOCAL_CHANGE))
  }
}

export function saveProfile(fields) {
  try {
    const profile = { ...cleanProfile(fields), updatedAt: new Date().toISOString() }
    localStorage.setItem(`${PREFIX}profile`, JSON.stringify(profile))
  } finally {
    window.dispatchEvent(new Event(LOCAL_CHANGE))
  }
}

// Sign out removes every idn.v1.* key; game-private keys stay (contract rule 5)
export function signOut() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
  } finally {
    window.dispatchEvent(new Event(LOCAL_CHANGE))
  }
}

// Session + progress per story; re-reads when another tab changes the store
// or when this tab regains focus (contract rule 6).
export function useLibrary(ids) {
  const [state, setState] = useState(() => readLibrary(ids))
  const key = ids.join(',')

  useEffect(() => {
    const refresh = () => setState(readLibrary(key.split(',')))
    const onStorage = (e) => {
      if (e.key === null || e.key.startsWith(PREFIX)) refresh()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', refresh)
    window.addEventListener(LOCAL_CHANGE, refresh)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', refresh)
      window.removeEventListener(LOCAL_CHANGE, refresh)
    }
  }, [key])

  return state
}
