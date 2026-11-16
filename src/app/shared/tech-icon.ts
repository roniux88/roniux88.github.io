import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// Íconos de Devicon (https://devicon.dev) servidos desde el CDN jsDelivr, con versión fija
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
const dev = (path: string) => `${DEVICON}/${path}.svg`;

// Nombre de la tecnología (en minúsculas y sin número de versión) → URL del ícono
// Para agregar una: busca su ícono en devicon.dev y añade una línea con dev('carpeta/archivo')
// Los íconos que no están en Devicon se guardan en public/icons/ y se escriben como 'icons/archivo'
const ICONS: Readonly<Record<string, string>> = {
  // Lenguajes y frontend
  'c#': dev('csharp/csharp-original'),
  'typescript': dev('typescript/typescript-original'),
  'javascript': dev('javascript/javascript-original'),
  'html5': dev('html5/html5-original'),
  'css3': dev('css3/css3-original'),
  'angular': dev('angular/angular-original'),
  'tailwind': dev('tailwindcss/tailwindcss-original'),
  'jquery': dev('jquery/jquery-original'),
  'bootstrap': dev('bootstrap/bootstrap-original'),
  // .NET y backend
  '.net framework': dev('dot-net/dot-net-original'),
  '.net core': dev('dotnetcore/dotnetcore-original'),
  'asp.net mvc': dev('dot-net/dot-net-original'),
  'blazor': dev('blazor/blazor-original'),
  'node.js': dev('nodejs/nodejs-original'),
  'graphql': dev('graphql/graphql-plain'),
  'json': dev('json/json-original'),
  'sql server': dev('microsoftsqlserver/microsoftsqlserver-plain'),
  'ssrs': dev('microsoftsqlserver/microsoftsqlserver-original'), // Reporting Services viene con SQL Server
  // Nube, DevOps y herramientas
  'azure': dev('azure/azure-original'),
  'azure devops': dev('azuredevops/azuredevops-original'),
  'tfs': dev('azuredevops/azuredevops-original'), // TFS es el nombre anterior de Azure DevOps Server
  'github actions': dev('githubactions/githubactions-original'),
  'git': dev('git/git-original'),
  'jira': dev('jira/jira-original'),
  'postman': dev('postman/postman-original'),
  'selenium': dev('selenium/selenium-original'),
  'powershell': dev('powershell/powershell-original'),
  'grafana': dev('grafana/grafana-original'),
  'visual studio': dev('visualstudio/visualstudio-original'),
  'vs code': dev('vscode/vscode-original'),
  'windows server': dev('windows11/windows11-original'),
  // Logos guardados en public/icons (no existen en Devicon)
  'playfab': 'icons/playfab.png',
  'docusign': 'icons/docusign.svg',
  'infragistics': 'icons/infragistics.png',
  'kendo ui': 'icons/kendoui.png',            // logo de Progress, la empresa de Kendo UI
  'dynamics (dfm)': 'icons/dynamics365.svg',  // Dynamics for Microsoft
  'crystal reports': 'icons/sap.svg',         // SAP Crystal Reports
  'ajax': 'icons/ajax.svg',                   // "AJAX logo" de gengns (Wikimedia Commons, CC BY-SA 4.0)
};

// Tecnologías sin ícono público: se muestran como una ficha con siglas del mismo tamaño
// (LINQ y CCTray no tienen un logo oficial)
const MONOGRAMS: Readonly<Record<string, string>> = {
  'entity framework': 'EF',
  'ado.net': 'ADO',
  'linq': 'LINQ',
  'winforms': 'WF',
  'wcf': 'WCF',
  'cctray': 'CC',
  'rest apis': '{ }',
};

// Ficha cuadrada con el ícono de una tecnología. Al pasar el mouse muestra su nombre en un globo
@Component({
  selector: 'app-tech-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- role="img" + aria-label: los lectores de pantalla leen el nombre aunque solo se vea el ícono -->
    <span role="img" [attr.aria-label]="name()"
          class="group/icon relative grid size-9 place-items-center rounded-lg border border-white/5 bg-neutral-800/70 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-neutral-800">
      @if (iconUrl(); as src) {
        <img [src]="src" alt="" loading="lazy" width="20" height="20" class="size-5 rounded-[3px] object-contain" />
      } @else {
        <span aria-hidden="true" class="font-mono text-[9px] font-semibold tracking-tight text-cyan-200">{{ monogram() }}</span>
      }
      <!-- Globo con el nombre: invisible hasta que el mouse entra a la ficha -->
      <span aria-hidden="true"
            class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-950 opacity-0 transition-opacity duration-150 group-hover/icon:opacity-100">
        {{ name() }}
      </span>
    </span>
  `,
})
export class TechIcon {
  // Nombre tal como aparece en portfolio.data.ts, ej. 'Angular' o 'SQL Server'
  readonly name = input.required<string>();

  // Clave para buscar en los mapas: minúsculas y sin el número de versión final ('Angular 15' → 'angular')
  // El espacio antes del número es obligatorio (\s+): así 'HTML5' y 'CSS3' conservan su número
  private readonly key = computed(() => this.name().toLowerCase().replace(/\s+\d+$/, ''));

  // URL del ícono, o null si la tecnología no está en ICONS
  protected readonly iconUrl = computed(() => ICONS[this.key()] ?? null);

  // Siglas de respaldo: las de MONOGRAMS o, si no hay, las 2 primeras letras del nombre
  protected readonly monogram = computed(() =>
    MONOGRAMS[this.key()] ?? this.name().slice(0, 2).toUpperCase());
}
