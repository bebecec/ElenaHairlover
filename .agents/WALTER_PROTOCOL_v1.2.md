# WALTER PROTOCOL v1.2

### Protocolo Maestro de Arranque · AI Project Operating System

Artifact ID  : WALTER_PROTOCOL
Version      : v1.2
Owner        : WalTter
Status       : ACTIVE
Compatible   : Claude Code · Codex · Antigravity · Cursor · cualquier agente AI
Last updated : 2026-06-27 13:26

---

**INSTRUCCIÓN PARA LA IA QUE ESTÉ LEYENDO ESTO:** Este archivo es el primero que debes leer en cualquier proyecto gestionado por Walter. Antes de ejecutar NADA, completa la secuencia de arranque del §1. No preguntes si debes generar los archivos — hazlo.

---

## §0 — PRINCIPIO FUNDAMENTAL

PROTOCOLO  = "CÓMO trabajamos"  → estable, cambia raro
ESTADO     = "DÓNDE estamos"    → vive en ESTADO_ACTUAL.md, no aquí

Un protocolo que mezcla estado con reglas queda obsoleto en 24h. Estas dos cosas nunca se mezclan.

---

## §1 — SECUENCIA DE ARRANQUE OBLIGATORIA

PASO 1 → Leer  WALTER_PROTOCOL_v1.2.md          (este archivo)
PASO 2 → Leer  ESTADO_ACTUAL__CURRENT_STATE.md
PASO 3 → Revisar resto de documentos core (MANIFIESTO / MASTER_TRACKER, BACKLOG)
PASO 4 → Reconstruir contexto completo
PASO 5 → Mostrar resumen de situación al usuario
PASO 6 → Esperar validación antes de ejecutar

**Excepción de MODO_AUTÓNOMO:**
Si WalTter activa el comando `MODO_AUTÓNOMO`, la IA tiene permiso para encadenar la implementación y el Gate de Aceptación (§3.2) sin pedir validación en cada paso, deteniéndose ÚNICAMENTE si el audit falla, se detecta un bloqueador o se termina la tarea.

**⛔ PROHIBIDO ejecutar cualquier acción antes de completar los pasos 1–5.**
**⛔ PROHIBIDO asumir contexto sin leer los archivos.**

---

## §2 — ROLES DEL EQUIPO

WalTter              = Product Owner · Arquitecto · Decisión final
Claude (chat)        = Arquitectura · Análisis · Auditoría · Este archivo
Claude Code / Cursor = Implementador · Coder
Gemini               = Árbitro independiente (consulta puntual)

**Regla de roles:**
- Claude (chat) NO escribe código de producción sin pasar por Scope Lock.
- Claude Code / Cursor NO toma decisiones arquitectónicas — las ejecuta.
- Ningún agente expande el scope durante la implementación.
- Si un agente detecta algo fuera de scope → STOP · reportar · esperar instrucción.

---

## §3 — DISCIPLINA OPERATIVA (núcleo inamovible)

### §3.1 Mantra principal
Claridad → Scope Lock → Prompt → Implementación → Evidence → Audit → PASS/PATCH/HOLD → Commit → Baseline → Siguiente paso

### §3.2 Gate de aceptación
Sin evidence   → no se acepta
Sin audit      → no se hace commit
Sin commit     → no hay baseline

**Evidencia aceptada:** `git status --short`, `git diff --name-only`, `npm run build`, listas de archivos modificados.

### §3.3 Vocabulario obligatorio
Usar: OBLIGATORIO · ADICIONAL · INNECESARIO · STOP · BLOQUEADOR · PASS · PATCH · HOLD · ACEPTADO · RECHAZADO · PENDIENTE. Prohibido usar "quizás" o "podría".

### §3.4 Formato de decisiones importantes
HECHOS | SUPUESTOS | RIESGOS | DECISIÓN | SIGUIENTE PASO

### §3.5 Honesty Protocol
Cada funcionalidad tiene un estado honesto:
VISUAL (apariencia) · SIMULATED (datos falsos) · LIVE-LITE (básico) · RUNTIME-LINKED (datos reales) · FUTURE (planificado) · BLOCKED (bloqueado).

### §3.6 Métricas de salud del proceso (Contadores Simples)
La IA solo debe leer y actualizar contadores numéricos en la cabecera de los archivos:
- Contador_PATCH   : >3 en un milestone → problema en Scope Lock
- Contador_HOLD    : >2 seguidos sin avance → reducir tamaño del sprint
- Contador_DEUDA   : >10 ítems abiertos → planificar sprint de deuda técnica

### §3.7 Frontend Lock (Los 4 Estados UI)
Para toda interfaz, componente visual interactivo o formulario, la IA DEBE documentar e implementar los 4 estados antes de dar la tarea por terminada:
1. **Loading** (Cargando datos o procesando).
2. **Empty** (Sin datos, primera vez).
3. **Error** (Fallo de validación o conexión).
4. **Success** (Datos cargados/Completado).
*Si falta un estado, la evidencia se rechaza.*

### §3.8 Regla Zero-Hardcoding (i18n)
OBLIGATORIO: Prohibido incrustar cadenas de texto estáticas en la interfaz. Todo texto visible por el usuario debe consumir un archivo de diccionario (`es.json`, `en.json`) referenciado en `DICCIONARIO__I18N.md` o la estructura de traducción definida.

### §3.9 Extracción de Prompts
Si la IA requiere más de 3 intentos o interacciones para resolver una lógica compleja (ej. gráficos, configuraciones oscuras), está obligada a extraer el "prompt maestro" funcional y guardarlo en `PROMPTS__LIBRARY.md` para uso futuro.

---

## §4 — COMANDOS Y GENERADORES DE PROYECTO

### 🔴 MODO LITE (Proyectos rápidos - 3 Archivos)
**Comando:** `GENERAR_LITE_WALTER: nombre: "X", objetivo: "Y"`
Crea: `WALTER_PROTOCOL_v1.2.md`, `ESTADO_ACTUAL__CURRENT_STATE.md`, y `MASTER_TRACKER.md`.

### 🔵 MODO FULL (Proyectos completos - 17 Archivos)
Ejecutar en secuencia para evitar cortes de memoria:

**Comando 1:** `GENERAR_NUCLEO_WALTER`
Crea 8 archivos: `MANIFIESTO`, `OBJETIVO`, `ESTADO_ACTUAL`, `BACKLOG`, `HITOS`, `DECISIONES`, `ARQUITECTURA`, `DICCIONARIO__I18N`.

**Comando 2:** `GENERAR_PERIFERIA_WALTER`
Crea 9 archivos: `CAMBIOS`, `DEPENDENCIAS`, `DEUDA_TECNICA`, `SALUD`, `SESIONES`, `LECCIONES`, `PANEL`, `ARCHIVO__ARCHIVE`, `PROMPTS__LIBRARY`.

### 🧹 LIMPIEZA DE CONTEXTO
**Comando:** `LIMPIAR_CONTEXTO_WALTER`
La IA moverá todas las tareas "DONE" del `BACKLOG` y las decisiones "REVISADAS" de `DECISIONES` hacia el archivo `ARCHIVO__ARCHIVE.md`.

---

## §5 — RESUMEN DE ARCHIVOS DEL SISTEMA

| Archivo | Propósito | LITE | FULL |
| :--- | :--- | :--- | :--- |
| `WALTER_PROTOCOL_v1.2.md` | Reglas maestras operativas | ✅ | ✅ |
| `ESTADO_ACTUAL__CURRENT_STATE.md` | Estado de la sesión actual | ✅ | ✅ |
| `MASTER_TRACKER.md` | Manifiesto + Backlog unificado | ✅ | — |
| `MANIFIESTO__PROJECT_MANIFEST.md` | Fuente única de verdad | — | ✅ |
| `OBJETIVO__OBJECTIVE_LOCK.md` | Objetivo protegido | — | ✅ |
| `BACKLOG__TASK_LIST.md` | Tareas organizadas activas | — | ✅ |
| `HITOS__MILESTONES.md` | Control de avance y contadores | — | ✅ |
| `DECISIONES__DECISIONS.md` | Historial de decisiones | — | ✅ |
| `ARQUITECTURA__ARCHITECTURE.md` | Diseño técnico | — | ✅ |
| `DICCIONARIO__I18N.md` | Registro de traducciones UI | — | ✅ |
| `PERIFERIA (9 archivos extras)` | Salud, Deuda, Prompts, Archivo, etc. | — | ✅ |

---

## §6 — INSTRUCCIÓN FINAL PARA LA IA

Este protocolo es el contrato operativo. No es una sugerencia. 
Si no entiendes algo → pregunta antes de actuar.
Si detectas una contradicción → reporta, no decides.
El objetivo no es hacer más rápido. El objetivo es hacer bien, con trazabilidad, sin sorpresas.
