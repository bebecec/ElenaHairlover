import React from 'react';
import { Star, Award, Calendar, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { Stylist } from '../types';

interface TeamSectionProps {
  stylists: Stylist[];
  onSelectStylistForBooking: (stylistId: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ stylists, onSelectStylistForBooking }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 rounded-full border border-[#292929]">
          Estilistas & Especialistas
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Conoce a Nuestras Estilistas Profesionales
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm">
          Más de 15 años de trayectoria dedicados a la belleza, salud capilar y medicina estética no invasiva.
        </p>
      </div>

      {/* Grid of Stylists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stylists.map((st) => (
          <div
            key={st.id}
            className="bg-[#171717] rounded-3xl p-6 shadow-sm border border-[#292929] flex flex-col justify-between hover:border-[#333] hover:shadow-md transition-all group"
          >
            <div>
              {/* Avatar & Badge */}
              <div className="relative mb-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mx-auto border-2 border-[#333] shadow-md group-hover:scale-105 transition-transform">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-[#DFCA8D] text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1 border border-[#333] shadow-xs">
                  <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                  <span>{st.rating} ({st.reviewsCount})</span>
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mt-3">
                <h3 className="text-lg font-bold text-white">{st.name}</h3>
                <p className="text-xs font-medium text-[#C9A84C]">{st.role}</p>
              </div>

              {/* Bio */}
              <p className="text-xs text-gray-300 mt-3 text-center leading-relaxed">
                "{st.bio}"
              </p>

              {/* Specialties Pills */}
              <div className="mt-4 pt-4 border-t border-[#292929]">
                <span className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-2">
                  Especialidades Destacadas:
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {st.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-[#C9A84C]/10 text-[#C9A84C] text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#292929]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-4 text-center text-xs text-gray-400 bg-[#111111] p-2.5 rounded-xl border border-[#292929]">
                <p className="font-semibold text-gray-100">Horario habitual:</p>
                <p className="text-[11px]">
                  {st.workingHours.days.join(', ')} ({st.workingHours.timeRange})
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-6">
              <button
                onClick={() => onSelectStylistForBooking(st.id)}
                className="w-full bg-[#0a0a0a] hover:bg-[#8F722A] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#DFCA8D]" />
                <span>Pedir Cita con {st.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
