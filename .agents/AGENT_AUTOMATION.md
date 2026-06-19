# AG-05 — AGENTE DE AUTOMATIZACIÓN & CRM
> Elegance by Stoica | v1.0 | 2026-06-13

---

## IDENTIDAD DEL AGENTE

```text
ID:           AG-05
ROL:          Especialista en Automatización, Reservas y Retención
REPORTA A:    DIRECTOR PRINCIPAL
COLABORA CON: AG-03 (Frontend/Firebase), AG-06 (QA)
FASE ACTIVA:  FASE 4
```

---

## MISIÓN

Construir el ecosistema de retención y automatización que convierte
visitantes en pacientes recurrentes, eliminando no-shows y maximizando
el CLV (Valor de Vida del Cliente).

**Modelo adoptado: Loop AI-to-Retail**

---

## PROTOCOLO DE HONESTIDAD — AG-05

```text
ESTADO INICIAL DE TODO LO QUE SIGUE: SIMULADO / INTEGRACIÓN FUTURA

Nada en esta sección es FUNCIONAL hasta implementación verificada.
Cada automatización tendrá su propio GATE antes de marcarse FUNCIONAL.
```

---

## ARQUITECTURA DE RESERVAS

### Flujo de Reserva Online (Formulario 3 campos)

```text
USUARIO:
  1. Rellena: Nombre + Teléfono + Servicio
  2. Pulsa "Obtener Mi Consulta de Cortesía"
  3. Firestore guarda la solicitud
  4. Cloud Function dispara notificaciones

WALTER (ADMIN):
  5. Recibe notificación (email + WhatsApp)
  6. Accede al panel admin para ver solicitudes
  7. Confirma la cita manualmente (Fase inicial)
  8. Sistema envía confirmación al paciente

EVOLUCIÓN FUTURA:
  → Integración con calendario para auto-confirmación
  → Selección de fecha/hora en la web
```

### Gestión de Depósitos (Anti No-Show)
```text
ESTADO: INTEGRACIÓN FUTURA (Fase 4+)

OPCIONES DE IMPLEMENTACIÓN:
  Opción A: Stripe (pago de depósito online al reservar)
  Opción B: Bizum manual (con instrucciones claras)
  Opción C: Plataforma branded (Phorest / Flowww)

REGLA:
  → Depósito obligatorio para tratamientos > [precio umbral]
  → Depósito descontable del tratamiento final
  → No reembolsable si cancela < 24h
```

---

## CLOUD FUNCTIONS — ESPECIFICACIONES

### Función 1: Notificación de Nueva Reserva
```typescript
// functions/src/onReservaCreada.ts
// ESTADO: PLANIFICADO

export const onReservaCreada = functions.firestore
  .document('reservas/{reservaId}')
  .onCreate(async (snap, context) => {
    const reserva = snap.data()

    // 1. Email a Walter (admin)
    await enviarEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Nueva solicitud: ${reserva.nombre} — ${reserva.servicio}`,
      body: `...`
    })

    // 2. WhatsApp a Walter (via Twilio o similar)
    // ESTADO: INTEGRACIÓN FUTURA

    // 3. Email/SMS de confirmación al paciente
    // ESTADO: INTEGRACIÓN FUTURA (necesita email del paciente)
  })
```

### Función 2: Recordatorio de Re-reserva (AI-powered)
```typescript
// functions/src/recordatorioReserva.ts
// ESTADO: INTEGRACIÓN FUTURA

// Lógica:
// 1. Cloud Scheduler revisa pacientes cada semana
// 2. Detecta pacientes sin cita en los últimos N días
//    (N depende del tratamiento: botox ~4 meses, facial ~1 mes)
// 3. Genera mensaje personalizado
// 4. Envía por email o WhatsApp
```

### Función 3: Loop AI-to-Retail
```typescript
// functions/src/loopAiRetail.ts
// ESTADO: INTEGRACIÓN FUTURA

// Lógica:
// 1. Diagnóstico IA detecta: deshidratación / hiperpigmentación / etc.
// 2. Sistema busca producto recomendado en catálogo
// 3. Genera link de compra personalizado
// 4. Envía al paciente post-tratamiento (email/WhatsApp)
```

---

## CRM BÁSICO (FIRESTORE)

### Estructura de Datos del Paciente
```typescript
// Colección: pacientes/{uid}
interface Paciente {
  id: string
  nombre: string
  telefono: string
  email?: string
  fechaRegistro: Timestamp
  ultimaVisita: Timestamp
  proximaCita?: Timestamp
  historialTratamientos: Tratamiento[]
  productoRecomendado?: string
  estadoRetención: 'activo' | 'en_riesgo' | 'perdido'
  notas?: string
}

interface Tratamiento {
  fecha: Timestamp
  servicio: string
  duracion: number        // minutos
  precio: number
  notas?: string
  satisfaccion?: 1|2|3|4|5
}
```

### Panel Admin (Walter)
```text
FUNCIONALIDADES PANEL:
  □ Ver todas las reservas (pendientes / confirmadas / canceladas)
  □ Vista semanal del calendario
  □ Perfil de cada paciente + historial
  □ Marcar tratamiento como completado
  □ Añadir notas post-tratamiento
  □ Ver métricas: CR, CPL, CLV

ACCESO: /admin (protegido con Firebase Auth)
AUTH:   Email + contraseña de Walter (sin acceso público)
```

---

## REACTIVACIÓN DE CLIENTES INACTIVOS

```text
ESTADO: SIMULADO hasta Fase 4

REGLA:
  → Paciente sin visita en 9 meses = "en_riesgo"
  → Cloud Scheduler detecta y dispara campaña

CAMPAÑA DE REACTIVACIÓN:
  Semana 1: Email "Te echamos de menos" + oferta especial
  Semana 3: WhatsApp recordatorio si no hubo respuesta
  Semana 6: Bono regalo como incentivo final

INSPIRACIÓN: Modelo Evasiom Spa (Reporte 2026)
```

---

## PLATAFORMA BRANDED VS. MARKETPLACE

```text
RIESGO A EVITAR: "Marketplace Risk"
Plataformas como Mindbody = exponen al cliente a competidores

RECOMENDACIÓN DIRECTOR (Reporte 2026):
  Fase inicial: Sistema propio (Firebase) — sin dependencia externa
  Fase escalado: Evaluar Phorest o Flowww

DECISIÓN ACTIVA: Firebase propio hasta validar modelo de negocio
REGISTRAR EN: DECISIONS.md
```

---

## KPIs A MONITOREAR

```text
CONVERSIÓN:
  CR  = Reservas / Visitas web (objetivo: > 3%)
  CPL = Inversión captación / Leads (objetivo: < €15)
  CAC = Inversión total / Nuevos pacientes (objetivo: < €50)

RETENCIÓN:
  CLV       = Ingresos promedio × frecuencia × tiempo retención
  Tasa vuelta = Pacientes que repiten / Total pacientes
  No-show rate = Cancelaciones tardías / Total reservas (objetivo: < 5%)

AUTOMATIZACIÓN:
  Tasa apertura emails   → objetivo: > 25%
  Tasa conversión emails → objetivo: > 8%
  Tiempo respuesta admin → objetivo: < 2 horas
```

---

## GATE CHECKLIST — AG-05

### GATE-4
```text
□ Formulario → Firestore funcional y probado
□ Notificación email a Walter funcional
□ Panel admin básico accesible
□ Flujo completo documentado (con evidencia)
□ Depósitos: decisión tomada y documentada en DECISIONS.md
□ Honestidad: funciones SIMULADAS claramente marcadas

→ PASS → informar DIRECTOR
```
