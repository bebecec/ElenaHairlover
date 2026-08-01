// ==========================================
// AUTHENTICATION AND REGISTRATION LOGIC
// ==========================================

function openAuthModal() {
  document.getElementById('auth-modal').style.display = 'flex';
}

function closeAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
}

async function handleRegister(e) {
  e.preventDefault();
  
  const name = document.getElementById('reg-name').value;
  const lastName = document.getElementById('reg-lastname').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  
  // Contraseña autogenerada: Primera letra del nombre + teléfono
  const generatedPassword = name.charAt(0).toUpperCase() + phone;
  
  try {
    const { getAuth, createUserWithEmailAndPassword, getFirestore, doc, setDoc } = window.FirebaseLib;
    const auth = getAuth(window.firebaseApp);
    const db = getFirestore(window.firebaseApp);
    
    // Crear usuario en Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, generatedPassword);
    const user = userCredential.user;
    
    // Guardar en colección clientes
    // Guardar en coleccin clientes
    await setDoc(doc(db, 'clientes', user.uid), {
      name,
      lastName,
      email,
      phone,
      blacklisted: false,
      createdAt: new Date().toISOString()
    });
    
    // Asignar rol de cliente en la coleccin users_roles
    await setDoc(doc(db, 'users_roles', user.uid), {
      role: "client"
    });
    
    alert(`Registro exitoso. Tu contraseña temporal es: ${generatedPassword}`);
    closeAuthModal();
    window.location.reload();
  } catch (error) {
    console.error(error);
    alert('Error al registrar: ' + error.message);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('log-email').value;
  const password = document.getElementById('log-password').value;
  
  try {
    const { getAuth, signInWithEmailAndPassword, getFirestore, doc, getDoc } = window.FirebaseLib;
    const auth = getAuth(window.firebaseApp);
    const db = getFirestore(window.firebaseApp);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check blacklist
    const clientDoc = await getDoc(doc(db, 'clientes', user.uid));
    if (clientDoc.exists() && clientDoc.data().blacklisted) {
      alert('Tu cuenta ha sido restringida. Contacta con el administrador.');
      auth.signOut();
      return;
    }
    
    alert('Inicio de sesión exitoso.');
    closeAuthModal();
    window.location.reload();
  } catch (error) {
    console.error(error);
    alert('Error al iniciar sesión. Comprueba tus credenciales.');
  }
}

function checkAuthState() {
  const { getAuth, onAuthStateChanged, getFirestore, doc, getDoc } = window.FirebaseLib;
  const auth = getAuth(window.firebaseApp);
  const db = getFirestore(window.firebaseApp);
  
  onAuthStateChanged(auth, async (user) => {
    const btn = document.getElementById('auth-nav-btn');
    const mobileBtn = document.getElementById('auth-mobile-btn');
    
    if (user) {
      // Fetch user data
      try {
        const clientDoc = await getDoc(doc(db, 'clientes', user.uid));
        if (clientDoc.exists()) {
          const name = clientDoc.data().name;
          if(btn) {
            btn.textContent = 'Hola, ' + name;
            btn.onclick = () => openProfileModal(user.uid);
          }
          if(mobileBtn) {
            mobileBtn.textContent = 'Hola, ' + name;
            mobileBtn.onclick = () => auth.signOut();
          }
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      if(btn) {
        btn.textContent = 'Acceso Clientes';
        btn.onclick = openAuthModal;
      }
      if(mobileBtn) {
        mobileBtn.textContent = 'Acceso Clientes';
        mobileBtn.onclick = openAuthModal;
      }
    }
  });
}

// Add event listeners on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('register-form')?.addEventListener('submit', handleRegister);
  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  
  // Esperar a que el módulo cargue FirebaseLib y luego inicializar si es necesario
  setTimeout(() => {
    if (window.FirebaseLib && window.useFirebase) {
      if (!window.firebaseApp) {
        window.firebaseApp = window.FirebaseLib.initializeApp(window.firebaseConfig);
      }
      checkAuthState();
    }
  }, 100); // 100ms delay para asegurar que el type="module" ha asignado FirebaseLib
});

async function openProfileModal(uid) {
  const modal = document.getElementById('profile-modal');
  if (modal) modal.style.display = 'flex';
  
  const list = document.getElementById('client-appointments-list');
  if (list) {
    list.innerHTML = 'Cargando citas...';
    try {
      const { getFirestore, collection, getDocs } = window.FirebaseLib;
      const db = getFirestore(window.firebaseApp);
      // It's better to use a query, but for simplicity we fetch all and filter client side
      // Or we can use query/where if we import them, but we didn't export 'where' in index.html module script.
      // So we will just fetch all 'citas' and filter (Not ideal for large scale, but works for now)
      
      const snap = await getDocs(collection(db, "citas"));
      let myCitas = [];
      snap.forEach(doc => {
        const data = doc.data();
        if (data.clientId === uid) {
          myCitas.push({ id: doc.id, ...data });
        }
      });
      
      // Sort by date (descending or ascending)
      myCitas.sort((a,b) => new Date(a.date) - new Date(b.date));
      
      // Filter out past appointments? Let's just show them all.
      
      if (myCitas.length === 0) {
        list.innerHTML = 'No tienes ninguna cita reservada.';
      } else {
        list.innerHTML = myCitas.map(c => 
          '<div style="background:#222; border-left:3px solid #C9A84C; padding:10px; margin-bottom:10px;">' +
            '<div style="color:#FFF; font-weight:bold;">' + c.serviceName + '</div>' +
            '<div style="color:#C9A84C; font-size:0.85rem;">' + c.date + ' a las ' + c.time + '</div>' +
            '<div style="color:#888; font-size:0.8rem;">Estado: ' + (c.status || 'pending') + '</div>' +
          '</div>'
        ).join('');
      }
    } catch (e) {
      console.error(e);
      list.innerHTML = 'Error al cargar citas.';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('btn-client-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      const { getAuth } = window.FirebaseLib;
      const auth = getAuth(window.firebaseApp);
      auth.signOut().then(() => {
        document.getElementById('profile-modal').style.display = 'none';
        window.location.reload();
      });
    });
  }
});
