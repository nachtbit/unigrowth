import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Mock admin authentication. There is no backend, so this only gates the UI
// and must be replaced by real authentication when a backend exists.
export const ADMIN_EMAIL = 'admin@unigrowth.com'
export const ADMIN_PASSWORD = 'admin123'
const KEY = 'unigrowth:admin'

const AuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(KEY) === '1')

  const login = useCallback((email, password) => {
    const ok = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD
    if (ok) sessionStorage.setItem(KEY, '1')
    setAuthed(ok)
    return ok
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(KEY)
    setAuthed(false)
  }, [])

  const value = useMemo(() => ({ authed, login, logout }), [authed, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAdminAuth() {
  return useContext(AuthContext)
}
