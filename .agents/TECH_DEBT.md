# TECH_DEBT.md — Elegance by Stoica
> Limitaciones conocidas, atajos temporales y mejoras pendientes

---

## TD-001
```text
ID:          TD-001
DESCRIPCIÓN: Selección de hora/fecha en formulario de reserva no implementada
IMPACTO:     Walter debe confirmar la cita manualmente (no hay auto-confirmación)
PRIORIDAD:   MEDIA
ESTADO:      ABIERTA
MILESTONE:   Fase 4+
```

---

## TD-002
```text
ID:          TD-002
DESCRIPCIÓN: Diagnóstico de piel por IA (ModiFace-like) no implementado
IMPACTO:     No hay análisis dermatológico automático al lanzar
PRIORIDAD:   BAJA (diferenciador futuro, no bloqueante para MVP)
ESTADO:      SIMULADO
MILESTONE:   Fase futura (post-lanzamiento)
```

---

## TD-003
```text
ID:          TD-003
DESCRIPCIÓN: Probadores virtuales (VTO) no implementados
IMPACTO:     Sin visualización 3D de resultados al lanzar
PRIORIDAD:   BAJA
ESTADO:      SIMULADO
MILESTONE:   Fase futura
```

---

## TD-004
```text
ID:          TD-004
DESCRIPCIÓN: Loop AI-to-Retail no conectado (solo planificado)
IMPACTO:     Recomendaciones de producto post-tratamiento son manuales
PRIORIDAD:   MEDIA
ESTADO:      SIMULADO
MILESTONE:   Fase 4+
```

---

## TD-005
```text
ID:          TD-005
DESCRIPCIÓN: WhatsApp notifications no implementadas (solo email a Walter)
IMPACTO:     Walter puede perder notificaciones si no revisa email frecuentemente
PRIORIDAD:   ALTA
ESTADO:      ABIERTA
MILESTONE:   Fase 4 — requiere Twilio o WhatsApp Business API
```

---

## TD-006
```text
ID:          TD-006
DESCRIPCIÓN: Reglas de seguridad de Firestore (firestore.rules) e índices no definidos; las
             reservas usan fallback localStorage hasta configurar el proyecto Firebase real.
IMPACTO:     Sin persistencia compartida ni control de acceso hasta el setup de Firebase.
PRIORIDAD:   ALTA
ESTADO:      ABIERTA
MILESTONE:   Antes del Gate-5 (despliegue) — requiere projectId real + firebase deploy.
```

---

## NOTA — Next.js archivado (no es deuda activa)
```text
El stack Next.js (DEC-001) fue ABANDONADO a favor del sitio estático (DEC-006). Se conserva en
_archive/nextjs/ solo como referencia. No requiere mantenimiento ni instalación de dependencias.
```
