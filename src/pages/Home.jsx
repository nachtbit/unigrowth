import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useI18n } from '../i18n/index.jsx'
import { usePublicData } from '../data/store.jsx'
import HeroArt from '../components/HeroArt.jsx'
import { AgencyCard, ProgramCard, UniversityCard } from '../components/Cards.jsx'

function Hero() {
  const { t } = useI18n()
  const steps = [t('hero.step1'), t('hero.step2'), t('hero.step3')]
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="badge badge--soft">{t('hero.badge')}</span>
          <h1>{t('hero.title')}</h1>
          <p className="lead">{t('hero.text')}</p>
          <ul className="hero__steps">
            {steps.map((s, i) => (
              <li key={s} style={{ '--i': i }}>
                <span className="hero__num">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div className="hero__actions">
            <Link to="/universities" className="btn btn--lg">{t('hero.primary')}</Link>
            <Link to="/agencies" className="btn btn--outline btn--lg">{t('hero.secondary')}</Link>
          </div>
        </div>
        <div className="hero__art"><HeroArt /></div>
      </div>
    </section>
  )
}

function Stats() {
  const { t } = useI18n()
  const { universities, programs, agencies, countries } = usePublicData()
  const items = [
    [universities.length, t('stats.universities')],
    [programs.length, t('stats.programs')],
    [agencies.length, t('stats.agencies')],
    [countries.length, t('stats.countries')],
  ]
  return (
    <section className="container stats">
      {items.map(([n, label]) => (
        <div key={label} className="stat">
          <strong>{n}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  )
}

function How() {
  const { t } = useI18n()
  const cards = [
    ['students', '🎓'],
    ['agencies', '🤝'],
    ['universities', '🏛️'],
  ]
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <h2>{t('how.title')}</h2>
          <p className="lead">{t('how.text')}</p>
        </div>
        <div className="grid grid--3">
          {cards.map(([key, icon], i) => (
            <div key={key} className={`panel ${i === 0 ? 'panel--primary' : ''}`}>
              <div className="panel__icon" aria-hidden="true">{icon}</div>
              <h3>{t(`how.${key}`)}</h3>
              <p>{t(`how.${key}Text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHead({ title, to }) {
  const { t } = useI18n()
  return (
    <div className="section__head section__head--row">
      <h2>{title}</h2>
      <Link to={to} className="btn btn--ghost btn--sm">{t('common.viewAll')} →</Link>
    </div>
  )
}

function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState(0)
  const items = [1, 2, 3, 4]
  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="section__head"><h2>{t('home.faqTitle')}</h2></div>
        <div className="faq">
          {items.map((n, i) => (
            <div key={n} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button type="button" className="faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {t(`home.faq${n}q`)}
                <span className="faq__plus" aria-hidden="true" />
              </button>
              <div className="faq__a"><p>{t(`home.faq${n}a`)}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useI18n()
  const { universities, programs, agencies } = usePublicData()
  return (
    <>
      <Hero />
      <Stats />
      <How />

      <section className="section section--tint">
        <div className="container">
          <SectionHead title={t('home.featuredUniversities')} to="/universities" />
          <div className="grid grid--3">
            {universities.slice(0, 3).map((u) => <UniversityCard key={u.id} university={u} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={t('home.popularPrograms')} to="/programs" />
          <div className="grid grid--3">
            {programs.slice(0, 3).map((p) => <ProgramCard key={p.id} program={p} />)}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="banner">
          <div>
            <h2>{t('home.freeTitle')}</h2>
            <p>{t('home.freeText')}</p>
          </div>
          <Link to="/universities" className="btn btn--white btn--lg">{t('hero.primary')}</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={t('home.trustedAgencies')} to="/agencies" />
          <div className="grid grid--3">
            {agencies.slice(0, 3).map((a) => <AgencyCard key={a.id} agency={a} />)}
          </div>
        </div>
      </section>

      <Faq />

      <section className="container section">
        <div className="cta">
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaText')}</p>
          <Link to="/partners" className="btn btn--lg">{t('home.ctaButton')}</Link>
        </div>
      </section>
    </>
  )
}
