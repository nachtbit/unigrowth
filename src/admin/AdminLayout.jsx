import { Link, NavLink, Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from './auth.jsx'
import { useStore } from '../data/store.jsx'
import { useState } from 'react'

export default function AdminLayout() {
  const { authed, logout } = useAdminAuth()
  const { data } = useStore()
  const [open, setOpen] = useState(false)
  if (!authed) return <Navigate to="/admin" replace />

  const pendingRequests = data.partnerRequests.filter((r) => r.status === 'pending').length
  const newInquiries = data.inquiries.filter((i) => i.status === 'new').length
  const pendingOrgs =
    data.universities.filter((u) => u.status === 'pending').length +
    data.agencies.filter((a) => a.status === 'pending').length

  const items = [
    ['dashboard', 'Dashboard'],
    ['partner-requests', 'Partner requests', pendingRequests],
    ['universities', 'Universities', data.universities.filter((u) => u.status === 'pending').length],
    ['programs', 'Programs'],
    ['agencies', 'Agencies', data.agencies.filter((a) => a.status === 'pending').length],
    ['countries', 'Countries'],
    ['inquiries', 'Student inquiries', newInquiries],
    ['settings', 'Settings'],
  ]

  return (
    <div className="admin">
      <aside className={`admin__side ${open ? 'is-open' : ''}`}>
        <Link to="/admin/dashboard" className="admin__brand">
          <img src="/logos/unigrowth-logo.svg" alt="UniGrowth" height="30" />
        </Link>
        <nav>
          {items.map(([to, label, count]) => (
            <NavLink key={to} to={`/admin/${to}`} className="admin__link" onClick={() => setOpen(false)}>
              {label}
              {count > 0 && <span className="count-pill">{count}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="admin__side-foot">
          <Link to="/" className="admin__link">← View site</Link>
          <button type="button" className="admin__link admin__link--btn" onClick={logout}>Log out</button>
        </div>
      </aside>
      <div className="admin__main">
        <div className="admin__bar">
          <button type="button" className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
          <span className="muted">
            {pendingOrgs + pendingRequests > 0 ? `${pendingOrgs + pendingRequests} item(s) need review` : 'Everything is reviewed'}
          </span>
        </div>
        <div className="admin__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
