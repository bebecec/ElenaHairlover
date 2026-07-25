# Documentación: Cerrar Sesión (Logout)

> [!WARNING]
> **Estado Actual: Desarrollo Local (Base de datos pendiente)**
> Actualmente el proyecto se encuentra en fase de desarrollo local. La integración real con Firebase Auth está pendiente. Por ahora, el cierre de sesión se simula limpiando el almacenamiento local del navegador (`localStorage`).

## 📦 Dependencias (Fase Final / Pendiente)
Cuando se integre la base de datos, se usarán:
- `getAuth`, `signOut`, `onAuthStateChanged` de `firebase-auth.js`

## 🛠 Lógica y Flujo en Desarrollo Local (Mock)
1. Detectar el clic del usuario en el botón de "Cerrar Sesión" (`#btnLogout`).
2. Remover el flag de sesión del navegador: `localStorage.removeItem('isAdminLoggedIn')`.
3. Ejecutar la redirección automática al archivo `index.html` (portada pública).
4. Limpiar cualquier variable de memoria asociada al panel de administración.

*Nota: Una vez conectada la base de datos, el cierre de sesión revocará los tokens reales de Firebase.*
