import { useState } from 'react'
import { useI18n } from '../i18n/index.jsx'
import { useStore } from '../data/store.jsx'
import { PageHeader, Field } from '../components/ui.jsx'

export default function Partners() {
  const { t, loc } = useI18n()
  const { data, upsert } = useStore()
  const [kind, setKind] = useState('agency')
  const empty = { orgName: '', countryId: '', contactName: '', email: '', phone: '', website: '', message: '' }
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.orgName.trim() || !form.contactName.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(t('partners.required'))
      return
    }
    upsert('partnerRequests', { ...form, kind, status: 'pending' })
    setSent(true)
    setForm(empty)
    setError('')
  }

  return (
    <>
      <PageHeader title={t('partners.title')} text={t('partners.text')} />
      <section className="container section section--tight">
        <div className="partners">
          <div>
            <h2>{t('partners.benefitsTitle')}</h2>
            <ul className="checks">
              {['b1', 'b2', 'b3', 'b4'].map((b) => <li key={b}>{t(`partners.${b}`)}</li>)}
            </ul>
          </div>

          <div className="panel panel--form">
            <div className="segmented" role="tablist">
              {['agency', 'university'].map((k) => (
                <button key={k} type="button" role="tab" aria-selected={kind === k} className={kind === k ? 'is-active' : ''} onClick={() => setKind(k)}>
                  {t(`partners.${k}`)}
                </button>
              ))}
            </div>
            {sent ? (
              <div className="success">
                <div className="success__icon" aria-hidden="true">✓</div>
                <h3>{t('partners.sentTitle')}</h3>
                <p>{t('partners.sentText')}</p>
                <button type="button" className="btn btn--soft" onClick={() => setSent(false)}>{t('partners.formTitle')}</button>
              </div>
            ) : (
              <form onSubmit={submit} className="form" noValidate>
                <h3>{t('partners.formTitle')}</h3>
                <Field label={t('partners.orgName')}><input className="input" value={form.orgName} onChange={set('orgName')} /></Field>
                <Field label={t('partners.country')}>
                  <select className="input" value={form.countryId} onChange={set('countryId')}>
                    <option value="">{t('partners.selectCountry')}</option>
                    {data.countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {loc(c.name)}</option>)}
                  </select>
                </Field>
                <Field label={t('partners.contactName')}><input className="input" value={form.contactName} onChange={set('contactName')} /></Field>
                <div className="form__row">
                  <Field label={t('partners.email')}><input className="input" type="email" value={form.email} onChange={set('email')} /></Field>
                  <Field label={t('partners.phone')}><input className="input" type="tel" value={form.phone} onChange={set('phone')} /></Field>
                </div>
                <Field label={t('partners.websiteField')}><input className="input" value={form.website} onChange={set('website')} placeholder="https://" /></Field>
                <Field label={t('partners.message')}><textarea className="input" rows="3" value={form.message} onChange={set('message')} /></Field>
                {error && <p className="form__error" role="alert">{error}</p>}
                <button type="submit" className="btn btn--lg">{t('partners.submit')}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
