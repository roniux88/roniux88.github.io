import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { LANGS, UiText } from '../core/portfolio.models';

// Enlaces del menú: destino (#ancla) y clave del texto traducido en UI_TEXT.nav
const NAV_LINKS: readonly { href: string; key: keyof UiText['nav'] }[] = [
  { href: '#experience', key: 'experience' },
  { href: '#skills', key: 'skills' },
  { href: '#education', key: 'education' },
  { href: '#contact', key: 'contact' },
];

// Barra superior fija: iniciales, menú, selector de idioma y barra de progreso de lectura
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- sticky: se queda arriba al hacer scroll; backdrop-blur desenfoca lo que pasa por detrás -->
    <header class="sticky top-0 z-20 border-b border-white/[0.06] bg-ink/75 backdrop-blur-md">
      <nav class="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3.5">
        <!-- Iniciales con un punto de acento; llevan al inicio -->
        <a href="#top" class="font-display text-lg font-semibold tracking-tight text-zinc-50">
          {{ data.profile.initials }}<span class="text-accent">.</span>
        </a>

        <div class="flex items-center gap-5">
          <!-- Menú: en celulares se oculta (hidden) y se navega con scroll; desde sm se muestra -->
          <ul class="hidden items-center gap-5 text-sm sm:flex">
            @for (link of links; track link.href) {
              <li>
                <a [href]="link.href" class="text-zinc-400 transition-colors hover:text-zinc-50">{{ data.t().nav[link.key] }}</a>
              </li>
            }
          </ul>

          <!-- Selector ES / EN -->
          <div class="flex rounded-full border border-white/10 p-0.5 text-xs">
            @for (lang of langs; track lang) {
              <button
                type="button"
                (click)="data.setLang(lang)"
                [attr.aria-pressed]="data.lang() === lang"
                class="rounded-full px-3 py-1 font-medium uppercase transition-colors"
                [class]="data.lang() === lang ? 'bg-accent text-ink' : 'text-zinc-400 hover:text-zinc-50'">
                {{ lang }}
              </button>
            }
          </div>
        </div>
      </nav>

      <!-- Barra de progreso: se llena según cuánto se ha bajado en la página -->
      <div #progress aria-hidden="true" style="transform: scaleX(0)"
           class="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"></div>
    </header>
  `,
})
export class Header {
  protected readonly data = inject(PortfolioService);
  protected readonly langs = LANGS;
  protected readonly links = NAV_LINKS;

  private readonly progress = viewChild.required<ElementRef<HTMLElement>>('progress');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const bar = this.progress().nativeElement;
      // Fracción de la página recorrida (0 a 1). Se escribe el estilo directo:
      // no hace falta que Angular revise la vista en cada scroll
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      };
      update();
      window.addEventListener('scroll', update, { passive: true }); // passive: scroll más fluido
      window.addEventListener('resize', update);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      });
    });
  }
}
