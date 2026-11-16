import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

// Un punto de la red: posición (x, y) y velocidad (vx, vy) en píxeles por cuadro
interface Node { x: number; y: number; vx: number; vy: number; }

// Fondo animado: puntos que flotan despacio y se unen con líneas cuando están cerca (como una red o constelación)
// Cerca del mouse los puntos también se conectan con el cursor. Se dibuja en un <canvas> fijo detrás de todo
@Component({
  selector: 'app-network-bg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 size-full"></canvas>`,
})
export class NetworkBg {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const canvas = this.canvas().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const LINK_DISTANCE = 140;  // distancia máxima (px) para unir dos puntos
      const MOUSE_DISTANCE = 180; // distancia máxima (px) para unir un punto con el cursor
      let nodes: Node[] = [];
      let width = 0;
      let height = 0;
      let frame = 0;
      const mouse = { x: -9999, y: -9999 };

      // Ajusta el canvas al tamaño de la ventana (y a la densidad de la pantalla, para que se vea nítido)
      // y crea los puntos: más pantalla = más puntos, con un máximo de 90
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(90, Math.round((width * height) / 16000));
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        }));
      };

      // Dibuja un cuadro: mueve los puntos, traza las líneas y luego los puntos
      const draw = () => {
        ctx.clearRect(0, 0, width, height);

        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          // Rebota en los bordes
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }

        // Líneas entre puntos cercanos: cuanto más cerca, más visibles
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK_DISTANCE) {
              ctx.strokeStyle = `rgba(103, 232, 249, ${(1 - d / LINK_DISTANCE) * 0.18})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
          // Línea hacia el cursor
          const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (dm < MOUSE_DISTANCE) {
            ctx.strokeStyle = `rgba(129, 140, 248, ${(1 - dm / MOUSE_DISTANCE) * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Puntos
        ctx.fillStyle = 'rgba(165, 243, 252, 0.55)';
        for (const n of nodes) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // requestAnimationFrame: pide el siguiente cuadro (el navegador lo pausa solo si la pestaña no está visible)
        if (!reducedMotion) frame = requestAnimationFrame(draw);
      };

      const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
      const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
      const onResize = () => {
        resize();
        if (reducedMotion) draw(); // sin animación: se dibuja una sola vez, quieto
      };

      resize();
      draw();
      window.addEventListener('resize', onResize);
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
