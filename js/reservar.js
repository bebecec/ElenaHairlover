// ==========================================
// RESERVAS LOGIC - REDESIGNED UX
// ==========================================

let currentUser = null;
let currentClientData = null;
let servicios = [];
let categorias = {};
let citasReservadas = [];

let selectedService = null;
let selectedDateStr = null;
let selectedTime = null;

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Base hours
const allTimeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

document.addEventListener('DOMContentLoaded', () => {
  if (window.firebase) {
    firebase.auth().onAuthStateChanged(async (user) => {
      currentUser = user;
      if (user) {
        // Get client data to check blacklist
        const doc = await firebase.firestore().collection('clientes').doc(user.uid).get();
        if (doc.exists) {
          currentClientData = doc.data();
          if (currentClientData.blacklisted) {
            alert('Tu cuenta ha sido restringida. No puedes realizar reservas.');
            currentUser = null;
          }
        }
      }
    });

    loadServicios();
  }
  
  // Modal Event Listeners
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
  document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
  document.getElementById('btn-confirmar').addEventListener('click', handleBookingSubmit);
  
  // Search logic removed as requested by user
});

async function loadServicios() {
  const container = document.getElementById('services-container');
  try {
    const snapshot = await firebase.firestore().collection('servicios').get();
    servicios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Agrupar por categoría
    categorias = {};
    servicios.forEach(s => {
      const cat = s.category || 'Otros';
      if (!categorias[cat]) categorias[cat] = [];
      categorias[cat].push(s);
    });
    
    renderCategorias();
  } catch(e) {
    console.error(e);
    container.innerHTML = '<div class="text-center text-red-500 py-10">Error al cargar los servicios</div>';
  }
}

function renderCategorias() {
  const container = document.getElementById('services-container');
  container.innerHTML = '';
  
  for (const catName in categorias) {
    const catServices = categorias[catName];
    
    // Contenedor principal de la categoría
    const catDiv = document.createElement('div');
    catDiv.className = 'service-category-card mb-3 bg-white rounded-lg border border-gray-300 overflow-hidden transition-colors duration-300';
    
    // Botón de acordeón
    const btn = document.createElement('button');
    btn.className = 'w-full text-left p-4 flex justify-between items-center bg-white outline-none';
    btn.innerHTML = `
      <span class="text-gray-800 font-medium text-lg">${catName}</span>
      <div class="flex items-center space-x-3">
        <span class="bg-[#C9A84C]/20 text-[#C9A84C] font-bold text-sm px-3 py-1 rounded-md">${catServices.length} servicios</span>
        <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-300 icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </div>
    `;
    
    // Contenido del acordeón
    const content = document.createElement('div');
    content.className = 'service-category-content hidden bg-white px-4 pb-2 border-t border-gray-100';
    
    catServices.forEach(s => {
      const duration = s.duration || '60 min';
      const descHTML = s.description ? `<span class="block text-gray-500 text-sm mt-1">${s.description}</span>` : '';
      const item = document.createElement('div');
      item.className = 'service-item flex justify-between items-center py-4 border-b border-gray-200 last:border-0';
      item.innerHTML = `
        <div class="flex-1 pr-4">
          <span class="block text-gray-800 font-medium">${s.name}</span>
          ${descHTML}
        </div>
        <div class="flex items-center space-x-4 text-right">
          <div>
            <span class="block text-gray-800 font-medium">${s.price}</span>
            <span class="block text-gray-500 text-sm">${duration}</span>
          </div>
          <button class="bg-[#C9A84C] hover:bg-[#b09341] text-black font-medium py-2 px-4 rounded shadow-sm transition-colors uppercase tracking-wide text-sm" data-id="${s.id}">Reservar</button>
        </div>
      `;
      content.appendChild(item);
    });
    
    // Event listener para el acordeón
    btn.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');
      
      // Cerrar todos los demás
      document.querySelectorAll('.service-category-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.service-category-card').forEach(el => el.classList.remove('border-[#C9A84C]'));
      document.querySelectorAll('.icon-arrow').forEach(el => {
        el.classList.remove('rotate-90');
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        catDiv.classList.add('border-[#C9A84C]');
        btn.querySelector('.icon-arrow').classList.add('rotate-90');
      }
    });
    
    catDiv.appendChild(btn);
    catDiv.appendChild(content);
    container.appendChild(catDiv);
  }
  
  // Agregar eventos a los botones de reservar
  document.querySelectorAll('.btn-reservar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceId = e.target.getAttribute('data-id');
      openBookingModal(serviceId);
    });
  });
}

function openBookingModal(serviceId) {
  if (!currentUser) {
    const irLogin = confirm("Para reservar una cita, necesitas iniciar sesión o registrarte gratis. ¿Deseas ir a la página de inicio para hacerlo?");
    if (irLogin) {
      window.location.href = "index.html";
    }
    return;
  }
  
  selectedService = servicios.find(s => s.id === serviceId);
  if (!selectedService) return;
  
  // Resetear selección
  selectedDateStr = null;
  selectedTime = null;
  document.getElementById('time-slots').innerHTML = '<div class="col-span-3 text-white/40 text-center text-sm py-4">Selecciona un día en el calendario</div>';
  document.getElementById('btn-confirmar').disabled = true;
  
  // Actualizar Modal info
  document.getElementById('modal-service-name').textContent = selectedService.name;
  document.getElementById('modal-price').textContent = selectedService.price;
  
  const dur = selectedService.duration || '60 min';
  document.getElementById('modal-duration').textContent = dur;
  document.getElementById('modal-total').textContent = selectedService.price;
  
  // Mostrar modal
  const modal = document.getElementById('booking-modal');
  modal.classList.remove('opacity-0', 'pointer-events-none');
  
  renderCalendar();
}

function closeModal() {
  const modal = document.getElementById('booking-modal');
  modal.classList.add('opacity-0', 'pointer-events-none');
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function renderCalendar() {
  const label = document.getElementById('current-month');
  label.textContent = `${monthNames[currentMonth]} de ${currentYear}`;
  
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';
  
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Ajustar para que Lunes sea el primer día de la semana
  let emptyDays = firstDay === 0 ? 6 : firstDay - 1;
  
  for (let i = 0; i < emptyDays; i++) {
    const div = document.createElement('div');
    div.className = 'calendar-day empty';
    grid.appendChild(div);
  }
  
  const today = new Date();
  today.setHours(0,0,0,0);
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(currentYear, currentMonth, i);
    const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    
    const div = document.createElement('div');
    div.className = 'calendar-day';
    div.textContent = i;
    
    if (dateObj < today) {
      div.classList.add('disabled');
    } else {
      if (selectedDateStr === dateStr) {
        div.classList.add('selected');
      }
      div.onclick = () => {
        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        div.classList.add('selected');
        selectedDateStr = dateStr;
        loadDisponibilidad(dateStr);
      };
    }
    
    grid.appendChild(div);
  }
}

// Helpers para cálculo de tiempo
function parseDurationToMinutes(durationStr) {
  if (!durationStr) return 60;
  let mins = 0;
  const hMatch = durationStr.match(/(\d+)\s*h/i);
  if (hMatch) mins += parseInt(hMatch[1]) * 60;
  const mMatch = durationStr.match(/(\d+)\s*min/i);
  if (mMatch) mins += parseInt(mMatch[1]);
  if (mins === 0) {
    const raw = parseInt(durationStr);
    if (!isNaN(raw)) mins = raw;
    else mins = 60; // fallback
  }
  return mins;
}

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

async function loadDisponibilidad(date) {
  const slotsContainer = document.getElementById('time-slots');
  slotsContainer.innerHTML = '<div class="text-gray-400 text-sm py-4 w-full text-center">Cargando horas...</div>';
  selectedTime = null;
  document.getElementById('btn-confirmar').disabled = true;
  
  try {
    const snapshot = await firebase.firestore().collection('citas').where('date', '==', date).get();
    citasReservadas = snapshot.docs.map(doc => doc.data());
    
    // Obtener bloques ocupados
    const blockedIntervals = citasReservadas
      .filter(c => c.status !== 'cancelled')
      .map(c => {
        const startMins = timeToMinutes(c.time);
        const durationMins = parseDurationToMinutes(c.serviceDuration);
        return { start: startMins, end: startMins + durationMins };
      });
      
    // Servicio actual que queremos reservar
    const currentServiceDuration = parseDurationToMinutes(selectedService.duration);
    
    // Asumimos hora de cierre a las 20:00 (1200 mins) para que quepan servicios largos, o 18:00 (1080 mins).
    // Usaremos 19:00 (1140 mins) como cierre estándar.
    const closingTime = 1140; 
    
    const availableSlots = [];
    
    allTimeSlots.forEach(time => {
      const startMins = timeToMinutes(time);
      const endMins = startMins + currentServiceDuration;
      
      // Comprobar si termina después del cierre
      if (endMins > closingTime) return;
      
      // Comprobar si se solapa con algún bloque ocupado
      let overlaps = false;
      for (const block of blockedIntervals) {
        // Solapamiento si: [start, end] intersecta [block.start, block.end]
        // Se intersectan si startMins < block.end && endMins > block.start
        if (startMins < block.end && endMins > block.start) {
          overlaps = true;
          break;
        }
      }
      
      if (!overlaps) {
        availableSlots.push(time);
      }
    });

    renderTimeSlots(availableSlots);
  } catch(e) {
    console.error(e);
    slotsContainer.innerHTML = '<div class="text-red-500 text-center text-sm py-4 w-full">Error al cargar disponibilidad</div>';
  }
}

function renderTimeSlots(availableSlots) {
  const container = document.getElementById('time-slots');
  container.innerHTML = '';
  
  if (availableSlots.length === 0) {
    container.innerHTML = '<div class="text-gray-500 text-center text-sm py-4 w-full">No hay huecos disponibles para la duración de este servicio. Prueba otro día.</div>';
    return;
  }
  
  availableSlots.forEach(time => {
    const div = document.createElement('div');
    div.className = 'time-slot text-gray-700 text-sm cursor-pointer transition-colors hover:border-[#C9A84C] hover:text-[#C9A84C]';
    div.textContent = time;
    
    div.onclick = () => {
      document.querySelectorAll('.time-slot').forEach(el => {
        el.classList.remove('selected', 'bg-[#C9A84C]', 'text-white', 'border-[#C9A84C]');
        el.classList.add('text-gray-700');
      });
      div.classList.remove('text-gray-700', 'hover:text-[#C9A84C]');
      div.classList.add('selected');
      selectedTime = time;
      document.getElementById('btn-confirmar').disabled = false;
    };
    
    container.appendChild(div);
  });
}

async function handleBookingSubmit() {
  if (!currentUser || !currentClientData || !selectedService || !selectedDateStr || !selectedTime) return;
  
  const btn = document.getElementById('btn-confirmar');
  btn.disabled = true;
  btn.textContent = 'PROCESANDO...';
  
  try {
    const duration = selectedService.duration ? selectedService.duration : '60 min';
    await firebase.firestore().collection('citas').add({
      clientId: currentUser.uid,
      clientName: currentClientData.name + ' ' + (currentClientData.lastName || ''),
      clientEmail: currentClientData.email,
      clientPhone: currentClientData.phone || '',
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceDuration: duration,
      date: selectedDateStr,
      time: selectedTime,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    closeModal();
    
    // Ocultar la lista y mostrar el mensaje de éxito
    document.getElementById('services-container').style.display = 'none';
    document.querySelector('.mb-6.relative').style.display = 'none'; // ocultar barra busqueda
    document.getElementById('success-msg').style.display = 'block';
    
    document.getElementById('conf-date').textContent = selectedDateStr;
    document.getElementById('conf-time').textContent = selectedTime;
    document.getElementById('conf-service').textContent = selectedService.name;
    
  } catch(e) {
    console.error(e);
    alert('Error al guardar la reserva. Por favor intenta nuevamente.');
    btn.disabled = false;
    btn.textContent = 'CONFIRMAR';
  }
}
