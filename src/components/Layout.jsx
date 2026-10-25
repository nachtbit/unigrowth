import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { LANGUAGES, useI18n } from '../i18n/index.jsx'
import { useEffect } from 'react'

function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  return (
    <div className="lang" role="group" aria-label="Language">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang__btn ${lang === l.code ? 'is-active' : ''}`}
          onClick={() => setLang(l.code)}
          title={l.name}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const links = [
    ['/', t('nav.home'), true],
    ['/universities', t('nav.universities')],
    ['/programs', t('nav.programs')],
    ['/agencies', t('nav.agencies')],
    ['/partners', t('nav.partners')],
  ]

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="UniGrowth">
          <img src="/logos/unigrowth-logo.svg" alt="UniGrowth" height="34" />
        </Link>
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {links.map(([to, label, end]) => (
            <NavLink key={to} to={to} end={end} className="nav__link">
              {label}
            </NavLink>
          ))}
          <Link to="/portal" className="btn btn--outline btn--sm nav__portal">
            {t('nav.portal')}
          </Link>
        </nav>
        <div className="site-header__tools">
          <LanguageSwitcher />
          <button
            type="button"
            className="burger"
            aria-label={t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <img src="/logos/unigrowth-logo.svg" alt="UniGrowth" height="34" />
          <p>{t('footer.tagline')}</p>
        </div>
        <div>
          <h4>{t('footer.explore')}</h4>
          <Link to="/universities">{t('nav.universities')}</Link>
          <Link to="/programs">{t('nav.programs')}</Link>
          <Link to="/agencies">{t('nav.agencies')}</Link>
        </div>
        <div>
          <h4>{t('footer.company')}</h4>
          <Link to="/partners">{t('nav.partners')}</Link>
          <Link to="/portal">{t('nav.portal')}</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} UniGrowth. {t('footer.rights')}</span>
        <span>{t('footer.demo')}</span>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
