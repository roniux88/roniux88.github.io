import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { SectionTitle } from '../shared/section-title';
import { Reveal } from '../shared/reveal';

// Experiencia laboral: una tarjeta por puesto con empresa, cliente y sistema
// Muestra una vista previa (primer logro) y al tocar "Ver detalles" se expande con todos los logros y tecnologías
@Component({
  selector: 'app-experience',
  imports: [SectionTitle, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="section">
      <app-section-title index="01" [title]="data.t().experienceTitle" />

      <ol class="space-y-4">
        @for (job of data.experience; track job.id) {
          <li appReveal class="card overflow-hidden transition-colors"
              [class]="isOpen(job.id) ? 'border-accent/30' : ''">
            <div class="p-5 sm:p-6">
              <!-- Periodo y lugar -->
              <!-- flex-wrap: en pantallas angostas el lugar baja completo a la siguiente línea -->
              <p class="flex flex-wrap gap-x-3 font-mono text-xs text-zinc-500">
                <span class="text-accent">{{ data.tr(job.period) }}</span>
                <span>{{ data.tr(job.location) }}</span>
              </p>

              <!-- Puesto -->
              <h3 class="mt-2 text-lg font-semibold sm:text-xl">{{ data.tr(job.role) }}</h3>

              <!-- Empresa con enlace a su sitio (si aún no tiene URL se ve igual, pero sin enlace) -->
              <p class="mt-1 text-sm">
                @if (job.company.url) {
                  <a [href]="job.company.url" target="_blank" rel="noopener" class="link-accent font-medium">{{ job.company.name }} ↗</a>
                } @else {
                  <span [title]="data.t().linkPending" class="font-medium text-accent/70">{{ job.company.name }}</span>
                }
                @if (job.company.note; as note) {
                  <span class="text-zinc-500"> · {{ data.tr(note) }}</span>
                }
              </p>

              <!-- Cliente y sistema -->
              <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                @if (job.client; as client) {
                  <dt class="font-mono text-xs uppercase tracking-wider text-zinc-500 leading-5">{{ data.t().clientLabel }}</dt>
                  <dd class="text-zinc-300">{{ data.tr(client) }}</dd>
                }
                @if (job.system; as system) {
                  <dt class="font-mono text-xs uppercase tracking-wider text-zinc-500 leading-5">{{ data.t().systemLabel }}</dt>
                  <dd class="text-zinc-300">{{ system }}</dd>
                }
              </dl>

              <!-- Vista previa: el primer logro en 2 líneas; se oculta al abrir porque abajo sale la lista completa -->
              @if (!isOpen(job.id)) {
                <p class="mt-4 line-clamp-2 text-sm leading-relaxed">{{ data.tr(job.highlights)[0] }}</p>
              }

              <!-- Detalles: la fila de la grilla pasa de 0fr (alto 0) a 1fr (alto completo) con transición -->
              <div [id]="'job-' + job.id"
                   class="grid transition-[grid-template-rows] duration-500 ease-out"
                   [class]="isOpen(job.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <div class="overflow-hidden">
                  <ul class="mt-4 space-y-2 text-sm leading-relaxed">
                    @for (highlight of data.tr(job.highlights); track $index) {
                      <li class="flex gap-2.5">
                        <span aria-hidden="true" class="mt-2 size-1 shrink-0 rounded-full bg-accent"></span>
                        <span>{{ highlight }}</span>
                      </li>
                    }
                  </ul>
                  <p class="mt-4 border-t border-white/[0.06] pt-4 text-xs leading-relaxed">
                    <span class="font-mono uppercase tracking-wider text-zinc-500">{{ data.t().technologies }}:</span>
                    {{ job.technologies }}
                  </p>
                </div>
              </div>

              <!-- Botón para abrir y cerrar; aria-expanded / aria-controls informan al lector de pantalla -->
              <button type="button" (click)="toggle(job.id)"
                      [attr.aria-expanded]="isOpen(job.id)" [attr.aria-controls]="'job-' + job.id"
                      class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {{ isOpen(job.id) ? data.t().hideDetails : data.t().showDetails }}
                <span aria-hidden="true" class="inline-block transition-transform duration-300"
                      [class]="isOpen(job.id) ? 'rotate-180' : ''">↓</span>
              </button>
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
  private readonly openIds = signal<ReadonlySet<string>>(new Set());

  protected isOpen(id: string): boolean {
    return this.openIds().has(id);
  }

  // Abre el puesto si está cerrado y lo cierra si está abierto (pueden estar varios abiertos)
  protected toggle(id: string): void {
    this.openIds.update(current => {
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
