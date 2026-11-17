// Tipos de datos del portafolio. Solo describen la forma de los datos: los valores están en core/data/
// "readonly" impide modificarlos por error; "?" marca un campo opcional (como un tipo nullable en C#)

// ===== IDIOMAS =====
// Tipo unión: solo acepta 'es' o 'en' (parecido a un enum de C#)
export type Lang = 'es' | 'en';

// Idiomas disponibles, en el orden del selector ES / EN del header
export const LANGS: readonly Lang[] = ['es', 'en'];

// Un valor traducido: una clave por idioma, ej. { es: 'Hola', en: 'Hello' }
// Si falta un idioma, TypeScript marca error al compilar
export type Localized<T = string> = Readonly<Record<Lang, T>>;

// ===== PERFIL =====
export interface Stat {
  readonly value: string; // ej. '10+'; la parte numérica se anima contando desde 0
  readonly label: Localized;
}

export interface SocialLink {
  readonly label: string; // también elige el ícono: 'GitHub' → github, 'LinkedIn' → linkedin
  readonly url: string;
}

export interface Profile {
  readonly name: string;
  readonly initials: string;                 // monograma del avatar y logo del header
  readonly copyrightName: string;            // nombre del copyright del footer, ej. 'RAMP'
  readonly avatarUrl?: string;               // foto en public/; si no existe se muestran las iniciales
  readonly resumeUrl?: string;               // CV en PDF en public/; si existe aparece el botón "Descargar CV"
  readonly location: Localized;
  readonly roles: Localized<readonly string[]>; // roles que rotan en el hero
  readonly summary: Localized;               // párrafo de presentación
  readonly specialties: Localized<readonly string[]>; // áreas de especialidad (lista corta)
  readonly email: string;
  readonly whatsapp?: string;                // con código de país, ej. '+506 8797 8969'
  readonly available: boolean;               // true = muestra la etiqueta "Disponible"
  readonly stats: readonly Stat[];
  readonly socials: readonly SocialLink[];
}

// ===== EXPERIENCIA =====
// Empresa con enlace a su sitio. note = aclaración opcional, ej. { es: 'hoy MultiMoney', en: 'now MultiMoney' }
export interface CompanyLink {
  readonly name: string;
  readonly url: string;                      // '' = el enlace se ve, pero aún no lleva a ningún lado
  readonly note?: Localized;
}

export interface Experience {
  readonly id: string;
  readonly role: Localized;
  readonly company: CompanyLink;             // empresa donde trabajabas (la que te pagaba)
  readonly client?: Localized;               // para quién era el trabajo, ej. Intel
  readonly system?: string;                  // nombre del sistema o proyecto, ej. 'MaPPS'
  readonly location: Localized;
  readonly period: Localized;
  readonly highlights: Localized<readonly string[]>; // logros; el primero sirve de vista previa
  readonly technologies: string;             // tecnologías por escrito, tal cual el CV
}

// ===== SKILLS =====
// Un grupo de tecnologías, ej. "Lenguajes". Cada nombre se muestra con su logo (ver shared/tech-icons.ts)
export interface SkillGroup {
  readonly id: string;
  readonly title: Localized;
  readonly skills: readonly string[];
}

// ===== FORMACIÓN =====
export interface Degree {
  readonly id: string;
  readonly title: Localized;
  readonly institution: string;
  readonly location: string;                 // ej. 'Heredia, Costa Rica'
  readonly period: string;                   // ej. '2006 – 2013'
  readonly status?: Localized;               // ej. { es: 'Pendiente TFG', en: 'Final project pending' }
}

export interface Certification {
  readonly id: string;
  readonly name: string;
  readonly issuer: string;
  readonly year: string;
  readonly credentialId?: string;
}

export interface LanguageSkill {
  readonly name: Localized;
  readonly level: Localized;
}

// ===== TEXTOS DE LA INTERFAZ =====
// Todos los textos fijos (menú, títulos, botones). Hay un objeto por idioma en data/ui-text.data.ts
export interface UiText {
  readonly nav: {
    readonly experience: string;
    readonly skills: string;
    readonly education: string;
    readonly contact: string;
  };
  readonly available: string;
  readonly contact: string;
  readonly downloadCv: string;
  readonly specialtiesTitle: string;
  readonly experienceTitle: string;
  readonly skillsTitle: string;
  readonly educationTitle: string;
  readonly degreesTitle: string;
  readonly certificationsTitle: string;
  readonly languagesTitle: string;
  readonly clientLabel: string;
  readonly systemLabel: string;
  readonly technologies: string;
  readonly showDetails: string;
  readonly hideDetails: string;
  readonly linkPending: string;              // al pasar el mouse sobre un enlace sin URL
  readonly credentialId: string;
  readonly footerCta: string;
  readonly footerText: string;
  readonly emailLabel: string;
  readonly whatsappLabel: string;
  readonly copy: string;
  readonly copied: string;
  readonly builtWith: string;
}
