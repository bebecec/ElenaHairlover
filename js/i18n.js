/* ═══════════════════════════════════════════════════════════
   ELEGANCE BY STOICA — Sistema multilingüe (i18n) vanilla
   Idiomas: ES (completo) · CAT (completo) · RO / RU (pendientes).
   - Marca el texto con [data-i18n] / [data-i18n-attr] en index.html.
   - Persiste el idioma en localStorage["elegance_lang"] (clave propia,
     no interfiere con el panel de administración).
   - Cubre SOLO el contenido estático. Lo que main.js re-renderiza desde
     localStorage (servicios/galería editados) queda en su idioma original.
   ELEGANCE UX v1 — i18n
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var STORAGE_KEY = "elegance_lang";
  var DEFAULT_LANG = "es";
  var LANGS = ["es", "cat", "ro", "ru"];

  var translations = {
    es: {
      "nav.home": "Inicio",
      "nav.services": "Servicios",
      "nav.experience": "Experiencia",
      "nav.gallery": "Galería",
      "nav.contact": "Contacto",
      "nav.book": "Reservar Cita",

      "hero.title": "Peluquería & Estética Avanzada · Girona",
      "hero.subtitle": "Peluquería de vanguardia y estética avanzada en Girona. Un oasis de bienestar y tratamientos exclusivos personalizados para ti.",
      "hero.cta_primary": "Reservar Cita Online",
      "hero.cta_secondary": "Explorar Servicios",
      "hero.prev": "Foto anterior",
      "hero.next": "Foto siguiente",
      "nav.menu": "Abrir menú",

      "services.label": "Nuestra Carta de Precios",
      "services.title": "Servicios & Tratamientos",
      "services.tab_facial": "Estética Facial",
      "services.tab_corporal": "Estética Corporal",
      "services.tab_peluqueria": "Peluquería",
      "services.tab_depilacion": "Depilación",
      "services.tab_unas": "Cejas & Pestañas",
      "services.btn_reserve": "Reservar",
      "services.badge_free": "Gratis",

      "experience.label": "El Proceso",
      "experience.title": "Tu Experiencia Elegance",
      "experience.step1_title": "Consulta Inicial",
      "experience.step1_text": "Evaluamos detalladamente las necesidades de tu piel, cuerpo o cabello en una cita de diagnóstico gratuita.",
      "experience.step2_title": "Plan Personalizado",
      "experience.step2_text": "Diseñamos un protocolo a medida combinando estilismo y la tecnología estética idónea para ti.",
      "experience.step3_title": "Tratamiento Premium",
      "experience.step3_text": "Disfruta de tu sesión de belleza en un ambiente relajante con productos de alta gama y aparatología de punta.",
      "experience.step4_title": "Cuidado Continuo",
      "experience.step4_text": "Te entregamos pautas y recomendaciones para prolongar los resultados y mantener tu bienestar en casa.",

      "gallery.label": "Resultados",
      "gallery.title": "El Salón & Resultados",
      "gallery.item1_title": "Nuestro Salón",
      "gallery.item1_desc": "Ubicado en Girona — Un espacio de alta estética y confort",
      "gallery.item2_title": "Estilismo en Acción",
      "gallery.item2_desc": "Cortes, color y peinados personalizados por nuestras estilistas",

      "marca.quote": "“La elegancia no es darse a notar, sino ser recordada.”",

      "contact.label": "Contacto & Dirección",
      "contact.title": "Visítanos",
      "contact.loc_title": "Ubicación",
      "contact.contact_title": "Medios de Contacto",
      "contact.email_label": "Email:",
      "contact.phone_label": "Teléfono:",
      "contact.hours_title": "Horario del Salón",
      "contact.day_tuefri": "Martes a Viernes",
      "contact.day_sat": "Sábados",
      "contact.day_sunmon": "Lunes y Domingo",
      "contact.status_closed": "Cerrado",
      "contact.map_btn": "Cómo llegar en Google Maps",

      "reserve.label": "Reserva Online al Instante",
      "reserve.title": "Reserva tu Cita",
      "reserve.cta_title": "Plataforma de Reserva Directa",
      "reserve.cta_text": "Elige tus tratamientos favoritos de peluquería, estética avanzada, manicura o masajes, selecciona tu estilista o esteticista preferida y reserva el día y hora que mejor te convenga. Todo de forma inmediata y sin esperas a través de nuestro portal oficial.",
      "reserve.cta_btn": "Reservar Cita Online",
      "reserve.trust": "✓ Sin esperas · ✓ Confirmación inmediata · ✓ 100 % online",
      "reserve.note": "Plataforma externa segura gestionada por Estetical.es",

      "footer.desc": "Peluquería y Estética Avanzada en Girona. Tu belleza, estilo y bienestar son nuestra dedicación exclusiva.",
      "footer.nav_title": "Navegación",
      "footer.support_title": "Ubicación & Soporte",
      "footer.hours_line": "Horario: Mar-Vie: 9h-19h / Sáb: 8h-15h",
      "footer.copyright": "© 2026 Elegance by Stoica. Todos los derechos reservados. Girona, Cataluña."
    },

    cat: {
      "nav.home": "Inici",
      "nav.services": "Serveis",
      "nav.experience": "Experiència",
      "nav.gallery": "Galeria",
      "nav.contact": "Contacte",
      "nav.book": "Demanar Cita",

      "hero.title": "Perruqueria i Estètica Avançada · Girona",
      "hero.subtitle": "Perruqueria d'avantguarda i estètica avançada a Girona. Un oasi de benestar i tractaments exclusius personalitzats per a tu.",
      "hero.cta_primary": "Demanar Cita Online",
      "hero.cta_secondary": "Explorar Serveis",
      "hero.prev": "Foto anterior",
      "hero.next": "Foto següent",
      "nav.menu": "Obrir menú",

      "services.label": "La Nostra Carta de Preus",
      "services.title": "Serveis i Tractaments",
      "services.tab_facial": "Estètica Facial",
      "services.tab_corporal": "Estètica Corporal",
      "services.tab_peluqueria": "Perruqueria",
      "services.tab_depilacion": "Depilació",
      "services.tab_unas": "Celles i Pestanyes",
      "services.btn_reserve": "Reservar",
      "services.badge_free": "Gratis",

      "experience.label": "El Procés",
      "experience.title": "La Teva Experiència Elegance",
      "experience.step1_title": "Consulta Inicial",
      "experience.step1_text": "Avaluem detalladament les necessitats de la teva pell, cos o cabell en una cita de diagnòstic gratuïta.",
      "experience.step2_title": "Pla Personalitzat",
      "experience.step2_text": "Dissenyem un protocol a mida combinant estilisme i la tecnologia estètica idònia per a tu.",
      "experience.step3_title": "Tractament Premium",
      "experience.step3_text": "Gaudeix de la teva sessió de bellesa en un ambient relaxant amb productes d'alta gamma i aparatologia d'avantguarda.",
      "experience.step4_title": "Cura Contínua",
      "experience.step4_text": "Et donem pautes i recomanacions per prolongar els resultats i mantenir el teu benestar a casa.",

      "gallery.label": "Resultats",
      "gallery.title": "El Saló & Resultats",
      "gallery.item1_title": "El Nostre Saló",
      "gallery.item1_desc": "Ubicat a Girona — Un espai d'alta estètica i confort",
      "gallery.item2_title": "Estilisme en Acció",
      "gallery.item2_desc": "Talls, color i pentinats personalitzats per les nostres estilistes",

      "marca.quote": "“L'elegància no és cridar l'atenció, sinó ser recordada.”",

      "contact.label": "Contacte & Adreça",
      "contact.title": "Visita'ns",
      "contact.loc_title": "Ubicació",
      "contact.contact_title": "Mitjans de Contacte",
      "contact.email_label": "Correu:",
      "contact.phone_label": "Telèfon:",
      "contact.hours_title": "Horari del Saló",
      "contact.day_tuefri": "De Dimarts a Divendres",
      "contact.day_sat": "Dissabtes",
      "contact.day_sunmon": "Dilluns i Diumenge",
      "contact.status_closed": "Tancat",
      "contact.map_btn": "Com arribar amb Google Maps",

      "reserve.label": "Reserva Online a l'Instant",
      "reserve.title": "Reserva la Teva Cita",
      "reserve.cta_title": "Plataforma de Reserva Directa",
      "reserve.cta_text": "Tria els teus tractaments preferits de perruqueria, estètica avançada, manicura o massatges, selecciona la teva estilista o esteticista preferida i reserva el dia i l'hora que millor et convingui. Tot de forma immediata i sense esperes a través del nostre portal oficial.",
      "reserve.cta_btn": "Demanar Cita Online",
      "reserve.trust": "✓ Sense esperes · ✓ Confirmació immediata · ✓ 100 % online",
      "reserve.note": "Plataforma externa segura gestionada per Estetical.es",

      "footer.desc": "Perruqueria i Estètica Avançada a Girona. La teva bellesa, estil i benestar són la nostra dedicació exclusiva.",
      "footer.nav_title": "Navegació",
      "footer.support_title": "Ubicació & Suport",
      "footer.hours_line": "Horari: Dt-Dv: 9h-19h / Ds: 8h-15h",
      "footer.copyright": "© 2026 Elegance by Stoica. Tots els drets reservats. Girona, Catalunya."
    },

    ro: {
      "nav.home": "Acasă",
      "nav.services": "Servicii",
      "nav.experience": "Experiență",
      "nav.gallery": "Galerie",
      "nav.contact": "Contact",
      "nav.book": "Programează-te",

      "hero.title": "Coafură & Estetică Avansată · Girona",
      "hero.subtitle": "Coafură de avangardă și estetică avansată în Girona. Un oază de bunăstare și tratamente exclusive personalizate pentru tine.",
      "hero.cta_primary": "Programare Online",
      "hero.cta_secondary": "Explorează Serviciile",
      "hero.prev": "Foto anterioară",
      "hero.next": "Foto următoare",
      "nav.menu": "Deschide meniul",

      "services.label": "Lista Noastră de Prețuri",
      "services.title": "Servicii & Tratamente",
      "services.tab_facial": "Estetică Facială",
      "services.tab_corporal": "Estetică Corporală",
      "services.tab_peluqueria": "Coafură",
      "services.tab_depilacion": "Epilare",
      "services.tab_unas": "Sprâncene & Gene",
      "services.btn_reserve": "Rezervă",
      "services.badge_free": "Gratuit",

      "experience.label": "Procesul",
      "experience.title": "Experiența Ta Elegance",
      "experience.step1_title": "Consultație Inițială",
      "experience.step1_text": "Evaluăm în detaliu nevoile pielii, corpului sau părului tău într-o ședință de diagnostic gratuită.",
      "experience.step2_title": "Plan Personalizat",
      "experience.step2_text": "Concepem un protocol pe măsură, combinând stilizarea și tehnologia estetică potrivită pentru tine.",
      "experience.step3_title": "Tratament Premium",
      "experience.step3_text": "Bucură-te de ședința ta de înfrumusețare într-un ambient relaxant, cu produse de top și aparatură de ultimă generație.",
      "experience.step4_title": "Îngrijire Continuă",
      "experience.step4_text": "Îți oferim recomandări pentru a prelungi rezultatele și a-ți menține starea de bine acasă.",

      "gallery.label": "Rezultate",
      "gallery.title": "Salonul & Rezultatele",
      "gallery.item1_title": "Salonul Nostru",
      "gallery.item1_desc": "Situat în Girona — Un spațiu de estetică înaltă și confort",
      "gallery.item2_title": "Stilizare în Acțiune",
      "gallery.item2_desc": "Tunsori, culoare și coafuri personalizate de stilistele noastre",

      "marca.quote": "„Eleganța nu înseamnă să atragi atenția, ci să fii ținut minte.”",

      "contact.label": "Contact & Adresă",
      "contact.title": "Vizitează-ne",
      "contact.loc_title": "Locație",
      "contact.contact_title": "Modalități de Contact",
      "contact.email_label": "Email:",
      "contact.phone_label": "Telefon:",
      "contact.hours_title": "Programul Salonului",
      "contact.day_tuefri": "Marți până Vineri",
      "contact.day_sat": "Sâmbătă",
      "contact.day_sunmon": "Luni și Duminică",
      "contact.status_closed": "Închis",
      "contact.map_btn": "Cum ajungi pe Google Maps",

      "reserve.label": "Rezervare Online Instant",
      "reserve.title": "Rezervă-ți Programarea",
      "reserve.cta_title": "Platformă de Rezervare Directă",
      "reserve.cta_text": "Alege-ți tratamentele preferate de coafură, estetică avansată, manichiură sau masaj, selectează stilista sau cosmeticiana preferată și rezervă ziua și ora care îți convin cel mai bine. Totul instant și fără așteptare, prin portalul nostru oficial.",
      "reserve.cta_btn": "Programare Online",
      "reserve.trust": "✓ Fără așteptare · ✓ Confirmare imediată · ✓ 100 % online",
      "reserve.note": "Platformă externă securizată, gestionată de Estetical.es",

      "footer.desc": "Coafură și Estetică Avansată în Girona. Frumusețea, stilul și starea ta de bine sunt dedicarea noastră exclusivă.",
      "footer.nav_title": "Navigare",
      "footer.support_title": "Locație & Asistență",
      "footer.hours_line": "Program: Mar-Vin: 9h-19h / Sâm: 8h-15h",
      "footer.copyright": "© 2026 Elegance by Stoica. Toate drepturile rezervate. Girona, Catalonia."
    },

    ru: {
      "nav.home": "Главная",
      "nav.services": "Услуги",
      "nav.experience": "Опыт",
      "nav.gallery": "Галерея",
      "nav.contact": "Контакты",
      "nav.book": "Записаться",

      "hero.title": "Парикмахерская и Продвинутая Эстетика · Жирона",
      "hero.subtitle": "Передовая парикмахерская и продвинутая эстетика в Жироне. Оазис благополучия и эксклюзивные процедуры, подобранные индивидуально для вас.",
      "hero.cta_primary": "Записаться Онлайн",
      "hero.cta_secondary": "Смотреть Услуги",
      "hero.prev": "Предыдущее фото",
      "hero.next": "Следующее фото",
      "nav.menu": "Открыть меню",

      "services.label": "Наш Прайс-лист",
      "services.title": "Услуги и Процедуры",
      "services.tab_facial": "Эстетика Лица",
      "services.tab_corporal": "Эстетика Тела",
      "services.tab_peluqueria": "Парикмахерская",
      "services.tab_depilacion": "Депиляция",
      "services.tab_unas": "Брови и Ресницы",
      "services.btn_reserve": "Записаться",
      "services.badge_free": "Бесплатно",

      "experience.label": "Процесс",
      "experience.title": "Ваш Опыт с Elegance",
      "experience.step1_title": "Первичная Консультация",
      "experience.step1_text": "Детально оцениваем потребности вашей кожи, тела или волос на бесплатной диагностической встрече.",
      "experience.step2_title": "Индивидуальный План",
      "experience.step2_text": "Разрабатываем индивидуальный протокол, сочетая стилистику и подходящие именно вам эстетические технологии.",
      "experience.step3_title": "Премиальная Процедура",
      "experience.step3_text": "Наслаждайтесь сеансом красоты в расслабляющей атмосфере с продуктами высокого класса и современной аппаратурой.",
      "experience.step4_title": "Постоянный Уход",
      "experience.step4_text": "Даём рекомендации, чтобы продлить результат и поддерживать ваше благополучие дома.",

      "gallery.label": "Результаты",
      "gallery.title": "Салон и Результаты",
      "gallery.item1_title": "Наш Салон",
      "gallery.item1_desc": "Расположен в Жироне — пространство высокой эстетики и комфорта",
      "gallery.item2_title": "Стилистика в Действии",
      "gallery.item2_desc": "Стрижки, окрашивание и причёски от наших стилистов",

      "marca.quote": "«Элегантность — это не привлекать внимание, а быть запомненным.»",

      "contact.label": "Контакты и Адрес",
      "contact.title": "Посетите нас",
      "contact.loc_title": "Расположение",
      "contact.contact_title": "Способы Связи",
      "contact.email_label": "Эл. почта:",
      "contact.phone_label": "Телефон:",
      "contact.hours_title": "Часы Работы Салона",
      "contact.day_tuefri": "Со вторника по пятницу",
      "contact.day_sat": "Суббота",
      "contact.day_sunmon": "Понедельник и Воскресенье",
      "contact.status_closed": "Закрыто",
      "contact.map_btn": "Маршрут в Google Maps",

      "reserve.label": "Мгновенная Онлайн-запись",
      "reserve.title": "Запишитесь на Приём",
      "reserve.cta_title": "Платформа Прямого Бронирования",
      "reserve.cta_text": "Выберите любимые услуги парикмахерской, продвинутой эстетики, маникюра или массажа, выберите предпочитаемого стилиста или косметолога и забронируйте удобные дату и время. Всё мгновенно и без ожидания через наш официальный портал.",
      "reserve.cta_btn": "Записаться Онлайн",
      "reserve.trust": "✓ Без ожидания · ✓ Мгновенное подтверждение · ✓ 100 % онлайн",
      "reserve.note": "Безопасная внешняя платформа под управлением Estetical.es",

      "footer.desc": "Парикмахерская и продвинутая эстетика в Жироне. Ваша красота, стиль и благополучие — наша исключительная забота.",
      "footer.nav_title": "Навигация",
      "footer.support_title": "Расположение и Поддержка",
      "footer.hours_line": "Часы: Вт-Пт: 9–19 / Сб: 8–15",
      "footer.copyright": "© 2026 Elegance by Stoica. Все права защищены. Жирона, Каталония."
    }
  };

  /* Duraciones de la carta de servicios (clave = texto ES normalizado).
     Se traducen por contenido para no marcar ~38 spans en el HTML.
     Un mapa por idioma; ES (y cualquier idioma sin entrada) usa el texto original.
     ELEGANCE UX v1 — i18n duraciones */
  var durations = {
    cat: {
      "1 hora — Cuidado especial del contorno ocular": "1 hora — Cura especial del contorn ocular",
      "40 min — Luminosidad y firmeza celular": "40 min — Lluminositat i fermesa cel·lular",
      "25 min — Tratamiento rejuvenecedor con IPL Protheus": "25 min — Tractament rejovenidor amb IPL Protheus",
      "50 min — Exfoliación profunda y renovación celular": "50 min — Exfoliació profunda i renovació cel·lular",
      "1h 30min — Desintoxicación profunda de la piel": "1h 30min — Desintoxicació profunda de la pell",
      "1h 20min — Tratamiento antioxidante e iluminador": "1h 20min — Tractament antioxidant i il·luminador",
      "1 hora — Reafirmación y reducción de arrugas": "1 hora — Reafirmació i reducció d'arrugues",
      "1 hora — Remodelación y reducción localizada de papada": "1 hora — Remodelació i reducció localitzada de papada",
      "1h 20min — Regeneración celular intensiva": "1h 20min — Regeneració cel·lular intensiva",
      "15 min — Evaluación detallada sin compromiso": "15 min — Avaluació detallada sense compromís",
      "40 min — Remodelación y tonificación con aparatología": "40 min — Remodelació i tonificació amb aparatologia",
      "1 hora — Reafirmación y remodelación tisular": "1 hora — Reafirmació i remodelació tissular",
      "1 hora — Reductor, celulitis y modelado corporal": "1 hora — Reductor, cel·lulitis i modelatge corporal",
      "40 min — Combate la celulitis y flacidez": "40 min — Combat la cel·lulitis i la flaccidesa",
      "30 min — Estimulación muscular por electromagnetismo": "30 min — Estimulació muscular per electromagnetisme",
      "1 hora — Exfoliación, hidratación y masaje": "1 hora — Exfoliació, hidratació i massatge",
      "30 min — Alivio, ligereza y reactivación circulatoria": "30 min — Alleujament, lleugeresa i reactivació circulatòria",
      "40 min — Piel suave, renovada y profundamente nutrida": "40 min — Pell suau, renovada i profundament nodrida",
      "1 hora — Eliminación de grasa localizada por frío": "1 hora — Eliminació de greix localitzat pel fred",
      "30 min — Drenaje linfático y eliminación de toxinas": "30 min — Drenatge limfàtic i eliminació de toxines",
      "15 min — Plan corporal a medida": "15 min — Pla corporal a mida",
      "45 min — Lavado, corte de tendencia y peinado base": "45 min — Rentat, tall de tendència i pentinat base",
      "1 hora — Cobertura perfecta y brillo multidimensional": "1 hora — Cobertura perfecta i brillantor multidimensional",
      "2h 30min — Degradados y puntos de luz naturales": "2h 30min — Degradats i punts de llum naturals",
      "2 horas — Liso perfecto, control de frizz y brillo espejo": "2 hores — Llis perfecte, control de l'arrissat i brillantor mirall",
      "45 min — Nutrición intensiva para cabellos dañados": "45 min — Nutrició intensiva per a cabells malmesos",
      "1 hora — Ondas, recogidos y semirecogidos especiales": "1 hora — Ones, recollits i semirecollits especials",
      "1h 15min — Láser de diodo de LED Frío / IPL": "1h 15min — Làser de díode de LED Fred / IPL",
      "25 min — Sesión de alta potencia y máxima velocidad": "25 min — Sessió d'alta potència i màxima velocitat",
      "20 min — Axilas, ingles brasileñas, hombros o medias piernas": "20 min — Aixelles, engonals brasilers, espatlles o mitges cames",
      "45 min — Piernas, ingles y axilas (Cera tibia o caliente)": "45 min — Cames, engonals i aixelles (Cera tèbia o calenta)",
      "15 min — Cejas, labio superior, axilas o ingles básicas": "15 min — Celles, llavi superior, aixelles o engonals bàsics",
      "2 horas — Diseño de cejas de larga duración": "2 hores — Disseny de celles de llarga durada",
      "45 min — Curvatura y profundidad natural para tu mirada": "45 min — Curvatura i profunditat natural per a la teva mirada",
      "30 min — Visajismo y sombreado natural": "30 min — Visagisme i ombrejat natural"
    },
    ro: {
      "1 hora — Cuidado especial del contorno ocular": "1 oră — Îngrijire specială a conturului ochilor",
      "40 min — Luminosidad y firmeza celular": "40 min — Luminozitate și fermitate celulară",
      "25 min — Tratamiento rejuvenecedor con IPL Protheus": "25 min — Tratament de întinerire cu IPL Protheus",
      "50 min — Exfoliación profunda y renovación celular": "50 min — Exfoliere profundă și reînnoire celulară",
      "1h 30min — Desintoxicación profunda de la piel": "1h 30min — Detoxifiere profundă a pielii",
      "1h 20min — Tratamiento antioxidante e iluminador": "1h 20min — Tratament antioxidant și iluminator",
      "1 hora — Reafirmación y reducción de arrugas": "1 oră — Fermitate și reducerea ridurilor",
      "1 hora — Remodelación y reducción localizada de papada": "1 oră — Remodelare și reducerea localizată a bărbiei duble",
      "1h 20min — Regeneración celular intensiva": "1h 20min — Regenerare celulară intensivă",
      "15 min — Evaluación detallada sin compromiso": "15 min — Evaluare detaliată, fără obligații",
      "40 min — Remodelación y tonificación con aparatología": "40 min — Remodelare și tonifiere cu aparatură",
      "1 hora — Reafirmación y remodelación tisular": "1 oră — Fermitate și remodelare tisulară",
      "1 hora — Reductor, celulitis y modelado corporal": "1 oră — Reducere, celulită și modelare corporală",
      "40 min — Combate la celulitis y flacidez": "40 min — Combate celulita și flaciditatea",
      "30 min — Estimulación muscular por electromagnetismo": "30 min — Stimulare musculară prin electromagnetism",
      "1 hora — Exfoliación, hidratación y masaje": "1 oră — Exfoliere, hidratare și masaj",
      "30 min — Alivio, ligereza y reactivación circulatoria": "30 min — Alinare, ușurință și reactivare circulatorie",
      "40 min — Piel suave, renovada y profundamente nutrida": "40 min — Piele fină, reînnoită și profund hrănită",
      "1 hora — Eliminación de grasa localizada por frío": "1 oră — Eliminarea grăsimii localizate prin frig",
      "30 min — Drenaje linfático y eliminación de toxinas": "30 min — Drenaj limfatic și eliminarea toxinelor",
      "15 min — Plan corporal a medida": "15 min — Plan corporal personalizat",
      "45 min — Lavado, corte de tendencia y peinado base": "45 min — Spălat, tuns la modă și coafat de bază",
      "1 hora — Cobertura perfecta y brillo multidimensional": "1 oră — Acoperire perfectă și strălucire multidimensională",
      "2h 30min — Degradados y puntos de luz naturales": "2h 30min — Degradeuri și accente de lumină naturale",
      "2 horas — Liso perfecto, control de frizz y brillo espejo": "2 ore — Netezire perfectă, control al frizului și strălucire de oglindă",
      "45 min — Nutrición intensiva para cabellos dañados": "45 min — Nutriție intensivă pentru părul deteriorat",
      "1 hora — Ondas, recogidos y semirecogidos especiales": "1 oră — Bucle, coafuri prinse și semi-prinse speciale",
      "1h 15min — Láser de diodo de LED Frío / IPL": "1h 15min — Laser cu diodă LED Rece / IPL",
      "25 min — Sesión de alta potencia y máxima velocidad": "25 min — Ședință de mare putere și viteză maximă",
      "20 min — Axilas, ingles brasileñas, hombros o medias piernas": "20 min — Axile, inghinal brazilian, umeri sau jumătate de picioare",
      "45 min — Piernas, ingles y axilas (Cera tibia o caliente)": "45 min — Picioare, inghinal și axile (ceară caldă sau fierbinte)",
      "15 min — Cejas, labio superior, axilas o ingles básicas": "15 min — Sprâncene, buza superioară, axile sau inghinal de bază",
      "2 horas — Diseño de cejas de larga duración": "2 ore — Design al sprâncenelor de lungă durată",
      "45 min — Curvatura y profundidad natural para tu mirada": "45 min — Curbură și profunzime naturală pentru privirea ta",
      "30 min — Visajismo y sombreado natural": "30 min — Visagism și conturare naturală"
    },
    ru: {
      "1 hora — Cuidado especial del contorno ocular": "1 ч — Особый уход за контуром глаз",
      "40 min — Luminosidad y firmeza celular": "40 мин — Сияние и упругость клеток",
      "25 min — Tratamiento rejuvenecedor con IPL Protheus": "25 мин — Омолаживающая процедура с IPL Protheus",
      "50 min — Exfoliación profunda y renovación celular": "50 мин — Глубокая эксфолиация и обновление клеток",
      "1h 30min — Desintoxicación profunda de la piel": "1ч 30мин — Глубокая детоксикация кожи",
      "1h 20min — Tratamiento antioxidante e iluminador": "1ч 20мин — Антиоксидантная и осветляющая процедура",
      "1 hora — Reafirmación y reducción de arrugas": "1 ч — Подтяжка и уменьшение морщин",
      "1 hora — Remodelación y reducción localizada de papada": "1 ч — Коррекция и локальное уменьшение второго подбородка",
      "1h 20min — Regeneración celular intensiva": "1ч 20мин — Интенсивная регенерация клеток",
      "15 min — Evaluación detallada sin compromiso": "15 мин — Подробная оценка без обязательств",
      "40 min — Remodelación y tonificación con aparatología": "40 мин — Коррекция и тонизация на аппаратуре",
      "1 hora — Reafirmación y remodelación tisular": "1 ч — Подтяжка и ремоделирование тканей",
      "1 hora — Reductor, celulitis y modelado corporal": "1 ч — Уменьшение объёмов, целлюлит и моделирование тела",
      "40 min — Combate la celulitis y flacidez": "40 мин — Борьба с целлюлитом и дряблостью",
      "30 min — Estimulación muscular por electromagnetismo": "30 мин — Стимуляция мышц электромагнитным полем",
      "1 hora — Exfoliación, hidratación y masaje": "1 ч — Эксфолиация, увлажнение и массаж",
      "30 min — Alivio, ligereza y reactivación circulatoria": "30 мин — Облегчение, лёгкость и активизация кровообращения",
      "40 min — Piel suave, renovada y profundamente nutrida": "40 мин — Мягкая, обновлённая и глубоко питаемая кожа",
      "1 hora — Eliminación de grasa localizada por frío": "1 ч — Удаление локального жира холодом",
      "30 min — Drenaje linfático y eliminación de toxinas": "30 мин — Лимфодренаж и выведение токсинов",
      "15 min — Plan corporal a medida": "15 мин — Индивидуальный план для тела",
      "45 min — Lavado, corte de tendencia y peinado base": "45 мин — Мытьё, модная стрижка и базовая укладка",
      "1 hora — Cobertura perfecta y brillo multidimensional": "1 ч — Идеальное покрытие и многогранный блеск",
      "2h 30min — Degradados y puntos de luz naturales": "2ч 30мин — Растяжка цвета и естественные блики",
      "2 horas — Liso perfecto, control de frizz y brillo espejo": "2 ч — Идеальная гладкость, контроль пушения и зеркальный блеск",
      "45 min — Nutrición intensiva para cabellos dañados": "45 мин — Интенсивное питание для повреждённых волос",
      "1 hora — Ondas, recogidos y semirecogidos especiales": "1 ч — Локоны, причёски и полупричёски для особых случаев",
      "1h 15min — Láser de diodo de LED Frío / IPL": "1ч 15мин — Диодный лазер с холодным LED / IPL",
      "25 min — Sesión de alta potencia y máxima velocidad": "25 мин — Сеанс высокой мощности и максимальной скорости",
      "20 min — Axilas, ingles brasileñas, hombros o medias piernas": "20 мин — Подмышки, бразильское бикини, плечи или половина ног",
      "45 min — Piernas, ingles y axilas (Cera tibia o caliente)": "45 мин — Ноги, зона бикини и подмышки (тёплый или горячий воск)",
      "15 min — Cejas, labio superior, axilas o ingles básicas": "15 мин — Брови, верхняя губа, подмышки или базовое бикини",
      "2 horas — Diseño de cejas de larga duración": "2 ч — Долговременное оформление бровей",
      "45 min — Curvatura y profundidad natural para tu mirada": "45 мин — Изгиб и естественная глубина вашего взгляда",
      "30 min — Visajismo y sombreado natural": "30 мин — Визаж и естественное затенение"
    }
  };

  function norm(s) { return (s || "").replace(/\s+/g, " ").trim(); }

  // Devuelve la traducción; si falta/está vacía, cae a ES (nunca en blanco).
  function tr(lang, key) {
    var dict = translations[lang];
    if (dict && typeof dict[key] === "string" && dict[key] !== "") return dict[key];
    var es = translations.es[key];
    return typeof es === "string" ? es : null;
  }

  function applyAttrSpec(el, lang) {
    // sintaxis: "placeholder:clave; aria-label:clave"
    var spec = el.getAttribute("data-i18n-attr");
    if (!spec) return;
    spec.split(";").forEach(function (pair) {
      var bits = pair.split(":");
      if (bits.length < 2) return;
      var attr = bits[0].trim();
      var key = bits[1].trim();
      var val = tr(lang, key);
      if (val != null) el.setAttribute(attr, val);
    });
  }

  function setLanguage(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;

    // textContent de nodos con data-i18n
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = tr(lang, key);
      if (val != null) el.textContent = val;
    });

    // atributos traducibles
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      applyAttrSpec(el, lang);
    });

    // Pasada para elementos repetidos sin marcar uno a uno:
    // botón "Reservar" de cada fila de servicio.
    var reserveTxt = tr(lang, "services.btn_reserve");
    document.querySelectorAll(".service-item__btn").forEach(function (el) {
      if (reserveTxt != null) el.textContent = reserveTxt;
    });

    // Duraciones de servicios (traducción por contenido, mapa por idioma).
    var durMap = durations[lang];
    document.querySelectorAll(".service-item__duration").forEach(function (el) {
      if (!el.dataset.i18nEsRaw) el.dataset.i18nEsRaw = el.textContent;
      var baseline = norm(el.dataset.i18nEsRaw);
      el.textContent = (durMap && durMap[baseline]) ? durMap[baseline] : el.dataset.i18nEsRaw;
    });

    // Estado del HTML y selector
    document.documentElement.setAttribute("lang", lang === "cat" ? "ca" : lang);
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* almacenamiento no disponible */ }
  }

  function detectInitialLang() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { saved = null; }
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "es").toLowerCase();
    if (nav.indexOf("ca") === 0) return "cat";
    if (nav.indexOf("es") === 0) return "es";
    if (nav.indexOf("ro") === 0) return "ro";
    if (nav.indexOf("ru") === 0) return "ru";
    return DEFAULT_LANG;
  }

  function initSelectorListeners() {
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSelectorListeners();
    setLanguage(detectInitialLang());
  });

  window.EleganceI18n = { setLanguage: setLanguage, translations: translations };
})();
