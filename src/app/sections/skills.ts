import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { SectionTitle } from '../shared/section-title';
import { Reveal } from '../shared/reveal';
import { TechBadge } from '../shared/tech-badge';

// Habilidades técnicas agrupadas por categoría; cada tecnología con su logo y nombre
@Component({
  selector: 'app-skills',
  imports: [SectionTitle, Reveal, TechBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="section">
      <app-section-title index="02" [title]="data.t().skillsTitle" />

      <div class="space-y-8">
        <!-- [appReveal]: cada categoría aparece al llegar con el scroll -->
        @for (group of data.skillGroups; track group.id) {
          <div appReveal>
            <h3 class="text-sm font-medium uppercase tracking-wider text-zinc-400">{{ data.tr(group.title) }}</h3>
            <ul class="mt-3 flex flex-wrap gap-2">
              @for (skill of group.skills; track skill) {
                <li><app-tech-badge [name]="skill" /></li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly data = inject(PortfolioService);
}
