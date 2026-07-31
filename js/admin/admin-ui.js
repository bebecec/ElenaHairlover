import { state } from './admin-state.js';

export function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatPrice(price) {
  if (!price) return "";
  let p = String(price).trim();
  if (p.toLowerCase().includes("gratis") || p.toLowerCase().includes("free")) {
    return p;
  }
  p = p.replace(/€/g, "").trim();
  return `${p} €`;
}

export function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;
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

export function showConfirm(message, { title = "Confirmar acción", acceptText = "Eliminar" } = {}) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("confirm-modal");
    const titleEl = document.getElementById("confirm-modal-title");
    const textEl = document.getElementById("confirm-modal-text");
    const acceptBtn = document.getElementById("confirm-modal-accept");
    const cancelBtn = document.getElementById("confirm-modal-cancel");

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

export function updateStorageUsage() {
  const storageUsageBadge = document.getElementById("storage-usage-badge");
  if (!storageUsageBadge) return;
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }
    const mb = (total / (1024 * 1024)).toFixed(2);
    const maxMB = 5;
    const pct = Math.min(100, (total / (maxMB * 1024 * 1024)) * 100).toFixed(0);
    storageUsageBadge.textContent = `${mb} MB / ${maxMB} MB (${pct}%)`;
    storageUsageBadge.title = `Espacio utilizado en localStorage`;
  } catch(e) {}
}

export function initTabs() {
  document.querySelectorAll(".admin-tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".admin-section").forEach(s => s.classList.remove("active"));

      e.target.classList.add("active");
      const section = e.target.getAttribute("data-section");

      if (section === "servicios") document.getElementById("sec-servicios").classList.add("active");
      else if (section === "hero") document.getElementById("sec-hero").classList.add("active");
      else if (section === "galeria") document.getElementById("sec-galeria").classList.add("active");
      else if (section === "reviews") document.getElementById("sec-reviews").classList.add("active");
      else if (section === "videos") document.getElementById("sec-videos").classList.add("active");
      else document.getElementById("sec-informacion").classList.add("active");
    });
  });
}
