// i18n-loader.js
const I18nLoader = {
  currentLang: localStorage.getItem('app_lang') || 'es',
  translations: {},

  async init() {
    await this.loadTranslations(this.currentLang);
    this.translateDOM();
  },

  async loadTranslations(lang) {
    try {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) throw new Error('Translation not found');
      this.translations = await response.json();
      this.currentLang = lang;
      localStorage.setItem('app_lang', lang);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  },

  getText(keyStr) {
    const keys = keyStr.split('.');
    let text = this.translations;
    for (const key of keys) {
      if (text === undefined) break;
      text = text[key];
    }
    return (text !== undefined && typeof text === 'string') ? text : keyStr;
  },

  translateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const keys = el.getAttribute('data-i18n').split('.');
      let text = this.translations;
      for (const key of keys) {
        if (text === undefined) break;
        text = text[key];
      }
      
      if (text !== undefined && typeof text === 'string') {
        if (el.hasAttribute('placeholder')) {
            el.placeholder = text;
        } else {
            el.innerHTML = text;
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

