import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { Header } from './sections/header';
import { Hero } from './sections/hero';
import { Projects } from './sections/projects';
import { Experience } from './sections/experience';
import { Footer } from './sections/footer';
import { NetworkBg } from './shared/network-bg';

// Componente raíz: no tiene lógica, solo arma la página en orden (responsabilidad única)
@Component({
  selector: 'app-root', // coincide con la etiqueta <app-root> de index.html
  imports: [NetworkBg, Header, Hero, Projects, Experience, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Fondo animado: red de puntos conectados (shared/network-bg.ts) -->
    <app-network-bg />
    <!-- Luz suave que sigue al mouse por toda la página (.cursor-glow en styles.css) -->
    <div aria-hidden="true" class="cursor-glow"></div>
    <app-header />
    <main>
      <app-hero />
      <!-- Primero la trayectoria (lo que más mira un reclutador), después los proyectos -->
      <app-experience />
      <app-projects />
    </main>
    <app-footer />
  `,
})
export class App {
  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Guarda la posición del mouse en las variables CSS --mx y --my de <html>; .cursor-glow las usa
      // Se escribe el estilo directo: no hace falta que Angular revise la vista en cada movimiento
      const root = document.documentElement;
      const move = (e: PointerEvent) => {
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
      };
      window.addEventListener('pointermove', move, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('pointermove', move));
    });
  }
}