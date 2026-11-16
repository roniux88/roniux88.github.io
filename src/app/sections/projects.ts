import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { SectionTitle } from '../shared/section-title';
import { TechIcon } from '../shared/tech-icon';
import { Reveal } from '../shared/reveal';

// Prepara un texto para comparar: minúsculas y sin tildes, así "migracion" encuentra "migración"
function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

@Component({
  selector: 'app-projects',
  imports: [SectionTitle, TechIcon, Reveal],// componentes que usa esta plantilla
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- scroll-mt-20 deja espacio para que el header fijo no tape el título al navegar -->
    <section id="projects" class="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <app-section-title index="02" [title]="data.t().projectsTitle" />

      <!-- Barra de búsqueda: cada tecla actualiza el signal "query" y la lista se filtra al instante -->
      <div appReveal class="relative mb-8">
        <!-- Ícono de lupa dentro de la barra (decorativo) -->
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-500">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" stroke-linecap="round" />
        </svg>
        <input
          type="search"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
          [placeholder]="data.t().searchPlaceholder"
          [attr.aria-label]="data.t().searchPlaceholder"
          class="w-full rounded-full border border-white/10 bg-neutral-900/60 py-3 pl-11 pr-24 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition outline-none focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-300/10 [&::-webkit-search-cancel-button]:hidden" />
        <!-- A la derecha: cuántos proyectos coinciden y el botón × para borrar -->
        <div class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <!-- aria-live: el lector de pantalla anuncia el número de resultados cuando cambia -->
          <span aria-live="polite" class="font-mono text-xs text-neutral-500">{{ visible().length }}/{{ data.projects.length }}</span>
          @if (query()) {
            <button type="button" (click)="query.set('')" [attr.aria-label]="data.t().clearSearch"
                    class="grid size-6 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">×</button>
          }
        </div>
      </div>

      <!-- Grilla de tarjetas: 1 columna en móvil, 2 en tablet y 3 en escritorio -->
      <!-- appReveal: las tarjetas esperan a que la grilla entre en pantalla para hacer su animación de entrada -->
      <div appReveal class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        @for (p of visible(); track p.id) {
          <!-- Tarjeta: (mousemove) mueve un brillo que sigue al cursor (clase .spotlight en styles.css) -->
          <!-- Si featured es true, ocupa 2 columnas (estilo bento) -->
          <!-- id project-…: destino del enlace "Proyecto" de cada experiencia -->
          <article
            [id]="'project-' + p.id"
            (mousemove)="moveSpotlight($event)"
            [style.animation-delay.ms]="$index * 70"
            class="card-in group relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/60 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
            [class]="p.featured ? 'md:col-span-2' : ''">
            <!-- Capa del brillo: invisible hasta que el mouse entra a la tarjeta -->
            <div class="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <!-- relative: pone el contenido por encima de la capa del brillo -->
            <div class="relative flex flex-1 flex-col">
              <!-- Nombre del proyecto o sistema (ej. SIMAV) -->
              <div class="flex items-start justify-between gap-4">
                <h3 class="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-200">{{ p.title }}</h3>
                <!-- Flecha decorativa que se mueve al pasar el mouse -->
                <span aria-hidden="true" class="font-mono text-neutral-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300">↗</span>
              </div>

              <!-- Cliente (para quién era) y empresa (donde trabajabas), cada uno con su etiqueta -->
              <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                @if (p.client; as client) {
                  <dt class="font-mono uppercase tracking-wider text-neutral-500">{{ data.t().clientLabel }}</dt>
                  <dd class="text-neutral-200">{{ data.tr(client) }}</dd>
                }
                <dt class="font-mono uppercase tracking-wider text-neutral-500">{{ data.t().companyLabel }}</dt>
                <dd>
                  <!-- Enlace a la empresa: si aún no tiene URL se ve igual, pero no se puede hacer clic -->
                  @if (p.company; as c) {
                    @if (c.url) {
                      <a [href]="c.url" target="_blank" rel="noopener"
                         class="text-cyan-300 transition-colors hover:text-cyan-200">{{ c.name }} ↗</a>
                    } @else {
                      <span [title]="data.t().linkPending" aria-disabled="true" class="cursor-not-allowed text-cyan-300/70">{{ c.name }} ↗</span>
                    }
                    <!-- Nota opcional, ej. "hoy MultiMoney" -->
                    @if (c.note; as note) {
                      <span class="text-neutral-500"> · {{ data.tr(note) }}</span>
                    }
                  } @else {
                    <span class="text-neutral-400">{{ data.t().personalProject }}</span>
                  }
                </dd>
              </dl>

              <!-- flex-1 empuja chips y enlaces al fondo para que las tarjetas se vean alineadas -->
              <p class="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{{ data.tr(p.description) }}</p>

              <!-- Íconos de tecnologías: al pasar el mouse sobre uno aparece su nombre -->
              <ul class="mt-5 flex flex-wrap gap-2">
                @for (tech of p.stack; track tech) {
                  <li><app-tech-icon [name]="tech" /></li>
                }
              </ul>

              <!-- Enlaces opcionales: solo se muestran si existe la URL -->
              <!-- rel=noopener: buena práctica de seguridad al abrir pestañas nuevas -->
              <!-- "Ver en experiencia" sube al puesto donde se hizo el proyecto, en lugar de repetir los detalles aquí -->
              @if (p.repoUrl || p.demoUrl || experienceId(p.id)) {
                <div class="mt-5 flex gap-4 text-sm">
                  @if (experienceId(p.id); as expId) {
                    <a [href]="'#exp-' + expId" class="text-neutral-300 transition-colors hover:text-cyan-200">{{ data.t().experienceLink }} ↑</a>
                  }
                  @if (p.repoUrl) {
                    <a [href]="p.repoUrl" target="_blank" rel="noopener" class="text-neutral-300 transition-colors hover:text-cyan-200">{{ data.t().code }} ↗</a>
                  }
                  @if (p.demoUrl) {
                    <a [href]="p.demoUrl" target="_blank" rel="noopener" class="text-neutral-300 transition-colors hover:text-cyan-200">{{ data.t().demo }} ↗</a>
                  }
                </div>
              }
            </div>
          </article>
        } @empty {
          <!-- Se muestra si ningún proyecto coincide con el filtro -->
          <p class="text-neutral-500">{{ data.t().noProjects }}</p>
        }
      </div>
    </section>
  `,
})
export class Projects {
  protected readonly data = inject(PortfolioService);

  // Id del puesto de Experiencia relacionado con un proyecto (o undefined si no hay)
  protected experienceId(projectId: string): string | undefined {
    return this.data.experience.find(e => e.projectId === projectId)?.id;
  }

  // Estado local: lo que el visitante escribió en la barra de búsqueda. Empieza vacío
  protected readonly query = signal('');

  // Texto donde se busca en cada proyecto: título, descripción en ES y EN, tecnologías, categorías, cliente y empresa
  // Se calcula una sola vez al crear el componente, porque los datos no cambian
  private readonly searchIndex = new Map(
    this.data.projects.map(p => [
      p.id,
      normalize([
        p.title,
        p.description.es,
        p.description.en,
        ...p.stack,
        ...p.categories,
        p.client?.es ?? '',
        p.client?.en ?? '',
        p.company?.name ?? '',
        p.company?.note?.es ?? '',
      ].join(' ')),
    ]),
  );

  // Valor derivado (Computed Signal): se recalcula solo cuando cambia query()
  // Cada palabra escrita debe aparecer en el proyecto (como varios .Where() encadenados en LINQ)
  // Ej. "angular graphql" muestra solo los proyectos que tienen ambas palabras
  protected readonly visible = computed(() => {
    const words = normalize(this.query()).split(/\s+/).filter(Boolean);
    if (words.length === 0) return this.data.projects;
    return this.data.projects.filter(p => {
      const text = this.searchIndex.get(p.id)!;
      return words.every(w => text.includes(w));
    });
  });

  // Guarda la posición del mouse dentro de la tarjeta en las variables CSS --x y --y
  // La clase .spotlight usa esas variables para dibujar el brillo justo debajo del cursor
  protected moveSpotlight(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--y', `${event.clientY - rect.top}px`);
  }
}
