import { Category, Experience, Lang, Profile, Project, UiText } from './portfolio.models';

// Categorías de los proyectos (se pueden buscar escribiéndolas en la barra de búsqueda)
export const CATEGORIES: readonly Category[] = ['Backend', 'Angular', 'Cloud'];

// ===== TEXTOS FIJOS POR IDIOMA =====
// Record<Lang, UiText> obliga a tener exactamente un bloque 'es' y uno 'en'
export const UI_TEXT: Readonly<Record<Lang, UiText>> = {
  es: {
    nav: { projects: 'Proyectos', experience: 'Experiencia', contact: 'Contacto' },
    available: 'Disponible para nuevos proyectos',
    contact: 'Contáctame',
    viewWork: 'Ver experiencia',
    projectsTitle: 'Proyectos',
    experienceTitle: 'Experiencia',
    all: 'Todos',
    code: 'Código',
    demo: 'Demo',
    noProjects: 'Ningún proyecto coincide con tu búsqueda.',
    searchPlaceholder: 'Busca por tecnología, cliente, empresa o palabra clave…',
    clearSearch: 'Borrar búsqueda',
    linkPending: 'Enlace próximamente',
    clientLabel: 'Cliente',
    companyLabel: 'Empresa',
    personalProject: 'Proyecto personal',
    showDetails: 'Ver detalles',
    hideDetails: 'Ocultar detalles',
    technologies: 'Tecnologías',
    projectLink: 'Proyecto',
    experienceLink: 'Ver en experiencia',
    footerCta: '¿Construimos algo juntos?',
    footerText: 'Estoy abierto a nuevos proyectos y oportunidades. Escríbeme por correo o WhatsApp y te respondo pronto.',
    emailLabel: 'Correo',
    whatsappLabel: 'WhatsApp',
    copy: 'Copiar',
    copied: '¡Copiado!',
    builtWith: 'Hecho con Angular y Tailwind',
  },
  en: {
    nav: { projects: 'Projects', experience: 'Experience', contact: 'Contact' },
    available: 'Available for new projects',
    contact: 'Get in touch',
    viewWork: 'View experience',
    projectsTitle: 'Projects',
    experienceTitle: 'Experience',
    all: 'All',
    code: 'Code',
    demo: 'Demo',
    noProjects: 'No projects match your search.',
    searchPlaceholder: 'Search by technology, client, company or keyword…',
    clearSearch: 'Clear search',
    linkPending: 'Link coming soon',
    clientLabel: 'Client',
    companyLabel: 'Company',
    personalProject: 'Personal project',
    showDetails: 'Show details',
    hideDetails: 'Hide details',
    technologies: 'Technologies',
    projectLink: 'Project',
    experienceLink: 'See in experience',
    footerCta: "Let's build something together",
    footerText: "I'm open to new projects and opportunities. Reach out by email or WhatsApp and I'll get back to you soon.",
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    copy: 'Copy',
    copied: 'Copied!',
    builtWith: 'Built with Angular & Tailwind',
  },
};

// ===== TU PERFIL =====
export const PROFILE: Profile = {
  name: 'Ronny Mesén Porras',
  initials: 'RM',
  avatarUrl: 'avatar.jpg', // tu foto en public/avatar.jpg; si el archivo no existe se muestran tus iniciales
  // Lo que puedes hacer (roles), separado por " · "
  role: {
    es: 'Desarrollador Full Stack Senior · Analista de QA · Líder Técnico',
    en: 'Senior Full Stack Developer · QA Analyst · Tech Lead',
  },
  bio: {
    es: 'Ingeniero de software con más de 10 años diseñando, desarrollando y dando soporte a aplicaciones empresariales con .NET, APIs, SQL Server y Cloud DevOps (Azure y AWS).',
    en: 'Software engineer with 10+ years designing, building and supporting enterprise applications with .NET, APIs, SQL Server and Cloud DevOps (Azure and AWS).',
  },
  email: 'ronexx9@gmail.com',
  whatsapp: '+506 8797 8969',
  available: true, // false oculta la etiqueta verde "Disponible"
  // Franja de cifras debajo del hero (se recomiendan 4)
  stats: [
    { value: '10+', label: { es: 'Años de experiencia', en: 'Years of experience' } },
    // MaPPS, PlayFab, NOVA, SIMAV, Excélsior, BITAB, SAF2000 y SIGWEB
    { value: '8', label: { es: 'Sistemas empresariales', en: 'Enterprise systems' } },
    { value: '3', label: { es: 'Certificaciones', en: 'Certifications' } },
    { value: '2', label: { es: 'Idiomas', en: 'Languages' } },
  ],
  // Enlaces del footer
  socials: [
    { label: 'GitHub', url: 'https://github.com/roniux88' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rmesen11' },
  ],
};

// ===== PROYECTOS =====
// Se muestran en este orden. featured: true = tarjeta ancha
// title = el sistema · client = para quién era · company = empresa donde trabajabas (la que te pagaba)
// Son sistemas de clientes o empleadores: no tienen repositorio público, por eso no llevan repoUrl
// company.url: pega aquí el sitio de cada empresa; mientras esté vacío ('') el enlace se ve, pero no lleva a ningún lado
// stack: cada nombre se muestra como ícono; los íconos disponibles están en shared/tech-icon.ts
export const PROJECTS: readonly Project[] = [
  {
    id: 'nova',
    title: 'NOVA',
    description: {
      es: 'Originación de préstamos para banca privada. Un módulo de contratos heredado y lento → modernizado en Angular con lazy loading.',
      en: 'Loan origination for private banking. A slow legacy contracts module → modernized in Angular with lazy loading.',
    },
    categories: ['Angular', 'Backend'], // un proyecto puede tener varias categorías
    stack: [
      'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'GraphQL', 'C#', 'ASP.NET MVC', 'Blazor',
      'SQL Server', 'Azure DevOps', 'HTML5', 'CSS3', 'Git', 'Postman', 'Selenium', 'DocuSign', 'Visual Studio',
    ],
    client: { es: 'Liquid Logics · banca privada de EE. UU.', en: 'Liquid Logics · US private banking' },
    company: { name: 'OTSi', url: 'https://otsi-global.com/' },
    featured: true,
  },
  {
    id: 'mapps',
    title: 'MaPPS',
    description: {
      es: 'Planificación de demanda y suministro para manufactura. Datos inconsistentes entre capas → trazabilidad y procesos de carga confiables.',
      en: 'Demand and supply planning for manufacturing. Inconsistent data across layers → traceability and reliable data loads.',
    },
    categories: ['Backend'],
    stack: ['C#', '.NET Framework', 'Infragistics', 'LINQ', 'SQL Server', 'Git', 'Jira', 'CCTray', 'Visual Studio'],
    client: { es: 'Intel', en: 'Intel' },
    company: { name: 'UST', url: 'https://www.ust.com/' },
  },
  {
    id: 'playfab',
    title: 'PlayFab',
    description: {
      es: 'Backend en la nube para juegos. Estudios integrando LiveOps → soporte experto, pruebas del SDK y monitoreo en tiempo real.',
      en: 'Cloud backend for games. Studios integrating LiveOps → expert support, SDK testing and real-time monitoring.',
    },
    categories: ['Cloud', 'Backend'],
    stack: ['PlayFab', 'Azure', 'C#', '.NET Core', 'Grafana', 'Postman', 'PowerShell', 'VS Code', 'Dynamics (DfM)'],
    client: { es: 'Microsoft', en: 'Microsoft' },
    company: { name: 'Allyis', url: 'https://www.allyis.com/' },
  },
  {
    id: 'simav',
    title: 'SIMAV',
    description: {
      es: 'Mantenimiento de la flotilla de emergencias. Procesos administrativos manuales → módulos de facturación, citas y reportes.',
      en: 'Emergency fleet maintenance. Manual administrative processes → billing, scheduling and reporting modules.',
    },
    categories: ['Backend'],
    stack: [
      'C#', 'ASP.NET MVC', 'LINQ', 'JavaScript', 'jQuery', 'JSON', 'Kendo UI', 'HTML5', 'CSS3',
      'SQL Server', 'SSRS', 'WCF', 'TFS', 'Visual Studio',
    ],
    client: { es: 'Benemérito Cuerpo de Bomberos de Costa Rica', en: 'Costa Rica Fire Department' },
    company: { name: 'Novacomp', url: 'https://crnova.com/' },
  },
  {
    id: 'sigweb',
    title: 'SIGWEB',
    description: {
      es: 'Gestión bancaria interna. Un sistema de escritorio (GTCSIG) → plataforma web con tipo de cambio del BCCR en línea.',
      en: 'Internal banking management. A desktop system (GTCSIG) → web platform with live BCCR exchange rates.',
    },
    categories: ['Backend'],
    stack: [
      'C#', 'ASP.NET MVC', 'JavaScript', 'jQuery', 'Bootstrap', 'AJAX',
      'SQL Server', 'Crystal Reports', 'Windows Server', 'Visual Studio',
    ],
    client: { es: 'Banco GyT Continental', en: 'Banco GyT Continental' },
    // El banco hoy es parte de MultiMoney: se muestra el nombre de entonces con una nota, y el enlace va al sitio actual
    company: {
      name: 'Banco GyT Continental',
      note: { es: 'hoy MultiMoney', en: 'now MultiMoney' },
      url: 'https://multimoney.cr/',
    },
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: {
      es: 'Este sitio. Un CV en PDF → SPA bilingüe con búsqueda en vivo, publicada con GitHub Actions.',
      en: 'This site. A PDF resume → bilingual SPA with live search, deployed with GitHub Actions.',
    },
    categories: ['Angular'],
    stack: ['Angular', 'TypeScript', 'Tailwind', 'HTML5', 'CSS3', 'GitHub Actions', 'Git', 'VS Code'],
    repoUrl: 'https://github.com/roniux88/roniux88.github.io',
    demoUrl: 'https://roniux88.github.io',
  },
];

// ===== EXPERIENCIA =====
// Ordena de la más reciente a la más antigua
// Logros en inglés tal cual el CV; en español, la traducción completa de cada punto
// technologies: el texto de "Technologies" de tu CV anterior, tal cual
export const EXPERIENCE: readonly Experience[] = [
  {
    id: 'ust',
    role: { es: 'Ingeniero de Software III', en: 'Software Engineer III' },
    company: 'UST',
    location: { es: 'LATAM · Remoto, Costa Rica', en: 'LATAM · Remote, Costa Rica' },
    period: { es: 'Dic 2025 – Sep 2026', en: 'Dec 2025 – Sep 2026' },
    highlights: {
      es: [
        'Brindé soporte de producción y resolví incidencias de MaPPS (Materials and Procurement Planning System) en Intel, una plataforma usada para gestionar la planificación de demanda y suministro de órdenes de manufactura.',
        'Investigué discrepancias de datos mediante análisis de causa raíz en las capas de UI, lógica de negocio y acceso a datos, para atender problemas recurrentes y mejorar la estabilidad del sistema.',
        'Mejoré los procesos de staging y de creación de snapshots/versiones ejecutados mediante procesos ETL para fortalecer la confiabilidad y consistencia de los datos entre los sistemas backend y las aplicaciones de cara al usuario.',
        'Mejoré la lógica de negocio de planificación y datos maestros, incluyendo reglas de validación, visibilidad de la demanda y cálculos de consumo de capacidad, para apoyar la toma de decisiones operativas.',
      ],
      en: [
        'Provided production support and troubleshot MaPPS (Materials and Procurement Planning System) at Intel, a platform used to manage demand and supply planning for manufacturing orders.',
        'Investigated data discrepancies through root cause analysis across UI, business logic, and data access layers to address recurring issues and improve system stability.',
        'Enhanced staging and snapshot/version creation processes, executed through ETL processes, to strengthen data reliability and consistency between backend systems and user-facing applications.',
        'Improved planning and master data business logic, including validation rules, demand visibility, and capacity consumption calculations to support operational decision-making.',
      ],
    },
    technologies: 'C#, Infragistics, .NET Framework 4.5, WinForms, LINQ, MVC, Git, JIRA, CCTray (CruiseControl.NET), Visual Studio 2022, Microsoft SQL Server 2022',
    projectId: 'mapps',
  },
  {
    id: 'allyis',
    role: { es: 'Ingeniero de Soporte PlayFab', en: 'PlayFab Support Engineer' },
    company: 'Allyis',
    location: { es: 'LATAM · Remoto, Costa Rica', en: 'LATAM · Remote, Costa Rica' },
    period: { es: 'Oct 2023 – Jul 2025', en: 'Oct 2023 – Jul 2025' },
    highlights: {
      es: [
        'Brindé soporte técnico avanzado y resolución de incidencias para Microsoft PlayFab, una plataforma backend en la nube para juegos y aplicaciones en línea.',
        'Apoyé la integración y configuración de servicios LiveOps, incluyendo autenticación, multijugador, leaderboards, estadísticas, economía del juego, facturación, automatización y funciones sociales.',
        'Probé y validé endpoints del SDK de PlayFab para verificar su funcionalidad, el comportamiento del servicio y el cumplimiento de los requisitos de la plataforma.',
        'Monitoreé el rendimiento del servicio, la salud de los servidores y las métricas de consumo con Grafana para identificar posibles problemas y apoyar la resolución de incidencias.',
        'Gestioné casos de soporte técnico dentro de los objetivos de SLA, documentando investigaciones y resoluciones en Microsoft Dynamics for Customer Service.',
        'Colaboré con los equipos de producto e ingeniería para investigar incidentes relacionados con migraciones, limitaciones de API, configuraciones avanzadas e implementaciones heredadas mediante flujos de gestión de incidentes.',
        'Creé guías de troubleshooting, documentación técnica y buenas prácticas para mejorar el intercambio de conocimiento y la consistencia del soporte.',
      ],
      en: [
        'Provided advanced technical support and troubleshooting for Microsoft PlayFab, a cloud-based backend platform for online games and applications.',
        'Supported the integration and configuration of LiveOps services, including authentication, multiplayer, leaderboards, statistics, in-game economy, billing, automation, and social features.',
        'Tested and validated PlayFab SDK endpoints to verify functionality, service behavior, and compliance with platform requirements.',
        'Monitored service performance, server health, and consumption metrics using Grafana to identify potential issues and support troubleshooting efforts.',
        'Managed technical support cases within SLA targets, documenting investigations and resolutions in Microsoft Dynamics for Customer Service.',
        'Collaborated with product and engineering teams to investigate incidents involving migrations, API limitations, advanced configurations, and legacy implementations through incident management workflows.',
        'Created troubleshooting guides, technical documentation, and best practices to improve knowledge sharing and support consistency.',
      ],
    },
    technologies: 'Azure, C#, DfM, Grafana, .NET Framework, .NET Core, PlayFab GUI & SDK, Postman, PowerShell, Visual Studio Code',
    projectId: 'playfab',
  },
  {
    id: 'otsi',
    role: { es: 'Ingeniero de Software Senior', en: 'Senior Software Engineer' },
    company: 'OTSi',
    location: { es: 'LATAM · Remoto, Costa Rica', en: 'LATAM · Remote, Costa Rica' },
    period: { es: 'Ago 2022 – Mar 2023', en: 'Aug 2022 – Mar 2023' },
    highlights: {
      es: [
        'Mantuve y mejoré NOVA, un sistema de originación de préstamos usado por instituciones de banca privada en EE. UU.',
        'Colaboré con el equipo de producto para investigar problemas en producción, asegurar la estabilidad de la aplicación y desarrollar mejoras específicas en los módulos de préstamos, prestamistas, contratos, propiedades, hipotecas y gestión de documentos para optimizar los flujos de negocio.',
        'Integré endpoints GraphQL para obtener información sobre el onboarding de préstamos mediante comunicación asíncrona con FCI Lender Services Inc.',
        'Modernicé el módulo de documentación de contratos migrándolo de Angular 8 a 15, implementando lazy loading, actualizando TypeScript y Node.js, y refactorizando código heredado para mejorar el rendimiento de la aplicación.',
        'Resolví una falla crítica que afectaba los flujos de firma electrónica de DocuSign, restableciendo funciones clave de aprobación de contratos y visualización de documentos.',
      ],
      en: [
        'Maintained and enhanced NOVA, a loan origination system used by private banking institutions across US.',
        'Collaborated with the product team to investigate production issues, ensure application stability, and develop targeted enhancements covering loan, lender, contract, property, mortgage, and document management modules to optimize business workflows.',
        'Integrated GraphQL endpoints to retrieve information regarding loan onboarding through asynchronous communication with FCI Lender Services Inc.',
        'Modernized the contract documentation module by migrating it from Angular 8 to 15, implementing lazy loading, upgrading TypeScript and Node.js, and refactoring legacy code to improve application performance.',
        'Resolved a critical issue affecting DocuSign e-signature workflows, restoring key contract approval and document viewing functionality.',
      ],
    },
    technologies: 'Angular, Azure DevOps, C#, Entity-Framework, HTML5, CSS3, JavaScript, GraphQL, MSSQL Server 2019 - 2022, Microsoft Visual Studio 2019 - 2022, Node.js, .NET Framework, Blazor, ASPX, LINQ, MVC, TypeScript, Git, Postman, Selenium, Report Viewer 2020',
    projectId: 'nova',
  },
  {
    id: 'novacomp',
    role: { es: 'Ingeniero de Software II', en: 'Software Engineer II' },
    company: 'Novacomp',
    location: { es: 'En sitio del cliente · Heredia, Costa Rica', en: 'Client location · Heredia, Costa Rica' },
    period: { es: 'Abr 2019 – Ago 2022', en: 'Apr 2019 – Aug 2022' },
    highlights: {
      es: [
        'Contribuí al SDLC de SIMAV, un sistema de gestión de mantenimiento vehicular desarrollado para el Cuerpo de Bomberos de Costa Rica.',
        'Desarrollé y mejoré módulos de órdenes de trabajo, rondas de mantenimiento, mantenimiento de llantas y baterías, gestión de flotilla, programación y reasignación de citas, facturación y gestión de contratistas.',
        'Lideré el control de cambios para atender errores críticos en el proceso de inventario físico del Sistema Administrativo Financiero Excélsior, apoyando la integridad de los datos y la exactitud del inventario.',
        'Desarrollé endpoints de API con operaciones CRUD para BITAB, una app móvil para gestionar y dar seguimiento a actas de reuniones y a la toma de decisiones interna.',
        'Desarrollé reportes estadísticos y gráficos para visualizar datos operativos consolidados en los sistemas mencionados.',
      ],
      en: [
        'Contributed to the SDLC for SIMAV, a vehicle maintenance management system developed for Costa Rican Fire Department.',
        'Developed and enhanced modules for work orders, maintenance rounds, tire and battery maintenance, fleet management, appointment scheduling and reassignment, billing, and contractor management.',
        'Led change control efforts to address critical errors in the physical inventory process within the Excélsior Administrative Financial System, supporting data integrity and inventory accuracy.',
        'Developed API endpoints supporting CRUD operations for BITAB, a mobile app for managing and tracking meeting minutes and internal decision-making.',
        'Developed statistical reports and charts to visualize consolidated operational data in the aforementioned systems.',
      ],
    },
    technologies: 'C#, CSS3, Design Patterns, Entity Framework, HTML, JavaScript, jQuery, JSON, Kendo UI, .NET Framework, ASP.NET MVC, ASPX, LINQ, Microsoft SQL Server 2019, Microsoft Visual Studio 2017-2019, Report Viewer 2015, Scrum, SSRS, TFS, WCF, Web Services API, WSDL',
    projectId: 'simav',
  },
  {
    // Puesto que solo aparece en tu CV anterior
    id: 'banco-gyt',
    role: { es: 'Analista de Desarrollo de Software', en: 'Software Development Analyst' },
    company: 'Banco GyT Continental',
    location: { es: 'En sitio del cliente · San José, Costa Rica', en: 'Client location · San José, Costa Rica' },
    period: { es: 'Jul 2016 – Mar 2019', en: 'Jul 2016 – Mar 2019' },
    highlights: {
      es: [
        'Brindé soporte y aseguré la continuidad operativa del sistema bancario CORE SYSDE SAF2000, resolviendo incidencias.',
        'Participé en la migración del sistema de escritorio GTCSIG a su versión web, SIGWEB, modernizando la plataforma y optimizando la gestión.',
        'Implementé la integración del tipo de cambio con los servicios web del BCCR, optimizando la actualización de datos y los cálculos financieros en módulos clave.',
        'Desarrollé el formulario de datos KYC para el Departamento de Cumplimiento, optimizando la gestión de la información de clientes.',
        'Desarrollé el módulo de gestión de riesgos para el Departamento de Riesgo Operativo, mejorando la gestión interna.',
        'Automaticé la generación de documentos para el Departamento Legal, mejorando los procesos operativos internos.',
        'Gestioné y resolví incidencias de distintos departamentos mediante la herramienta interna de mesa de ayuda, asegurando la eficiencia operativa.',
      ],
      en: [
        'Provided support and ensured the operational continuity of the CORE banking system SYSDE SAF2000, resolving issues.',
        'Participated in the migration of the GTCSIG desktop system to its web version, SIGWEB, modernizing the platform and optimizing management.',
        'Implemented the exchange rate integration with the BCCR web services, optimizing data updates and financial calculations in key modules.',
        'Developed the KYC data form for the Compliance Department, optimizing client information management.',
        'Developed the risk management module for the Operational Risk Department, enhancing internal management.',
        'Automated document generation for the Legal Department, improving internal operational processes.',
        'Managed and resolved incidents from various departments using the internal help desk tool, ensuring operational efficiency.',
      ],
    },
    technologies: 'ADO.NET, AJAX, Bootstrap, C#, CSS, Entity Framework, JavaScript, jQuery, MSSQL Server 2010, Microsoft Visual Studio 2012, .NET Framework, ASPX, ASP.NET, ASP.NET MVC, Remote Desktop, SAP Crystal Reports, Windows Server, WinForms, WSDL, XML',
    projectId: 'sigweb',
  },
];
