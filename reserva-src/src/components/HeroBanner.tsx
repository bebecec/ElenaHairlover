import React from 'react';
import { Star, MapPin, Clock, ShieldCheck, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { Salon } from '../types';

interface HeroBannerProps {
  salon: Salon;
  onBookNow: () => void;
  onExploreServices: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ salon, onBookNow, onExploreServices }) => {
  return (
    <div className="relative bg-[#0a0a0a] text-white overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-4 shadow-xl border border-[#292929]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={salon.coverImage}
          alt={salon.name}
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 sm:py-16 lg:py-20">
        <div className="max-w-2xl space-y-6">
          
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping"></span>
              Abierto Hoy • Citas disponibles
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C9A84C]/20 text-[#DFCA8D] border border-amber-500/30 font-semibold backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C] mr-1" />
              {salon.rating} / 5.0 ({salon.reviewsCount} opiniones verificadas)
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1f1f1f]/80 text-gray-300 border border-[#333] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DFCA8D] mr-1" />
              Reserva 100% Confirmada
            </span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {salon.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#DFCA8D]">
              {salon.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {salon.description}
          </p>

          {/* Info Pill List */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
            <div className="flex items-center space-x-2 bg-[#0a0a0a]/60 p-2.5 rounded-xl border border-[#292929] backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-[#DFCA8D] flex-shrink-0" />
              <span className="truncate">{salon.address}, {salon.city}</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#0a0a0a]/60 p-2.5 rounded-xl border border-[#292929] backdrop-blur-sm">
              <Clock className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
              <span>Sábados de 08:00 a 15:00 | Mar-Vie 09:00 - 19:00</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onBookNow}
              className="bg-[#C9A84C] hover:bg-[#8F722A] text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-[#C9A84C]/25 hover:shadow-[#C9A84C]/40 transition-all text-sm sm:text-base flex items-center justify-center space-x-2 group"
            >
              <Sparkles className="w-5 h-5 text-[#DFCA8D] group-hover:rotate-12 transition-transform" />
              <span>Reservar Cita en Línea</span>
            </button>

            <button
              onClick={onExploreServices}
              className="bg-[#1f1f1f]/90 hover:bg-[#292929]/90 text-white font-semibold px-6 py-3.5 rounded-2xl border border-[#333] transition-all text-sm sm:text-base flex items-center justify-center space-x-2"
            >
              <span>Ver Precios & Servicios</span>
            </button>

            <a
              href={`https://wa.me/${salon.whatsapp}?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20sus%20servicios%20de%20belleza`}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:w-auto bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold px-4 py-3.5 rounded-2xl transition-all text-sm flex items-center justify-center"
              title="Preguntar por WhatsApp"
            >
              <MessageCircle className="w-5 h-5 mr-1.5 text-emerald-400" />
              <span className="sm:hidden lg:inline">WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
