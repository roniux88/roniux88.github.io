// Registro de logos de tecnologías: nombre (en minúsculas) → URL del ícono
// Lo usa el componente TechBadge. Para agregar una tecnología, añade una línea aquí
//   · Devicon (https://devicon.dev): dev('carpeta/archivo')
//   · Logos guardados en public/icons/: 'icons/archivo'
// Una tecnología sin entrada se muestra solo con su nombre (ej. Scrum, LINQ)

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
const dev = (path: string): string => `${DEVICON}/${path}.svg`;

const TECH_ICONS: Readonly<Record<string, string>> = {
  // Lenguajes y web
  'c#': dev('csharp/csharp-original'),
  'typescript': dev('typescript/typescript-original'),
  'javascript': dev('javascript/javascript-original'),
  't-sql': dev('microsoftsqlserver/microsoftsqlserver-plain'),
  'html5': dev('html5/html5-original'),
  'css3': dev('css3/css3-original'),

  // Frameworks y librerías
  '.net framework': dev('dot-net/dot-net-original'),
  '.net core': dev('dotnetcore/dotnetcore-original'),
  'asp.net mvc': dev('dot-net/dot-net-original'),
  'blazor': dev('blazor/blazor-original'),
  'angular': dev('angular/angular-original'),
  'jquery': dev('jquery/jquery-original'),
  'bootstrap': dev('bootstrap/bootstrap-original'),
  'kendo ui': 'icons/kendoui.png',          // logo de Progress, la empresa de Kendo UI
  'infragistics': 'icons/infragistics.png',

  // APIs e integración
  'graphql': dev('graphql/graphql-plain'),
  'json': dev('json/json-original'),
  'xml': dev('xml/xml-original'),
  'ajax': 'icons/ajax.svg',                 // "AJAX logo" de gengns (Wikimedia Commons, CC BY-SA 4.0)

  // Cloud y DevOps
  'azure': dev('azure/azure-original'),
  'azure devops': dev('azuredevops/azuredevops-original'),
  'tfs': dev('azuredevops/azuredevops-original'), // TFS es el nombre anterior de Azure DevOps Server
  'aws': 'icons/aws.svg',
  'docker': dev('docker/docker-original'),
  'github actions': dev('githubactions/githubactions-original'),
  'git': dev('git/git-original'),
  'playfab': 'icons/playfab.png',

  // Bases de datos y reportes
  'sql server': dev('microsoftsqlserver/microsoftsqlserver-plain'),
  'mysql': dev('mysql/mysql-original'),
  'mongodb': dev('mongodb/mongodb-original'),
  'oracle': dev('oracle/oracle-original'),
  'ssrs': dev('microsoftsqlserver/microsoftsqlserver-original'), // Reporting Services viene con SQL Server
  'crystal reports': 'icons/sap.svg',       // SAP Crystal Reports
  'tableau': 'icons/tableau.svg',

  // QA y herramientas
  'selenium': dev('selenium/selenium-original'),
  'postman': dev('postman/postman-original'),
  'grafana': dev('grafana/grafana-original'),
  'jira': dev('jira/jira-original'),
  'visual studio': dev('visualstudio/visualstudio-original'),
  'vs code': dev('vscode/vscode-original'),
  'powershell': dev('powershell/powershell-original'),

  // Seguridad
  'jwt': 'icons/jwt.svg',
  'oauth 2.0': dev('oauth/oauth-original'),
  'azure ad': dev('azure/azure-original'), // Azure AD (hoy Microsoft Entra ID) es un servicio de Azure

  // IA
  'github copilot': 'icons/githubcopilot.svg',
  'claude': 'icons/claude.svg',
  'chatgpt': 'icons/openai.svg',
  'openai codex': 'icons/openai.svg',
  'gemini': 'icons/gemini.svg',
};

// Devuelve la URL del logo de una tecnología, o null si no tiene
export function techIconUrl(name: string): string | null {
  return TECH_ICONS[name.toLowerCase()] ?? null;
}
