import React, { useState } from 'react';
import { Search, Calendar, Clock, Scissors, XCircle, CheckCircle2, MessageCircle, AlertCircle, Phone, RefreshCw } from 'lucide-react';
import { Appointment } from '../types';

interface MyBookingsSectionProps {
  appointments: Appointment[];
  onCancelAppointment: (appointmentId: string) => void;
  onOpenBookingCatalog: () => void;
}

export const MyBookingsSection: React.FC<MyBookingsSectionProps> = ({
  appointments,
  onCancelAppointment,
  onOpenBookingCatalog,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    if (!searchFilter.trim()) return true;
    const term = searchFilter.toLowerCase();
    return (
      apt.code.toLowerCase().includes(term) ||
      apt.clientName.toLowerCase().includes(term) ||
      apt.clientPhone.toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmada':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            Confirmada
          </span>
        );
      case 'en_proceso':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-blue-600 animate-spin" />
            En Proceso
          </span>
        );
      case 'completada':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#1f1f1f] text-gray-200 border border-[#292929]">
            Completada
          </span>
        );
      case 'cancelada':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#C9A84C]/15 text-[#C9A84C] border border-[#333]">
            <XCircle className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            Cancelada
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-[#171717] rounded-3xl p-6 shadow-sm border border-[#292929] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#C9A84C]" />
            <span>Gestión de Mis Citas Reservadas</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Consulta el estado de tu cita previa o cancélala si no puedes asistir.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Buscar por código (ej. CIT-9842) o Teléfono..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#292929] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-[#171717] rounded-3xl p-12 text-center border border-dashed border-[#292929]">
          <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] mx-auto flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No se encontraron citas previas</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
            {searchFilter
              ? 'Prueba a buscar con otro código o teléfono móvil.'
              : 'Aún no has registrado ninguna cita online en esta sesión.'}
          </p>
          <button
            onClick={onOpenBookingCatalog}
            className="mt-4 px-5 py-2.5 bg-[#C9A84C] text-white rounded-xl text-xs font-bold hover:bg-[#8F722A] transition-colors shadow-sm"
          >
            Reservar Cita Previa Ahora
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-[#171717] rounded-3xl p-5 sm:p-6 shadow-sm border border-[#292929] hover:border-[#333] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#292929] pb-4">
                
                {/* Code & Status */}
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-base sm:text-lg font-black text-[#C9A84C]">
                      {apt.code}
                    </span>
                    {getStatusBadge(apt.status)}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Reservado a nombre de <strong>{apt.clientName}</strong> ({apt.clientPhone})
                  </p>
                </div>

                {/* Date & Time */}
                <div className="flex items-center space-x-4 text-xs font-semibold text-gray-200 bg-[#111111] px-4 py-2 rounded-2xl border border-[#292929]">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-[#C9A84C]" />
                    {apt.date}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-amber-500" />
                    {apt.timeSlot} hs
                  </span>
                </div>

              </div>

              {/* Body Details */}
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-200">
                
                {/* Stylist & Salon */}
                <div className="space-y-1">
                  <p><strong>Salón:</strong> {apt.salonName}</p>
                  <p><strong>Atendido por:</strong> {apt.stylistName}</p>
                  {apt.notes && (
                    <p className="text-gray-400 italic mt-1">
                      "Notas: {apt.notes}"
                    </p>
                  )}
                </div>

                {/* Services & Price */}
                <div>
                  <p className="font-bold text-white mb-1">Servicios Contratados:</p>
                  <ul className="space-y-1 pl-2 border-l-2 border-[#C9A84C]/40">
                    {apt.services.map((s, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{s.serviceName} {s.selectedHairLength ? `(${s.selectedHairLength})` : ''}</span>
                        <span className="font-bold text-white">{s.price} €</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 text-right font-extrabold text-white text-sm">
                    Total: <span className="text-[#C9A84C]">{apt.totalPrice} €</span> ({apt.totalDurationMinutes} min)
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              {apt.status === 'confirmada' && (
                <div className="mt-4 pt-3 border-t border-[#292929] flex items-center justify-between flex-wrap gap-2 text-xs">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hola! Recordatorio de mi cita previa ${apt.code} para el ${apt.date} a las ${apt.timeSlot} hs.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-bold flex items-center transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                    Enviar Recordatorio WhatsApp
                  </a>

                  <button
                    onClick={() => {
                      if (confirm(`¿Estás seguro de cancelar la cita ${apt.code}?`)) {
                        onCancelAppointment(apt.id);
                      }
                    }}
                    className="text-[#C9A84C] hover:text-[#C9A84C] bg-[#C9A84C]/10 hover:bg-[#C9A84C]/15 px-3 py-1.5 rounded-lg font-bold flex items-center transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Cancelar Cita Previa
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
