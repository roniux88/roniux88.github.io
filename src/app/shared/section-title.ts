import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from './reveal';

// Título reutilizable "01 — Proyectos ────". Se escribe una vez y se usa en cada sección (DRY)
@Component({
  selector: 'app-section-title', // etiqueta que se usa en otras plantillas: <app-section-title />
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- appReveal: aparece al llegar con el scroll; la línea se "dibuja" de izquierda a derecha (.title-line en styles.css) -->
    <div appReveal class="mb-10 flex items-center gap-4">
      <!-- Número de la sección en fuente monoespaciada -->
      <span class="font-mono text-sm text-cyan-300">{{ index() }}</span>
      <h2 class="text-2xl font-semibold tracking-tight text-white">{{ title() }}</h2>
      <!-- Línea decorativa que ocupa el espacio restante (flex-1) -->
      <span class="title-line h-px flex-1 bg-gradient-to-r from-cyan-300/50 via-white/10 to-transparent"></span>
    </div>
  `,
})
export class SectionTitle {
  // input.required: el componente padre debe enviar estos valores (como parámetros obligatorios)
  readonly index = input.required<string>();
  readonly title = input.required<string>();
}
