// i18n-loader.js — Motor de Internacionalización Zero-Hardcoding (EN / ES)
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
    // 1. Elementos con data-i18n
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

    // 2. Atributos traducibles con data-i18n-attr="attr:key,attr2:key2"
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

    // 3. Botones de cambio de idioma (.lang-switch__btn)
    const switchBtns = document.querySelectorAll('.lang-switch__btn');
    switchBtns.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === this.currentLang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Evento personalizado por si otros scripts escuchan cambios de idioma
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
