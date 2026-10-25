import { useRef, useState } from 'react'
import { useStore } from '../data/store.jsx'

const COLLECTIONS = ['countries', 'universities', 'programs', 'agencies', 'inquiries', 'partnerRequests']

export default function Settings() {
  const { data, reset, importData } = useStore()
  const fileRef = useRef(null)
  const [message, setMessage] = useState('')

  const flash = (m) => {
    setMessage(m)
    setTimeout(() => setMessage(''), 3000)
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `unigrowth-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const onImport = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text())
      if (!COLLECTIONS.every((c) => Array.isArray(parsed[c]))) throw new Error('bad shape')
      if (!window.confirm('Replace all current data with this file?')) return
      importData(parsed)
      flash('Data imported.')
    } catch {
      flash('Invalid file. Expected an exported UniGrowth JSON.')
    }
  }

  return (
    <div>
      <div className="admin-head"><h1>Settings</h1></div>
      <div className="admin-two">
        <section className="panel">
          <h3>Mock data</h3>
          <p className="muted">All data lives in this browser (localStorage). There is no backend yet.</p>
          <div className="settings-actions">
            <button type="button" className="btn btn--outline" onClick={exportJson}>Export JSON</button>
            <button type="button" className="btn btn--outline" onClick={() => fileRef.current?.click()}>Import JSON</button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={onImport} />
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => {
                if (window.confirm('Reset all data to the original demo data?')) {
                  reset()
                  flash('Data reset.')
                }
              }}
            >
              Reset to demo data
            </button>
          </div>
          {message && <p className="notice" role="status">{message}</p>}
        </section>
        <section className="panel">
          <h3>Data summary</h3>
          <ul className="plain-list">
            {COLLECTIONS.map((c) => <li key={c}><span>{c}</span><strong>{data[c].length}</strong></li>)}
          </ul>
        </section>
      </div>
    </div>
  )
}
