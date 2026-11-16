import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { Reveal } from '../shared/reveal';

// Íconos de marca (monocromos) de Simple Icons; se pintan con el color del texto usando la clase .brand-icon
const SIMPLE_ICONS = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons';

// Qué dato se acaba de copiar (para mostrar "¡Copiado!" en ese botón)
type Copied = 'email' | 'whatsapp' | null;

// Pie de página: llamada a la acción, tarjetas de correo y WhatsApp, redes y copyright
@Component({
  selector: 'app-footer',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- id=contact: aquí llega el enlace "Contacto" del header -->
    <footer id="contact" class="mt-16 scroll-mt-20">
      <div class="mx-auto max-w-5xl px-6 py-16">
        <!-- Tarjeta grande de contacto; appReveal la hace aparecer al llegar con el scroll -->
        <div appReveal class="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-8 backdrop-blur-sm sm:p-12">
          <!-- Luces decorativas en las esquinas -->
          <div aria-hidden="true" class="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cyan-400/15 blur-3xl"></div>
          <div aria-hidden="true" class="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-indigo-500/15 blur-3xl"></div>

          <div class="relative">
            <p class="font-mono text-xs text-cyan-300">// {{ data.t().nav.contact }}</p>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{{ data.t().footerCta }}</h2>
            <p class="mt-4 max-w-xl leading-relaxed text-neutral-400">{{ data.t().footerText }}</p>

            <!-- Dos tarjetas: correo y WhatsApp -->
            <div class="mt-10 grid gap-4 sm:grid-cols-2">
              <!-- ===== CORREO ===== -->
              <div class="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_40px_-12px_rgb(34_211_238_/_0.45)]">
                <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                  <!-- Ícono de sobre -->
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="size-6">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" stroke-linejoin="round" />
                  </svg>
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-xs text-neutral-500">{{ data.t().emailLabel }}</p>
                  <!-- after:absolute after:inset-0 hace que toda la tarjeta sea clicable sin anidar botones dentro del enlace -->
                  <a [href]="'mailto:' + data.profile.email"
                     class="block truncate font-mono text-sm text-white after:absolute after:inset-0 after:rounded-2xl">
                    {{ data.profile.email }}
                  </a>
                </div>
                <!-- relative z-10: queda por encima del enlace que cubre la tarjeta -->
                <button type="button" (click)="copy('email', data.profile.email)"
                        class="relative z-10 shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-cyan-300/40 hover:text-white">
                  {{ copied() === 'email' ? data.t().copied : data.t().copy }}
                </button>
              </div>

              <!-- ===== WHATSAPP ===== (solo si profile.whatsapp tiene valor) -->
              @if (data.profile.whatsapp; as phone) {
                <div class="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_0_40px_-12px_rgb(52_211_153_/_0.45)]">
                  <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    <span aria-hidden="true" class="brand-icon size-6" [style.--icon]="icon('whatsapp')"></span>
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs text-neutral-500">{{ data.t().whatsappLabel }}</p>
                    <!-- wa.me abre un chat de WhatsApp (web o app) con este número -->
                    <a [href]="whatsappUrl()" target="_blank" rel="noopener"
                       class="block truncate font-mono text-sm text-white after:absolute after:inset-0 after:rounded-2xl">
                      {{ phone }}
                    </a>
                  </div>
                  <button type="button" (click)="copy('whatsapp', phone)"
                          class="relative z-10 shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-emerald-400/40 hover:text-white">
                    {{ copied() === 'whatsapp' ? data.t().copied : data.t().copy }}
                  </button>
                </div>
              }
            </div>

            <!-- Redes sociales, generadas desde profile.socials -->
            <ul class="mt-8 flex flex-wrap gap-3">
              @for (s of data.profile.socials; track s.url) {
                <li>
                  <a [href]="s.url" target="_blank" rel="noopener"
                     class="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-300 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white">
                    <span aria-hidden="true" class="brand-icon size-4" [style.--icon]="icon(s.label.toLowerCase())"></span>
                    {{ s.label }}
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>

        <!-- Copyright con el año actual, calculado en la clase -->
        <p class="mt-10 text-center text-xs text-neutral-600">© {{ year }} {{ data.profile.name }} · {{ data.t().builtWith }}</p>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly data = inject(PortfolioService);
  private readonly destroyRef = inject(DestroyRef);

  // Se calcula una vez al cargar la página
  protected readonly year = new Date().getFullYear();

  // Enlace de WhatsApp: wa.me necesita solo los dígitos ('+506 8797 8969' → 'https://wa.me/50687978969')
  protected readonly whatsappUrl = computed(() =>
    `https://wa.me/${(this.data.profile.whatsapp ?? '').replace(/\D/g, '')}`);

  // Qué botón muestra "¡Copiado!" en este momento
  protected readonly copied = signal<Copied>(null);
  private copiedTimer?: number;

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.copiedTimer));
  }

  // Valor para la variable CSS --icon: la URL del ícono de Simple Icons (ej. 'github', 'linkedin', 'whatsapp')
  protected icon(slug: string): string {
    return `url(${SIMPLE_ICONS}/${slug}.svg)`;
  }

  // Copia el texto al portapapeles y muestra "¡Copiado!" durante 2 segundos
  protected async copy(which: Exclude<Copied, null>, text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(which);
      clearTimeout(this.copiedTimer);
      this.copiedTimer = window.setTimeout(() => this.copied.set(null), 2000);
    } catch {
      // Si el navegador no permite copiar, no pasa nada: el dato sigue visible en la tarjeta
    }
  }
}
