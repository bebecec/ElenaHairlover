# AG-03 — AGENTE DE DESARROLLO FRONTEND
> Elegance by Stoica | v1.0 | 2026-06-13

---

## IDENTIDAD DEL AGENTE

```text
ID:           AG-03
ROL:          Desarrollador Frontend & Arquitecto Firebase
REPORTA A:    DIRECTOR PRINCIPAL
COLABORA CON: AG-02 (Diseño), AG-05 (Automatización), AG-06 (QA)
HERRAMIENTAS: Antigravity IDE (local) + Firebase Studio (Google)
FASE ACTIVA:  FASE 1 → FASE 5
```

---

## STACK TÉCNICO

```text
DESARROLLO LOCAL:
  Editor:       Antigravity IDE
  Framework:    Next.js 14 (App Router)
  Estilos:      Tailwind CSS + CSS Variables custom
  Componentes:  React 18
  Animaciones:  Framer Motion (transiciones "Clune")
  Formularios:  React Hook Form + Zod (validación real-time)

DESPLIEGUE (FIREBASE STUDIO / ANTIGRAVITY):
  Hosting:      Firebase Hosting
  Base de datos: Firestore (reservas, contactos, CRM básico)
  Functions:    Cloud Functions (automatizaciones AG-05)
  Storage:      Firebase Storage (galería imágenes)
  Auth:         Firebase Auth (panel admin Walter)

HERRAMIENTAS DE DESARROLLO:
  Control de versiones: Git (local)
  Variables de entorno: .env.local (nunca en repositorio)
  Linting:      ESLint + Prettier
```

---

## ESTRUCTURA DE PROYECTO

```text
SALON/
├── .agents/                    ← Protocolo de agentes
├── .env.local                  ← Variables privadas (Firebase config)
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.js
├── firebase.json               ← Config Firebase Hosting
├── firestore.rules             ← Reglas de seguridad Firestore
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── servicios/
│   │   ├── galeria/            ← Antes/Después
│   │   └── equipo/
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx           ← Root layout (fonts, metadata)
    │   ├── page.tsx             ← Home
    │   ├── servicios/
    │   │   ├── page.tsx
    │   │   └── [slug]/
    │   │       └── page.tsx
    │   ├── galeria/
    │   │   └── page.tsx
    │   ├── nosotros/
    │   │   └── page.tsx
    │   ├── reserva/
    │   │   └── page.tsx
    │   └── contacto/
    │       └── page.tsx
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── FormField.tsx
    │   │   └── Modal.tsx
    │   ├── layout/
    │   │   ├── Header.tsx       ← Menú fijo, mobile-first
    │   │   └── Footer.tsx
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── Servicios.tsx
    │   │   ├── ViajeDelPaciente.tsx
    │   │   ├── Galeria.tsx
    │   │   ├── Testimonios.tsx
    │   │   ├── Credenciales.tsx
    │   │   └── Reserva.tsx      ← Formulario 3 campos
    │   └── seo/
    │       ├── JsonLd.tsx       ← Datos estructurados
    │       └── Meta.tsx
    ├── lib/
    │   ├── firebase.ts          ← Inicialización Firebase
    │   ├── firestore.ts         ← Helpers Firestore
    │   └── validations.ts       ← Schemas Zod
    ├── hooks/
    │   ├── useReserva.ts
    │   └── useGaleria.ts
    ├── data/
    │   ├── servicios.ts         ← Catálogo de servicios (estático)
    │   └── equipo.ts
    └── styles/
        ├── globals.css          ← CSS variables de marca
        └── animations.css       ← Transiciones "Clune"
```

---

## CSS VARIABLES DE MARCA

```css
/* src/styles/globals.css */
:root {
  --color-oliva:     #C9CBA7;
  --color-arena:     #E9CDB4;
  --color-blanco:    #FAFAF8;
  --color-negro:     #1A1A18;
  --color-acento:    #B8A89A;
  --color-frosted:   rgba(250, 250, 248, 0.85);

  --font-display:    'Cormorant Garamond', serif;
  --font-body:       'DM Sans', sans-serif;

  --transition-clune: all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-fast:  all 200ms ease;

  --space-section:   80px;
  --space-component: 40px;

  --shadow-button:   0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3);
  --shadow-card:     0 4px 24px rgba(26,26,24,0.06);
}
```

---

## CONFIGURACIÓN FIREBASE

### firebase.json
```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }],
    "headers": [{
      "source": "**/*.@(js|css)",
      "headers": [{ "key": "Cache-Control", "value": "max-age=31536000" }]
    }]
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

### Colecciones Firestore
```text
reservas/         → {nombre, telefono, servicio, fecha, estado, timestamp}
contactos/        → {nombre, email, mensaje, timestamp}
pacientes/        → {id, historial, recomendaciones, ultimaVisita}
configuracion/    → {horarios, servicios, precios}
```

### Reglas de Seguridad (firestore.rules)
```text
Lectura pública:    configuracion/, servicios/
Escritura pública:  reservas/, contactos/ (solo create, no read/update)
Admin completo:     uid de Walter (autenticado)
```

---

## COMPONENTE HERO — REFERENCIA

```tsx
// src/components/sections/Hero.tsx
// Implementación Resonant Stark: imagen full-width + tipografía delgada

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Imagen full-width */}
      <div className="absolute inset-0">
        <Image src="/images/hero/principal.jpg"
               alt="Elegance by Stoica" fill
               className="object-cover" priority />
        {/* Overlay Frosted Touch */}
        <div className="absolute inset-0 bg-[var(--color-frosted)]" />
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20">
        <h1 className="font-display font-light text-5xl md:text-7xl
                       text-[var(--color-negro)] leading-tight">
          {/* Tagline desde AG-01 */}
        </h1>
        <p className="font-body text-lg mt-6 max-w-md text-[var(--color-acento)]">
          {/* Propuesta de valor */}
        </p>
        <button className="mt-10 self-start px-10 py-4
                          bg-[var(--color-oliva)] text-[var(--color-negro)]
                          shadow-[var(--shadow-button)]
                          tracking-widest text-sm uppercase
                          transition-[var(--transition-fast)]
                          hover:shadow-lg hover:scale-[1.02]">
          Obtener Mi Consulta de Cortesía
        </button>
      </div>
    </section>
  )
}
```

---

## REGLA DE PERFORMANCE

```text
OBJETIVO: < 3 segundos de carga (regla crítica del Reporte 2026)

ESTRATEGIAS:
  □ Imágenes en formato WebP (next/image automático)
  □ Lazy loading en galería
  □ Fuentes: preload + font-display: swap
  □ CSS crítico inline (above the fold)
  □ Firebase Hosting CDN global
  □ Code splitting automático (Next.js)

MEDICIÓN:
  □ Lighthouse score > 90 (Performance, SEO, Accessibility)
  □ Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
```

---

## COMANDOS DE DESARROLLO

```bash
# Inicio del proyecto (directamente en la raíz del workspace)
npx create-next-app@14 ./ --typescript --tailwind --app
# Instalar dependencias
npm install framer-motion react-hook-form zod firebase

# Variables de entorno (.env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Desarrollo local
npm run dev

# Build + Deploy Firebase
npm run build
firebase deploy --only hosting
```

---

## GATE CHECKLIST — AG-03

### GATE-1 (Arquitectura)
```text
□ Proyecto Next.js inicializado y funcional en local
□ Firebase Studio conectado (proyecto creado en consola)
□ Estructura de carpetas implementada
□ CSS variables de marca definidas
□ Fuentes importadas y funcionando
→ PASS → informar DIRECTOR
```

### GATE-2 (MVP)
```text
□ Home completo: Hero + Servicios + Viaje + CTA
□ Formulario 3 campos con validación real-time
□ Formulario guarda en Firestore
□ Mobile-First verificado (360px → 1440px)
□ Performance < 3s (Lighthouse)
→ PASS → informar DIRECTOR
```

### GATE-5 (Despliegue)
```text
□ firebase deploy ejecutado sin errores
□ URL de producción activa
□ SSL activo (Firebase automático)
□ Dominio custom configurado (si aplica)
□ Analytics conectado (Firebase Analytics)
→ PASS → PROYECTO LIVE → informar DIRECTOR
```
