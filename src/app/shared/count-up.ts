import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

// Directiva: cuando la cifra entra en pantalla, cuenta desde 0 hasta su valor (ej. "10+" → 0+, 1+, 2+ … 10+)
// Uso: <dd [appCountUp]="'10+'"></dd>  (el elemento va vacío: la directiva escribe el texto)
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly value = input.required<string>({ alias: 'appCountUp' });

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const text = this.value();
      // Separa el número del resto: '10+' → 10 y '+'. Si no empieza con número, se muestra tal cual
      const match = /^(\d+)(.*)$/.exec(text);
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!match || reducedMotion) {
        element.textContent = text;
        return;
      }

      const target = Number(match[1]);
      const suffix = match[2];
      element.textContent = `0${suffix}`;

      let frame = 0;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1400; // milisegundos
        const start = performance.now();
        // requestAnimationFrame: dibuja un cuadro por refresco de pantalla (animación fluida)
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out: rápido al inicio, frena al final
          element.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });
      observer.observe(element);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
