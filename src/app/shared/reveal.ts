import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

// Directiva: hace que un elemento aparezca suavemente (desde abajo) cuando entra en pantalla al hacer scroll
// Uso: <div appReveal>…</div>  o con retraso en milisegundos: <div [appReveal]="150">…</div>
// Los estilos de la animación están en styles.css (clases .reveal y .is-visible)
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    // Variable CSS con el retraso; styles.css la usa en transition-delay
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class Reveal {
  // Retraso antes de aparecer. Si se escribe solo "appReveal" (sin valor) llega '' y se usa 0
  readonly delay = input(0, { alias: 'appReveal', transform: (v: unknown) => Number(v) || 0 });

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    // afterNextRender: se ejecuta cuando el elemento ya está dibujado en el navegador
    afterNextRender(() => {
      // IntersectionObserver avisa cuando el elemento entra en la parte visible de la pantalla
      // rootMargin -10% abajo: espera a que el elemento suba un poco antes de mostrarlo
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            observer.disconnect(); // solo se anima la primera vez
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
