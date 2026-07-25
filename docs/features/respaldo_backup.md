# Documentación: Respaldo de Base de Datos (Backup)

> [!WARNING]
> **Estado Actual: Desarrollo Local (Base de datos pendiente)**
> Actualmente el proyecto se encuentra en fase de desarrollo local sin una base de datos Firebase conectada. Por ahora, el "respaldo" genera un archivo con los datos que existan temporalmente en el `localStorage` o arrays en memoria.

## 📦 Dependencias (Fase Final / Pendiente)
Cuando se integre Firestore, se requerirá:
- `getFirestore`, `collection`, `getDocs` de `firebase-firestore.js`

**Nativas del Navegador (Activas actualmente):**
- `Blob`: Para generar el objeto de tipo `application/json`.
- `URL.createObjectURL()`: Para crear el enlace de descarga.

## 🛠 Lógica y Flujo en Desarrollo Local (Mock)
1. Administrador hace clic en "Exportar / Respaldo".
2. El script recolecta los datos temporales del `localStorage` (ej. `localStorage.getItem('reservas')`).
3. Agrupa los datos en un objeto local:
   ```javascript
   const backupData = {
     reservas: JSON.parse(localStorage.getItem('reservas')) || [],
     galeria: JSON.parse(localStorage.getItem('galeria')) || []
   };
   ```
4. Convierte el objeto a string: `JSON.stringify(backupData, null, 2)`.
5. Genera el archivo `Blob` y desencadena la descarga local simulando un clic en la etiqueta `<a>`.
