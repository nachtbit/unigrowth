import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <section className="container container--narrow section not-found">
      <strong className="not-found__code">404</strong>
      <h1>{t('notFound.title')}</h1>
      <p className="lead">{t('notFound.text')}</p>
      <Link to="/" className="btn btn--lg">{t('notFound.home')}</Link>
    </section>
  )
}
