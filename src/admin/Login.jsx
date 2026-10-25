import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ADMIN_EMAIL, ADMIN_PASSWORD, useAdminAuth } from './auth.jsx'

export default function AdminLogin() {
  const { authed, login } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (authed) return <Navigate to="/admin/dashboard" replace />

  const submit = (e) => {
    e.preventDefault()
    if (login(email, password)) navigate('/admin/dashboard', { replace: true })
    else setError('Wrong email or password.')
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card form" onSubmit={submit}>
        <img src="/logos/unigrowth-logo.svg" alt="UniGrowth" height="38" />
        <h1>Admin panel</h1>
        <label className="field">
          <span className="field__label">Email</span>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" autoFocus />
        </label>
        <label className="field">
          <span className="field__label">Password</span>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </label>
        {error && <p className="form__error" role="alert">{error}</p>}
        <button className="btn btn--lg" type="submit">Log in</button>
        <p className="muted admin-login__hint">
          Demo credentials: <code>{ADMIN_EMAIL}</code> / <code>{ADMIN_PASSWORD}</code>
        </p>
      </form>
    </div>
  )
}
