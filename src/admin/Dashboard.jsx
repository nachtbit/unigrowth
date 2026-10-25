import { Link } from 'react-router-dom'
import { useStore } from '../data/store.jsx'

export default function Dashboard() {
  const { data } = useStore()
  const verified = (list) => list.filter((x) => x.status === 'verified').length
  const pending = (list) => list.filter((x) => x.status === 'pending').length

  const stats = [
    ['Universities', data.universities.length, `${verified(data.universities)} verified · ${pending(data.universities)} pending`, '/admin/universities'],
    ['Programs', data.programs.length, 'across all universities', '/admin/programs'],
    ['Agencies', data.agencies.length, `${verified(data.agencies)} verified · ${pending(data.agencies)} pending`, '/admin/agencies'],
    ['Countries', data.countries.length, 'available destinations', '/admin/countries'],
    ['Partner requests', data.partnerRequests.filter((r) => r.status === 'pending').length, 'waiting for review', '/admin/partner-requests'],
    ['Student inquiries', data.inquiries.length, `${data.inquiries.filter((i) => i.status === 'new').length} new`, '/admin/inquiries'],
  ]

  // Inquiries per destination country (university inquiries use the university's country)
  const counts = {}
  data.inquiries.forEach((i) => {
    let cid
    if (i.targetType === 'university') cid = data.universities.find((u) => u.id === i.targetId)?.countryId
    else cid = data.agencies.find((a) => a.id === i.targetId)?.countryIds?.[0]
    if (cid) counts[cid] = (counts[cid] || 0) + 1
  })
  const chart = Object.entries(counts)
    .map(([id, n]) => ({ c: data.countries.find((c) => c.id === id), n }))
    .filter((x) => x.c)
    .sort((a, b) => b.n - a.n)
  const max = Math.max(1, ...chart.map((x) => x.n))

  const recent = [...data.inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)

  return (
    <div>
      <div className="admin-head"><h1>Dashboard</h1></div>
      <div className="admin-stats">
        {stats.map(([label, n, sub, to]) => (
          <Link key={label} to={to} className="admin-stat">
            <span className="admin-stat__label">{label}</span>
            <strong>{n}</strong>
            <span className="muted">{sub}</span>
          </Link>
        ))}
      </div>

      <div className="admin-two">
        <section className="panel">
          <h3>Inquiries by country</h3>
          {chart.length === 0 && <p className="muted">No data yet.</p>}
          <div className="bars">
            {chart.map(({ c, n }) => (
              <div key={c.id} className="bars__row">
                <span>{c.flag} {c.name.en}</span>
                <div className="bars__track"><div className="bars__fill" style={{ width: `${(n / max) * 100}%` }} /></div>
                <strong>{n}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h3>Recent inquiries</h3>
          {recent.map((i) => (
            <div key={i.id} className="recent">
              <div><strong>{i.studentName}</strong><div className="muted">{i.message.slice(0, 70)}{i.message.length > 70 ? '…' : ''}</div></div>
              <span className={`pill pill--${i.status === 'new' ? 'pending' : i.status === 'closed' ? 'rejected' : 'verified'}`}>{i.status}</span>
            </div>
          ))}
          {recent.length === 0 && <p className="muted">No inquiries yet.</p>}
        </section>
      </div>
    </div>
  )
}
