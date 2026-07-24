/* ═══════════════════════════════════════════════════════════
   ELENA HAIRLOVER — Sistema multilingüe (i18n) EN / ES
   Modulo compatible con I18nLoader.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  window.EleganceI18n = {
    setLanguage: function (lang) {
      if (window.I18nLoader) {
        window.I18nLoader.changeLanguage(lang);
      }
    },
    getText: function (key) {
      return window.I18nLoader ? window.I18nLoader.getText(key) : key;
    }
  };
})();
