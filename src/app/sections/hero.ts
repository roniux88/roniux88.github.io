import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { CountUp } from '../shared/count-up';

// Cada cuánto cambia el rol que rota debajo del nombre (milisegundos)
const ROLE_INTERVAL_MS = 2800;

// Presentación: foto, disponibilidad, nombre, rol rotativo, resumen, especialidades, botones y cifras
// Cada bloque entra con .hero-in (styles.css); --d es su retraso para que aparezcan uno tras otro
@Component({
  selector: 'app-hero',
  imports: [CountUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="top" class="section pt-14 sm:pt-20">
      <!-- Foto (o iniciales) y etiqueta de disponibilidad -->
      <div class="hero-in flex items-center gap-4" style="--d: 0ms">
        @if (data.profile.avatarUrl && !avatarFailed()) {
          <img [src]="data.profile.avatarUrl" [alt]="data.profile.name" (error)="avatarFailed.set(true)"
               class="size-16 rounded-2xl object-cover ring-2 ring-accent/40 sm:size-20" />
        } @else {
          <div class="grid size-16 place-items-center rounded-2xl bg-surface font-display text-xl font-semibold text-zinc-50 ring-2 ring-accent/40 sm:size-20 sm:text-2xl">
            {{ data.profile.initials }}
          </div>
        }
        <div class="text-sm">
          @if (data.profile.available) {
            <p class="inline-flex items-center gap-2 text-zinc-200">
              <!-- Punto con efecto de pulso -->
              <span class="relative flex size-2">
                <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span class="relative inline-flex size-2 rounded-full bg-accent"></span>
              </span>
              {{ data.t().available }}
            </p>
          }
          <p class="mt-0.5 text-zinc-500">{{ data.tr(data.profile.location) }}</p>
        </div>
      </div>

      <!-- Nombre -->
      <h1 class="hero-in mt-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl" style="--d: 100ms">
        {{ data.profile.name }}<span class="text-accent">.</span>
      </h1>

      <!-- Rol que rota: el lector de pantalla lee todos los roles de una vez (sr-only) en lugar de la animación -->
      <p class="hero-in mt-4 h-8 overflow-hidden font-display text-xl text-zinc-300 sm:text-2xl" style="--d: 200ms">
        <span class="sr-only">{{ data.tr(data.profile.roles).join(' · ') }}</span>
        <!-- @for con un solo elemento: al cambiar el rol se crea de nuevo y se repite la animación .role-in -->
        @for (role of [currentRole()]; track role) {
          <span aria-hidden="true" class="role-in">
            <span class="text-accent">/</span> {{ role }}
          </span>
        }
      </p>

      <!-- Resumen -->
      <p class="hero-in mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style="--d: 300ms">{{ data.tr(data.profile.summary) }}</p>

      <!-- Especialidades -->
      <div class="hero-in mt-6" style="--d: 400ms">
        <h2 class="sr-only">{{ data.t().specialtiesTitle }}</h2>
        <ul class="flex flex-wrap gap-2">
          @for (specialty of data.tr(data.profile.specialties); track specialty) {
            <li class="rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1 text-sm text-zinc-200">{{ specialty }}</li>
          }
        </ul>
      </div>

      <!-- Botones -->
      <div class="hero-in mt-8 flex flex-wrap gap-3" style="--d: 500ms">
        <a href="#contact" class="btn-primary group">
          {{ data.t().contact }}
          <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <!-- Solo aparece si hay un CV en PDF configurado en profile.data.ts -->
        @if (data.profile.resumeUrl; as resume) {
          <a [href]="resume" download class="btn-ghost">{{ data.t().downloadCv }} ↓</a>
        }
        @for (social of data.profile.socials; track social.url) {
          <a [href]="social.url" target="_blank" rel="noopener" class="btn-ghost">{{ social.label }} ↗</a>
        }
      </div>

      <!-- Cifras: 2 columnas en móvil, 4 en escritorio; cuentan desde 0 al aparecer -->
      <dl class="hero-in mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4" style="--d: 600ms">
        @for (stat of data.profile.stats; track stat.value + $index) {
          <div class="card flex flex-col-reverse p-4">
            <dt class="mt-1 text-xs text-zinc-500">{{ data.tr(stat.label) }}</dt>
            <dd [appCountUp]="stat.value" class="font-display text-3xl font-semibold text-zinc-50"></dd>
          </div>
        }
      </dl>
    </section>
  `,
})
export class Hero {
  protected readonly data = inject(PortfolioService);

  // true si la foto no se pudo cargar (por ejemplo, si aún no existe public/avatar.jpg)
  protected readonly avatarFailed = signal(false);

  // Posición del rol que se muestra; avanza sola cada ROLE_INTERVAL_MS
  private readonly roleIndex = signal(0);

  // Rol visible en el idioma activo (el % vuelve al primero al llegar al final)
  protected readonly currentRole = computed(() => {
    const roles = this.data.tr(this.data.profile.roles);
    return roles[this.roleIndex() % roles.length];
  });

  constructor() {
    // Si el usuario pidió menos movimiento, el rol no rota
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => this.roleIndex.update(i => i + 1), ROLE_INTERVAL_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
