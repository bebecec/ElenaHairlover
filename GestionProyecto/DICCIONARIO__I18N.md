# DICCIONARIO · I18N

**Sistema Zero-Hardcoding (Walter Protocol §3.8)**

## Estructura de Traducciones
El sistema utiliza JSON estáticos alojados en la carpeta `locales/`.
Los idiomas disponibles son:
- `es.json` (Español - Predeterminado)
- `en.json` (Inglés)

## Uso en Frontend
Se utiliza el atributo `data-i18n` en los elementos HTML, apuntando a la ruta del JSON.
Ejemplo: `<h1 data-i18n="hero.title"></h1>`

El script `js/i18n-loader.js` inicializa en el evento `DOMContentLoaded` y sustituye los valores dinámicamente en el DOM.
Para cambiar de idioma en ejecución: `I18nLoader.changeLanguage('en')`.
