import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { Reveal } from '../shared/reveal';

// Íconos de marca monocromos (Simple Icons); se pintan con el color del texto mediante .brand-icon
const SIMPLE_ICONS = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons';

// Cuánto dura el mensaje "¡Copiado!" (milisegundos)
const COPIED_MESSAGE_MS = 2000;

// Qué dato se acaba de copiar, para mostrar "¡Copiado!" en ese botón
type CopyTarget = 'email' | 'whatsapp';

// Contacto: llamada a la acción, tarjetas de correo y WhatsApp (con botón Copiar) y copyright
@Component({
  selector: 'app-footer',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer id="contact" class="section pb-10">
      <div appReveal class="card relative overflow-hidden p-6 sm:p-10">
        <!-- Luz de acento decorativa en la esquina -->
        <div aria-hidden="true" class="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/10 blur-3xl"></div>

        <div class="relative">
          <p class="eyebrow">04 · {{ data.t().nav.contact }}</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{{ data.t().footerCta }}</h2>
          <p class="mt-3 max-w-xl leading-relaxed">{{ data.t().footerText }}</p>

          <ul class="mt-8 grid gap-3 sm:grid-cols-2">
            <!-- Correo -->
            <li class="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-ink/60 p-4">
              <span aria-hidden="true" class="brand-icon size-6 shrink-0 text-accent" [style.--icon]="icon('gmail')"></span>
              <div class="min-w-0 flex-1">
                <p class="text-xs text-zinc-500">{{ data.t().emailLabel }}</p>
                <a [href]="'mailto:' + data.profile.email" class="block truncate text-sm text-zinc-100 hover:text-accent">{{ data.profile.email }}</a>
              </div>
              <button type="button" (click)="copy('email', data.profile.email)" class="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-accent/50 hover:text-zinc-50">
                {{ copied() === 'email' ? data.t().copied : data.t().copy }}
              </button>
            </li>

            <!-- WhatsApp (solo si profile.whatsapp tiene valor) -->
            @if (data.profile.whatsapp; as phone) {
              <li class="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-ink/60 p-4">
                <span aria-hidden="true" class="brand-icon size-6 shrink-0 text-[#25D366]" [style.--icon]="icon('whatsapp')"></span>
                <div class="min-w-0 flex-1">
                  <p class="text-xs text-zinc-500">{{ data.t().whatsappLabel }}</p>
                  <!-- wa.me abre un chat de WhatsApp (web o app) con este número -->
                  <a [href]="whatsappUrl()" target="_blank" rel="noopener" class="block truncate text-sm text-zinc-100 hover:text-accent">{{ phone }}</a>
                </div>
                <button type="button" (click)="copy('whatsapp', phone)" class="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-accent/50 hover:text-zinc-50">
                  {{ copied() === 'whatsapp' ? data.t().copied : data.t().copy }}
                </button>
              </li>
            }
          </ul>

          <!-- Redes sociales -->
          <ul class="mt-6 flex flex-wrap gap-3">
            @for (social of data.profile.socials; track social.url) {
              <li>
                <a [href]="social.url" target="_blank" rel="noopener" class="btn-ghost">
                  <span aria-hidden="true" class="brand-icon size-4" [style.--icon]="icon(social.label.toLowerCase())"></span>
                  {{ social.label }}
                </a>
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- Copyright con el año actual -->
      <p class="mt-10 text-center text-xs text-zinc-600">© {{ year }} {{ data.profile.copyrightName }} · {{ data.t().builtWith }}</p>
    </footer>
  `,
})
export class Footer {
  protected readonly data = inject(PortfolioService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly year = new Date().getFullYear();

  // Enlace de WhatsApp: wa.me necesita solo los dígitos ('+506 8797 8969' → 'https://wa.me/50687978969')
  protected readonly whatsappUrl = computed(() =>
    `https://wa.me/${(this.data.profile.whatsapp ?? '').replace(/\D/g, '')}`);

  // Qué botón muestra "¡Copiado!" en este momento (null = ninguno)
  protected readonly copied = signal<CopyTarget | null>(null);
  private copiedTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.copiedTimer));
  }

  // Valor para la variable CSS --icon a partir del nombre del ícono en Simple Icons
  protected icon(slug: string): string {
    return `url(${SIMPLE_ICONS}/${slug}.svg)`;
  }

  // Copia el texto al portapapeles y muestra "¡Copiado!" unos segundos
  protected async copy(target: CopyTarget, text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(target);
      clearTimeout(this.copiedTimer);
      this.copiedTimer = setTimeout(() => this.copied.set(null), COPIED_MESSAGE_MS);
    } catch {
      // Si el navegador no permite copiar, no pasa nada: el dato sigue visible
    }
  }
}
