/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ELENA HAIRLOVER — Controladores JavaScript Dinámicos
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// Nota: el catálogo de servicios y los datos de contacto viven en el HTML
// estático de index.html (fuente de verdad, mejor para SEO). El panel de
// administración (admin.js) mantiene su propia semilla y escribe en
// localStorage / Firebase; esta web solo lee esos datos si existen.

document.addEventListener('DOMContentLoaded', () => {
  /* â”€â”€â”€ THEME TOGGLE (MAIN SITE) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const savedTheme = localStorage.getItem("elegance_main_theme") || "dark";
  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  const toggleButtons = [document.getElementById("main-theme-toggle"), document.getElementById("mobile-theme-toggle")];
  
  toggleButtons.forEach(btn => {
    if (!btn) return;
    const sunSVG = '<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>';
    const moonSVG = '<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>';
    
    btn.innerHTML = savedTheme === "light" ? moonSVG : sunSVG;
    
    btn.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const newTheme = isLight ? "dark" : "light";
      
      if (newTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("elegance_main_theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("elegance_main_theme", "dark");
      }
      
      toggleButtons.forEach(b => {
        if(b) b.innerHTML = newTheme === "light" ? moonSVG : sunSVG;
      });
    });
  });

  // ─── Header con scroll (Efecto Glassmorphism translúcido) ───
  const header = document.getElementById('header');
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll();
  }

  // â”€â”€â”€ Menú móvil â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    const setMenuState = (open) => {
      menuBtn.classList.toggle('active', open);
      mobileNav.classList.toggle('active', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    menuBtn.addEventListener('click', () => {
      setMenuState(!menuBtn.classList.contains('active'));
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });
  }

  // â”€â”€â”€ Pestañas de Servicios (Carta interactiva) â”€â”€â”€â”€â”€â”€â”€
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabButtons.length > 0 && tabPanels.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // â”€â”€â”€ Carrusel del Hero (autoplay + flechas + puntos + swipe) â”€â”€
  function initHeroCarousel() {
    const carousel = document.querySelector('.hero__carousel');
    if (!carousel) return;

    // Si el panel de administración guardó fotos del hero, reconstruimos los
    // slides desde localStorage. Si no, se conservan los slides estáticos.
    try {
      const savedHero = localStorage.getItem('elegance_hero');
      if (savedHero) {
        const heroImages = JSON.parse(savedHero);
        const slidesWrap = carousel.querySelector('.hero__slides');
        if (slidesWrap && Array.isArray(heroImages) && heroImages.length > 0) {
          slidesWrap.innerHTML = heroImages.map((img, i) => `
            <div class="hero__slide${i === 0 ? ' is-active' : ''}">
              <img class="block w-full h-full object-cover hero__slide-img" src="${escapeHtml(img.src)}" alt="" aria-hidden="true" />
            </div>
          `).join('');
        }
      }
    } catch (err) {
      console.error('No se pudieron cargar las fotos del hero:', err);
    }

    const slides = Array.from(carousel.querySelectorAll('.hero__slide'));
    const dotsWrap = carousel.querySelector('.hero__dots');
    const prevBtn = carousel.querySelector('.hero__arrow--prev');
    const nextBtn = carousel.querySelector('.hero__arrow--next');
    if (slides.length === 0) return;

    // Con una sola foto no hace falta navegación ni autoplay
    if (slides.length < 2) {
      [dotsWrap, prevBtn, nextBtn].forEach(el => el && (el.style.display = 'none'));
      return;
    }

    let current = slides.findIndex(s => s.classList.contains('is-active'));
    if (current < 0) current = 0;

    // Generar un punto por slide
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero__dot' + (i === current ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
      dotsWrap && dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }
    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
    nextBtn && nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

    // Autoplay (respeta prefers-reduced-motion)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = parseInt(carousel.getAttribute('data-autoplay'), 10) || 5000;
    let timer = null;
    function startAutoplay() {
      if (reduceMotion) return;
      timer = setInterval(next, interval);
    }
    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function resetAutoplay() { stopAutoplay(); startAutoplay(); }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // Swipe táctil
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); resetAutoplay(); }
    }, { passive: true });

    startAutoplay();
  }
  initHeroCarousel();

  // â”€â”€â”€ Lightbox de galería (ELEGANCE UX v1) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Visor a pantalla completa. Usa delegación en .galeria__grid para que
  // funcione también con las imágenes inyectadas dinámicamente.
  function initGalleryLightbox() {
    const grid = document.querySelector('.galeria__grid');
    if (!grid) return;

    let box = document.getElementById('lightbox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'lightbox';
      box.className = 'lightbox';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', 'Imagen ampliada');
      box.innerHTML =
        '<button type="button" class="lightbox__close" aria-label="Cerrar">&times;</button>' +
        '<img class="lightbox__img" src="" alt="" />';
      document.body.appendChild(box);
    }
    const boxImg = box.querySelector('.lightbox__img');
    const closeBtn = box.querySelector('.lightbox__close');

    function open(src, alt) {
      boxImg.src = src;
      boxImg.alt = alt || '';
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      boxImg.src = '';
    }

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.galeria__item');
      if (!item) return;
      const img = item.querySelector('img');
      if (img) open(img.currentSrc || img.src, img.alt);
    });

    closeBtn.addEventListener('click', close);
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && box.classList.contains('is-open')) close();
    });
  }
  initGalleryLightbox();

  // â”€â”€â”€ CARGA DINÁMICA DE TRATAMIENTOS Y CONFIGURACIÃ“N â”€â”€â”€â”€â”€â”€
  async function initDynamicContent() {
    let services = [];
    let salonInfo = {};

    if (window.useFirebase && window.FirebaseLibPublic) {
      // Leer de Firebase
      const { getDocs, collection, getFirestore, initializeApp } = window.FirebaseLibPublic;
      try {
        const app = initializeApp(window.firebaseConfig);
        const db = getFirestore(app);
        
        // Servicios
        const sSnap = await getDocs(collection(db, "servicios"));
        sSnap.forEach(doc => {
          services.push({ id: doc.id, ...doc.data() });
        });

        // Información General
        const iSnap = await getDocs(collection(db, "salon_info"));
        if (!iSnap.empty) {
          salonInfo = iSnap.docs[0].data();
        }
      } catch (err) {
        console.error("Error al cargar de Firebase, usando fallback local:", err);
      }
    }

    // El HTML estático ya contiene el catálogo completo (mejor para SEO y sin
    // parpadeo). Solo re-renderizamos dinámicamente si hay datos REALES:
    // de Firebase, o ediciones guardadas por el panel de administración en
    // localStorage. Si no hay nada, conservamos el HTML tal cual.
    if (services.length === 0) {
      const savedServices = localStorage.getItem("elegance_services");
      if (savedServices) {
        services = JSON.parse(savedServices);
      }
    }

    // Fallback con el catálogo de peluquería
    const hairServices = (services.length > 0)
      ? services.filter(s => !s.category || s.category === "peluqueria")
      : [
          { id: "p1", name: "Wash, Cut & Blow Dry - Short", duration: "45 mins", price: "55 €" },
          { id: "p2", name: "Wash, Cut & Blow Dry - Medium", duration: "1 hour", price: "60 €" },
          { id: "p3", name: "Wash, Cut & Blow Dry - Long", duration: "1 hour", price: "65 €" },
          { id: "p4", name: "Straight Blow Dry - Short", duration: "30 mins", price: "25 €" },
          { id: "p5", name: "Straight Blow Dry - Medium", duration: "30 mins", price: "28 €" },
          { id: "p6", name: "Straight Blow Dry - Long", duration: "30 mins", price: "30 €" },
          { id: "p7", name: "Curly/Wavy/Boho Blow Dry - Short", duration: "45 mins", price: "35 €" },
          { id: "p8", name: "Curly/Wavy/Boho Blow Dry - Medium", duration: "45 mins", price: "38 €" },
          { id: "p9", name: "Curly/Wavy/Boho Blow Dry - Long", duration: "45 mins", price: "40 €" },
          { id: "p10", name: "Extensions Blow Dry - Straight", duration: "1 hour", price: "40 €" },
          { id: "p11", name: "Extensions Blow Dry - Curly/Wavy/Ghd", duration: "1 hour", price: "45 €" },
          { id: "p12", name: "Dry cut", duration: "30 mins", price: "30 €" },
          { id: "p13", name: "12 Week Blow Dry - Short", duration: "2 hours", price: "120 €" },
          { id: "p14", name: "12 Week Blow Dry - Medium", duration: "2 hours, 30 mins", price: "130 €" },
          { id: "p15", name: "12 Week Blow Dry - Long", duration: "3 hours", price: "140 €" },
          { id: "p16", name: "Root Tint - Short", duration: "1 hour, 30 mins", price: "70 €" },
          { id: "p17", name: "Root Tint - Medium", duration: "1 hour, 45 mins", price: "75 €" },
          { id: "p18", name: "Root Tint - Long", duration: "2 hours", price: "80 €" },
          { id: "p19", name: "Full Tint ( Roots to Ends ) - Short", duration: "2 hours", price: "80 €" },
          { id: "p20", name: "Full Tint ( Roots to Ends ) - Medium", duration: "2 hours", price: "85 €" },
          { id: "p21", name: "Full Tint ( Roots to Ends ) - Long", duration: "2 hours, 30 mins", price: "95 €" },
          { id: "p22", name: "Colour and Partial Highlights - Short", duration: "2 hours", price: "120 €" },
          { id: "p23", name: "Colour and Partial Highlights - Medium", duration: "2 hours, 30 mins", price: "130 €" },
          { id: "p24", name: "Colour and Partial Highlights - Long", duration: "3 hours", price: "135 €" },
          { id: "p25", name: "Full Head Highlights - Short", duration: "3 hours", price: "145 €" },
          { id: "p26", name: "Full Head Highlights - Medium", duration: "3 hours, 30 mins", price: "155 €" },
          { id: "p27", name: "Full Head Highlights - Long", duration: "3 hours, 30 mins", price: "165 €" },
          { id: "p28", name: "Half Head Highlights - Short", duration: "2 hours, 30 mins", price: "125 €" },
          { id: "p29", name: "Half Head Highlights - Medium", duration: "2 hours, 45 mins", price: "130 €" },
          { id: "p30", name: "Half Head Highlights - Long", duration: "3 hours", price: "135 €" },
          { id: "p31", name: "Balayage - Short", duration: "3 hours", price: "145 €" },
          { id: "p32", name: "Balayage - Medium", duration: "3 hours", price: "155 €" },
          { id: "p33", name: "Balayage - Long", duration: "3 hours, 30 mins", price: "165 €" },
          { id: "p34", name: "Upstyle", duration: "1 hour", price: "60 €" },
          { id: "p35", name: "Olaplex Treatment", duration: "15 mins", price: "25 €" },
          { id: "p36", name: "K18 Treatment", duration: "15 mins", price: "20 €" },
          { id: "p37", name: "Add a Hair Cut to Any Colour Service", duration: "30 mins", price: "20 €" },
          { id: "p38", name: "Consultation", duration: "10 mins", price: "Gratis" }
        ];

    const savedInfo = localStorage.getItem("elegance_salon_info");
    if (!salonInfo.phone && savedInfo) {
      salonInfo = JSON.parse(savedInfo);
    }

    const listContainer = document.getElementById("services-peluqueria");
    if (listContainer) {
      listContainer.innerHTML = "";
      const currentLang = (window.I18nLoader && window.I18nLoader.currentLang) || "es";
      const reserveText = (currentLang === "en") ? "Book" : "Reservar";
      
      hairServices.forEach(s => {
        const item = document.createElement("div");
        item.className = "service-item";
        item.innerHTML = `
          <div>
            <span class="service-item__name">${escapeHtml(s.name)}</span>
            <span class="service-item__duration">${escapeHtml(s.duration)}</span>
          </div>
          <div class="service-item__dots"></div>
          <span class="service-item__price">${escapeHtml(formatPrice(s.price))}</span>
          <a href="https://elenahairlover.gettimely.com" target="_blank" class="service-item__btn" data-i18n="services.btn_reserve" data-service="${escapeHtml(s.name)}">${reserveText}</a>
        `;
        listContainer.appendChild(item);
      });
      if (window.I18nLoader && typeof window.I18nLoader.applyTranslations === "function") {
        window.I18nLoader.applyTranslations();
      }
    }

    // Inyectar datos del salón solo si el panel los ha personalizado
    if (salonInfo && salonInfo.phone) {
      updateSalonContactInfo(salonInfo);
    }

    // Cargar galería dinámicamente (solo si hay imágenes guardadas)
    await loadDynamicGallery();
  }

  async function loadDynamicGallery() {
    // Solo sustituimos la galería estática si el panel de administración ha
    // guardado imágenes propias. Si no, conservamos el HTML (mejor SEO, sin
    // parpadeo y sin riesgo de referenciar imágenes inexistentes).
    const saved = localStorage.getItem("elegance_gallery");
    if (!saved) return;

    const gallery = JSON.parse(saved);
    const grid = document.querySelector(".galeria__grid");
    if (grid && gallery.length > 0) {
      grid.innerHTML = "";
      gallery.forEach((img, index) => {
        const item = document.createElement("div");
        const isFeatured = index === 0;
        item.className = `galeria__item ${isFeatured ? 'featured' : ''} fade-in-up`;
        if (index > 0) {
          item.style.animationDelay = `${index * 0.15}s`;
        }

        const desc = img.desc || "";

        item.innerHTML = `
          <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.name)}" class="galeria__img" width="1200" height="900" loading="lazy" />
          <div class="galeria__overlay">
            <h3 class="galeria__overlay-title">${escapeHtml(img.name)}</h3>
            <p class="galeria__overlay-desc">${escapeHtml(desc)}</p>
          </div>
        `;
        grid.appendChild(item);
      });
    }
  }

  function updateSalonContactInfo(info) {
    // Teléfono
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      const displayFormatted = info.phone || "089 450 1215";
      let cleanDigits = displayFormatted.replace(/\D/g, '');
      if (cleanDigits.startsWith('0')) cleanDigits = cleanDigits.substring(1);
      if (!cleanDigits.startsWith('353')) cleanDigits = '353' + cleanDigits;
      link.href = `tel:+${cleanDigits}`;
      if (!link.classList.contains('floating-actions__btn')) {
        link.textContent = displayFormatted;
      }
    });

    // WhatsApp (botón flotante) — normalizado a wa.me/353…
    let wa = (info.whatsapp || "0894501215").replace(/\D/g, '');
    if (wa.startsWith('0')) wa = wa.substring(1);
    if (!wa.startsWith('353')) wa = '353' + wa;
    document.querySelectorAll('[data-whatsapp]').forEach(link => {
      link.href = 'https://wa.me/' + wa;
    });

    // Email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      const email = info.email || "info@elenahairlover.com";
      link.textContent = email;
      link.href = `mailto:${email}`;
    });

    // Redes Sociales
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
      const ig = info.instagram || "elena_hairlover";
      const cleanIg = ig.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/$/, '');
      link.href = `https://www.instagram.com/${cleanIg}/`;
    });

    const facebookLinks = document.querySelectorAll('a[href*="facebook.com"]');
    facebookLinks.forEach(link => {
      link.href = info.facebook || "https://www.facebook.com/elena_hairlover";
    });

    // Horarios
    const horarioCard = document.querySelector('.contacto__horario-card');
    if (horarioCard) {
      const rows = horarioCard.querySelectorAll('.contacto__horario-row');
      if (rows.length >= 2) {
        rows[0].querySelector('span:nth-child(2)').textContent = info.hoursWeek || "09:00h – 19:00h";
        rows[1].querySelector('span:nth-child(2)').textContent = info.hoursSat || "08:00h – 15:00h";
      }
    }
  }

  function escapeHtml(text) {
    if (!text) return "";
    return text
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



  // Inicializar carga dinámica
  // Esperamos 100ms para asegurar que Firebase CDN y config.js terminen de registrarse
  setTimeout(() => {
    initDynamicContent();
  }, 100);

  // Escuchar cambios en localStorage (para actualizar al editar en admin.html en otra pestaña)
  window.addEventListener("storage", (e) => {
    if (e.key === "elegance_services" || e.key === "elegance_salon_info" || e.key === "elegance_gallery") {
      initDynamicContent();
    }
  });
});

