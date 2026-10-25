import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { usePublicData } from '../data/store.jsx'
import { UniversityCard } from '../components/Cards.jsx'
import { Empty, PageHeader } from '../components/ui.jsx'

export default function Universities() {
  const { t, loc } = useI18n()
  const { universities, countries } = usePublicData()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const country = params.get('country') || ''

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return universities.filter(
      (u) =>
        (!country || u.countryId === country) &&
        (!needle || `${u.name} ${u.city}`.toLowerCase().includes(needle)),
    )
  }, [universities, q, country])

  return (
    <>
      <PageHeader title={t('universities.title')} text={t('universities.text')} />
      <section className="container section section--tight">
        <div className="filters">
          <input
            className="input"
            type="search"
            value={q}
            onChange={(e) => setParam('q', e.target.value)}
            placeholder={t('filters.searchUniversities')}
            aria-label={t('common.search')}
          />
          <select className="input" value={country} onChange={(e) => setParam('country', e.target.value)} aria-label={t('filters.country')}>
            <option value="">{t('filters.country')}: {t('common.all')}</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.flag} {loc(c.name)}</option>
            ))}
          </select>
          {(q || country) && (
            <button type="button" className="btn btn--ghost" onClick={() => setParams({}, { replace: true })}>
              {t('filters.reset')}
            </button>
          )}
        </div>
        <p className="muted count">{list.length} {t('common.results')}</p>
        {list.length ? (
          <div className="grid grid--3">
            {list.map((u) => <UniversityCard key={u.id} university={u} />)}
          </div>
        ) : (
          <Empty>{t('common.noResults')}</Empty>
        )}
      </section>
    </>
  )
}
