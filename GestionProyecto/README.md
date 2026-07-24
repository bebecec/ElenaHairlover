# Elena Hairlover — Sitio Web Premium

Sitio web estático premium para el salón de peluquería y estética avanzada **Elena Hairlover**.

**Última actualización**: 2026-07-24
**Esquema de Control**: Carpeta `GestionProyecto/`

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Estructura** | HTML5 semántico |
| **Estilos** | CSS3 Vanilla — glassmorphism, gradientes premium, animaciones de scroll, tema oscuro fijo |
| **Lógica** | Vanilla JavaScript moderno (sin frameworks) |
| **i18n** | Sistema propio (`i18n-loader.js`) con soporte ES / EN |
| **Backend/Panel** | Panel de administración híbrido (`admin.html`) — Firebase Firestore por CDN o `localStorage` como fallback |
| **Hosting** | Firebase Hosting |
| **Dev Server** | `serve` (puerto 5050) |

---

## 📂 Estructura del Proyecto

```
Templade-salon bellesa/
├── index.html              ← Web pública principal
├── admin.html              ← Panel de administración
├── package.json            ← Scripts npm (dev, deploy, emulators)
├── firebase.json           ← Config Firebase Hosting
├── robots.txt / sitemap.xml
│
├── css/
│   ├── styles.css          ← Estilos principales (46 KB)
│   ├── admin.css           ← Estilos del panel admin (29 KB)
│   └── animations.css      ← Animaciones reutilizables
│
├── js/
│   ├── main.js             ← Lógica de la web pública (carrusel, lightbox, servicios dinámicos)
│   ├── admin.js            ← Lógica del panel admin (CRUD servicios, categorías, galería, hero, vídeos, info salón)
│   ├── i18n-loader.js      ← Motor de traducción DOM
│   ├── i18n.js             ← Helper de idioma
│   ├── config.js           ← Configuración Firebase
│   └── salon-utils.js      ← Utilidades compartidas
│
├── locales/
│   ├── es.json             ← Traducciones Español
│   └── en.json             ← Traducciones English
│
├── img/
│   └── logo.png            ← Logo de la marca
│
└── GestionProyecto/        ← Documentación y control del proyecto
    ├── README.md           ← Este archivo
    ├── BRAND_COLOR_DNA.md  ← Paleta de colores y DNA visual
    ├── DICCIONARIO__I18N.md← Claves de traducción
    ├── ESTADO_ACTUAL__CURRENT_STATE.md
    ├── MASTER_TRACKER.md   ← Backlog unificado
    └── WALTER_PROTOCOL_v1.2.md ← Protocolo operativo
```

---

## ✅ Funcionalidades Implementadas

### Web Pública (`index.html`)
- **Hero** con carrusel de imágenes dinámico (autoplay + swipe táctil)
- **Sección de Servicios** con pestañas por categoría (cargadas dinámicamente desde `localStorage`)
- **Galería** con lightbox a pantalla completa
- **Sección de Experiencia** (timeline de lujo)
- **Footer** con info de contacto, mapa, horarios
- **Logo personalizado** con efecto drop-shadow y tamaño aumentado 10%+10% en home
- **Tema oscuro fijo** (eliminado el selector de tema claro/oscuro)
- **i18n**: Selector ES / EN funcional con traducción de todo el DOM
- **SEO**: Meta tags, robots.txt, sitemap.xml, heading hierarchy

### Panel de Administración (`admin.html`)
- **Servicios**: CRUD completo (crear, editar, eliminar) con botones de icono (lápiz dorado ✏️ / papelera roja 🗑️)
- **Categorías dinámicas**: Crear, renombrar y eliminar categorías manualmente (con protección: no se borra si tiene servicios)
- **Galería**: Subir, editar info y eliminar imágenes (con drag & drop)
- **Hero**: Gestión de imágenes del carrusel principal
- **Vídeos**: 5 slots con edición de metadatos
- **Información del salón**: Nombre, teléfono, email, dirección, horarios, redes sociales
- **Navegación por iconos SVG** (sin texto) en la barra superior del admin
- **Persistencia**: `localStorage` (modo offline) o Firebase Firestore (modo online)
- **Indicador de espacio de almacenamiento** utilizado

### Servicios Precargados (37 de Peluquería)
Wash/Cut/Blow Dry, Straight Blow Dry, Curly/Wavy/Boho Blow Dry, Extensions Blow Dry, Dry Cut, 12 Week Blow Dry, Root Tint, Full Tint, Colour & Partial Highlights, Full/Half Head Highlights, Balayage, Upstyle, Olaplex Treatment, K18 Treatment, Add Hair Cut to Colour — cada uno en variantes Short/Medium/Long con duración y precio en €.

---

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo local (http://localhost:5050)
npm run dev

# Desplegar a Firebase Hosting
npm run deploy

# Emuladores Firebase (desarrollo offline)
npm run emulators
```

---

## 🎨 Identidad Visual

- **Tema**: Solo oscuro (dark mode permanente)
- **Paleta**: Dorados cálidos (`--color-gold-warm`), fondos oscuros profundos, acentos rojos para alertas
- **Tipografía**: Premium (Google Fonts)
- **Efectos**: Glassmorphism en header, animaciones fade-in-up, transiciones suaves cubic-bezier
- **Logo**: `img/logo.png` — con drop-shadow y tamaño escalado en la página principal

Ver detalles completos en [BRAND_COLOR_DNA.md](file:///c:/0.----IA---PROYECT/_AntygralitiProject/TEMPLADE%C3%A7_salo/Templade-salon%20bellesa/GestionProyecto/BRAND_COLOR_DNA.md).

---

## 📋 Estado Actual — Julio 2026

| Área | Estado |
|------|--------|
| Web pública | ✅ Funcional |
| Panel admin | ✅ Funcional |
| Servicios dinámicos | ✅ 37 servicios peluquería cargados |
| Categorías manuales | ✅ CRUD completo |
| i18n ES/EN | ✅ Funcional |
| Tema oscuro | ✅ Fijo (sin toggle) |
| Firebase Hosting | ⚙️ Configurado, pendiente despliegue final |
| Firebase Firestore | ⚙️ Configurado, fallback a localStorage activo |
