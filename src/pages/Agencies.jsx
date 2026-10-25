import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { usePublicData } from '../data/store.jsx'
import { AgencyCard } from '../components/Cards.jsx'
import { Empty, PageHeader } from '../components/ui.jsx'

export default function Agencies() {
  const { t, loc } = useI18n()
  const { agencies, countries } = usePublicData()
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
    return agencies.filter(
      (a) =>
        (!country || a.countryIds.includes(country)) &&
        (!needle || `${a.name} ${a.city}`.toLowerCase().includes(needle)),
    )
  }, [agencies, q, country])

  return (
    <>
      <PageHeader title={t('agencies.title')} text={t('agencies.text')} />
      <section className="container section section--tight">
        <div className="filters">
          <input className="input" type="search" value={q} onChange={(e) => setParam('q', e.target.value)} placeholder={t('filters.searchAgencies')} aria-label={t('common.search')} />
          <select className="input" value={country} onChange={(e) => setParam('country', e.target.value)} aria-label={t('filters.country')}>
            <option value="">{t('agencies.destinations')}: {t('common.all')}</option>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {loc(c.name)}</option>)}
          </select>
          {(q || country) && (
            <button type="button" className="btn btn--ghost" onClick={() => setParams({}, { replace: true })}>{t('filters.reset')}</button>
          )}
        </div>
        <p className="muted count">{list.length} {t('common.results')}</p>
        {list.length ? (
          <div className="grid grid--3">
            {list.map((a) => <AgencyCard key={a.id} agency={a} />)}
          </div>
        ) : (
          <Empty>{t('common.noResults')}</Empty>
        )}
      </section>
    </>
  )
}
