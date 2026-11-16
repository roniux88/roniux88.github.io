// ===== IDIOMAS =====
// Tipo unión: solo acepta 'es' o 'en' (parecido a un enum de C#)
export type Lang = 'es' | 'en';

// Lista de idiomas disponibles; la usa el selector ES/EN del header
export const LANGS: readonly Lang[] = ['es', 'en'];

// Un valor traducido: un objeto con una clave por idioma, por ejemplo { es: 'Hola', en: 'Hello' }
// Si falta un idioma, TypeScript marca error al compilar
export type Localized<T = string> = Readonly<Record<Lang, T>>;

// ===== CATEGORÍAS =====
// Valores permitidos para filtrar proyectos; agrega aquí una nueva categoría si la necesitas
export type Category = 'Backend' | 'Angular' | 'Cloud';

// ===== PROYECTO =====
// Forma de cada tarjeta de proyecto. "readonly" impide modificar los datos por error
// El "?" marca un campo opcional (como un tipo nullable en C#)
export interface Project {
  readonly id: string;                      // identificador único (lo usa @for para rastrear cada tarjeta)
  readonly title: string;                   // nombre del proyecto o sistema (igual en ambos idiomas), ej. 'SIMAV'
  readonly description: Localized;          // descripción en ES y EN
  readonly categories: readonly Category[]; // categorías (también se pueden buscar)
  readonly stack: readonly string[];        // tecnologías que se muestran como íconos (ver shared/tech-icon.ts)
  readonly client?: Localized;              // para quién era el sistema, ej. Bomberos de Costa Rica (opcional)
  readonly company?: CompanyLink;           // empresa donde trabajabas (la que te pagaba); sin empresa = proyecto personal
  readonly repoUrl?: string;                // enlace al repositorio (opcional)
  readonly demoUrl?: string;                // enlace a la demo (opcional)
  readonly featured?: boolean;              // true = la tarjeta ocupa 2 columnas (estilo bento)
}

// Empresa con enlace a su sitio. Si url está vacío (''), el enlace se ve pero aún no lleva a ningún lado
// note: aclaración opcional junto al nombre, ej. { es: 'hoy MultiMoney', en: 'now MultiMoney' }
export interface CompanyLink { readonly name: string; readonly url: string; readonly note?: Localized; }

// ===== EXPERIENCIA =====
export interface Experience {
  readonly id: string;
  readonly role: Localized;                         // puesto, traducido
  readonly company: string;                         // nombre de la empresa
  readonly location: Localized;                     // modalidad y lugar, ej. { es: 'Remoto · Costa Rica', en: 'Remote · Costa Rica' }
  readonly period: Localized;                       // ej. { es: 'Dic 2025 – Sep 2026', en: 'Dec 2025 – Sep 2026' }
  readonly highlights: Localized<readonly string[]>; // logros: una lista por idioma (el primero sirve de vista previa)
  readonly technologies: string;                    // tecnologías por escrito, tal cual el CV
  readonly projectId?: string;                      // id del proyecto relacionado en PROJECTS; crea los enlaces entre ambas secciones
}

// Una cifra de la franja de estadísticas del hero, ej. "3+ Años de experiencia"
export interface Stat { readonly value: string; readonly label: Localized; }

// Un enlace a red social (GitHub, LinkedIn...)
export interface SocialLink { readonly label: string; readonly url: string; }

// ===== PERFIL =====
// Tus datos personales: los usan el hero y el footer
export interface Profile {
  readonly name: string;
  readonly initials: string;        // se usa en el monograma y en el logo <TN/>
  readonly avatarUrl?: string;      // ruta a tu foto en /public; sin foto se muestra el monograma
  readonly role: Localized;
  readonly bio: Localized;
  readonly email: string;
  readonly whatsapp?: string;       // número con código de país, ej. '+506 8797 8969'; el footer arma el enlace a WhatsApp
  readonly available: boolean;     // true = muestra la etiqueta verde "Disponible"
  readonly stats: readonly Stat[];
  readonly socials: readonly SocialLink[];
}

// ===== TEXTOS DE LA INTERFAZ =====
// Todos los textos fijos (botones, títulos). Hay uno de estos objetos por idioma
export interface UiText {
  readonly nav: { readonly projects: string; readonly experience: string; readonly contact: string };
  readonly available: string;
  readonly contact: string;
  readonly viewWork: string;
  readonly projectsTitle: string;
  readonly experienceTitle: string;
  readonly all: string;
  readonly code: string;
  readonly demo: string;
  readonly noProjects: string;
  readonly searchPlaceholder: string; // texto gris dentro de la barra de búsqueda
  readonly clearSearch: string;       // nombre del botón × que borra la búsqueda (para lectores de pantalla)
  readonly linkPending: string; // texto al pasar el mouse sobre un enlace que aún no tiene URL
  readonly clientLabel: string;      // etiqueta "Cliente" en las tarjetas de proyecto
  readonly companyLabel: string;     // etiqueta "Empresa"
  readonly personalProject: string;  // texto para proyectos sin empresa
  readonly showDetails: string;      // botón para expandir una experiencia
  readonly hideDetails: string;      // botón para contraerla
  readonly technologies: string;     // etiqueta "Tecnologías"
  readonly projectLink: string;      // en Experiencia: "Proyecto" (enlace a su tarjeta)
  readonly experienceLink: string;   // en Proyectos: "Ver en experiencia" (enlace al puesto)
  readonly footerCta: string;
  readonly footerText: string;   // frase debajo del título del footer
  readonly emailLabel: string;   // etiqueta de la tarjeta de correo
  readonly whatsappLabel: string;
  readonly copy: string;         // botón "Copiar"
  readonly copied: string;       // confirmación "¡Copiado!"
  readonly builtWith: string;
}