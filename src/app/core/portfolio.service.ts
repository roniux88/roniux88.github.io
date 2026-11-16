import { Injectable, computed, effect, signal } from '@angular/core';
import { CATEGORIES, EXPERIENCE, PROFILE, PROJECTS, UI_TEXT } from './portfolio.data';
import { Lang, Localized } from './portfolio.models';

// Clave con la que se guarda el idioma elegido en el navegador
const LANG_KEY = 'lang';

// providedIn: 'root' = una sola instancia para toda la app (como AddSingleton en .NET)
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  // ===== ESTADO =====
  // Signal privado con el idioma activo. Solo este servicio puede cambiarlo
  private readonly _lang = signal<Lang>(this.detectLang());

  // Versión de solo lectura para los componentes (encapsulación, como una propiedad con get público y set privado)
  readonly lang = this._lang.asReadonly();

  // Valor derivado: los textos fijos del idioma activo
  // Se recalcula solo cuando cambia _lang, y la vista se actualiza sola
  readonly t = computed(() => UI_TEXT[this._lang()]);

  // ===== DATOS =====
  // Se exponen tal cual; los componentes los traducen con tr()
  readonly profile = PROFILE;
  readonly projects = PROJECTS;
  readonly experience = EXPERIENCE;
  readonly categories = CATEGORIES;

  constructor() {
    // effect: se ejecuta al iniciar y cada vez que cambia el idioma
    effect(() => {
      const lang = this._lang();
      document.documentElement.lang = lang; // actualiza <html lang=".."> (accesibilidad y SEO)
      localStorage.setItem(LANG_KEY, lang); // recuerda el idioma para la próxima visita
    });
  }

  // Cambia el idioma; todo lo que lea lang() o t() se actualiza solo
  setLang(lang: Lang): void {
    this._lang.set(lang);
  }

  // Devuelve el texto en el idioma activo: tr({ es: 'Hola', en: 'Hello' }) da 'Hola' en español
  // Como lee el Signal _lang, la plantilla se actualiza sola al cambiar de idioma
  tr<T>(value: Localized<T>): T {
    return value[this._lang()];
  }

  // Idioma inicial: 1) el que se guardó antes, 2) el del navegador, 3) inglés
  private detectLang(): Lang {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    return navigator.language.startsWith('es') ? 'es' : 'en';
  }
}