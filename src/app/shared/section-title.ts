import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from './reveal';

// Título de sección reutilizable: número pequeño, título grande y una barra de acento que se dibuja al aparecer
@Component({
  selector: 'app-section-title',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header appReveal class="mb-10">
      <p class="eyebrow">{{ index() }}</p>
      <h2 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{{ title() }}</h2>
      <!-- Barra de acento (.title-bar en styles.css) -->
      <span aria-hidden="true" class="title-bar mt-4 block h-0.5 w-12 rounded-full bg-accent"></span>
    </header>
  `,
})
export class SectionTitle {
  // input.required: el componente padre debe enviar estos valores
  readonly index = input.required<string>();
  readonly title = input.required<string>();
}
