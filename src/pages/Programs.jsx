import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { usePublicData } from '../data/store.jsx'
import { DEGREES, FIELDS } from '../data/seed.js'
import { ProgramCard } from '../components/Cards.jsx'
import { Empty, PageHeader } from '../components/ui.jsx'
import InquiryModal from '../components/InquiryModal.jsx'

export default function Programs() {
  const { t, loc } = useI18n()
  const { programs, countries, universityById } = usePublicData()
  const [params, setParams] = useSearchParams()
  const [target, setTarget] = useState(null)
  const q = params.get('q') || ''
  const country = params.get('country') || ''
  const degree = params.get('degree') || ''
  const field = params.get('field') || ''

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return programs.filter((p) => {
      const uni = universityById[p.universityId]
      return (
        (!country || uni?.countryId === country) &&
        (!degree || p.degree === degree) &&
        (!field || p.field === field) &&
        (!needle || `${p.title} ${uni?.name || ''}`.toLowerCase().includes(needle))
      )
    })
  }, [programs, universityById, q, country, degree, field])

  const request = (p) => {
    const uni = universityById[p.universityId]
    setTarget({ type: 'university', id: uni.id, name: `${uni.name} · ${p.title}`, programId: p.id })
  }

  return (
    <>
      <PageHeader title={t('programs.title')} text={t('programs.text')} />
      <section className="container section section--tight">
        <div className="filters filters--wide">
          <input className="input" type="search" value={q} onChange={(e) => setParam('q', e.target.value)} placeholder={t('filters.searchPrograms')} aria-label={t('common.search')} />
          <select className="input" value={country} onChange={(e) => setParam('country', e.target.value)} aria-label={t('filters.country')}>
            <option value="">{t('filters.country')}: {t('common.all')}</option>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {loc(c.name)}</option>)}
          </select>
          <select className="input" value={degree} onChange={(e) => setParam('degree', e.target.value)} aria-label={t('filters.degree')}>
            <option value="">{t('filters.degree')}: {t('common.all')}</option>
            {DEGREES.map((d) => <option key={d} value={d}>{t(`degrees.${d}`)}</option>)}
          </select>
          <select className="input" value={field} onChange={(e) => setParam('field', e.target.value)} aria-label={t('filters.field')}>
            <option value="">{t('filters.field')}: {t('common.all')}</option>
            {FIELDS.map((f) => <option key={f} value={f}>{t(`fields.${f}`)}</option>)}
          </select>
          {(q || country || degree || field) && (
            <button type="button" className="btn btn--ghost" onClick={() => setParams({}, { replace: true })}>{t('filters.reset')}</button>
          )}
        </div>
        <p className="muted count">{list.length} {t('common.results')}</p>
        {list.length ? (
          <div className="grid grid--3">
            {list.map((p) => <ProgramCard key={p.id} program={p} onRequest={request} />)}
          </div>
        ) : (
          <Empty>{t('common.noResults')}</Empty>
        )}
      </section>
      {target && <InquiryModal target={target} onClose={() => setTarget(null)} />}
    </>
  )
}
