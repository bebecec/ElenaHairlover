// Configuración de Firebase para Elena Hairlover
// Si no configuras tu proyecto de Firebase, el sistema utilizará localStorage de forma automática
// para que puedas probar todo el panel de administración de inmediato.
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Activa Firebase automáticamente si las credenciales son configuradas por el usuario
const useFirebase = firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_API_KEY";
window.firebaseConfig = firebaseConfig;
window.useFirebase = useFirebase;
