import React from 'react';
import { Scissors, Calendar, MapPin, Phone, UserCheck, ShieldCheck, Sparkles, MessageCircle, ChevronDown, Check } from 'lucide-react';
import { Salon } from '../types';

interface HeaderProps {
  activeTab: 'services' | 'team' | 'location' | 'my-bookings' | 'admin' | 'ai-advisor';
  setActiveTab: (tab: 'services' | 'team' | 'location' | 'my-bookings' | 'admin' | 'ai-advisor') => void;
  currentSalon: Salon;
  allSalons: Salon[];
  onSelectSalon: (salon: Salon) => void;
  cartCount: number;
  onOpenBookingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentSalon,
  allSalons,
  onSelectSalon,
  cartCount,
  onOpenBookingModal,
}) => {
  const [showSalonMenu, setShowSalonMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100/60 shadow-sm transition-all">
      {/* Top micro bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-amber-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
              Reserva Cita Online 24/7 sin esperas
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1 text-rose-400" />
              {currentSalon.address}, {currentSalon.city}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`https://wa.me/${currentSalon.whatsapp}?text=Hola,%20quisiera%20consultar%20sobre%20una%20cita%20en%20${encodeURIComponent(currentSalon.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1" />
              WhatsApp Directo ({currentSalon.phone})
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-400" />
              Acceso Gestión Salón
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo & Salon Selector */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowSalonMenu(!showSalonMenu)}
                className="flex items-center space-x-3 text-left focus:outline-none group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-rose-200 shadow-sm bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-lg group-hover:border-rose-400 transition-all">
                  {currentSalon.logoUrl ? (
                    <img
                      src={currentSalon.logoUrl}
                      alt={currentSalon.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Scissors className="w-6 h-6 text-rose-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-900 text-base sm:text-xl tracking-tight group-hover:text-rose-600 transition-colors">
                      {currentSalon.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-transform" />
                  </div>
                  <p className="text-xs text-rose-500 font-medium hidden sm:block">
                    {currentSalon.tagline}
                  </p>
                </div>
              </button>

              {/* Salon Dropdown Switcher */}
              {showSalonMenu && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Cambiar Demo / Salón de Muestra
                  </div>
                  {allSalons.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSelectSalon(s);
                        setShowSalonMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-rose-50/70 transition-colors ${
                        s.id === currentSalon.id ? 'bg-rose-50 font-semibold text-rose-700' : 'text-slate-700'
                      }`}
                    >
                      <div className="truncate">
                        <p className="text-sm font-medium leading-tight">{s.name}</p>
                        <p className="text-xs text-slate-400 truncate">{s.city}</p>
                      </div>
                      {s.id === currentSalon.id && <Check className="w-4 h-4 text-rose-600 flex-shrink-0 ml-2" />}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-3">
                    <button
                      onClick={() => {
                        setShowSalonMenu(false);
                        setActiveTab('admin');
                      }}
                      className="w-full text-xs text-center py-1.5 font-medium text-rose-600 hover:text-rose-800 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      + Adaptar / Personalizar Nombre de tu Propio Salón
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="flex items-center">
                <Scissors className="w-4 h-4 mr-1.5" />
                Catálogo de Servicios
              </span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'team'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="flex items-center">
                <UserCheck className="w-4 h-4 mr-1.5" />
                Nuestro Equipo
              </span>
            </button>

            <button
              onClick={() => setActiveTab('location')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'location'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1.5" />
                Ubicación y Horario
              </span>
            </button>

            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'my-bookings'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                Mis Citas
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ai-advisor')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'ai-advisor'
                  ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md'
                  : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                Asesor IA
              </span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            {cartCount > 0 && (
              <button
                onClick={onOpenBookingModal}
                className="relative bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center animate-bounce"
              >
                <span>Reserva Activa ({cartCount})</span>
              </button>
            )}

            <button
              onClick={() => {
                if (cartCount === 0) {
                  setActiveTab('services');
                } else {
                  onOpenBookingModal();
                }
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center"
            >
              <Calendar className="w-4 h-4 mr-1.5 text-rose-400" />
              Pedir Cita Previa
            </button>
          </div>
        </div>

        {/* Mobile Nav Bar Scrollable */}
        <div className="lg:hidden flex items-center space-x-2 py-2.5 overflow-x-auto no-scrollbar border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === 'services' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            ✂️ Servicios
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === 'team' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            👥 Equipo
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === 'location' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            📍 Horario
          </button>
          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === 'my-bookings' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            📅 Mis Citas
          </button>
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === 'ai-advisor' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
            }`}
          >
            ✨ Asesor IA
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === 'admin' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            ⚙️ Panel Salón
          </button>
        </div>
      </div>
    </header>
  );
};
