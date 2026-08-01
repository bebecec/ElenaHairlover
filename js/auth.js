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
    await setDoc(doc(db, 'clientes', user.uid), {
      name,
      lastName,
      email,
      phone,
      blacklisted: false,
      createdAt: new Date().toISOString()
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
            btn.onclick = () => auth.signOut();
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
