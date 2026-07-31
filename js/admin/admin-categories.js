import { state } from './admin-state.js';
import { showToast } from './admin-ui.js';
import { renderServicesTable } from './admin-services.js';

export function loadCategories() {
  const savedCats = localStorage.getItem("elegance_categories");
  if (savedCats) {
    state.categories = JSON.parse(savedCats);
  } else {
    // default from state.js is empty, so we should import initialCategoriesSeed
    // but to avoid circular dependencies, we can do it here or let auth/init handle it
  }
}

export function renderCategoryTabs() {
  const tabsContainer = document.querySelector(".category-tabs");
  if (!tabsContainer) return;
  
  tabsContainer.innerHTML = "";
  state.categories.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.className = `category-tab-btn ${index === 0 && !state.currentCategory ? "active" : (cat.id === state.currentCategory ? "active" : "")}`;
    btn.dataset.cat = cat.id;
    btn.textContent = cat.name;
    
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentCategory = cat.id;
      renderServicesTable();
    });
    
    tabsContainer.appendChild(btn);
    
    if (index === 0 && !state.currentCategory) {
      state.currentCategory = cat.id;
    }
  });
}

export function renderCategorySelect() {
  const select = document.getElementById("service-category");
  if (!select) return;
  
  select.innerHTML = "";
  state.categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    select.appendChild(option);
  });
}

let editingCategoryId = null;

export function renderCategoryManagerList() {
  const list = document.getElementById("category-manager-list");
  if (!list) return;
  
  list.innerHTML = "";
  state.categories.forEach(cat => {
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
      document.getElementById("new-category-name").value = cat.name;
      document.getElementById("modal-add-category-btn").textContent = "Guardar Cambios";
    });
    
    const delBtn = document.createElement("button");
    delBtn.className = "action-btn action-btn--delete";
    delBtn.title = "Eliminar Categoría";
    delBtn.innerHTML = `<svg style="width: 16px; height: 16px; fill: currentColor; pointer-events: none;" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
    
    delBtn.addEventListener("click", () => {
      const hasServices = state.services.some(s => s.category === cat.id);
      if (hasServices) {
        showToast("No puedes eliminar esta categoría porque tiene servicios asociados.", "error");
        return;
      }
      
      state.categories = state.categories.filter(c => c.id !== cat.id);
      localStorage.setItem("elegance_categories", JSON.stringify(state.categories));
      renderCategoryTabs();
      renderCategorySelect();
      renderCategoryManagerList();
      
      if (state.currentCategory === cat.id && state.categories.length > 0) {
        state.currentCategory = state.categories[0].id;
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

export function initCategoryEvents() {
  const categoryForm = document.getElementById("category-form");
  const newCategoryNameInput = document.getElementById("new-category-name");
  const modalAddCategoryBtn = document.getElementById("modal-add-category-btn");
  const categoryModalCloseBtn = document.getElementById("category-modal-close-btn");
  const categoryModal = document.getElementById("category-modal");
  
  if (categoryModalCloseBtn) {
    categoryModalCloseBtn.addEventListener("click", () => {
      categoryModal.style.display = "none";
      editingCategoryId = null;
      categoryForm.reset();
      modalAddCategoryBtn.textContent = window.I18nLoader ? window.I18nLoader.getText("admin.add_category", "Añadir Categoría") : "Añadir Categoría";
    });
  }

  if (categoryForm) {
    categoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = newCategoryNameInput.value.trim();
      if (!name) return;
      
      if (editingCategoryId) {
        const cat = state.categories.find(c => c.id === editingCategoryId);
        if (cat) {
          cat.name = name;
          localStorage.setItem("elegance_categories", JSON.stringify(state.categories));
          renderCategoryTabs();
          renderCategorySelect();
          renderCategoryManagerList();
          showToast("Categoría actualizada", "success");
        }
        editingCategoryId = null;
        modalAddCategoryBtn.textContent = window.I18nLoader ? window.I18nLoader.getText("admin.add_category", "Añadir Categoría") : "Añadir Categoría";
      } else {
        const id = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
        
        if (state.categories.find(c => c.id === id)) {
          showToast("Esta categoría ya existe.", "error");
          return;
        }
        
        state.categories.push({ id, name });
        localStorage.setItem("elegance_categories", JSON.stringify(state.categories));
        
        renderCategoryTabs();
        renderCategorySelect();
        renderCategoryManagerList();
        showToast("Categoría añadida", "success");
      }
      
      categoryForm.reset();
    });
  }
}
