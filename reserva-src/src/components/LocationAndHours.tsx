import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Mail, Instagram, Facebook, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Salon } from '../types';

interface LocationAndHoursProps {
  salon: Salon;
}

export const LocationAndHours: React.FC<LocationAndHoursProps> = ({ salon }) => {
  // Google Map embed URL generator
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDRA2YAPSlEq5MLholyGyUW1HgN0hLVtXQ&q=${encodeURIComponent(
    salon.address + ', ' + salon.city
  )}`;

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 rounded-full border border-[#292929]">
          Ubicación & Contacto
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ¿Dónde Encontrarnos & Horario de Atención?
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm">
          Visítanos en nuestro salón o escríbenos directamente por WhatsApp para cualquier consulta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Info & Hours Table */}
        <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#292929] space-y-6">
          
          {/* Address & Direct Phone */}
          <div className="space-y-4 border-b border-[#292929] pb-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 text-[#C9A84C] flex items-center justify-center flex-shrink-0 font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{salon.name}</h3>
                <p className="text-xs text-gray-300 mt-0.5">{salon.address}</p>
                <p className="text-xs text-gray-300">{salon.postalCode} - {salon.city}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${salon.phone}`}
                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#1f1f1f] hover:bg-[#292929] text-gray-100 font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4 mr-2 text-[#C9A84C]" />
                Llamar {salon.phone}
              </a>

              <a
                href={`https://wa.me/${salon.whatsapp}?text=Hola,%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20citas`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Directo
              </a>
            </div>
          </div>

          {/* Opening Hours Table */}
          <div>
            <h4 className="font-bold text-white text-sm flex items-center mb-3">
              <Clock className="w-4 h-4 text-amber-500 mr-2" />
              <span>Horarios de Atención:</span>
            </h4>

            <div className="bg-[#111111] rounded-2xl p-4 border border-[#292929] space-y-2 text-xs">
              {salon.openingHours.map((oh) => (
                <div key={oh.day} className="flex justify-between items-center py-1 border-b border-[#292929]/60 last:border-0">
                  <span className="font-bold text-gray-200">{oh.day}</span>
                  <span className={oh.isOpen ? 'font-bold text-white' : 'font-semibold text-[#C9A84C]'}>
                    {oh.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-[#C9A84C]/10 p-4 rounded-2xl border border-[#292929] text-xs text-white space-y-1">
            <div className="font-bold flex items-center text-[#C9A84C]">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-[#C9A84C]" />
              <span>Política de Cancelación & Tolerancia:</span>
            </div>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              {salon.cancellationPolicy}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-2 border-t border-[#292929] text-xs">
            <span className="font-bold text-gray-400">Síguenos:</span>
            <a
              href={salon.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-200 hover:text-[#C9A84C] font-semibold"
            >
              <Instagram className="w-4 h-4 mr-1 text-[#C9A84C]" />
              Instagram
            </a>
            <a
              href={salon.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-200 hover:text-blue-600 font-semibold"
            >
              <Facebook className="w-4 h-4 mr-1 text-blue-600" />
              Facebook
            </a>
          </div>

        </div>

        {/* Google Map Frame */}
        <div className="bg-[#171717] rounded-3xl p-4 shadow-sm border border-[#292929] flex flex-col justify-between overflow-hidden">
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#292929] relative bg-[#1f1f1f]">
            <iframe
              title="Ubicación del Salón"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="p-4 bg-[#111111] rounded-2xl border border-[#292929] mt-4 text-xs text-gray-300 flex items-center justify-between">
            <div>
              <p className="font-bold text-white">¿Cómo llegar?</p>
              <p className="text-[11px] text-gray-400">
                Líneas de transporte público y zona de fácil aparcamiento cercano.
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(salon.address + ', ' + salon.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a0a0a] text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#171717] transition-colors"
            >
              Abrir Mapa
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
