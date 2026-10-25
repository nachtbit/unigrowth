import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { usePublicData } from '../data/store.jsx'
import { Avatar, VerifiedBadge } from '../components/ui.jsx'
import { AgencyCard, ProgramCard } from '../components/Cards.jsx'
import InquiryModal from '../components/InquiryModal.jsx'
import NotFound from './NotFound.jsx'

export default function UniversityDetail() {
  const { id } = useParams()
  const { t, loc } = useI18n()
  const { universities, programs, agencies, countryById } = usePublicData()
  const [target, setTarget] = useState(null)

  const u = universities.find((x) => x.id === id)
  if (!u) return <NotFound />

  const country = countryById[u.countryId]
  const uniPrograms = programs.filter((p) => p.universityId === u.id)
  const relatedAgencies = agencies.filter((a) => a.countryIds.includes(u.countryId))
  const request = (p) => setTarget({ type: 'university', id: u.id, name: p ? `${u.name} · ${p.title}` : u.name, programId: p?.id })

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Link to="/universities" className="back">← {t('common.back')}</Link>
          <div className="detail-hero__row">
            <Avatar name={u.name} size={88} />
            <div>
              <VerifiedBadge />
              <h1>{u.name}</h1>
              <p className="lead">{country?.flag} {u.city}{u.city && ', '}{country ? loc(country.name) : ''}</p>
            </div>
            <button type="button" className="btn btn--lg detail-hero__cta" onClick={() => request(null)}>
              {t('universities.requestInfo')}
            </button>
          </div>
        </div>
      </section>

      <section className="container section section--tight">
        <div className="stats stats--card">
          <div className="stat"><strong>{u.founded || '—'}</strong><span>{t('universities.founded')}</span></div>
          <div className="stat"><strong>{u.students ? u.students.toLocaleString() : '—'}</strong><span>{t('universities.students')}</span></div>
          <div className="stat"><strong>{u.tuitionFrom ? `$${u.tuitionFrom.toLocaleString()}` : '—'}</strong><span>{t('universities.tuition')} {t('common.perYear')}</span></div>
          <div className="stat"><strong>{u.ranking ? `#${u.ranking}` : '—'}</strong><span>{t('universities.ranking')}</span></div>
        </div>

        <div className="detail-grid">
          <div>
            <h2>{t('universities.about')}</h2>
            <p className="prose">{loc(u.description)}</p>
            {u.website && (
              <p><a className="inline-link" href={u.website} target="_blank" rel="noreferrer">{t('common.website')} ↗</a></p>
            )}
          </div>
        </div>

        <h2 className="mt">{t('universities.programsOffered')}</h2>
        <div className="grid grid--2">
          {uniPrograms.map((p) => <ProgramCard key={p.id} program={p} onRequest={request} />)}
        </div>

        {relatedAgencies.length > 0 && (
          <>
            <h2 className="mt">{t('universities.agenciesFor')}</h2>
            <div className="grid grid--3">
              {relatedAgencies.map((a) => <AgencyCard key={a.id} agency={a} />)}
            </div>
          </>
        )}
      </section>
      {target && <InquiryModal target={target} onClose={() => setTarget(null)} />}
    </>
  )
}
