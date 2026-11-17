import { SkillGroup } from '../portfolio.models';

// Habilidades técnicas por categoría, tomadas de tu CV
// Cada nombre se muestra con su logo si existe en shared/tech-icons.ts; si no, solo con el nombre
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'languages',
    title: { es: 'Lenguajes', en: 'Languages' },
    skills: ['C#', 'TypeScript', 'JavaScript', 'T-SQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'frameworks',
    title: { es: 'Frameworks y librerías', en: 'Frameworks & Libraries' },
    skills: [
      '.NET Framework', '.NET Core', 'ASP.NET MVC', 'Blazor', 'Angular', 'Entity Framework',
      'LINQ', 'jQuery', 'Bootstrap', 'Kendo UI', 'Infragistics',
    ],
  },
  {
    id: 'apis',
    title: { es: 'APIs e integración', en: 'APIs & Integration' },
    skills: ['REST APIs', 'GraphQL', 'JSON', 'XML', 'WCF', 'AJAX'],
  },
  {
    id: 'cloud',
    title: { es: 'Cloud y DevOps', en: 'Cloud & DevOps' },
    skills: ['Azure', 'Azure DevOps', 'AWS', 'Docker', 'GitHub Actions', 'Git', 'TFS', 'PlayFab'],
  },
  {
    id: 'data',
    title: { es: 'Bases de datos y reportes', en: 'Databases & Reporting' },
    skills: ['SQL Server', 'MySQL', 'MongoDB', 'Oracle', 'SSRS', 'Crystal Reports', 'Tableau'],
  },
  {
    id: 'security',
    title: { es: 'Seguridad', en: 'Security' },
    skills: ['JWT', 'OAuth 2.0', 'Azure AD', 'RBAC', 'Active Directory'],
  },
  {
    id: 'qa-tools',
    title: { es: 'QA y herramientas', en: 'QA & Tools' },
    skills: ['Selenium', 'Postman', 'Grafana', 'Jira', 'Visual Studio', 'VS Code', 'PowerShell'],
  },
  {
    id: 'ai',
    title: { es: 'IA y LLMs', en: 'AI & LLMs' },
    skills: ['GitHub Copilot', 'Claude', 'ChatGPT', 'OpenAI Codex', 'Gemini'],
  },
  {
    id: 'practices',
    title: { es: 'Metodologías y prácticas', en: 'Methodologies & Practices' },
    skills: ['Scrum', 'Kanban', 'TDD', 'SOLID', 'Clean Architecture', 'Microservices'],
  },
];
