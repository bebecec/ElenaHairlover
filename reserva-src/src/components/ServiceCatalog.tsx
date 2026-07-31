import React, { useState } from 'react';
import { Search, Scissors, Sparkles, Clock, Check, Plus, Info, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { ServiceItem, ServiceCategory, HairLength } from '../types';

interface ServiceCatalogProps {
  categories: ServiceCategory[];
  services: ServiceItem[];
  selectedServices: ServiceItem[];
  selectedHairLengths: Record<string, HairLength>;
  onToggleService: (service: ServiceItem, hairLength?: HairLength) => void;
  onHairLengthChange: (serviceId: string, length: HairLength) => void;
  onQuickBook: (service: ServiceItem, length?: HairLength) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  categories,
  services,
  selectedServices,
  selectedHairLengths,
  onToggleService,
  onHairLengthChange,
  onQuickBook,
}) => {
  const [searchQuery, setSearchSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Filter services by category and search term
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategoryId === 'all' ||
      service.categoryId === selectedCategoryId ||
      categories.find((c) => c.id === selectedCategoryId)?.name === service.categoryName;

    return matchesSearch && matchesCategory;
  });

  // Group services by category for categorized display
  const categoriesWithServices = categories.map((cat) => {
    const catServices = filteredServices.filter(
      (s) => s.categoryId === cat.id || s.categoryName === cat.name
    );
    return {
      ...cat,
      servicesList: catServices,
    };
  }).filter((cat) => cat.servicesList.length > 0 || selectedCategoryId === cat.id);

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  const calculateEffectivePrice = (service: ServiceItem) => {
    if (service.hasLengthVariations && service.lengthPricing) {
      const selectedLength = selectedHairLengths[service.id] || 'Medio';
      const variant = service.lengthPricing.find((lp) => lp.length === selectedLength);
      if (variant) return variant.price;
    }
    return service.basePrice;
  };

  const calculateEffectiveDuration = (service: ServiceItem) => {
    if (service.hasLengthVariations && service.lengthPricing) {
      const selectedLength = selectedHairLengths[service.id] || 'Medio';
      const variant = service.lengthPricing.find((lp) => lp.length === selectedLength);
      if (variant) return variant.durationMinutes;
    }
    return service.baseDurationMinutes;
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Search Bar & Stats Header */}
      <div className="bg-[#171717] rounded-3xl p-4 sm:p-6 shadow-sm border border-[#292929] mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Scissors className="w-6 h-6 text-[#C9A84C]" />
              <span>Catálogo de Servicios & Tarifas</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Selecciona uno o varios servicios para reservar tu cita personalizada.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchSearchQuery(e.target.value)}
              placeholder="Buscar servicio (ej. Balayage, Láser, Tinte)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#292929] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:bg-[#171717] transition-all placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-300 bg-[#292929] rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Category Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-2 no-scrollbar border-t border-[#292929]">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#292929]'
            }`}
          >
            Todos ({services.length})
          </button>
          {categories.map((cat) => {
            const count = services.filter((s) => s.categoryId === cat.id || s.categoryName === cat.name).length;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#C9A84C] text-white shadow-sm shadow-[#C9A84C]/20'
                    : 'bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C]/15'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  isSelected ? 'bg-[#8F722A] text-white' : 'bg-rose-200/60 text-[#C9A84C]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid or Categorized Accordion */}
      {filteredServices.length === 0 ? (
        <div className="bg-[#171717] rounded-3xl p-12 text-center border border-dashed border-[#292929]">
          <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] mx-auto flex items-center justify-center mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No encontramos ningún servicio</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
            Prueba a cambiar las palabras de búsqueda o selecciona otra categoría.
          </p>
          <button
            onClick={() => {
              setSearchSearchQuery('');
              setSelectedCategoryId('all');
            }}
            className="mt-4 px-4 py-2 bg-[#C9A84C] text-white rounded-xl text-xs font-semibold hover:bg-[#8F722A] transition-colors"
          >
            Mostrar Todos los Servicios
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {categoriesWithServices.map((cat) => {
            if (cat.servicesList.length === 0) return null;

            return (
              <div key={cat.id} className="bg-[#171717] rounded-3xl p-5 sm:p-7 shadow-sm border border-[#292929] space-y-4">
                
                {/* Category Title Header */}
                <div className="flex items-center justify-between border-b border-[#292929] pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C9A84C]/15 text-[#C9A84C] flex items-center justify-center font-bold text-sm">
                      ✨
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                      <p className="text-xs text-gray-400">{cat.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-full">
                    {cat.servicesList.length} servicios disponibles
                  </span>
                </div>

                {/* Service Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {cat.servicesList.map((service) => {
                    const selected = isServiceSelected(service.id);
                    const isExpanded = expandedServiceId === service.id;
                    const price = calculateEffectivePrice(service);
                    const duration = calculateEffectiveDuration(service);
                    const currentLength = selectedHairLengths[service.id] || 'Medio';

                    return (
                      <div
                        key={service.id}
                        className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                          selected
                            ? 'bg-[#C9A84C]/10 border-[#C9A84C] shadow-md ring-1 ring-[#C9A84C]/40'
                            : 'bg-[#111111]/50 hover:bg-[#171717] border-[#292929] hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div>
                          {/* Item Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                <h4 className="font-bold text-white text-sm sm:text-base leading-snug">
                                  {service.name}
                                </h4>
                                {service.popular && (
                                  <span className="text-[10px] font-extrabold bg-[#C9A84C]/15 text-[#C9A84C] px-2 py-0.5 rounded-full flex items-center">
                                    <Sparkles className="w-2.5 h-2.5 mr-1 text-[#C9A84C] fill-[#C9A84C]" />
                                    Popular
                                  </span>
                                )}
                                {service.patchTestRequired && (
                                  <span
                                    title="Requiere prueba de alergia 24h antes"
                                    className="text-[10px] font-medium bg-[#C9A84C]/15 text-[#C9A84C] px-2 py-0.5 rounded-full flex items-center cursor-help"
                                  >
                                    <AlertTriangle className="w-2.5 h-2.5 mr-1" />
                                    Prueba Alergia
                                  </span>
                                )}
                              </div>

                              {/* Price & Duration Badges */}
                              <div className="flex items-center space-x-3 mt-2 text-xs font-semibold text-gray-200">
                                <span className="text-base sm:text-lg font-black text-[#C9A84C]">
                                  {price > 0 ? `${price} €` : 'Gratis'}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="flex items-center text-gray-400 font-normal">
                                  <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
                                  {duration} min
                                </span>
                              </div>
                            </div>

                            {/* Service Thumbnail if available */}
                            {service.imageUrl && (
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[#292929]">
                                <img
                                  src={service.imageUrl}
                                  alt={service.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            )}
                          </div>

                          {/* Hair Length Selector if applicable */}
                          {service.hasLengthVariations && service.lengthPricing && (
                            <div className="mt-3 p-2.5 bg-[#171717] rounded-xl border border-[#292929] text-xs">
                              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                                Selecciona Longitud de Cabello:
                              </span>
                              <div className="grid grid-cols-3 gap-1.5">
                                {service.lengthPricing.map((lp) => (
                                  <button
                                    key={lp.length}
                                    type="button"
                                    onClick={() => onHairLengthChange(service.id, lp.length)}
                                    className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                                      currentLength === lp.length
                                        ? 'bg-[#C9A84C] text-white font-bold shadow-xs'
                                        : 'bg-[#1f1f1f] text-gray-200 hover:bg-[#292929]'
                                    }`}
                                  >
                                    <div className="font-semibold">{lp.length}</div>
                                    <div className="text-[10px] opacity-90">{lp.price}€</div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-xs text-gray-300 mt-2.5 line-clamp-2 leading-relaxed">
                            {service.description}
                          </p>

                          {/* Detailed info toggle */}
                          {service.description.length > 80 && (
                            <button
                              onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                              className="text-[11px] font-semibold text-[#C9A84C] hover:text-[#C9A84C] mt-1 flex items-center"
                            >
                              <Info className="w-3 h-3 mr-1" />
                              {isExpanded ? 'Ver menos detalles' : 'Más información detallada'}
                              {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                            </button>
                          )}

                          {isExpanded && (
                            <div className="mt-2 p-3 bg-[#C9A84C]/10 text-white rounded-xl text-xs space-y-1.5 border border-[#333] animate-in fade-in">
                              <p className="font-medium">{service.description}</p>
                              {service.patchTestRequired && (
                                <p className="text-[11px] text-[#C9A84C] italic">
                                  ⚠️ Nota: Este servicio requiere prueba de mecha o test de alergia cutánea 24-48h antes si es tu primera sesión.
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 pt-3 border-t border-[#292929]/60 flex items-center justify-between gap-2">
                          <button
                            onClick={() => onToggleService(service, currentLength)}
                            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all ${
                              selected
                                ? 'bg-emerald-600 text-white hover:bg-emerald-800 shadow-xs'
                                : 'bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C]/15 border border-[#333]'
                            }`}
                          >
                            {selected ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Añadido a la Cita</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                <span>Añadir a la Cita</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => onQuickBook(service, currentLength)}
                            className="py-2.5 px-4 bg-[#0a0a0a] hover:bg-[#171717] text-white font-bold text-xs rounded-xl transition-all flex items-center whitespace-nowrap shadow-xs"
                          >
                            Reservar Ya
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
