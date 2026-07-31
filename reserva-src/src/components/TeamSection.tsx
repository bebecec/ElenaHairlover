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
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Estilistas & Especialistas
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Conoce a Nuestras Estilistas Profesionales
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Más de 15 años de trayectoria dedicados a la belleza, salud capilar y medicina estética no invasiva.
        </p>
      </div>

      {/* Grid of Stylists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stylists.map((st) => (
          <div
            key={st.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:border-rose-200 hover:shadow-md transition-all group"
          >
            <div>
              {/* Avatar & Badge */}
              <div className="relative mb-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mx-auto border-2 border-rose-200 shadow-md group-hover:scale-105 transition-transform">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-300 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1 border border-slate-700 shadow-xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{st.rating} ({st.reviewsCount})</span>
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mt-3">
                <h3 className="text-lg font-bold text-slate-900">{st.name}</h3>
                <p className="text-xs font-medium text-rose-600">{st.role}</p>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 mt-3 text-center leading-relaxed">
                "{st.bio}"
              </p>

              {/* Specialties Pills */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Especialidades Destacadas:
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {st.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-rose-50 text-rose-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-rose-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-4 text-center text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="font-semibold text-slate-800">Horario habitual:</p>
                <p className="text-[11px]">
                  {st.workingHours.days.join(', ')} ({st.workingHours.timeRange})
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-6">
              <button
                onClick={() => onSelectStylistForBooking(st.id)}
                className="w-full bg-slate-900 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Pedir Cita con {st.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
