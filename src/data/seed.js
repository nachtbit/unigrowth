// Mock data seed. Replace the data layer in store.jsx with a real API later.
// Localized fields use { en, az, ru }. Status values: 'verified' | 'pending' | 'rejected'.

export const DEGREES = ['bachelor', 'master', 'phd', 'foundation']
export const FIELDS = ['business', 'engineering', 'computing', 'medicine', 'arts', 'law', 'social']
export const SERVICES = ['counseling', 'applications', 'visa', 'scholarships', 'language', 'accommodation']
export const INQUIRY_STATUSES = ['new', 'contacted', 'closed']

const countries = [
  { id: 'uk', flag: '🇬🇧', name: { en: 'United Kingdom', az: 'Birləşmiş Krallıq', ru: 'Великобритания' } },
  { id: 'us', flag: '🇺🇸', name: { en: 'United States', az: 'Amerika Birləşmiş Ştatları', ru: 'США' } },
  { id: 'de', flag: '🇩🇪', name: { en: 'Germany', az: 'Almaniya', ru: 'Германия' } },
  { id: 'ca', flag: '🇨🇦', name: { en: 'Canada', az: 'Kanada', ru: 'Канада' } },
  { id: 'tr', flag: '🇹🇷', name: { en: 'Türkiye', az: 'Türkiyə', ru: 'Турция' } },
  { id: 'pl', flag: '🇵🇱', name: { en: 'Poland', az: 'Polşa', ru: 'Польша' } },
  { id: 'hu', flag: '🇭🇺', name: { en: 'Hungary', az: 'Macarıstan', ru: 'Венгрия' } },
  { id: 'nl', flag: '🇳🇱', name: { en: 'Netherlands', az: 'Niderland', ru: 'Нидерланды' } },
]

const uniDescription = (name, city) => ({
  en: `${name} is a modern university in ${city}, known for hands-on teaching, strong industry links and a welcoming international community.`,
  az: `${name} ${city} şəhərində yerləşən müasir universitetdir. Praktiki tədris, sənaye ilə güclü əlaqələr və qonaqpərvər beynəlxalq icma ilə tanınır.`,
  ru: `${name} — современный университет в городе ${city}. Известен практическим обучением, тесными связями с индустрией и дружелюбным международным сообществом.`,
})

const uni = (id, name, countryId, city, founded, students, tuitionFrom, ranking, status = 'verified') => ({
  id,
  name,
  countryId,
  city,
  founded,
  students,
  tuitionFrom,
  ranking,
  website: `https://www.${id.replace('u-', '')}.example.edu`,
  description: uniDescription(name, city),
  status,
  createdAt: '2026-09-01',
})

const universities = [
  uni('u-northbridge', 'Northbridge University', 'uk', 'Manchester', 1851, 32000, 18500, 12),
  uni('u-kingsford', 'Kingsford College London', 'uk', 'London', 1826, 28000, 24000, 6),
  uni('u-lakeshore', 'Lakeshore University', 'us', 'Chicago', 1890, 17000, 42000, 15),
  uni('u-pacificridge', 'Pacific Ridge University', 'us', 'Seattle', 1861, 48000, 39000, 9),
  uni('u-rhinegarten', 'Rhinegarten Technical University', 'de', 'Munich', 1868, 45000, 600, 3),
  uni('u-spree', 'Spree Institute of Technology', 'de', 'Berlin', 1946, 35000, 500, 8),
  uni('u-maplevalley', 'Maple Valley University', 'ca', 'Toronto', 1827, 93000, 21000, 2),
  uni('u-bosphorus', 'Bosphorus Global University', 'tr', 'Istanbul', 1971, 22000, 6500, 5),
  uni('u-vistula', 'Vistula Polytechnic', 'pl', 'Warsaw', 1915, 31000, 3200, 4),
  uni('u-danube', 'Danube Business School', 'hu', 'Budapest', 1920, 14000, 4800, 3),
  uni('u-canalcity', 'Canal City University', 'nl', 'Amsterdam', 1632, 40000, 12500, 1),
  uni('u-aurora', 'Aurora Coast University', 'ca', 'Vancouver', 1908, 25000, 19500, 10, 'pending'),
]

const prog = (id, uniId, title, degree, field, years, tuition, language, intake) => ({
  id,
  universityId: uniId,
  title,
  degree,
  field,
  years,
  tuition,
  language,
  intake,
})

const programs = [
  prog('p1', 'u-northbridge', 'Business Management', 'bachelor', 'business', 3, 18500, 'English', 'September'),
  prog('p2', 'u-northbridge', 'Data Science', 'master', 'computing', 1, 22000, 'English', 'September'),
  prog('p3', 'u-kingsford', 'International Law', 'master', 'law', 1, 27000, 'English', 'September'),
  prog('p4', 'u-kingsford', 'Digital Design', 'bachelor', 'arts', 3, 24000, 'English', 'September, January'),
  prog('p5', 'u-lakeshore', 'Computer Science', 'bachelor', 'computing', 4, 42000, 'English', 'August'),
  prog('p6', 'u-lakeshore', 'Public Policy', 'master', 'social', 2, 45000, 'English', 'August'),
  prog('p7', 'u-pacificridge', 'Mechanical Engineering', 'bachelor', 'engineering', 4, 39000, 'English', 'September'),
  prog('p8', 'u-pacificridge', 'Artificial Intelligence', 'phd', 'computing', 4, 0, 'English', 'September'),
  prog('p9', 'u-rhinegarten', 'Electrical Engineering', 'bachelor', 'engineering', 3, 600, 'German, English', 'October'),
  prog('p10', 'u-rhinegarten', 'Robotics', 'master', 'engineering', 2, 600, 'English', 'October, April'),
  prog('p11', 'u-spree', 'Software Engineering', 'master', 'computing', 2, 500, 'English', 'October'),
  prog('p12', 'u-spree', 'Studienkolleg Foundation', 'foundation', 'engineering', 1, 500, 'German', 'March, September'),
  prog('p13', 'u-maplevalley', 'Medicine Pre-Med Track', 'bachelor', 'medicine', 4, 38000, 'English', 'September'),
  prog('p14', 'u-maplevalley', 'Finance', 'master', 'business', 1, 35000, 'English', 'September'),
  prog('p15', 'u-bosphorus', 'International Relations', 'bachelor', 'social', 4, 6500, 'English', 'September'),
  prog('p16', 'u-bosphorus', 'Architecture', 'master', 'arts', 2, 8000, 'English', 'February, September'),
  prog('p17', 'u-vistula', 'Civil Engineering', 'bachelor', 'engineering', 3.5, 3200, 'English', 'October'),
  prog('p18', 'u-vistula', 'Medicine', 'bachelor', 'medicine', 6, 9800, 'English', 'October'),
  prog('p19', 'u-danube', 'MBA International', 'master', 'business', 1.5, 7800, 'English', 'September'),
  prog('p20', 'u-danube', 'Marketing and Media', 'bachelor', 'business', 3, 4800, 'English', 'September'),
  prog('p21', 'u-canalcity', 'Psychology', 'bachelor', 'social', 3, 12500, 'English', 'September'),
  prog('p22', 'u-canalcity', 'Sustainable Energy', 'master', 'engineering', 2, 18000, 'English', 'September'),
  prog('p23', 'u-canalcity', 'English Preparatory Year', 'foundation', 'social', 1, 9000, 'English', 'September'),
  prog('p24', 'u-aurora', 'Film and Media Arts', 'bachelor', 'arts', 4, 19500, 'English', 'September'),
]

const agencyDescription = (name, city) => ({
  en: `${name} is a study-abroad agency based in ${city}. The team guides students from choosing a program to arriving on campus.`,
  az: `${name} ${city} şəhərində yerləşən xaricdə təhsil agentliyidir. Komanda tələbələrə proqram seçimindən kampusa çatanadək yol göstərir.`,
  ru: `${name} — агентство по обучению за рубежом из города ${city}. Команда сопровождает студентов от выбора программы до приезда в кампус.`,
})

const agency = (id, name, city, countryIds, languages, services, rating, studentsHelped, status = 'verified') => ({
  id,
  name,
  city,
  countryIds,
  languages,
  services,
  rating,
  studentsHelped,
  email: `hello@${id.replace('a-', '')}.example.com`,
  phone: '+994 12 000 00 00',
  website: `https://www.${id.replace('a-', '')}.example.com`,
  description: agencyDescription(name, city),
  status,
  createdAt: '2026-09-05',
})

const agencies = [
  agency('a-globalpath', 'GlobalPath Consulting', 'Baku', ['uk', 'us', 'ca'], ['EN', 'AZ', 'RU'], ['counseling', 'applications', 'visa', 'scholarships'], 4.8, 1200),
  agency('a-horizon', 'Horizon Study Abroad', 'Baku', ['de', 'pl', 'hu', 'nl'], ['EN', 'AZ', 'RU'], ['counseling', 'applications', 'language', 'accommodation'], 4.7, 860),
  agency('a-bridgeed', 'BridgeEd Advisors', 'Ganja', ['tr', 'de', 'uk'], ['EN', 'AZ'], ['counseling', 'visa', 'scholarships'], 4.6, 540),
  agency('a-novastudy', 'NovaStudy', 'Baku', ['us', 'ca'], ['EN', 'RU'], ['applications', 'visa', 'language'], 4.9, 410),
  agency('a-eurogate', 'EuroGate Education', 'Sumqayit', ['pl', 'hu', 'nl', 'de'], ['EN', 'AZ', 'RU'], ['counseling', 'applications', 'accommodation', 'visa'], 4.5, 690),
  agency('a-summit', 'Summit Student Services', 'Baku', ['uk', 'ca'], ['EN', 'AZ'], ['counseling', 'scholarships'], 0, 0, 'pending'),
]

const inquiries = [
  { id: 'i1', targetType: 'university', targetId: 'u-northbridge', programId: 'p2', studentName: 'Aysel Mammadova', email: 'aysel@example.com', phone: '+994 50 111 22 33', message: 'I would like to know about scholarships for the Data Science master.', status: 'new', createdAt: '2026-10-20' },
  { id: 'i2', targetType: 'agency', targetId: 'a-globalpath', studentName: 'Rauf Aliyev', email: 'rauf@example.com', phone: '', message: 'Looking for help with a UK student visa.', status: 'contacted', createdAt: '2026-10-18' },
  { id: 'i3', targetType: 'university', targetId: 'u-rhinegarten', programId: 'p10', studentName: 'Nigar Hasanova', email: 'nigar@example.com', phone: '', message: 'Are there English-taught robotics programs with April intake?', status: 'new', createdAt: '2026-10-22' },
  { id: 'i4', targetType: 'agency', targetId: 'a-horizon', studentName: 'Dmitry Orlov', email: 'dmitry@example.com', phone: '+7 900 000 00 00', message: 'Interested in studying in Poland. Which documents do I need?', status: 'closed', createdAt: '2026-10-10' },
  { id: 'i5', targetType: 'university', targetId: 'u-canalcity', programId: 'p21', studentName: 'Leyla Karimova', email: 'leyla@example.com', phone: '', message: 'What are the admission requirements for Psychology?', status: 'new', createdAt: '2026-10-23' },
]

const partnerRequests = [
  { id: 'r1', kind: 'agency', orgName: 'Compass Education', countryId: 'ca', contactName: 'Farid Guliyev', email: 'farid@compass.example.com', phone: '+994 55 222 33 44', website: 'https://compass.example.com', message: 'We help students apply to Canadian colleges.', status: 'pending', createdAt: '2026-10-21' },
  { id: 'r2', kind: 'university', orgName: 'Alpine Valley University', countryId: 'de', contactName: 'Anna Weber', email: 'anna@alpine.example.edu', phone: '+49 89 000 000', website: 'https://alpine.example.edu', message: 'We want to recruit students from Azerbaijan.', status: 'pending', createdAt: '2026-10-22' },
  { id: 'r3', kind: 'agency', orgName: 'QuickVisa Services', countryId: 'uk', contactName: 'Unknown', email: 'info@quickvisa.example.com', phone: '', website: '', message: 'Fast visa for everyone.', status: 'rejected', createdAt: '2026-10-05' },
]

export function createSeed() {
  return structuredClone({ countries, universities, programs, agencies, inquiries, partnerRequests })
}
