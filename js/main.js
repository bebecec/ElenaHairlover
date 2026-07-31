/* â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 
   ELENA HAIRLOVER — Controladores JavaScript Dinámicos
   â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â•  */

// Nota: el catálogo de servicios y los datos de contacto viven en el HTML
// estático de index.html (fuente de verdad, mejor para SEO). El panel de
// administración (admin.js) mantiene su propia semilla y escribe en
// localStorage / Firebase; esta web solo lee esos datos si existen.

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.addEventListener('DOMContentLoaded', () => {
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
    
    window.I18nLoader.init().then(() => {
      console.log('Idioma cargado y aplicado.');
      loadSalonInfo(); // Cargar la info de contacto desde el panel
    });
    
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
      if (e.key === 'Escape') close();
    });
  }
  
  initGalleryLightbox();
  
  // Renderizar servicios dinámicamente desde localStorage (si existe)
  function renderPublicServices() {
    const listContainer = document.getElementById("public-services-list");
    if (!listContainer) return;
    
    const savedServices = localStorage.getItem("elegance_services");
    let services = [];
    
    if (savedServices) {
      services = JSON.parse(savedServices);
    } else {
      // Fallback a los servicios por defecto si la base de datos local está limpia
      services = [
        { name: "Wash, Cut & Blow Dry - Short", duration: "45 mins", price: "55 €" },
        { name: "Wash, Cut & Blow Dry - Medium", duration: "1 hour", price: "60 €" },
        { name: "Wash, Cut & Blow Dry - Long", duration: "1 hour", price: "65 €" },
        { name: "Straight Blow Dry - Short", duration: "30 mins", price: "25 €" },
        { name: "Straight Blow Dry - Medium", duration: "30 mins", price: "28 €" },
        { name: "Straight Blow Dry - Long", duration: "30 mins", price: "30 €" },
        { name: "Balayage - Medium", duration: "3 hours", price: "155 €" },
        { name: "Olaplex Treatment", duration: "15 mins", price: "25 €" }
      ];
    }
    
    function renderList() {
      listContainer.innerHTML = "";
      
      if (services.length === 0) {
        listContainer.innerHTML = `<p style="text-align:center; padding: 20px;">No hay servicios disponibles.</p>`;
        return;
      }
      
      services.forEach(s => {
        const item = document.createElement("div");
        item.className = "service-item";
        item.innerHTML = `
          <h4 class="service-item__name">${s.name}</h4>
          <div class="service-item__dots"></div>
          <div class="service-item__desc" style="margin-right: 20px; align-self: center; white-space: nowrap;">${s.duration}</div>
          <span class="service-item__price">${s.price}</span>
          <a href="https://elenahairlover.gettimely.com" target="_blank" class="service-item__btn font-body text-[0.7rem] font-semibold uppercase tracking-[0.15em] px-6 py-2.5 bg-gold-warm text-dark-main border border-gold-warm hover:bg-transparent hover:text-gold-warm transition-colors duration-200" data-i18n="nav.book">Reservar Cita</a>
        `;
        listContainer.appendChild(item);
      });
    }
    
    renderList();
  }
  
  renderPublicServices();

  // ── RENDER PUBLIC GALLERY ──
  function renderPublicGallery() {
    const grid = document.getElementById("public-gallery-grid");
    if (!grid) return;

    let savedGallery = localStorage.getItem("elegance_gallery");
    let galleryImages = [];

    if (savedGallery) {
      galleryImages = JSON.parse(savedGallery);
    }

    if (!savedGallery || galleryImages.length <= 2) {
      // Seed if missing or only has the old 2 default images
      const images = [
        "insta_9.png", "insta_solo_1.1.png", "insta_solo_1.2.png", "insta_solo_1.3.png", 
        "insta_solo_2.1.png", "insta_solo_2.2.png", "insta_solo_2.3.png", "insta_solo_3.1.png", 
        "insta_solo_3.2.png", "insta_solo_3.3.png", "insta_solo_4.1.png", "insta_solo_4.2.png", 
        "insta_solo_4.3.png", "insta_solo_5.1.png", "insta_solo_5.2.png", "insta_solo_5.3.png", 
        "insta_solo_6.1.png", "insta_solo_6.2.png", "insta_solo_6.3.png", "insta_solo_7.1.png", 
        "insta_solo_7.2.png", "insta_solo_7.3.png", "insta_solo_8.1.png", "insta_solo_8.2.png"
      ];
      galleryImages = images.map((img, i) => ({
        id: "g_seed_" + i,
        name: "Elena Hairlover",
        desc: "Galería de resultados",
        src: "img/Galeria_de_imagines/" + img,
        addedAt: Date.now() - (i * 1000)
      }));
      localStorage.setItem("elegance_gallery", JSON.stringify(galleryImages));
    }

    grid.innerHTML = "";
    galleryImages.forEach((item, index) => {
      const delay = (index % 6) * 0.1;
      grid.innerHTML += `
        <div class="galeria__item fade-in-up" style="animation-delay: ${delay}s">
          <picture>
            <source srcset="${item.src}" type="image/png" />
            <img src="${item.src}" alt="${item.name}" class="galeria__img" loading="lazy" />
          </picture>
          <div class="galeria__overlay">
            <svg class="galeria__overlay-icon" viewBox="0 0 24 24" width="32" height="32" fill="var(--color-text-light)">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <p class="galeria__overlay-desc" style="margin-top: 10px;">${item.name}</p>
          </div>
        </div>
      `;
    });
  }
  renderPublicGallery();

  // ─── CARGA DE INFO DE CONTACTO ───
  function loadSalonInfo() {
    try {
      const saved = localStorage.getItem("elegance_salon_info");
      if (saved) {
        const info = JSON.parse(saved);
        
        const addrEl = document.getElementById("public-info-address");
        if (addrEl && info.address) addrEl.textContent = info.address;
        
        const phoneEl = document.getElementById("public-info-phone");
        if (phoneEl && info.phone) {
          phoneEl.textContent = info.phone;
          phoneEl.href = `tel:${info.phone.replace(/\s+/g, '')}`;
          // También actualizar el botón flotante si existe
          const floatBtn = document.querySelector(".floating-actions__btn");
          if (floatBtn) floatBtn.href = `tel:${info.phone.replace(/\s+/g, '')}`;
        }
        
        const emailEl = document.getElementById("public-info-email");
        if (emailEl && info.email) {
          emailEl.textContent = info.email;
          emailEl.href = `mailto:${info.email}`;
        }
        
        const hoursEl = document.getElementById("public-info-hours");
        if (hoursEl && info.hoursWeek && info.hoursSat) {
          // Remover el data-i18n porque estamos usando datos dinámicos customizados
          hoursEl.removeAttribute("data-i18n");
          hoursEl.textContent = `Horario: Mar-Vie: ${info.hoursWeek} / Sáb: ${info.hoursSat}`;
        }
      }
    } catch(err) {
      console.error("Error loading salon info:", err);
    }
  }

  loadSalonInfo(); // Cargar la info de contacto desde el panel

});


// --- GOOGLE REVIEWS LOGIC ---
function renderPublicReviews() {
  const grid = document.getElementById("reviews-grid");
  if (!grid) return;
  
  const stored = localStorage.getItem("elegance_google_reviews");
  let reviews = [];
  if (stored) {
    try { reviews = JSON.parse(stored); } catch(e){}
  }
  
  // Filter active reviews
  const activeReviews = reviews.filter(r => r.active);
  
  grid.innerHTML = "";
  
  if (activeReviews.length === 0) {
    // Render fallback if empty
    grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: rgba(255,255,255,0.5); padding: 40px;">No hay testimonios disponibles en este momento.</div>';
    return;
  }
  
  activeReviews.forEach((rev, index) => {
    const delay = index * 0.1;
    const initial = rev.author ? rev.author.charAt(0) : "A";
    const photoHtml = rev.photo 
      ? `<img src="${rev.photo}" style="width: 100%; height: 100%; object-fit: cover;">`
      : initial;
      
    const stars = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);
    
    // We create the card
    const card = document.createElement("div");
    card.className = "testimonio__card fade-in-up";
    card.style.cssText = `background: rgba(255,255,255,0.02); padding: 40px; border: 1px solid rgba(201,168,76,0.15); transition: transform 0.3s ease, border-color 0.3s ease; animation-delay: ${delay}s;`;
    
    card.innerHTML = `
      <div class="testimonio__stars" style="color: var(--color-gold-warm); font-size: 1.2rem; margin-bottom: 15px; letter-spacing: 2px;">${stars}</div>
      <p class="testimonio__text" style="color: rgba(255,255,255,0.7); font-style: italic; line-height: 1.8; margin-bottom: 30px; font-size: 0.95rem;">"${rev.text}"</p>
      <div class="testimonio__author" style="display: flex; align-items: center; gap: 15px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
        <div class="testimonio__avatar" style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, var(--color-gold-warm), #8f722a); color: #111; display: flex; align-items: center; justify-content: center; font-weight: 500; font-family: var(--font-display); font-size: 1.2rem; overflow: hidden;">
          ${photoHtml}
        </div>
        <div>
          <h4 style="color: var(--color-text-light); font-size: 0.95rem; margin-bottom: 2px; font-weight: 600; letter-spacing: 0.05em;">${rev.author}</h4>
          <span style="color: var(--color-gold-warm); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Cliente Google</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
