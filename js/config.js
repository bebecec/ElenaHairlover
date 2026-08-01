// Configuración de Firebase para Elena Hairlover
// Si no configuras tu proyecto de Firebase, el sistema utilizará localStorage de forma automática
// para que puedas probar todo el panel de administración de inmediato.
const firebaseConfig = {
  apiKey: "AIzaSyCSRMSJBphzjxhN6ZBhJzB_yJeg7iYTxcc",
  authDomain: "elena-hairlover.firebaseapp.com",
  projectId: "elena-hairlover",
  storageBucket: "elena-hairlover.firebasestorage.app",
  messagingSenderId: "241566307898",
  appId: "1:241566307898:web:be86713ac4b09dbc874703",
  measurementId: "G-PLWC70Y609"
};

// Activa Firebase automáticamente si las credenciales son configuradas por el usuario
const useFirebase = firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_API_KEY";
window.firebaseConfig = firebaseConfig;
window.useFirebase = useFirebase;
