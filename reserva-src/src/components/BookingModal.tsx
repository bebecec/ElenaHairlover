import React, { useState } from 'react';
import { X, Calendar, Clock, UserCheck, CheckCircle2, ShieldCheck, Sparkles, MessageCircle, AlertCircle, Scissors, ArrowRight, ArrowLeft } from 'lucide-react';
import { ServiceItem, Stylist, Salon, Appointment, HairLength } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  salon: Salon;
  stylists: Stylist[];
  selectedServices: ServiceItem[];
  selectedHairLengths: Record<string, HairLength>;
  onRemoveService: (serviceId: string) => void;
  onAddAppointment: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  salon,
  stylists,
  selectedServices,
  selectedHairLengths,
  onRemoveService,
  onAddAppointment,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Stylist, 2: Date & Time, 3: Contact Info, 4: Confirmed
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow as default
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  // Total price calculation
  const totalPrice = selectedServices.reduce((sum, service) => {
    if (service.hasLengthVariations && service.lengthPricing) {
      const len = selectedHairLengths[service.id] || 'Medio';
      const variant = service.lengthPricing.find((lp) => lp.length === len);
      if (variant) return sum + variant.price;
    }
    return sum + service.basePrice;
  }, 0);

  // Total duration calculation
  const totalDuration = selectedServices.reduce((sum, service) => {
    if (service.hasLengthVariations && service.lengthPricing) {
      const len = selectedHairLengths[service.id] || 'Medio';
      const variant = service.lengthPricing.find((lp) => lp.length === len);
      if (variant) return sum + variant.durationMinutes;
    }
    return sum + service.baseDurationMinutes;
  }, 0);

  // Available time slots generator
  const availableSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  // Helper date pills (Next 7 days)
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('es-ES', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('es-ES', { month: 'short' });
      days.push({ iso, dayName, dayNum, monthName });
    }
    return days;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const chosenStylist = stylists.find((s) => s.id === selectedStylistId);
    const stylistName = chosenStylist ? chosenStylist.name : 'Cualquier Profesional Disponible';
    const stylistRole = chosenStylist ? chosenStylist.role : 'Asignación automática';

    const code = `CIT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      code,
      salonId: salon.id,
      salonName: salon.name,
      clientName,
      clientPhone,
      clientEmail,
      notes,
      stylistId: selectedStylistId,
      stylistName,
      stylistRole,
      services: selectedServices.map((s) => {
        const len = selectedHairLengths[s.id];
        let p = s.basePrice;
        let d = s.baseDurationMinutes;
        if (s.hasLengthVariations && s.lengthPricing) {
          const v = s.lengthPricing.find((lp) => lp.length === (len || 'Medio'));
          if (v) {
            p = v.price;
            d = v.durationMinutes;
          }
        }
        return {
          serviceId: s.id,
          serviceName: s.name,
          categoryName: s.categoryName,
          price: p,
          durationMinutes: d,
          selectedHairLength: len
        };
      }),
      totalPrice,
      totalDurationMinutes: totalDuration,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'confirmada',
      createdAt: new Date().toISOString()
    };

    onAddAppointment(newApt);
    setCreatedAppointment(newApt);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#171717] rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#292929] relative my-8">
        
        {/* Modal Header */}
        <div className="bg-[#0a0a0a] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#292929]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#DFCA8D] uppercase tracking-widest bg-[#C9A84C]/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full">
                Paso {step} de 3
              </span>
              <span className="text-xs text-gray-500">• {salon.name}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold mt-1 tracking-tight">
              {step === 1 && 'Selecciona tu Profesional'}
              {step === 2 && 'Fecha y Hora de la Cita'}
              {step === 3 && 'Tus Datos de Contacto'}
              {step === 4 && '¡Cita Confirmada con Éxito!'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#171717] hover:bg-slate-700 text-gray-500 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Services Summary Bar */}
        {step < 4 && (
          <div className="bg-[#C9A84C]/10 px-5 py-3 border-b border-[#292929] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
              <Scissors className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
              <span className="font-bold text-white flex-shrink-0">Servicios ({selectedServices.length}):</span>
              <div className="flex space-x-1.5">
                {selectedServices.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center bg-[#171717] px-2 py-1 rounded-md text-[11px] font-medium text-gray-100 border border-[#333] shadow-2xs whitespace-nowrap"
                  >
                    {s.name} ({s.basePrice}€)
                    <button
                      onClick={() => onRemoveService(s.id)}
                      className="ml-1.5 text-[#DFCA8D] hover:text-[#C9A84C] font-bold"
                      title="Quitar"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right flex-shrink-0 pl-3 border-l border-[#333]">
              <div className="font-extrabold text-[#C9A84C] text-sm">{totalPrice} €</div>
              <div className="text-[10px] text-gray-400">{totalDuration} min aprox</div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Select Professional */}
          {step === 1 && (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-gray-300">
                Elige qué estilista o especialista quieres que te atienda:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Random / Any Professional Option */}
                <button
                  type="button"
                  onClick={() => setSelectedStylistId('any')}
                  className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                    selectedStylistId === 'any'
                      ? 'bg-[#C9A84C]/10 border-rose-500 ring-2 ring-[#C9A84C]/40 shadow-sm'
                      : 'bg-[#111111] hover:bg-[#1f1f1f] border-[#292929]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] text-[#DFCA8D] flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-xs">
                    ✨
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Cualquier Profesional</h4>
                    <p className="text-xs text-[#C9A84C] font-medium">Asignación automática más rápida</p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Te asignaremos el mejor estilista según la hora libre que prefieras.
                    </p>
                  </div>
                </button>

                {/* Stylist Cards */}
                {stylists.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStylistId(st.id)}
                    className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                      selectedStylistId === st.id
                        ? 'bg-[#C9A84C]/10 border-rose-500 ring-2 ring-[#C9A84C]/40 shadow-sm'
                        : 'bg-[#111111] hover:bg-[#1f1f1f] border-[#292929]'
                    }`}
                  >
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#292929] flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{st.name}</h4>
                      <p className="text-xs text-[#C9A84C] font-medium">{st.role}</p>
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                        ⭐ {st.rating} ({st.reviewsCount} reseñas)
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-[#C9A84C] hover:bg-[#8F722A] text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center space-x-2 transition-all shadow-md"
                >
                  <span>Siguiente: Elegir Fecha y Hora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Quick Date Pills */}
              <div>
                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Selecciona el Día:
                </label>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
                  {getNextDays().map((d) => {
                    const isSelected = selectedDate === d.iso;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setSelectedDate(d.iso)}
                        className={`p-3 rounded-2xl text-center min-w-[72px] transition-all flex-shrink-0 border ${
                          isSelected
                            ? 'bg-[#C9A84C] text-white font-bold border-rose-500 shadow-md scale-105'
                            : 'bg-[#111111] hover:bg-[#1f1f1f] text-gray-200 border-[#292929]'
                        }`}
                      >
                        <div className="text-[10px] uppercase opacity-80">{d.dayName}</div>
                        <div className="text-lg font-black">{d.dayNum}</div>
                        <div className="text-[10px] uppercase opacity-80">{d.monthName}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Input picker */}
                <div className="mt-3 flex items-center space-x-2 text-xs text-gray-400">
                  <span>O selecciona otra fecha en el calendario:</span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-[#1f1f1f] border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                  />
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Horas Disponibles para {selectedDate}:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableSlots.map((slot) => {
                    const isSlotSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center border ${
                          isSlotSelected
                            ? 'bg-[#0a0a0a] text-[#DFCA8D] border-slate-900 shadow-md ring-2 ring-amber-400/50'
                            : 'bg-[#111111] hover:bg-[#C9A84C]/10 text-gray-100 border-[#292929]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-[#292929]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-gray-300 hover:text-white flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#C9A84C] hover:bg-[#8F722A] text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center space-x-2 transition-all shadow-md"
                >
                  <span>Siguiente: Tus Datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details Form */}
          {step === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="bg-[#111111] p-4 rounded-2xl border border-[#292929] text-xs space-y-1 text-gray-200">
                <p className="font-bold text-white">Resumen de la Reserva:</p>
                <p>• <strong>Fecha & Hora:</strong> {selectedDate} a las {selectedTimeSlot} hs</p>
                <p>• <strong>Profesional:</strong> {stylists.find((s) => s.id === selectedStylistId)?.name || 'Cualquier Profesional Disponible'}</p>
                <p>• <strong>Total a pagar en el salón:</strong> <span className="text-[#C9A84C] font-bold">{totalPrice} €</span> ({totalDuration} min)</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-200 mb-1">
                  Nombre Completo <span className="text-[#C9A84C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. María Carmen López"
                  className="w-full px-3.5 py-2.5 bg-[#111111] border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:bg-[#171717]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1">
                    Teléfono Móvil (WhatsApp) <span className="text-[#C9A84C]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej. 612 345 678"
                    className="w-full px-3.5 py-2.5 bg-[#111111] border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:bg-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1">
                    Correo Electrónico (Opcional)
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 bg-[#111111] border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:bg-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-200 mb-1">
                  Notas o Preferencias Especiales para la Estilista:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Tengo el cabello procesado con decoloración previa / Aclarar con matiz frío..."
                  className="w-full px-3.5 py-2.5 bg-[#111111] border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:bg-[#171717]"
                ></textarea>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-[#292929]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-gray-300 hover:text-white flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold px-7 py-3 rounded-xl text-sm flex items-center space-x-2 transition-all shadow-md shadow-emerald-600/20"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirmar Cita Ahora</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation Ticket */}
          {step === 4 && createdAppointment && (
            <div className="text-center space-y-6 py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  ¡Reserva Registrada en el Salón!
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Código de Cita: <span className="text-[#C9A84C]">{createdAppointment.code}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Guarda este número para consultar tu cita en la pestaña "Mis Citas".
                </p>
              </div>

              {/* Ticket Card */}
              <div className="bg-[#111111] rounded-2xl p-5 border border-[#292929] text-left text-xs text-gray-200 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C9A84C] text-white font-bold px-3 py-1 text-[10px] rounded-bl-xl">
                  TICKET OFICIAL
                </div>
                <p><strong>Cliente:</strong> {createdAppointment.clientName}</p>
                <p><strong>Teléfono:</strong> {createdAppointment.clientPhone}</p>
                <p><strong>Fecha:</strong> {createdAppointment.date} a las {createdAppointment.timeSlot} hs</p>
                <p><strong>Atendido por:</strong> {createdAppointment.stylistName}</p>
                <div className="pt-2 border-t border-[#292929]">
                  <p className="font-bold text-white mb-1">Servicios Reservados:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {createdAppointment.services.map((s, idx) => (
                      <li key={idx}>
                        {s.serviceName} {s.selectedHairLength ? `(${s.selectedHairLength})` : ''} - <strong>{s.price} €</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-[#292929] flex justify-between items-center text-sm font-bold text-white">
                  <span>Total a Abonar en Salón:</span>
                  <span className="text-[#C9A84C] text-base">{createdAppointment.totalPrice} €</span>
                </div>
              </div>

              {/* WhatsApp Notification Link */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(
                    `Hola! He reservado la cita previa ${createdAppointment.code} para el ${createdAppointment.date} a las ${createdAppointment.timeSlot} hs a nombre de ${createdAppointment.clientName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Recordatorio por WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto bg-[#0a0a0a] hover:bg-[#171717] text-white font-bold px-6 py-3 rounded-xl text-xs transition-all"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
