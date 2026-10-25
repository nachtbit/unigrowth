import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { useStore } from '../data/store.jsx'
import { Empty, Field, PageHeader } from '../components/ui.jsx'
import { INQUIRY_STATUSES } from '../data/seed.js'

const SESSION_KEY = 'unigrowth:portal'

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export function PortalLogin() {
  const { t } = useI18n()
  const { data } = useStore()
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  const verifiedAgencies = data.agencies.filter((a) => a.status === 'verified')
  const verifiedUniversities = data.universities.filter((u) => u.status === 'verified')

  const login = (e) => {
    e.preventDefault()
    if (!value) return
    const [type, id] = value.split(':')
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ type, id }))
    navigate('/portal/dashboard', { replace: true })
  }

  if (getSession()) return <Navigate to="/portal/dashboard" replace />

  return (
    <>
      <PageHeader title={t('portal.title')} text={t('portal.text')} />
      <section className="container container--narrow section section--tight">
        <form className="panel panel--form form" onSubmit={login}>
          <Field label={t('portal.choose')}>
            <select className="input" value={value} onChange={(e) => setValue(e.target.value)}>
              <option value="">—</option>
              <optgroup label={t('portal.agenciesGroup')}>
                {verifiedAgencies.map((a) => <option key={a.id} value={`agency:${a.id}`}>{a.name}</option>)}
              </optgroup>
              <optgroup label={t('portal.universitiesGroup')}>
                {verifiedUniversities.map((u) => <option key={u.id} value={`university:${u.id}`}>{u.name}</option>)}
              </optgroup>
            </select>
          </Field>
          <button className="btn btn--lg" type="submit" disabled={!value}>{t('portal.login')}</button>
          <p className="muted">
            <Link to="/partners" className="inline-link">{t('home.ctaButton')}</Link>
          </p>
        </form>
      </section>
    </>
  )
}

export function PortalDashboard() {
  const { t } = useI18n()
  const { data, upsert } = useStore()
  const session = getSession()
  const col = session?.type === 'agency' ? 'agencies' : 'universities'
  const org = session ? data[col].find((o) => o.id === session.id) : null
  const [contact, setContact] = useState(() => ({ email: org?.email || '', phone: org?.phone || '', website: org?.website || '' }))
  const [saved, setSaved] = useState(false)

  if (!session || !org) return <Navigate to="/portal" replace />

  const requests = data.inquiries
    .filter((i) => i.targetType === session.type && i.targetId === org.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    window.location.assign('/portal')
  }

  const saveContact = (e) => {
    e.preventDefault()
    upsert(col, { ...org, ...contact })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const programTitle = (id) => data.programs.find((p) => p.id === id)?.title

  return (
    <>
      <PageHeader title={`${t('portal.welcome')}, ${org.name}`}>
        <button type="button" className="btn btn--outline btn--sm" onClick={logout}>{t('portal.logout')}</button>
      </PageHeader>
      <section className="container section section--tight">
        <div className="portal">
          <div>
            <h2>{t('portal.requests')} ({requests.length})</h2>
            {requests.length === 0 ? (
              <Empty>{t('portal.noRequests')}</Empty>
            ) : (
              <div className="requests">
                {requests.map((r) => (
                  <article key={r.id} className="request">
                    <div className="request__head">
                      <div>
                        <strong>{r.studentName}</strong>
                        <span className="muted"> · {r.createdAt}</span>
                      </div>
                      <select
                        className="input input--sm"
                        value={r.status}
                        onChange={(e) => upsert('inquiries', { ...r, status: e.target.value })}
                        aria-label={t('portal.status')}
                      >
                        {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{t(`portal.${s}`)}</option>)}
                      </select>
                    </div>
                    {r.programId && <p className="tag tag--soft">{programTitle(r.programId)}</p>}
                    <p>{r.message}</p>
                    <p className="muted">
                      <a className="inline-link" href={`mailto:${r.email}`}>{r.email}</a>
                      {r.phone && <> · {r.phone}</>}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <form className="panel panel--form form" onSubmit={saveContact}>
            <h3>{t('portal.contactInfo')}</h3>
            <Field label={t('inquiry.email')}><input className="input" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></Field>
            <Field label={t('partners.phone')}><input className="input" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></Field>
            <Field label={t('partners.websiteField')}><input className="input" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} /></Field>
            <button className="btn" type="submit">{saved ? t('portal.saved') : t('portal.save')}</button>
          </form>
        </div>
      </section>
    </>
  )
}
