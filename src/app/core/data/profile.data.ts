import { Profile } from '../portfolio.models';

// Datos personales: los usan el header, el hero y el footer
export const PROFILE: Profile = {
  name: 'Ronny Mesén Porras',
  initials: 'RM',
  copyrightName: 'RAMP',
  avatarUrl: 'avatar.jpg', // public/avatar.jpg; si el archivo no existe se muestran las iniciales
  resumeUrl: 'resume-ronny-mesen.pdf', // public/resume-ronny-mesen.pdf (en inglés, para ambos idiomas)
  location: { es: 'Heredia, Costa Rica', en: 'Heredia, Costa Rica' },

  // Roles que rotan uno por uno debajo del nombre
  roles: {
    es: ['Desarrollador Full Stack Senior', 'Analista de QA', 'Líder Técnico'],
    en: ['Senior Full Stack Developer', 'QA Analyst', 'Tech Lead'],
  },

  summary: {
    es: 'Ingeniero de software senior con más de 10 años creando y sosteniendo aplicaciones empresariales en .NET: APIs, integraciones, bases de datos SQL Server y Cloud DevOps (Azure y AWS). Experiencia en banca, manufactura y servicios públicos, trabajando de forma remota para clientes de EE. UU. en equipos multifuncionales.',
    en: 'Senior software engineer with 10+ years building and supporting enterprise .NET applications: APIs, integrations, SQL Server databases and Cloud DevOps (Azure and AWS). Experienced across banking, manufacturing and public services, working remotely for U.S. clients in cross-functional teams.',
  },

  specialties: {
    es: ['Desarrollo Full Stack', 'APIs e integraciones', 'Calidad y pruebas (QA)', 'Desarrollo asistido por IA'],
    en: ['Full Stack Development', 'APIs & Integrations', 'Quality & Testing (QA)', 'AI-Assisted Development'],
  },

  email: 'ronexx9@gmail.com',
  whatsapp: '+506 8797 8969',
  available: true,

  // Franja de cifras debajo del hero
  stats: [
    { value: '10+', label: { es: 'Años de experiencia', en: 'Years of experience' } },
    // MaPPS, PlayFab, NOVA, SIMAV, Excélsior, BITAB, SAF2000 y SIGWEB
    { value: '8', label: { es: 'Sistemas empresariales', en: 'Enterprise systems' } },
    { value: '3', label: { es: 'Certificaciones', en: 'Certifications' } },
    { value: '2', label: { es: 'Idiomas', en: 'Languages' } },
  ],

  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rmesen11' },
    { label: 'GitHub', url: 'https://github.com/roniux88' },
  ],
};
