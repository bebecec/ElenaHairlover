import React, { useState } from 'react';
import { ShieldCheck, Calendar, Scissors, Plus, Trash2, Edit, Save, CheckCircle2, XCircle, Search, Settings, UserCheck, DollarSign, Clock } from 'lucide-react';
import { Salon, ServiceItem, Appointment, Stylist, ServiceCategoryName } from '../types';

interface AdminPanelProps {
  salon: Salon;
  onUpdateSalon: (updatedSalon: Salon) => void;
  services: ServiceItem[];
  onAddService: (newService: ServiceItem) => void;
  onDeleteService: (serviceId: string) => void;
  appointments: Appointment[];
  onUpdateAppointmentStatus: (appointmentId: string, newStatus: Appointment['status']) => void;
  stylists: Stylist[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  salon,
  onUpdateSalon,
  services,
  onAddService,
  onDeleteService,
  appointments,
  onUpdateAppointmentStatus,
  stylists,
}) => {
  const [adminTab, setAdminTab] = useState<'appointments' | 'services' | 'salon-settings'>('appointments');
  
  // State for editing salon details
  const [salonName, setSalonName] = useState(salon.name);
  const [salonTagline, setSalonTagline] = useState(salon.tagline);
  const [salonPhone, setSalonPhone] = useState(salon.phone);
  const [salonAddress, setSalonAddress] = useState(salon.address);
  const [salonCity, setSalonCity] = useState(salon.city);

  // State for adding a new service
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newSrvName, setNewSrvName] = useState('');
  const [newSrvCategory, setNewSrvCategory] = useState<ServiceCategoryName>('Peluquería & Corte');
  const [newSrvPrice, setNewSrvPrice] = useState(35);
  const [newSrvDuration, setNewSrvDuration] = useState(45);
  const [newSrvDesc, setNewSrvDesc] = useState('');

  const handleSaveSalonSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSalon({
      ...salon,
      name: salonName,
      tagline: salonTagline,
      phone: salonPhone,
      address: salonAddress,
      city: salonCity,
    });
    alert('¡Configuración del Salón actualizada correctamente!');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvName.trim()) return;

    const newService: ServiceItem = {
      id: `srv-custom-${Date.now()}`,
      name: newSrvName,
      categoryId: `cat-${newSrvCategory.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      categoryName: newSrvCategory,
      description: newSrvDesc || 'Servicio personalizado creado por la administración del salón.',
      basePrice: Number(newSrvPrice),
      baseDurationMinutes: Number(newSrvDuration),
      popular: true,
    };

    onAddService(newService);
    setShowAddServiceModal(false);
    setNewSrvName('');
    setNewSrvDesc('');
    alert('¡Nuevo servicio publicado en el catálogo!');
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Admin Title Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Panel de Administración del Salón
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
            Gestión de Citas, Tarifas & Negocio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personaliza el nombre de tu establecimiento, gestiona precios y controla la agenda en tiempo real.
          </p>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center space-x-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setAdminTab('appointments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              adminTab === 'appointments'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Citas ({appointments.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              adminTab === 'services'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Servicios ({services.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('salon-settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              adminTab === 'salon-settings'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Datos Salón</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Appointments List Management */}
      {adminTab === 'appointments' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Agenda de Citas Previs</h3>
              <p className="text-xs text-slate-500">Listado de reservas recibidas a través de la web.</p>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              {appointments.filter((a) => a.status === 'confirmada').length} pendientes
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No hay citas registradas todavía.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Código</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Teléfono</th>
                    <th className="p-3">Fecha & Hora</th>
                    <th className="p-3">Estilista</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-rose-600">{apt.code}</td>
                      <td className="p-3 font-semibold text-slate-900">{apt.clientName}</td>
                      <td className="p-3">{apt.clientPhone}</td>
                      <td className="p-3 whitespace-nowrap">
                        <strong>{apt.date}</strong> a las {apt.timeSlot} hs
                      </td>
                      <td className="p-3">{apt.stylistName}</td>
                      <td className="p-3 font-extrabold text-slate-900">{apt.totalPrice} €</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          apt.status === 'confirmada'
                            ? 'bg-emerald-100 text-emerald-800'
                            : apt.status === 'completada'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {apt.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        {apt.status === 'confirmada' && (
                          <>
                            <button
                              onClick={() => onUpdateAppointmentStatus(apt.id, 'completada')}
                              className="px-2 py-1 bg-emerald-600 text-white rounded-md text-[10px] font-bold hover:bg-emerald-700"
                              title="Marcar como Completada"
                            >
                              Completar
                            </button>
                            <button
                              onClick={() => onUpdateAppointmentStatus(apt.id, 'cancelada')}
                              className="px-2 py-1 bg-rose-100 text-rose-800 hover:bg-rose-200 rounded-md text-[10px] font-bold"
                              title="Cancelar Cita"
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Services & Pricing Management */}
      {adminTab === 'services' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Catálogo de Servicios y Precios</h3>
              <p className="text-xs text-slate-500">Añade o elimina servicios y modifica los precios a tu gusto.</p>
            </div>
            <button
              onClick={() => setShowAddServiceModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Nuevo Servicio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {srv.categoryName}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar ${srv.name} del catálogo?`)) {
                          onDeleteService(srv.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Eliminar Servicio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">{srv.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.description}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500">{srv.baseDurationMinutes} min</span>
                  <span className="text-rose-600 text-base">{srv.basePrice} €</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Salon Settings (Branding Adaptation) */}
      {adminTab === 'salon-settings' && (
        <form onSubmit={handleSaveSalonSettings} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Adaptar Datos de Tu Salón</h3>
            <p className="text-xs text-slate-500">
              Modifica la marca para que coincida exactamente con tu peluquería o centro de estética.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Comercial del Salón</label>
              <input
                type="text"
                required
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Eslogan / Eslogan Secundario</label>
              <input
                type="text"
                value={salonTagline}
                onChange={(e) => setSalonTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
              <input
                type="text"
                value={salonPhone}
                onChange={(e) => setSalonPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad</label>
              <input
                type="text"
                value={salonCity}
                onChange={(e) => setSalonCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Dirección Completa</label>
            <input
              type="text"
              value={salonAddress}
              onChange={(e) => setSalonAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>Guardar Cambios del Salón</span>
            </button>
          </div>
        </form>
      )}

      {/* Add New Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Añadir Servicio al Catálogo</h3>
              <button onClick={() => setShowAddServiceModal(false)} className="text-slate-400 font-bold">×</button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Servicio</label>
                <input
                  type="text"
                  required
                  value={newSrvName}
                  onChange={(e) => setNewSrvName(e.target.value)}
                  placeholder="Ej. Peinado Ondas de Agua con Keratina"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                <select
                  value={newSrvCategory}
                  onChange={(e) => setNewSrvCategory(e.target.value as ServiceCategoryName)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="Peluquería & Corte">Peluquería & Corte</option>
                  <option value="Color & Mechas">Color & Mechas</option>
                  <option value="Tratamientos Capilares">Tratamientos Capilares</option>
                  <option value="Facial">Facial</option>
                  <option value="Corporal">Corporal</option>
                  <option value="Depilación Láser">Depilación Láser</option>
                  <option value="Depilación Cera">Depilación Cera</option>
                  <option value="Cejas y Pestañas">Cejas y Pestañas</option>
                  <option value="Maquillaje & Peinados">Maquillaje & Peinados</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precio (€)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newSrvPrice}
                    onChange={(e) => setNewSrvPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duración (min)</label>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    required
                    value={newSrvDuration}
                    onChange={(e) => setNewSrvDuration(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={newSrvDesc}
                  onChange={(e) => setNewSrvDesc(e.target.value)}
                  placeholder="Detalles sobre el producto, técnica o masajes incluidos..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 shadow-sm"
                >
                  Publicar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
