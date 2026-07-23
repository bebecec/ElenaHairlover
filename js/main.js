/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ELEGANCE BY STOICA â€” Controladores JavaScript DinÃ¡micos
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// Nota: el catÃ¡logo de servicios y los datos de contacto viven en el HTML
// estÃ¡tico de index.html (fuente de verdad, mejor para SEO). El panel de
// administraciÃ³n (admin.js) mantiene su propia semilla y escribe en
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
    btn.textContent = savedTheme === "light" ? "ðŸŒ™" : "â˜€ï¸";
    
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
        if(b) b.textContent = newTheme === "light" ? "ðŸŒ™" : "â˜€ï¸";
      });
    });
  });

  // â”€â”€â”€ Header con scroll (Efecto Glassmorphism translÃºcido) â”€â”€
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

  // â”€â”€â”€ MenÃº mÃ³vil â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

  // â”€â”€â”€ PestaÃ±as de Servicios (Carta interactiva) â”€â”€â”€â”€â”€â”€â”€
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

    // Si el panel de administraciÃ³n guardÃ³ fotos del hero, reconstruimos los
    // slides desde localStorage. Si no, se conservan los slides estÃ¡ticos.
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

    // Con una sola foto no hace falta navegaciÃ³n ni autoplay
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

    // Swipe tÃ¡ctil
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

  // â”€â”€â”€ Lightbox de galerÃ­a (ELEGANCE UX v1) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Visor a pantalla completa. Usa delegaciÃ³n en .galeria__grid para que
  // funcione tambiÃ©n con las imÃ¡genes inyectadas dinÃ¡micamente.
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

  // â”€â”€â”€ CARGA DINÃMICA DE TRATAMIENTOS Y CONFIGURACIÃ“N â”€â”€â”€â”€â”€â”€
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

        // InformaciÃ³n General
        const iSnap = await getDocs(collection(db, "salon_info"));
        if (!iSnap.empty) {
          salonInfo = iSnap.docs[0].data();
        }
      } catch (err) {
        console.error("Error al cargar de Firebase, usando fallback local:", err);
      }
    }

    // El HTML estÃ¡tico ya contiene el catÃ¡logo completo (mejor para SEO y sin
    // parpadeo). Solo re-renderizamos dinÃ¡micamente si hay datos REALES:
    // de Firebase, o ediciones guardadas por el panel de administraciÃ³n en
    // localStorage. Si no hay nada, conservamos el HTML tal cual.
    if (services.length === 0) {
      const savedServices = localStorage.getItem("elegance_services");
      if (savedServices) {
        services = JSON.parse(savedServices);
      }
    }

    const savedInfo = localStorage.getItem("elegance_salon_info");
    if (!salonInfo.phone && savedInfo) {
      salonInfo = JSON.parse(savedInfo);
    }

    // Renderizar Servicios solo si hay datos dinÃ¡micos; si no, se conserva el
    // HTML estÃ¡tico ya presente en la pÃ¡gina.
    if (services.length > 0) {
      const categories = ["facial", "corporal", "peluqueria", "depilacion", "unas-mirada"];
      categories.forEach(cat => {
        const panel = document.getElementById(cat);
        if (panel) {
          const listContainer = panel.querySelector(".services-list");
          if (listContainer) {
            listContainer.innerHTML = ""; // Limpiar

            const catServices = services.filter(s => s.category === cat);
            if (catServices.length === 0) {
              listContainer.innerHTML = `<p style="grid-column: span 2; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">PrÃ³ximamente nuevos servicios.</p>`;
              return;
            }

            catServices.forEach(s => {
              const item = document.createElement("div");
              item.className = "service-item";
              item.innerHTML = `
                <div>
                  <span class="service-item__name">${escapeHtml(s.name)}</span>
                  <span class="service-item__duration">${escapeHtml(s.duration)}</span>
                </div>
                <div class="service-item__dots"></div>
                <span class="service-item__price">${escapeHtml(s.price)}</span>
                <a href="https://elenahairlover.gettimely.com" target="_blank" class="service-item__btn" data-service="${escapeHtml(s.name)}">Reservar</a>
              `;
              listContainer.appendChild(item);
            });
          }
        }
      });
    }

    // Inyectar datos del salÃ³n solo si el panel los ha personalizado
    if (salonInfo && salonInfo.phone) {
      updateSalonContactInfo(salonInfo);
    }

    // Cargar galerÃ­a dinÃ¡micamente (solo si hay imÃ¡genes guardadas)
    await loadDynamicGallery();
  }

  async function loadDynamicGallery() {
    // Solo sustituimos la galerÃ­a estÃ¡tica si el panel de administraciÃ³n ha
    // guardado imÃ¡genes propias. Si no, conservamos el HTML (mejor SEO, sin
    // parpadeo y sin riesgo de referenciar imÃ¡genes inexistentes).
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
    // TelÃ©fono
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      const displayFormatted = info.phone || "872 03 24 92";
      link.href = `tel:+34${displayFormatted.replace(/\s+/g, '')}`;
      // El botÃ³n flotante conserva su icono SVG; solo se actualiza su enlace.
      if (!link.classList.contains('floating-actions__btn')) {
        link.textContent = displayFormatted;
      }
    });

    // WhatsApp (botÃ³n flotante) â€” nÃºmero propio, normalizado a wa.me/34â€¦
    let wa = (info.whatsapp || "648158717").replace(/\D/g, '');
    if (!wa.startsWith('34')) wa = '34' + wa;
    document.querySelectorAll('[data-whatsapp]').forEach(link => {
      link.href = 'https://wa.me/' + wa;
    });

    // Email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      const email = info.email || "salonfashiongirona@yahoo.com";
      link.textContent = email;
      link.href = `mailto:${email}`;
    });

    // DirecciÃ³n
    const addressElements = document.querySelectorAll('.contacto__item p, .footer__contact p');
    addressElements.forEach(el => {
      if (el.textContent.includes("Jaume I") || el.textContent.includes("Girona, EspaÃ±a")) {
        const address = info.address || "Gran Via de Jaume I, 6, local 1\n17001 Girona, EspaÃ±a";
        el.innerHTML = address.replace(/\n/g, '<br>');
      }
    });

    // Redes Sociales
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
      link.href = info.instagram || "https://www.instagram.com/elegancebystoica/?hl=es";
    });

    const facebookLinks = document.querySelectorAll('a[href*="facebook.com"]');
    facebookLinks.forEach(link => {
      link.href = info.facebook || "https://www.facebook.com/p/Elegance-by-Stoica-100063673163183/";
    });

    // Horarios
    const horarioCard = document.querySelector('.contacto__horario-card');
    if (horarioCard) {
      const rows = horarioCard.querySelectorAll('.contacto__horario-row');
      if (rows.length >= 2) {
        rows[0].querySelector('span:nth-child(2)').textContent = info.hoursWeek || "09:00h â€“ 19:00h";
        rows[1].querySelector('span:nth-child(2)').textContent = info.hoursSat || "08:00h â€“ 15:00h";
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



  // Inicializar carga dinÃ¡mica
  // Esperamos 100ms para asegurar que Firebase CDN y config.js terminen de registrarse
  setTimeout(() => {
    initDynamicContent();
  }, 100);

});

