// â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 
// ELENA HAIRLOVER — Lógica del Panel de Administración Híbrido
// â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 

// Semilla inicial de datos para poblar el sistema la primera vez
const initialServicesSeed = [
  { id: "p1", name: "Wash, Cut & Blow Dry - Short", duration: "45 mins", price: "55 €", category: "peluqueria" },
  { id: "p2", name: "Wash , Cut & Blow Dry - Medium", duration: "1 hour", price: "60 €", category: "peluqueria" },
  { id: "p3", name: "Wash , Cut & Blow Dry - Long", duration: "1 hour", price: "65 €", category: "peluqueria" },
  { id: "p4", name: "Straight Blow Dry - Short", duration: "30 mins", price: "25 €", category: "peluqueria" },
  { id: "p5", name: "Straight Blow Dry - Medium", duration: "30 mins", price: "28 €", category: "peluqueria" },
  { id: "p6", name: "Straight Blow Dry - Long", duration: "30 mins", price: "30 €", category: "peluqueria" },
  { id: "p7", name: "Curly/Wavy/Boho Blow Dry - Short", duration: "45 mins", price: "35 €", category: "peluqueria" },
  { id: "p8", name: "Curly/Wavy/Boho Blow Dry - Medium", duration: "45 mins", price: "38 €", category: "peluqueria" },
  { id: "p9", name: "Curly/Wavy/Boho Blow Dry - Long", duration: "45 mins", price: "40 €", category: "peluqueria" },
  { id: "p10", name: "Extensions Blow Dry - Straight", duration: "1 hour", price: "40 €", category: "peluqueria" },
  { id: "p11", name: "Extensions Blow Dry - Curly/Wavy/Ghd", duration: "1 hour", price: "45 €", category: "peluqueria" },
  { id: "p12", name: "Dry cut", duration: "30 mins", price: "30 €", category: "peluqueria" },
  { id: "p13", name: "12 Week Blow Dry - Short", duration: "2 hours", price: "120 €", category: "peluqueria" },
  { id: "p14", name: "12 Week Blow Dry - Medium", duration: "2 hours, 30 mins", price: "130 €", category: "peluqueria" },
  { id: "p15", name: "12 Week Blow Dry - Long", duration: "3 hours", price: "140 €", category: "peluqueria" },
  { id: "p16", name: "Root Tint - Short", duration: "1 hour, 30 mins", price: "70 €", category: "peluqueria" },
  { id: "p17", name: "Root Tint - Medium", duration: "1 hour, 45 mins", price: "75 €", category: "peluqueria" },
  { id: "p18", name: "Root Tint - Long", duration: "2 hours", price: "80 €", category: "peluqueria" },
  { id: "p19", name: "Full Tint ( Roots to Ends ) - Short", duration: "2 hours", price: "80 €", category: "peluqueria" },
  { id: "p20", name: "Full Tint ( Roots to Ends ) - Medium", duration: "2 hours", price: "85 €", category: "peluqueria" },
  { id: "p21", name: "Full Tint ( Roots to Ends ) - Long", duration: "2 hours, 30 mins", price: "95 €", category: "peluqueria" },
  { id: "p22", name: "Colour and Partial Highlights - Short", duration: "2 hours", price: "120 €", category: "peluqueria" },
  { id: "p23", name: "Colour and Partial Highlights- Medium", duration: "2 hours, 30 mins", price: "130 €", category: "peluqueria" },
  { id: "p24", name: "Colour and Partial Highlights- Long", duration: "3 hours", price: "135 €", category: "peluqueria" },
  { id: "p25", name: "Full Head Highlights- Short", duration: "3 hours", price: "145 €", category: "peluqueria" },
  { id: "p26", name: "Full Head Highlights- Medium", duration: "3 hours, 30 mins", price: "155 €", category: "peluqueria" },
  { id: "p27", name: "Full Head Highlights- Long", duration: "3 hours, 30 mins", price: "165 €", category: "peluqueria" },
  { id: "p28", name: "Half Head Highlights- Short", duration: "2 hours, 30 mins", price: "125 €", category: "peluqueria" },
  { id: "p29", name: "Half Head Highlights- Medium", duration: "2 hours, 45 mins", price: "130 €", category: "peluqueria" },
  { id: "p30", name: "Half Head Highlights- Long", duration: "3 hours", price: "135 €", category: "peluqueria" },
  { id: "p31", name: "Balayage - Short", duration: "3 hours", price: "145 €", category: "peluqueria" },
  { id: "p32", name: "Balayage - Medium", duration: "3 hours", price: "155 €", category: "peluqueria" },
  { id: "p33", name: "Balayage - Long", duration: "3 hours, 30 mins", price: "165 €", category: "peluqueria" },
  { id: "p34", name: "Upstyle", duration: "1 hour", price: "60 €", category: "peluqueria" },
  { id: "p35", name: "Olaplex Treatment", duration: "15 mins", price: "25 €", category: "peluqueria" },
  { id: "p36", name: "K18 Treatment", duration: "15 mins", price: "20 €", category: "peluqueria" },
  { id: "p37", name: "Add a Hair Cut to Any Colour Service", duration: "30 mins", price: "20 €", category: "peluqueria" }
];

const initialSalonInfoSeed = {
  phone: "",
  whatsapp: "0894501215",
  email: "info@elenahairlover.com",
  address: "Innovation House, Porters Road, Coolmine Business Park, Dublin 15, Blanchardstown, D15 VW61",
  instagram: "elena_hairlover",
  facebook: "",
  hoursWeek: "09:00h - 19:00h",
  hoursSat: "08:00h - 15:00h",
  hoursSun: "",
  hoursMon: ""
};

const initialCategoriesSeed = [
  { id: "peluqueria", name: "Peluquería" }
];

// Variables de estado
let services = [];
let categories = [];
let salonInfo = {};
let galleryImages = [];
let heroImages = [];
let currentCategory = "peluqueria";
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

const categoryModal = document.getElementById("category-modal");
const manageCategoriesBtn = document.getElementById("manage-categories-btn");
const categoryModalCloseBtn = document.getElementById("category-modal-close-btn");
const categoryForm = document.getElementById("category-form");
const newCategoryNameInput = document.getElementById("new-category-name");
const modalAddCategoryBtn = document.getElementById("modal-add-category-btn");
let editingCategoryId = null;
const modalCancelBtn = document.getElementById("modal-cancel-btn");

const galleryGrid = document.getElementById("gallery-grid");
const galleryUploadInput = document.getElementById("gallery-upload-input");
const galleryDropzone = document.getElementById("gallery-dropzone");
const imageEditFileInput = document.getElementById("image-edit-file-input");

// Image Preview Modal
const imagePreviewModal = document.getElementById("image-preview-modal");
const imageModalClose = document.getElementById("image-modal-close");
const imageModalCancel = document.getElementById("image-modal-cancel");
const imageModalSave = document.getElementById("image-modal-save");
const imageModalDelete = document.getElementById("image-modal-delete");
const imagePreviewImg = document.getElementById("image-preview-img");
const imagePreviewNameInput = document.getElementById("image-preview-name-input");
const imagePreviewDescInput = document.getElementById("image-preview-desc-input");
let tempImageSrc = null;

// Hero
const heroGrid = document.getElementById("hero-grid");
const heroUploadInput = document.getElementById("hero-upload-input");
const heroDropzone = document.getElementById("hero-dropzone");

// Toast
const toastContainer = document.getElementById("toast-container");

// Storage
const storageUsageBadge = document.getElementById("storage-usage-badge");

// Confirm modal
const confirmModal = document.getElementById("confirm-modal");
const confirmModalTitle = document.getElementById("confirm-modal-title");
const confirmModalText = document.getElementById("confirm-modal-text");
const confirmModalAccept = document.getElementById("confirm-modal-accept");
const confirmModalCancel = document.getElementById("confirm-modal-cancel");

// Video Edit Modal
const videoEditModal = document.getElementById("video-edit-modal");
const videoEditForm = document.getElementById("video-edit-form");
const videoEditSlotId = document.getElementById("video-edit-slot-id");
const videoEditLabel = document.getElementById("video-edit-label");
const videoEditDesc = document.getElementById("video-edit-desc");
const videoEditSaveBtn = document.getElementById("video-edit-save-btn");
const videoEditCancelBtn = document.getElementById("video-edit-cancel-btn");

// Publish
const publishDataBtn = document.getElementById("publish-data-btn");

function updateStorageUsage() {
  if (!storageUsageBadge) return;
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2; // UTF-16
      }
    }
    const mb = (total / (1024 * 1024)).toFixed(2);
    const maxMB = 5; // localStorage limit ~5MB
    const pct = Math.min(100, (total / (maxMB * 1024 * 1024)) * 100).toFixed(0);
    storageUsageBadge.textContent = `${mb} MB / ${maxMB} MB (${pct}%)`;
    storageUsageBadge.title = `Espacio utilizado en localStorage`;
  } catch(e) {
    // Silently fail
  }
}

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

// â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 
// CARGA DE DATOS
// â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 
  function loadCategories() {
    const savedCats = localStorage.getItem("elegance_categories");
    if (savedCats) {
      categories = JSON.parse(savedCats);
      const defaultOldIds = ["facial", "corporal", "depilacion", "unas-mirada"];
      const usedCategoryIds = new Set(services.map(s => s.category));
      categories = categories.filter(c => !defaultOldIds.includes(c.id) || usedCategoryIds.has(c.id));
      if (categories.length === 0) categories = [...initialCategoriesSeed];
      localStorage.setItem("elegance_categories", JSON.stringify(categories));
    } else {
      categories = [...initialCategoriesSeed];
      localStorage.setItem("elegance_categories", JSON.stringify(categories));
    }
  }

  function renderCategoryTabs() {
    const tabsContainer = document.querySelector(".category-tabs");
    if (!tabsContainer) return;
    
    tabsContainer.innerHTML = "";
    categories.forEach((cat, index) => {
      const btn = document.createElement("button");
      btn.className = `category-tab-btn ${index === 0 && !currentCategory ? "active" : (cat.id === currentCategory ? "active" : "")}`;
      btn.dataset.cat = cat.id;
      btn.textContent = cat.name;
      
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = cat.id;
        renderServicesTable();
      });
      
      tabsContainer.appendChild(btn);
      
      if (index === 0 && !currentCategory) {
        currentCategory = cat.id;
      }
    });
  }

  function renderCategorySelect() {
    const select = document.getElementById("service-category");
    if (!select) return;
    
    select.innerHTML = "";
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  }

  function renderCategoryManagerList() {
    const list = document.getElementById("category-manager-list");
    if (!list) return;
    
    list.innerHTML = "";
    categories.forEach(cat => {
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.justifyContent = "space-between";
      div.style.alignItems = "center";
      div.style.padding = "8px 0";
      div.style.borderBottom = "1px solid var(--color-border)";
      
      const nameSpan = document.createElement("span");
      nameSpan.textContent = cat.name;
      
      const actionsDiv = document.createElement("div");
      actionsDiv.style.display = "flex";
      actionsDiv.style.gap = "8px";
      
      const editBtn = document.createElement("button");
      editBtn.className = "action-btn action-btn--edit";
      editBtn.title = "Editar Categoría";
      editBtn.innerHTML = `<svg style="width: 16px; height: 16px; fill: currentColor; pointer-events: none;" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
      
      editBtn.addEventListener("click", () => {
        editingCategoryId = cat.id;
        newCategoryNameInput.value = cat.name;
        modalAddCategoryBtn.textContent = "Guardar Cambios";
      });
      
      const delBtn = document.createElement("button");
      delBtn.className = "action-btn action-btn--delete";
      delBtn.title = "Eliminar Categoría";
      delBtn.innerHTML = `<svg style="width: 16px; height: 16px; fill: currentColor; pointer-events: none;" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
      
      delBtn.addEventListener("click", () => {
        const hasServices = services.some(s => s.category === cat.id);
        if (hasServices) {
          showToast("No puedes eliminar esta categoría porque tiene servicios asociados.", "error");
          return;
        }
        
        categories = categories.filter(c => c.id !== cat.id);
        localStorage.setItem("elegance_categories", JSON.stringify(categories));
        renderCategoryTabs();
        renderCategorySelect();
        renderCategoryManagerList();
        
        if (currentCategory === cat.id && categories.length > 0) {
          currentCategory = categories[0].id;
          const firstTab = document.querySelector(".category-tab-btn");
          if(firstTab) firstTab.classList.add("active");
          renderServicesTable();
        }
        showToast("Categoría eliminada", "success");
      });
      
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(delBtn);
      div.appendChild(nameSpan);
      div.appendChild(actionsDiv);
      list.appendChild(div);
    });
  }

async function loadData() {
  loadCategories();
  renderCategoryTabs();
  renderCategorySelect();
  renderCategoryManagerList();
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
        
        // Migración temporal para asegurarse de que todos los 37 servicios están cargados en peluquería
        if (!services.some(s => s.name === "Add a Hair Cut to Any Colour Service")) {
          // Eliminar los antiguos de peluquería y recargar los 37
          services = services.filter(s => s.category !== "peluqueria");
          services = [...initialServicesSeed, ...services];
          localStorage.setItem("elegance_services", JSON.stringify(services));
        }
      } else {
        services = [...initialServicesSeed];
        localStorage.setItem("elegance_services", JSON.stringify(services));
      }

    const savedInfo = localStorage.getItem("elegance_salon_info");
    if (savedInfo) {
      salonInfo = JSON.parse(savedInfo);
      // Limpiar caracteres corruptos guardados en localStorage
      const cleanText = (txt) => (txt || "").replace(/â€“/g, '-').replace(/–/g, '-').replace(/\?"/g, '-').replace(/\?"/g, '-');
      if (salonInfo.hoursWeek) salonInfo.hoursWeek = cleanText(salonInfo.hoursWeek);
      if (salonInfo.hoursSat) salonInfo.hoursSat = cleanText(salonInfo.hoursSat);
      if (salonInfo.hoursSun) salonInfo.hoursSun = cleanText(salonInfo.hoursSun);
      if (salonInfo.hoursMon) salonInfo.hoursMon = cleanText(salonInfo.hoursMon);
    } else {
      salonInfo = { ...initialSalonInfoSeed };
      localStorage.setItem("elegance_salon_info", JSON.stringify(salonInfo));
    }

    // Galería
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
    servicesTbody.innerHTML = `<tr><td colspan="4" class="ui-state-empty" style="text-align: center; color: var(--color-text-muted); padding: 32px;" data-i18n="states.empty">${window.I18nLoader ? window.I18nLoader.getText("states.empty") : "Vacío"}</td></tr>`;
    if (window.I18nLoader) window.I18nLoader.translateDOM();
    return;
  }

  filtered.forEach(service => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="service-name-cell">${escapeHtml(service.name)}</td>
      <td class="service-desc-cell">${escapeHtml(service.duration)}</td>
      <td class="service-price-cell">${escapeHtml(formatPrice(service.price))}</td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="action-btn action-btn--edit" data-id="${service.id}" title="Editar" data-i18n-attr="title:admin.btn_edit">
            <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
        </button>
        <button class="action-btn action-btn--delete" data-id="${service.id}" title="Eliminar" data-i18n-attr="title:admin.btn_delete">
            <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
        </button>
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
  document.getElementById("info-whatsapp").value = salonInfo.whatsapp || "089 450 1215";
  document.getElementById("info-email").value = salonInfo.email || "";
  document.getElementById("info-address").value = salonInfo.address || "";
  document.getElementById("info-instagram").value = salonInfo.instagram || "elena_hairlover";
  document.getElementById("info-facebook").value = salonInfo.facebook || "";
  document.getElementById("info-hours-week").value = salonInfo.hoursWeek || "";
  document.getElementById("info-hours-sat").value = salonInfo.hoursSat || "";
  document.getElementById("info-hours-sun").value = salonInfo.hoursSun || "";
  document.getElementById("info-hours-mon").value = salonInfo.hoursMon || "";
}

async function deleteServiceItem(id) {
  const service = services.find(s => s.id === id);
  if (!service) return;

  const ok = await showConfirm(`Â¿Seguro que deseas eliminar el servicio "${service.name}"? Esta acción no se puede deshacer.`, { title: "Eliminar servicio" });
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

manageCategoriesBtn.addEventListener("click", () => {
  categoryModal.style.display = "flex";
});

categoryModalCloseBtn.addEventListener("click", () => {
  categoryModal.style.display = "none";
  editingCategoryId = null;
  categoryForm.reset();
  modalAddCategoryBtn.textContent = window.I18nLoader ? window.I18nLoader.getText("admin.add_category", "Añadir Categoría") : "Añadir Categoría";
});

categoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newCategoryNameInput.value.trim();
  if (!name) return;
  
  if (editingCategoryId) {
    // Edit mode
    const cat = categories.find(c => c.id === editingCategoryId);
    if (cat) {
      cat.name = name;
      localStorage.setItem("elegance_categories", JSON.stringify(categories));
      renderCategoryTabs();
      renderCategorySelect();
      renderCategoryManagerList();
      showToast("Categoría actualizada", "success");
    }
    editingCategoryId = null;
    modalAddCategoryBtn.textContent = window.I18nLoader ? window.I18nLoader.getText("admin.add_category", "Añadir Categoría") : "Añadir Categoría";
  } else {
    // Add mode
    const id = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    
    if (categories.find(c => c.id === id)) {
      showToast("Esta categoría ya existe.", "error");
      return;
    }
    
    categories.push({ id, name });
    localStorage.setItem("elegance_categories", JSON.stringify(categories));
    
    renderCategoryTabs();
    renderCategorySelect();
    renderCategoryManagerList();
    showToast("Categoría añadida", "success");
  }
  
  categoryForm.reset();
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
  const rawPrice = servicePriceInput.value.trim();
  const price = formatPrice(rawPrice);
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
  const hoursSun = document.getElementById("info-hours-sun").value.trim();
  const hoursMon = document.getElementById("info-hours-mon").value.trim();

  const data = { phone, whatsapp, email, address, instagram, facebook, hoursWeek, hoursSat, hoursSun, hoursMon };

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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GESTIÃ“N DE GALERÍA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function loadGallery() {
  const saved = localStorage.getItem("elegance_gallery");
  let needsSeed = true;
  
  if (saved) {
    galleryImages = JSON.parse(saved);
    // If we find the old broken images, re-seed
    if (galleryImages.some(img => img.src === "img/entrada.png" || img.src === "img/galeria1.png")) {
      needsSeed = true;
    } else {
      needsSeed = false;
    }
  } 
  
  if (needsSeed) {
    // Pre-cargar imágenes existentes del proyecto con descripciones por defecto
    galleryImages = [
      { id: "g_insta1", name: "Estilo", desc: "Trabajos de color y estilo", src: "img/Galeria_de_imagines/insta_solo_1.1.png", addedAt: Date.now() - 3000 },
      { id: "g_insta2", name: "Color", desc: "Resultados espectaculares", src: "img/Galeria_de_imagines/insta_solo_1.2.png", addedAt: Date.now() - 2000 }
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
  const ok = await showConfirm(`Â¿Eliminar la imagen "${img.name}" de la galería?`, { title: "Eliminar imagen" });
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GESTIÃ“N DEL CARRUSEL DEL HERO
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function loadHero() {
  const saved = localStorage.getItem("elegance_hero");
  let needsSeed = true;
  
  if (saved) {
    heroImages = JSON.parse(saved);
    if (heroImages.some(img => img.src === "img/entrada.png" || img.src === "img/galeria1.png")) {
      needsSeed = true;
    } else {
      needsSeed = false;
    }
  } 
  
  if (needsSeed) {
    // Semilla con las 2 fotos que ya están en el carrusel estático
    heroImages = [
      { id: "h_insta1", name: "Estilo", src: "img/Carusel_del_hero/insta_1.png", addedAt: Date.now() - 2000 },
      { id: "h_insta2", name: "Color", src: "img/Carusel_del_hero/insta_2.png", addedAt: Date.now() - 1000 }
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
    const orderBadge = index === 0 ? '<span class="gallery-card__order">1Âª · Portada</span>' : `<span class="gallery-card__order">${index + 1}Âª</span>`;
    card.innerHTML = `
      <div class="gallery-card__img-wrap">
        <img src="${img.src}" alt="${escapeHtml(img.name)}" loading="lazy" />
        <div class="gallery-card__overlay">
          <button class="gallery-btn gallery-btn--move" data-id="${img.id}" data-dir="-1" title="Mover antes" ${index === 0 ? "disabled" : ""}>â—€</button>
          <button class="gallery-btn gallery-btn--move" data-id="${img.id}" data-dir="1" title="Mover después" ${index === heroImages.length - 1 ? "disabled" : ""}>â–¶</button>
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
  const ok = await showConfirm(`Â¿Quitar la foto "${img.name}" del carrusel del hero?`, { title: "Quitar foto", acceptText: "Quitar" });
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NAVEGACIÃ“N DE PESTAÃ‘AS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
    else if (section === "reviews") document.getElementById("sec-reviews").classList.add("active");
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// UTILIDADES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
    <span>${type === "success" ? "âœ“" : "âœ—"}</span>
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GESTIÃ“N DE VÍDEOS Y METADATOS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

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
    metatext.textContent = `${file.name} · ${sizeMB} MB${!sizeOk ? ' âš ï¸ Comprime con HandBrake' : ' âœ“ Tamaño correcto'}`;
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

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPrice(price) {
  if (!price) return "";
  let p = String(price).trim();
  if (p.toLowerCase().includes("gratis") || p.toLowerCase().includes("free")) {
    return p;
  }
  p = p.replace(/€/g, "").trim();
  return `${p} €`;
}

// Inicializar al cargar
// ============================================================================
// AUTHENTICATION LOGIC (LOCAL MOCK)
// ============================================================================

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const loginOverlay = document.getElementById("login-overlay");
  const adminDashboard = document.getElementById("admin-dashboard");
  
  if (isLoggedIn) {
    if(loginOverlay) loginOverlay.style.display = "none";
    if(adminDashboard) adminDashboard.style.display = "block";
    initDatabase();
    initVideoManagement();
  } else {
    if(loginOverlay) loginOverlay.style.display = "flex";
    if(adminDashboard) adminDashboard.style.display = "none";
  }
}

function initAuth() {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const btnLogout = document.getElementById("btn-logout");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      if (email === "admin@salon.com" && password === "123456") {
        localStorage.setItem("isAdminLoggedIn", "true");
        loginError.style.display = "none";
        checkAuthStatus();
      } else {
        loginError.textContent = "Credenciales incorrectas (Usa: admin@salon.com / 123456)";
        loginError.style.display = "block";
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("isAdminLoggedIn");
      window.location.href = "index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  checkAuthStatus();

  const publishBtn = document.getElementById("publish-data-btn");
  if (publishBtn) {
    publishBtn.addEventListener("click", () => {
      showToast("Datos publicados en la web exitosamente (simulado en modo local)", "success");
      // Aquí se conectaría con la API o backend para actualizar la web pública
    });
  }
});



