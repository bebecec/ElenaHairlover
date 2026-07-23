// ═══════════════════════════════════════════════════════════
// ELEGANCE BY STOICA — Lógica del Panel de Administración Híbrido
// ═══════════════════════════════════════════════════════════

// Semilla inicial de datos para poblar el sistema la primera vez
const initialServicesSeed = [
  // Facial
  { id: "f1", name: "Tratamiento de la mirada T3", duration: "1 hora — Cuidado especial del contorno ocular", price: "55,00 €", category: "facial" },
  { id: "f2", name: "Fotorejuvenecimiento IPL con FHOS", duration: "40 min — Luminosidad y firmeza celular", price: "85,00 €", category: "facial" },
  { id: "f3", name: "Carbón Activo FHOS Bioluminiscente", duration: "25 min — Tratamiento rejuvenecedor con IPL Protheus", price: "60,00 €", category: "facial" },
  { id: "f4", name: "Dermo Peel Expert T3", duration: "50 min — Exfoliación profunda y renovación celular", price: "55,00 €", category: "facial" },
  { id: "f5", name: "Higiene Hidro Detox T3", duration: "1h 30min — Desintoxicación profunda de la piel", price: "55,00 €", category: "facial" },
  { id: "f6", name: "Vitamina C con Células Madre T3", duration: "1h 20min — Tratamiento antioxidante e iluminador", price: "65,00 €", category: "facial" },
  { id: "f7", name: "Tratamiento Anti-edad Vinci", duration: "1 hora — Reafirmación y reducción de arrugas", price: "75,00 €", category: "facial" },
  { id: "f8", name: "Doble Mentón T3", duration: "1 hora — Remodelación y reducción localizada de papada", price: "50,00 €", category: "facial" },
  { id: "f9", name: "Juventud Definitiva Celular 3 T3", duration: "1h 20min — Regeneración celular intensiva", price: "65,00 €", category: "facial" },
  { id: "f10", name: "Diagnóstico Facial", duration: "15 min — Evaluación detallada sin compromiso", price: "Gratuito", category: "facial" },
  
  // Corporal
  { id: "c1", name: "Tratamiento Reafirmante Protheus con FHOS", duration: "40 min — Remodelación y tonificación con aparatología", price: "85,00 €", category: "corporal" },
  { id: "c2", name: "Radiofrecuencia Vinci Corporal", duration: "1 hora — Reafirmación y remodelación tisular", price: "80,00 €", category: "corporal" },
  { id: "c3", name: "Liporadiología Vinci", duration: "1 hora — Reductor, celulitis y modelado corporal", price: "80,00 €", category: "corporal" },
  { id: "c4", name: "Ondas de Choque Athor", duration: "40 min — Combate la celulitis y flacidez", price: "50,00 €", category: "corporal" },
  { id: "c5", name: "Titans Corporal", duration: "30 min — Estimulación muscular por electromagnetismo", price: "50,00 €", category: "corporal" },
  { id: "c6", name: "Tratamiento Espalda de Seda", duration: "1 hora — Exfoliación, hidratación y masaje", price: "60,00 €", category: "corporal" },
  { id: "c7", name: "Crioslim Piernas Cansadas", duration: "30 min — Alivio, ligereza y reactivación circulatoria", price: "30,00 €", category: "corporal" },
  { id: "c8", name: "Peeling e Hidratación Corporal", duration: "40 min — Piel suave, renovada y profundamente nutrida", price: "54,00 €", category: "corporal" },
  { id: "c9", name: "Criolipólisis Vinci", duration: "1 hora — Eliminación de grasa localizada por frío", price: "65,00 €", category: "corporal" },
  { id: "c10", name: "Presoterapia", duration: "30 min — Drenaje linfático y eliminación de toxinas", price: "16,00 €", category: "corporal" },
  { id: "c11", name: "Diagnóstico Corporal", duration: "15 min — Plan corporal a medida", price: "Gratuito", category: "corporal" },

  // Peluquería
  { id: "p1", name: "Corte de Cabello Femenino", duration: "45 min — Lavado, corte de tendencia y peinado base", price: "Desde 25,00 €", category: "peluqueria" },
  { id: "p2", name: "Coloración Premium (Sin Amoníaco)", duration: "1 hora — Cobertura perfecta y brillo multidimensional", price: "Desde 35,00 €", category: "peluqueria" },
  { id: "p3", name: "Mechas Balayage & Babylights", duration: "2h 30min — Degradados y puntos de luz naturales", price: "Desde 75,00 €", category: "peluqueria" },
  { id: "p4", name: "Alisado Orgánico de Queratina", duration: "2 horas — Liso perfecto, control de frizz y brillo espejo", price: "Desde 60,00 €", category: "peluqueria" },
  { id: "p5", name: "Tratamientos Capilares de Reconstrucción", duration: "45 min — Nutrición intensiva para cabellos dañados", price: "Desde 30,00 €", category: "peluqueria" },
  { id: "p6", name: "Peinado & Recogido de Eventos", duration: "1 hora — Ondas, recogidos y semirecogidos especiales", price: "Desde 30,00 €", category: "peluqueria" },

  // Depilación
  { id: "d1", name: "Depilación Láser — Cuerpo Entero (Mujer)", duration: "1h 15min — Láser de diodo de LED Frío / IPL", price: "Desde 99,00 €", category: "depilacion" },
  { id: "d2", name: "Láser Pecho + Hombros + Abdomen (Hombre)", duration: "25 min — Sesión de alta potencia y máxima velocidad", price: "49,00 €", category: "depilacion" },
  { id: "d3", name: "Depilación Láser Zonas Medianas", duration: "20 min — Axilas, ingles brasileñas, hombros o medias piernas", price: "Desde 29,00 €", category: "depilacion" },
  { id: "d4", name: "Depilación Cera Completa", duration: "45 min — Piernas, ingles y axilas (Cera tibia o caliente)", price: "Desde 35,00 €", category: "depilacion" },
  { id: "d5", name: "Depilación Cera Zonas Individuales", duration: "15 min — Cejas, labio superior, axilas o ingles básicas", price: "Desde 8,00 €", category: "depilacion" },

  // Cejas & Pestañas (sin manicura/pedicura: retiradas de la web pública)
  { id: "u3", name: "Micropigmentación de Cejas (Efecto Polvo / Microblading)", duration: "2 horas — Diseño de cejas de larga duración", price: "Desde 180,00 €", category: "unas-mirada" },
  { id: "u4", name: "Lifting de Pestañas con Tinte", duration: "45 min — Curvatura y profundidad natural para tu mirada", price: "35,00 €", category: "unas-mirada" },
  { id: "u5", name: "Diseño & Depilación de Cejas con Tinte Hena", duration: "30 min — Visajismo y sombreado natural", price: "20,00 €", category: "unas-mirada" }
];

const initialSalonInfoSeed = {
  phone: "872 03 24 92",
  whatsapp: "648 15 87 17",
  email: "salonfashiongirona@yahoo.com",
  address: "Gran Via de Jaume I, 6, local 1, 17001 Girona, España",
  instagram: "https://www.instagram.com/elegancebystoica/?hl=es",
  facebook: "https://www.facebook.com/p/Elegance-by-Stoica-100063673163183/",
  hoursWeek: "09:00h – 19:00h",
  hoursSat: "08:00h – 15:00h"
};

// Variables de estado
let services = [];
let salonInfo = {};
let galleryImages = [];
let heroImages = [];
let currentCategory = "facial";
let activeSection = "servicios";
let firebaseApp, auth, db;
let previewingImageId = null;

// DOM Elements
const adminDashboard = document.getElementById("admin-dashboard");
const dbModeBadge = document.getElementById("db-mode-badge");
const adminUserEmail = document.getElementById("admin-user-email");

const secServicios = document.getElementById("sec-servicios");
const secHero = document.getElementById("sec-hero");
const secGaleria = document.getElementById("sec-galeria");
const secVideos = document.getElementById("sec-videos");
const secInformacion = document.getElementById("sec-informacion");
const servicesTbody = document.getElementById("services-tbody");
const newServiceBtn = document.getElementById("new-service-btn");
const salonInfoForm = document.getElementById("salon-info-form");

const serviceModal = document.getElementById("service-modal");
const serviceForm = document.getElementById("service-form");
const modalServiceTitle = document.getElementById("modal-service-title");
const serviceIdInput = document.getElementById("service-id");
const serviceNameInput = document.getElementById("service-name");
const serviceDurationInput = document.getElementById("service-duration");
const servicePriceInput = document.getElementById("service-price");
const serviceCategorySelect = document.getElementById("service-category");
const modalCancelBtn = document.getElementById("modal-cancel-btn");

const galleryGrid = document.getElementById("gallery-grid");

// ─── Theme Toggle Logic ─────────────────────────────────
const themeToggleBtn = document.getElementById("theme-toggle-btn");
if (themeToggleBtn) {
  const currentTheme = localStorage.getItem("elegance_admin_theme") || "dark";
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggleBtn.textContent = "🌙 Modo";
  }
  
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("elegance_admin_theme", "dark");
      themeToggleBtn.textContent = "☀️ Modo";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("elegance_admin_theme", "light");
      themeToggleBtn.textContent = "🌙 Modo";
    }
  });
}
const galleryDropzone = document.getElementById("gallery-dropzone");
const galleryUploadInput = document.getElementById("gallery-upload-input");

const heroGrid = document.getElementById("hero-grid");
const heroDropzone = document.getElementById("hero-dropzone");
const heroUploadInput = document.getElementById("hero-upload-input");

const imagePreviewModal = document.getElementById("image-preview-modal");
const imagePreviewImg = document.getElementById("image-preview-img");
const imageModalClose = document.getElementById("image-modal-close");
const imageModalCancel = document.getElementById("image-modal-cancel");
const imageModalDelete = document.getElementById("image-modal-delete");

// Nuevos elementos para edición de imágenes
const imagePreviewNameInput = document.getElementById("image-preview-name-input");
const imagePreviewDescInput = document.getElementById("image-preview-desc-input");
const imageModalSave = document.getElementById("image-modal-save");
const imageEditFileInput = document.getElementById("image-edit-file-input");

// Elementos para edición de vídeos
const videoEditModal = document.getElementById("video-edit-modal");
const videoEditForm = document.getElementById("video-edit-form");
const videoEditSlotIdInput = document.getElementById("video-edit-slot-id");
const videoEditLabelInput = document.getElementById("video-edit-label");
const videoEditDescInput = document.getElementById("video-edit-desc");
const videoEditCancelBtn = document.getElementById("video-edit-cancel-btn");

const toastContainer = document.getElementById("toast-container");
let tempImageSrc = null;

function updateStorageUsage() {
  const badge = document.getElementById("storage-usage-badge");
  if (!badge) return;

  if (window.useFirebase) {
    badge.style.display = "none";
    return;
  }

  let chars = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("elegance_")) {
      const val = localStorage.getItem(key);
      if (val) chars += key.length + val.length;
    }
  }

  const quota = 5 * 1024 * 1024; // 5MB de caracteres UTF-16
  const usedMB = (chars / (1024 * 1024)).toFixed(2);
  const percent = Math.min(100, (chars / quota) * 100).toFixed(1);

  badge.textContent = `Capacidad: ${percent}% (${usedMB}MB)`;
  badge.style.display = "inline-block";

  badge.className = "badge"; // Limpiar clases previas
  if (percent < 70) {
    badge.classList.add("storage-ok");
  } else if (percent < 90) {
    badge.classList.add("storage-warning");
  } else {
    badge.classList.add("storage-danger");
  }
}

// ═══════════════════════════════════════════════════════════
// INICIALIZACIÓN — Sin login en modo local
// ═══════════════════════════════════════════════════════════
function initDatabase() {
  updateStorageUsage(); // Cargar estado inicial del espacio de almacenamiento
  if (window.useFirebase) {
    dbModeBadge.textContent = "Firebase Activo";
    dbModeBadge.className = "badge mode-firebase";

    const { initializeApp, getAuth, getFirestore, onAuthStateChanged } = window.FirebaseLib;
    firebaseApp = initializeApp(window.firebaseConfig);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);

    // En Firebase, sí se requiere autenticación (ver implementación Firebase separada)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        adminUserEmail.textContent = user.email;
        loadData();
      }
    });
  } else {
    // Modo Local: acceso directo sin credenciales
    dbModeBadge.textContent = "Modo Local (localStorage)";
    dbModeBadge.className = "badge mode-local";
    adminUserEmail.textContent = "Administrador Local";
    loadData();
  }
}

// ═══════════════════════════════════════════════════════════
// CARGA DE DATOS
// ═══════════════════════════════════════════════════════════
async function loadData() {
  servicesTbody.innerHTML = `<tr><td colspan="4" class="ui-state-loading" style="text-align: center; padding: 32px;" data-i18n="states.loading">${window.I18nLoader ? window.I18nLoader.getText("states.loading") : "Cargando..."}</td></tr>`;

  if (window.useFirebase) {
    const { getDocs, collection } = window.FirebaseLib;
    try {
      const servicesSnapshot = await getDocs(collection(db, "servicios"));
      services = [];
      servicesSnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() });
      });

      if (services.length === 0) {
        showToast("Inicializando base de datos con servicios predeterminados...", "success");
        const { setDoc, doc } = window.FirebaseLib;
        for (let item of initialServicesSeed) {
          await setDoc(doc(db, "servicios", item.id), {
            name: item.name,
            duration: item.duration,
            price: item.price,
            category: item.category
          });
        }
        loadData();
        return;
      }

      const infoSnapshot = await getDocs(collection(db, "salon_info"));
      if (!infoSnapshot.empty) {
        salonInfo = infoSnapshot.docs[0].data();
        salonInfo.docId = infoSnapshot.docs[0].id;
      } else {
        const { addDoc } = window.FirebaseLib;
        const newDoc = await addDoc(collection(db, "salon_info"), initialSalonInfoSeed);
        salonInfo = { ...initialSalonInfoSeed, docId: newDoc.id };
      }
      populateSalonInfoForm();
      renderServicesTable();
    } catch (error) {
      console.error(error);
      servicesTbody.innerHTML = `<tr><td colspan="4" class="ui-state-error" style="text-align: center; color: red; padding: 32px;" data-i18n="states.error">${window.I18nLoader ? window.I18nLoader.getText("states.error") : "Error"}</td></tr>`;
      showToast("Error al cargar datos de Firebase: " + error.message, "error");
    }
  } else {
    // Modo LocalStorage
    const savedServices = localStorage.getItem("elegance_services");
    if (savedServices) {
      services = JSON.parse(savedServices);
    } else {
      services = [...initialServicesSeed];
      localStorage.setItem("elegance_services", JSON.stringify(services));
    }

    const savedInfo = localStorage.getItem("elegance_salon_info");
    if (savedInfo) {
      salonInfo = JSON.parse(savedInfo);
    } else {
      salonInfo = { ...initialSalonInfoSeed };
      localStorage.setItem("elegance_salon_info", JSON.stringify(salonInfo));
    }

    // Galer�a
    loadGallery();
    loadHero();
    populateSalonInfoForm();
    renderServicesTable();
  }
}

// -----------------------------------------------------------
// SERVICIOS
// -----------------------------------------------------------
function renderServicesTable() {
  servicesTbody.innerHTML = "";
  const filtered = services.filter(s => s.category === currentCategory);

  if (filtered.length === 0) {
    servicesTbody.innerHTML = `<tr><td colspan="4" class="ui-state-empty" style="text-align: center; color: var(--color-text-muted); padding: 32px;" data-i18n="states.empty">${window.I18nLoader ? window.I18nLoader.getText("states.empty") : "Vac�o"}</td></tr>`;
    if (window.I18nLoader) window.I18nLoader.translateDOM();
    return;
  }

  filtered.forEach(service => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="service-name-cell">${escapeHtml(service.name)}</td>
      <td class="service-desc-cell">${escapeHtml(service.duration)}</td>
      <td class="service-price-cell">${escapeHtml(service.price)}</td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="action-btn action-btn--edit" data-id="${service.id}">Editar</button>
        <button class="action-btn action-btn--delete" data-id="${service.id}">Eliminar</button>
      </td>
    `;
    servicesTbody.appendChild(tr);
  });

  document.querySelectorAll(".action-btn--edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      openEditModal(e.target.getAttribute("data-id"));
    });
  });

  document.querySelectorAll(".action-btn--delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      deleteServiceItem(e.target.getAttribute("data-id"));
    });
  });
}

function populateSalonInfoForm() {
  document.getElementById("info-phone").value = salonInfo.phone || "";
  document.getElementById("info-whatsapp").value = salonInfo.whatsapp || "648 15 87 17";
  document.getElementById("info-email").value = salonInfo.email || "";
  document.getElementById("info-address").value = salonInfo.address || "";
  document.getElementById("info-instagram").value = salonInfo.instagram || "";
  document.getElementById("info-facebook").value = salonInfo.facebook || "";
  document.getElementById("info-hours-week").value = salonInfo.hoursWeek || "";
  document.getElementById("info-hours-sat").value = salonInfo.hoursSat || "";
}

async function deleteServiceItem(id) {
  const service = services.find(s => s.id === id);
  if (!service) return;

  const ok = await showConfirm(`¿Seguro que deseas eliminar el servicio "${service.name}"? Esta acción no se puede deshacer.`, { title: "Eliminar servicio" });
  if (!ok) return;

  if (window.useFirebase) {
    const { deleteDoc, doc } = window.FirebaseLib;
    try {
      await deleteDoc(doc(db, "servicios", id));
      services = services.filter(s => s.id !== id);
      renderServicesTable();
      showToast("Servicio eliminado correctamente", "success");
    } catch (error) {
      showToast("Error al eliminar de Firebase: " + error.message, "error");
    }
  } else {
    services = services.filter(s => s.id !== id);
    localStorage.setItem("elegance_services", JSON.stringify(services));
    updateStorageUsage();
    renderServicesTable();
    showToast("Servicio eliminado", "success");
  }
}

newServiceBtn.addEventListener("click", () => {
  modalServiceTitle.textContent = "Nuevo Servicio";
  serviceIdInput.value = "";
  serviceForm.reset();
  serviceCategorySelect.value = currentCategory;
  serviceModal.style.display = "flex";
});

function openEditModal(id) {
  const service = services.find(s => s.id === id);
  if (!service) return;

  modalServiceTitle.textContent = "Editar Servicio";
  serviceIdInput.value = service.id;
  serviceNameInput.value = service.name;
  serviceDurationInput.value = service.duration;
  servicePriceInput.value = service.price;
  serviceCategorySelect.value = service.category;

  serviceModal.style.display = "flex";
}

modalCancelBtn.addEventListener("click", () => {
  serviceModal.style.display = "none";
});

serviceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = serviceIdInput.value;
  const name = serviceNameInput.value.trim();
  const duration = serviceDurationInput.value.trim();
  const price = servicePriceInput.value.trim();
  const category = serviceCategorySelect.value;

  if (window.useFirebase) {
    const { setDoc, addDoc, doc, collection } = window.FirebaseLib;
    try {
      if (id) {
        await setDoc(doc(db, "servicios", id), { name, duration, price, category });
        const idx = services.findIndex(s => s.id === id);
        services[idx] = { id, name, duration, price, category };
        showToast("Servicio actualizado en Firebase", "success");
      } else {
        const docRef = await addDoc(collection(db, "servicios"), { name, duration, price, category });
        services.push({ id: docRef.id, name, duration, price, category });
        showToast("Servicio añadido a Firebase", "success");
      }
      serviceModal.style.display = "none";
      renderServicesTable();
    } catch (error) {
      showToast("Error al guardar en Firebase: " + error.message, "error");
    }
  } else {
    if (id) {
      const idx = services.findIndex(s => s.id === id);
      services[idx] = { id, name, duration, price, category };
      showToast("Servicio actualizado", "success");
    } else {
      const newId = "local_" + Date.now();
      services.push({ id: newId, name, duration, price, category });
      showToast("Servicio añadido", "success");
    }
    localStorage.setItem("elegance_services", JSON.stringify(services));
    updateStorageUsage();
    serviceModal.style.display = "none";
    renderServicesTable();
  }
});

salonInfoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("info-phone").value.trim();
  const whatsapp = document.getElementById("info-whatsapp").value.trim();
  const email = document.getElementById("info-email").value.trim();
  const address = document.getElementById("info-address").value.trim();
  const instagram = document.getElementById("info-instagram").value.trim();
  const facebook = document.getElementById("info-facebook").value.trim();
  const hoursWeek = document.getElementById("info-hours-week").value.trim();
  const hoursSat = document.getElementById("info-hours-sat").value.trim();

  const data = { phone, whatsapp, email, address, instagram, facebook, hoursWeek, hoursSat };

  if (window.useFirebase) {
    const { setDoc, doc } = window.FirebaseLib;
    try {
      const docId = salonInfo.docId;
      await setDoc(doc(db, "salon_info", docId), data);
      salonInfo = { ...data, docId };
      showToast("Información del salón guardada en Firebase", "success");
    } catch (error) {
      showToast("Error al guardar información: " + error.message, "error");
    }
  } else {
    salonInfo = { ...data };
    localStorage.setItem("elegance_salon_info", JSON.stringify(salonInfo));
    updateStorageUsage();
    showToast("Información del salón guardada", "success");
  }
});

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE GALERÍA
// ═══════════════════════════════════════════════════════════

function loadGallery() {
  const saved = localStorage.getItem("elegance_gallery");
  if (saved) {
    galleryImages = JSON.parse(saved);
  } else {
    // Pre-cargar imágenes existentes del proyecto con descripciones por defecto
    galleryImages = [
      { id: "g_entrada", name: "Entrada del Salón", desc: "Ubicado en Girona — Un espacio de alta estética y confort", src: "img/entrada.png", addedAt: Date.now() - 3000 },
      { id: "g_galeria1", name: "Interior — Vista Principal", desc: "Cortes, color y peinados personalizados por nuestras estilistas", src: "img/galeria1.png", addedAt: Date.now() - 2000 }
    ];
    localStorage.setItem("elegance_gallery", JSON.stringify(galleryImages));
  }
  renderGallery();
}

function saveGallery() {
  try {
    localStorage.setItem("elegance_gallery", JSON.stringify(galleryImages));
    updateStorageUsage();
    return true;
  } catch (err) {
    showToast("No hay espacio para guardar en la galería. Sube fotos más ligeras.", "error");
    return false;
  }
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  if (galleryImages.length === 0) {
    galleryDropzone.style.display = "flex";
    return;
  }

  galleryDropzone.style.display = "none";

  galleryImages.forEach(img => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.dataset.id = img.id;
    card.innerHTML = `
      <div class="gallery-card__img-wrap">
        <img src="${img.src}" alt="${escapeHtml(img.name)}" loading="lazy" />
        <div class="gallery-card__overlay">
          <button class="gallery-btn gallery-btn--view" data-id="${img.id}" title="Ver imagen">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="gallery-btn gallery-btn--delete" data-id="${img.id}" title="Eliminar imagen">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
      <div class="gallery-card__info">
        <span class="gallery-card__name" title="${escapeHtml(img.name)}">${escapeHtml(img.name)}</span>
      </div>
    `;

    card.querySelector(".gallery-btn--view").addEventListener("click", () => openImagePreview(img.id));
    card.querySelector(".gallery-btn--delete").addEventListener("click", () => deleteGalleryImage(img.id));

    galleryGrid.appendChild(card);
  });

  // Añadir botón "+" al final del grid
  const addCard = document.createElement("label");
  addCard.className = "gallery-card gallery-card--add";
  addCard.htmlFor = "gallery-upload-input";
  addCard.innerHTML = `
    <div class="gallery-card__add-icon">+</div>
    <span>Añadir imagen</span>
  `;
  galleryGrid.appendChild(addCard);
}

function openImagePreview(id) {
  const img = galleryImages.find(i => i.id === id);
  if (!img) return;
  previewingImageId = id;
  tempImageSrc = null;
  imagePreviewImg.src = img.src;
  
  if (imagePreviewNameInput) {
    imagePreviewNameInput.value = img.name || "";
  }
  if (imagePreviewDescInput) {
    imagePreviewDescInput.value = img.desc || "";
  }
  
  imagePreviewModal.style.display = "flex";
}

async function deleteGalleryImage(id) {
  const img = galleryImages.find(i => i.id === id);
  if (!img) return;
  const ok = await showConfirm(`¿Eliminar la imagen "${img.name}" de la galería?`, { title: "Eliminar imagen" });
  if (!ok) return;
  galleryImages = galleryImages.filter(i => i.id !== id);
  saveGallery();
  renderGallery();
  showToast("Imagen eliminada de la galería", "success");
}

// Input de subida de archivos
galleryUploadInput.addEventListener("change", (e) => {
  handleFileUpload(e.target.files);
  e.target.value = ""; // reset para permitir re-subir el mismo fichero
});

// Input de reemplazo de archivo de imagen individual
if (imageEditFileInput) {
  imageEditFileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Por favor, selecciona una imagen válida", "error");
        return;
      }
      try {
        const isHero = previewingImageId && (previewingImageId.startsWith("hero_") || previewingImageId.startsWith("h_"));
        const maxWidth = isHero ? 1600 : 1200;
        const quality = isHero ? 0.82 : 0.78;
        const src = await resizeImageFile(file, maxWidth, quality);
        imagePreviewImg.src = src;
        tempImageSrc = src;
      } catch (err) {
        showToast("Error al procesar la imagen", "error");
      }
    }
    e.target.value = "";
  });
}

async function handleFileUpload(files) {
  if (!files || files.length === 0) return;
  let count = 0;

  for (const file of Array.from(files)) {
    if (!file.type.startsWith("image/")) {
      showToast(`"${file.name}" no es una imagen válida`, "error");
      continue;
    }
    try {
      const src = await resizeImageFile(file, 1200, 0.78);
      const newImg = {
        id: "gal_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
        name: file.name.replace(/\.[^/.]+$/, ""),
        src,
        addedAt: Date.now()
      };
      galleryImages.push(newImg);
      count++;
    } catch (err) {
      showToast(`No se pudo procesar "${file.name}"`, "error");
    }
  }

  if (count > 0) {
    if (saveGallery()) {
      renderGallery();
      showToast(`${count} imagen${count > 1 ? "es" : ""} añadida${count > 1 ? "s" : ""} a la galería`, "success");
    } else {
      // Revertir agregados si excedió cuota
      galleryImages.splice(galleryImages.length - count, count);
      renderGallery();
    }
  }
}

// Drag & Drop en la dropzone
galleryDropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  galleryDropzone.classList.add("dragover");
});

galleryDropzone.addEventListener("dragleave", () => {
  galleryDropzone.classList.remove("dragover");
});

galleryDropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  galleryDropzone.classList.remove("dragover");
  handleFileUpload(e.dataTransfer.files);
});

// También drag & drop sobre el grid completo (cuando hay imágenes)
galleryGrid.addEventListener("dragover", (e) => {
  e.preventDefault();
  galleryGrid.classList.add("dragover-active");
});

galleryGrid.addEventListener("dragleave", () => {
  galleryGrid.classList.remove("dragover-active");
});

galleryGrid.addEventListener("drop", (e) => {
  e.preventDefault();
  galleryGrid.classList.remove("dragover-active");
  handleFileUpload(e.dataTransfer.files);
});

// Cerrar modal de preview
imageModalClose.addEventListener("click", () => {
  imagePreviewModal.style.display = "none";
  previewingImageId = null;
  tempImageSrc = null;
});
imageModalCancel.addEventListener("click", () => {
  imagePreviewModal.style.display = "none";
  previewingImageId = null;
  tempImageSrc = null;
});
imageModalDelete.addEventListener("click", () => {
  if (previewingImageId) {
    imagePreviewModal.style.display = "none";
    deleteGalleryImage(previewingImageId);
    previewingImageId = null;
    tempImageSrc = null;
  }
});
if (imageModalSave) {
  imageModalSave.addEventListener("click", () => {
    if (previewingImageId) {
      const idx = galleryImages.findIndex(i => i.id === previewingImageId);
      if (idx !== -1) {
        const newName = imagePreviewNameInput.value.trim();
        const newDesc = imagePreviewDescInput.value.trim();
        if (!newName) {
          showToast("El nombre de la imagen es obligatorio", "error");
          return;
        }
        galleryImages[idx].name = newName;
        galleryImages[idx].desc = newDesc;
        if (tempImageSrc) {
          galleryImages[idx].src = tempImageSrc;
        }
        saveGallery();
        renderGallery();
        showToast("Imagen actualizada correctamente", "success");
      }
      imagePreviewModal.style.display = "none";
      previewingImageId = null;
      tempImageSrc = null;
    }
  });
}

// ═══════════════════════════════════════════════════════════
// GESTIÓN DEL CARRUSEL DEL HERO
// ═══════════════════════════════════════════════════════════

function loadHero() {
  const saved = localStorage.getItem("elegance_hero");
  if (saved) {
    heroImages = JSON.parse(saved);
  } else {
    // Semilla con las 2 fotos que ya están en el carrusel estático
    heroImages = [
      { id: "h_galeria1", name: "Interior del salón", src: "img/galeria1.png", addedAt: Date.now() - 2000 },
      { id: "h_entrada", name: "Entrada del salón", src: "img/entrada.png", addedAt: Date.now() - 1000 }
    ];
    saveHero();
  }
  renderHero();
}

function saveHero() {
  try {
    localStorage.setItem("elegance_hero", JSON.stringify(heroImages));
    updateStorageUsage();
    return true;
  } catch (err) {
    showToast("No hay espacio para guardar tantas fotos. Sube menos o más ligeras.", "error");
    return false;
  }
}

function renderHero() {
  if (!heroGrid) return;
  heroGrid.innerHTML = "";

  if (heroImages.length === 0) {
    heroDropzone.style.display = "flex";
    return;
  }
  heroDropzone.style.display = "none";

  heroImages.forEach((img, index) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.dataset.id = img.id;
    const orderBadge = index === 0 ? '<span class="gallery-card__order">1ª · Portada</span>' : `<span class="gallery-card__order">${index + 1}ª</span>`;
    card.innerHTML = `
      <div class="gallery-card__img-wrap">
        <img src="${img.src}" alt="${escapeHtml(img.name)}" loading="lazy" />
        <div class="gallery-card__overlay">
          <button class="gallery-btn gallery-btn--move" data-id="${img.id}" data-dir="-1" title="Mover antes" ${index === 0 ? "disabled" : ""}>◀</button>
          <button class="gallery-btn gallery-btn--move" data-id="${img.id}" data-dir="1" title="Mover después" ${index === heroImages.length - 1 ? "disabled" : ""}>▶</button>
          <button class="gallery-btn gallery-btn--delete" data-id="${img.id}" title="Eliminar foto">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
      <div class="gallery-card__info">
        ${orderBadge}
        <span class="gallery-card__name" title="${escapeHtml(img.name)}">${escapeHtml(img.name)}</span>
      </div>
    `;

    card.querySelectorAll(".gallery-btn--move").forEach(btn => {
      btn.addEventListener("click", () => moveHero(btn.getAttribute("data-id"), parseInt(btn.getAttribute("data-dir"), 10)));
    });
    card.querySelector(".gallery-btn--delete").addEventListener("click", () => deleteHeroImage(img.id));

    heroGrid.appendChild(card);
  });

  // Tarjeta "+" para añadir
  const addCard = document.createElement("label");
  addCard.className = "gallery-card gallery-card--add";
  addCard.htmlFor = "hero-upload-input";
  addCard.innerHTML = `
    <div class="gallery-card__add-icon">+</div>
    <span>Añadir foto</span>
  `;
  heroGrid.appendChild(addCard);
}

function moveHero(id, dir) {
  const i = heroImages.findIndex(x => x.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= heroImages.length) return;
  [heroImages[i], heroImages[j]] = [heroImages[j], heroImages[i]];
  saveHero();
  renderHero();
}

async function deleteHeroImage(id) {
  const img = heroImages.find(i => i.id === id);
  if (!img) return;
  const ok = await showConfirm(`¿Quitar la foto "${img.name}" del carrusel del hero?`, { title: "Quitar foto", acceptText: "Quitar" });
  if (!ok) return;
  heroImages = heroImages.filter(i => i.id !== id);
  saveHero();
  renderHero();
  showToast("Foto quitada del carrusel", "success");
}

// Redimensiona una imagen a un ancho máximo y la devuelve como dataURL (JPEG)
function resizeImageFile(file, maxWidth, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.onerror = reject;
      image.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleHeroUpload(files) {
  if (!files || files.length === 0) return;
  let added = 0;
  for (const file of Array.from(files)) {
    if (!file.type.startsWith("image/")) {
      showToast(`"${file.name}" no es una imagen válida`, "error");
      continue;
    }
    try {
      const src = await resizeImageFile(file, 1600, 0.82);
      heroImages.push({
        id: "hero_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
        name: file.name.replace(/\.[^/.]+$/, ""),
        src,
        addedAt: Date.now()
      });
      added++;
    } catch (err) {
      showToast(`No se pudo procesar "${file.name}"`, "error");
    }
  }
  if (added > 0) {
    if (saveHero()) {
      renderHero();
      showToast(`${added} foto${added > 1 ? "s" : ""} añadida${added > 1 ? "s" : ""} al carrusel`, "success");
    } else {
      // Revertir las añadidas si no se pudo guardar (cuota)
      heroImages.splice(heroImages.length - added, added);
      renderHero();
    }
  }
}

if (heroUploadInput) {
  heroUploadInput.addEventListener("change", (e) => {
    handleHeroUpload(e.target.files);
    e.target.value = "";
  });
}

if (heroDropzone) {
  heroDropzone.addEventListener("dragover", (e) => { e.preventDefault(); heroDropzone.classList.add("dragover"); });
  heroDropzone.addEventListener("dragleave", () => heroDropzone.classList.remove("dragover"));
  heroDropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    heroDropzone.classList.remove("dragover");
    handleHeroUpload(e.dataTransfer.files);
  });
}

if (heroGrid) {
  heroGrid.addEventListener("dragover", (e) => { e.preventDefault(); heroGrid.classList.add("dragover-active"); });
  heroGrid.addEventListener("dragleave", () => heroGrid.classList.remove("dragover-active"));
  heroGrid.addEventListener("drop", (e) => {
    e.preventDefault();
    heroGrid.classList.remove("dragover-active");
    handleHeroUpload(e.dataTransfer.files);
  });
}

// ═══════════════════════════════════════════════════════════
// NAVEGACIÓN DE PESTAÑAS
// ═══════════════════════════════════════════════════════════
document.querySelectorAll(".admin-tab-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".admin-section").forEach(s => s.classList.remove("active"));

    e.target.classList.add("active");
    const section = e.target.getAttribute("data-section");

    if (section === "servicios") secServicios.classList.add("active");
    else if (section === "hero") secHero.classList.add("active");
    else if (section === "galeria") secGaleria.classList.add("active");
    else if (section === "videos") secVideos.classList.add("active");
    else secInformacion.classList.add("active");
  });
});

document.querySelectorAll(".category-tab-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".category-tab-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentCategory = e.target.getAttribute("data-cat");
    renderServicesTable();
  });
});

// Cerrar modales al hacer clic fuera
document.addEventListener("click", (e) => {
  if (e.target === serviceModal) {
    serviceModal.style.display = "none";
  }
  if (e.target === imagePreviewModal) {
    imagePreviewModal.style.display = "none";
    previewingImageId = null;
    tempImageSrc = null;
  }
  if (e.target === videoEditModal) {
    videoEditModal.style.display = "none";
  }
});

// ═══════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Diálogo de confirmación on-brand (sustituye a window.confirm).
// Devuelve una promesa que resuelve true si se acepta, false si se cancela.
function showConfirm(message, { title = "Confirmar acción", acceptText = "Eliminar" } = {}) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("confirm-modal");
    const titleEl = document.getElementById("confirm-modal-title");
    const textEl = document.getElementById("confirm-modal-text");
    const acceptBtn = document.getElementById("confirm-modal-accept");
    const cancelBtn = document.getElementById("confirm-modal-cancel");

    // Reserva de seguridad si el modal no existe en el DOM
    if (!overlay || !acceptBtn || !cancelBtn) {
      resolve(window.confirm(message));
      return;
    }

    titleEl.textContent = title;
    textEl.textContent = message;
    acceptBtn.textContent = acceptText;
    overlay.style.display = "flex";

    const cleanup = (result) => {
      overlay.style.display = "none";
      acceptBtn.removeEventListener("click", onAccept);
      cancelBtn.removeEventListener("click", onCancel);
      overlay.removeEventListener("click", onOverlay);
      document.removeEventListener("keydown", onKey);
      resolve(result);
    };
    const onAccept = () => cleanup(true);
    const onCancel = () => cleanup(false);
    const onOverlay = (e) => { if (e.target === overlay) cleanup(false); };
    const onKey = (e) => { if (e.key === "Escape") cleanup(false); };

    acceptBtn.addEventListener("click", onAccept);
    cancelBtn.addEventListener("click", onCancel);
    overlay.addEventListener("click", onOverlay);
    document.addEventListener("keydown", onKey);
  });
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === "success" ? "✓" : "✗"}</span>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE VÍDEOS Y METADATOS
// ═══════════════════════════════════════════════════════════

const videoSlotIds = ['hero', 'clip-facial', 'clip-peluqueria', 'clip-corporal', 'clip-unas'];
const videoObjectURLs = {};

const defaultVideosMetadata = {
  'hero': { label: 'Hero Principal', desc: 'Vídeo de fondo de la portada. Se reproduce en bucle silencioso. Reemplaza la foto de entrada.' },
  'clip-facial': { label: 'Estética Facial', desc: 'Clip de tratamientos faciales' },
  'clip-peluqueria': { label: 'Peluquería', desc: 'Clip de servicios de peluquería' },
  'clip-corporal': { label: 'Estética Corporal', desc: 'Clip de tratamientos corporales' },
  'clip-unas': { label: 'Cejas & Pestañas', desc: 'Clip de cejas y pestañas' }
};

let videosMetadata = {};

async function loadVideosMetadata() {
  if (window.useFirebase) {
    const { getDocs, collection } = window.FirebaseLib;
    try {
      const snap = await getDocs(collection(db, "videos_metadata"));
      videosMetadata = {};
      snap.forEach(doc => {
        videosMetadata[doc.id] = doc.data();
      });
      // Completar con defaults si falta alguno
      videoSlotIds.forEach(slotId => {
        if (!videosMetadata[slotId]) {
          videosMetadata[slotId] = { ...defaultVideosMetadata[slotId] };
        }
      });
    } catch (err) {
      console.error("Error al cargar metadatos de vídeo de Firebase:", err);
      videosMetadata = { ...defaultVideosMetadata };
    }
  } else {
    const saved = localStorage.getItem("elegance_videos_metadata");
    if (saved) {
      videosMetadata = JSON.parse(saved);
    } else {
      videosMetadata = { ...defaultVideosMetadata };
      localStorage.setItem("elegance_videos_metadata", JSON.stringify(videosMetadata));
    }
  }
  applyVideosMetadata();
}

function applyVideosMetadata() {
  videoSlotIds.forEach(slotId => {
    const inputEl = document.querySelector(`input[data-slot="${slotId}"]`);
    if (inputEl) {
      const card = inputEl.closest('.video-slot-card') || inputEl.closest('.video-slot-card--hero');
      if (card) {
        const labelEl = card.querySelector('.video-slot__label');
        const descEl = card.querySelector('.video-slot__desc');
        if (labelEl && videosMetadata[slotId]) labelEl.textContent = videosMetadata[slotId].label;
        if (descEl && videosMetadata[slotId]) descEl.textContent = videosMetadata[slotId].desc;
      }
    }
  });
}

async function saveVideoMetadata(slotId, label, desc) {
  videosMetadata[slotId] = { label, desc };
  if (window.useFirebase) {
    const { setDoc, doc } = window.FirebaseLib;
    try {
      await setDoc(doc(db, "videos_metadata", slotId), { label, desc });
      showToast("Información del vídeo guardada en Firebase", "success");
    } catch (err) {
      showToast("Error al guardar en Firebase: " + err.message, "error");
    }
  } else {
    localStorage.setItem("elegance_videos_metadata", JSON.stringify(videosMetadata));
    updateStorageUsage();
    showToast("Información del vídeo guardada", "success");
  }
  applyVideosMetadata();
}

function initVideoManagement() {
  // Cargar metadatos
  loadVideosMetadata();

  videoSlotIds.forEach(slotId => {
    const fileInput = document.getElementById(`file-${slotId}`);
    const clearBtn  = document.getElementById(`clear-${slotId}`);

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) loadVideoSlot(slotId, file);
        e.target.value = '';
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => clearVideoSlot(slotId));
    }
  });

  // Listener para botones de edición
  document.querySelectorAll(".video-edit-info-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const slotId = e.target.getAttribute("data-slot");
      openVideoEditModal(slotId);
    });
  });
}

function openVideoEditModal(slotId) {
  const meta = videosMetadata[slotId] || defaultVideosMetadata[slotId];
  videoEditSlotIdInput.value = slotId;
  videoEditLabelInput.value = meta.label;
  videoEditDescInput.value = meta.desc;
  videoEditModal.style.display = "flex";
}

if (videoEditCancelBtn) {
  videoEditCancelBtn.addEventListener("click", () => {
    videoEditModal.style.display = "none";
  });
}

if (videoEditForm) {
  videoEditForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const slotId = videoEditSlotIdInput.value;
    const label = videoEditLabelInput.value.trim();
    const desc = videoEditDescInput.value.trim();

    if (!label || !desc) {
      showToast("Todos los campos son obligatorios", "error");
      return;
    }

    await saveVideoMetadata(slotId, label, desc);
    videoEditModal.style.display = "none";
  });
}

function loadVideoSlot(slotId, file) {
  // Liberar URL anterior si existia
  if (videoObjectURLs[slotId]) {
    URL.revokeObjectURL(videoObjectURLs[slotId]);
  }

  const blobURL = URL.createObjectURL(file);
  videoObjectURLs[slotId] = blobURL;

  const placeholder = document.getElementById(`placeholder-${slotId}`);
  const videoEl     = document.getElementById(`video-${slotId}`);
  const sourceEl    = document.getElementById(`source-${slotId}`);
  const badge       = document.getElementById(`badge-${slotId}`);
  const clearBtn    = document.getElementById(`clear-${slotId}`);
  const meta        = document.getElementById(`meta-${slotId}`);
  const metatext    = document.getElementById(`metatext-${slotId}`);

  sourceEl.src = blobURL;
  videoEl.load();
  videoEl.play().catch(() => {});

  placeholder.style.display = 'none';
  videoEl.style.display = 'block';
  badge.style.display = 'inline-flex';
  clearBtn.style.display = 'inline-flex';
  if (meta) meta.style.display = 'flex';

  // Metadatos del archivo
  const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
  const sizeOk = file.size < 5 * 1024 * 1024;
  if (metatext) {
    metatext.textContent = `${file.name} · ${sizeMB} MB${!sizeOk ? ' ⚠️ Comprime con HandBrake' : ' ✓ Tamaño correcto'}`;
    metatext.style.color = sizeOk ? '#2ecc71' : '#e74c3c';
  }

  showToast(`Vídeo "${file.name}" cargado en preview`, 'success');
}

function clearVideoSlot(slotId) {
  if (videoObjectURLs[slotId]) {
    URL.revokeObjectURL(videoObjectURLs[slotId]);
    delete videoObjectURLs[slotId];
  }

  const placeholder = document.getElementById(`placeholder-${slotId}`);
  const videoEl     = document.getElementById(`video-${slotId}`);
  const sourceEl    = document.getElementById(`source-${slotId}`);
  const badge       = document.getElementById(`badge-${slotId}`);
  const clearBtn    = document.getElementById(`clear-${slotId}`);
  const meta        = document.getElementById(`meta-${slotId}`);

  videoEl.pause();
  sourceEl.src = '';
  videoEl.load();
  videoEl.style.display = 'none';
  placeholder.style.display = 'flex';
  badge.style.display = 'none';
  clearBtn.style.display = 'none';
  if (meta) meta.style.display = 'none';

  showToast('Preview eliminado', 'success');
}

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
  initDatabase();
  initVideoManagement();
});


