import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './sections/header';
import { Hero } from './sections/hero';
import { Experience } from './sections/experience';
import { Skills } from './sections/skills';
import { Education } from './sections/education';
import { Footer } from './sections/footer';

// Componente raíz: no tiene lógica, solo arma la página en orden (responsabilidad única)
@Component({
  selector: 'app-root', // coincide con la etiqueta <app-root> de index.html
  imports: [Header, Hero, Experience, Skills, Education, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-experience />
      <app-skills />
      <app-education />
    </main>
    <app-footer />
  `,
})
export class App {}
