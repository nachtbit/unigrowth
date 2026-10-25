import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { usePublicData } from '../data/store.jsx'
import { Avatar, VerifiedBadge } from './ui.jsx'

function yearsLabel(n, lang, t) {
  if (lang !== 'ru') return n === 1 ? t('common.year') : t('common.years')
  if (!Number.isInteger(n)) return t('common.yearsFew')
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return t('common.year')
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return t('common.yearsFew')
  return t('common.years')
}

export function UniversityCard({ university: u }) {
  const { t, loc } = useI18n()
  const { countryById } = usePublicData()
  const country = countryById[u.countryId]
  return (
    <Link to={`/universities/${u.id}`} className="card card--link">
      <div className="card__top">
        <Avatar name={u.name} />
        <VerifiedBadge />
      </div>
      <h3>{u.name}</h3>
      <p className="muted">
        {country?.flag} {u.city}
        {u.city && ', '}
        {country ? loc(country.name) : ''}
      </p>
      <p className="card__text">{loc(u.description)}</p>
      <div className="card__foot">
        <span>
          {t('common.from')} <strong>${u.tuitionFrom.toLocaleString()}</strong> {t('common.perYear')}
        </span>
        <span className="card__arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  )
}

export function ProgramCard({ program: p, onRequest }) {
  const { t, loc, lang } = useI18n()
  const { universityById, countryById } = usePublicData()
  const uni = universityById[p.universityId]
  const country = uni && countryById[uni.countryId]
  return (
    <article className="card">
      <div className="card__tags">
        <span className="tag">{t(`degrees.${p.degree}`)}</span>
        <span className="tag tag--soft">{t(`fields.${p.field}`)}</span>
      </div>
      <h3>{p.title}</h3>
      {uni && (
        <p className="muted">
          <Link to={`/universities/${uni.id}`} className="inline-link">{uni.name}</Link>
          {country && <> · {country.flag} {loc(country.name)}</>}
        </p>
      )}
      <dl className="facts">
        <div><dt>{t('programs.duration')}</dt><dd>{p.years} {yearsLabel(p.years, lang, t)}</dd></div>
        <div><dt>{t('programs.tuition')}</dt><dd>{p.tuition ? `$${p.tuition.toLocaleString()}` : '—'}</dd></div>
        <div><dt>{t('programs.instruction')}</dt><dd>{p.language}</dd></div>
        <div><dt>{t('programs.intake')}</dt><dd>{p.intake}</dd></div>
      </dl>
      {onRequest && (
        <button type="button" className="btn btn--soft btn--sm" onClick={() => onRequest(p)}>
          {t('universities.requestInfo')}
        </button>
      )}
    </article>
  )
}

export function AgencyCard({ agency: a }) {
  const { t, loc } = useI18n()
  const { countryById } = usePublicData()
  return (
    <Link to={`/agencies/${a.id}`} className="card card--link">
      <div className="card__top">
        <Avatar name={a.name} />
        <VerifiedBadge />
      </div>
      <h3>{a.name}</h3>
      <p className="muted">{a.city}</p>
      <div className="flags">
        {a.countryIds.map((id) => (
          <span key={id} className="tag tag--soft" title={countryById[id] ? loc(countryById[id].name) : id}>
            {countryById[id]?.flag} {countryById[id] ? loc(countryById[id].name) : id}
          </span>
        ))}
      </div>
      <div className="card__foot">
        <span>
          ★ <strong>{a.rating.toFixed(1)}</strong> · {a.studentsHelped.toLocaleString()} {t('agencies.helped')}
        </span>
        <span className="card__arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  )
}
