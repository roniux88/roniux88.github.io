import { Certification, Degree, LanguageSkill } from '../portfolio.models';

// Formación académica, de la más reciente a la más antigua
export const DEGREES: readonly Degree[] = [
  {
    id: 'uned',
    title: { es: 'Bachillerato en Gestión de Sistemas de Calidad', en: 'B.S. in Quality Systems Management' },
    institution: 'Universidad Estatal a Distancia (UNED)',
    location: 'Heredia, Costa Rica',
    period: '2016 – 2019',
    status: { es: 'Trabajo final de graduación pendiente', en: 'Final graduation project pending' },
  },
  {
    id: 'una',
    title: { es: 'Bachillerato en Ingeniería en Sistemas de Información', en: 'B.S. in Information Systems Engineering' },
    institution: 'Universidad Nacional de Costa Rica (UNA)',
    location: 'Heredia, Costa Rica',
    period: '2006 – 2013',
  },
];

// Certificaciones, de la más reciente a la más antigua
export const CERTIFICATIONS: readonly Certification[] = [
  {
    id: 'big-school-ai',
    name: 'AI-Driven Development from Concept to Production',
    issuer: 'Big School',
    year: '2026',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot Novice to Foundation',
    issuer: 'Percipio Skillsoft',
    year: '2026',
    credentialId: '1526005',
  },
  {
    id: 'scrum-fundamentals',
    name: 'Scrum Fundamentals Certified',
    issuer: 'SCRUMstudy',
    year: '2021',
    credentialId: '740669',
  },
];

export const LANGUAGES: readonly LanguageSkill[] = [
  { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
  { name: { es: 'Inglés', en: 'English' }, level: { es: 'Avanzado (B2+ / C1)', en: 'Advanced (B2+ / C1)' } },
];
