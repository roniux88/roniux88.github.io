import { Experience } from '../portfolio.models';

// Experiencia laboral, de la más reciente a la más antigua
// company = empresa donde trabajabas (con enlace) · client = para quién era el trabajo · system = nombre del sistema
// Logros en inglés tal cual el CV; en español, la traducción completa de cada punto
// technologies: el texto de "Technologies" del CV, tal cual
export const EXPERIENCE: readonly Experience[] = [
  {
    id: 'ust',
    role: { es: 'Ingeniero de Software III', en: 'Software Engineer III' },
    company: { name: 'UST', url: 'https://www.ust.com/' },
    client: { es: 'Intel', en: 'Intel' },
    system: 'MaPPS',
    location: { es: 'LATAM · Remoto, Costa Rica', en: 'LATAM · Remote, Costa Rica' },
    period: { es: 'Dic 2025 – Sep 2026', en: 'Dec 2025 – Sep 2026' },
    highlights: {
      es: [
        'Brindé soporte de producción y resolví incidencias de MaPPS (Materials and Procurement Planning System) en Intel, una plataforma usada para gestionar la planificación de demanda y suministro de órdenes de manufactura.',
        'Investigué discrepancias de datos mediante análisis de causa raíz en las capas de UI, lógica de negocio y acceso a datos, para atender problemas recurrentes y mejorar la estabilidad del sistema.',
        'Mejoré los procesos de staging y de creación de snapshots/versiones ejecutados mediante procesos ETL para fortalecer la confiabilidad y consistencia de los datos entre los sistemas backend y las aplicaciones de cara al usuario.',
        'Mejoré la lógica de negocio de planificación y datos maestros, incluyendo reglas de validación, visibilidad de la demanda y cálculos de consumo de capacidad, para apoyar la toma de decisiones operativas.',
        'Aproveché GitHub Copilot y flujos de trabajo asistidos por IA en VS Code para implementación, depuración, refactorización y revisiones de código, creando prompts y reglas reutilizables para el análisis de causa raíz y la preparación de pull requests.',
      ],
      en: [
        'Provided production support and troubleshot MaPPS (Materials and Procurement Planning System) at Intel, a platform used to manage demand and supply planning for manufacturing orders.',
        'Investigated data discrepancies through root cause analysis across UI, business logic, and data access layers to address recurring issues and improve system stability.',
        'Enhanced staging and snapshot/version creation processes, executed through ETL processes, to strengthen data reliability and consistency between backend systems and user-facing applications.',
        'Improved planning and master data business logic, including validation rules, demand visibility, and capacity consumption calculations to support operational decision-making.',
        'Leveraged GitHub Copilot and AI-assisted workflows in VS Code for implementation, debugging, refactoring and code reviews, building reusable prompts and rules for root cause analysis and pull request preparation.',
      ],
    },
    technologies: 'C#, Infragistics, .NET Framework 4.5, WinForms, LINQ, MVC, Git, JIRA, CCTray (CruiseControl.NET), Visual Studio 2022, Visual Studio Code, GitHub Copilot, Microsoft SQL Server 2022',
  },
  {
    id: 'allyis',
    role: { es: 'Ingeniero de Soporte PlayFab', en: 'PlayFab Support Engineer' },
    company: { name: 'Allyis', url: 'https://www.allyis.com/' },
    client: { es: 'Microsoft', en: 'Microsoft' },
    system: 'PlayFab',
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
  },
  {
    id: 'otsi',
    role: { es: 'Ingeniero de Software Senior', en: 'Senior Software Engineer' },
    company: { name: 'OTSi', url: 'https://otsi-global.com/' },
    client: { es: 'Liquid Logics · banca privada de EE. UU.', en: 'Liquid Logics · US private banking' },
    system: 'NOVA',
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
    technologies: 'Angular, Azure DevOps, C#, Entity-Framework, HTML5, CSS3, JavaScript, GraphQL, MSSQL Server 2019 - 2022, Microsoft Visual Studio 2019 - 2022, Node.js, .NET Framework, Blazor, ASPX, LINQ, MVC, TypeScript, Git, Postman, Selenium, JWT, OAuth 2.0, Report Viewer 2020',
  },
  {
    id: 'novacomp',
    role: { es: 'Ingeniero de Software II', en: 'Software Engineer II' },
    company: { name: 'Novacomp', url: 'https://crnova.com/' },
    client: { es: 'Benemérito Cuerpo de Bomberos de Costa Rica', en: 'Costa Rica Fire Department' },
    system: 'SIMAV',
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
    technologies: 'C#, CSS3, Design Patterns, Entity Framework, HTML, JavaScript, jQuery, JSON, Kendo UI, .NET Framework, ASP.NET MVC, ASPX, LINQ, Microsoft SQL Server 2019, Microsoft Visual Studio 2017-2019, Report Viewer 2015, Scrum, SSRS, TFS, WCF, Web Services API, WSDL, JWT, OAuth 2.0',
  },
  {
    id: 'banco-gyt',
    role: { es: 'Analista de Desarrollo de Software', en: 'Software Development Analyst' },
    // El banco hoy es parte de MultiMoney: se muestra el nombre de entonces con una nota y el enlace va al sitio actual
    company: {
      name: 'Banco GyT Continental',
      note: { es: 'hoy MultiMoney', en: 'now MultiMoney' },
      url: 'https://multimoney.cr/',
    },
    system: 'SIGWEB',
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
  },
];
