import { Salon, ServiceCategory, ServiceItem, Stylist, Review, Appointment } from '../types';

export const INITIAL_SALONS: Salon[] = [
  {
    id: 'elena-hairlover',
    name: 'Elena Hairlover',
    tagline: 'Peluquería Exclusiva & Estilismo Capilar',
    description: 'Estilista independiente especializada en cortes, secados modelados, mechas balayage, colorimetría avanzada y tratamientos intensivos 12 Week Blow Dry. Atención 100% personalizada en cada cita.',
    address: 'Innovation House, Porters Road, Coolmine Business Park',
    city: 'Dublin 15, Blanchardstown',
    postalCode: 'D15 VW61',
    phone: '0894501215',
    whatsapp: '353894501215',
    email: 'contacto@elenahairlover.com',
    instagram: 'https://instagram.com/Elena_hairlover',
    facebook: 'https://facebook.com/ElenaHairLover',
    rating: 4.98,
    reviewsCount: 124,
    coverImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=200&q=80',
    currencySymbol: '€',
    cancellationPolicy: 'Agradecemos avisar con al menos 24 horas de antelación si necesitas reprogramar o cancelar tu cita previa.',
    openingHours: [
      { day: 'Lunes', isOpen: false, hours: 'Cerrado' },
      { day: 'Martes', isOpen: true, hours: '09:00 - 18:00' },
      { day: 'Miércoles', isOpen: true, hours: '09:00 - 18:00' },
      { day: 'Jueves', isOpen: true, hours: '09:00 - 20:00' },
      { day: 'Viernes', isOpen: true, hours: '09:00 - 20:00' },
      { day: 'Sábado', isOpen: true, hours: '09:00 - 17:00' },
      { day: 'Domingo', isOpen: false, hours: 'Cerrado' },
    ]
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-corte',
    name: 'Corte & Secado',
    iconName: 'Scissors',
    description: 'Lavado, corte personalizado y secado profesional según el largo de tu melena.'
  },
  {
    id: 'cat-peinado',
    name: 'Peinados & Secados',
    iconName: 'Crown',
    description: 'Secado liso, lisos con extensiones, ondas boho, tirabuzones y recogidos de fiesta.'
  },
  {
    id: 'cat-12week',
    name: '12 Week Blow Dry (Keratina)',
    iconName: 'Sparkles',
    description: 'Tratamiento alisador y antifrizz de larga duración (hasta 12 semanas de brillo y sedosidad).'
  },
  {
    id: 'cat-color',
    name: 'Coloración & Tintes',
    iconName: 'Palette',
    description: 'Tinte de raíces y baño completo de color de raíces a puntas con nutrición intensiva.'
  },
  {
    id: 'cat-mechas',
    name: 'Mechas & Balayage',
    iconName: 'Flame',
    description: 'Balayage a mano alzada, mechas en toda la cabeza, media cabeza y combinación con tinte parcial.'
  },
  {
    id: 'cat-tratamientos',
    name: 'Tratamientos Capilares',
    iconName: 'Heart',
    description: 'Olaplex Reconstructor, K18 Peptide Therapy y suplemento de corte añadido.'
  },
  {
    id: 'cat-consulta',
    name: 'Consultas',
    iconName: 'HelpCircle',
    description: 'Asesoramiento personalizado sin compromiso para evaluar el estado y necesidades de tu cabello.'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  // --- Corte & Secado ---
  {
    id: 'srv-wcb',
    name: 'Wash, Cut & Blow Dry',
    categoryId: 'cat-corte',
    categoryName: 'Corte & Secado',
    description: 'Lavado hidratante, corte personalizado y secado profesional moldeado.',
    basePrice: 55,
    baseDurationMinutes: 45,
    popular: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 55, durationMinutes: 45 },
      { length: 'Medio', price: 60, durationMinutes: 60 },
      { length: 'Largo', price: 65, durationMinutes: 60 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-dry-cut',
    name: 'Dry Cut',
    categoryId: 'cat-corte',
    categoryName: 'Corte & Secado',
    description: 'Corte sobre cabello seco para sanear puntas o dar forma sin lavado.',
    basePrice: 30,
    baseDurationMinutes: 30,
    popular: false,
  },

  // --- Peinados & Secados ---
  {
    id: 'srv-straight-bd',
    name: 'Straight Blow Dry',
    categoryId: 'cat-peinado',
    categoryName: 'Peinados & Secados',
    description: 'Secado liso pulido con cepillo y plancha profesional.',
    basePrice: 25,
    baseDurationMinutes: 30,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 25, durationMinutes: 30 },
      { length: 'Medio', price: 28, durationMinutes: 30 },
      { length: 'Largo', price: 30, durationMinutes: 30 }
    ]
  },
  {
    id: 'srv-curly-bd',
    name: 'Curly / Wavy / Boho Blow Dry',
    categoryId: 'cat-peinado',
    categoryName: 'Peinados & Secados',
    description: 'Secado con ondas marcadas, surferas, efecto boho o tirabuzones definidos.',
    basePrice: 35,
    baseDurationMinutes: 45,
    popular: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 35, durationMinutes: 45 },
      { length: 'Medio', price: 38, durationMinutes: 45 },
      { length: 'Largo', price: 40, durationMinutes: 45 }
    ]
  },
  {
    id: 'srv-ext-straight',
    name: 'Extensions Blow Dry - Straight',
    categoryId: 'cat-peinado',
    categoryName: 'Peinados & Secados',
    description: 'Secado liso especial para cabellos con extensiones manteniendo el cuidado de la fijación.',
    basePrice: 40,
    baseDurationMinutes: 60,
  },
  {
    id: 'srv-ext-curly',
    name: 'Extensions Blow Dry - Curly / Wavy / GHD',
    categoryId: 'cat-peinado',
    categoryName: 'Peinados & Secados',
    description: 'Secado con ondas y acabado GHD profesional en melenas con extensiones.',
    basePrice: 45,
    baseDurationMinutes: 60,
  },
  {
    id: 'srv-upstyle',
    name: 'Upstyle',
    categoryId: 'cat-peinado',
    categoryName: 'Peinados & Secados',
    description: 'Peinado recogido elegante o semirrecogido para eventos especiales o bodas.',
    basePrice: 60,
    baseDurationMinutes: 60,
    popular: true,
  },

  // --- 12 Week Blow Dry ---
  {
    id: 'srv-12week',
    name: '12 Week Blow Dry',
    categoryId: 'cat-12week',
    categoryName: '12 Week Blow Dry (Keratina)',
    description: 'Tratamiento alisador intensivo de keratina que elimina el 100% del encrespamiento durante 12 semanas.',
    basePrice: 120,
    baseDurationMinutes: 120,
    popular: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 120, durationMinutes: 120 },
      { length: 'Medio', price: 130, durationMinutes: 150 },
      { length: 'Largo', price: 140, durationMinutes: 180 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
  },

  // --- Coloración & Tintes ---
  {
    id: 'srv-root-tint',
    name: 'Root Tint',
    categoryId: 'cat-color',
    categoryName: 'Coloración & Tintes',
    description: 'Aplicación de tinte nutritivo en la zona de raíz para cubrir canas o igualar el tono.',
    basePrice: 70,
    baseDurationMinutes: 90,
    patchTestRequired: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 70, durationMinutes: 90 },
      { length: 'Medio', price: 75, durationMinutes: 105 },
      { length: 'Largo', price: 80, durationMinutes: 120 }
    ]
  },
  {
    id: 'srv-full-tint',
    name: 'Full Tint (Roots to Ends)',
    categoryId: 'cat-color',
    categoryName: 'Coloración & Tintes',
    description: 'Coloración integral desde las raíces hasta las puntas para un cambio total de tono o máximo brillo.',
    basePrice: 80,
    baseDurationMinutes: 120,
    patchTestRequired: true,
    popular: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 80, durationMinutes: 120 },
      { length: 'Medio', price: 85, durationMinutes: 120 },
      { length: 'Largo', price: 95, durationMinutes: 150 }
    ]
  },

  // --- Mechas & Balayage ---
  {
    id: 'srv-colour-partial-hl',
    name: 'Colour and Partial Highlights',
    categoryId: 'cat-mechas',
    categoryName: 'Mechas & Balayage',
    description: 'Tinte de base combinado con iluminaciones parciales para un contraste luminoso y suave.',
    basePrice: 120,
    baseDurationMinutes: 120,
    patchTestRequired: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 120, durationMinutes: 120 },
      { length: 'Medio', price: 130, durationMinutes: 150 },
      { length: 'Largo', price: 135, durationMinutes: 180 }
    ]
  },
  {
    id: 'srv-full-head-hl',
    name: 'Full Head Highlights',
    categoryId: 'cat-mechas',
    categoryName: 'Mechas & Balayage',
    description: 'Mechas en toda la cabeza para máxima aclaración y dimensión luminosa de raíces a puntas.',
    basePrice: 145,
    baseDurationMinutes: 180,
    patchTestRequired: true,
    popular: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 145, durationMinutes: 180 },
      { length: 'Medio', price: 155, durationMinutes: 210 },
      { length: 'Largo', price: 165, durationMinutes: 210 }
    ]
  },
  {
    id: 'srv-half-head-hl',
    name: 'Half Head Highlights',
    categoryId: 'cat-mechas',
    categoryName: 'Mechas & Balayage',
    description: 'Mechas en la zona superior y laterales para mantener el brillo y refrescar el color.',
    basePrice: 125,
    baseDurationMinutes: 150,
    patchTestRequired: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 125, durationMinutes: 150 },
      { length: 'Medio', price: 130, durationMinutes: 165 },
      { length: 'Largo', price: 135, durationMinutes: 180 }
    ]
  },
  {
    id: 'srv-balayage',
    name: 'Balayage',
    categoryId: 'cat-mechas',
    categoryName: 'Mechas & Balayage',
    description: 'Técnica de decoloración a mano alzada para un degradado natural de raíces oscuras a puntas luminosas.',
    basePrice: 145,
    baseDurationMinutes: 180,
    patchTestRequired: true,
    popular: true,
    hasLengthVariations: true,
    lengthPricing: [
      { length: 'Corto', price: 145, durationMinutes: 180 },
      { length: 'Medio', price: 155, durationMinutes: 180 },
      { length: 'Largo', price: 165, durationMinutes: 210 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },

  // --- Tratamientos Capilares ---
  {
    id: 'srv-olaplex',
    name: 'Olaplex Treatment',
    categoryId: 'cat-tratamientos',
    categoryName: 'Tratamientos Capilares',
    description: 'Tratamiento de reconstrucción de enlaces disulfuro para reparar el cabello dañado.',
    basePrice: 25,
    baseDurationMinutes: 15,
  },
  {
    id: 'srv-k18',
    name: 'K18 Treatment',
    categoryId: 'cat-tratamientos',
    categoryName: 'Tratamientos Capilares',
    description: 'Tratamiento molecular de péptidos patentados que revierte el daño térmico y químico en 4 minutos.',
    basePrice: 20,
    baseDurationMinutes: 15,
  },
  {
    id: 'srv-add-haircut',
    name: 'Add a Hair Cut to Any Colour Service',
    categoryId: 'cat-tratamientos',
    categoryName: 'Tratamientos Capilares',
    description: 'Suplemento especial para añadir corte de pelo completo a cualquier servicio de coloración o mechas.',
    basePrice: 20,
    baseDurationMinutes: 30,
    popular: true,
  },

  // --- Consultas ---
  {
    id: 'srv-consultation',
    name: 'Consultation',
    categoryId: 'cat-consulta',
    categoryName: 'Consultas',
    description: 'Consulta y prueba de alérgenos / diagnóstico personalizado sin costo adicional.',
    basePrice: 0,
    baseDurationMinutes: 10,
  }
];

export const INITIAL_STYLISTS: Stylist[] = [
  {
    id: 'elena-hairstylist',
    name: 'Elena',
    role: 'Estilista Principal & Propietaria (Elena Hairlover)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Hola, soy Elena. Como única profesional de mi salón, garantizo una atención 100% personalizada, cuidando cada detalle de tu cabello con las mejores técnicas de corte, peinado, balayage y tratamientos de keratina.',
    rating: 4.98,
    reviewsCount: 124,
    specialties: ['Wash & Cut', '12 Week Blow Dry', 'Balayage & Highlights', 'Root & Full Tint', 'Olaplex & K18'],
    servicesProvided: INITIAL_SERVICES.map((s) => s.id),
    workingHours: {
      days: ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      timeRange: '09:00 - 18:00'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarah M.',
    rating: 5,
    date: 'Hace 3 días',
    comment: 'Elena es sencillamente increíble. Me hizo el 12 Week Blow Dry y mi pelo pasó de encrespado a ultra sedoso y brillante.',
    serviceName: '12 Week Blow Dry'
  },
  {
    id: 'rev-2',
    author: 'Clara R.',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'El mejor balayage que me han hecho nunca. Elena dedica el tiempo necesario a cada mecha y el resultado luce super natural.',
    serviceName: 'Balayage'
  },
  {
    id: 'rev-3',
    author: 'Laura P.',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'Trato exquisito y puntualidad. Reservar cita online en la web es super fácil y cómodo.',
    serviceName: 'Wash, Cut & Blow Dry'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    code: 'CIT-9842',
    salonId: 'elena-hairlover',
    salonName: 'Elena Hairlover',
    clientName: 'María Carmen López',
    clientPhone: '089 123 4567',
    clientEmail: 'maria.lopez@example.com',
    notes: 'Quiero mantener el largo pero saneando bien las puntas.',
    stylistId: 'elena-hairstylist',
    stylistName: 'Elena',
    stylistRole: 'Estilista Principal & Propietaria',
    services: [
      {
        serviceId: 'srv-wcb',
        serviceName: 'Wash, Cut & Blow Dry',
        categoryName: 'Corte & Secado',
        price: 60,
        durationMinutes: 60,
        selectedHairLength: 'Medio'
      }
    ],
    totalPrice: 60,
    totalDurationMinutes: 60,
    date: '2026-08-04',
    timeSlot: '10:00',
    status: 'confirmada',
    createdAt: new Date().toISOString()
  }
];
