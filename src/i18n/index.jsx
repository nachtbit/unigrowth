import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.js'
import az from './az.js'
import ru from './ru.js'

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'az', label: 'AZ', name: 'Azərbaycan' },
  { code: 'ru', label: 'RU', name: 'Русский' },
]

const dictionaries = { en, az, ru }
const STORAGE_KEY = 'unigrowth:lang'

const I18nContext = createContext(null)

function lookup(dict, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict)
}

function detectLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && dictionaries[saved]) return saved
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase()
  return dictionaries[nav] ? nav : 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback(
    (key) => lookup(dictionaries[lang], key) ?? lookup(dictionaries.en, key) ?? key,
    [lang],
  )

  // Picks the current language from a localized object like { en, az, ru }.
  const loc = useCallback(
    (value) => (value && typeof value === 'object' ? value[lang] || value.en || '' : value ?? ''),
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, loc }), [lang, t, loc])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
