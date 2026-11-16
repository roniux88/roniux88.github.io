import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { CountUp } from '../shared/count-up';

// Presentación principal: etiqueta de disponibilidad, nombre, rol, bio, botones, avatar y estadísticas
// Cada bloque entra con la clase .hero-in (styles.css); --d es su retraso, para que aparezcan uno tras otro
@Component({
  selector: 'app-hero',
  imports: [CountUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="top" class="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
      <!-- En móvil el avatar va arriba (flex-col-reverse); en pantallas grandes, a la derecha -->
      <div class="flex flex-col-reverse gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div class="max-w-2xl">
          <!-- Etiqueta verde "Disponible"; solo aparece si profile.available es true -->
          @if (data.profile.available) {
            <span class="hero-in inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300" style="--d: 0ms">
              <!-- Punto verde con efecto de pulso (animate-ping) -->
              <span class="relative flex size-2">
                <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
              </span>
              {{ data.t().available }}
            </span>
          }

          <!-- Nombre: texto grande con un reflejo de luz que lo recorre (.text-shimmer en styles.css) -->
          <h1 class="hero-in text-shimmer mt-6 text-4xl font-semibold tracking-tight sm:text-6xl" style="--d: 120ms">{{ data.profile.name }}</h1>

          <!-- Rol con efecto de máquina de escribir y cursor parpadeante: < .NET Senior Developer /> -->
          <!-- aria-label: el lector de pantalla lee el rol completo, no letra por letra -->
          <p class="hero-in mt-3 font-mono text-sm text-neutral-400" style="--d: 240ms" [attr.aria-label]="data.tr(data.profile.role)">
            <span aria-hidden="true">&lt; <span class="text-cyan-200">{{ typedRole() }}</span><span class="caret">▌</span> /&gt;</span>
          </p>

          <!-- Bio traducida al idioma activo -->
          <p class="hero-in mt-6 text-lg leading-relaxed text-neutral-400" style="--d: 360ms">{{ data.tr(data.profile.bio) }}</p>

          <!-- Botones: principal (relleno, con brillo) y secundario (solo borde) -->
          <div class="hero-in mt-8 flex flex-wrap gap-3" style="--d: 480ms">
            <!-- Lleva al footer, donde están el correo y WhatsApp -->
            <a href="#contact"
               class="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-cyan-100 hover:shadow-[0_0_30px_-6px_rgb(103_232_249/0.7)]">
              {{ data.t().contact }}
              <!-- La flecha se desliza a la derecha al pasar el mouse -->
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#experience"
               class="rounded-full border border-white/10 px-5 py-2.5 text-sm text-neutral-200 transition hover:border-cyan-300/40 hover:text-white">
              {{ data.t().viewWork }}
            </a>
          </div>
        </div>

        <!-- Avatar con halo de color detrás que "respira" (.halo en styles.css) -->
        <div class="hero-in relative w-fit shrink-0" style="--d: 200ms">
          <div aria-hidden="true" class="halo absolute -inset-3 rounded-3xl bg-gradient-to-br from-cyan-400/30 to-indigo-500/30 blur-2xl"></div>
          <!-- Si hay foto y cargó bien se muestra; si no existe o falla, se muestran tus iniciales -->
          @if (data.profile.avatarUrl && !avatarFailed()) {
            <img [src]="data.profile.avatarUrl" [alt]="data.profile.name" (error)="avatarFailed.set(true)"
                 class="relative size-28 rounded-2xl object-cover ring-1 ring-cyan-300/30 transition duration-500 hover:scale-105 hover:rotate-2 sm:size-36" />
          } @else {
            <div class="relative grid size-28 place-items-center rounded-2xl bg-neutral-900 font-mono text-3xl text-neutral-200 ring-1 ring-cyan-300/30 transition duration-500 hover:scale-105 hover:rotate-2 sm:size-36">
              {{ data.profile.initials }}
            </div>
          }
        </div>
      </div>

      <!-- Franja de estadísticas: 2 columnas en móvil, 4 en escritorio -->
      <!-- gap-px sobre fondo bg-white/5 dibuja líneas divisorias de 1px entre celdas -->
      <dl class="hero-in mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-4" style="--d: 600ms">
        @for (stat of data.profile.stats; track $index) {
          <!-- flex-col-reverse: en el HTML va primero la etiqueta, pero en pantalla el número queda arriba -->
          <!-- Fondo semitransparente con blur para que se adivine la cuadrícula del fondo -->
          <div class="group flex flex-col-reverse bg-neutral-950/80 p-6 backdrop-blur-sm transition-colors hover:bg-neutral-900/80">
            <dt class="mt-1 text-xs text-neutral-500">{{ data.tr(stat.label) }}</dt>
            <!-- appCountUp: el número cuenta desde 0 cuando la franja aparece en pantalla -->
            <dd [appCountUp]="stat.value" class="text-2xl font-semibold text-white transition-colors group-hover:text-cyan-200"></dd>
          </div>
        }
      </dl>
    </section>
  `,
})
export class Hero {
  protected readonly data = inject(PortfolioService);

  // Pasa a true si la foto no se pudo cargar (por ejemplo, si aún no existe public/avatar.jpg)
  protected readonly avatarFailed = signal(false);

  // Parte del rol que ya se "escribió" (efecto máquina de escribir)
  protected readonly typedRole = signal('');

  constructor() {
    let timer: number | undefined;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // effect: se ejecuta al inicio y cada vez que cambia el idioma (porque tr() lee el idioma activo)
    // Así el rol se vuelve a escribir letra por letra al pasar de ES a EN
    effect(() => {
      const full = this.data.tr(this.data.profile.role);
      clearInterval(timer);
      if (reducedMotion) {
        this.typedRole.set(full); // sin animación: se muestra completo
        return;
      }
      let i = 0;
      this.typedRole.set('');
      timer = window.setInterval(() => {
        i++;
        this.typedRole.set(full.slice(0, i));
        if (i >= full.length) clearInterval(timer);
      }, 30); // milisegundos por letra
    });

    // Al destruir el componente se detiene el temporizador
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
