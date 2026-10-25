import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './fonts.js'
import './index.css'
import App from './App.jsx'
import { I18nProvider } from './i18n/index.jsx'
import { StoreProvider } from './data/store.jsx'
import { AdminAuthProvider } from './admin/auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <StoreProvider>
          <AdminAuthProvider>
            <App />
          </AdminAuthProvider>
        </StoreProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
