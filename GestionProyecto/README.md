# Elegance by Stoica — Sitio Web Premium

Sitio web estático premium para el salón de peluquería y estética avanzada **Elegance by Stoica** en Girona.

**Fecha de Configuración**: 2026-06-27 13:36
**Esquema de Control**: MODO LITE de Walter (`.agents/`)

## 🛠️ Stack Tecnológico
- **Core**: HTML5 semántico, CSS3 Vanilla (efectos de lujo, glassmorphism, tipografía premium y animaciones de scroll).
- **Lógica**: Vanilla JavaScript moderno (sin dependencias de terceros para máxima velocidad y SEO).
- **i18n**: Soporte multilingüe integrado (Español, Catalán, Rumano y Ruso).
- **Backend/Panel**: Panel de administración dinámico híbrido (`admin.html`) que consume Firebase Firestore por CDN, cayendo automáticamente en `localStorage` si no hay credenciales configuradas.

## 📂 Estructura de Control (MODO LITE)
Las reglas y el estado operativo se gestionan dentro de la carpeta [.agents/](file:///c:/_0__________IA_____________/AntygralitiProject/ElegansBYStoica/.agents/):
- [WALTER_PROTOCOL_v1.2.md](file:///c:/_0__________IA_____________/AntygralitiProject/ElegansBYStoica/.agents/WALTER_PROTOCOL_v1.2.md) — Protocolo maestro operativo de arranque.
- [ESTADO_ACTUAL__CURRENT_STATE.md](file:///c:/_0__________IA_____________/AntygralitiProject/ElegansBYStoica/.agents/ESTADO_ACTUAL__CURRENT_STATE.md) — Estado actual de la sesión de desarrollo.
- [MASTER_TRACKER.md](file:///c:/_0__________IA_____________/AntygralitiProject/ElegansBYStoica/.agents/MASTER_TRACKER.md) — Manifiesto y Backlog unificado.

## 🚀 Comandos del Proyecto
Para trabajar en este proyecto, necesitas instalar las dependencias con `npm install` y ejecutar:

- **Iniciar Preview Local**:
  ```bash
  npm run dev
  ```
  Levanta un servidor local en `http://localhost:5050` usando el paquete `serve`.

- **Desplegar en Firebase**:
  ```bash
  npm run deploy
  ```
  Sube la web estática a Firebase Hosting.

- **Iniciar Emuladores**:
  ```bash
  npm run emulators
  ```
  Arranca los emuladores de Firebase localmente para desarrollo offline.
