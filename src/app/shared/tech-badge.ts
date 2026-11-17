import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { techIconUrl } from './tech-icons';

// Ficha de una tecnología: logo + nombre, siempre visibles (también en celulares, donde no hay "hover")
@Component({
  selector: 'app-tech-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge">
      @if (iconUrl(); as src) {
        <!-- alt vacío: el nombre ya está escrito al lado -->
        <img [src]="src" alt="" loading="lazy" width="16" height="16" class="size-4 shrink-0 rounded-[3px] object-contain" />
      } @else {
        <!-- Sin logo: un punto de color en su lugar, para mantener la alineación -->
        <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-accent"></span>
      }
      {{ name() }}
    </span>
  `,
})
export class TechBadge {
  // Nombre tal como aparece en los datos, ej. 'SQL Server'
  readonly name = input.required<string>();

  protected readonly iconUrl = computed(() => techIconUrl(this.name()));
}
