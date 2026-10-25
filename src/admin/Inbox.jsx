import { useMemo, useState } from 'react'
import { useStore } from '../data/store.jsx'
import { INQUIRY_STATUSES } from '../data/seed.js'
import { StatusPill } from './Resources.jsx'

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export function InquiriesAdmin() {
  const { data, upsert, remove } = useStore()
  const [status, setStatus] = useState('')
  const [query, setQuery] = useState('')

  const targetName = (i) =>
    (i.targetType === 'agency' ? data.agencies : data.universities).find((x) => x.id === i.targetId)?.name || '(deleted)'

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return [...data.inquiries]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .filter((i) => (!status || i.status === status) && (!needle || `${i.studentName} ${i.email} ${i.message}`.toLowerCase().includes(needle)))
  }, [data.inquiries, status, query])

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1>Student inquiries</h1>
          <p className="muted">{list.length} of {data.inquiries.length}</p>
        </div>
      </div>
      <div className="admin-toolbar">
        <input className="input" type="search" placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{cap(s)}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Date</th><th>Student</th><th>To</th><th>Message</th><th>Status</th><th className="table__actions-h">Actions</th></tr>
          </thead>
          <tbody>
            {list.map((i) => (
              <tr key={i.id}>
                <td data-label="Date">{i.createdAt}</td>
                <td data-label="Student"><strong>{i.studentName}</strong><br /><span className="muted">{i.email}{i.phone && ` · ${i.phone}`}</span></td>
                <td data-label="To">
                  {targetName(i)}
                  <br /><span className="muted">{cap(i.targetType)}{i.programId && ` · ${data.programs.find((p) => p.id === i.programId)?.title || ''}`}</span>
                </td>
                <td data-label="Message" className="table__msg">{i.message}</td>
                <td data-label="Status">
                  <select className="input input--sm" value={i.status} onChange={(e) => upsert('inquiries', { ...i, status: e.target.value })}>
                    {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{cap(s)}</option>)}
                  </select>
                </td>
                <td className="table__actions">
                  <button type="button" className="btn btn--sm btn--danger" onClick={() => window.confirm('Delete this inquiry?') && remove('inquiries', i.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan="6" className="table__empty">Nothing here.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function PartnerRequestsAdmin() {
  const { data, approvePartnerRequest, upsert, remove } = useStore()
  const [picked, setPicked] = useState({}) // requestId -> countryId override
  const [status, setStatus] = useState('pending')

  const list = useMemo(
    () => [...data.partnerRequests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).filter((r) => !status || r.status === status),
    [data.partnerRequests, status],
  )

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1>Partner requests</h1>
          <p className="muted">Manual verification: approving creates a verified agency or university.</p>
        </div>
      </div>
      <div className="admin-toolbar">
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="requests">
        {list.map((r) => {
          const countryId = picked[r.id] ?? r.countryId
          return (
            <article key={r.id} className="request">
              <div className="request__head">
                <div>
                  <strong>{r.orgName}</strong> <span className="tag tag--soft">{cap(r.kind)}</span>
                  <div className="muted">{r.contactName} · {r.email}{r.phone && ` · ${r.phone}`} · {r.createdAt}</div>
                </div>
                <StatusPill status={r.status === 'approved' ? 'verified' : r.status} />
              </div>
              {r.website && <p className="muted">{r.website}</p>}
              {r.message && <p>{r.message}</p>}
              <div className="request__actions">
                {r.status === 'pending' && (
                  <>
                    <select className="input input--sm" value={countryId || ''} onChange={(e) => setPicked({ ...picked, [r.id]: e.target.value })}>
                      <option value="">Select country…</option>
                      {data.countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.name.en}</option>)}
                    </select>
                    <button type="button" className="btn btn--sm" disabled={!countryId} onClick={() => approvePartnerRequest(r, countryId)}>Approve and verify</button>
                    <button type="button" className="btn btn--sm btn--ghost" onClick={() => upsert('partnerRequests', { ...r, status: 'rejected' })}>Reject</button>
                  </>
                )}
                <button type="button" className="btn btn--sm btn--danger" onClick={() => window.confirm('Delete this request?') && remove('partnerRequests', r.id)}>Delete</button>
              </div>
            </article>
          )
        })}
        {list.length === 0 && <div className="empty">No requests.</div>}
      </div>
    </div>
  )
}
