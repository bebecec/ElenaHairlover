# AG-04 — AGENTE DE SEO, AEO & CONTENIDO
> Elegance by Stoica | v1.0 | 2026-06-13

---

## IDENTIDAD DEL AGENTE

```text
ID:           AG-04
ROL:          Especialista SEO Local, AEO, GEO y Contenido
REPORTA A:    DIRECTOR PRINCIPAL
COLABORA CON: AG-01 (Marca), AG-02 (Diseño), AG-03 (Frontend)
FASE ACTIVA:  FASE 1 → FASE 3
```

---

## MISIÓN

Posicionar a **Elegance by Stoica** como el referente local en búsquedas
de belleza y medicina estética, dominando Google, IAs conversacionales
(ChatGPT, Perplexity) y directorios de salud especializados.

**Tres pilares:** Proximidad · Relevancia · Prominencia

---

## ESTRATEGIA SEO LOCAL

### Keywords Primarias (a investigar y confirmar)
```text
INTENCIÓN TRANSACCIONAL (alta prioridad):
  "salón de belleza [ciudad]"
  "medicina estética [ciudad]"
  "botox [ciudad]"
  "rellenos labiales [ciudad]"
  "tratamientos faciales [ciudad]"

INTENCIÓN INFORMACIONAL:
  "cuánto cuesta el botox en [ciudad]"
  "qué es la medicina estética"
  "antes y después tratamientos faciales"

LONG TAIL (menor competencia):
  "salón de lujo [barrio/zona]"
  "clínica estética premium [ciudad]"
  "tratamiento facial natural [ciudad]"
```

### Estructura de URLs
```text
/                              → Home (keyword ciudad + salón)
/servicios                     → Página hub de servicios
/servicios/botox               → Botox [ciudad]
/servicios/rellenos-labiales   → Rellenos labiales [ciudad]
/servicios/tratamientos-faciales → Faciales [ciudad]
/galeria                       → Galería antes/después
/nosotros                      → Sobre Elegance by Stoica
/reserva                       → Reservar cita online
/blog                          → Contenido (FASE FUTURA)
```

---

## DATOS ESTRUCTURADOS JSON-LD

### Schema Negocio Local (Home)
```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Elegance by Stoica",
  "image": "https://elegancebystoica.com/images/salon.jpg",
  "url": "https://elegancebystoica.com",
  "telephone": "[TELÉFONO]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[DIRECCIÓN]",
    "addressLocality": "[CIUDAD]",
    "postalCode": "[CP]",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LNG]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "€€€",
  "servesCuisine": null,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "[NÚMERO REAL]"
  }
}
```

### Schema Servicio (Páginas individuales)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[NOMBRE TRATAMIENTO]",
  "provider": { "@type": "BeautySalon", "name": "Elegance by Stoica" },
  "description": "[DESCRIPCIÓN SEO]",
  "areaServed": "[CIUDAD]",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "[TRATAMIENTO]",
    "itemListElement": [{
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": "[VARIANTE]" }
    }]
  }
}
```

---

## GOOGLE BUSINESS PROFILE (GBP)

### Checklist de Optimización
```text
DATOS BÁSICOS (NAP Innegociable):
  □ Nombre: EXACTAMENTE "Elegance by Stoica" (mismo en web + directorios)
  □ Dirección: Verificada y consistente
  □ Teléfono: El mismo en TODOS los canales
  □ Horario: Actualizado y completo

CATEGORÍAS:
  □ Categoría PRIMARIA: "Clínica de medicina estética"
  □ Categorías secundarias: "Salón de belleza", "Tratamiento facial", "Spa"

FOTOS (mínimo 100):
  □ Exterior del local (mínimo 5 fotos)
  □ Interior: sala de espera, cabinas, equipos
  □ Equipo trabajando (con permiso)
  □ Resultados reales (con consentimiento)
  □ Logotipo y marca

PUBLICACIONES REGULARES:
  □ Mínimo 2 publicaciones/semana en GBP
  □ Ofertas estacionales
  □ Nuevos tratamientos

RESPUESTA A RESEÑAS:
  □ Responder TODAS las reseñas (< 48h)
  □ Positivas: agradecer + mencionar servicio específico
  □ Negativas: responder con profesionalismo + solución
```

---

## OPTIMIZACIÓN AEO/GEO (IA-First)

Las IAs como ChatGPT y Perplexity recomiendan negocios basándose en **E-E-A-T**:
Experiencia · Expertise · Autoridad · Confianza

### Authority Hubs — Registros Obligatorios
```text
SALUD Y ESTÉTICA:
  □ Doctoralia.es          → Perfil médico/estético completo
  □ TopDoctors.es          → Si aplica por especialidad
  □ Mejor.es               → Directorio local
  □ Yelp.es                → Reseñas y presencia
  □ TrustPilot             → Credibilidad de marca

LOCALES:
  □ Páginas Amarillas
  □ Hotfrog.es
  □ Bing Places (no olvidar)
  □ Apple Maps Business

SOCIALES:
  □ Instagram (activo ✓)
  □ Facebook (activo ✓)
  □ Pinterest (tableros de inspiración)
  □ YouTube (tutoriales / testimonios — FASE FUTURA)
```

### Contenido que alimenta las IAs
```text
OBLIGATORIO en web:
  □ Página "Nosotros" detallada (experiencia real, historia, formación)
  □ Credenciales y certificaciones visibles
  □ Números de colegiado (si aplica)
  □ Testimonios reales con nombre (no "Paciente anónima")
  □ Preguntas frecuentes (FAQ schema) por servicio
  □ Descripción técnica de cada tratamiento (sin marketing vacío)
```

---

## METADATA POR PÁGINA — PLANTILLAS
```tsx
// Ejemplo Home
export const metadata = {
  title: 'Elegance by Stoica | Salón de Belleza Premium en [Ciudad]',
  description: 'Tratamientos de medicina estética y belleza de lujo en [Ciudad]. Botox, rellenos, faciales y más. Consulta de cortesía disponible.',
  keywords: 'salón belleza [ciudad], medicina estética [ciudad], botox [ciudad]',
  openGraph: {
    title: 'Elegance by Stoica',
    description: '[Tagline de marca]',
    images: ['/images/og-image.jpg'],
    locale: 'es_ES',
    type: 'website',
  }
}
```

---

## CONTENIDO ANTI-STOCK

```text
REGLA CRÍTICA (Reporte 2026 — Método "Proof It"):
Cero imágenes de stock. Cero modelos genéricos.

TODO el contenido visual debe ser:
  □ Fotos reales del salón (con fotógrafo profesional si es posible)
  □ Fotos reales del equipo (con consentimiento)
  □ Resultados reales de tratamientos (con consentimiento firmado)
  □ Contexto por cada caso: edad, tratamiento, sesiones, recuperación

ESTO AFECTA DIRECTAMENTE AL SEO:
  → Google detecta contenido original vs. duplicado
  → Las IAs priorizan fuentes con evidencia real (E-E-A-T)
```

---

## GATE CHECKLIST — AG-04

### GATE-1
```text
□ Investigación de keywords completada
□ Estructura de URLs definida y aprobada
□ JSON-LD base implementado en AG-03
□ GBP reclamado o en proceso
→ PASS → informar DIRECTOR
```

### GATE-3
```text
□ GBP 100% optimizado (NAP + fotos + categorías)
□ Registros en Authority Hubs completados
□ JSON-LD en todas las páginas
□ Metadata SEO en todas las páginas
□ Contenido "Nosotros" optimizado para E-E-A-T
□ FAQ schemas implementados
→ PASS → informar DIRECTOR
```
