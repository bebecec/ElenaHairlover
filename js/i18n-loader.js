// ES: i18n-loader.js — Motor de Internacionalización Zero-Hardcoding | EN: i18n-loader.js — Zero-Hardcoding Internationalization Engine
const I18nLoader = {
  currentLang: 'es',
  supportedLangs: ['es', 'en'],
  translations: {},

  detectInitialLanguage() {
    const saved = localStorage.getItem('app_lang') || localStorage.getItem('elegance_lang');
    if (saved && this.supportedLangs.includes(saved)) {
      return saved;
    }
    const navLang = (navigator.language || 'es').toLowerCase();
    if (navLang.startsWith('en')) return 'en';
    return 'es';
  },

  async init() {
    this.currentLang = this.detectInitialLanguage();
    await this.loadTranslations(this.currentLang);
    this.translateDOM();
    this.initSelectorListeners();
  },

  async loadTranslations(lang) {
    if (!this.supportedLangs.includes(lang)) lang = 'es';

    // ES: Protocolo file://: fetch() está bloqueado por el navegador por seguridad | EN: file:// protocol: fetch() is blocked by the browser for security
    // ES: Usar una alternativa mínima en línea para que la página se renderice correctamente | EN: Use an inline minimal fallback so the page still renders correctly
    if (window.location.protocol === 'file:') {
      console.warn('[i18n] Protocolo file:// detectado — usando traducciones inline. Para i18n completo usa un servidor local (npm run dev).');
      this.translations = {};   // ES: mantener el texto DOM tal cual (español) | EN: keep DOM text as-is (hardcoded Spanish)
      this.currentLang = lang;
      document.documentElement.setAttribute('lang', lang);
      return;
    }

    try {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) throw new Error(`Translation file locales/${lang}.json not found`);
      this.translations = await response.json();
      this.currentLang = lang;
      localStorage.setItem('app_lang', lang);
      localStorage.setItem('elegance_lang', lang);
      document.documentElement.setAttribute('lang', lang);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  },

  getText(keyStr) {
    if (!keyStr) return '';
    const keys = keyStr.split('.');
    let text = this.translations;
    for (const key of keys) {
      if (text === undefined || text === null) break;
      text = text[key];
    }
    return (text !== undefined && typeof text === 'string') ? text : keyStr;
  },

  translateDOM() {
    // ES: 1. Elementos con data-i18n | EN: 1. Elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.getText(key);
      if (val !== undefined && typeof val === 'string' && val !== key) {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = val;
        } else {
          el.innerHTML = val;
        }
      }
    });

    // ES: 2. Atributos traducibles con data-i18n-attr | EN: 2. Translatable attributes with data-i18n-attr
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
      const attrSpecs = el.getAttribute('data-i18n-attr').split(',');
      attrSpecs.forEach(spec => {
        const parts = spec.split(':').map(s => s.trim());
        if (parts.length >= 2) {
          const attr = parts[0];
          const key = parts[1];
          const val = this.getText(key);
          if (val !== undefined && typeof val === 'string' && val !== key) {
            el.setAttribute(attr, val);
          }
        }
      });
    });

    // ES: 3. Botones de cambio de idioma (.lang-switch__btn) | EN: 3. Language switch buttons (.lang-switch__btn)
    const switchBtns = document.querySelectorAll('.lang-switch__btn');
    switchBtns.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === this.currentLang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // ES: Evento personalizado para cambios de idioma | EN: Custom event for language changes
    window.dispatchEvent(new CustomEvent('i18nLanguageChanged', { detail: { lang: this.currentLang } }));
  },

  initSelectorListeners() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-switch__btn');
      if (btn) {
        const lang = btn.getAttribute('data-lang');
        if (lang && lang !== this.currentLang) {
          this.changeLanguage(lang);
        }
      }
    });
  },

  async changeLanguage(lang) {
    await this.loadTranslations(lang);
    this.translateDOM();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  I18nLoader.init();
});

window.I18nLoader = I18nLoader;
