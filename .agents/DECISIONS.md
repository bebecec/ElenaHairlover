# DECISIONS.md — Elegance by Stoica
> Historial de decisiones del proyecto

---

## DEC-001 | 2026-06-13
```text
DECISIÓN:    Framework y Stack inicial
HECHOS:      Stack definido: Antigravity IDE (local) + Firebase Studio
SUPOSICIONES: Next.js 14 + Tailwind es compatible con Firebase Hosting (export estático)
RIESGOS:     Si se necesita SSR, migrar a Firebase App Hosting (no solo Hosting)
DECISIÓN:    Next.js 14 (App Router) + Firebase Hosting (export estático inicial)
SIGUIENTE:   Confirmar con AG-03 que export estático cubre todos los casos de uso
ESTADO:      ACTIVA
```

---

## DEC-002 | 2026-06-13
```text
DECISIÓN:    Tendencia visual
HECHOS:      Reporte 2026 prescribe Resonant Stark para mercado premium
SUPOSICIONES: El público objetivo de Stoica valorará el minimalismo sobre el color
RIESGOS:     Puede parecer "frío" si no se balancea con el tono cálido de marca
DECISIÓN:    Resonant Stark como base + paleta cálida (#C9CBA7 + #E9CDB4) como correctivo
SIGUIENTE:   Moodboard para aprobación de Walter (AG-02)
ESTADO:      ACTIVA
```

---

## DEC-003 | 2026-06-13
```text
DECISIÓN:    Sistema de reservas
HECHOS:      Sin sistema previo. Opciones: Firebase propio vs. plataforma externa
SUPOSICIONES: En fase inicial, el volumen no justifica una plataforma de pago
RIESGOS:     Firebase propio requiere más desarrollo; plataforma = marketplace risk
DECISIÓN:    Firebase propio para MVP. Evaluar Phorest/Flowww al superar 50 reservas/mes
SIGUIENTE:   AG-05 diseña flujo de reserva básico sobre Firestore
ESTADO:      ACTIVA — PENDIENTE REVISIÓN al superar umbral
```

---

## DEC-004 | 2026-06-13
```text
DECISIÓN:    Gestión de depósitos
HECHOS:      Reporte recomienda depósitos obligatorios para eliminar no-shows
SUPOSICIONES: La audiencia local aceptará depósitos si el proceso es claro
RIESGOS:     Puede aumentar fricción en primera reserva
DECISIÓN:    PENDIENTE — Walter debe decidir: ¿depósito desde el inicio o tras 30 días?
SIGUIENTE:   Presentar opciones a Walter en reunión de Fase 4
ESTADO:      PENDIENTE DECISIÓN DE WALTER
```

---

## DEC-005 | 2026-06-13
```text
DECISIÓN:    Dominio personalizado
HECHOS:      Sin dominio actual. Firebase da URL .web.app por defecto
SUPOSICIONES: Un dominio .com refuerza el posicionamiento premium
RIESGOS:     Ninguno significativo
DECISIÓN:    Registrar dominio antes de Gate-5 (despliegue). Sugerido: elegancebystoica.com
SIGUIENTE:   Walter confirma disponibilidad y registra dominio
ESTADO:      PENDIENTE ACCIÓN DE WALTER
```
