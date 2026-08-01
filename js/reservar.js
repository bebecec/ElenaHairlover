// ==========================================
// RESERVAS LOGIC
// ==========================================

let currentUser = null;
let currentClientData = null;
let servicios = [];
let citasReservadas = [];

// Base hours (10:00 to 18:00 every 30 mins)
const allTimeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

document.addEventListener('DOMContentLoaded', () => {
  if (firebase) {
    firebase.auth().onAuthStateChanged(async (user) => {
      currentUser = user;
      if (user) {
        // Get client data to check blacklist
        const doc = await firebase.firestore().collection('clientes').doc(user.uid).get();
        if (doc.exists) {
          currentClientData = doc.data();
          if (currentClientData.blacklisted) {
            alert('Tu cuenta ha sido restringida. No puedes realizar reservas.');
            window.location.href = 'index.html';
          }
        }
      } else {
        alert('Debes iniciar sesión para reservar.');
        window.location.href = 'index.html';
      }
    });

    loadServicios();
  }
  
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('book-date').setAttribute('min', today);
  
  document.getElementById('book-date').addEventListener('change', loadDisponibilidad);
  document.getElementById('book-service').addEventListener('change', updateServiceDuration);
  document.getElementById('booking-form').addEventListener('submit', handleBookingSubmit);
});

function updateServiceDuration() {
  const serviceId = document.getElementById('book-service').value;
  const container = document.getElementById('service-duration-container');
  const textEl = document.getElementById('service-duration-text');
  
  if (!serviceId) {
    container.style.display = 'none';
    return;
  }
  
  const service = servicios.find(s => s.id === serviceId);
  // Default to 60 min if duration not set
  const duration = service && service.duration ? service.duration : '60 min';
  
  textEl.textContent = duration;
  container.style.display = 'flex';
}

async function loadServicios() {
  const select = document.getElementById('book-service');
  try {
    const snapshot = await firebase.firestore().collection('servicios').get();
    servicios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    select.innerHTML = '<option value="">Elige un servicio...</option>' + 
      servicios.map(s => `<option value="${s.id}">${s.name} - ${s.price}</option>`).join('');
  } catch(e) {
    console.error(e);
    select.innerHTML = '<option value="">Error cargando servicios</option>';
  }
}

async function loadDisponibilidad() {
  const date = document.getElementById('book-date').value;
  if (!date) return;
  
  const slotsContainer = document.getElementById('time-slots');
  slotsContainer.innerHTML = 'Cargando horas...';
  
  try {
    // Get all appointments for this date
    const snapshot = await firebase.firestore().collection('citas').where('date', '==', date).get();
    citasReservadas = snapshot.docs.map(doc => doc.data());
    
    // Calculate disabled slots
    const occupiedTimes = citasReservadas.filter(c => c.status !== 'cancelled').map(c => c.time);
    
    renderTimeSlots(occupiedTimes);
  } catch(e) {
    console.error(e);
    slotsContainer.innerHTML = 'Error al cargar disponibilidad';
  }
}

function renderTimeSlots(occupiedTimes) {
  const container = document.getElementById('time-slots');
  container.innerHTML = '';
  
  allTimeSlots.forEach(time => {
    const isOccupied = occupiedTimes.includes(time);
    
    const div = document.createElement('div');
    div.className = `time-slot ${isOccupied ? 'disabled' : ''}`;
    div.textContent = time;
    
    if (!isOccupied) {
      div.onclick = () => {
        // Deselect all
        document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
        // Select this
        div.classList.add('selected');
        document.getElementById('book-time').value = time;
      };
    }
    
    container.appendChild(div);
  });
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  
  if (!currentUser || !currentClientData) return;
  
  const serviceId = document.getElementById('book-service').value;
  const date = document.getElementById('book-date').value;
  const time = document.getElementById('book-time').value;
  
  if (!serviceId || !date || !time) {
    alert('Por favor completa todos los campos.');
    return;
  }
  
  const service = servicios.find(s => s.id === serviceId);
  
  const btn = document.getElementById('submit-booking');
  btn.disabled = true;
  btn.textContent = 'Procesando...';
  
  try {
    const duration = service.duration ? service.duration : '60 min';
    await firebase.firestore().collection('citas').add({
      clientId: currentUser.uid,
      clientName: currentClientData.name + ' ' + (currentClientData.lastName || ''),
      clientEmail: currentClientData.email,
      clientPhone: currentClientData.phone,
      serviceId: service.id,
      serviceName: service.name,
      serviceDuration: duration,
      date: date,
      time: time,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    document.getElementById('booking-container').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
    
    document.getElementById('conf-date').textContent = date;
    document.getElementById('conf-time').textContent = time;
    
  } catch(e) {
    console.error(e);
    alert('Error al guardar la reserva.');
    btn.disabled = false;
    btn.textContent = 'Confirmar Reserva';
  }
}
