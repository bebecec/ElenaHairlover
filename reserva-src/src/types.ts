export type ServiceCategoryName = 
  | 'Peluquería & Corte'
  | 'Color & Mechas'
  | 'Tratamientos Capilares'
  | 'Facial'
  | 'Corporal'
  | 'Depilación Láser'
  | 'Depilación Cera'
  | 'Cejas y Pestañas'
  | 'Maquillaje & Peinados'
  | 'Manicuras & Pedicuras';

export type HairLength = 'General' | 'Corto' | 'Medio' | 'Largo';

export interface HairLengthPricing {
  length: HairLength;
  price: number;
  durationMinutes: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: ServiceCategoryName;
  description: string;
  basePrice: number;
  baseDurationMinutes: number; // e.g. 45 -> "45 min"
  patchTestRequired?: boolean;
  hasLengthVariations?: boolean;
  lengthPricing?: HairLengthPricing[];
  imageUrl?: string;
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: ServiceCategoryName;
  iconName: string;
  description: string;
  serviceCount?: number;
}

export interface Stylist {
  id: string;
  name: string;
  role: string; // e.g. "Estilista y especialista en coloración"
  avatar: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  workingHours: {
    days: string[]; // e.g. ["Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    timeRange: string; // "09:00 - 18:00"
  };
}

export type AppointmentStatus = 'confirmada' | 'en_proceso' | 'completada' | 'cancelada';

export interface BookedService {
  serviceId: string;
  serviceName: string;
  categoryName: ServiceCategoryName;
  price: number;
  durationMinutes: number;
  selectedHairLength?: HairLength;
}

export interface Appointment {
  id: string;
  code: string; // e.g. "CIT-8492"
  salonId: string;
  salonName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  stylistId: string;
  stylistName: string;
  stylistRole?: string;
  services: BookedService[];
  totalPrice: number;
  totalDurationMinutes: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm (e.g. "10:30")
  status: AppointmentStatus;
  createdAt: string; // ISO string
}

export interface WorkingDay {
  day: string; // 'Lunes', 'Martes', etc.
  isOpen: boolean;
  hours: string; // "09:00 - 19:00" or "Cerrado"
}

export interface Salon {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  logoUrl: string;
  openingHours: WorkingDay[];
  cancellationPolicy: string;
  currencySymbol: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  serviceName: string;
}
