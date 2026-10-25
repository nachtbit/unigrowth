import { useMemo, useState } from 'react'
import { useStore } from '../data/store.jsx'
import { Modal } from '../components/ui.jsx'

const LANGS = ['en', 'az', 'ru']
export const STATUS_OPTIONS = [
  { value: 'verified', label: 'Verified' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
]

function FieldInput({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea':
      return <textarea className="input" rows="3" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    case 'number':
      return (
        <input
          className="input"
          type="number"
          step={field.step || 1}
          min={field.min ?? 0}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
      )
    case 'select':
      return (
        <select className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      )
    case 'localized':
      return (
        <div className="localized">
          {LANGS.map((l) => (
            <div key={l} className="localized__row">
              <span className="localized__lang">{l.toUpperCase()}</span>
              {field.multiline ? (
                <textarea className="input" rows="2" value={value?.[l] ?? ''} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
              ) : (
                <input className="input" value={value?.[l] ?? ''} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
              )}
            </div>
          ))}
        </div>
      )
    case 'multiselect':
      return (
        <div className="checkgroup">
          {field.options.map((o) => {
            const list = value || []
            const checked = list.includes(o.value)
            return (
              <label key={o.value} className={`chip ${checked ? 'is-on' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(checked ? list.filter((v) => v !== o.value) : [...list, o.value])}
                />
                {o.label}
              </label>
            )
          })}
        </div>
      )
    case 'csv':
      return (
        <input
          className="input"
          value={(value || []).join(', ')}
          onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
          placeholder="EN, AZ, RU"
        />
      )
    default:
      return <input className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
  }
}

function isEmpty(field, value) {
  if (field.type === 'localized') return !value?.en?.trim()
  if (field.type === 'multiselect') return !value?.length
  if (field.type === 'number') return value === '' || value == null
  return value == null || String(value).trim() === ''
}

// Generic list + create/edit/delete screen driven by a config.
export default function Crud({ title, col, columns, fields, blank, searchText, hasStatus = false, canAdd = true }) {
  const { data, upsert, remove } = useStore()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [editing, setEditing] = useState(null) // item being edited (new or existing)
  const [isNew, setIsNew] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const items = data[col]
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items.filter(
      (i) =>
        (!status || i.status === status) &&
        (!needle || searchText(i, data).toLowerCase().includes(needle)),
    )
  }, [items, query, status, searchText, data])

  const openNew = () => {
    setEditing(structuredClone(blank))
    setIsNew(true)
    setError('')
  }
  const openEdit = (item) => {
    setEditing(structuredClone(item))
    setIsNew(false)
    setError('')
  }

  const save = (e) => {
    e.preventDefault()
    const missing = fields.find((f) => f.required && isEmpty(f, editing[f.key]))
    if (missing) {
      setError(`${missing.label} is required.`)
      return
    }
    upsert(col, editing)
    setEditing(null)
    setNotice(isNew ? 'Created.' : 'Saved.')
    setTimeout(() => setNotice(''), 2000)
  }

  const del = (item) => {
    if (!window.confirm(`Delete "${item.name || item.title || item.id}"? This cannot be undone.`)) return
    const err = remove(col, item.id)
    setNotice(err || 'Deleted.')
    setTimeout(() => setNotice(''), 3500)
  }

  const setStatusOf = (item, value) => upsert(col, { ...item, status: value })

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1>{title}</h1>
          <p className="muted">{filtered.length} of {items.length}</p>
        </div>
        {canAdd && <button type="button" className="btn" onClick={openNew}>+ Add new</button>}
      </div>

      <div className="admin-toolbar">
        <input className="input" type="search" placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
        {hasStatus && (
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        )}
        {notice && <span className="notice" role="status">{notice}</span>}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              {columns.map((c) => <th key={c.label}>{c.label}</th>)}
              <th className="table__actions-h">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                {columns.map((c) => <td key={c.label} data-label={c.label}>{c.render(item, data)}</td>)}
                <td className="table__actions">
                  {hasStatus && item.status !== 'verified' && (
                    <button type="button" className="btn btn--sm btn--soft" onClick={() => setStatusOf(item, 'verified')}>Verify</button>
                  )}
                  {hasStatus && item.status === 'pending' && (
                    <button type="button" className="btn btn--sm btn--ghost" onClick={() => setStatusOf(item, 'rejected')}>Reject</button>
                  )}
                  <button type="button" className="btn btn--sm btn--outline" onClick={() => openEdit(item)}>Edit</button>
                  <button type="button" className="btn btn--sm btn--danger" onClick={() => del(item)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="table__empty">Nothing here.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal title={`${isNew ? 'Add' : 'Edit'} ${title.toLowerCase()}`} onClose={() => setEditing(null)} wide>
          <form className="form" onSubmit={save} noValidate>
            <div className="form__grid">
              {fields.map((f) => (
                <label key={f.key} className={`field ${f.wide ? 'field--wide' : ''}`}>
                  <span className="field__label">{f.label}{f.required && ' *'}</span>
                  <FieldInput field={f} value={editing[f.key]} onChange={(v) => setEditing((cur) => ({ ...cur, [f.key]: v }))} />
                </label>
              ))}
            </div>
            {error && <p className="form__error" role="alert">{error}</p>}
            <div className="form__actions">
              <button type="button" className="btn btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn">{isNew ? 'Create' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
