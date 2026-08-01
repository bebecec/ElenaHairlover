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
        const rolesSnapshot = await getDocs(collection(db, 'users_roles'));
        
        const rolesMap = {};
        rolesSnapshot.docs.forEach(doc => {
          rolesMap[doc.id] = doc.data().role;
        });

        clientes = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          role: rolesMap[doc.id] || 'client',
          ...doc.data() 
        }));
      } catch (e) {
        console.error('Error fetching clientes:', e);
      }
    } else {
      const local = localStorage.getItem('app_clientes');
      if (local) clientes = JSON.parse(local);
    }
    renderClientsTable();
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


window.changeClientRole = async function(uid, newRole) {
  if (window.useFirebase) {
    try {
      await window.FirebaseLib.setDoc(window.FirebaseLib.doc(db, "users_roles", uid), { role: newRole });
      alert("Rol actualizado correctamente. El usuario tendrá los nuevos permisos en su próximo inicio de sesión.");
    } catch (err) {
      console.error("Error al asignar rol:", err);
      alert("Error al asignar rol: " + err.message);
    }
  }
};
