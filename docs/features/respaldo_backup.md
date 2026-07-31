# Documentación: Respaldo de Base de Datos (Backup)

> [!NOTE]
> **Estado Actual: Implementado (Soporte local completo)**
> Esta funcionalidad permite a la administradora del salón crear descargas de seguridad y restaurar de forma íntegra todo el contenido cargado localmente (servicios, categorías, configuraciones del salón, fotos del carrusel, galería de imágenes y opiniones de Google).

## 📦 Dependencias
**Nativas del Navegador:**
- `Blob`: Para encapsular el JSON en un objeto descargable.
- `URL.createObjectURL()`: Para generar el enlace dinámico de descarga local.
- `FileReader`: Para leer localmente el archivo JSON subido por la administradora al restaurar.

## 🛠 Lógica y Flujo de Respaldo & Restauración
1. **Exportación:**
   - La administradora hace clic en "Exportar Copia de Seguridad".
   - El sistema empaqueta las claves de `localStorage` (`elegance_services`, `elegance_categories`, `elegance_salon_info`, `elegance_gallery`, `elegance_hero` y `elegance_google_reviews`).
   - Se crea un archivo descargable con formato: `elena_hairlover_backup_YYYY-MM-DD.json`.

2. **Restauración:**
   - La administradora selecciona un archivo de respaldo en formato `.json`.
   - Hace clic en "Restaurar Datos".
   - El sistema lee el archivo, valida su estructura básica y, si es correcto, sobreescribe las claves en el navegador y reinicia la pestaña de inmediato para reflejar los cambios.
