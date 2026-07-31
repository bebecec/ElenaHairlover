import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ServiceCatalog } from './components/ServiceCatalog';
import { BookingModal } from './components/BookingModal';
import { TeamSection } from './components/TeamSection';
import { LocationAndHours } from './components/LocationAndHours';
import { MyBookingsSection } from './components/MyBookingsSection';
import { AIAdvisor } from './components/AIAdvisor';
import { AdminPanel } from './components/AdminPanel';

import {
  INITIAL_SALONS,
  SERVICE_CATEGORIES,
  INITIAL_SERVICES,
  INITIAL_STYLISTS,
  INITIAL_APPOINTMENTS,
} from './data/initialData';
import { Salon, ServiceItem, Stylist, Appointment, HairLength } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'services' | 'team' | 'location' | 'my-bookings' | 'admin' | 'ai-advisor'>('services');
  
  // Salons state
  const [salons, setSalons] = useState<Salon[]>(() => {
    const saved = localStorage.getItem('app_salons_elena_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id === 'elena-hairlover') {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_SALONS;
  });

  const [currentSalon, setCurrentSalon] = useState<Salon>(salons[0]);

  // Services state
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('app_services_elena_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_SERVICES;
  });

  // Stylists state
  const [stylists] = useState<Stylist[]>(INITIAL_STYLISTS);

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('app_appointments_elena_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  // Cart & Booking state
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedHairLengths, setSelectedHairLengths] = useState<Record<string, HairLength>>({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('app_salons_elena_v2', JSON.stringify(salons));
  }, [salons]);

  useEffect(() => {
    localStorage.setItem('app_services_elena_v2', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('app_appointments_elena_v2', JSON.stringify(appointments));
  }, [appointments]);

  // Cart handlers
  const handleToggleService = (service: ServiceItem, hairLength?: HairLength) => {
    const exists = selectedServices.some((s) => s.id === service.id);
    if (exists) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
      if (hairLength) {
        setSelectedHairLengths((prev) => ({ ...prev, [service.id]: hairLength }));
      }
    }
  };

  const handleHairLengthChange = (serviceId: string, length: HairLength) => {
    setSelectedHairLengths((prev) => ({ ...prev, [serviceId]: length }));
  };

  const handleQuickBook = (service: ServiceItem, hairLength?: HairLength) => {
    const exists = selectedServices.some((s) => s.id === service.id);
    if (!exists) {
      setSelectedServices([...selectedServices, service]);
      if (hairLength) {
        setSelectedHairLengths((prev) => ({ ...prev, [service.id]: hairLength }));
      }
    }
    setIsBookingModalOpen(true);
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter((s) => s.id !== serviceId));
  };

  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments([newApt, ...appointments]);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(
      appointments.map((a) => (a.id === appointmentId ? { ...a, status: 'cancelada' as const } : a))
    );
  };

  const handleUpdateAppointmentStatus = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(
      appointments.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
    );
  };

  const handleUpdateSalon = (updatedSalon: Salon) => {
    const updated = salons.map((s) => (s.id === updatedSalon.id ? updatedSalon : s));
    setSalons(updated);
    setCurrentSalon(updatedSalon);
  };

  const handleAddService = (newSrv: ServiceItem) => {
    setServices([newSrv, ...services]);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((s) => s.id !== serviceId));
    setSelectedServices(selectedServices.filter((s) => s.id !== serviceId));
  };

  return (
    <div className="min-h-screen bg-[#111111] font-sans text-white flex flex-col justify-between selection:bg-[#C9A84C] selection:text-white">
      <div>
        {/* Sticky App Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentSalon={currentSalon}
          allSalons={salons}
          onSelectSalon={setCurrentSalon}
          cartCount={selectedServices.length}
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
        />

        {/* Hero Header Banner */}
        {activeTab === 'services' && (
          <HeroBanner
            salon={currentSalon}
            onBookNow={() => {
              if (selectedServices.length === 0) {
                // If cart is empty, add first popular service or open catalog
                if (services.length > 0) {
                  setSelectedServices([services[0]]);
                }
              }
              setIsBookingModalOpen(true);
            }}
            onExploreServices={() => {
              const el = document.getElementById('catalog-view');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* Main Content Area */}
        <main className="pb-12" id="catalog-view">
          {activeTab === 'services' && (
            <ServiceCatalog
              categories={SERVICE_CATEGORIES}
              services={services}
              selectedServices={selectedServices}
              selectedHairLengths={selectedHairLengths}
              onToggleService={handleToggleService}
              onHairLengthChange={handleHairLengthChange}
              onQuickBook={handleQuickBook}
            />
          )}

          {activeTab === 'team' && (
            <TeamSection
              stylists={stylists}
              onSelectStylistForBooking={() => {
                if (selectedServices.length === 0 && services.length > 0) {
                  setSelectedServices([services[0]]);
                }
                setIsBookingModalOpen(true);
              }}
            />
          )}

          {activeTab === 'location' && (
            <LocationAndHours salon={currentSalon} />
          )}

          {activeTab === 'my-bookings' && (
            <MyBookingsSection
              appointments={appointments}
              onCancelAppointment={handleCancelAppointment}
              onOpenBookingCatalog={() => setActiveTab('services')}
            />
          )}

          {activeTab === 'ai-advisor' && (
            <AIAdvisor
              services={services}
              selectedServiceIds={selectedServices.map((s) => s.id)}
              onAddRecommendedService={(srv) => {
                handleToggleService(srv);
              }}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanel
              salon={currentSalon}
              onUpdateSalon={handleUpdateSalon}
              services={services}
              onAddService={handleAddService}
              onDeleteService={handleDeleteService}
              appointments={appointments}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              stylists={stylists}
            />
          )}
        </main>
      </div>

      {/* Floating Bottom Booking Bar if Cart is not empty */}
      {selectedServices.length > 0 && !isBookingModalOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 z-40 bg-[#0a0a0a] text-white rounded-2xl p-4 shadow-2xl border border-[#292929] flex items-center justify-between space-x-4 max-w-lg mx-auto sm:mx-0 animate-in slide-in-from-bottom-5">
          <div>
            <div className="text-xs text-[#DFCA8D] font-bold">
              {selectedServices.length} {selectedServices.length === 1 ? 'Servicio Seleccionado' : 'Servicios Seleccionados'}
            </div>
            <div className="text-xs text-gray-300 truncate max-w-[200px] sm:max-w-xs">
              {selectedServices.map((s) => s.name).join(', ')}
            </div>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-[#C9A84C] hover:bg-[#8F722A] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm whitespace-nowrap shadow-md transition-all flex items-center space-x-1.5"
          >
            <span>Continuar Reserva</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* Step-by-Step Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        salon={currentSalon}
        stylists={stylists}
        selectedServices={selectedServices}
        selectedHairLengths={selectedHairLengths}
        onRemoveService={handleRemoveService}
        onAddAppointment={handleAddAppointment}
      />

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-gray-500 text-xs py-8 border-t border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">{currentSalon.name}</span>
            <span>— Sistema Inteligente de Citas Previa Online</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button onClick={() => setActiveTab('services')} className="hover:text-white">Servicios</button>
            <button onClick={() => setActiveTab('team')} className="hover:text-white">Equipo</button>
            <button onClick={() => setActiveTab('location')} className="hover:text-white">Ubicación</button>
            <button onClick={() => setActiveTab('admin')} className="text-[#C9A84C] hover:underline">Panel Administración</button>
          </div>

          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} Citas Belleza. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
