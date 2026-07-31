import React, { useState } from 'react';
import { Sparkles, Send, Scissors, Plus, Check, ArrowRight, MessageSquare, Bot } from 'lucide-react';
import { ServiceItem } from '../types';

interface AIAdvisorProps {
  services: ServiceItem[];
  onAddRecommendedService: (service: ServiceItem) => void;
  selectedServiceIds: string[];
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({
  services,
  onAddRecommendedService,
  selectedServiceIds,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<{
    advice: string;
    suggestedServices: ServiceItem[];
  } | null>(null);

  const presets = [
    'Tengo cabello teñido de rubio y quiero quitar reflejos amarillos y dar brillo',
    'Busco un alisado orgánico que no dañe mi cabello y elimine el encrespamiento',
    'Limpieza de piel profunda para poros dilatados y puntos negros',
    'Quiero definir mis cejas y pestañas para no maquillarme a diario',
    'Depilación permanente sin dolor para cuerpo completo'
  ];

  const handleAnalyze = (userQuery: string) => {
    if (!userQuery.trim()) return;
    setIsAnalyzing(true);
    setRecommendations(null);

    setTimeout(() => {
      const queryLower = userQuery.toLowerCase();
      let matchedServices: ServiceItem[] = [];
      let adviceText = '';

      if (queryLower.includes('rubio') || queryLower.includes('amarillo') || queryLower.includes('brillo') || queryLower.includes('mechas')) {
        matchedServices = services.filter((s) =>
          s.name.includes('Color Refresh') || s.name.includes('Balayage') || s.name.includes('Babylights') || s.name.includes('Fibre Clinix')
        );
        adviceText = 'Para renovar la luz de tu cabello teñido y neutralizar matices cálidos sin castigar la fibra capilar, te recomiendo nuestro ritual vitamínico de refresco de color junto con la reconstrucción de enlaces disulfuro.';
      } else if (queryLower.includes('alisado') || queryLower.includes('encrespamiento') || queryLower.includes('frizz') || queryLower.includes('keratina')) {
        matchedServices = services.filter((s) =>
          s.name.includes('Alisado') || s.name.includes('Fibre Clinix') || s.name.includes('Olaplex')
        );
        adviceText = 'Para eliminar el encrespamiento al 100% y lucir una melena sedosa e hidratada durante 4 a 6 meses, la mejor opción es nuestro Alisado Orgánico de Keratina.';
      } else if (queryLower.includes('piel') || queryLower.includes('poro') || queryLower.includes('facial') || queryLower.includes('puntos negros')) {
        matchedServices = services.filter((s) =>
          s.name.includes('Higiene') || s.name.includes('Carbón Activo') || s.name.includes('IPL')
        );
        adviceText = 'Para purificar la piel a fondo y cerrar poros, te sugiero la Higiene Hidro-Detox combinada con el tratamiento de Carbón Activo bioluminiscente.';
      } else if (queryLower.includes('cejas') || queryLower.includes('pestañas') || queryLower.includes('maquillar')) {
        matchedServices = services.filter((s) =>
          s.name.includes('Lifting') || s.name.includes('Henna') || s.name.includes('Tinte')
        );
        adviceText = 'Para enmarcar la mirada con efecto rímel natural durante semanas, el Lifting de pestañas con tinte de queratina y diseño de cejas con henna son la combinación estrella.';
      } else {
        matchedServices = services.slice(0, 3);
        adviceText = 'Basándonos en tu consulta de belleza personalizada, hemos seleccionado nuestros servicios más valorados por las clientas del salón:';
      }

      setRecommendations({
        advice: adviceText,
        suggestedServices: matchedServices.slice(0, 3)
      });
      setIsAnalyzing(false);
    }, 900);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      
      {/* Advisor Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-amber-300 border border-purple-400/30">
              <Bot className="w-5 h-5 animate-pulse" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
              Asesor Virtual de Belleza IA
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            ¿Dudas sobre qué tratamiento necesita tu cabello o piel?
          </h2>

          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-2xl">
            Describe lo que quieres lograr o las dudas sobre tu tipo de pelo/piel. La Inteligencia Artificial analizará el catálogo del salón para recomendarte la combinación perfecta.
          </p>

          {/* Quick Preset Buttons */}
          <div className="pt-2">
            <span className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-2">
              Consultas Frecuentes de Ejemplo:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPromptInput(preset);
                    handleAnalyze(preset);
                  }}
                  className="text-xs bg-purple-900/40 hover:bg-rose-500/30 text-purple-100 hover:text-white border border-purple-700/50 rounded-xl px-3 py-1.5 transition-all text-left"
                >
                  ✨ "{preset}"
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div className="pt-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze(promptInput)}
                placeholder="Escribe aquí tu consulta (ej. mi pelo es muy fino y seco)..."
                className="w-full pl-4 pr-12 py-3.5 bg-slate-900/80 border border-purple-500/40 rounded-2xl text-xs sm:text-sm text-white placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                onClick={() => handleAnalyze(promptInput)}
                disabled={isAnalyzing || !promptInput.trim()}
                className="absolute right-2 p-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-xl transition-all"
              >
                {isAnalyzing ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Recommendations Results Box */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 mx-auto flex items-center justify-center animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">Analizando catálogo de servicios para ti...</p>
        </div>
      )}

      {recommendations && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-rose-100 space-y-6 animate-in fade-in">
          
          <div className="flex items-start space-x-3 bg-purple-50 p-4 rounded-2xl border border-purple-100">
            <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Recomendación del Asesor Virtual:</h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {recommendations.advice}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">
              Servicios Sugeridos para Tu Caso:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.suggestedServices.map((srv) => {
                const isAlreadySelected = selectedServiceIds.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-slate-900 text-sm">{srv.name}</h5>
                        <span className="text-rose-600 font-extrabold text-sm">{srv.basePrice} €</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.description}</p>
                    </div>

                    <button
                      onClick={() => onAddRecommendedService(srv)}
                      className={`mt-4 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all ${
                        isAlreadySelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
                      }`}
                    >
                      {isAlreadySelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Añadido a la Cita</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Añadir a Mi Reserva</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
