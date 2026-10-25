import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Universities from './pages/Universities.jsx'
import UniversityDetail from './pages/UniversityDetail.jsx'
import Programs from './pages/Programs.jsx'
import Agencies from './pages/Agencies.jsx'
import AgencyDetail from './pages/AgencyDetail.jsx'
import Partners from './pages/Partners.jsx'
import { PortalDashboard, PortalLogin } from './pages/Portal.jsx'
import NotFound from './pages/NotFound.jsx'
import AdminLogin from './admin/Login.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Settings from './admin/Settings.jsx'
import { AgenciesAdmin, CountriesAdmin, ProgramsAdmin, UniversitiesAdmin } from './admin/Resources.jsx'
import { InquiriesAdmin, PartnerRequestsAdmin } from './admin/Inbox.jsx'
import { Navigate } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="universities" element={<Universities />} />
        <Route path="universities/:id" element={<UniversityDetail />} />
        <Route path="programs" element={<Programs />} />
        <Route path="agencies" element={<Agencies />} />
        <Route path="agencies/:id" element={<AgencyDetail />} />
        <Route path="partners" element={<Partners />} />
        <Route path="portal" element={<PortalLogin />} />
        <Route path="portal/dashboard" element={<PortalDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="admin">
        <Route index element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="partner-requests" element={<PartnerRequestsAdmin />} />
          <Route path="universities" element={<UniversitiesAdmin />} />
          <Route path="programs" element={<ProgramsAdmin />} />
          <Route path="agencies" element={<AgenciesAdmin />} />
          <Route path="countries" element={<CountriesAdmin />} />
          <Route path="inquiries" element={<InquiriesAdmin />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
