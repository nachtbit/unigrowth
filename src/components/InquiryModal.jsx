import { useState } from 'react'
import { useI18n } from '../i18n/index.jsx'
import { useStore } from '../data/store.jsx'
import { Field, Modal } from './ui.jsx'

// Student request form. `target` = { type: 'university' | 'agency', id, name, programId? }
export default function InquiryModal({ target, onClose }) {
  const { t } = useI18n()
  const { upsert } = useStore()
  const [form, setForm] = useState({ studentName: '', email: '', phone: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.studentName.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(t('inquiry.required'))
      return
    }
    upsert('inquiries', {
      targetType: target.type,
      targetId: target.id,
      programId: target.programId || null,
      ...form,
      status: 'new',
    })
    setSent(true)
  }

  return (
    <Modal title={sent ? t('inquiry.sentTitle') : t('inquiry.title')} onClose={onClose}>
      {sent ? (
        <div className="success">
          <div className="success__icon" aria-hidden="true">✓</div>
          <p>{t('inquiry.sentText')}</p>
          <button type="button" className="btn" onClick={onClose}>{t('common.close')}</button>
        </div>
      ) : (
        <form onSubmit={submit} className="form" noValidate>
          <p className="muted">{t('inquiry.to')}: <strong>{target.name}</strong></p>
          <Field label={t('inquiry.name')}>
            <input className="input" value={form.studentName} onChange={set('studentName')} autoComplete="name" />
          </Field>
          <Field label={t('inquiry.email')}>
            <input className="input" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
          </Field>
          <Field label={t('inquiry.phone')}>
            <input className="input" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
          </Field>
          <Field label={t('inquiry.message')}>
            <textarea className="input" rows="4" value={form.message} onChange={set('message')} placeholder={t('inquiry.placeholder')} />
          </Field>
          {error && <p className="form__error" role="alert">{error}</p>}
          <div className="form__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>{t('common.cancel')}</button>
            <button type="submit" className="btn">{t('common.send')}</button>
          </div>
        </form>
      )}
    </Modal>
  )
}
