# ESTADO ACTUAL · CURRENT STATE

**Proyecto**: Elegance by Stoica
**Última actualización**: 2026-07-03 23:01
**Modo**: LITE (3 Archivos Core)

## Contadores del Proceso
- Contador_PATCH   : 0
- Contador_HOLD    : 0
- Contador_DEUDA   : 0

---

## Situación General
El proyecto se encuentra en desarrollo activo bajo el **MODO LITE** de Walter. La inicialización ha sido completada con éxito y se ha ejecutado el comando `LIMPIAR_CONTEXTO_WALTER` para archivar todas las tareas del Hito 1 y la primera tarea del Hito 2 en `ARCHIVO__ARCHIVE.md`.

Actualmente estamos migrando los estilos del sitio web a Tailwind CSS v3 a través de Play CDN manteniendo el soporte del tema (Claro/Oscuro) en vanilla JS.

---

## Hito Activo: Hito 2: Mantenimiento y Evolución (2026-06-28 10:48)
- **Objetivo**: Refactorizar y actualizar los estilos del proyecto Elegance by Stoica usando Tailwind CSS v3 por CDN y mantener la compatibilidad del tema y la lógica dinámica.
- **Progreso**: Mapeadas las variables CSS de tema en el config de Tailwind; refactorizados el Header, Navegación y Hero de `index.html` a Tailwind, comentando sus estilos redundantes en `styles.css`. Realizada una auditoría del manifiesto traduciendo todos los comentarios CSS en `index.html` de inglés a español, garantizando el cumplimiento de la Regla 1. Asegurada la cobertura al 100% de las fotos del carrusel del Hero. Migrada la navegación del Hero desde botones físicos de flechas a zonas de clic transparentes de ancho 15% en los bordes izquierdo y derecho del carrusel.

---

## Verificación realizada (2026-07-03 11:49)
- Arranque WALTER completado (README + ESTADO + MASTER_TRACKER leídos).
- Preview local levantado (`npm run dev`, :5050). Verificado end-to-end:
  - i18n: cambio ES/CAT/RO/RU correcto (Serveis / Услуги).
  - Tema claro/oscuro: funciona y persiste en `localStorage["elegance_main_theme"]` (oscuro por defecto).
  - Sin errores en consola. Único aviso: `cdn.tailwindcss.com` no debe usarse en producción.
- **Corrección aplicada**: añadido `aria-label="Alternar modo claro u oscuro"` a los botones de tema (antes solo-emoji, sin nombre accesible) en `index.html` (#main-theme-toggle y #mobile-theme-toggle).

## Hallazgo prioritario (decisión del PO) — Tailwind Play CDN en producción
- **HECHOS**: la web carga Tailwind vía `cdn.tailwindcss.com` (Play CDN), que compila CSS en el navegador en tiempo de ejecución. Además el `<style>` inline usa `@apply` extensamente (procesado por el runtime del CDN).
- **RIESGOS**: contradice el objetivo del MANIFIESTO ("sin dependencias de terceros, máxima velocidad y SEO"); peor First Paint / posible FOUC; dependencia externa; avisos en consola. No apto para producción.
- **DECISIÓN (pendiente de Walter)**: productionizar Tailwind con build estático (Tailwind CLI → CSS purgado y minificado, servido por `<link>`), moviendo el `@apply` inline al input de build. Alternativa: mantener CDN solo para prototipo. Requiere aprobación (introduce paso de build) — no se ejecuta sin luz verde.

## Trabajo implementado (2026-07-03 23:01) — Profesionalización visual

### A) Panel de administración — NIVEL 1 (verificado escritorio + móvil)
- **Responsive de cabecera**: badges (Modo/Capacidad) y acciones ya no desbordan en móvil; logo reducido 121px→60px en móvil (`css/admin.css`).
- **Pestañas**: scroll horizontal en móvil (antes se cortaban). Además la tabla de servicios desbordaba la página (509px) → envuelta en scroll horizontal (`.services-table-wrapper`).
- **Consistencia de marca**: "Uñas & Mirada" → "Cejas & Pestañas"; "Centro" → "Salón"; pestaña "Gestión de Vídeos" → "Vídeos (Próximamente)"; semilla de servicios sin Manicura/Pedicura (coincide con la web pública).
- **Modal de confirmación on-brand**: nuevo `#confirm-modal` + helper `showConfirm()` (Promise) que sustituye los 3 `confirm()` nativos (borrar servicio/imagen/foto). Cierra con botón, clic fuera o Esc.
- Archivos: `admin.html`, `css/admin.css`, `js/admin.js`.

### B) Web pública — arreglo de contraste en TEMA CLARO (bug serio)
- **Causa raíz**: `[data-theme="light"]` invierte `--color-dark-main` a **blanco** (para aclarar fondos), pero muchos textos usaban ese token para ser oscuros → quedaban blancos sobre fondo claro (invisibles).
- **Arreglo**: bloque `html[data-theme="light"]` en `css/styles.css` (mayor especificidad, sin tocar modo oscuro) que fuerza texto oscuro real en: títulos de sección, nombres/duraciones de servicios, pasos de experiencia + números 01-04, cita de marca, contacto (títulos, párrafos, horario, título de la tarjeta de horario), reserva, footer, pestañas inactivas, botón "Reservar", y **menú + selector de idioma en cabecera con scroll** (scoped a `.header.scrolled` para no romper el menú blanco sobre el hero).
- Verificado en ES y RU; modo oscuro intacto; consola sin errores.

## Próximos Pasos (retomar aquí)
1. **[PENDIENTE PO] Productionizar Tailwind** (Play CDN → build CLI con CSS purgado/minificado). Decisión pendiente de Walter; introduce paso de build. Es el bloqueador principal de producción.
2. **[DEUDA — raíz del bug de tema]** Refactor de tokens: separar superficie (`--surface`) de texto (`--ink`) en vez de invertir `--color-dark-main` para ambos usos. El arreglo actual es un parche sólido pero conviene la solución limpia (Nivel 3).
3. **NIVEL 2 (visual, admin)**: jerarquía de la tabla de servicios, dropzones de galería/hero, formulario "Información del Salón" con horario estructurado de 7 días + validación inline + estado guardado.
4. Revisar `css/styles.css` residual (híbrido) y compactarlo cuando la migración Tailwind esté cerrada.
5. Revisar contraste del tema claro en secciones aún no auditadas (galería, modal de éxito) por si queda algún texto blanco.
