import { Injectable, computed, effect, signal } from '@angular/core';
import { Lang, Localized } from './portfolio.models';
import { UI_TEXT } from './data/ui-text.data';
import { PROFILE } from './data/profile.data';
import { EXPERIENCE } from './data/experience.data';
import { SKILL_GROUPS } from './data/skills.data';
import { CERTIFICATIONS, DEGREES, LANGUAGES } from './data/education.data';

// Clave con la que se guarda el idioma elegido en el navegador
const LANG_KEY = 'lang';

// Punto único de acceso a los datos y al idioma activo
// providedIn: 'root' = una sola instancia para toda la app (como AddSingleton en .NET)
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  // ===== IDIOMA =====
  // Signal privado: solo este servicio puede cambiar el idioma
  private readonly _lang = signal<Lang>(this.detectLang());

  // Versión de solo lectura para los componentes (como una propiedad con get público y set privado)
  readonly lang = this._lang.asReadonly();

  // Textos fijos del idioma activo; se recalcula solo cuando cambia el idioma
  readonly t = computed(() => UI_TEXT[this._lang()]);

  // ===== DATOS =====
  // Se exponen tal cual; los componentes traducen los valores con tr()
  readonly profile = PROFILE;
  readonly experience = EXPERIENCE;
  readonly skillGroups = SKILL_GROUPS;
  readonly degrees = DEGREES;
  readonly certifications = CERTIFICATIONS;
  readonly languages = LANGUAGES;

  constructor() {
    // Se ejecuta al iniciar y cada vez que cambia el idioma
    effect(() => {
      const lang = this._lang();
      document.documentElement.lang = lang; // <html lang=".."> (accesibilidad y SEO)
      localStorage.setItem(LANG_KEY, lang); // recuerda el idioma para la próxima visita
    });
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
  }

  // Devuelve el valor en el idioma activo: tr({ es: 'Hola', en: 'Hello' }) → 'Hola'
  // Como lee el signal del idioma, la vista se actualiza sola al cambiarlo
  tr<T>(value: Localized<T>): T {
    return value[this._lang()];
  }

  // Idioma inicial: 1) el guardado, 2) el del navegador, 3) inglés
  private detectLang(): Lang {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    return navigator.language.startsWith('es') ? 'es' : 'en';
  }
}
