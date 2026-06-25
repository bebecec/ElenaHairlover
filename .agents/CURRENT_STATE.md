# CURRENT_STATE.md — Elegance by Stoica
> Última actualización: 2026-06-25

---

## ESTADO GENERAL

```text
FASE ACTIVA:     FASE 2/3 — MVP estático + contenido
ARQUITECTURA:    Sitio HTML estático (vanilla JS + Firebase por CDN)  [ver DEC-006]
GATE ACTIVO:     GATE-2 (ABIERTO)
PRÓXIMO PASO:    Configurar proyecto Firebase real y preparar despliegue (Hosting)
BLOQUEOS:        Ninguno
```

---

## CONTEXTO MÍNIMO

- Sitio **estático**: `index.html` (landing), `admin.html` (panel de reservas), `css/`, `js/`,
  `img/`, `video/`. **Sin framework JS**.
- JS propio: `main.js`, `admin.js`, `i18n.js` (multi-idioma ES/EN/RO/RU), `salon-utils.js`,
  `config.js` (config Firebase con placeholders + **fallback a localStorage**).
- **Firebase por CDN** (import ESM `gstatic.com/firebasejs/10.12.2`): Firestore para reservas
  cuando se configuren credenciales reales; mientras tanto, localStorage.
- Tooling local (no en producción): `package.json` con `firebase-tools` (deploy/emuladores) y
  `serve` (preview local) → `npm run dev` en `http://localhost:5050`.
- El proyecto **Next.js** previo quedó **archivado** en `_archive/nextjs/` (abandonado, DEC-006).

---

## ÚLTIMO HITO COMPLETADO

```text
[2026-06-25] Consolidada la arquitectura ESTÁTICA como oficial (DEC-006). Eliminados los restos
             muertos node_modules/ y .next/ del Next.js. Añadido tooling de despliegue
             (package.json + firebase.json + .firebaserc) para Firebase Hosting.
```

---

## PRÓXIMOS 3 PASOS

```text
1. Walter ejecuta `firebase login` y fija el projectId real en .firebaserc + js/config.js.
2. Definir reglas Firestore (firestore.rules) para las reservas reales (hoy fallback localStorage).
3. `npm run deploy` (firebase deploy --only hosting) para publicar el sitio en Firebase Hosting.
```
