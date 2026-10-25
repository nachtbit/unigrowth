import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { usePublicData } from '../data/store.jsx'
import { Avatar, VerifiedBadge } from '../components/ui.jsx'
import { UniversityCard } from '../components/Cards.jsx'
import InquiryModal from '../components/InquiryModal.jsx'
import NotFound from './NotFound.jsx'

export default function AgencyDetail() {
  const { id } = useParams()
  const { t, loc } = useI18n()
  const { agencies, universities, countryById } = usePublicData()
  const [open, setOpen] = useState(false)

  const a = agencies.find((x) => x.id === id)
  if (!a) return <NotFound />

  const related = universities.filter((u) => a.countryIds.includes(u.countryId))

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Link to="/agencies" className="back">← {t('common.back')}</Link>
          <div className="detail-hero__row">
            <Avatar name={a.name} size={88} />
            <div>
              <VerifiedBadge />
              <h1>{a.name}</h1>
              <p className="lead">{t('agencies.city')}: {a.city}</p>
            </div>
            <button type="button" className="btn btn--lg detail-hero__cta" onClick={() => setOpen(true)}>
              {t('agencies.contact')}
            </button>
          </div>
        </div>
      </section>

      <section className="container section section--tight">
        <div className="stats stats--card">
          <div className="stat"><strong>★ {a.rating.toFixed(1)}</strong><span>{t('agencies.rating')}</span></div>
          <div className="stat"><strong>{a.studentsHelped.toLocaleString()}</strong><span>{t('agencies.helped')}</span></div>
          <div className="stat"><strong>{a.countryIds.length}</strong><span>{t('agencies.destinations')}</span></div>
          <div className="stat"><strong>{a.languages.join(' · ')}</strong><span>{t('agencies.languages')}</span></div>
        </div>

        <h2>{t('agencies.about')}</h2>
        <p className="prose">{loc(a.description)}</p>

        <h2 className="mt">{t('agencies.destinations')}</h2>
        <div className="flags">
          {a.countryIds.map((cid) => (
            <span key={cid} className="tag tag--soft tag--lg">{countryById[cid]?.flag} {countryById[cid] ? loc(countryById[cid].name) : cid}</span>
          ))}
        </div>

        <h2 className="mt">{t('agencies.services')}</h2>
        <div className="flags">
          {a.services.map((s) => <span key={s} className="tag tag--lg">{t(`services.${s}`)}</span>)}
        </div>

        {a.website && (
          <p className="mt"><a className="inline-link" href={a.website} target="_blank" rel="noreferrer">{t('common.website')} ↗</a></p>
        )}

        {related.length > 0 && (
          <>
            <h2 className="mt">{t('nav.universities')}</h2>
            <div className="grid grid--3">
              {related.slice(0, 3).map((u) => <UniversityCard key={u.id} university={u} />)}
            </div>
          </>
        )}
      </section>
      {open && <InquiryModal target={{ type: 'agency', id: a.id, name: a.name }} onClose={() => setOpen(false)} />}
    </>
  )
}
