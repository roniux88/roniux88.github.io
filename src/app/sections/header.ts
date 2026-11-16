import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { LANGS } from '../core/portfolio.models';

// Barra superior fija: logo, enlaces de navegación, selector de idioma y barra de progreso de lectura
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- sticky top-0: se queda pegada arriba al hacer scroll; backdrop-blur: desenfoca lo que pasa por detrás -->
    <header class="sticky top-0 z-20 border-b border-white/5 bg-neutral-950/70 backdrop-blur">
      <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <!-- Logo con estilo de etiqueta de código; lleva al inicio de la página -->
        <a href="#top" class="group font-mono text-sm text-neutral-100">
          &lt;<span class="transition-colors group-hover:text-cyan-300">{{ data.profile.initials }}</span>/&gt;
        </a>

        <div class="flex items-center gap-6 text-sm">
          <!-- Enlaces a cada sección; hidden sm:inline los oculta en móvil -->
          <!-- La línea de abajo (after:) crece de izquierda a derecha al pasar el mouse -->
          @for (link of links; track link.href) {
            <a [href]="link.href"
               class="relative hidden text-neutral-400 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-cyan-300 after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 sm:inline">
              {{ data.t().nav[link.key] }}
            </a>
          }

          <!-- Selector ES / EN: un botón por idioma -->
          <div class="flex rounded-full border border-white/10 p-0.5 text-xs">
            @for (lang of langs; track lang) {
              <!-- El botón del idioma activo se pinta en blanco -->
              <button
                type="button"
                (click)="data.setLang(lang)"
                [attr.aria-pressed]="data.lang() === lang"
                class="rounded-full px-3 py-1 uppercase transition-colors"
                [class]="data.lang() === lang ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'">
                {{ lang }}
              </button>
            }
          </div>
        </div>
      </nav>

      <!-- Barra de progreso: se llena de izquierda a derecha según cuánto se ha bajado en la página -->
      <div #progress aria-hidden="true" style="transform: scaleX(0)"
           class="absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"></div>
    </header>
  `,
})
export class Header {
  // inject(): obtiene el servicio único (equivale a recibirlo por el constructor en C#)
  // protected: solo lo usan la clase y su plantilla
  protected readonly data = inject(PortfolioService);
  protected readonly langs = LANGS;

  // Enlaces del menú: href = sección destino, key = texto traducido en UI_TEXT.nav
  protected readonly links = [
    { href: '#experience', key: 'experience' },
    { href: '#projects', key: 'projects' },
    { href: '#contact', key: 'contact' },
  ] as const;

  // Referencia al <div #progress> de la plantilla
  private readonly progress = viewChild.required<ElementRef<HTMLElement>>('progress');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const bar = this.progress().nativeElement;
      // Calcula qué fracción de la página se ha recorrido (0 a 1) y estira la barra en esa proporción
      // Se escribe el estilo directo en el elemento: no hace falta que Angular vuelva a revisar la vista en cada scroll
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${ratio})`;
      };
      update();
      // passive: true avisa al navegador que no se bloqueará el scroll (más fluido)
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      });
    });
  }
}
