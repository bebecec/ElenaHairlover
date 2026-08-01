// ==============================================================
// GESTION DE AGENDA Y CLIENTES (NUEVO)
// ==============================================================
let citas = [];
let clientes = [];

async function fetchCitas() {
  if (window.useFirebase) {
    const { collection, getDocs, query, orderBy } = window.FirebaseLib;
    try {
      const q = query(collection(db, 'citas'), orderBy('date', 'desc'), orderBy('time', 'asc'));
      const snapshot = await getDocs(q);
      citas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error('Error fetching citas:', e);
    }
  } else {
    const local = localStorage.getItem('app_citas');
    citas = local ? JSON.parse(local) : [];
  }
  renderAgendaTable();
}

async function fetchClientes() {
  if (window.useFirebase) {
    const { collection, getDocs } = window.FirebaseLib;
    try {
      const snapshot = await getDocs(collection(db, 'clientes'));
      clientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error('Error fetching clientes:', e);
    }
  } else {
    const local = localStorage.getItem('app_clientes');
    clientes = local ? JSON.parse(local) : [];
  }
  renderClientsTable();
}

function renderAgendaTable() {
  const tbody = document.getElementById('agenda-tbody');
  if (!tbody) return;
  
  const selectedDate = document.getElementById('agenda-date-picker')?.value;
  
  let filtered = citas;
  if (selectedDate) {
    filtered = citas.filter(c => c.date === selectedDate);
  }
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay citas para esta fecha.</td></tr>';
    return;
  }
  
  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td>${c.time}</td>
      <td>${c.clientName || 'Sin Nombre'}</td>
      <td>${c.serviceName || 'Servicio General'}</td>
      <td>${c.clientPhone || '-'}</td>
      <td>
        <select class="form-control" style="width:auto;" onchange="updateCitaStatus('${c.id}', this.value)">
          <option value="pending" ${c.status === 'pending' ? 'selected' : ''}>Pendiente</option>
          <option value="confirmed" ${c.status === 'confirmed' ? 'selected' : ''}>Confirmada</option>
          <option value="cancelled" ${c.status === 'cancelled' ? 'selected' : ''}>Cancelada</option>
        </select>
      </td>
      <td>
        <button class="btn btn--danger-outline" onclick="deleteCita('${c.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

function renderClientsTable() {
  const tbody = document.getElementById('clients-tbody');
  if (!tbody) return;
  
  const search = document.getElementById('client-search')?.value.toLowerCase() || '';
  
  let filtered = clientes;
  if (search) {
    filtered = clientes.filter(c => 
      (c.email && c.email.toLowerCase().includes(search)) || 
      (c.phone && c.phone.includes(search)) ||
      (c.name && c.name.toLowerCase().includes(search))
    );
  }
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay clientes.</td></tr>';
    return;
  }
  
  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td>${c.name} ${c.lastName || ''}</td>
      <td>${c.email || '-'}</td>
      <td>${c.phone || '-'}</td>
      <td>
        <label style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" ${c.blacklisted ? 'checked' : ''} onchange="toggleBlacklist('${c.id}', this.checked)" />
          SÃ­
        </label>
      </td>
      <td>
        <button class="btn btn--secondary-outline" style="margin-right: 5px;" onclick="resetClientPassword('${c.email}')">Restablecer Clave</button>
        <button class="btn btn--danger-outline" onclick="deleteCliente('${c.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

window.updateCitaStatus = async function(id, status) {
  if (window.useFirebase) {
    const { doc, updateDoc } = window.FirebaseLib;
    await updateDoc(doc(db, 'citas', id), { status });
  } else {
    citas = citas.map(c => c.id === id ? { ...c, status } : c);
    localStorage.setItem('app_citas', JSON.stringify(citas));
  }
  fetchCitas();
};

window.deleteCita = async function(id) {
  if(confirm('Â¿Eliminar esta cita?')) {
    if (window.useFirebase) {
      const { doc, deleteDoc } = window.FirebaseLib;
      await deleteDoc(doc(db, 'citas', id));
    } else {
      citas = citas.filter(c => c.id !== id);
      localStorage.setItem('app_citas', JSON.stringify(citas));
    }
    fetchCitas();
  }
};

window.toggleBlacklist = async function(id, isBlacklisted) {
  if (window.useFirebase) {
    const { doc, updateDoc } = window.FirebaseLib;
    await updateDoc(doc(db, 'clientes', id), { blacklisted: isBlacklisted });
  } else {
    clientes = clientes.map(c => c.id === id ? { ...c, blacklisted: isBlacklisted } : c);
    localStorage.setItem('app_clientes', JSON.stringify(clientes));
  }
  fetchClientes();
};

window.deleteCliente = async function(id) {
  if(confirm('Â¿Eliminar este cliente?')) {
    if (window.useFirebase) {
      const { doc, deleteDoc } = window.FirebaseLib;
      await deleteDoc(doc(db, 'clientes', id));
    } else {
      clientes = clientes.filter(c => c.id !== id);
      localStorage.setItem('app_clientes', JSON.stringify(clientes));
    }
    fetchClientes();
  }
};

document.getElementById('agenda-date-picker')?.addEventListener('change', renderAgendaTable);
document.getElementById('client-search')?.addEventListener('input', renderClientsTable);

// Add to original loadData function (using monkey patch)
const originalLoadData = loadData;
loadData = function() {
  if (typeof originalLoadData === 'function') originalLoadData();
  fetchCitas();
  fetchClientes();
};

async function resetClientPassword(email) {
  if (!email) {
    showToast('El cliente no tiene un correo electrónico válido.', 'error');
    return;
  }
  
  if (!window.useFirebase || !window.FirebaseLib) {
    showToast('Firebase no está activado.', 'error');
    return;
  }
  
  if (!confirm('¿Estás seguro de enviar un correo a ' + email + ' para restablecer su contraseña?')) return;
  
  try {
    const { getAuth, sendPasswordResetEmail } = window.FirebaseLib;
    const auth = getAuth(window.firebaseApp);
    await sendPasswordResetEmail(auth, email);
    showToast('Correo de restablecimiento enviado a ' + email, 'success');
  } catch (err) {
    console.error('Error al enviar correo de reset:', err);
    showToast('Error al enviar el correo: ' + err.message, 'error');
  }
}
window.resetClientPassword = resetClientPassword;

