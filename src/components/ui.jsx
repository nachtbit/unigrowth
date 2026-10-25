import { useEffect } from 'react'
import { useI18n } from '../i18n/index.jsx'

export function Avatar({ name, size = 56 }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.36 }} aria-hidden="true">
      {initials}
    </span>
  )
}

export function VerifiedBadge() {
  const { t } = useI18n()
  return (
    <span className="badge badge--verified">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {t('common.verified')}
    </span>
  )
}

export function PageHeader({ title, text, children }) {
  return (
    <header className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </header>
  )
}

export function Empty({ children }) {
  return <div className="empty">{children}</div>
}

export function Modal({ title, onClose, children, wide = false }) {
  const { t } = useI18n()
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${wide ? 'modal--wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal__head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('common.close')}>
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, children, hint }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}
