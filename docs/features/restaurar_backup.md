# Documentación: Restaurar Respaldo (Restore Backup)

> [!WARNING]
> **Estado Actual: Desarrollo Local (Base de datos pendiente)**
> Actualmente el proyecto se encuentra en fase de desarrollo local sin una base de datos Firebase activa. La restauración leerá el archivo JSON subido pero guardará los datos temporalmente en el `localStorage` del navegador.

## 📦 Dependencias (Fase Final / Pendiente)
Cuando se integre la base de datos, se usará:
- `setDoc`, `addDoc`, `deleteDoc` de `firebase-firestore.js`

**Nativas del Navegador (Activas actualmente):**
- `FileReader`: Para leer el contenido del archivo subido.
- `<input type="file">`

## 🛠 Lógica y Flujo en Desarrollo Local (Mock)
1. Administrador selecciona el archivo de respaldo (`.json`) desde "Importar / Restaurar".
2. `FileReader` lee el archivo de texto y lo convierte a objeto con `JSON.parse()`.
3. Validar que la estructura sea correcta (que contenga `reservas`, `galeria`, etc).
4. Guardar los datos extraídos sobrescribiendo el `localStorage` actual:
   ```javascript
   localStorage.setItem('reservas', JSON.stringify(importData.reservas));
   localStorage.setItem('galeria', JSON.stringify(importData.galeria));
   ```
5. Notificar al administrador que los datos locales fueron restaurados.
6. Refrescar la pantalla de administración para mostrar los nuevos datos cargados desde el almacenamiento local.
