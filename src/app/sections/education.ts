import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { SectionTitle } from '../shared/section-title';
import { Reveal } from '../shared/reveal';

// Formación académica: títulos (tarjetas con años) a la izquierda; certificaciones e idiomas a la derecha
// En celulares las dos columnas quedan una debajo de la otra
@Component({
  selector: 'app-education',
  imports: [SectionTitle, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="education" class="section">
      <app-section-title index="03" [title]="data.t().educationTitle" />

      <div class="grid gap-10 md:grid-cols-2 md:gap-8">
        <!-- ===== Títulos universitarios ===== -->
        <div>
          <h3 appReveal class="text-lg font-semibold">{{ data.t().degreesTitle }}</h3>
          <ul class="mt-4 space-y-3">
            @for (degree of data.degrees; track degree.id; let i = $index) {
              <li [appReveal]="i * 100" class="card p-5">
                <p class="font-mono text-xs text-accent">{{ degree.period }}</p>
                <h4 class="mt-1.5 font-semibold leading-snug">{{ data.tr(degree.title) }}</h4>
                <p class="mt-1 text-sm text-zinc-300">{{ degree.institution }}</p>
                <p class="text-sm text-zinc-500">{{ degree.location }}</p>
                @if (degree.status; as status) {
                  <p class="mt-3 inline-block rounded-full bg-white/[0.05] px-2.5 py-0.5 text-xs text-zinc-400">{{ data.tr(status) }}</p>
                }
              </li>
            }
          </ul>
        </div>

        <div class="space-y-10">
          <!-- ===== Certificaciones ===== -->
          <div>
            <h3 appReveal class="text-lg font-semibold">{{ data.t().certificationsTitle }}</h3>
            <ul class="mt-4 divide-y divide-white/[0.06]">
              @for (cert of data.certifications; track cert.id; let i = $index) {
                <li [appReveal]="i * 100" class="py-3 first:pt-0">
                  <p class="font-medium text-zinc-100">{{ cert.name }}</p>
                  <p class="mt-0.5 text-sm text-zinc-500">
                    {{ cert.issuer }} · <span class="font-mono text-accent">{{ cert.year }}</span>
                    @if (cert.credentialId; as credentialId) {
                      <span class="font-mono text-xs"> · {{ data.t().credentialId }} {{ credentialId }}</span>
                    }
                  </p>
                </li>
              }
            </ul>
          </div>

          <!-- ===== Idiomas ===== -->
          <div appReveal>
            <h3 class="text-lg font-semibold">{{ data.t().languagesTitle }}</h3>
            <ul class="mt-4 space-y-2 text-sm">
              @for (language of data.languages; track $index) {
                <li class="flex justify-between gap-4">
                  <span class="text-zinc-100">{{ data.tr(language.name) }}</span>
                  <span class="text-zinc-500">{{ data.tr(language.level) }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Education {
  protected readonly data = inject(PortfolioService);
}
