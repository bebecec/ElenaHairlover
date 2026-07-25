# Documentación: Iniciar Sesión (Login)

> [!WARNING]
> **Estado Actual: Desarrollo Local (Base de datos pendiente)**
> Actualmente el proyecto se encuentra en fase de desarrollo local. La integración real con Firebase Auth está pendiente. Por ahora, el inicio de sesión se puede simular usando datos locales (`localStorage`).

## 📦 Dependencias (Fase Final / Pendiente)
Cuando se integre la base de datos, se usarán las siguientes dependencias de Firebase:
- `initializeApp` de `firebase-app.js`
- `getAuth`, `signInWithEmailAndPassword`, `onAuthStateChanged` de `firebase-auth.js`

## 🛠 Lógica y Flujo en Desarrollo Local (Mock)
1. Capturar el correo y contraseña desde el formulario `HTML` (`#loginForm`).
2. Validar credenciales quemadas en el código (ej. `admin@salon.com` / `123456`) para propósitos de prueba.
3. Si es exitoso: Guardar un flag en `localStorage` (ej. `localStorage.setItem('isAdminLoggedIn', 'true')`) y redirigir al panel `admin.html`.
4. Si falla: Mostrar mensaje de error simulado.

*Nota: Una vez conectada la base de datos, esta lógica será reemplazada por las peticiones reales a Firebase Auth descritas en la sección de dependencias.*
