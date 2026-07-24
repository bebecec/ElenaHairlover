/* â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 
   ELENA HAIRLOVER — Controladores JavaScript Dinámicos
   â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â•  */

// Nota: el catálogo de servicios y los datos de contacto viven en el HTML
// estático de index.html (fuente de verdad, mejor para SEO). El panel de
// administración (admin.js) mantiene su propia semilla y escribe en
// localStorage / Firebase; esta web solo lee esos datos si existen.

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
