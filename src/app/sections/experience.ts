import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { SectionTitle } from '../shared/section-title';
import { Reveal } from '../shared/reveal';

// Experiencia laboral como línea de tiempo
// Cada puesto se ve como vista previa (puesto, empresa, lugar y primer logro); al hacer clic se expande con todos los detalles
@Component({
  selector: 'app-experience',
  imports: [SectionTitle, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <app-section-title index="01" [title]="data.t().experienceTitle" />

      <ol>
        @for (job of data.experience; track job.id) {
          <!-- appReveal: cada puesto aparece al llegar con el scroll -->
          <!-- En móvil todo va apilado; desde sm hay 2 columnas: 10rem para la fecha y el resto para el detalle -->
          <!-- id exp-…: destino del enlace "Ver en experiencia" de cada proyecto -->
          <li appReveal [id]="'exp-' + job.id" class="group grid scroll-mt-24 gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <p class="font-mono text-xs uppercase tracking-wider text-neutral-500 transition-colors group-hover:text-cyan-300 sm:pt-4">{{ data.tr(job.period) }}</p>

            <!-- border-l dibuja la línea vertical; pb-10 la alarga hasta el siguiente puesto (el último no lo necesita) -->
            <div class="relative border-l border-white/10 pb-10 pl-6 group-last:pb-0">
              <!-- Punto de la línea de tiempo: se enciende en cian al pasar el mouse o cuando el puesto está abierto -->
              <span aria-hidden="true"
                    class="absolute -left-[5px] top-5 size-2.5 rounded-full ring-4 ring-neutral-950 transition duration-300 group-hover:scale-125 group-hover:bg-cyan-300"
                    [class]="isOpen(job.id) ? 'bg-cyan-300 shadow-[0_0_12px_rgb(103_232_249)]' : 'bg-neutral-700'"></span>

              <!-- Tarjeta: toda la parte de arriba es un botón que abre y cierra los detalles -->
              <div class="rounded-2xl border bg-neutral-900/40 backdrop-blur-sm transition-colors duration-300"
                   [class]="isOpen(job.id) ? 'border-cyan-300/25' : 'border-white/5 hover:border-white/15'">
                <!-- aria-expanded y aria-controls: el lector de pantalla sabe si está abierto y qué parte controla -->
                <button type="button" (click)="toggle(job.id)"
                        [attr.aria-expanded]="isOpen(job.id)" [attr.aria-controls]="'job-' + job.id"
                        class="w-full cursor-pointer p-5 text-left">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <!-- Puesto · Empresa -->
                      <h3 class="font-medium text-white transition-colors group-hover:text-cyan-100">
                        {{ data.tr(job.role) }} <span class="text-cyan-300/90">· {{ job.company }}</span>
                      </h3>
                      <p class="mt-1 font-mono text-xs text-neutral-500">{{ data.tr(job.location) }}</p>
                    </div>
                    <!-- Flecha que gira 180° al abrir -->
                    <span aria-hidden="true"
                          class="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/10 text-neutral-400 transition duration-300"
                          [class]="isOpen(job.id) ? 'rotate-180 border-cyan-300/40 text-cyan-300' : ''">⌄</span>
                  </div>

                  <!-- Vista previa: el primer logro, recortado a 2 líneas; se oculta al abrir porque abajo aparece la lista completa -->
                  @if (!isOpen(job.id)) {
                    <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-400">{{ data.tr(job.highlights)[0] }}</p>
                  }
                  <span class="mt-3 inline-block text-xs font-medium text-cyan-300">
                    {{ isOpen(job.id) ? data.t().hideDetails : data.t().showDetails }}
                  </span>
                </button>

                <!-- Detalles: la fila de la grilla pasa de 0fr (alto 0) a 1fr (alto completo), con transición suave -->
                <div [id]="'job-' + job.id"
                     class="grid transition-[grid-template-rows] duration-500 ease-out"
                     [class]="isOpen(job.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                  <div class="overflow-hidden">
                    <div class="px-5 pb-5">
                      <!-- Todos los logros: tr() devuelve la lista del idioma activo -->
                      <ul class="space-y-2 text-sm leading-relaxed text-neutral-400">
                        @for (h of data.tr(job.highlights); track $index) {
                          <li class="flex gap-2"><span aria-hidden="true" class="text-cyan-400/70">▹</span><span>{{ h }}</span></li>
                        }
                      </ul>
                      <!-- Tecnologías por escrito, tal cual el CV -->
                      <p class="mt-4 border-t border-white/5 pt-4 text-xs leading-relaxed text-neutral-400">
                        <span class="font-mono uppercase tracking-wider text-neutral-500">{{ data.t().technologies }}:</span>
                        {{ job.technologies }}
                      </p>
                      <!-- Enlace al proyecto relacionado (baja a su tarjeta en la sección Proyectos) -->
                      @if (job.projectId) {
                        <a [href]="'#project-' + job.projectId"
                           class="mt-3 inline-block text-xs text-cyan-300 transition-colors hover:text-cyan-200">
                          {{ data.t().projectLink }}: {{ projectTitle(job.projectId) }} ↓
                        </a>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        }
      </ol>
    </section>
  `,
})
export class Experience {
  protected readonly data = inject(PortfolioService);

  // Ids de los puestos abiertos. Se guarda un Set nuevo en cada cambio para que el signal avise a la vista
  private readonly open = signal<ReadonlySet<string>>(new Set());

  // Nombre del proyecto a partir de su id, para el texto del enlace
  protected projectTitle(id: string): string {
    return this.data.projects.find(p => p.id === id)?.title ?? id;
  }

  protected isOpen(id: string): boolean {
    return this.open().has(id);
  }

  // Abre el puesto si está cerrado y lo cierra si está abierto (se pueden tener varios abiertos)
  protected toggle(id: string): void {
    this.open.update(current => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
}
