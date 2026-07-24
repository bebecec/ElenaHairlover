# 🎨 Elena Hairlover — Brand Color DNA & Style Guide

> Paleta de colores e identidad visual extraída directamente del logo oficial.

---

## 🔶 1. GOLD CORE — Colores Primarios de Marca

Extraídos de los tonos metálicos dorados del emblema "EH":

| Swatch | Nombre | HEX | RGB | Uso |
|--------|--------|-----|-----|-----|
| 🟡 | **Rich Gold** (Principal) | `#C9A84C` | `201, 168, 76` | Botones principales, iconos, títulos destacados |
| 🟠 | **Warm Amber** | `#D89040` | `216, 144, 64` | Hover states, acentos cálidos, bordes |
| 🟤 | **Deep Bronze** | `#C88038` | `200, 128, 56` | Sombras del oro, profundidad en degradados |
| ✨ | **Bright Gold** | `#D4AF37` | `212, 175, 55` | Destellos, estrellas, badges premium |

### CSS Custom Properties:
```css
--color-gold-warm: #C9A84C;
--color-gold-bright: #D4AF37;
--color-gold-dark: #B8962E;
--color-gold-warm-rgb: 201 168 76;
```

---

## 🌸 2. LIGHT GOLD — Acentos Luminosos

Tonos claros dorados que forman los reflejos del logo metálico:

| Swatch | Nombre | HEX | RGB | Uso |
|--------|--------|-----|-----|-----|
| 🟡 | **Champagne** | `#F8D890` | `248, 216, 144` | Fondos sutiles, highlights |
| 🟡 | **Cream Gold** | `#F8E0A0` | `248, 224, 160` | Hover suave, separadores |
| 🟡 | **Soft Ivory** | `#F5EDD0` | `245, 237, 208` | Fondos light mode, texto suave |
| 🟡 | **Pearl White** | `#F8F8D0` | `248, 248, 208` | Tono más claro, fondos crema |

### CSS Custom Properties:
```css
--color-gold-light: #F5EDD0;
--color-light-bg: #FAF8F5;
--color-light-warm: #F4EFE5;
--color-light-card: #FFFFFF;
```

---

## ⬛ 3. DARK BASE — Fondos Oscuros Premium

Los tonos negros-marrones del logo que anclan la marca:

| Swatch | Nombre | HEX | RGB | Uso |
|--------|--------|-----|-----|-----|
| ⬛ | **Jet Black** | `#111111` | `17, 17, 17` | Fondo principal (dark mode) |
| ⬛ | **Charcoal** | `#1A1A1A` | `26, 26, 26` | Fondo secundario |
| ⬛ | **Dark Card** | `#1F1F1F` | `31, 31, 31` | Tarjetas y cards |
| ⬛ | **Warm Shadow** | `#281810` | `40, 24, 16` | Sombras con calidez marrón |

### CSS Custom Properties:
```css
--color-dark-main: #111111;
--color-dark-bg: #171717;
--color-dark-card: #1F1F1F;
```

---

## 📐 4. GRADIENTES DE MARCA

Transiciones doradas que replican el efecto metálico del logo:

### Gold Gradient Primary (botones, bordes)
```css
--gold-grad-primary: linear-gradient(135deg, #F3D798 0%, #C9A84C 50%, #9A782B 100%);
```

### Gold Gradient Hover (interacciones)
```css
--gold-grad-hover: linear-gradient(135deg, #F7E0AA 0%, #DBB95D 50%, #AD8A38 100%);
```

### Gold Gradient Text (títulos)
```css
--gold-grad-text: linear-gradient(135deg, #F7E0AA 0%, #C9A84C 50%, #E2BE6E 100%);
```

### Gold Gradient Border (bordes decorativos)
```css
--gold-grad-border: linear-gradient(135deg, #F3D798, #C9A84C, #9A782B);
```

### Aplicación CSS para texto con gradiente:
```css
.gold-text {
  background: var(--gold-grad-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 🔤 5. TIPOGRAFÍA

| Rol | Familia | Peso | Tracking |
|-----|---------|------|----------|
| **Títulos** | Cormorant Garamond (serif) | 600–700 | 0.04em |
| **Subtítulos** | Cormorant Garamond | 400–500 | 0.06em |
| **Cuerpo** | Montserrat (sans-serif) | 300–400 | 0.02em |
| **Botones / Labels** | Montserrat | 600–700 | 0.12–0.15em |

```css
--font-heading: 'Cormorant Garamond', Georgia, serif;
--font-body: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
```

---

## 🎯 6. TEXTOS & LEGIBILIDAD

| Contexto | Color | HEX |
|----------|-------|-----|
| Texto principal (dark mode) | Blanco puro | `#FFFFFF` |
| Texto principal (light mode) | Casi negro | `#222222` |
| Texto secundario | Gris medio | `#666666` |
| Texto dorado / enlaces | Gold warm | `#C5A880` |
| Bordes sutiles (dark) | Gold 15% | `rgba(197,168,128, 0.15)` |
| Bordes sutiles (light) | Gold 25% | `rgba(197,168,128, 0.25)` |

---

## 🧬 7. ADN DE ESTILO — Principios de Diseño

### Filosofía visual
- **Lujo discreto**: Oro sobre negro, nunca sobrecargado
- **Elegancia minimalista**: Espacios generosos, tipografía serif refinada
- **Calidez metálica**: Los degradados replican el efecto del logo grabado en oro

### Reglas de aplicación
1. **Ratio oro/oscuro**: ~20% dorado, ~80% fondo oscuro
2. **Botones primarios**: Fondo `--color-gold-warm`, texto `--color-dark-main`
3. **Botones secundarios**: Borde dorado, fondo transparente
4. **Hover**: Transición suave 200ms, invertir colores o usar gradiente
5. **Sombras**: Siempre con tinte cálido `rgba(201,168,76, 0.1)` — nunca negro puro
6. **Bordes**: 1px solid con opacidad del oro, nunca gris

### Animaciones
- **Duración estándar**: 200–400ms
- **Easing premium**: `cubic-bezier(0.25, 1, 0.22, 1)`
- **Micro-interacciones**: Fade-in suaves, scale(1.02) en hover

---

## 📊 8. RESUMEN RÁPIDO — Variables CSS Completas

```css
:root {
  /* ═══════ GOLD PALETTE ═══════ */
  --color-gold-warm:       #C9A84C;
  --color-gold-bright:     #D4AF37;
  --color-gold-dark:       #B8962E;
  --color-gold-light:      #F5EDD0;
  --color-gold-warm-rgb:   201 168 76;

  /* ═══════ DARK PALETTE ═══════ */
  --color-dark-main:       #111111;
  --color-dark-bg:         #171717;
  --color-dark-card:       #1F1F1F;

  /* ═══════ TEXT ═══════ */
  --color-text-light:      #FFFFFF;
  --color-text-dark:       #222222;
  --color-text-muted:      #666666;
  --color-text-gold:       #C5A880;

  /* ═══════ LIGHT MODE ═══════ */
  --color-light-bg:        #FAF8F5;
  --color-light-warm:      #F4EFE5;
  --color-light-card:      #FFFFFF;

  /* ═══════ GRADIENTS ═══════ */
  --gold-grad-primary:     linear-gradient(135deg, #F3D798 0%, #C9A84C 50%, #9A782B 100%);
  --gold-grad-hover:       linear-gradient(135deg, #F7E0AA 0%, #DBB95D 50%, #AD8A38 100%);
  --gold-grad-text:        linear-gradient(135deg, #F7E0AA 0%, #C9A84C 50%, #E2BE6E 100%);
  --gold-grad-border:      linear-gradient(135deg, #F3D798, #C9A84C, #9A782B);

  /* ═══════ BORDERS ═══════ */
  --color-border-light:    rgba(197, 168, 128, 0.25);
  --color-border-dark:     rgba(197, 168, 128, 0.15);

  /* ═══════ BUTTON GHOST ═══════ */
  --color-btn-ghost:       rgba(201, 168, 76, 0.15);
  --color-btn-ghost-hover: rgba(201, 168, 76, 0.28);
  --color-btn-ghost-border:#C9A84C;

  /* ═══════ TYPOGRAPHY ═══════ */
  --font-heading:          'Cormorant Garamond', Georgia, serif;
  --font-body:             'Montserrat', 'Helvetica Neue', Arial, sans-serif;
}
```

---

> **Elena Hairlover** — *Because your hair tells your story ♡*
