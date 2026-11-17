import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Configuración global de la app. No usa rutas: es una sola página con anclas (#experience, #projects…)
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // muestra en consola los errores no capturados
  ],
};
