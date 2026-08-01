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
  
  // Search logic
  const searchInput = document.getElementById('search-service');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.service-item').forEach(item => {
        const name = item.querySelector('span').textContent.toLowerCase();
        if (name.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
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
    catDiv.className = 'mb-4';
    
    // Botón de acordeón
    const btn = document.createElement('button');
    btn.className = 'service-category-btn w-full text-left';
    btn.innerHTML = `
      <span class="text-gold-warm font-bold text-lg">${catName}</span>
      <span class="bg-gold-warm/20 text-gold-warm text-xs px-2 py-1 rounded">${catServices.length} servicios <span class="ml-1 opacity-60">▼</span></span>
    `;
    
    // Contenido del acordeón
    const content = document.createElement('div');
    content.className = 'service-category-content';
    
    catServices.forEach(s => {
      const duration = s.duration || '60 min';
      const item = document.createElement('div');
      item.className = 'service-item flex justify-between items-center py-4 border-b border-[#333] last:border-0';
      item.innerHTML = `
        <div class="flex-1 pr-4">
          <span class="block text-white font-medium">${s.name}</span>
          <span class="block text-white/50 text-sm">${duration}</span>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gold-warm font-bold whitespace-nowrap">${s.price}</span>
          <button class="btn-reservar whitespace-nowrap text-sm uppercase tracking-wider" data-id="${s.id}">Reservar</button>
        </div>
      `;
      content.appendChild(item);
    });
    
    // Event listener para el acordeón
    btn.addEventListener('click', () => {
      content.classList.toggle('open');
      const arrow = btn.querySelector('.ml-1');
      if (content.classList.contains('open')) {
        arrow.textContent = '▲';
      } else {
        arrow.textContent = '▼';
      }
    });
    
    // Abrir la primera categoría por defecto
    if (Object.keys(categorias).indexOf(catName) === 0) {
      content.classList.add('open');
      btn.querySelector('.ml-1').textContent = '▲';
    }
    
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

async function loadDisponibilidad(date) {
  const slotsContainer = document.getElementById('time-slots');
  slotsContainer.innerHTML = '<div class="col-span-3 text-white/40 text-center text-sm py-4">Cargando horas...</div>';
  selectedTime = null;
  document.getElementById('btn-confirmar').disabled = true;
  
  try {
    const snapshot = await firebase.firestore().collection('citas').where('date', '==', date).get();
    citasReservadas = snapshot.docs.map(doc => doc.data());
    
    const occupiedTimes = citasReservadas.filter(c => c.status !== 'cancelled').map(c => c.time);
    renderTimeSlots(occupiedTimes);
  } catch(e) {
    console.error(e);
    slotsContainer.innerHTML = '<div class="col-span-3 text-red-500 text-center text-sm py-4">Error al cargar</div>';
  }
}

function renderTimeSlots(occupiedTimes) {
  const container = document.getElementById('time-slots');
  container.innerHTML = '';
  
  let validSlots = 0;
  
  allTimeSlots.forEach(time => {
    const isOccupied = occupiedTimes.includes(time);
    
    const div = document.createElement('div');
    div.className = `time-slot p-2 border border-gold-warm/30 text-center text-sm cursor-pointer transition-colors ${isOccupied ? 'disabled opacity-30 pointer-events-none' : 'hover:bg-gold-warm hover:text-black'}`;
    div.textContent = time;
    
    if (!isOccupied) {
      validSlots++;
      div.onclick = () => {
        document.querySelectorAll('.time-slot').forEach(el => {
          el.classList.remove('bg-gold-warm', 'text-black', 'selected');
        });
        div.classList.add('bg-gold-warm', 'text-black', 'selected');
        selectedTime = time;
        document.getElementById('btn-confirmar').disabled = false;
      };
    }
    
    container.appendChild(div);
  });
  
  if (validSlots === 0) {
    container.innerHTML = '<div class="col-span-3 text-white/50 text-center text-sm py-4">No hay horas disponibles este día</div>';
  }
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
