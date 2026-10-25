import Crud, { STATUS_OPTIONS } from './Crud.jsx'
import { DEGREES, FIELDS, SERVICES } from '../data/seed.js'
import { useStore } from '../data/store.jsx'

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const countryOptions = (data) => data.countries.map((c) => ({ value: c.id, label: `${c.flag} ${c.name.en}` }))
const countryName = (data, id) => {
  const c = data.countries.find((x) => x.id === id)
  return c ? `${c.flag} ${c.name.en}` : '—'
}

export function StatusPill({ status }) {
  return <span className={`pill pill--${status}`}>{cap(status)}</span>
}

export function CountriesAdmin() {
  return (
    <Crud
      title="Countries"
      col="countries"
      blank={{ flag: '', name: { en: '', az: '', ru: '' } }}
      searchText={(c) => `${c.name.en} ${c.name.az} ${c.name.ru}`}
      columns={[
        { label: 'Flag', render: (c) => <span className="flag-lg">{c.flag}</span> },
        { label: 'English', render: (c) => c.name.en },
        { label: 'Azərbaycan', render: (c) => c.name.az },
        { label: 'Русский', render: (c) => c.name.ru },
      ]}
      fields={[
        { key: 'flag', label: 'Flag emoji', required: true },
        { key: 'name', label: 'Name', type: 'localized', required: true, wide: true },
      ]}
    />
  )
}

export function UniversitiesAdmin() {
  const { data } = useStore()
  return (
    <Crud
      title="Universities"
      col="universities"
      hasStatus
      blank={{ name: '', countryId: '', city: '', founded: 2000, students: 0, tuitionFrom: 0, ranking: 0, website: '', status: 'verified', description: { en: '', az: '', ru: '' } }}
      searchText={(u, d) => `${u.name} ${u.city} ${countryName(d, u.countryId)}`}
      columns={[
        { label: 'Name', render: (u) => <strong>{u.name}</strong> },
        { label: 'Country', render: (u, d) => countryName(d, u.countryId) },
        { label: 'City', render: (u) => u.city || '—' },
        { label: 'Programs', render: (u, d) => d.programs.filter((p) => p.universityId === u.id).length },
        { label: 'Status', render: (u) => <StatusPill status={u.status} /> },
      ]}
      fields={[
        { key: 'name', label: 'Name', required: true },
        { key: 'countryId', label: 'Country', type: 'select', options: countryOptions(data), required: true },
        { key: 'city', label: 'City' },
        { key: 'website', label: 'Website' },
        { key: 'founded', label: 'Founded (year)', type: 'number' },
        { key: 'students', label: 'Students', type: 'number' },
        { key: 'tuitionFrom', label: 'Tuition from (USD / year)', type: 'number' },
        { key: 'ranking', label: 'National rank', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, required: true },
        { key: 'description', label: 'Description', type: 'localized', multiline: true, required: true, wide: true },
      ]}
    />
  )
}

export function ProgramsAdmin() {
  const { data } = useStore()
  return (
    <Crud
      title="Programs"
      col="programs"
      blank={{ title: '', universityId: '', degree: 'bachelor', field: 'business', years: 3, tuition: 0, language: 'English', intake: 'September' }}
      searchText={(p, d) => `${p.title} ${p.degree} ${p.field} ${d.universities.find((u) => u.id === p.universityId)?.name || ''}`}
      columns={[
        { label: 'Title', render: (p) => <strong>{p.title}</strong> },
        { label: 'University', render: (p, d) => d.universities.find((u) => u.id === p.universityId)?.name || '—' },
        { label: 'Degree', render: (p) => cap(p.degree) },
        { label: 'Field', render: (p) => cap(p.field) },
        { label: 'Tuition', render: (p) => (p.tuition ? `$${p.tuition.toLocaleString()}` : '—') },
      ]}
      fields={[
        { key: 'title', label: 'Title', required: true },
        { key: 'universityId', label: 'University', type: 'select', options: data.universities.map((u) => ({ value: u.id, label: u.name })), required: true },
        { key: 'degree', label: 'Degree', type: 'select', options: DEGREES.map((d) => ({ value: d, label: cap(d) })), required: true },
        { key: 'field', label: 'Field', type: 'select', options: FIELDS.map((f) => ({ value: f, label: cap(f) })), required: true },
        { key: 'years', label: 'Duration (years)', type: 'number', step: 0.5 },
        { key: 'tuition', label: 'Tuition (USD / year)', type: 'number' },
        { key: 'language', label: 'Language of instruction' },
        { key: 'intake', label: 'Intake' },
      ]}
    />
  )
}

export function AgenciesAdmin() {
  const { data } = useStore()
  return (
    <Crud
      title="Agencies"
      col="agencies"
      hasStatus
      blank={{ name: '', city: '', countryIds: [], languages: ['EN'], services: ['counseling'], rating: 0, studentsHelped: 0, email: '', phone: '', website: '', status: 'verified', description: { en: '', az: '', ru: '' } }}
      searchText={(a) => `${a.name} ${a.city} ${a.email}`}
      columns={[
        { label: 'Name', render: (a) => <strong>{a.name}</strong> },
        { label: 'City', render: (a) => a.city || '—' },
        { label: 'Destinations', render: (a, d) => a.countryIds.map((id) => d.countries.find((c) => c.id === id)?.flag).join(' ') },
        { label: 'Contact', render: (a) => a.email },
        { label: 'Status', render: (a) => <StatusPill status={a.status} /> },
      ]}
      fields={[
        { key: 'name', label: 'Name', required: true },
        { key: 'city', label: 'City' },
        { key: 'email', label: 'Email', required: true },
        { key: 'phone', label: 'Phone' },
        { key: 'website', label: 'Website' },
        { key: 'languages', label: 'Languages (comma separated)', type: 'csv' },
        { key: 'rating', label: 'Rating (0 to 5)', type: 'number', step: 0.1 },
        { key: 'studentsHelped', label: 'Students helped', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, required: true },
        { key: 'countryIds', label: 'Destination countries', type: 'multiselect', options: countryOptions(data), required: true, wide: true },
        { key: 'services', label: 'Services', type: 'multiselect', options: SERVICES.map((s) => ({ value: s, label: cap(s) })), wide: true },
        { key: 'description', label: 'Description', type: 'localized', multiline: true, required: true, wide: true },
      ]}
    />
  )
}
